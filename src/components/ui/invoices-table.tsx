'use client';

import { API_URL } from "@/constants";
import { useReactQueryFetch } from "@/lib/queryHooks";
import { useQuery } from "react-query";
import { Table } from "./table";
import { DataTable } from "./data-table";

export default function InvoicesTable() {

    const { data, isLoading } = useReactQueryFetch('invoices', '/invoices');
    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <div>
            <p>Invoices</p>
            <DataTable columns={[
                {
                    accessorKey: "sponsor_id",
                    header: "Sponsor",
                },
                {
                    accessorKey: "id",
                    header: "ID",
                },
                {
                    accessorKey: "amount",
                    header: "Amount",
                },
            ]} data={data ?? []} />
        </div>
    )
}