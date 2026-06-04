import { Navigate, Route, Routes } from 'react-router-dom'
import type { JSX } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Auth } from '@/pages/Auth'
import { Trips } from '@/pages/Trips'
import { NewTrip } from '@/pages/NewTrip'
import { TripDetail } from '@/pages/TripDetail'
import { PlanEditor } from '@/pages/PlanEditor'
import { MapView } from '@/pages/MapView'

function RequireAuth({ children }: { children: JSX.Element }) {
  const { session, loading } = useAuth()
  if (loading) return <p className="p-6 text-slate-400">Loading…</p>
  if (!session) return <Navigate to="/auth" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Trips />
          </RequireAuth>
        }
      />
      <Route
        path="/trips/new"
        element={
          <RequireAuth>
            <NewTrip />
          </RequireAuth>
        }
      />
      <Route
        path="/trips/:tripId"
        element={
          <RequireAuth>
            <TripDetail />
          </RequireAuth>
        }
      />
      <Route
        path="/trips/:tripId/map"
        element={
          <RequireAuth>
            <MapView />
          </RequireAuth>
        }
      />
      <Route
        path="/trips/:tripId/plans/new"
        element={
          <RequireAuth>
            <PlanEditor />
          </RequireAuth>
        }
      />
      <Route
        path="/trips/:tripId/plans/:planId"
        element={
          <RequireAuth>
            <PlanEditor />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
