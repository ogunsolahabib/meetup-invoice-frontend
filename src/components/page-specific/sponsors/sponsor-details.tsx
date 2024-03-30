'use client';
import { Separator } from "@/components/ui/separator";
import ContactsSection from "./contacts-section";
import { useReactQueryFetch } from "@/lib/queryHooks";
import { Sponsor } from "@/types/sponsors";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function SponsorDetails({ sponsor_id }: { sponsor_id: string }) {
    const { data, isLoading } = useReactQueryFetch<Sponsor>(sponsor_id, `sponsors/${sponsor_id}`);

    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <div className="p-10 space-y-10">
            <a href="/sponsors"><Button variant="outline"><ArrowLeft /> Back</Button></a>

            <h1>Sponsor Details</h1>

            <div className="space-y-10">

                <section>
                    <h2>Basic Info</h2>
                    <div className="space-y-4">
                        <strong>{data?.name}</strong>

                        <address>
                            <p>{data?.street}</p>
                            <p>{data?.city}</p>
                        </address>
                    </div>
                </section>
                <Separator className="my-1" />

                <ContactsSection data={data?.contacts ?? []} />
            </div>
        </div>
    )
}