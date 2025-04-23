import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Dashboard from "@/components/pages/Dashboard";
import {auth} from "@/lib/auth";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SearchProvider } from "@/context/search-context";
import { AppSidebar } from "@/components/dashboard/app-sidebar";

const dashboardPage = async () => {
  const session=await auth.api.getSession({headers: await headers()});
    // if(!session){
    //     redirect("/auth/login");
    // }
  return (
    <>
    <SidebarProvider className="dark:bg-[#16423C] p-3 dark:pt-1 font-sora ">
        <SearchProvider>
        <AppSidebar  />
        <SidebarInset className="ml-3  ">
          {/* <Header /> */}
     
          {/* <newHeader /> */}
          <div className=" dark:bg-[#021815] rounded-xl">

          {/* <Outlet /> */}
          </div>
        </SidebarInset>
    </SearchProvider>
      </SidebarProvider>
    </>
  );
};
export default dashboardPage;



