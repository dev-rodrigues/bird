import * as React from "react"
import {format} from "date-fns"
import {CalendarIcon} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger} from "@radix-ui/react-popover";

export function DatePickerWithPresets() {
    const [date, setDate] = React.useState<Date>()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon/>
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                className="flex w-auto flex-col space-y-2 p-2"
            >
                <div className="rounded-md border bg-gray-100">
                    <Calendar mode="single" selected={date} onSelect={setDate}/>
                </div>
            </PopoverContent>
        </Popover>
    )
}
