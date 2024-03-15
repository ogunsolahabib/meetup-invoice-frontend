import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WithSidebar } from "@/components/ui/with-sidebar";
import SidebarContent from "@/components/ui/sidebar-content";
import CustomHeader from "@/components/ui/custom-header";
import TopBar from "@/components/ui/top-bar";
import ReactQueryWrapper from "@/components/Wrappers/react-query";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tech Meetup Glasgow",
  description: "Manage sponsors and invoices for Tech Meetup Glasgow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryWrapper>
          <WithSidebar
            sidebarContent={SidebarContent}
            mobileDashboardHeader={CustomHeader}>
            <main>
              <TopBar />
              {children}
            </main>
          </WithSidebar>
        </ReactQueryWrapper>
      </body>
    </html>
  );
}
