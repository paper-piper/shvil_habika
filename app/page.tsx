import Link from "next/link"
import Image from "next/image"
import { Map, Route, Home, Shield, UtensilsCrossed, Heart, ArrowLeft } from "lucide-react"
import { segments } from "@/lib/data"
import { SegmentCard } from "@/components/segment-card"

const features = [
  {
    icon: Route,
    title: "6 מקטעים מגוונים",
    description: "מסע של 110 ק\"מ דרך נופים מדבריים, מעיינות צוננים ואתרי מורשת",
    href: "/segments",
  },
  {
    icon: Home,
    title: "לינה ואירוח",
    description: "צימרים, חאנים ואירוח כפרי לאורך כל המסלול",
    href: "/accommodation",
  },
  {
    icon: Heart,
    title: "מלאכי השביל",
    description: "תושבים טובים שפותחים דלת ועוזרים למטיילים",
    href: "/trail-angels",
  },
  {
    icon: Shield,
    title: "בטיחות ותיאומים",
    description: "הנחיות חשובות לטיול בטוח ומוצלח",
    href: "/safety",
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/landscape_image.jpeg"
            alt="נוף בקעת הירדן"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/50" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/icon/rounded_icon_clear.png"
              alt="שביל הבקעה"
              width={120}
              height={120}
              className="w-28 h-28 drop-shadow-xl"
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 text-balance drop-shadow-lg">
            שביל הבקעה
          </h1>
          
          <p className="text-xl md:text-2xl text-background/90 mb-4 font-serif drop-shadow-md">
            מסע בלב בקעת הירדן
          </p>
          
          <p className="text-lg text-background/80 max-w-2xl mx-auto mb-8 text-pretty leading-relaxed drop-shadow-md">
            שביל הליכה באורך של כ-110 קילומטרים, המחולק לשישה מקטעים החוצה את בקעת הירדן מצפון לדרום. 
            גלו מעיינות מרהיבים, מצפים מרשימים ואתרי טבע ומורשת שמספרים את סיפורה של הבקעה.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/map"
              className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-6 py-3 rounded-lg font-medium hover:bg-background/90 transition-colors shadow-lg"
            >
              <Map className="h-5 w-5" />
              <span>צפה במפה</span>
            </Link>
            <Link
              href="/segments"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg"
            >
              <span>מקטעי השביל</span>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              כל המידע השימושי למטייל
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              כל מה שצריך לדעת לפני שיוצאים לדרך
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="group bg-card rounded-xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Segments Preview */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                מקטעי השביל
              </h2>
              <p className="text-muted-foreground">
                6 מקטעים מגוונים, כל אחד עם אופי ייחודי משלו
              </p>
            </div>
            <Link
              href="/segments"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              <span>לכל המקטעים</span>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {segments.slice(0, 3).map((segment, index) => (
              <SegmentCard key={segment.id} segment={segment} priority={index < 3} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              מוכנים לצאת לדרך?
            </h2>
            <p className="text-background/70 max-w-xl mx-auto mb-8">
              לפני היציאה, חשוב להכיר את הנחיות הבטיחות ולתאם מעבר בשטחי אש. 
              שביל הבקעה עובר כולו בשטחי C, ודורש היערכות נכונה.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/safety"
                className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-6 py-3 rounded-lg font-medium hover:bg-background/90 transition-colors"
              >
                <Shield className="h-5 w-5" />
                <span>הנחיות בטיחות</span>
              </Link>
              <a
                href="tel:0505804258"
                className="inline-flex items-center justify-center gap-2 border border-background/30 text-background px-6 py-3 rounded-lg font-medium hover:bg-background/10 transition-colors"
              >
                <span>תיאום מוקד הבקעה</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
