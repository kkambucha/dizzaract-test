import { StatusBadge } from './StatusBadge'
import { ApiKeyActionsMenu } from './ApiKeyActionsMenu'
import type { ApiKey } from '../model/types'

interface ApiKeyRowProps {
  apiKey: ApiKey
  isLast: boolean
}

const cellBase = 'flex flex-1 min-w-[85px] h-[52px] items-center px-2 text-sm text-[#fafafa] overflow-hidden text-ellipsis whitespace-nowrap'
const borderBottom = 'border-b border-white/10'

export function ApiKeyRow({ apiKey, isLast }: ApiKeyRowProps) {
  const border = isLast ? '' : borderBottom

  return (
    <div className="flex items-center w-full">
      <div className={`${cellBase} ${border} pl-3`}>{apiKey.name}</div>
      <div className={`${cellBase} ${border}`}>{apiKey.maskedKey}</div>
      <div className={`${cellBase} ${border}`}>
        <StatusBadge status={apiKey.status} />
      </div>
      <div className={`${cellBase} ${border}`}>{apiKey.expires}</div>
      <div className={`${cellBase} ${border}`}>{apiKey.created}</div>
      <div className={`${cellBase} ${border}`}>{apiKey.lastUsed}</div>
      <div className={`flex shrink-0 w-[85px] h-[52px] items-center justify-end px-2 ${border}`}>
        <ApiKeyActionsMenu align="right" />
      </div>
    </div>
  )
}
