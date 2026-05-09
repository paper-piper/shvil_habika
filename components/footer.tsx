import Link from "next/link"
import { MapPin, Phone, Facebook, Instagram } from "lucide-react"
import { navLinks } from "@/lib/data"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <MapPin className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">שביל הבקעה</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              שביל הליכה באורך של כ-110 קילומטרים, המחולק לשישה מקטעים החוצה את בקעת הירדן מצפון לדרום.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">ניווט</h3>
            <nav className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-background/70 hover:text-background text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">עקבו אחרינו</h3>
            <div className="flex gap-4">
              <a
                href="tel:972559397665"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61585132421816"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@shvil.habikaa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/shvil.habikaa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-background/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-background/50 text-sm">
              כל הזכויות שמורות לשביל הבקעה
            </p>
            <Link
              href="/terms"
              className="text-background/50 hover:text-background text-sm transition-colors"
            >
              תקנון ותנאי השימוש
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
