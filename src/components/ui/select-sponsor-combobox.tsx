"use client"

import { Check, ChevronsUpDown } from "lucide-react"


import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CommandList } from "cmdk"
import { useReactQueryFetch } from "@/lib/queryHooks"
import { Sponsor } from "@/types/sponsors"



export function SelectSponsorCombobox({ field, setValue }: any) {

    const { data, isLoading, error } = useReactQueryFetch<Sponsor[]>('sponsors', '/sponsors?includeContacts=true');

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error</p>
    return (


        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                        )}
                    >
                        {field.value
                            ? data?.find(
                                (item) => item.id === field.value
                            )?.name
                            : "Select Sponsor"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command className="w-full md:w-[460px]">
                    <CommandList>
                        <CommandInput placeholder="Search sponsor..." />
                        <CommandEmpty>No sponsor added.</CommandEmpty>
                        {data?.map(({ id, name, contacts }) => (

                            <CommandItem
                                value={id}
                                key={id}
                                onSelect={() => {
                                    setValue("sponsor_id", id)
                                }}>
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        id == field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                                <div className="space-y-1">
                                    <span>
                                        {name}
                                    </span>
                                    <div className="flex gap-x-2">{contacts?.map(({ name }) => <span key={name}>{name}</span>)}</div>
                                </div>

                            </CommandItem>
                        ))}
                        <CommandItem
                            value={'2'}
                            onSelect={() => {
                                setValue("sponsor_id", '2')
                            }}>
                            <Check
                                className={cn(
                                    "mr-2 h-4 w-4",
                                    '2' == field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                )}
                            />
                            {'Sponsor 2'}

                        </CommandItem>

                    </CommandList>
                </Command>

            </PopoverContent>
        </Popover>


    )


}
