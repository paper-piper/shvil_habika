import Image from "next/image"
import { ExternalLink, MapPin, Phone, Users } from "lucide-react"
import { cn } from "@/lib/utils"

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
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>
                <span className="sr-only">איש קשר: </span>
                {accommodation.contact}
              </span>
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
