"use client"

import { WithSidebar } from "@/components/ui/with-sidebar"
import { redirect } from "next/navigation"

export const Dashboard = () => {
    redirect('/invoices');
    return (
        <div className="p-10">
            <p>dashboard</p>
        </div>
    )
}

