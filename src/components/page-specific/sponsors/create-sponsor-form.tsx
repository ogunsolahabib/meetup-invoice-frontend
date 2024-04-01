"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { useReactQueryMutation } from "@/lib/queryHooks"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    sponsor_name: z.string({
        required_error: "Sponsor name is required.",
    }).min(2, {
        message: "Sponsor name must be at least 2 characters.",
    }),
    address_line_1: z.string(),
    address_line_2: z.string(),
    city: z.string(),
})

export default function CreateSponsorForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sponsor_name: "",
            address_line_1: "",
            address_line_2: "",
            city: "",
        },
    });

    const { mutate, isLoading } = useReactQueryMutation('/sponsors')

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);

        const payload = {
            name: values.sponsor_name,
            street: values.address_line_1 + (values.address_line_2 ? ` ${values.address_line_2}` : ''),
            city: values.city
        }


        mutate(payload, {
            onSuccess: (data: any) => {
                router.push(`/sponsors/${data.sponsor_id}`);
            },
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="sponsor_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sponsor Name</FormLabel>
                            <FormControl>
                                <Input autoComplete="off"  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    [1, 2].map((i) => {
                        const name = i === 1 ? "address_line_1" : "address_line_2";

                        return <FormField key={i} control={form.control} name={name} render={({ field }) => <FormItem>
                            <FormLabel>Address Line {i}</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        } />
                    })
                }

                <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                            <Input autoComplete="off" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <Button isLoading={isLoading} className="w-full" type="submit">Submit</Button>
            </form>
        </Form>
    )
}
