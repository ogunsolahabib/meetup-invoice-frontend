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
        <div className="min-h-screen ">
            <aside className="fixed overflow-auto top-0 bottom-0 z-30 h-screen hidden min-h-full w-full shrink-0 border-r md:block items-start md:w-[220px] lg:w-[240px]">
                <div className="h-full py-6 pl-8 pr-6 lg:py-8">
                    <SidebarContent />
                </div>
            </aside>
            <div className="pl-0 md:pl-[220px] lg:pl-[240px]">
                {children}
            </div>
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