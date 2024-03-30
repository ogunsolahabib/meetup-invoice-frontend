export interface Contact {
    name: string;
    email: number;
    phone: string;
}

export interface Sponsor {
    name: string;
    street: string;
    city: string;
    contacts: Contact[]
}