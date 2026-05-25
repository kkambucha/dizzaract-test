export type ApiKeyStatus = 'Active' | 'Expired'

export interface ApiKey {
  id: string
  name: string
  maskedKey: string
  status: ApiKeyStatus
  expires: string
  created: string
  lastUsed: string
}
