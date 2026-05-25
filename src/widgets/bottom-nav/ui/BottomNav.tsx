import type { ComponentType, SVGProps } from 'react'
import cn from 'classnames'
import {
  IconLayers,
  IconKey,
  IconStats,
  IconCard,
  IconUserCircle,
} from '@/shared/ui/icons'

interface NavTab {
  id: string
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  active?: boolean
  badge?: number
}

const tabs: NavTab[] = [
  { id: 'models',   label: 'Models',   icon: IconLayers },
  { id: 'api-keys', label: 'API keys', icon: IconKey, active: true },
  { id: 'usage',    label: 'Usage',    icon: IconStats },
  { id: 'billing',  label: 'Billing',  icon: IconCard, badge: 8 },
  { id: 'account',  label: 'Account',  icon: IconUserCircle },
]

export function BottomNav() {
  return (
    <nav aria-label="Main navigation" className="flex items-center bg-[#121212] border-t border-white/10 shrink-0">
      {tabs.map((tab) => {
        const Icon = tab.icon
        return (
          <button
            key={tab.id}
            aria-current={tab.active ? 'page' : undefined}
            className="flex flex-1 flex-col items-center justify-center gap-1 pt-2 pb-3 overflow-hidden cursor-pointer"
          >
            {/* Icon container */}
            <div className="relative flex items-center justify-center w-12 h-8">
              <div
                className={cn(
                  'flex items-center justify-center w-12 h-8 rounded-2xl transition-colors',
                  tab.active ? 'bg-[#262626]' : '',
                )}
              >
                <span className={tab.active ? 'text-[#fafafa]' : 'text-[#a3a3a3]'}>
                  <Icon className="w-6 h-6" />
                </span>
              </div>

              {/* Badge */}
              {tab.badge !== undefined && (
                <span className="absolute -top-1 -right-1.5 flex items-center justify-center min-w-5 h-5 px-1 bg-[rgba(248,113,113,0.6)] rounded-full text-xs font-semibold text-white leading-none">
                  {tab.badge}
                </span>
              )}
            </div>

            {/* Label */}
            <span
              className={cn(
                'text-xs leading-4 text-center w-full truncate',
                tab.active ? 'text-[#fafafa]' : 'text-[#a3a3a3]',
              )}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
