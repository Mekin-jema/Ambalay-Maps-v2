"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useTheme } from "./theme-provider"

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark")

  useEffect(() => {
    setIsDarkMode(theme === "dark")
  }, [theme])

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark"
    setTheme(newTheme)
  }

  return (
    <Button size="icon" onClick={toggleTheme} className="border-none">
      {isDarkMode ? (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
