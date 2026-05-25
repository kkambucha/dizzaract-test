import { cn } from '../../../shared/lib/cn'
import type { NavItem } from '../model/navConfig'

interface SidebarItemProps {
  item: NavItem
  onClick?: (id: string) => void
}

export function SidebarItem({ item, onClick }: SidebarItemProps) {
  return (
    <li>
      <button
        onClick={() => onClick?.(item.id)}
        className={cn(
          'flex items-center gap-2 w-full h-9 px-2 rounded-xl text-sm text-[#fafafa] text-left truncate transition-colors',
          item.active ? 'bg-[#262626] font-medium' : 'font-normal hover:bg-[#262626]',
        )}
      >
        <span className="flex shrink-0 w-4 h-4 items-center justify-center">
          {item.icon}
        </span>
        {item.label}
      </button>
    </li>
  )
}
