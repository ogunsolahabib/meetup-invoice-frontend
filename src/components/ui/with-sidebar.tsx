import { MenuIcon } from "lucide-react"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export const WithMobileSidebar = ({
    children,
    sidebarContent: SidebarContent,
    mobileDashboardHeader: MobileDashboardHeader
}: {
    children: React.ReactNode
    sidebarContent: () => JSX.Element
    mobileDashboardHeader?: () => JSX.Element
}) => {
    return (
        <>
            <Sheet>
                <div className="container flex md:hidden">
                    <div className="md:flex flex-1">
                        {MobileDashboardHeader && <MobileDashboardHeader />}
                    </div>
                    <SheetTrigger>
                        <MenuIcon size={24} />
                    </SheetTrigger>
                </div>
                <SheetContent side="left">
                    <SidebarContent />
                </SheetContent>
            </Sheet>
            {children}
        </>
    )
}


const WithDesktopSidebar = ({
    children,
    sidebarContent: SidebarContent
}: {
    children: React.ReactNode
    sidebarContent: () => JSX.Element
}) => {
    return (
        // style used from here -> https://github.com/shadcn-ui/ui/blob/1cf5fad881b1da8f96923b7ad81d22d0aa3574b9/apps/www/app/docs/layout.tsx#L12
        <div className="h-screen flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] ">
            <aside className="fixed top-14 z-30 hidden h-screen w-full shrink-0 border-r md:sticky md:block">
                <div className="h-full py-6 pl-8 pr-6 lg:py-8">
                    <SidebarContent />
                </div>
            </aside>
            {children}
        </div>
    )
}


export const WithSidebar = ({
    children,
    ...props
}: {
    children: React.ReactNode
    sidebarContent: () => JSX.Element
    mobileDashboardHeader?: () => JSX.Element
}) => {
    return (
        <WithDesktopSidebar {...props}>
            <WithMobileSidebar {...props}>{children}</WithMobileSidebar>
        </WithDesktopSidebar>
    )
}