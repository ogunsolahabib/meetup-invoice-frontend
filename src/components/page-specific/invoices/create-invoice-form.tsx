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
import useLocalStorage from "@/lib/useLocalStorage";
import { useSession } from "next-auth/react";


const formSchema = z.object({
    sponsor_id: z.string().min(1, {
        message: "Sponsor is required.",
    }),
    start_date: z.string().min(1, {
        message: "Start date is required.",
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

// - Add invoice to db
// - create invoices file
// - Filling invoice data
// - Convert invoice to pdf
// - Send pdf to email
const loadingText = {
    'add-to-db': 'Adding to database...',
    'create-sheet': 'Creating invoice sheet...',
    'rename-sheet': 'Renaming invoice sheet...',
    'create-folder': 'Creating folder...',
    'fill-sheet': 'Filling invoice sheet...',
    'move-file': 'Moving file...',
    'convert-to-pdf': 'Converting to PDF...',
    'send-email': 'Sending email...',
    'complete': 'Complete'
}

type stages = 'add-to-db' | 'create-sheet' | 'rename-sheet' | 'fill-sheet' | 'create-folder' | 'move-file' | 'convert-to-pdf' | 'send-email' | 'complete'
export default function CreateInvoiceForm() {

    const { data, isLoading: isLoadingSponsors, error } = useReactQueryFetch<{ data: Sponsor[] }>('sponsors', '/sponsors?includeContacts=true');

    const { data: sessionData } = useSession();

    const { user: { email } = { email: '' } } = sessionData || {};

    const [stage, setStage] = useState<stages>('add-to-db');

    const [fileId, setFileId] = useState<string>('');

    const [folderId, setFolderId] = useState<string>('');

    const { mutate: addToDb, isLoading: isAddingToDb } = useReactQueryMutation(`/invoices`);

    const { mutate: updateInvoice, isLoading: isUpdatingInvoice } = useReactQueryMutation(`/invoices`, 'put');

    const { mutateAsync: createSheet, isLoading: isCreatingSheet } = useReactQueryMutation(`/invoices/create-sheet`);

    const { mutateAsync: renameSheet, isLoading: isRenamingSheet } = useReactQueryMutation(`/invoices/rename-sheet/`);

    const { mutateAsync: fillSheet, isLoading: isFillingSheet } = useReactQueryMutation(`/invoices/fill-sheet`);

    const { mutateAsync: createFolder, isLoading: isCreatingFolder } = useReactQueryMutation(`/invoices/create-folder`);

    const { mutateAsync: moveFile, isLoading: isMovingFile } = useReactQueryMutation(`/invoices/move-file`);

    const { mutateAsync: convertToPdf, isLoading: isConvertingToPdf } = useReactQueryMutation(`/invoices/sheet-to-pdf`);

    const { mutateAsync: sendEmail, isLoading: isSendingEmail } = useReactQueryMutation(`/invoices/send-email`);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sponsor_id: '',
            start_date: new Date().toISOString().split('T')[0],
            subject: '',
            due_date: "",
            amount: INVOICE_AMOUNT

        },
    });

    const sponsorNameValue = form.watch('sponsor_name');
    const sponsorIdValue = form.watch('sponsor_id');
    const startDateValue = form.watch('start_date');

    const [fileIdLocal, setFileIdLocal] = useLocalStorage<string>('fileId');

    const [folderIdLocal, setFolderIdLocal] = useLocalStorage<string>('folderId');

    useEffect(() => {
        if (fileIdLocal) {
            setFileId(fileIdLocal);
        }
    }, [fileIdLocal, setFileId]);


    useEffect(() => {
        if (folderIdLocal) {
            setFolderId(folderIdLocal);
        }
    }, [folderIdLocal, setFolderId]);


    const sponsorNameValueMemo = useMemo(() => sponsorNameValue, [sponsorNameValue]);

    const startDateValueMemo = useMemo(() => startDateValue, [startDateValue]);

    useEffect(() => {
        if (sponsorNameValueMemo) {
            form.setValue('subject', `${format(new Date(startDateValueMemo), 'MMMM yyyy')} invoice for ${sponsorNameValueMemo}`)
        }

        // set due date to 2 weeks from start date
        if (startDateValueMemo) {
            form.setValue('due_date', format(new Date(new Date(startDateValueMemo).setDate(new Date(startDateValueMemo).getDate() + 14)), 'yyyy-MM-dd'))
        }
    }, [sponsorNameValueMemo, startDateValueMemo, form])

    const selectedSponsor = data?.data.find((sponsor) => sponsor.id == sponsorIdValue);

    const primaryContact = selectedSponsor?.contacts.find((contact) => contact.is_primary);


    async function onSubmit(values: z.infer<typeof formSchema>) {

        const payload = {
            sponsor_id: +values.sponsor_id,
            sponsor_name: values.sponsor_name,
            subject: values.subject,
            due_date: values.due_date,
            total_amount: values.amount,
            start_date: values.start_date,
            created_by: email,

        };

        const contactName = primaryContact?.name;


        try {
            try {
                addToDb(payload, {
                    onSuccess: (data: any) => {
                        setStage('create-sheet');
                    },
                });
            } catch (error) {
                throw new Error('error')
            }

            try {
                const fileIdObj = await createSheet({}) as { data: string };

                if (fileId) {
                    setFileIdLocal(fileIdObj.data);
                    setStage('rename-sheet');
                } else {
                    setStage('create-sheet')
                }

            } catch (error) {
                throw error
            }

            try {
                await createFolder({ sponsor_name: values.sponsor_name, due_date: values.due_date }, {
                    onSuccess: (data: any) => {
                        setFolderIdLocal(data.data);
                    },
                });
            } catch (error) {
                throw error
            }

            try {
                await renameSheet({ fileId, due_date: values.due_date, sponsorName: values.sponsor_name }, {
                    onSuccess: (data: any) => {
                        setStage('fill-sheet')
                    },
                });


            } catch (error) {
                throw error
            }

            try {
                await fillSheet({
                    fileId,
                    sponsor_name: values.sponsor_name,
                    contactName,
                    addressLine1: selectedSponsor?.street,
                    addressLine2: selectedSponsor?.city,
                    dueDate: values.due_date,
                    amount: values.amount
                }, {
                    onSuccess: (data: any) => {
                        setStage('create-folder')
                    },
                });
            } catch (error) {
                throw error
            }

            try {
                await moveFile({ fileId, folderId }, {
                    onSuccess: (data: any) => {
                        setStage('convert-to-pdf')
                    },
                });
            } catch (error) {
                throw error
            }

            try {
                await convertToPdf({ fileId, due_date: values.due_date, sponsorName: values.sponsor_name }, {
                    onSuccess: (data: any) => {
                        setStage('send-email')
                    },
                });
            } catch (error) {
                throw error
            }

            try {
                await sendEmail({ email_address: primaryContact?.email, due_date: values.due_date, contactName, creatorName: "Keith", sponsorName: values.sponsor_name }, {
                    onSuccess: (data: any) => {
                        setStage('complete')
                    },
                });
            } catch (error) {
                throw error
            }

        } catch (error) {
            console.log(error);

        }


    }
    const isLoadingAny = isAddingToDb || isCreatingSheet || isCreatingFolder || isRenamingSheet || isFillingSheet || isMovingFile || isConvertingToPdf || isSendingEmail;




    if (isLoadingSponsors) return <p>Loading...</p>
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
                                <SelectSponsorCombobox field={field} setValue={form.setValue} data={data?.data} />

                                <FormMessage />

                            </FormItem>)
                        }
                    />


                    <FormField
                        control={form.control}
                        name="start_date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Start date</FormLabel>

                                <InvoiceDueDatePicker field={field} setValue={form.setValue} />
                            </FormItem>
                        )} />

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


                <Button isLoading={isLoadingAny} className="w-full" type="submit">{isLoadingAny ? loadingText[stage] : 'Submit'}</Button>
            </form>
        </Form>
    )
}