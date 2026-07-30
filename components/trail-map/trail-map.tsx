"use client"

import { useEffect, useId, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AlertTriangle, ArrowRight, Download, ExternalLink, MapPin, Menu, Phone, Search } from "lucide-react"
import "mapbox-gl/dist/mapbox-gl.css"
import { cn } from "@/lib/utils"
import { NewWindowHint } from "@/components/new-window-hint"
import {
  COORDINATION_PHONE,
  GPX_URL,
  ISRAEL_HIKING_URL,
  POI_CATEGORY_LABELS,
  SEGMENT_META,
  SEG_COLORS,
  getSegmentMeta,
} from "./config"
import { useTrailMap } from "./use-trail-map"

function fmtKm(km: number | null) {
  if (km == null || !isFinite(km)) return "—"
  return `${(Math.round(km * 10) / 10).toFixed(1)} ק״מ`
}

type TrailMapProps = {
  /** Fullscreen view drops cooperative gestures — there's no page to scroll. */
  cooperativeGestures?: boolean
}

export function TrailMap({ cooperativeGestures = true }: TrailMapProps) {
  const {
    containerRef,
    status,
    statusMessage,
    segmentStats,
    totalKm,
    poiCount,
    pois,
    selectPoi,
    selectedSegment,
    selectSegment,
    fitAll,
    applyPoiFilter,
  } = useTrailMap({ cooperativeGestures })

  const [panelOpen, setPanelOpen] = useState(true)
  const [poiCategory, setPoiCategory] = useState("__all__")
  const [poiQuery, setPoiQuery] = useState("")

  // Mirrors the Mapbox layer filter (applyPoiFilter) so the accessible list
  // below shows exactly the same points as the map — the two must never
  // disagree about what's "currently visible".
  const filteredPois = pois.filter((poi) => {
    if (poiCategory !== "__all__" && poi.category !== poiCategory) return false
    const q = poiQuery.trim().toLocaleLowerCase("he")
    if (q && !poi.name.toLocaleLowerCase("he").includes(q)) return false
    return true
  })

  const panelId = useId()
  const poiTypeId = useId()
  const poiSearchId = useId()
  const detailHeadingRef = useRef<HTMLHeadingElement>(null)
  const segmentButtonsRef = useRef(new Map<number, HTMLButtonElement>())
  // Where to send focus after the panel swaps between list and detail view
  // (WCAG 2.4.3). Null means the change wasn't user-initiated — leave focus be.
  const pendingFocus = useRef<"detail" | number | null>(null)

  useEffect(() => {
    applyPoiFilter(poiCategory, poiQuery)
  }, [applyPoiFilter, poiCategory, poiQuery])

  // Runs after the swapped-in view has rendered, so the target exists.
  useEffect(() => {
    const target = pendingFocus.current
    if (target == null) return
    pendingFocus.current = null
    if (target === "detail") detailHeadingRef.current?.focus()
    else segmentButtonsRef.current.get(target)?.focus()
  }, [selectedSegment])

  function openSegment(seg: number) {
    pendingFocus.current = "detail"
    selectSegment(seg)
  }

  function closeSegment() {
    pendingFocus.current = selectedSegment
    selectSegment(null)
  }

  const selectedMeta = selectedSegment != null ? getSegmentMeta(selectedSegment) : undefined

  return (
    <div className="relative h-full w-full overflow-hidden bg-muted">
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{ position: "absolute", inset: 0 }}
        role="region"
        aria-label="מפת שביל הבקעה. השתמשו במקשי החיצים להזזת המפה ובמקשי + ו- לשינוי מרחק התצוגה."
      />

      {/* Status text for assistive tech; the visible copy lives in the panel header. */}
      <p role="status" aria-live="polite" className="sr-only">
        {statusMessage}
      </p>

      <div
        className={cn(
          "absolute inset-x-3.5 bottom-3.5 z-10 flex max-h-[60%] flex-col overflow-hidden rounded-xl border border-border bg-background shadow-lg",
          "sm:inset-x-auto sm:right-3.5 sm:top-3.5 sm:max-h-none sm:w-[22rem]",
          panelOpen ? "sm:bottom-3.5" : "sm:bottom-auto"
        )}
      >
        <div className="flex items-start justify-between gap-2 border-b border-border p-3">
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-foreground">מקטעי השביל</h2>
            <p className="truncate text-xs text-muted-foreground">{statusMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => setPanelOpen((open) => !open)}
            aria-expanded={panelOpen}
            aria-controls={panelId}
            className="flex-shrink-0 rounded-lg border border-border p-2 text-foreground transition-colors hover:bg-muted"
          >
            <Menu className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">{panelOpen ? "הסתרת לוח המקטעים" : "הצגת לוח המקטעים"}</span>
          </button>
        </div>

        <div id={panelId} hidden={!panelOpen} className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3">
          <dl className="mb-3 flex flex-wrap gap-2">
            <div className="rounded-full border border-border bg-card px-3 py-1.5 text-xs">
              <dt className="inline font-medium text-muted-foreground">סה״כ: </dt>
              <dd className="inline font-bold text-foreground">{fmtKm(totalKm)}</dd>
            </div>
            {poiCount != null && (
              <div className="rounded-full border border-border bg-card px-3 py-1.5 text-xs">
                <dt className="inline font-medium text-muted-foreground">נקודות עניין: </dt>
                <dd className="inline font-bold text-foreground">{poiCount}</dd>
              </div>
            )}
          </dl>

          {cooperativeGestures && (
            <p className="mb-3 text-xs text-muted-foreground">
              טיפ: להתמקדות במפה במחשב החזיקו Ctrl/⌘ תוך כדי גלילה.
            </p>
          )}

          {selectedMeta ? (
            <div>
              <button
                type="button"
                onClick={closeSegment}
                className="mb-3 inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
              >
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                חזרה לכל המקטעים
              </button>

              <h3 ref={detailHeadingRef} tabIndex={-1} className="text-base font-bold text-foreground">
                <span
                  className="ms-2 inline-block h-3 w-3 rounded-sm border border-border align-middle"
                  style={{ background: SEG_COLORS[selectedMeta.segment] }}
                  aria-hidden="true"
                />
                מקטע {selectedMeta.segment} — {selectedMeta.title}
              </h3>

              <div className="relative mt-2 aspect-[16/9] overflow-hidden rounded-lg bg-muted">
                <Image src={selectedMeta.image} alt="" fill sizes="22rem" className="object-cover" />
              </div>

              <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
                {[
                  ["אורך", selectedMeta.distance],
                  ["זמן", selectedMeta.duration],
                  ["דרגה", selectedMeta.difficulty],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-border bg-card p-2">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="font-bold text-foreground">{value}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-3 text-sm leading-relaxed text-foreground">{selectedMeta.description}</p>

              {selectedMeta.note && (
                <p className="mt-2 rounded-lg border border-border bg-card p-2 text-xs leading-relaxed text-muted-foreground">
                  {selectedMeta.note}
                </p>
              )}

              {selectedMeta.requiresCoordination && (
                <div className="mt-3 rounded-lg border border-destructive/40 bg-destructive/10 p-3">
                  <h4 className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                    <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                    נדרש תיאום מראש
                  </h4>
                  <a
                    href={`tel:${COORDINATION_PHONE.replace(/\D/g, "")}`}
                    aria-label={`התקשרו למוקד הבקעה בטלפון ${COORDINATION_PHONE}`}
                    className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    מוקד הבקעה {COORDINATION_PHONE}
                  </a>
                </div>
              )}

              {selectedMeta.ravshatz.length > 0 && (
                <section className="mt-3">
                  <h4 className="text-xs font-bold text-foreground">רבש״צ לתיאום לינה</h4>
                  <ul className="mt-1.5 space-y-1.5">
                    {selectedMeta.ravshatz.map((person) => (
                      <li key={person.phone} className="rounded-lg border border-border bg-card p-2 text-xs">
                        <span className="font-medium text-foreground">
                          {person.name} · {person.town}
                        </span>
                        <a
                          href={`tel:${person.phone.replace(/[^\d+]/g, "")}`}
                          className="mt-1 flex items-center gap-1.5 font-medium text-primary hover:underline"
                        >
                          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                          <span dir="ltr">{person.phone}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {selectedMeta.lodging.length > 0 && (
                <section className="mt-3">
                  <h4 className="text-xs font-bold text-foreground">לינה במקטע ({selectedMeta.lodging.length})</h4>
                  <ul className="mt-1.5 space-y-1.5">
                    {selectedMeta.lodging.map((place) => (
                      <li key={place.id} className="rounded-lg border border-border bg-card p-2 text-xs">
                        <p className="font-medium text-foreground">{place.name}</p>
                        <p className="text-muted-foreground">{place.location}</p>
                        <a
                          href={place.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-block font-medium text-primary hover:underline"
                        >
                          לפרטים
                          <span className="sr-only"> על {place.name} (נפתח בחלון חדש)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <Link
                href={`/segments/${selectedMeta.segment}`}
                className="mt-3 inline-block text-xs font-medium text-primary hover:underline"
              >
                לעמוד המלא של המקטע
              </Link>
            </div>
          ) : (
            <ul className="space-y-2">
              {SEGMENT_META.map((meta) => {
                const stat = segmentStats.find((s) => s.segment === meta.segment)
                return (
                  <li key={meta.segment}>
                    <button
                      type="button"
                      ref={(el) => {
                        if (el) segmentButtonsRef.current.set(meta.segment, el)
                        else segmentButtonsRef.current.delete(meta.segment)
                      }}
                      onClick={() => openSegment(meta.segment)}
                      disabled={!stat}
                      className="flex w-full items-center gap-2.5 rounded-xl border border-border bg-card p-2 text-start transition-colors hover:border-primary/50 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <span className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image src={meta.image} alt="" fill sizes="2.75rem" className="object-cover" />
                        <span
                          className="absolute inset-x-0 bottom-0 h-1"
                          style={{ background: SEG_COLORS[meta.segment] }}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-bold text-foreground">
                          מקטע {meta.segment} — {meta.title}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {meta.distance} · {meta.difficulty}
                        </span>
                      </span>
                      {meta.requiresCoordination && (
                        <AlertTriangle className="h-4 w-4 flex-shrink-0 text-accent" aria-hidden="true" />
                      )}
                      <span className="sr-only">
                        {meta.requiresCoordination ? "נדרש תיאום מראש. " : ""}
                        הצגת פרטי המקטע והתמקדות בו במפה
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          {poiCount != null && (
            <section className="mt-4 border-t border-border pt-3">
              <h3 className="mb-2 text-xs font-bold text-foreground">סינון נקודות עניין</h3>
              <label htmlFor={poiTypeId} className="mb-1 block text-xs text-muted-foreground">
                קטגוריה
              </label>
              <select
                id={poiTypeId}
                value={poiCategory}
                onChange={(e) => setPoiCategory(e.target.value)}
                className="w-full rounded-lg border border-border bg-card p-2 text-xs text-foreground"
              >
                <option value="__all__">כל הקטגוריות</option>
                {Object.entries(POI_CATEGORY_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>

              <label htmlFor={poiSearchId} className="mb-1 mt-2 block text-xs text-muted-foreground">
                חיפוש לפי שם
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute end-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  id={poiSearchId}
                  type="search"
                  value={poiQuery}
                  onChange={(e) => setPoiQuery(e.target.value)}
                  placeholder="לדוגמה: עין רועי"
                  className="w-full rounded-lg border border-border bg-card p-2 pe-7 text-xs text-foreground"
                />
              </div>

              {/* The map's own POI markers are canvas-rendered and only reveal
                  their name/description via mouse click — there's no way to
                  Tab to one or have a screen reader see it (WCAG 2.1.1). This
                  list is the accessible equivalent: every point's full text is
                  always visible here, and the button also re-centers the map
                  on it for sighted mouse users following along. */}
              <ul className="mt-3 space-y-2">
                {filteredPois.length === 0 && (
                  <li className="text-xs text-muted-foreground">אין נקודות עניין התואמות את הסינון.</li>
                )}
                {filteredPois.map((poi) => (
                  <li key={poi.id} className="rounded-lg border border-border bg-card p-2">
                    <button
                      type="button"
                      onClick={() => selectPoi(poi)}
                      className="text-start text-xs font-bold text-foreground hover:text-primary hover:underline"
                    >
                      {poi.name}
                      <span className="sr-only"> — הצגה במפה</span>
                    </button>
                    <p className="text-xs text-muted-foreground">
                      {POI_CATEGORY_LABELS[poi.category] ?? "נקודת עניין"}
                      {poi.description ? ` · ${poi.description}` : ""}
                    </p>
                    {poi.notes && <p className="text-xs text-muted-foreground">{poi.notes}</p>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border pt-3">
            <button
              type="button"
              onClick={fitAll}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              כל השביל
            </button>
            <a
              href={GPX_URL}
              download
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              הורדת GPX
            </a>
            <a
              href={ISRAEL_HIKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-2 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              פתח ב-Israel Hiking Maps
              <NewWindowHint />
            </a>
          </div>
        </div>
      </div>

      {/* z-[5]: above the bare map canvas, below the panel (z-10) — a slow or
          failed map load shouldn't hide the segment list, which loads independently. */}
      {status === "loading" && (
        <div className="absolute inset-0 z-[5] grid place-items-center bg-background/80">
          <p className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground shadow-lg">
            טוען את מפת שביל הבקעה…
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="absolute inset-0 z-[5] grid place-items-center bg-background/90 p-4">
          <p className="max-w-sm rounded-xl border border-destructive/40 bg-card px-4 py-3 text-center text-sm text-foreground shadow-lg">
            {statusMessage}
          </p>
        </div>
      )}
    </div>
  )
}
