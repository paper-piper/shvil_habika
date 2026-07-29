"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import { bbox as turfBbox, length as turfLength } from "@turf/turf"
import {
  MAPBOX_ACCESS_TOKEN,
  TRAIL_DATA_URL,
  POI_DATA_URL,
  POI_ICON_URLS,
  POI_CATEGORY_LABELS,
  SEG_COLORS,
  SEG_OUTLINE,
  FALLBACK_COLOR,
  HIGHLIGHT_COLOR,
  LOAD_TIMEOUT_MS,
  DEFAULT_VIEW,
  SEGMENT_META,
} from "./config"

type Bbox = [number, number, number, number]

export type SegmentStat = { segment: number; lengthKm: number; bbox: Bbox }
export type TrailMapStatus = "loading" | "ready" | "error"

const FALLBACK_POI_ICON_ID = "poi-icon-fallback"
const POI_CATEGORY_ICON_IDS: Record<string, string> = {
  water_source: "poi-icon-water_source",
  spring: "poi-icon-spring",
  container: "poi-icon-container",
}
const COORDINATION_SEGMENTS = SEGMENT_META.filter((m) => m.requiresCoordination).map((m) => m.segment)
/** Filter that matches nothing, used to blank out the highlight layer. */
const NO_SEGMENT = -9999

function buildTrailColorExpression() {
  return [
    "match",
    ["get", "segment"],
    1, SEG_COLORS[1],
    2, SEG_COLORS[2],
    3, SEG_COLORS[3],
    4, SEG_COLORS[4],
    5, SEG_COLORS[5],
    6, SEG_COLORS[6],
    FALLBACK_COLOR,
  ] as unknown as mapboxgl.ExpressionSpecification
}

function segmentFilter(segs: number[]) {
  return ["all", ["==", ["geometry-type"], "LineString"], ["in", ["get", "segment"], ["literal", segs]]] as unknown as mapboxgl.FilterSpecification
}

function mergeBbox(a: Bbox | null, b: Bbox): Bbox {
  if (!a) return b
  return [Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.max(a[2], b[2]), Math.max(a[3], b[3])]
}

/**
 * The GeoJSON carries no segment numbers — day-segment lines are identified by
 * name and numbered north→south, which is the order lib/data uses.
 */
function assignSegmentNumbers(trailData: GeoJSON.FeatureCollection) {
  trailData.features
    .filter((f) => f.geometry?.type === "LineString" && /מקטע\s+יום/.test(String(f.properties?.name ?? "")))
    .map((feature) => ({ feature, northLat: turfBbox(feature)[3] }))
    .sort((a, b) => b.northLat - a.northLat)
    .forEach(({ feature }, index) => {
      feature.properties = { ...feature.properties, segment: index + 1 }
    })
}

function computeStats(trailData: GeoJSON.FeatureCollection) {
  const stats = new Map<number, SegmentStat>()
  let allBbox: Bbox | null = null
  let totalKm = 0

  for (const feature of trailData.features) {
    if (feature.geometry?.type !== "LineString") continue
    const bb = turfBbox(feature) as Bbox
    allBbox = mergeBbox(allBbox, bb)

    // Alternate/variant lines carry no segment number and are excluded from
    // the totals so the reported distance matches the published segments.
    const seg = Number(feature.properties?.segment ?? 0)
    if (!seg) continue

    const lengthKm = turfLength(feature as GeoJSON.Feature<GeoJSON.LineString>, { units: "kilometers" })
    totalKm += lengthKm
    const existing = stats.get(seg)
    stats.set(seg, existing ? { ...existing, lengthKm: existing.lengthKm + lengthKm, bbox: mergeBbox(existing.bbox, bb) } : { segment: seg, lengthKm, bbox: bb })
  }

  return { stats, allBbox, totalKm }
}

function createFallbackPoiImage(size = 32) {
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")!
  ctx.fillStyle = HIGHLIGHT_COLOR
  ctx.beginPath()
  ctx.arc(size / 2, size / 2, 13, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = SEG_OUTLINE
  ctx.beginPath()
  ctx.arc(size / 2, size / 2, 5, 0, Math.PI * 2)
  ctx.fill()
  return ctx.getImageData(0, 0, size, size)
}

async function ensurePoiIcons(map: mapboxgl.Map) {
  if (!map.hasImage(FALLBACK_POI_ICON_ID)) map.addImage(FALLBACK_POI_ICON_ID, createFallbackPoiImage(), { pixelRatio: 2 })
  for (const [category, iconUrl] of Object.entries(POI_ICON_URLS)) {
    const iconId = POI_CATEGORY_ICON_IDS[category]
    if (map.hasImage(iconId)) continue
    try {
      const image = await new Promise<ImageBitmap | HTMLImageElement | ImageData>((resolve, reject) =>
        map.loadImage(iconUrl, (err, loaded) => (err ? reject(err) : resolve(loaded!)))
      )
      map.addImage(iconId, image)
    } catch {
      map.addImage(iconId, createFallbackPoiImage(), { pixelRatio: 2 })
    }
  }
}

async function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout>
  const timeout = new Promise<T>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Timeout: ${label}`)), ms)
  })
  try {
    return await Promise.race([promise, timeout])
  } finally {
    clearTimeout(timer!)
  }
}

export type UseTrailMapOptions = {
  /** Require Ctrl/⌘ + scroll to zoom, so the page still scrolls over the map. */
  cooperativeGestures?: boolean
}

export function useTrailMap({ cooperativeGestures = true }: UseTrailMapOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const allBboxRef = useRef<Bbox | null>(null)

  const [status, setStatus] = useState<TrailMapStatus>("loading")
  const [statusMessage, setStatusMessage] = useState("טוען את מפת שביל הבקעה…")
  const [segmentStats, setSegmentStats] = useState<SegmentStat[]>([])
  const [totalKm, setTotalKm] = useState<number | null>(null)
  const [poiCount, setPoiCount] = useState<number | null>(null)
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null)

  const fitBounds = useCallback((box: Bbox, padding = 60) => {
    mapRef.current?.fitBounds(
      [
        [box[0], box[1]],
        [box[2], box[3]],
      ],
      { padding, duration: 650 }
    )
  }, [])

  const selectSegment = useCallback(
    (seg: number | null, { zoom = true }: { zoom?: boolean } = {}) => {
      setSelectedSegment(seg)
      const map = mapRef.current
      if (!map?.getLayer("trail-highlight")) return

      map.setFilter("trail-highlight", segmentFilter([seg ?? NO_SEGMENT]))
      map.setPaintProperty("trail-base", "line-opacity", seg == null ? 0.9 : 0.3)

      if (seg == null) {
        setStatusMessage("מוצג כל השביל.")
        return
      }
      const stat = segmentStats.find((s) => s.segment === seg)
      if (zoom && stat) fitBounds(stat.bbox)
      setStatusMessage(`נבחר מקטע ${seg}.`)
    },
    [segmentStats, fitBounds]
  )

  const fitAll = useCallback(() => {
    selectSegment(null)
    if (allBboxRef.current) fitBounds(allBboxRef.current)
  }, [selectSegment, fitBounds])

  const applyPoiFilter = useCallback((category: string, query: string) => {
    const map = mapRef.current
    if (!map?.getLayer("poi-layer")) return
    const filters: unknown[] = ["all", ["==", ["geometry-type"], "Point"]]
    if (category && category !== "__all__") filters.push(["==", ["get", "category"], category])
    const q = query.trim().toLocaleLowerCase("he")
    if (q) filters.push([">=", ["index-of", q, ["downcase", ["coalesce", ["get", "name"], ""]]], 0])
    map.setFilter("poi-layer", filters as unknown as mapboxgl.FilterSpecification)
  }, [])

  // Holds the latest selectSegment so the map click handler, bound once, never
  // reads a stale segmentStats closure.
  const selectSegmentRef = useRef(selectSegment)
  selectSegmentRef.current = selectSegment

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN

    const map = new mapboxgl.Map({
      container,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: DEFAULT_VIEW.center,
      zoom: DEFAULT_VIEW.zoom,
      cooperativeGestures,
    })
    mapRef.current = map
    map.addControl(new mapboxgl.NavigationControl(), "top-left")

    // Mapbox reports style/source/tile failures through this event only —
    // without it a broken map just renders blank with no trace anywhere.
    map.on("error", (e) => console.error("[trail-map] mapbox error:", e.error?.message ?? e))
    ;(window as unknown as { __trailMap?: mapboxgl.Map }).__trailMap = map

    // The container sits in an aspect-ratio/flex box, so it can still be 0x0
    // on the very first layout pass. mapbox-gl's own 'load' event needs a
    // real first render and can stall if it fires before that settles —
    // force a resize whenever the container's actual size changes so the
    // map never gets stuck showing a blank canvas.
    const resizeObserver = new ResizeObserver(() => map.resize())
    resizeObserver.observe(container)

    function addTrailLayers(trailData: GeoJSON.FeatureCollection) {
      map.addSource("trail-src", { type: "geojson", data: trailData })

      map.addLayer({
        id: "trail-halo",
        type: "line",
        source: "trail-src",
        filter: ["==", ["geometry-type"], "LineString"],
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-width": 7, "line-opacity": 0.9, "line-color": SEG_OUTLINE },
      })

      map.addLayer({
        id: "trail-base",
        type: "line",
        source: "trail-src",
        filter: ["==", ["geometry-type"], "LineString"],
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-width": 4, "line-opacity": 0.9, "line-color": buildTrailColorExpression() },
      })

      // line-dasharray isn't data-driven, so segments needing army coordination
      // get their own dashed overlay layer.
      map.addLayer({
        id: "trail-coordination",
        type: "line",
        source: "trail-src",
        filter: segmentFilter(COORDINATION_SEGMENTS),
        layout: { "line-join": "round", "line-cap": "butt" },
        paint: { "line-width": 4, "line-opacity": 0.95, "line-color": SEG_OUTLINE, "line-dasharray": [1.5, 1.5] },
      })

      map.addLayer({
        id: "trail-highlight",
        type: "line",
        source: "trail-src",
        filter: segmentFilter([NO_SEGMENT]),
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-width": 8, "line-opacity": 0.95, "line-color": HIGHLIGHT_COLOR },
      })

      map.on("click", "trail-base", (e) => {
        const seg = Number(e.features?.[0]?.properties?.segment)
        if (seg) selectSegmentRef.current(seg)
      })
      map.on("mouseenter", "trail-base", () => (map.getCanvas().style.cursor = "pointer"))
      map.on("mouseleave", "trail-base", () => (map.getCanvas().style.cursor = ""))
    }

    function addPoiLayer() {
      map.addLayer({
        id: "poi-layer",
        type: "symbol",
        source: "poi-src",
        filter: ["==", ["geometry-type"], "Point"],
        layout: {
          "icon-image": [
            "coalesce",
            ["image", ["concat", "poi-icon-", ["get", "category"]]],
            ["image", FALLBACK_POI_ICON_ID],
          ] as unknown as mapboxgl.ExpressionSpecification,
          "icon-size": 0.85,
          "icon-allow-overlap": true,
        },
      })

      map.on("mouseenter", "poi-layer", () => (map.getCanvas().style.cursor = "pointer"))
      map.on("mouseleave", "poi-layer", () => (map.getCanvas().style.cursor = ""))
      map.on("click", "poi-layer", (e) => {
        const p = e.features?.[0]?.properties ?? {}
        const category = POI_CATEGORY_LABELS[String(p.category ?? "")] ?? "נקודת עניין"
        const popup = document.createElement("div")
        popup.style.font = "14px/1.5 var(--font-sans, system-ui)"
        popup.style.minWidth = "200px"
        popup.dir = "rtl"

        const name = document.createElement("div")
        name.style.fontWeight = "700"
        name.textContent = String(p.name ?? "נקודת עניין")

        const cat = document.createElement("div")
        cat.style.cssText = "font-size:12px;opacity:0.75;margin-bottom:4px"
        cat.textContent = category

        const desc = document.createElement("div")
        desc.style.fontSize = "12px"
        desc.textContent = String(p.description ?? "אין תיאור.")

        popup.append(name, cat, desc)
        if (p.notes) {
          const notes = document.createElement("div")
          notes.style.cssText = "font-size:12px;opacity:0.8;margin-top:4px"
          notes.textContent = String(p.notes)
          popup.append(notes)
        }

        new mapboxgl.Popup({ closeButton: true, maxWidth: "320px" }).setLngLat(e.lngLat).setDOMContent(popup).addTo(map)
      })
    }

    async function loadPoi() {
      try {
        const res = await fetch(POI_DATA_URL)
        if (!res.ok) throw new Error(`POI HTTP ${res.status}`)
        const data = (await res.json()) as GeoJSON.FeatureCollection
        if (!Array.isArray(data.features)) throw new Error("bad-geojson")
        if (cancelled) return

        map.addSource("poi-src", { type: "geojson", data })
        await ensurePoiIcons(map)
        if (cancelled) return
        addPoiLayer()
        setPoiCount(data.features.length)
      } catch {
        // Points of interest are supplementary — the trail still works without them.
        if (!cancelled) setPoiCount(null)
      }
    }

    async function boot() {
      // Wait for the style to be *parsed*, not for a full visual render —
      // the latter ('load') depends on container size and can hang if the
      // page's layout hasn't settled yet. Adding sources/layers only needs
      // the style, so this is both safe and much less prone to stalling.
      const styleReady = new Promise<void>((resolve) =>
        map.isStyleLoaded() ? resolve() : map.once("style.load", () => resolve())
      )

      // Trail stats/segment list don't depend on the map at all — fetch them
      // in parallel so the panel populates even if map init is slow.
      const trailDataPromise = (async () => {
        const res = await withTimeout(fetch(TRAIL_DATA_URL), LOAD_TIMEOUT_MS, "load trail")
        if (!res.ok) throw new Error(`GeoJSON HTTP ${res.status}`)
        const trailData = (await res.json()) as GeoJSON.FeatureCollection
        assignSegmentNumbers(trailData)
        const { stats, allBbox, totalKm: total } = computeStats(trailData)
        if (cancelled) return null

        allBboxRef.current = allBbox
        setSegmentStats([...stats.values()].sort((a, b) => a.segment - b.segment))
        setTotalKm(total)
        return trailData
      })()

      const [, trailData] = await Promise.all([
        withTimeout(styleReady, LOAD_TIMEOUT_MS, "load map style"),
        trailDataPromise,
      ])
      if (cancelled || !trailData) return

      addTrailLayers(trailData)
      if (allBboxRef.current) fitBounds(allBboxRef.current)

      await loadPoi()
      if (cancelled) return
      setStatus("ready")
      setStatusMessage("המפה נטענה. מוצג כל השביל.")
    }

    boot().catch((err) => {
      if (cancelled) return
      console.error(err)
      setStatus("error")
      setStatusMessage(
        String(err?.message).includes("Timeout")
          ? "טעינת המפה נמשכה זמן רב מדי. נסו לרענן את העמוד."
          : "אירעה שגיאה בטעינת המפה. נסו לרענן את העמוד."
      )
    })

    return () => {
      cancelled = true
      resizeObserver.disconnect()
      map.remove()
      mapRef.current = null
    }
  }, [cooperativeGestures, fitBounds])

  return {
    containerRef,
    status,
    statusMessage,
    segmentStats,
    totalKm,
    poiCount,
    selectedSegment,
    selectSegment,
    fitAll,
    applyPoiFilter,
  }
}
