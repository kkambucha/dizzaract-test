import { useState } from 'react'
import logoUrl from '@/assets/logo.svg'
import { IconPanelLeft } from '@/shared/ui/icons'
import { SidebarGroup } from './SidebarGroup'
import { navGroups } from '../model/navConfig'

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={[
        'flex flex-col h-full shrink-0 bg-[#121212] border-r border-white/10 overflow-hidden',
        'transition-[width] duration-200 ease-in-out',
        collapsed ? 'w-[60px]' : 'w-64',
      ].join(' ')}
    >
      {/* Header */}
      <div
        className={[
          'flex shrink-0 p-2',
          collapsed ? 'flex-col items-center gap-2' : 'items-center justify-between',
        ].join(' ')}
      >
        {/* Logo */}
        <div className={collapsed ? 'overflow-hidden w-9 h-8 shrink-0' : 'px-2 py-1 shrink-0'}>
          <img
            src={logoUrl}
            alt="FARLABS"
            width={74}
            height={32}
            className="max-w-none"
          />
        </div>

        {/* Toggle */}
        <button
          onClick={() => setCollapsed((v) => !v)}
          aria-label="Toggle sidebar"
          className="flex items-center justify-center w-8 h-8 rounded-xl text-[#fafafa] hover:bg-[#262626] transition-colors cursor-pointer shrink-0"
        >
          <IconPanelLeft />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden">
        {navGroups.map((group) => (
          <SidebarGroup key={group.id} group={group} collapsed={collapsed} />
        ))}
      </nav>
    </aside>
  )
}
