"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      className="fixed top-4 right-4 w-10 h-10 rounded-full bg-transparent 
        transition-all duration-300 ease-in-out
        hover:scale-110 active:scale-95
        hover:bg-yellow-100/10 data-[state=dark]:hover:bg-blue-100/10
        hover:shadow-[0_0_30px_#FDB813] data-[state=dark]:hover:shadow-[0_0_40px_#E1E7F5]
        group"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      data-state={resolvedTheme}
    >
      {resolvedTheme === 'dark' ? (
        <Moon className="h-6 w-6 transition-all duration-500 ease-out
          text-[#E1E7F5] group-hover:text-[#FFFFFF]
          group-hover:-rotate-180 group-active:rotate-[360deg]
          [filter:drop-shadow(0_0_12px_rgba(225,231,245,0.4))]
          group-hover:[filter:drop-shadow(0_0_20px_rgba(225,231,245,0.6))]" />
      ) : (
        <Sun className="h-6 w-6 transition-all duration-500 ease-out
          text-yellow-500 group-hover:text-yellow-400
          group-hover:rotate-180 group-active:rotate-[360deg]
          [filter:drop-shadow(0_0_10px_rgba(253,184,19,0.3))]
          group-hover:[filter:drop-shadow(0_0_15px_rgba(253,184,19,0.4))]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
