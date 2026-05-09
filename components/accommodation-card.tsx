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
        "bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
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
              <MapPin className="h-8 w-8 text-primary" />
            </div>
          </div>
        )}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/70 to-transparent p-3">
          <div className="flex items-center gap-1.5 text-background">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">{accommodation.location}</span>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg text-foreground mb-2 text-balance">
          {accommodation.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {accommodation.description}
        </p>
        
        <div className="space-y-2 mb-4">
          {accommodation.capacity && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4 text-primary" />
              <span>{accommodation.capacity}</span>
            </div>
          )}
          {accommodation.contact && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 text-primary" />
              <span>{accommodation.contact}</span>
            </div>
          )}
        </div>
        
        <a
          href={accommodation.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors w-full justify-center"
        >
          <span>פרטים נוספים</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
