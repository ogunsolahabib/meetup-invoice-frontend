'use client';



import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CreateSponsorModal from "../page-specific/sponsors/create-sponsor-modal"
import { Dialog, DialogTrigger } from "./dialog"

export function QuickMenuDropdown() {
    return (

        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant='default'>Create</Button>
            </DropdownMenuTrigger>
            {/* <DropdownMenuContent className="w-56">
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <DialogTrigger>
                        <span className="flex items-center">
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Invoice</span>
                        </span>
                        <CreateSponsorModal />

                    </DialogTrigger>
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Sponsor</span>
                </DropdownMenuItem>

            </DropdownMenuContent> */}
        </DropdownMenu>

    )
}
