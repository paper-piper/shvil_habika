import { PageHeader } from "@/components/page-header"

export const metadata = {
  title: "הצהרת נגישות | שביל הבקעה",
  description: "הצהרת הנגישות של אתר שביל הבקעה, רמת ההתאמה לתקן הישראלי ת\"י 5568 ודרכי פנייה בנושאי נגישות.",
}

/*
 * ההצהרה מתארת את מצב האתר לאחר תיקוני הנגישות שבוצעו בקוד; אין בה חוות דעת
 * משפטית, ומומלץ שבדיקת נגישות מקצועית תאשר אותה לפני פרסום.
 */
const ACCESSIBILITY_CONTACT_NAME = "יונתן"
const ACCESSIBILITY_CONTACT_PHONE = "054-2919409"
const ACCESSIBILITY_CONTACT_EMAIL = "shvilhabikaeinprat@gmail.com"
const LAST_UPDATED = "28 ביולי 2026"

export default function AccessibilityPage() {
  return (
    <div>
      <PageHeader
        title="הצהרת נגישות"
        description="אנחנו רואים בנגישות האתר חלק מהרוח של השביל — שהמסע יהיה פתוח לכולם."
      />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <h2 className="text-xl font-bold text-foreground mb-4">מחויבות לנגישות</h2>
            <p className="mb-6 leading-relaxed">
              אתר שביל הבקעה פועל להנגשת שירותיו הדיגיטליים לאנשים עם מוגבלות, בהתאם
              לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ"ח-1998, ולתקנות שוויון זכויות
              לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013.
            </p>

            <h2 className="text-xl font-bold text-foreground mb-4">רמת הנגישות באתר</h2>
            <p className="mb-6 leading-relaxed">
              האתר הונגש בהתאם לתקן הישראלי ת"י 5568, המבוסס על הנחיות{" "}
              <span dir="ltr">WCAG 2.1</span> ברמת התאמה <span dir="ltr">AA</span>.
            </p>

            <h2 className="text-xl font-bold text-foreground mb-4">מה הונגש באתר</h2>
            <ul className="mb-6 space-y-2 list-disc pr-6">
              <li>ניווט מלא באמצעות מקלדת בלבד, בכל עמודי האתר.</li>
              <li>סימון ברור וגלוי של הרכיב שנמצא במיקוד המקלדת.</li>
              <li>קישור &quot;דלג לתוכן הראשי&quot; בתחילת כל עמוד.</li>
              <li>יחסי ניגודיות צבעים העומדים בדרישות התקן עבור טקסט ורכיבי ממשק.</li>
              <li>מבנה כותרות היררכי ותקין, ואזורי ניווט מסומנים סמנטית.</li>
              <li>טקסט חלופי לתמונות, וסימון תמונות דקורטיביות כך שלא יוקראו לשווא.</li>
              <li>שמות נגישים ומלאים לקישורים ולכפתורים, כולל ציון קישורים הנפתחים בחלון חדש.</li>
              <li>תמיכה בהגדרת ההעדפה &quot;צמצום תנועה&quot; במערכת ההפעלה.</li>
              <li>תמיכה בהגדלת טקסט באמצעות הדפדפן מבלי שהתוכן ייחתך.</li>
              <li>האתר מותאם לשימוש בקוראי מסך נפוצים ולתצוגה במכשירים ניידים.</li>
            </ul>

            <h2 className="text-xl font-bold text-foreground mb-4">מגבלות נגישות ידועות</h2>
            <p className="mb-4 leading-relaxed">
              למרות מאמצינו, ייתכנו חלקים באתר שטרם הונגשו במלואם:
            </p>
            <ul className="mb-6 space-y-2 list-disc pr-6">
              <li>
                המפה האינטראקטיבית מוטמעת באתר ממקור חיצוני ואינה בשליטתנו המלאה.
                כחלופה נגישה, כל פרטי המקטעים — אורך, זמן הליכה, דרגת קושי, נקודות
                מים והצטיידות — זמינים כטקסט מלא בעמודי המקטעים.
              </li>
              <li>
                סרטוני המקטעים מוטמעים מ-<span dir="ltr">YouTube</span>, וכתוביותיהם
                תלויות בפלטפורמה החיצונית.
              </li>
              <li>
                האתר כולל קישורים לאתרים חיצוניים (בתי אירוח, מסעדות, מפות ניווט),
                שנגישותם באחריות מפעיליהם בלבד.
              </li>
            </ul>

            <h2 className="text-xl font-bold text-foreground mb-4">נתקלתם בבעיית נגישות?</h2>
            <p className="mb-4 leading-relaxed">
              אם נתקלתם בקושי בגלישה באתר, או שיש לכם הצעה לשיפור, נשמח מאוד לשמוע.
              פנייתכם תטופל בהקדם. כדי שנוכל לעזור במהירות, נודה אם תפרטו את העמוד שבו
              נתקלתם בבעיה, את מהות הקושי, ואת סוג הדפדפן או הטכנולוגיה המסייעת שבה
              אתם משתמשים.
            </p>

            <div className="not-prose bg-card rounded-xl p-6 border border-border mb-6">
              <h3 className="font-bold text-lg text-foreground mb-4">רכז/ת הנגישות</h3>
              <dl className="space-y-3 text-muted-foreground">
                <div className="flex flex-wrap gap-x-2">
                  <dt className="font-medium text-foreground">שם:</dt>
                  <dd>{ACCESSIBILITY_CONTACT_NAME}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2">
                  <dt className="font-medium text-foreground">טלפון:</dt>
                  <dd dir="ltr">{ACCESSIBILITY_CONTACT_PHONE}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2">
                  <dt className="font-medium text-foreground">דוא&quot;ל:</dt>
                  <dd>
                    <a
                      href={`mailto:${ACCESSIBILITY_CONTACT_EMAIL}`}
                      className="text-primary hover:underline"
                      dir="ltr"
                    >
                      {ACCESSIBILITY_CONTACT_EMAIL}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <h2 className="text-xl font-bold text-foreground mb-4">עדכון ההצהרה</h2>
            <p className="mb-6 leading-relaxed">
              הצהרת נגישות זו עודכנה לאחרונה בתאריך {LAST_UPDATED}.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
