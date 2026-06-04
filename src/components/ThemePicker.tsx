import { THEMES } from '@/theme/themes'
import { TRIP_THEMES, type TripTheme } from '@/types/trips'

interface Props {
  value: TripTheme
  onChange: (theme: TripTheme) => void
}

/**
 * Grid of colour swatches for picking a trip theme. Selecting a theme also
 * drives the suggested plan types shown on the new-trip screen.
 */
export function ThemePicker({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
      {TRIP_THEMES.map((theme) => {
        const def = THEMES[theme]
        const selected = theme === value
        return (
          <button
            key={theme}
            type="button"
            onClick={() => onChange(theme)}
            className={`flex flex-col items-center gap-1 rounded-xl p-3 text-white transition ${
              selected
                ? 'ring-2 ring-offset-2 ring-slate-900 scale-105'
                : 'opacity-90 hover:opacity-100'
            }`}
            style={{ background: def.gradient }}
            aria-pressed={selected}
          >
            <span className="text-2xl">{def.icon}</span>
            <span className="text-xs font-medium">{def.label}</span>
          </button>
        )
      })}
    </div>
  )
}
