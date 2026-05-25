import logoUrl from '../../../assets/logo.svg'
import { IconPanelLeft } from '../../../shared/ui/icons'
import { SidebarGroup } from './SidebarGroup'
import { navGroups } from '../model/navConfig'

interface SidebarProps {
  onToggle?: () => void
}

export function Sidebar({ onToggle }: SidebarProps) {
  return (
    <aside className="flex flex-col w-64 h-full shrink-0 bg-[#121212] border-r border-white/10 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-2 shrink-0">
        <div className="flex items-center px-2 py-1">
          <img src={logoUrl} alt="FARLABS" width={74} height={32} />
        </div>
        <button
          onClick={onToggle}
          aria-label="Toggle sidebar"
          className="flex items-center justify-center w-8 h-8 rounded-xl text-[#fafafa] hover:bg-[#262626] transition-colors cursor-pointer"
        >
          <IconPanelLeft />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto">
        {navGroups.map((group) => (
          <SidebarGroup key={group.id} group={group} />
        ))}
      </nav>
    </aside>
  )
}
