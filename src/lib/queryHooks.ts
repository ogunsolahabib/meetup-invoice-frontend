'use client';
import { API_URL } from "@/constants";
import { UseQueryResult, useMutation, useQuery } from "react-query";
import { getSession } from "next-auth/react";
import { signOut } from "@/auth";
import { redirect, useRouter } from "next/navigation";


/**
 * Fetch data from an API endpoint using React Query.
 * @param key A unique string to identify this query
 * @param url The URL of the endpoint to fetch data from
 * @returns The fetched data, or `undefined` if the query is still loading
 */
export const useReactQueryFetch = <T>(key: string | string[], pathname: string): UseQueryResult<T> => {

    const router = useRouter()

    const URL = `${API_URL}/${pathname}`;
    return useQuery<T, Error>(key, async () => {
        const session = await getSession();
        const { id_token } = session?.user ?? {};
        return fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${id_token}`
            }
        }).then(async res => {
            const resJson = await res.json();
            if (resJson.message === 'Unauthorized') {
                return router.push('/api/auth/signin');
            }
            return resJson;
        }
        ).catch(err => {
            console.log(err);

        })
    });
}


export const useReactQueryMutation = <T>(pathname: string, body: BodyInit) => {
    const router = useRouter()

    const URL = `${API_URL}/${pathname}`;

    return useMutation<T, Error, any>({
        mutationFn: async () => {
            const session = await getSession();
            const { id_token } = session?.user ?? {};
            return fetch(URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${id_token}`
                },
                body
            }).then(async res => {
                const resJson = await res.json();
                if (resJson.message === 'Unauthorized') {
                    return router.push('/api/auth/signin');
                }
                return resJson;
            }
            ).catch(err => {
                console.log(err);

            })
        }
    })
}

