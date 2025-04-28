"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IconType } from "react-icons"; // Or use your icon type

interface NavItem {
    title: string;
    url: string;
    icon: React.ComponentType<{ className?: string }>;
  }

interface NavMainProps {
  items: NavItem[];
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname();

  return (
    <SidebarGroup className="">
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url;

          return (
            <div key={item.title} className="group/collapsible">
              <Link
                href={item.url}
                className={`block transition-colors duration-200 rounded-[8px] hover:bg-[#dab3e2] hover:text-gray-300 ${
                  isActive ? "bg-[#D19EDB]" : ""
                }`}
              >
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Link>
            </div>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
