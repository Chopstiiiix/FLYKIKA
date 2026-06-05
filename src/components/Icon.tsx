import type { SVGProps } from 'react'

type IconName =
  | 'arrowLeft'
  | 'arrowUpRight'
  | 'bell'
  | 'clock'
  | 'home'
  | 'landmark'
  | 'menu'
  | 'mic'
  | 'search'
  | 'sparkles'
  | 'ticket'
  | 'user'
  | 'wand'

const PATHS: Record<IconName, string[]> = {
  arrowLeft: ['M19 12H5', 'M12 19l-7-7 7-7'],
  arrowUpRight: ['M7 17 17 7', 'M8 7h9v9'],
  bell: [
    'M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8',
    'M10 20a2 2 0 0 0 4 0',
  ],
  clock: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 6v6l4 2'],
  home: ['M3 11l9-8 9 8', 'M5 10v10h14V10', 'M9 20v-6h6v6'],
  landmark: [
    'M3 21h18',
    'M5 21v-8',
    'M9 21v-8',
    'M15 21v-8',
    'M19 21v-8',
    'M12 3l9 6H3l9-6Z',
  ],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  mic: [
    'M12 14a4 4 0 0 0 4-4V6a4 4 0 0 0-8 0v4a4 4 0 0 0 4 4Z',
    'M19 10a7 7 0 0 1-14 0',
    'M12 17v5',
  ],
  search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z', 'M21 21l-4.3-4.3'],
  sparkles: [
    'M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z',
    'M5 17l.8 2.2L8 20l-2.2.8L5 23l-.8-2.2L2 20l2.2-.8L5 17Z',
  ],
  ticket: [
    'M4 7a2 2 0 0 1 2-2h16v5a3 3 0 0 0 0 6v5H6a2 2 0 0 1-2-2v-5a3 3 0 0 0 0-6V7Z',
    'M13 5v18',
  ],
  user: ['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M4 21a8 8 0 0 1 16 0'],
  wand: [
    'M15 4l5 5',
    'M14 10l-9 9-2-2 9-9',
    'M4 4h.01',
    'M9 2h.01',
    'M20 16h.01',
    'M18 21h.01',
  ],
}

export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      aria-hidden="true"
      {...props}
    >
      {PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}
