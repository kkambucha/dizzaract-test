import { cn } from '../../../shared/lib/cn'
import {
  IconLayers,
  IconKey,
  IconStats,
  IconCard,
  IconUserCircle,
} from '../../../shared/ui/icons'

interface NavTab {
  id: string
  label: string
  icon: React.ReactNode
  active?: boolean
  badge?: number
}

const tabs: NavTab[] = [
  { id: 'models',   label: 'Models',   icon: <IconLayers className="w-6 h-6" /> },
  { id: 'api-keys', label: 'API keys', icon: <IconKey className="w-6 h-6" />, active: true },
  { id: 'usage',    label: 'Usage',    icon: <IconStats className="w-6 h-6" /> },
  { id: 'billing',  label: 'Billing',  icon: <IconCard className="w-6 h-6" />, badge: 8 },
  { id: 'account',  label: 'Account',  icon: <IconUserCircle className="w-6 h-6" /> },
]

export function BottomNav() {
  return (
    <nav className="flex items-center bg-[#121212] border-t border-white/10 shrink-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className="flex flex-1 flex-col items-center justify-center gap-1 pt-2 pb-1 overflow-hidden cursor-pointer"
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
                {tab.icon}
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
      ))}
    </nav>
  )
}
