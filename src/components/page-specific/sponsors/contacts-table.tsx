import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Contact } from "@/types/sponsors";

export default function ContactsTable({ data }: { data: Contact[] }) {

    return (
        <section>
            <Separator className="my-2" />
            <h2>Contacts</h2>

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