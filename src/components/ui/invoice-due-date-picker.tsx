"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { addMonths, endOfMonth, format } from "date-fns"
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
                            format(field.value, "YYYY-MM-dd")
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
                    onSelect={val => setValue("due_date", val ? format(val, "YYYY-MM-dd") : "")}
                    disabled={(date) =>
                        date < new Date()
                    }
                    initialFocus
                />
            </PopoverContent>
        </Popover>



    )
}
