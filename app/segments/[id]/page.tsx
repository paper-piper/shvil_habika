import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Clock, Ruler, Mountain, Droplets, ShoppingBag, Tent, Sun, AlertTriangle, ArrowRight, ArrowLeft, Phone, ShieldCheck, Play } from "lucide-react"

const segmentImages: Record<number, string> = {
  1: "/images/segments/1.jpeg",
  2: "/images/segments/2.jpg",
  3: "/images/segments/3.jpg",
  4: "/images/segments/4.jpeg",
  5: "/images/segments/5.jpg",
  6: "/images/segments/6.jpeg",
}
import { segments, accommodations } from "@/lib/data"
import { InfoCard } from "@/components/info-card"
import { AccommodationCard } from "@/components/accommodation-card"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return segments.map((segment) => ({
    id: segment.id.toString(),
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const segment = segments.find((s) => s.id === parseInt(id))
  
  if (!segment) {
    return { title: "מקטע לא נמצא | שביל הבקעה" }
  }
  
  return {
    title: `${segment.title} | שביל הבקעה`,
    description: segment.description,
  }
}

export default async function SegmentPage({ params }: PageProps) {
  const { id } = await params
  const segmentId = parseInt(id)
  const segment = segments.find((s) => s.id === segmentId)
  
  if (!segment) {
    notFound()
  }
  
  const prevSegment = segments.find((s) => s.id === segmentId - 1)
  const nextSegment = segments.find((s) => s.id === segmentId + 1)
  const relatedAccommodations = accommodations.filter((a) => a.segment === segmentId)
  
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/segments" className="hover:text-foreground transition-colors">
              מקטעים
            </Link>
            <span>/</span>
            <span>מקטע {segment.id}</span>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
                {segment.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {segment.description}
              </p>
              
              {segment.requiresCoordination && (
                <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
                  <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-destructive">מקטע זה דורש תיאום מראש</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      לעיתים מתבצעים תרגילים של הצבא במרחב זה
                    </p>
                    <a
                      href="tel:0505804258"
                      className="inline-flex items-center gap-2 text-primary font-medium text-sm mt-2 hover:underline"
                    >
                      <Phone className="h-4 w-4" />
                      <span>התקשרו למוקד הבקעה</span>
                    </a>
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-3">
                <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  segment.difficulty === "קל" ? "bg-green-100 text-green-800" :
                  segment.difficulty === "בינוני" ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-800"
                }`}>
                  {segment.difficulty}
                </span>
                <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground">
                  {segment.distance}
                </span>
                <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground">
                  {segment.duration}
                </span>
              </div>
            </div>
            
            <div className="aspect-video relative rounded-2xl overflow-hidden">
              <Image
                src={segmentImages[segment.id] || "/images/segments/1.jpeg"}
                alt={segment.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
              <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <span className="text-lg font-bold text-primary">מקטע {segment.id}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">פרטי המקטע</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoCard icon={Clock} title="זמן משוער" value={segment.duration} />
            <InfoCard icon={Ruler} title="אורך המקטע" value={segment.distance} />
            <InfoCard icon={Mountain} title="דרגת קושי" value={segment.difficulty} />
            <InfoCard icon={Droplets} title="נקודות מים" value={segment.waterPoints} />
            <InfoCard icon={ShoppingBag} title="נקודות הצטיידות" value={segment.supplyPoints} />
            <InfoCard icon={Tent} title="חניון לילה מומלץ" value={segment.recommendedCamp} />
            <InfoCard icon={Sun} title="עונה מומלצת" value={segment.season} />
          </div>
          
          <div className="mt-8 flex flex-col lg:flex-row gap-6">
            {segment.note && (
              <div className="flex-1 bg-secondary/20 rounded-xl p-6">
                <h3 className="font-bold text-foreground mb-2">שימו לב</h3>
                <p className="text-muted-foreground">{segment.note}</p>
              </div>
            )}

            {segment.youtubeUrl && (
              <div className="lg:w-48 flex-shrink-0">
                <div className="flex items-center gap-2 mb-3">
                  <Play className="h-4 w-4 text-primary flex-shrink-0" />
                  <h3 className="text-sm font-bold text-foreground">סרטון המקטע</h3>
                </div>
                <div className="aspect-[9/16] w-full max-w-[180px] mx-auto lg:mx-0 rounded-xl overflow-hidden shadow-lg border border-border">
                  <iframe
                    src={segment.youtubeUrl}
                    title={`סרטון ${segment.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>

          {segment.ravshatz && segment.ravshatz.length > 0 && (
            <div className="mt-6 bg-primary/8 border border-primary/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0" />
                <h3 className="font-bold text-foreground">לינה בתוך היישוב - תיאום עם רבש"צ</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                מטיילים המעוניינים ללון בתוך היישוב בסוף המקטע יש לתאם מראש עם רבש"צ הישוב.
              </p>
              <div className="flex flex-col gap-3">
                {segment.ravshatz.map((r, i) => (
                  <div key={i} className="flex items-center justify-between gap-4 bg-background rounded-lg px-4 py-3 border border-border">
                    <div>
                      <p className="font-medium text-foreground">{r.name}</p>
                      <p className="text-sm text-muted-foreground">רבש"צ {r.town}</p>
                    </div>
                    <a
                      href={`tel:${r.phone.replace(/\s+/g, "")}`}
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex-shrink-0"
                    >
                      <Phone className="h-4 w-4" />
                      <span dir="ltr">{r.phone}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Accommodations */}
      {relatedAccommodations.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">לינה בסוף המקטע</h2>
                <p className="text-muted-foreground">אפשרויות לינה ואירוח באזור</p>
              </div>
              <Link
                href="/accommodation"
                className="text-primary font-medium hover:underline hidden sm:inline-flex items-center gap-1"
              >
                כל האפשרויות
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedAccommodations.map((accommodation) => (
                <AccommodationCard key={accommodation.id} accommodation={accommodation} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="py-8 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {prevSegment ? (
              <Link
                href={`/segments/${prevSegment.id}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowRight className="h-5 w-5" />
                <div className="text-right">
                  <p className="text-sm">המקטע הקודם</p>
                  <p className="font-medium text-foreground">{prevSegment.title}</p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            
            {nextSegment ? (
              <Link
                href={`/segments/${nextSegment.id}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="text-left">
                  <p className="text-sm">המקטע הבא</p>
                  <p className="font-medium text-foreground">{nextSegment.title}</p>
                </div>
                <ArrowLeft className="h-5 w-5" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
