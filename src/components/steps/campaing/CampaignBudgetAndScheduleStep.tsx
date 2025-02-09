import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@radix-ui/react-popover";
import {Button} from "@/components/ui/button.tsx";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {cn} from "@/lib/utils.ts";
import InputContainer from "@/components/InputContainer";
import DateTimeDisplay from "@/components/DateTimeDisplay";
import MoneyInput from "@/components/MoneyInput";
import {StepComponentProps} from "@/modals/CreateCampaignDialogTypes.ts";

const budgets = [
    {
        label: "Daily budget",
        value: "daily",
    },
    {
        label: "Monthly budget",
        value: "monthly",
    }
];

export default function CampaignBudgetAndScheduleStep({data, updateData}: StepComponentProps<"budget">) {
    const [open, setOpen] = useState(false);

    const [budgetType, setBudgetType] = useState<string>(data?.type ?? "");
    const [budgetValue, setBudgetValue] = useState<number>(data?.amount ?? 0.00);

    const handleBudgetChange = (value: string) => {
        setBudgetType(value);
        setOpen(false);

        updateData({
            type: value,
            amount: budgetValue,
            schedule_start: data?.schedule_start ?? "",
            schedule_end: data?.schedule_end ?? "",
        });
    };

    const handleMoneyChange = (value: number) => {
        setBudgetValue(value);

        updateData({
            type: budgetType,
            amount: value,
            schedule_start: data?.schedule_start ?? "",
            schedule_end: data?.schedule_end ?? "",
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-4">
            <div className={"flex flex-col gap-1"}>
                <label className={"font-bold"}>Budget Type:</label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                        >
                            {budgetType
                                ? budgets.find((framework) => framework.value === budgetType)?.label
                                : "Select..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-300"/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Search..."/>
                            <CommandList>
                                <CommandEmpty>No budget found.</CommandEmpty>
                                <CommandGroup>
                                    {budgets.map((framework) => (
                                        <CommandItem
                                            key={framework.value}
                                            value={framework.value}
                                            onSelect={() => handleBudgetChange(framework.value)}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    budgetType === framework.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {framework.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>

            <InputContainer label={"Budget Value"}>
                <MoneyInput value={budgetValue} onChange={handleMoneyChange}/>
            </InputContainer>

            <InputContainer label={"Start date"}>
                <DateTimeDisplay/>
            </InputContainer>

            <InputContainer label={"End date"}>
                <DateTimeDisplay/>
            </InputContainer>
        </div>
    );
}