'use client';
import { API_URL } from "@/constants";
import { useQuery } from "react-query"

export const useReactQueryFetch = (key: string, url: string) => {
    const URL = API_URL + url;
    return useQuery(key, () => {
        return fetch(URL).then(res => res.json())
    })
}