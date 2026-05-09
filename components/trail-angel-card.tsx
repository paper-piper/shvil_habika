import { Heart, MapPin, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

interface TrailAngelCardProps {
  angel: {
    name: string
    services: string
    location: string
    phone: string
  }
  className?: string
}

export function TrailAngelCard({ angel, className }: TrailAngelCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-xl p-5 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Heart className="h-6 w-6 text-primary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-foreground mb-1">
            {angel.name}
          </h3>
          
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
            <MapPin className="h-4 w-4" />
            <span>{angel.location}</span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">
            {angel.services}
          </p>
          
          <a
            href={`tel:${angel.phone}`}
            className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline"
          >
            <Phone className="h-4 w-4" />
            <span dir="ltr">{angel.phone}</span>
          </a>
        </div>
      </div>
    </div>
  )
}
