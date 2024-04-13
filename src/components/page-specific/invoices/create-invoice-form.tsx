import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectSponsorCombobox } from "@/components/ui/select-sponsor-combobox";
import { useReactQueryMutation } from "@/lib/queryHooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


const formSchema = z.object({
    sponsor_id: z.string().min(1, {
        message: "Sponsor is required.",
    }),
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
            subject: "",
            due_date: "",
            amount: 0

        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {

        const payload = {
            sponsor_id: values.sponsor_id,
            subject: values.subject,
            due_date: values.due_date,
            amount: values.amount
        };




    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <h2>Invoice Details</h2>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="sponsor_id"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Sponsor</FormLabel>
                                <SelectSponsorCombobox field={field} setValue={form.setValue} />

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
                                    <Input autoComplete="off"  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                </div>


                <Button className="w-full" type="submit">Submit</Button>
            </form>
        </Form>
    )
}