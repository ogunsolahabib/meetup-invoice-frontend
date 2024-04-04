'use client';

import { API_URL } from "@/constants";
import { useReactQueryFetch } from "@/lib/queryHooks";

import { DataTable } from "../../ui/data-table";
import convertToDateString from "@/lib/convertToDateString";

/**
 * A table to display all invoices.
 *
 * @returns The invoices table component.
 */

interface Invoice {
    sponsor: {
        name: string;
    };
    total_amount: number;
    invoice_date: string;
}
export default function InvoicesTable(): JSX.Element {

    const { data, isLoading } = useReactQueryFetch<Invoice[]>('invoices', '/invoices');

    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
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

    )
}

