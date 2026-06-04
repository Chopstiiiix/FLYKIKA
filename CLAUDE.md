# FlyKika

Cross-platform (web + iOS + Android) travel planner. A static Vite/React build
wrapped by Capacitor for native. Backend is Supabase.

- **App name:** FlyKika
- **Bundle ID:** `net.inspireedge.flykika`

> **Status:** Phase 0 — project scaffolded, awaiting review before Phase 1
> feature work. Pages under `src/pages/` are clearly-marked stubs.

## Stack

| Concern        | Choice                                                       |
| -------------- | ------------------------------------------------------------ |
| Build / UI     | Vite + React 19 + TypeScript                                 |
| Styling        | Tailwind CSS v4 (via `@tailwindcss/vite`)                    |
| Theming        | Per-trip CSS custom properties (`--accent`, `--accent-gradient`) |
| Server state   | TanStack Query                                               |
| Routing        | react-router-dom                                             |
| Backend        | Supabase — Postgres + PostGIS + Auth + Realtime + Storage    |
| Native shell   | Capacitor (iOS + Android)                                    |
| Auth storage   | `@capacitor/preferences` (NOT localStorage)                  |
| Maps           | MapLibre GL + OpenStreetMap, behind a pluggable provider     |

Capacitor needs a **static** build, so this is intentionally Vite, not Next.js.

## Data model

Core concept: **every plan type is a `plans` row attached to a `trip`.** All
plans share one shape (time, location, confirmation, status) + a `details`
JSONB column for type-specific fields. Maps/Directions is a *view layer* over
plan locations, not a plan type.

Schema lives in `supabase/migrations/0001_init.sql`:

- `trips` — owned by `auth.users`; has a `theme` (`trip_theme` enum).
- `plans` — FK to `trips`; `type` (`plan_type` enum), shared columns,
  PostGIS `geography(Point,4326)` for start/end locations, `details` JSONB.
- Enums: `trip_theme` (10), `plan_type` (10), `plan_status`, `plan_source`.
- RLS: users can only touch their own trips, and plans whose trip they own.

### Plan `details` shapes

Typed as a discriminated union on `type` in `src/types/plans.ts`:

| type           | details fields                                              |
| -------------- | ----------------------------------------------------------- |
| flight         | flightNumber, airline, depAirport, arrAirport, gate, seat, pnr |
| lodging        | propertyName, roomType, checkIn, checkOut, address          |
| car            | vendor, vehicleClass, pickupAddress, dropoffAddress         |
| dining         | restaurant, partySize, cuisine                              |
| meeting        | attendees[], agenda, videoLink                              |
| cruise / ferry | operator, vessel, departurePort, arrivalPort, cabin         |
| activity       | provider, voucherCode, meetingPoint                         |
| parking        | facility, spot, plate                                       |
| train          | operator, coach, seat, depStation, arrStation               |

## Theme system

`src/theme/themes.ts` exports `THEMES`, keyed by `trip_theme`, each with
`{ label, accent, gradient, icon, suggestedPlanTypes[] }`. On the trip detail
screen, `applyThemeVars()` writes the theme's `accent`/`gradient` to CSS custom
properties on a wrapper, recolouring the whole trip view. Tailwind exposes
`--accent` as the `accent` color utility (`text-accent`, `bg-accent`, …) via
`@theme inline` in `src/index.css`. On trip creation, the theme picker is a grid
of colour swatches that also surfaces the theme's suggested plan types.

## Project structure

```
src/
  lib/
    supabase.ts          Supabase client (Capacitor Preferences auth storage)
    queryClient.ts       TanStack Query client
    map/
      provider.ts        Pluggable MapProvider interface
      maplibre.ts        MapLibre + OSM implementation (activeProvider)
  types/
    plans.ts             Plan discriminated union + details shapes
    trips.ts             Trip + TripTheme
  theme/themes.ts        THEMES map + applyThemeVars()
  hooks/
    useAuth.tsx          AuthProvider + useAuth (session state)
    useTrips.ts          useTrips / useTrip / useCreateTrip
    useTripPlans.ts      useTripPlans + create/update/delete mutations
  components/  TripCard, PlanCard, Timeline, ThemePicker, MapCanvas
  pages/       Auth, Trips, NewTrip, TripDetail, PlanEditor, MapView
  App.tsx      Router + RequireAuth guard
  main.tsx     Providers (Query, Auth, Router)
supabase/migrations/0001_init.sql
```

## Setup

1. Fill in `.env.local` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
2. Apply the migration to your Supabase project (SQL editor or `supabase db push`).
3. `npm run dev`.

### Native (after first web build)

```bash
npm run build
npx cap add ios
npx cap add android
npx cap sync
```

> Bundle ID is `net.inspireedge.flykika` (set in `capacitor.config.ts`). It's
> fixed before the native projects are added — changing it later means
> regenerating them.

## Build order / phases

- **Phase 1 (next):** Auth + trips list + create-trip with theme picker + trip
  detail showing plans on a day-grouped timeline. Full CRUD on all 10 plan
  types via the JSONB model. Theme accent applied per trip.
- **Phase 2:** MapView — plot plan locations, route consecutive items. Map
  provider stays behind the pluggable interface (Leaflet/MapLibre + OSM stub).
- **Phase 3:** Email ingestion (forwarding address → LLM parser worker on
  Railway).
- **Phase 4:** One booking vertical (Activities / Viator).
