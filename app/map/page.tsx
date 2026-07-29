import Link from "next/link"
import { Download, Map, Compass, Maximize2 } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { NewWindowHint } from "@/components/new-window-hint"
import { TrailMap } from "@/components/trail-map/trail-map"
import { ISRAEL_HIKING_URL } from "@/components/trail-map/config"
import { segments } from "@/lib/data"

export const metadata = {
  title: "מפת השביל | שביל הבקעה",
  description: "מפה אינטראקטיבית של שביל הבקעה לצפייה קלה ונוחה, ומפות להורדה לפי מקטעים.",
}

export default function MapPage() {
  return (
    <div>
      <PageHeader
        title="מפת השביל"
        description="מפה אינטראקטיבית לצפייה קלה ונוחה של השביל, ומפות להורדה לפי מקטעים."
      />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Interactive Map */}
          <div className="mb-12">
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold text-foreground">מפה אינטראקטיבית</h2>
              <Link href="/map/full" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                <Maximize2 className="h-4 w-4" aria-hidden="true" />
                <span>מסך מלא</span>
              </Link>
            </div>

            {/* Explicit height, not aspect-ratio: the map fills its parent with
                height:100%, which only resolves against a definite height. */}
            <div className="relative h-[30rem] sm:h-[34rem] lg:h-[38rem] bg-muted rounded-xl overflow-hidden border border-border">
              <TrailMap />
            </div>
          </div>

          {/* Israel Hiking Map */}
          <div className="mb-12">
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Compass className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-foreground mb-2">מפה להורדה</h3>
                  <p className="text-muted-foreground mb-4">
                    מומלץ להשתמש במפת ישראל הייקינג לניווט בשטח. המפה כוללת את כל הסימונים והנקודות החשובות.
                  </p>
                  <a
                    href={ISRAEL_HIKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Download className="h-5 w-5" aria-hidden="true" />
                    <span>פתח ב-Israel Hiking</span>
                    <NewWindowHint />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Segments Quick Links */}
          <div id="segment-list">
            <h2 className="text-xl font-bold text-foreground mb-6">מקטעי השביל</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {segments.map((segment) => (
                <Link
                  key={segment.id}
                  href={`/segments/${segment.id}`}
                  className="group flex items-center gap-4 bg-card rounded-xl p-4 border border-border hover:border-primary/50 hover:shadow-md transition-all"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <span className="text-lg font-bold text-primary">
                      <span className="sr-only">מקטע </span>
                      {segment.id}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                      {segment.title.replace(`מקטע ${segment.id} - `, "")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="sr-only">אורך: </span>
                      {segment.distance}
                    </p>
                  </div>
                  <Map className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
