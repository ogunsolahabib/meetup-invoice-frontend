"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { addMonths, endOfMonth, endOfDay, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { FormControl } from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function InvoiceDueDatePicker({ field, setValue, }: { field: any, setValue: any, }) {


    return (


        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full",
                            !field.value && "text-muted-foreground"
                        )}
                    >
                        {field.value ? (
                            format(field.value, "yyyy-MM-dd")
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={val => setValue(field.name, val ? format(val, "yyyy-MM-dd") : "")}
                    disabled={(date) =>
                        // disable dates before today, enanble today
                        endOfDay(date) < endOfDay(new Date())
                    }
                    initialFocus
                />
            </PopoverContent>
        </Popover>



    )
}
