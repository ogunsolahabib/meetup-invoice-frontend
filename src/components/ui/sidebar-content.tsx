'use client';

import clsx from "clsx";
import CustomHeader from "./custom-header";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [{ name: 'Invoices', href: '/invoices' }, { name: 'Sponsors', href: '/sponsors' }];

export default function SidebarContent() {

    const pathname = usePathname();

    const getClassName = (href: string) => clsx('block rounded px-4 py-2.5 transition duration-20  hover:text-white hover:bg-gray-900', {
        'bg-gray-900 text-white': pathname === href
    })
    return (
        <div>
            <div className="mt-6">
                {menuItems.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        className={getClassName(item.href)}>
                        {item.name}
                    </a>
                ))}
            </div>
        </div>
    )
}