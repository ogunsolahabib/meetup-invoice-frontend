export interface Invoice {
    sponsor: {
        name: string;
    };
    total_amount: number;
    invoice_date: string;
}