import { trailAngels } from "@/lib/data"
import { TrailAngelCard } from "@/components/trail-angel-card"
import { PageHeader } from "@/components/page-header"
import { Heart, CheckCircle } from "lucide-react"

export const metadata = {
  title: "מלאכי השביל | שביל הבקעה",
  description: "תושבים טובים שפותחים דלת ועוזרים למטיילים בשביל הבקעה. מלאכי השביל מציעים מים, הטענה, לינה ועוד.",
}

const guidelines = [
  "יוצרים קשר מראש, ולא מגיעים בהפתעה",
  "מתאמים שעה – ומכבדים אותה",
  "שואלים, לא מניחים: מה אפשרי ומה לא",
  "מכבדים פרטיות, מרחב וכללים של המארח",
  "משאירים מקום טוב אחרינו",
  "אומרים תודה – הודעה קצרה עושה הבדל גדול",
]

export default function TrailAngelsPage() {
  return (
    <div>
      <PageHeader
        title="מלאכי השביל"
        description="לאורך שביל הבקעה פזורים לא רק נופים, מים ושקט – אלא גם אנשים טובים."
      />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Intro & Guidelines */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">מה זה מלאכי שביל?</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    מלאכי השביל הם תושבים, חקלאים, מארחים ואנשים שבחרו לפתוח לב (ולפעמים גם שער, ברז או שקע),
                    ולעזור להולכים בשביל – כל אחד בדרכו, ובגבולות שנוחים לו.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    הם לא עסק, לא שירות, ולא תחנת חובה.
                    הם חלק מהרוח של השביל – אנושיות, פשטות, וערבות הדדית.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-bold text-lg text-foreground mb-4">כללי דרך חשובים</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    מלאכי השביל עושים זאת מרצון חופשי, ולכן חשוב לשמור על:
                  </p>
                  <ul className="space-y-2">
                    {guidelines.map((guideline, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{guideline}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-primary font-medium mt-4">
                    היחס ההדדי הוא מה ששומר את הקסם הזה חי.
                  </p>
                </div>
              </div>
            </div>

            {/* Angels Grid */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-foreground mb-6">רשימת מלאכי השביל</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trailAngels.map((angel, index) => (
                  <TrailAngelCard key={index} angel={angel} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
