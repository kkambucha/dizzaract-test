import { ApiKeyRow } from './ApiKeyRow'
import type { ApiKey } from '../model/types'

interface ApiKeyTableProps {
  keys: ApiKey[]
}

const headers = ['Name', 'API key', 'Status', 'Expires', 'Created', 'Last used']

export function ApiKeyTable({ keys }: ApiKeyTableProps) {
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center w-full">
        {headers.map((h, i) => (
          <div
            key={h}
            className={`flex flex-1 min-w-[85px] h-11 items-center px-2 text-sm font-medium text-[#a3a3a3] border-b border-white/10 ${i === 0 ? 'pl-3' : ''}`}
          >
            {h}
          </div>
        ))}
        <div className="flex shrink-0 w-[85px] h-11 items-center border-b border-white/10" />
      </div>

      {/* Rows */}
      {keys.map((key, i) => (
        <ApiKeyRow key={key.id} apiKey={key} isLast={i === keys.length - 1} />
      ))}
    </div>
  )
}
