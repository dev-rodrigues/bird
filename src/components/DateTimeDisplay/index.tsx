import {Card} from "@/components/ui/card";
import {CalendarIcon, ClockIcon} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Calendar} from "@/components/ui/calendar";
import {Input} from "@/components/ui/input";

interface DateTimeDisplayProps {
    date: Date | undefined;
    time: string;
    onDateChange: (date: Date | undefined) => void;
    onTimeChange: (time: string) => void;
}

export default function DateTimeDisplay({date, time, onDateChange, onTimeChange}: DateTimeDisplayProps) {

    return (
        <Card className="flex items-center justify-between p-1 w-full max-w-md border border-gray-300">
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
            <div className="flex items-center gap-2 text-gray-700">
                <ClockIcon size={16}/>
                <Input
                    type="time"
                    value={time}
                    onChange={(e) => onTimeChange(e.target.value)}
                    className="w-20"
                />
            </div>
        </Card>
    );
}
