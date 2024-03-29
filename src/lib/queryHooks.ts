'use client';
import { API_URL } from "@/constants";
import { UseQueryResult, useQuery } from "react-query"

/**
 * Fetch data from an API endpoint using React Query.
 * @param key A unique string to identify this query
 * @param url The URL of the endpoint to fetch data from
 * @returns The fetched data, or `undefined` if the query is still loading
 */
export const useReactQueryFetch = <T>(key: string, pathname: string): UseQueryResult<T> => {
    const URL = API_URL + pathname;
    return useQuery<T, Error>(key, () => fetch(URL).then(res => res.json()));
}

