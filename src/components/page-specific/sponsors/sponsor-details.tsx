'use client';
import { Separator } from "@/components/ui/separator";
import ContactsTable from "./contacts-table";
import { useReactQueryFetch } from "@/lib/queryHooks";
import { Sponsor } from "@/types/sponsors";

export default function SponsorDetails({ sponsor_id }: { sponsor_id: string }) {
    const { data, isLoading } = useReactQueryFetch<Sponsor>(sponsor_id, `sponsors/${sponsor_id}`,);

    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <div>
            <h1>Sponsor Details</h1>

            <div className="space-y-10">

                <section>
                    <Separator className="my-1" />
                    <h2>Basic Info</h2>
                    <div className="space-y-4">
                        <strong>{data?.name}</strong>

                        <address>
                            <p>{data?.street}</p>
                            <p>{data?.city}</p>
                        </address>
                    </div>
                </section>

                <ContactsTable data={data?.contacts ?? []} />
            </div>
        </div>
    )
}