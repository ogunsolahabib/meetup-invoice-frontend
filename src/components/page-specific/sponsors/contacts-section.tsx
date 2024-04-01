import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Contact } from "@/types/sponsors";
import AddContactModal from "./add-contact-modal";

export default function ContactsSection({ data, sponsor_id }: { data: Contact[], sponsor_id: string }) {

    return (
        <section>
            <div className="flex justify-between">

                <h2>Contacts</h2>
                <AddContactModal isFirstContact={data.length === 0} sponsor_id={sponsor_id} />
            </div>

            <DataTable
                columns={[
                    {
                        accessorKey: "name",
                        header: "Name",
                    },
                    {
                        accessorKey: "email",
                        header: "Email",
                    },
                    {
                        accessorKey: "phone",
                        header: "Phone Number",
                    },
                ]}
                data={data ?? []}
            />
        </section>
    )
}