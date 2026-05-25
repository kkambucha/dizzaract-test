import { SidebarItem } from './SidebarItem'
import type { NavGroup } from '../model/navConfig'

interface SidebarGroupProps {
  group: NavGroup
  onItemClick?: (id: string) => void
}

export function SidebarGroup({ group, onItemClick }: SidebarGroupProps) {
  return (
    <div className="p-2">
      <p
        className={`px-2 pb-1 text-xs font-medium leading-4 truncate ${
          group.dimLabel ? 'text-[#a3a3a3] opacity-70' : 'text-[#fafafa]'
        }`}
      >
        {group.label}
      </p>
      <ul className="flex flex-col gap-0 list-none m-0 p-0">
        {group.items.map((item) => (
          <SidebarItem key={item.id} item={item} onClick={onItemClick} />
        ))}
      </ul>
    </div>
  )
}
