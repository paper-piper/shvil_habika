"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, Copy, ExternalLink, MapPin, Phone, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const PHONE_REGEX = /0\d{1,2}-?\d{7}/g

// Splits a contact string like "יואל 0542022499 / נעמה 0526091150" into
// per-person segments, each paired with the phone number found in it (if any).
function parseContactSegments(contact: string) {
  return contact.split("/").map((segment) => {
    const trimmed = segment.trim()
    const match = trimmed.match(PHONE_REGEX)
    const phone = match?.[0]
    const label = phone ? trimmed.replace(phone, "").trim() : trimmed
    return { label, phone }
  })
}

function CopyPhoneButton({ phone }: { phone: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phone)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard access unavailable; nothing to fall back to
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`העתק מספר טלפון ${phone}`}
      className="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-0.5 text-sm text-foreground hover:bg-muted transition-colors"
    >
      <span dir="ltr">{phone}</span>
      {copied ? (
        <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
      ) : (
        <Copy className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
      )}
      <span className="sr-only">{copied ? "הועתק" : "העתק"}</span>
    </button>
  )
}

interface AccommodationCardProps {
  accommodation: {
    id: number
    name: string
    location: string
    description: string
    capacity?: string
    contact?: string
    link: string
    image?: string
  }
  className?: string
}

export function AccommodationCard({ accommodation, className }: AccommodationCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 h-full flex flex-col",
        className
      )}
    >
      <div className="aspect-4/3 relative overflow-hidden">
        {accommodation.image ? (
          <Image
            src={accommodation.image}
            alt={accommodation.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-accent/20 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-8 w-8 text-primary" aria-hidden="true" />
            </div>
          </div>
        )}
        {/* /85 rather than /70: this caption sits on an arbitrary photo, so the
            scrim has to carry 4.5:1 even over a blown-out sky. */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/85 to-transparent p-3">
          <div className="flex items-center gap-1.5 text-background">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            <span className="text-sm font-medium">
              <span className="sr-only">מיקום: </span>
              {accommodation.location}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-foreground mb-2 text-balance">
          {accommodation.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {accommodation.description}
        </p>
        
        <div className="space-y-2 mb-4">
          {/* Icons convey meaning here, so each value gets a text label too
              (WCAG 1.1.1) — otherwise a screen reader just reads a bare number. */}
          {accommodation.capacity && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>
                <span className="sr-only">קיבולת: </span>
                {accommodation.capacity}
              </span>
            </div>
          )}
          {accommodation.contact && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
              <span className="sr-only">איש קשר: </span>
              <div className="flex flex-col gap-1.5">
                {parseContactSegments(accommodation.contact).map((segment, i) => (
                  <div key={i} className="flex items-center gap-2 flex-wrap">
                    {segment.label && <span>{segment.label}</span>}
                    {segment.phone && <CopyPhoneButton phone={segment.phone} />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* aria-label disambiguates: without it every card on the page exposes
            an identical "פרטים נוספים" link (WCAG 2.4.4). */}
        <a
          href={accommodation.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`פרטים נוספים על ${accommodation.name} (נפתח בחלון חדש)`}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors w-full justify-center mt-auto"
        >
          <span>פרטים נוספים</span>
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
