'use client';
import { Separator } from "@/components/ui/separator";
import ContactsSection from "./contacts-section";
import { useReactQueryFetch } from "@/lib/queryHooks";
import { Sponsor } from "@/types/sponsors";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AddContactForm from "./add-contact-form";

export default function SponsorDetails({ sponsor_id }: { sponsor_id: string }) {
    const { data, isLoading, error, refetch } = useReactQueryFetch<Sponsor>(sponsor_id, `sponsors/${sponsor_id}`);

    if (isLoading) {
        return <p>Loading...</p>
    }
    if (error || !data?.sponsor_id) {
        return <p>Error</p>
    }
    return (
        <div className="p-10 space-y-10">
            <a href="/sponsors"><Button variant="outline"><ArrowLeft /> Back</Button></a>

            <h1>Sponsor Details</h1>

            <div className="space-y-10">

                <section>
                    <div className="space-y-4">
                        <strong>{data?.name}</strong>

                        <address>
                            <p>{data?.street}</p>
                            <p>{data?.city}</p>
                        </address>
                    </div>
                </section>
                <Separator className="my-1" />

                {data?.contacts?.length ? <ContactsSection data={data?.contacts ?? []} sponsor_id={sponsor_id} refetch={refetch} /> : <div className="w-full md:w-80">
                    <h2>Add first contact</h2>
                    <AddContactForm sponsor_id={sponsor_id} isFirstContact={data.contacts?.length === 0} onFinish={() => refetch()} /></div>}


            </div>
        </div>
    )
}