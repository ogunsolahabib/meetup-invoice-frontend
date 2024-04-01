'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AddContactForm from "./add-contact-form";
import { useState } from "react";

export default function AddContactModal({ isFirstContact, sponsor_id, refetch }: { isFirstContact: boolean, sponsor_id: string, refetch: () => void }) {

    const [open, setOpen] = useState(false);

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>Add Contact</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create A Contact</DialogTitle>
            </DialogHeader>
            <AddContactForm sponsor_id={sponsor_id} isFirstContact={isFirstContact} onFinish={() => { setOpen(false); refetch() }} />
        </DialogContent>
    </Dialog>

}