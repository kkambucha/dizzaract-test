import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { IconEllipsisVertical } from '@/shared/ui/icons'

type MenuItemId = 'edit' | 'disable' | 'delete'

const menuItems: { id: MenuItemId; label: string; destructive?: boolean }[] = [
  { id: 'edit',    label: 'Edit' },
  { id: 'disable', label: 'Disable' },
  { id: 'delete',  label: 'Delete', destructive: true },
]

const MENU_WIDTH = 140
const GAP        = 4

interface ApiKeyActionsMenuProps {
  onAction?: (action: MenuItemId) => void
  align?: 'left' | 'right'
}

export function ApiKeyActionsMenu({ onAction, align = 'right' }: ApiKeyActionsMenuProps) {
  const [open, setOpen]             = useState(false)
  const [menuStyle, setMenuStyle]   = useState<React.CSSProperties>({})
  const [openUpward, setOpenUpward] = useState(true)

  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef   = useRef<HTMLDivElement>(null)

  const approxMenuHeight = menuItems.length * 36 + 8

  const handleToggle = () => {
    if (!open && buttonRef.current) {
      const rect        = buttonRef.current.getBoundingClientRect()
      const spaceAbove  = rect.top
      const spaceBelow  = window.innerHeight - rect.bottom
      const opensUpward = spaceAbove >= approxMenuHeight || spaceAbove >= spaceBelow

      setOpenUpward(opensUpward)

      const style: React.CSSProperties = { position: 'fixed', width: MENU_WIDTH }

      if (align === 'right') {
        style.right = window.innerWidth - rect.right
      } else {
        style.left = rect.left
      }

      if (opensUpward) {
        style.bottom = window.innerHeight - rect.top + GAP
      } else {
        style.top = rect.bottom + GAP
      }

      setMenuStyle(style)
    }
    setOpen((v) => !v)
  }

  // Focus first menu item when menu opens
  useEffect(() => {
    if (open) {
      const firstItem = menuRef.current?.querySelector<HTMLButtonElement>('[role="menuitem"]')
      firstItem?.focus()
    }
  }, [open])

  // Close on click-outside, Escape, scroll, and resize
  useEffect(() => {
    if (!open) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (!buttonRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        setOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const handleClose = () => setOpen(false)

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('scroll', handleClose, true)
    window.addEventListener('resize', handleClose)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('scroll', handleClose, true)
      window.removeEventListener('resize', handleClose)
    }
  }, [open])

  const originClass = openUpward ? 'origin-bottom-right' : 'origin-top-right'

  const menu = (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Key actions"
      style={menuStyle}
      className={[
        'z-[9999] flex flex-col p-1',
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
  )

  return (
    <div className="relative flex items-center">
      <button
        ref={buttonRef}
        aria-label="More options"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={handleToggle}
        className="flex items-center justify-center w-6 h-6 rounded text-[#a3a3a3] hover:text-[#fafafa] hover:bg-white/10 transition-colors cursor-pointer"
      >
        <IconEllipsisVertical />
      </button>

      {open && createPortal(menu, document.body)}
    </div>
  )
}
