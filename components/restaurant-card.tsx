import Image from "next/image"
import { ExternalLink, UtensilsCrossed } from "lucide-react"
import { cn } from "@/lib/utils"

interface RestaurantCardProps {
  restaurant: {
    id: number
    name: string
    description: string
    link: string
    image?: string
  }
  className?: string
}

export function RestaurantCard({ restaurant, className }: RestaurantCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      <div className="aspect-video relative overflow-hidden">
        {restaurant.image ? (
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/30 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center">
              <UtensilsCrossed className="h-8 w-8 text-accent" />
            </div>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg text-foreground mb-2">
          {restaurant.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {restaurant.description}
        </p>
        
        <a
          href={restaurant.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors w-full justify-center"
        >
          <span>מיקום במפה</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
