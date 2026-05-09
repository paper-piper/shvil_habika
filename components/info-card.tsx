import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface InfoCardProps {
  icon: LucideIcon
  title: string
  value: string
  className?: string
}

export function InfoCard({ icon: Icon, title, value, className }: InfoCardProps) {
  return (
    <div className={cn("bg-card rounded-lg p-4 border border-border", className)}>
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="font-medium text-foreground">{value}</p>
        </div>
      </div>
    </div>
  )
}
