import type { ApiKey } from './types'

export const mockApiKeys: ApiKey[] = [
  {
    id: '1',
    name: 'ai_inference_key',
    maskedKey: '843...5abc',
    status: 'Active',
    expiresAt: 'In 29 days',
    createdAt: '03.04.2026',
    lastUsedAt: 'Never',
  },
  {
    id: '2',
    name: 'model_training_key',
    maskedKey: '843...5abc',
    status: 'Active',
    expiresAt: 'In 22 days',
    createdAt: '31.03.2026',
    lastUsedAt: '7 hours ago',
  },
  {
    id: '3',
    name: 'vision_model_key',
    maskedKey: '843...5abc',
    status: 'Active',
    expiresAt: 'In 19 days',
    createdAt: '25.03.2026',
    lastUsedAt: '3 days ago',
  },
  {
    id: '4',
    name: 'language_model_key',
    maskedKey: '123...4def',
    status: 'Active',
    expiresAt: 'In 19 days',
    createdAt: '05.03.2026',
    lastUsedAt: '3 days ago',
  },
  {
    id: '5',
    name: 'image_model_key',
    maskedKey: '567...8ghi',
    status: 'Expired',
    expiresAt: '—',
    createdAt: '01.02.2026',
    lastUsedAt: '5 days ago',
  },
]
