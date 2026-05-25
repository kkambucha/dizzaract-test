import { useEffect, useRef, useState } from 'react'
import { IconEllipsisVertical } from '../../../shared/ui/icons'

type MenuItemId = 'edit' | 'disable' | 'delete'

const menuItems: { id: MenuItemId; label: string; destructive?: boolean }[] = [
  { id: 'edit',    label: 'Edit' },
  { id: 'disable', label: 'Disable' },
  { id: 'delete',  label: 'Delete', destructive: true },
]

// 3 items × ~32px + 8px padding
const MENU_HEIGHT = 112

interface ApiKeyActionsMenuProps {
  onAction?: (action: MenuItemId) => void
  align?: 'left' | 'right'
}

export function ApiKeyActionsMenu({ onAction, align = 'right' }: ApiKeyActionsMenuProps) {
  const [open, setOpen]           = useState(false)
  const [openUpward, setOpenUpward] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef    = useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    if (!open && buttonRef.current) {
      const { top, bottom } = buttonRef.current.getBoundingClientRect()
      const spaceAbove = top
      const spaceBelow = window.innerHeight - bottom
      // open downward only when there's not enough room above
      setOpenUpward(spaceAbove >= MENU_HEIGHT || spaceAbove >= spaceBelow)
    }
    setOpen((v) => !v)
  }

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const positionClass = openUpward ? 'bottom-full mb-1' : 'top-full mt-1'
  const originClass   = openUpward ? 'origin-bottom-right' : 'origin-top-right'

  return (
    <div ref={containerRef} className="relative flex items-center">
      <button
        ref={buttonRef}
        aria-label="More options"
        aria-expanded={open}
        onClick={handleToggle}
        className="flex items-center justify-center w-6 h-6 rounded text-[#a3a3a3] hover:text-[#fafafa] hover:bg-white/10 transition-colors cursor-pointer"
      >
        <IconEllipsisVertical />
      </button>

      {open && (
        <div
          role="menu"
          className={[
            'absolute z-50 w-[140px]',
            positionClass,
            align === 'right' ? 'right-0' : 'left-0',
            'flex flex-col p-1',
            'bg-[#262626] border border-white/10 rounded-xl',
            'shadow-[0_4px_6px_rgba(0,0,0,0.15),0_2px_4px_rgba(0,0,0,0.1)]',
            'animate-menu-in',
            originClass,
          ].join(' ')}
        >
          {menuItems.map((item) => (
            <button
              key={item.id}
              role="menuitem"
              onClick={() => {
                setOpen(false)
                onAction?.(item.id)
              }}
              className={[
                'flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-sm text-left',
                'transition-colors cursor-pointer',
                item.destructive
                  ? 'text-[rgba(248,113,113,0.9)] hover:bg-white/5'
                  : 'text-[#fafafa] hover:bg-white/5',
              ].join(' ')}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
