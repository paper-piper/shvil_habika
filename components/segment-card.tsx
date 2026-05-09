import Link from "next/link"
import Image from "next/image"
import { Clock, Ruler, Mountain, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

const segmentImages: Record<number, string> = {
  1: "/images/segments/1.jpeg",
  2: "/images/segments/2.jpg",
  3: "/images/segments/3.jpg",
  4: "/images/segments/4.jpeg",
  5: "/images/segments/5.jpg",
  6: "/images/segments/6.jpeg",
}

interface SegmentCardProps {
  segment: {
    id: number
    title: string
    subtitle: string
    description: string
    difficulty: string
    duration: string
    distance: string
    requiresCoordination?: boolean
  }
  priority?: boolean
  className?: string
}

const difficultyColors: Record<string, string> = {
  "קל": "bg-green-100 text-green-800",
  "בינוני": "bg-yellow-100 text-yellow-800",
  "קשה": "bg-red-100 text-red-800",
}

export function SegmentCard({ segment, priority = false, className }: SegmentCardProps) {
  return (
    <Link
      href={`/segments/${segment.id}`}
      className={cn(
        "group block bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={segmentImages[segment.id] || "/images/segments/1.jpeg"}
          alt={segment.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md">
          <span className="text-sm font-bold text-primary">מקטע {segment.id}</span>
        </div>
        {segment.requiresCoordination && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-destructive/90 text-destructive-foreground px-2 py-1 rounded-md text-xs font-medium">
            <AlertTriangle className="h-3 w-3" />
            <span>דורש תיאום</span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors text-balance">
            {segment.title}
          </h3>
          <span className={cn("px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap", difficultyColors[segment.difficulty])}>
            {segment.difficulty}
          </span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {segment.description}
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-primary" />
            <span>{segment.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Ruler className="h-4 w-4 text-primary" />
            <span>{segment.distance}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mountain className="h-4 w-4 text-primary" />
            <span>{segment.difficulty}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
