import { cn } from '../../../shared/lib/cn'
import type { ApiKeyStatus } from '../model/types'

interface StatusBadgeProps {
  status: ApiKeyStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center px-2 py-0.5 rounded-xl text-xs font-semibold leading-4 whitespace-nowrap shrink-0',
        status === 'Active'
          ? 'bg-[#5462fd] text-white'
          : 'bg-[#262626] text-[#fafafa]',
      )}
    >
      {status}
    </span>
  )
}
