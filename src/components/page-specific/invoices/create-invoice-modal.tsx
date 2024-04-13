'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import CreateInvoiceForm from "./create-invoice-form";

export default function CreateInvoiceModal() {

    const [open, setOpen] = useState(false);

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>Create Invoice</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create New Invoice</DialogTitle>
            </DialogHeader>
            <CreateInvoiceForm />
        </DialogContent>
    </Dialog>
}