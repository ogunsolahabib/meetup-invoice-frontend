

import clsx from "clsx";
import CustomHeader from "./custom-header";
import { usePathname, useRouter } from "next/navigation";
import TopBarExtra from "./top-bar-extra";
import SidebarMenu from "./sidebar-menu";



export default function SidebarContent() {


    return (
        <div>
            <SidebarMenu />
            <div className="absolute bottom-0 block md:hidden">
                <TopBarExtra />
            </div>
        </div>
    )
}