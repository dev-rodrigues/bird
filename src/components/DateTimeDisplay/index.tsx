import {Card} from "@/components/ui/card";
import {CalendarIcon} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Calendar} from "@/components/ui/calendar";
import {cn} from "@/lib/utils"


interface DateTimeDisplayProps {
    date: Date | undefined;
    onDateChange: (date: Date | undefined) => void;
}

export default function DateTimeDisplay({date, onDateChange}: DateTimeDisplayProps) {
    return (
        <Card
            className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            )}
        >
            <Popover>
                <PopoverTrigger className="flex items-center gap-2 text-gray-700">
                    <CalendarIcon size={16}/>
                    <span>{date ? date.toLocaleDateString("pt-BR") : "Selecionar data"}</span>
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(day) => onDateChange(day)}
                    />
                </PopoverContent>
            </Popover>
        </Card>
    );
}
