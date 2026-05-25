import type { ApiKey } from './types'

export const mockApiKeys: ApiKey[] = [
  {
    id: '1',
    name: 'ai_inference_key',
    maskedKey: '843...5abc',
    status: 'Active',
    expires: 'In 29 days',
    created: '03.04.2026',
    lastUsed: 'Never',
  },
  {
    id: '2',
    name: 'model_training_key',
    maskedKey: '843...5abc',
    status: 'Active',
    expires: 'In 22 days',
    created: '31.03.2026',
    lastUsed: '7 hours ago',
  },
  {
    id: '3',
    name: 'vision_model_key',
    maskedKey: '843...5abc',
    status: 'Active',
    expires: 'In 19 days',
    created: '25.03.2026',
    lastUsed: '3 days ago',
  },
  {
    id: '4',
    name: 'language_model_key',
    maskedKey: '123...4def',
    status: 'Active',
    expires: 'In 19 days',
    created: '05.03.2026',
    lastUsed: '3 days ago',
  },
  {
    id: '5',
    name: 'image_model_key',
    maskedKey: '567...8ghi',
    status: 'Expired',
    expires: '—',
    created: '01.02.2026',
    lastUsed: '5 days ago',
  },
]
