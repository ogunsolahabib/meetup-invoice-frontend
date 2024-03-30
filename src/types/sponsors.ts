export interface Contact {
    name: string;
    email: number;
    phone: string;
    is_primary: boolean;
    sponsor_id: string;
}

export interface Sponsor {
    name: string;
    street: string;
    city: string;
    contacts: Contact[]
}