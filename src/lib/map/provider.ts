/**
 * Pluggable map provider interface.
 *
 * MapView / MapCanvas depend only on this contract, not on any concrete map
 * SDK. The current implementation is MapLibre GL + OpenStreetMap raster tiles
 * (see `maplibre.ts`); swapping to Mapbox / Google / Apple later means writing
 * one new module that satisfies `MapProvider` and changing `activeProvider`.
 */

export interface LngLat {
  lng: number
  lat: number
}

export interface MapMarker {
  id: string
  position: LngLat
  label?: string
  /** Hex colour for the marker; defaults to the active accent. */
  color?: string
}

export interface MapRoute {
  id: string
  /** Ordered points to connect (e.g. consecutive plan locations). */
  points: LngLat[]
  color?: string
}

export interface MapHandle {
  setMarkers(markers: MapMarker[]): void
  setRoutes(routes: MapRoute[]): void
  /** Fit the viewport to contain all given points. */
  fitBounds(points: LngLat[], opts?: { padding?: number }): void
  destroy(): void
}

export interface MapInitOptions {
  container: HTMLElement
  center?: LngLat
  zoom?: number
}

export interface MapProvider {
  readonly name: string
  init(options: MapInitOptions): Promise<MapHandle>
}
