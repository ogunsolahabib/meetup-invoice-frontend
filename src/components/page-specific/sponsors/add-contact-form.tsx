import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useReactQueryMutation } from "@/lib/queryHooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


const formSchema = z.object({
    contact_name: z.string().min(1, {
        message: "Contact name is required.",
    }).min(2, {
        message: "Contact name must be at least 2 characters.",
    }),
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
    phone: z.string().min(1, { message: 'Phone number is required' }).refine((value) => {
        const phoneRegex = /^\+\d{1,}$/;
        return phoneRegex.test(value);
    }, {
        message: 'Invalid phone number format',
    }),
    is_primary: z.boolean()
})


export default function AddContactForm({ sponsor_id, isFirstContact, onFinish }: { sponsor_id: string, isFirstContact?: boolean, onFinish?: () => void }) {
    const { mutate } = useReactQueryMutation(`/sponsors/${sponsor_id}/contacts`);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            contact_name: "",
            email: "",
            phone: "",
            is_primary: isFirstContact
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {

        const payload = {
            contact_name: values.contact_name,
            email: values.email,
            phone: values.phone,
            is_primary: values.is_primary
        };

        mutate(payload, {
            onSuccess: (data: any) => {
                if (onFinish) {
                    onFinish();
                }
            },
        })


    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="contact_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact Name</FormLabel>
                            <FormControl>
                                <Input autoComplete="off"  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input autoComplete="off"  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input autoComplete="off"  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="is_primary"
                    render={({ field }) => (
                        <FormItem className="flex gap-x-2 items-center">

                            <FormControl>
                                <Checkbox checked={field.value}
                                    onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel className="text-sm !mt-0 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Make Primary Contact
                            </FormLabel>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="w-full" type="submit">Submit</Button>
            </form>
        </Form>
    )
}