import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { TrailMap } from "@/components/trail-map/trail-map"

export const metadata = {
  title: "מפה במסך מלא | שביל הבקעה",
  description: "מפה אינטראקטיבית של שביל הבקעה במסך מלא.",
}

export default function FullscreenMapPage() {
  return (
    <div className="relative h-[calc(100dvh-4rem)] w-full">
      <TrailMap cooperativeGestures={false} />

      <Link
        href="/map"
        className="absolute bottom-3.5 end-3.5 z-20 inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground shadow-lg transition-colors hover:bg-muted"
      >
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
        חזרה לעמוד המפה
      </Link>
    </div>
  )
}
