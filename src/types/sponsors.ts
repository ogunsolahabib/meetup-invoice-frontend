export interface Contact {
    name: string;
    email: number;
    phone: string;
    is_primary: boolean;
    sponsor_id: string;
}

export interface Sponsor {
    id: string;
    name: string;
    street: string;
    city: string;
    contacts: Contact[]
}

// todos:
// sync auth envs with drive
// check google nextauth for token expiration