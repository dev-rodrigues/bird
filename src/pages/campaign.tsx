import {Input} from "@/components/ui/input.tsx";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowUpDown, ChevronDown, MoreHorizontal} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import {useCallback, useEffect, useState} from "react";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {CreateCampaignDialog} from "@/modals/CreateCampaignDialog.tsx";
import {useCampaigns} from "@/services/campaignService.ts";
import {format} from "date-fns";

export interface CampaignProps {
    id: string;
    status: string;
    name: string;
    from: string;
    to: string;
    goal: string;
    created_at: string;
}

export const columns: ColumnDef<CampaignProps>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
    {
        accessorKey: "goal",
        header: "Goal",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("goal")}</div>
        ),
    },
    {
        accessorKey: "name",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown/>
                </Button>
            );
        },
        cell: ({row}) => <div className="lowercase">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "from",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    From
                    <ArrowUpDown/>
                </Button>
            );
        },
        cell: ({row}) => <div className="lowercase">{row.getValue("from")}</div>,
    },
    {
        accessorKey: "to",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    To
                    <ArrowUpDown/>
                </Button>
            );
        },
        cell: ({row}) => <div className="lowercase">{row.getValue("to")}</div>,
    },
    {
        accessorKey: "created_at",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created At
                    <ArrowUpDown/>
                </Button>
            );
        },
        cell: ({row}) => {
            const date = new Date(row.getValue("created_at"));
            return <div>{format(date, "dd/MM/yyyy HH:mm:ss")}</div>; // Formata a data
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const campaign = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => {
                                void navigator.clipboard.writeText(campaign.id);
                            }}
                        >
                            Copy campaign ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default function Campaign() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [page, setPage] = useState(0);
    const size = 50;
    const {data, isFetching, refetch} = useCampaigns(page, size);
    const result = data?.content ?? [];

    useEffect(() => {
        void refetch();
    }, [page, refetch]);

    const table = useReactTable({
        data: result,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const nextPage = useCallback(() => {
        setPage((prevPage) => prevPage + 1);
    }, []);

    const prevPage = useCallback(() => {
        setPage((prevPage) => Math.max(prevPage - 1, 0));
    }, []);

    return (
        <div className={"w-full"}>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-6">Campaign</h1>

            <div className={"flex items-center py-4 gap-4"}>
                <CreateCampaignDialog
                    size={size}
                    currentPage={page}
                    isOpen={showModal}
                    setIsOpen={setShowModal}/>

                <Input
                    className="max-w-lg"
                    placeholder={"Filter by campaign name..."}
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"outline"}>
                            Columns <ChevronDown/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align={"end"}>
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="rounded-md border">
                {isFetching ? (
                    <div className="h-8 flex items-center justify-center">Loading...</div>
                ) : (
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>

                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => prevPage()}
                        disabled={page === 0} // Desabilita se estiver na primeira página
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => nextPage()}
                        disabled={result.length < size} // Desabilita se não houver mais dados
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}