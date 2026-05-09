import Link from "next/link"
import { Compass, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
            <Compass className="h-10 w-10 text-muted-foreground" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-2">העמוד לא נמצא</p>
        <p className="text-muted-foreground mb-8">
          נראה שהלכתם לאיבוד... אל דאגה, אנחנו כאן לעזור!
        </p>
        
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Home className="h-5 w-5" />
          <span>חזרה לדף הבית</span>
        </Link>
      </div>
    </div>
  )
}
