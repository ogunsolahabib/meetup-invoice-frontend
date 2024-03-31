'use client';
import { API_URL } from "@/constants";
import { UseQueryResult, useQuery } from "react-query"

/**
 * Fetch data from an API endpoint using React Query.
 * @param key A unique string to identify this query
 * @param url The URL of the endpoint to fetch data from
 * @returns The fetched data, or `undefined` if the query is still loading
 */
export const useReactQueryFetch = <T>(key: string | string[], pathname: string): UseQueryResult<T> => {
    const URL = `${API_URL}/${pathname}`;
    return useQuery<T, Error>(key, () => fetch(URL).then(res => res.json()).catch(err => console.log(err)));
}


export const useReactQueryPostFetch = <T>(key: string | string[], pathname: string, body: any): UseQueryResult<T> => {
    const URL = `${API_URL}/${pathname}`;
    return useQuery<T, Error>(key, () => fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).catch(err => console.log(err)));
}

