import {useEffect, useState, useCallback} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@radix-ui/react-popover";
import {Button} from "@/components/ui/button.tsx";
import {Check, ChevronsUpDown, Info} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {cn} from "@/lib/utils.ts";
import InputContainer from "@/components/InputContainer";
import DateTimeDisplay from "@/components/DateTimeDisplay";
import MoneyInput from "@/components/MoneyInput";
import {StepComponentProps} from "@/modals/CreateCampaignDialogTypes.ts";
import {getCurrentTime} from "@/modals/utlis/formater.ts";
import {Input} from "@/components/ui/input.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {useBankBalance} from "@/services/bank-balance.ts";

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

interface Schedule {
    date: Date | undefined;
    time: string;
}

export default function CampaignBudgetAndScheduleStep({data: result, updateData}: StepComponentProps<"budget">) {
    const [open, setOpen] = useState(false);

    const [budgetType, setBudgetType] = useState<string>(result?.type ?? "");
    const [budgetValue, setBudgetValue] = useState<number>(result?.amount ?? 0.00);
    const [adName, setAdName] = useState<string>(result?.name ?? "");

    const {data: balance} = useBankBalance()

    const [scheduleStart, setScheduleStart] = useState<Schedule>({
        date: new Date(),
        time: getCurrentTime(),
    });
    const [scheduleEnd, setScheduleEnd] = useState<Schedule>({
        date: new Date(),
        time: getCurrentTime(),
    });

    const combineDateAndTime = useCallback((date: Date | undefined, time: string): string => {
        if (!date) return "";

        const [hours, minutes] = time.split(":").map(Number);
        const newDate = new Date(date);
        newDate.setHours(hours, minutes, 0, 0);
        return newDate.toISOString();
    }, []);

    useEffect(() => {
        const newScheduleStart = combineDateAndTime(scheduleStart.date, scheduleStart.time);
        const newScheduleEnd = combineDateAndTime(scheduleEnd.date, scheduleEnd.time);

        updateData({
            name: adName,
            type: budgetType,
            amount: budgetValue,
            schedule_start: newScheduleStart,
            schedule_end: newScheduleEnd,
        });
    }, [adName, budgetType, budgetValue, scheduleStart, scheduleEnd, combineDateAndTime, updateData]);

    const handleBudgetChange = (value: string) => {
        setBudgetType(value);
        setOpen(false);
    };

    const handleMoneyChange = (value: number) => {
        setBudgetValue(value);
    };

    const handleDateChange = (type: "start" | "end", newDate: Date | undefined) => {
        if (type === "start") {
            setScheduleStart((prev) => ({...prev, date: newDate}));
        } else {
            setScheduleEnd((prev) => ({...prev, date: newDate}));
        }
    };

    return (
        <div className="h-full max-h-[400px] overflow-auto grid grid-cols-1 lg:grid-cols-2 gap-4 py-4">
            {/* Ad Name - Sempre ocupa 2 colunas */}
            <div className="flex flex-col col-span-2">
                <InputContainer label="Ad name">
                    <Input value={adName} onChange={(e) => setAdName(e.target.value)}/>
                </InputContainer>
            </div>

            {/* Budget Type e Budget Value lado a lado no wide */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
                <div className="flex flex-col gap-1">
                    <label className="font-bold">Budget Type:</label>
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

                <InputContainer label="Budget Value">
                    <div className={"flex flex-row items-center gap-2"}>

                        <MoneyInput value={budgetValue} onChange={handleMoneyChange}/>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Info/>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{`Current balance ${new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(balance?.balance ?? 0)}`}
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                </InputContainer>
            </div>

            {/* Start Date e End Date lado a lado no wide */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
                <InputContainer label="Start date">
                    <DateTimeDisplay
                        date={scheduleStart.date}
                        onDateChange={(newDate) => handleDateChange("start", newDate)}
                    />
                </InputContainer>

                <InputContainer label="End date">
                    <DateTimeDisplay
                        date={scheduleEnd.date}
                        onDateChange={(newDate) => handleDateChange("end", newDate)}
                    />
                </InputContainer>
            </div>
        </div>
    );
}