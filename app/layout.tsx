import type { Metadata, Viewport } from "next"
import { Rubik, Frank_Ruhl_Libre } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Analytics } from "@vercel/analytics/next"

const rubik = Rubik({
  subsets: ["latin", "hebrew"],
  variable: "--font-sans",
})

const frankRuhlLibre = Frank_Ruhl_Libre({
  subsets: ["latin", "hebrew"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "שביל הבקעה | מסע בלב בקעת הירדן",
  description: "שביל הבקעה הוא שביל הליכה באורך של כ-110 קילומטרים, המחולק לשישה מקטעים החוצה את בקעת הירדן מצפון לדרום. גלו מעיינות מרהיבים, מצפים מרשימים ואתרי טבע ומורשת.",
  keywords: ["שביל הבקעה", "בקעת הירדן", "טיול", "מסלול הליכה", "ישראל", "מעיינות"],
  openGraph: {
    title: "שביל הבקעה | מסע בלב בקעת הירדן",
    description: "שביל הליכה באורך של כ-110 קילומטרים, המחולק לשישה מקטעים החוצה את בקעת הירדן מצפון לדרום.",
    type: "website",
    locale: "he_IL",
  },
}

export const viewport: Viewport = {
  themeColor: "#6B8E23",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" data-scroll-behavior="smooth">
      <body className={`${rubik.variable} ${frankRuhlLibre.variable} font-sans antialiased`}>
        {/* WCAG 2.4.1 Bypass Blocks — lets keyboard users jump the nav. */}
        <a
          href="#main-content"
          className="skip-link bg-primary text-primary-foreground px-4 py-3 rounded-lg font-medium shadow-lg"
        >
          דלג לתוכן הראשי
        </a>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
