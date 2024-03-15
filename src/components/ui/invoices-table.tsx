'use client';

import { API_URL } from "@/constants";
import { useReactQueryFetch } from "@/lib/queryHooks";

import { DataTable } from "./data-table";
import convertToDateString from "@/lib/convertToDateString";

export default function InvoicesTable() {

    const { data, isLoading } = useReactQueryFetch('invoices', '/invoices');

    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <div>
            <p>Invoices</p>
            <DataTable
                columns={[
                    {
                        accessorKey: "sponsor.name",
                        header: "Sponsor",
                    },
                    {
                        accessorKey: "total_amount",
                        header: "Amount",
                    },
                    {
                        accessorKey: "invoice_date",
                        header: "Date",
                        cell: ({ getValue }) => {
                            return convertToDateString(getValue());
                        },
                    },
                ]}
                data={data ?? []}
            />
        </div>
    )
}