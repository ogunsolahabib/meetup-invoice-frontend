'use client';

import { API_URL } from "@/constants";
import { useReactQueryFetch } from "@/lib/queryHooks";

import { DataTable } from "./data-table";


interface Sponsor {
    name: string;
    street: string;
    city: string;
}

export default function SponsorsTable(): JSX.Element {

    const { data, isLoading } = useReactQueryFetch<Sponsor[]>('sponsors', 'sponsors');

    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <div>
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
                ]}
                data={data ?? []}
            />
        </div>
    )
}

