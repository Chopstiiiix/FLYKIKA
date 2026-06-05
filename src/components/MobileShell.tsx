import { Link } from 'react-router-dom'
import type { ComponentProps, ReactNode } from 'react'
import { Icon } from '@/components/Icon'

type NavItem = {
  icon: 'home' | 'menu' | 'sparkles' | 'user'
  label: string
  to: string
}

interface MobileShellProps {
  children: ReactNode
  activeNav?: string
  className?: string
  hideBottomNav?: boolean
  navItems?: NavItem[]
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { icon: 'home', label: 'Home', to: '/' },
  { icon: 'menu', label: 'Itinerary', to: '/' },
  { icon: 'sparkles', label: 'AI', to: '/' },
  { icon: 'user', label: 'Profile', to: '/' },
]

export function StatusBar() {
  return (
    <div className="pointer-events-none flex h-8 items-center justify-between px-6 pt-1 text-[13px] font-bold text-white">
      <span>9:30 PM</span>
      <div className="flex items-center gap-1.5">
        <span className="h-3 w-4 rounded-sm border border-white/80">
          <span className="block h-full w-3 rounded-[2px] bg-white" />
        </span>
        <span className="h-3 w-3 rounded-full border-2 border-white border-b-transparent border-l-transparent" />
        <span className="flex h-3 items-end gap-[2px]">
          <span className="h-1.5 w-1 rounded-full bg-white" />
          <span className="h-2.5 w-1 rounded-full bg-white" />
          <span className="h-3 w-1 rounded-full bg-white" />
        </span>
      </div>
    </div>
  )
}

export function RoundIconButton({
  icon,
  label,
  to,
  onClick,
  className = '',
}: {
  icon: ComponentProps<typeof Icon>['name']
  label: string
  to?: string
  onClick?: () => void
  className?: string
}) {
  const classes = `grid size-11 place-items-center rounded-full border border-white/10 bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.05)] backdrop-blur-xl transition hover:bg-white/15 ${className}`

  if (to) {
    return (
      <Link to={to} aria-label={label} title={label} className={classes}>
        <Icon name={icon} className="size-5" />
      </Link>
    )
  }

  return (
    <button type="button" aria-label={label} title={label} onClick={onClick} className={classes}>
      <Icon name={icon} className="size-5" />
    </button>
  )
}

export function BottomNav({
  active = 'Home',
  items = DEFAULT_NAV_ITEMS,
}: {
  active?: string
  items?: NavItem[]
}) {
  return (
    <nav className="pointer-events-auto absolute inset-x-0 bottom-6 z-30 mx-auto flex w-fit max-w-[calc(100%-2rem)] items-center gap-1 rounded-full border border-white/15 bg-white/20 p-1 shadow-[0_14px_45px_rgba(0,0,0,.45)] backdrop-blur-2xl">
      {items.map((item) => {
        const selected = item.label === active
        return (
          <Link
            key={item.label}
            to={item.to}
            aria-label={item.label}
            className={
              selected
                ? 'flex h-12 min-w-32 items-center justify-center gap-2 rounded-full bg-[#e9ff3d] px-5 text-[15px] font-extrabold text-black shadow-[0_0_28px_rgba(233,255,61,.38)]'
                : 'grid size-12 place-items-center rounded-full border border-white/12 bg-black/20 text-white/85'
            }
          >
            <Icon name={item.icon} className="size-5" />
            {selected && <span>{item.label}</span>}
          </Link>
        )
      })}
    </nav>
  )
}

export function MobileShell({
  activeNav = 'Home',
  children,
  className = '',
  hideBottomNav,
  navItems,
}: MobileShellProps) {
  return (
    <main className="travel-stage">
      <section className={`phone-shell ${className}`}>
        {children}
        {!hideBottomNav && <BottomNav active={activeNav} items={navItems} />}
        <div className="pointer-events-none absolute inset-x-0 bottom-2 z-40 mx-auto h-1 w-28 rounded-full bg-white" />
      </section>
    </main>
  )
}
