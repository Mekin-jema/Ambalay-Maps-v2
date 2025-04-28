"use client"

import { cn } from "@/lib/utils"
import React, { HTMLAttributes } from "react"

interface MainProps extends HTMLAttributes<HTMLElement> {
  fixed?: boolean
}

export const Main: React.FC<MainProps> = ({ fixed = false, className, ...props }) => {
  return (
    <main
      className={cn(
        "peer-[.header-fixed]/header:mt-16",
        "px-4 py-6",
        fixed && "fixed-main flex grow flex-col overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

Main.displayName = "Main"
