import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react"
import { navLinks } from "@/lib/data"

const CONTACT_EMAIL = "info@shvilhabika.org"
const CONTACT_WHATSAPP_NUMBER = "972559397665"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M17.47 14.38c-.29-.15-1.73-.85-2-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.93 1.15-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.49.1-.19.05-.36-.02-.51-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.5-.66-.5-.17-.01-.36-.01-.56-.01-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.19 3.03c.15.19 2.06 3.15 5 4.42.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.73-.71 1.98-1.39.24-.68.24-1.27.17-1.39-.07-.12-.26-.19-.55-.34z" />
      <path d="M12.01 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.33A9.94 9.94 0 0 0 12.01 22C17.53 22 22 17.52 22 12S17.53 2 12.01 2zm0 18.2c-1.62 0-3.14-.44-4.44-1.22l-.32-.19-3 .79.8-2.93-.21-.31A8.18 8.18 0 0 1 3.8 12c0-4.53 3.69-8.2 8.21-8.2 4.51 0 8.19 3.67 8.19 8.2 0 4.53-3.68 8.2-8.19 8.2z" />
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
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold">שביל הבקעה</span>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              שביל הליכה באורך של כ-110 קילומטרים, המחולק לשישה מקטעים החוצה את בקעת הירדן מצפון לדרום.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-bold text-lg mb-4" id="footer-nav-heading">ניווט</h3>
            <nav aria-labelledby="footer-nav-heading" className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-background/80 hover:text-background text-sm transition-colors"
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
              {/* Icon-only links: aria-label supplies the accessible name, and
                  the icons are hidden so it isn't doubled up. */}
              <a
                href="tel:972559397665"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="התקשרו אלינו: 055-9397665"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="שלחו לנו הודעה בוואטסאפ (נפתח בחלון חדש)"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 hover:bg-background/20 transition-colors"
                aria-label={`שלחו לנו אימייל: ${CONTACT_EMAIL}`}
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61585132421816"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="שביל הבקעה בפייסבוק (נפתח בחלון חדש)"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.tiktok.com/@shvil.habikaa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="שביל הבקעה בטיקטוק (נפתח בחלון חדש)"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/shvil.habikaa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="שביל הבקעה באינסטגרם (נפתח בחלון חדש)"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-background/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-background/75 text-sm">
              כל הזכויות שמורות לשביל הבקעה
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/accessibility"
                className="text-background/75 hover:text-background text-sm transition-colors"
              >
                הצהרת נגישות
              </Link>
              <Link
                href="/terms"
                className="text-background/75 hover:text-background text-sm transition-colors"
              >
                תקנון ותנאי השימוש
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
