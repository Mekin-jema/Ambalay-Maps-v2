"use client"; // Required for client-side components in App Router

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
// import logo from "../../assets/Logo123.png";
import Image from "next/image";
import { useSidebar } from "@/components/ui/sidebar";
import { sidebarData } from "./constant/sidebar-data";
import { ReactNode } from "react";
import { NavUser } from "./navbar/nav-user";
import { NavMain } from "./main-sidebar";

interface AppSidebarProps {
  children?: ReactNode;
  [key: string]: any; // For remaining props
}

export function AppSidebar({ ...props }: AppSidebarProps) {
  const { state } = useSidebar(); // Assuming state type is 'expanded' | 'collapsed'

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="dark:bg-[#021815] bg-[#16423C] text-white mx-3 mt-3 rounded-xl"
    >
      {state !== "collapsed" ? (
        <div className="flex justify-center items-center">
          <Image
            src="./file.svg"
            alt="logo image"
            className="mt-2 w-[120px] h-[50.05px]"
            width={120}
            height={50}
            priority
          />
        </div>
      ) : (
        <span className="h-[86px]" />
      )}

      <SidebarContent>
        <NavMain items={sidebarData.navMain[0].items} />
      </SidebarContent>
      <SidebarFooter className="mb-1">
        <NavUser  />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}