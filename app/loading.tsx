export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      {/* role="status" announces the wait; without it a screen reader user
          gets silence while the page swaps (WCAG 4.1.3 Status Messages). */}
      <div role="status" className="flex flex-col items-center gap-4">
        <div
          className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin"
          aria-hidden="true"
        />
        <p className="text-muted-foreground">טוען...</p>
      </div>
    </div>
  )
}
