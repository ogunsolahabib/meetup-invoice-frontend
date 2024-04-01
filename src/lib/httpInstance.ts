import { API_URL } from "@/constants";
import axios from "axios";
import { getSession } from "next-auth/react";



const httpInstace = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
    }
});


httpInstace.interceptors.response.use(response => {
    if (response.status === 401) {
        window.location.replace('/api/auth/signin');
    }
    return response
});

httpInstace.interceptors.request.use(async config => {
    const session = await getSession();
    const { id_token } = session?.user ?? {};
    config.headers.Authorization = `Bearer ${id_token}`

    return config
})


export default httpInstace


