import Link from "next/link"
import { AlertTriangle, Phone, MapPin, CheckCircle, Compass, Droplets, Sun, Users } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export const metadata = {
  title: "בטיחות ותיאומים | שביל הבקעה",
  description: "הנחיות בטיחות חשובות לטיול בשביל הבקעה, כולל תיאום שטחי אש ואחריות המטיילים.",
}

const responsibilities = [
  "תכנון המסלול והמקטעים",
  "נשיאת מים וציוד מתאים",
  "בדיקת תחזית מזג האוויר",
  "תיאום שטחי אש",
  "עמידה בהנחיות הבטיחות",
]

export default function SafetyPage() {
  return (
    <div>
      <PageHeader
        title="בטיחות ותיאומים"
        description="שביל הבקעה הוא מיזם הליכה חברתי-קהילתי. חשוב לצאת לדרך בהיערכות נכונה ובהיכרות עם כללי הבטיחות."
      />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Main Content */}
            <div className="space-y-10">
              {/* Where the trail passes */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">היכן עובר השביל</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  שביל הבקעה עובר כולו בשטחי C, באזורים פתוחים לטיול.
                  אין מעבר בשטחי A או B, והשביל אינו עובר בתוך כפרים.
                </p>
              </div>

              {/* Fire zones */}
              <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">שטחי אש - תיאום חובה</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  חלק ממקטעי שביל הבקעה עוברים בשטחי אש פעילים של צה״ל.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>חובה לתאם מעבר מראש לפני היציאה לשטח</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>יש לבדוק אם השטח פתוח לטיול במועד המתוכנן</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>מומלץ לבצע את הבדיקה מבעוד מועד</span>
                  </li>
                </ul>
                <a
                  href="tel:0505804258"
                  aria-label="לתיאום עם מוקד הבקעה בטלפון 050-5804258"
                  className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground px-5 py-3 rounded-lg font-medium hover:bg-destructive/90 transition-colors"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  <span>לתיאום עם מוקד הבקעה</span>
                </a>
              </div>

              {/* Responsibilities */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">אחריות המטיילים</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  שביל הבקעה הוא מיזם חברתי, ואינו שביל מוסדר עם גוף מפעיל או ליווי בשטח.
                  כל מטייל ומטיילת אחראים ל:
                </p>
                <ul className="space-y-2">
                  {responsibilities.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Navigation */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Compass className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">ניווט והתמצאות</h2>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      מומלץ להשתמש{" "}
                      <Link href="/map" className="text-primary hover:underline">
                        במפה שלנו
                      </Link>
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>ישנו סימון ברוב השביל, ולכן ישנם חלקים בהם אפשר להסתמך רק על הקובץ</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-24 space-y-6">
                {/* Quick tips */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-bold text-lg text-foreground mb-4">טיפים מהירים</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Droplets className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-medium text-foreground">מים</p>
                        <p className="text-sm text-muted-foreground">נשאו לפחות 3 ליטר לאדם ליום</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-medium text-foreground">עונה מומלצת</p>
                        <p className="text-sm text-muted-foreground">אביב, סתיו וחורף - הימנעו מימי הקיץ החמים</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-medium text-foreground">חירום</p>
                        <p className="text-sm text-muted-foreground">וודאו שיש לכם טלפון טעון וקליטה</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                  <h3 className="font-bold text-lg text-foreground mb-4">לסיכום</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    שביל הבקעה מזמין למסע פתוח, שקט ומעורר השראה –
                    אך האחריות לצעוד בבטחה היא של המטיילים.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-2">
                    יציאה מוכנה, מתואמת ואחראית תאפשר חוויה טובה, בטוחה ומהנה לכולם.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
