import { Card } from "@/components/ui/card";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

export default function DateTimeDisplay() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [time, setTime] = useState("15:04");

    return (
        <Card className="flex items-center justify-between p-1 w-full max-w-md border border-gray-300">
            <Popover>
                <PopoverTrigger className="flex items-center gap-2 text-gray-700">
                    <CalendarIcon size={16} />
                    <span>{date ? date.toLocaleDateString("pt-BR") : "Selecionar data"}</span>
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(day) => setDate(day ?? new Date())}
                    />
                </PopoverContent>
            </Popover>
            <div className="flex items-center gap-2 text-gray-700">
                <ClockIcon size={16} />
                <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-20"
                />
            </div>
        </Card>
    );
}
