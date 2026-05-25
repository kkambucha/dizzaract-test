import type { ComponentType, SVGProps } from 'react'
import {
  IconLayers,
  IconKey,
  IconStats,
  IconCard,
  IconGamepad,
  IconWallet,
  IconSettings,
  IconDocs,
} from '../../../shared/ui/icons'

export interface NavItem {
  id: string
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  active?: boolean
}

export interface NavGroup {
  id: string
  label: string
  dimLabel?: boolean
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    id: 'platform',
    label: 'Platform',
    dimLabel: true,
    items: [
      { id: 'models',     label: 'Models',     icon: IconLayers },
      { id: 'api-keys',   label: 'API keys',   icon: IconKey, active: true },
      { id: 'usage',      label: 'Usage',      icon: IconStats },
      { id: 'billing',    label: 'Billing',    icon: IconCard },
      { id: 'playground', label: 'Playground', icon: IconGamepad },
    ],
  },
  {
    id: 'node',
    label: 'Node',
    items: [
      { id: 'node-rewards', label: 'Node rewards', icon: IconWallet },
    ],
  },
  {
    id: 'system',
    label: 'System',
    dimLabel: true,
    items: [
      { id: 'settings', label: 'Settings', icon: IconSettings },
      { id: 'docs',     label: 'Docs',     icon: IconDocs },
    ],
  },
]
