export type ApiKeyStatus = 'Active' | 'Expired'

export interface ApiKey {
  id: string
  name: string
  maskedKey: string
  status: ApiKeyStatus
  expiresAt: string
  createdAt: string
  lastUsedAt: string
}
