import cn from 'classnames'
import type { NavItem } from '../model/navConfig'

interface SidebarItemProps {
  item: NavItem
  collapsed?: boolean
  onClick?: (id: string) => void
}

export function SidebarItem({ item, collapsed, onClick }: SidebarItemProps) {
  const Icon = item.icon
  return (
    <li>
      <button
        title={collapsed ? item.label : undefined}
        aria-current={item.active ? 'page' : undefined}
        onClick={() => onClick?.(item.id)}
        className={cn(
          'flex items-center w-full h-9 rounded-xl text-sm text-[#fafafa] transition-colors cursor-pointer',
          collapsed ? 'justify-center px-2' : 'gap-2 px-2 text-left',
          item.active ? 'bg-[#262626] font-medium' : 'font-normal hover:bg-[#262626]',
        )}
      >
        <span className="flex shrink-0 w-4 h-4 items-center justify-center">
          <Icon />
        </span>
        {!collapsed && <span className="truncate">{item.label}</span>}
      </button>
    </li>
  )
}
