// app/dashboard/layout.tsx
import React, { ReactNode } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
// import { auth } from "@/lib/auth";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SearchProvider } from "@/context/search-context";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import Header from "@/components/layout/header";
import "./theme.css"
export default async function DashboardLayout({ children }: { children: ReactNode }) {
  // const session = await auth.api.getSession({ headers: await headers() });

  // Uncomment this to enforce authentication
  // if (!session) {
  //   redirect("/auth/login");
  // }

  return (
    <SidebarProvider className="dark:bg-[#16423C] p-3 dark:pt-1 font-sora ">
      <SearchProvider>
        <AppSidebar />
        <SidebarInset className="ml-2 rounded-xl">
          <div className="dark:bg-[#021815] pt-2">

            {children}
          </div>
        </SidebarInset>
      </SearchProvider>
    </SidebarProvider>
  );
}
