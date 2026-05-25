import { IconEllipsisVertical } from '../../../shared/ui/icons'
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
      {isExpired && (
        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-xl text-xs font-semibold text-white bg-[rgba(248,113,113,0.6)] shrink-0 whitespace-nowrap">
          Expired
        </span>
      )}

      {/* Three-dot menu */}
      <div className="flex items-center p-1 shrink-0">
        <button
          aria-label="More options"
          className="flex items-center justify-center w-6 h-6 rounded text-[#a3a3a3] hover:text-[#fafafa] hover:bg-white/10 transition-colors"
        >
          <IconEllipsisVertical />
        </button>
      </div>
    </div>
  )
}
