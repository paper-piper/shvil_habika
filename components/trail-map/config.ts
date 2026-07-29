import { segments, accommodations } from "@/lib/data"

export const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ""

export const TRAIL_DATA_URL = "/map/data/trail.geojson"
export const POI_DATA_URL = "/map/data/poi.geojson"
export const GPX_URL = "/map/data/trail.gpx"
export const ISRAEL_HIKING_URL = "https://israelhiking.osm.org.il/share/Xv5jOPWGQr"

/* No bicycle route yet — the old map shipped a hike/bike toggle that pointed at
   a trail-bike.geojson which was never deployed, so switching modes just errored.
   Add the file and a mode switch here when the bike route is ready. */

export const POI_ICON_URLS: Record<string, string> = {
  water_source: "/map/icons/poi-water.svg",
  spring: "/map/icons/poi-spring.svg",
  container: "/map/icons/poi-container.svg",
}

export const POI_CATEGORY_LABELS: Record<string, string> = {
  water_source: "מקור מים",
  spring: "מעיין",
  container: "מכולת",
}

/* Trail colours drawn from the site palette (app/globals.css) so the map reads
   as part of the site rather than a separate app. Each is dark enough to keep
   >=3:1 contrast against the light halo drawn underneath it. */
export const SEG_COLORS: Record<number, string> = {
  1: "#4F681A",
  2: "#2C3E2F",
  3: "#8B6F47",
  4: "#A9662B",
  5: "#6B7F2E",
  6: "#6B4423",
}
export const SEG_OUTLINE = "#F5F1E8"
export const FALLBACK_COLOR = "#4F681A"
export const HIGHLIGHT_COLOR = "#2C3E2F"

export const LOAD_TIMEOUT_MS = 15000

export const DEFAULT_VIEW = {
  center: [35.5, 32.2] as [number, number],
  zoom: 8,
}

/** מוקד הבקעה — the same coordination line the rest of the site links to. */
export const COORDINATION_PHONE = "050-5804258"

const SEGMENT_IMAGES: Record<number, string> = {
  1: "/images/segments/1.jpeg",
  2: "/images/segments/2.jpg",
  3: "/images/segments/3.jpg",
  4: "/images/segments/4.jpeg",
  5: "/images/segments/5.jpg",
  6: "/images/segments/6.jpeg",
}

export type SegmentMetaItem = {
  segment: number
  title: string
  description: string
  difficulty: string
  duration: string
  distance: string
  note?: string
  requiresCoordination: boolean
  image: string
  ravshatz: { name: string; phone: string; town: string }[]
  lodging: typeof accommodations
}

/* Single source of truth is lib/data — the map must not drift from the
   segment pages. Trail geometry is ordered north→south, matching segment ids. */
export const SEGMENT_META: SegmentMetaItem[] = segments.map((segment) => ({
  segment: segment.id,
  title: segment.subtitle,
  description: segment.description,
  difficulty: segment.difficulty,
  duration: segment.duration,
  distance: segment.distance,
  note: segment.note,
  requiresCoordination: Boolean(segment.requiresCoordination),
  image: SEGMENT_IMAGES[segment.id],
  ravshatz: segment.ravshatz ?? [],
  lodging: accommodations.filter((a) => a.segment === segment.id),
}))

export function getSegmentMeta(seg: number) {
  return SEGMENT_META.find((item) => item.segment === Number(seg))
}
