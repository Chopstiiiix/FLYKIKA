import { useEffect, useRef } from 'react'
import { activeProvider } from '@/lib/map/maplibre'
import type { MapHandle, MapMarker, MapRoute } from '@/lib/map/provider'

interface Props {
  markers?: MapMarker[]
  routes?: MapRoute[]
  className?: string
}

/**
 * Thin React wrapper over the active `MapProvider`. Knows nothing about plans —
 * the caller (MapView) translates plan locations into markers/routes.
 */
export function MapCanvas({ markers = [], routes = [], className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<MapHandle | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    let disposed = false

    activeProvider.init({ container: containerRef.current }).then((handle) => {
      if (disposed) {
        handle.destroy()
        return
      }
      handleRef.current = handle
      handle.setMarkers(markers)
      handle.setRoutes(routes)
      handle.fitBounds(markers.map((m) => m.position))
    })

    return () => {
      disposed = true
      handleRef.current?.destroy()
      handleRef.current = null
    }
    // Re-init only on mount; marker/route updates handled below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    handleRef.current?.setMarkers(markers)
    handleRef.current?.setRoutes(routes)
  }, [markers, routes])

  return <div ref={containerRef} className={className ?? 'h-full w-full'} />
}
