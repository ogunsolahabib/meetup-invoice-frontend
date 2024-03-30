import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import CreateSponsorForm from "./create-sponsor-form";

export default function CreateSponsorModal() {
    return (<Dialog>
        <DialogTrigger>
            Create
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create A Sponsor</DialogTitle>
            </DialogHeader>
            <CreateSponsorForm />
        </DialogContent>
    </Dialog>
    )
}