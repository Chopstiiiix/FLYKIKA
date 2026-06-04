import type { TripTheme } from '@/types/trips'
import type { PlanType } from '@/types/plans'

export interface ThemeDef {
  label: string
  /** Solid accent colour (hex). Drives `--accent`. */
  accent: string
  /** CSS gradient string. Drives `--accent-gradient`. */
  gradient: string
  /** Emoji icon shown on swatches / trip cards. */
  icon: string
  /** Plan types pre-suggested when creating a trip with this theme. */
  suggestedPlanTypes: PlanType[]
}

/**
 * Theme registry keyed by `trip_theme`. The trip detail screen reads the
 * active trip's theme and writes `accent` + `gradient` to CSS custom
 * properties on a wrapper, recolouring the whole trip view.
 */
export const THEMES: Record<TripTheme, ThemeDef> = {
  beach: {
    label: 'Beach',
    accent: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #22d3ee 0%, #0ea5e9 100%)',
    icon: '🏖️',
    suggestedPlanTypes: ['lodging', 'dining', 'activity'],
  },
  city_break: {
    label: 'City Break',
    accent: '#6366f1',
    gradient: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
    icon: '🏙️',
    suggestedPlanTypes: ['flight', 'lodging', 'dining', 'activity'],
  },
  business: {
    label: 'Business',
    accent: '#334155',
    gradient: 'linear-gradient(135deg, #64748b 0%, #334155 100%)',
    icon: '💼',
    suggestedPlanTypes: ['flight', 'lodging', 'meeting', 'car'],
  },
  adventure: {
    label: 'Adventure',
    accent: '#16a34a',
    gradient: 'linear-gradient(135deg, #4ade80 0%, #16a34a 100%)',
    icon: '🥾',
    suggestedPlanTypes: ['activity', 'lodging', 'car'],
  },
  road_trip: {
    label: 'Road Trip',
    accent: '#f97316',
    gradient: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
    icon: '🚗',
    suggestedPlanTypes: ['car', 'lodging', 'parking', 'dining'],
  },
  romantic: {
    label: 'Romantic',
    accent: '#ec4899',
    gradient: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)',
    icon: '💕',
    suggestedPlanTypes: ['lodging', 'dining', 'activity'],
  },
  family: {
    label: 'Family',
    accent: '#eab308',
    gradient: 'linear-gradient(135deg, #facc15 0%, #eab308 100%)',
    icon: '👨‍👩‍👧‍👦',
    suggestedPlanTypes: ['flight', 'lodging', 'activity', 'dining'],
  },
  festival: {
    label: 'Festival',
    accent: '#a855f7',
    gradient: 'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)',
    icon: '🎪',
    suggestedPlanTypes: ['lodging', 'activity', 'dining'],
  },
  ski: {
    label: 'Ski',
    accent: '#0891b2',
    gradient: 'linear-gradient(135deg, #38bdf8 0%, #0891b2 100%)',
    icon: '⛷️',
    suggestedPlanTypes: ['flight', 'lodging', 'car', 'activity'],
  },
  backpacking: {
    label: 'Backpacking',
    accent: '#65a30d',
    gradient: 'linear-gradient(135deg, #a3e635 0%, #65a30d 100%)',
    icon: '🎒',
    suggestedPlanTypes: ['train', 'ferry', 'lodging', 'activity'],
  },
}

/** Apply a theme's accent + gradient to a DOM element via CSS custom props. */
export function applyThemeVars(el: HTMLElement, theme: TripTheme): void {
  const def = THEMES[theme]
  el.style.setProperty('--accent', def.accent)
  el.style.setProperty('--accent-gradient', def.gradient)
}
