import { StatusBadge } from './StatusBadge'
import { ApiKeyActionsMenu } from './ApiKeyActionsMenu'
import type { ApiKey } from '../model/types'

interface ApiKeyRowProps {
  apiKey: ApiKey
}

const cellBase = 'flex flex-1 min-w-[85px] h-[52px] items-center px-2 text-sm text-[#fafafa] overflow-hidden text-ellipsis whitespace-nowrap'

export function ApiKeyRow({ apiKey }: ApiKeyRowProps) {
  return (
    <div className="flex items-center w-full border-b border-white/10 last:border-b-0">
      <div className={`${cellBase} pl-3`}>{apiKey.name}</div>
      <div className={cellBase}>{apiKey.maskedKey}</div>
      <div className={cellBase}>
        <StatusBadge status={apiKey.status} />
      </div>
      <div className={cellBase}>{apiKey.expiresAt}</div>
      <div className={cellBase}>{apiKey.createdAt}</div>
      <div className={cellBase}>{apiKey.lastUsedAt}</div>
      <div className="flex shrink-0 w-[85px] h-[52px] items-center justify-end px-2">
        <ApiKeyActionsMenu align="right" />
      </div>
    </div>
  )
}
