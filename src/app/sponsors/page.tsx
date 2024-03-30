import CreateSponsorModal from "@/components/page-specific/sponsors/create-sponsor-modal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SponsorsTable from "@/components/ui/sponsors-table";

export default function Sponsors() {
    return <div className="container py-10">
        <div className="container flex justify-between">
            <h1>Sponsors</h1>
            <CreateSponsorModal />
        </div>
        <SponsorsTable />
    </div>
}