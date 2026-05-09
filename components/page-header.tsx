import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
}

export function PageHeader({ title, description, className, children }: PageHeaderProps) {
  return (
    <div className={cn("bg-gradient-to-b from-muted to-background py-12 md:py-16", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
