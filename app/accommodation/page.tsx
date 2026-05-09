import Link from "next/link"
import { accommodations, segments } from "@/lib/data"
import { AccommodationCard } from "@/components/accommodation-card"
import { PageHeader } from "@/components/page-header"

export const metadata = {
  title: "לינה ואירוח | שביל הבקעה",
  description: "צימרים, חאנים ואירוח כפרי לאורך שביל הבקעה. מצאו את מקום הלינה המושלם לטיול שלכם.",
}

export default function AccommodationPage() {
  // Group accommodations by segment
  const accommodationsBySegment = segments.map((segment) => ({
    segment,
    accommodations: accommodations.filter((a) => a.segment === segment.id),
  })).filter((group) => group.accommodations.length > 0)

  return (
    <div>
      <PageHeader
        title="אירוח ולינה"
        description="לאורך השביל ישנם מקומות לינה חמים ומזמינים, ליהנות מאירוח כפרי, להכיר קהילות מגוונות, ולהתחבר לשקט המדברי ולתחושת המרחב."
      >
        <p className="mt-4 text-sm text-muted-foreground">
          אם ברצונכם לשקול אפשרויות בחינם, אפשר לראות גם את{" "}
          <Link href="/trail-angels" className="text-primary hover:underline font-medium">
            מלאכי השביל
          </Link>{" "}
          שלנו
        </p>
      </PageHeader>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {accommodationsBySegment.map(({ segment, accommodations }) => (
            <div key={segment.id} className="mb-16 last:mb-0">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">{segment.id}</span>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">
                    {segment.title.replace(`מקטע ${segment.id} - `, "")}
                  </h2>
                  <p className="text-sm text-muted-foreground">לינה בסוף מקטע {segment.id}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accommodations.map((accommodation) => (
                  <AccommodationCard key={accommodation.id} accommodation={accommodation} />
                ))}
              </div>
            </div>
          ))}

          {/* Segments without accommodations */}
          {segments.filter((s) => !accommodationsBySegment.find((g) => g.segment.id === s.id)).length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">מקטעים ללא מקומות לינה מסודרים</h2>
              <p className="text-muted-foreground mb-6">
                אנחנו עובדים על זה! בינתיים, אפשר לבדוק את{" "}
                <Link href="/trail-angels" className="text-primary hover:underline">
                  מלאכי השביל
                </Link>{" "}
                לאפשרויות נוספות.
              </p>
              <div className="flex flex-wrap gap-3">
                {segments.filter((s) => !accommodationsBySegment.find((g) => g.segment.id === s.id)).map((segment) => (
                  <Link
                    key={segment.id}
                    href={`/segments/${segment.id}`}
                    className="px-4 py-2 bg-muted rounded-lg text-sm text-muted-foreground hover:bg-muted/80 transition-colors"
                  >
                    מקטע {segment.id}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
