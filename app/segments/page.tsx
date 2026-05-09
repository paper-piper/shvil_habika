import { segments } from "@/lib/data"
import { SegmentCard } from "@/components/segment-card"
import { PageHeader } from "@/components/page-header"

export const metadata = {
  title: "מקטעי השביל | שביל הבקעה",
  description: "ששה מקטעים מגוונים, כל אחד עם אופי ייחודי משלו. מסע של 110 קילומטר דרך בקעת הירדן.",
}

export default function SegmentsPage() {
  return (
    <div>
      <PageHeader
        title="מקטעי השביל"
        description="ששה מקטעים מגוונים, כל אחד עם אופי ייחודי משלו. בחרו את המקטע שמתאים לכם והתחילו לתכנן את המסע."
      />
      
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {segments.map((segment, index) => (
              <SegmentCard key={segment.id} segment={segment} priority={index < 3} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
