'use client';
import { UseQueryResult, useMutation, useQuery } from "react-query";
import httpInstace from "./httpInstance";


export const useReactQueryFetch = <T>(key: string | string[], pathname: string): UseQueryResult<T> => {

    return useQuery<T, Error>(key, () => httpInstace.get(pathname).then(res => res.data).catch(err => err)
    );
}

export const useReactQueryMutation = <T>(pathname: string) => {
    return useMutation<T, Error, any>({
        mutationFn: (body: BodyInit) => httpInstace.post(pathname, body).then(res => res.data
        ).catch(err => err?.response)
    })
}

