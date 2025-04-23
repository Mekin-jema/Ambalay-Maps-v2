"use client"

import React, { HTMLAttributes, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  className?: string
  fixed?: boolean
  children?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ className, fixed, children, ...props }) => {
  const [offset, setOffset] = useState<number>(0)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop)
    }

    document.addEventListener("scroll", onScroll, { passive: true })
    return () => document.removeEventListener("scroll", onScroll)
  }, [])

  const pathSegments = pathname.split("/").filter(Boolean)
  const isDashboardOnly = pathname === "/dashboard"
  const pageTitle = pathSegments.length > 1 ? pathSegments[pathSegments.length - 1] : ""

  return (
    <header
      className={cn(
        "flex items-center px-4 py-1 sm:gap-4",
        fixed && "header-fixed peer/header fixed z-50 w-[inherit] rounded-md",
        offset > 10 && fixed ? "shadow-sm" : "shadow-none",
        className
      )}
      {...props}
    >
      <SidebarTrigger className="ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4 px-0.2 dark:bg-white bg-black" />

      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-muted-foreground space-x-1">
        <Link href="/dashboard" className="font-bold">
          Dashboard
        </Link>

        {!isDashboardOnly && (
          <>
            <span>{">"}</span>
            <span className="capitalize font-bold">{pageTitle}</span>
          </>
        )}
      </nav>

      {children}
    </header>
  )
}

Header.displayName = "Header"
