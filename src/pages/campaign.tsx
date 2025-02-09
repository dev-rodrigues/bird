import {Input} from "@/components/ui/input.tsx";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowUpDown, ChevronDown, MoreHorizontal} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {
    ColumnDef,
    ColumnFiltersState, flexRender,
    getCoreRowModel, getFilteredRowModel,
    getPaginationRowModel, getSortedRowModel,
    SortingState,
    useReactTable, VisibilityState
} from "@tanstack/react-table";
import {useState} from "react";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {CreateCampaignDialog} from "@/modals/CreateCampaignDialog.tsx";

export interface CampaignProps {
    id: string;
    status: string;
    name: string;
    from: string;
    to: string;
    goal: string;
    created_at: string;
}

const data: CampaignProps[] = [
    {
        id: "123123",
        status: "Em rascunho",
        goal: "Reconhecimento",
        name: "[ENGAJ] [WPP] [BK] Whopper",
        from: "2025-01-01",
        to: "2025-02-10",
        created_at: "2025-02-01",
    },
    {
        id: "456456",
        status: "Ativa",
        goal: "Leads",
        name: "[AWARENESS] [FB] [MCD] Big Mac",
        from: "2025-02-15",
        to: "2025-03-20",
        created_at: "2025-02-10",
    },
    {
        id: "789789",
        status: "Encerrada",
        goal: "Vendas",
        name: "[PROMO] [IG] [KFC] Bucket",
        from: "2024-11-10",
        to: "2024-12-25",
        created_at: "2024-10-30",
    },
    {
        id: "987654",
        status: "Pausada",
        goal: "Vendas",
        name: "[LEAD] [TT] [SB] Subway Combo",
        from: "2025-03-01",
        to: "2025-04-15",
        created_at: "2025-02-20",
    },
    {
        id: "654321",
        status: "Ativa",
        goal: "Vendas",
        name: "[RETARGET] [YT] [ST] Starbucks Latte",
        from: "2025-04-01",
        to: "2025-05-20",
        created_at: "2025-03-25",
    }
];

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
            )
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
            )
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
            )
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
                    Create At
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase">{row.getValue("created_at")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const payment = row.original

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
                                void navigator.clipboard.writeText(payment.id);
                            }}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export default function Campaign() {

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [showModal, setShowModal] = useState(false)

    const table = useReactTable({
        data,
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

    return (
        <div className={"w-full"}>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-6">
                Campaign
            </h1>

            <div className={"flex items-center py-4 gap-4"}>
                <CreateCampaignDialog isOpen={showModal} setIsOpen={setShowModal} />

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
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="rounded-md border">
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
                                    )
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
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}