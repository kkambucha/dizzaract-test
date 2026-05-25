import type { ApiKey } from './types'

export function getMobileSummary(key: ApiKey): string {
  if (key.status === 'Expired') {
    return key.lastUsed === 'Never' ? 'Expired, never used' : `Used ${key.lastUsed}`
  }
  const used = key.lastUsed === 'Never' ? 'never used' : `used ${key.lastUsed}`
  return `Expires ${key.expires}, ${used}`
}
