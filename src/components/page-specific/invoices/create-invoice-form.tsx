import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SelectSponsorCombobox from "@/components/ui/select-sponsor-combobox";
import { useReactQueryFetch, useReactQueryMutation } from "@/lib/queryHooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Sponsor } from "@/types/sponsors";
import { INVOICE_AMOUNT } from "@/constants";
import { InvoiceDueDatePicker } from "@/components/ui/invoice-due-date-picker";


const formSchema = z.object({
    sponsor_id: z.string().min(1, {
        message: "Sponsor is required.",
    }),
    sponsor_name: z.string(),
    subject: z.string().min(1, {
        message: "Subject is required.",
    }),
    due_date: z.string().min(1, {
        message: "Due date is required.",
    }),
    amount: z.number().min(1, {
        message: "Amount is required.",
    }),

})


export default function CreateInvoiceForm() {
    const { mutate } = useReactQueryMutation(`/invoices`);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sponsor_id: '',
            subject: '',
            due_date: "",
            amount: INVOICE_AMOUNT

        },
    });

    const sponsorIdValue = form.watch('sponsor_name')

    const sponsorIdValueMemo = useMemo(() => sponsorIdValue, [sponsorIdValue])

    useEffect(() => {
        if (sponsorIdValueMemo) {
            form.setValue('subject', `${format(new Date(), 'MM/dd/yyyy')} invoice for ${sponsorIdValueMemo}`)
        }
    }, [sponsorIdValueMemo])

    function onSubmit(values: z.infer<typeof formSchema>) {

        const payload = {
            sponsor_id: values.sponsor_id,
            sponsor_name: values.sponsor_name,
            subject: values.subject,
            due_date: values.due_date,
            amount: values.amount
        };




    }

    const { data, isLoading, error } = useReactQueryFetch<Sponsor[]>('sponsors', '/sponsors?includeContacts=true');

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* <h2>Invoice Details</h2> */}
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="sponsor_id"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Sponsor</FormLabel>
                                <SelectSponsorCombobox field={field} setValue={form.setValue} data={data} />

                                <FormMessage />

                            </FormItem>)
                        }
                    />

                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                    <Input autoComplete="off"  {...field} autoFocus={false} placeholder="Enter subject" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount (£)</FormLabel>
                                <FormControl>
                                    <Input autoComplete="off"  {...field} autoFocus={false} placeholder="Enter amount" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="due_date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Due date</FormLabel>

                                <InvoiceDueDatePicker field={field} setValue={form.setValue} />
                            </FormItem>
                        )} />

                </div>


                <Button className="w-full" type="submit">Submit</Button>
            </form>
        </Form>
    )
}