"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { navLinks } from "@/lib/data"
import { cn } from "@/lib/utils"

const MOBILE_MENU_ID = "mobile-navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // Falls back to "" so nothing is marked current if the pathname is unavailable.
  const pathname = usePathname() ?? ""

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/icon/full_icon.png"
              alt=""
              width={40}
              height={40}
              className="rounded-full w-10 h-10"
            />
            <span className="text-xl font-bold text-foreground">שביל הבקעה</span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="ניווט ראשי" className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  // text-foreground, not text-primary: primary on a primary/10
                  // pill is only 4.45:1. Bold + pill means the current page is
                  // not signalled by colour alone (WCAG 1.4.1).
                  isActive(link.href)
                    ? "text-foreground bg-primary/10 font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            aria-label={isMenuOpen ? "סגור תפריט" : "פתח תפריט"}
            aria-expanded={isMenuOpen}
            aria-controls={MOBILE_MENU_ID}
          >
            {/* Icons are decorative — the button is labelled by aria-label. */}
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation.
          `inert` while collapsed: the max-h-0 wrapper only hides the menu
          visually, so without it the links stay in the tab order and are read
          by screen readers (WCAG 2.4.3 / 4.1.2). */}
      <div
        id={MOBILE_MENU_ID}
        inert={!isMenuOpen}
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          isMenuOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <nav aria-label="ניווט ראשי (נייד)" className="border-t border-border bg-background px-4 py-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "px-4 py-3 text-base font-medium rounded-lg transition-colors",
                  // text-foreground, not text-primary: primary on a primary/10
                  // pill is only 4.45:1. Bold + pill means the current page is
                  // not signalled by colour alone (WCAG 1.4.1).
                  isActive(link.href)
                    ? "text-foreground bg-primary/10 font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
