'use client';

import { API_URL } from "@/constants";
import { useReactQueryFetch } from "@/lib/queryHooks";

import { DataTable } from "./data-table";


interface Sponsor {
    name: string;
    street: string;
    city: string;
    sponsor_id: string;
}

export default function SponsorsTable(): JSX.Element {

    const { data, isLoading } = useReactQueryFetch<Sponsor[]>('sponsors', 'sponsors');

    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <DataTable
            columns={[
                {
                    accessorKey: "name",
                    header: "Name",
                },

                {
                    accessorKey: "city",
                    header: "Address",
                    accessorFn: ({ street, city }: Sponsor) => street + ', ' + city

                },
                {
                    accessorKey: "id",
                    header: "Actions",
                    cell: ({ getValue }) => <a href={`/sponsors/${getValue()}`}>View Details</a>

                },
            ]}
            data={data ?? []}
        />

    )
}

