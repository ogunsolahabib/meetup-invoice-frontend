'use client';
import CreateInvoiceModal from "@/components/page-specific/invoices/create-invoice-modal";
import InvoicesTable from "@/components/page-specific/invoices/invoices-table";

export default function Incoices() {

    return <div className="container py-10">
        <div className="container flex justify-between">
            <h1>Invoices</h1>
            <CreateInvoiceModal />
        </div>
        <InvoicesTable />
    </div>
}