import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import type {
  MapHandle,
  MapInitOptions,
  MapMarker,
  MapProvider,
  MapRoute,
} from './provider'

/**
 * MapLibre GL provider using OpenStreetMap raster tiles — no API key required.
 * This is the stub provider for Phase 2; it implements the full `MapProvider`
 * contract so the rest of the app is provider-agnostic.
 */
const OSM_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '© OpenStreetMap contributors',
    },
  },
  layers: [{ id: 'osm', type: 'raster', source: 'osm' }],
}

export const maplibreProvider: MapProvider = {
  name: 'maplibre-osm',

  async init({ container, center, zoom }: MapInitOptions): Promise<MapHandle> {
    const map = new maplibregl.Map({
      container,
      style: OSM_STYLE,
      center: center ? [center.lng, center.lat] : [0, 20],
      zoom: zoom ?? 1.5,
    })

    let markers: maplibregl.Marker[] = []

    await new Promise<void>((resolve) => map.once('load', () => resolve()))

    const clearMarkers = () => {
      markers.forEach((m) => m.remove())
      markers = []
    }

    const ROUTE_SOURCE = 'plan-routes'

    return {
      setMarkers(next: MapMarker[]) {
        clearMarkers()
        markers = next.map((m) =>
          new maplibregl.Marker({ color: m.color })
            .setLngLat([m.position.lng, m.position.lat])
            .setPopup(
              m.label ? new maplibregl.Popup().setText(m.label) : undefined,
            )
            .addTo(map),
        )
      },

      setRoutes(routes: MapRoute[]) {
        const data: GeoJSON.FeatureCollection = {
          type: 'FeatureCollection',
          features: routes.map((r) => ({
            type: 'Feature',
            properties: { color: r.color ?? '#2563eb' },
            geometry: {
              type: 'LineString',
              coordinates: r.points.map((p) => [p.lng, p.lat]),
            },
          })),
        }
        const existing = map.getSource(ROUTE_SOURCE) as
          | maplibregl.GeoJSONSource
          | undefined
        if (existing) {
          existing.setData(data)
        } else {
          map.addSource(ROUTE_SOURCE, { type: 'geojson', data })
          map.addLayer({
            id: ROUTE_SOURCE,
            type: 'line',
            source: ROUTE_SOURCE,
            paint: {
              'line-color': ['get', 'color'],
              'line-width': 3,
            },
          })
        }
      },

      fitBounds(points, opts) {
        if (points.length === 0) return
        const bounds = points.reduce(
          (b, p) => b.extend([p.lng, p.lat]),
          new maplibregl.LngLatBounds(
            [points[0].lng, points[0].lat],
            [points[0].lng, points[0].lat],
          ),
        )
        map.fitBounds(bounds, { padding: opts?.padding ?? 48, maxZoom: 14 })
      },

      destroy() {
        clearMarkers()
        map.remove()
      },
    }
  },
}

/** The provider the app currently uses. Swap here to change map backends. */
export const activeProvider: MapProvider = maplibreProvider
