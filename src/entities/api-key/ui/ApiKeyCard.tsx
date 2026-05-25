import { ApiKeyActionsMenu } from './ApiKeyActionsMenu'
import { StatusBadge } from './StatusBadge'
import { getMobileSummary } from '../model/helpers'
import type { ApiKey } from '../model/types'

interface ApiKeyCardProps {
  apiKey: ApiKey
}

export function ApiKeyCard({ apiKey }: ApiKeyCardProps) {
  const summary = getMobileSummary(apiKey)
  const isExpired = apiKey.status === 'Expired'

  return (
    <div className="flex items-center gap-2 bg-[#1c1c1c] border border-white/10 rounded-xl pl-4 pr-3 py-3">
      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 min-w-0">
        {/* Title row: name + masked key */}
        <div className="flex items-center gap-1 h-5 text-sm font-medium overflow-hidden">
          <span className="text-[#fafafa] shrink-0 overflow-hidden text-ellipsis whitespace-nowrap">
            {apiKey.name}
          </span>
          <span className="flex-1 min-w-0 text-[#a3a3a3] overflow-hidden text-ellipsis whitespace-nowrap">
            {apiKey.maskedKey}
          </span>
        </div>

        {/* Subtitle */}
        <p className="text-xs text-[#a3a3a3] leading-none overflow-hidden text-ellipsis whitespace-nowrap">
          {summary}
        </p>
      </div>

      {/* Expired badge */}
      {isExpired && <StatusBadge status="Expired" />}

      {/* Actions menu */}
      <div className="flex items-center p-1 shrink-0">
        <ApiKeyActionsMenu align="right" />
      </div>
    </div>
  )
}
