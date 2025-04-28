"use client";
import {
    IconArrowRightDashed,
    IconDeviceLaptop,
    IconMoon,
    IconSun,
  } from "@tabler/icons-react";
  import { useTheme } from "next-themes";
  import React from "react";
  import { useRouter } from "next/navigation";

  import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
  } from "@/components/ui/command";
  import { useSearch } from "@/context/search-context";
  import { sidebarData } from "./constant/sidebar-data";
  import { ScrollArea } from "../ui/scroll-area";
  
  // Add type definitions for sidebar data structure
  interface NavItem {
    title: string;
    url: string;
    icon: React.ComponentType<{ className?: string }>;
  }
  
  interface NavGroup {
    title: string;
    items: NavItem[];
  }
  
  export function CommandMenu() {
    const router = useRouter();
    const { setTheme } = useTheme();
    const { open, setOpen } = useSearch();
  
    const runCommand = React.useCallback(
      (command: () => void) => {
        setOpen(false);
        command();
      },
      [setOpen]
    );
  
    return (
      <CommandDialog modal open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <ScrollArea type="hover" className="h-72 pr-1">
            <CommandEmpty>No results found.</CommandEmpty>
            {sidebarData.navMain.map((group: NavGroup) => (
              <CommandGroup key={group.title} heading={group.title}>
                {group.items.map((navItem: NavItem, i: number) => (
                  <CommandItem
                    key={`${navItem.url}-${i}`}
                    value={navItem.title}
                    onSelect={() => {
                      runCommand(() => router.push(navItem.url));
                    }}
                  >
                    <div className="mr-2 flex h-4 w-4 items-center justify-center">
                      <IconArrowRightDashed className="text-muted-foreground/80 size-2" />
                    </div>
                    {navItem.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
            <CommandSeparator />
            <CommandGroup heading="Theme">
              <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
                <IconSun />
                <span>Light</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
                <IconMoon className="scale-90" />
                <span>Dark</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
                <IconDeviceLaptop />
                <span>System</span>
              </CommandItem>
            </CommandGroup>
          </ScrollArea>
        </CommandList>
      </CommandDialog>
    );
  }