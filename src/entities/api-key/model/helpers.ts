import type { ApiKey } from './types'

export function getMobileSummary(key: ApiKey): string {
  if (key.status === 'Expired') {
    return key.lastUsedAt === 'Never'
      ? 'Expired, never used'
      : `Expired, used ${key.lastUsedAt}`
  }
  const used = key.lastUsedAt === 'Never' ? 'never used' : `used ${key.lastUsedAt}`
  return `Expires ${key.expiresAt}, ${used}`
}
