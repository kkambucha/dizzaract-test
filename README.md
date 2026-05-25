# Farlabs Dashboard

## Getting started

```bash
yarn install
yarn dev
```

---

## API Keys section — REST API

### Required endpoints

| Method   | Path              | Purpose                             |
|----------|-------------------|-------------------------------------|
| `GET`    | `/api/keys`       | List all keys                       |
| `POST`   | `/api/keys`       | Create a new key                    |
| `PATCH`  | `/api/keys/:id`   | Edit a key (name, status)           |
| `DELETE` | `/api/keys/:id`   | Delete a key                        |

---

### Expected response shape (`GET /api/keys`)

```json
[
  {
    "id": "abc123",
    "name": "ai_inference_key",
    "maskedKey": "843...5abc",
    "status": "active",
    "expiresAt": "2026-05-04T00:00:00Z",
    "createdAt": "2026-04-03T10:00:00Z",
    "lastUsedAt": null
  }
]
```

**`POST /api/keys`** — request body:

```json
{ "name": "my_key", "expiresAt": "2026-12-31T00:00:00Z" }
```

The response must include the full `key` value (shown to the user once) plus all fields above.

**`PATCH /api/keys/:id`** — request body (partial):

```json
{ "name": "new_name" }
{ "status": "disabled" }
```

---

### API fields vs `ApiKey` interface

| API field    | `ApiKey` field   | Frontend transformation                               |
|--------------|------------------|-------------------------------------------------------|
| `id`         | `id`             | As-is                                                 |
| `name`       | `name`           | As-is                                                 |
| `maskedKey`  | `maskedKey`      | As-is (masked server-side)                            |
| `status`     | `status`         | `"active"` → `"Active"`, `"expired"` → `"Expired"`   |
| `expiresAt`  | `expires`        | ISO → `"In N days"` / `"—"` (if expired)             |
| `createdAt`  | `created`        | ISO → `"DD.MM.YYYY"`                                  |
| `lastUsedAt` | `lastUsed`       | ISO → `"N hours/days ago"`, `null` → `"Never"`       |

---

### Replacing mocks with real data

All display logic lives in `ApiKeyTable`, `ApiKeyRow`, and `ApiKeyCard` — they receive `ApiKey[]` as a prop and are unaware of the data source. Only two things need to change:

#### 1. Add a mapper in `src/entities/api-key/model/`

Create `src/entities/api-key/model/mappers.ts` to convert the API response to `ApiKey`:

```ts
import type { ApiKey } from './types'

interface ApiKeyResponse {
  id: string
  name: string
  maskedKey: string
  status: 'active' | 'expired' | 'disabled'
  expiresAt: string | null
  createdAt: string
  lastUsedAt: string | null
}

function formatExpiry(expiresAt: string | null, status: string): string {
  if (status !== 'active' || !expiresAt) return '—'
  const days = Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 86_400_000)
  return days > 0 ? `In ${days} days` : 'Expired'
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  })
}

function formatLastUsed(iso: string | null): string {
  if (!iso) return 'Never'
  const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60_000)
  if (minutes < 60)  return `${minutes} min ago`
  if (minutes < 1440) return `${Math.floor(minutes / 60)} hours ago`
  return `${Math.floor(minutes / 1440)} days ago`
}

export function fromApiResponse(raw: ApiKeyResponse): ApiKey {
  const status = raw.status === 'active' ? 'Active' : 'Expired'
  return {
    id:        raw.id,
    name:      raw.name,
    maskedKey: raw.maskedKey,
    status,
    expires:   formatExpiry(raw.expiresAt, raw.status),
    created:   formatDate(raw.createdAt),
    lastUsed:  formatLastUsed(raw.lastUsedAt),
  }
}
```

#### 2. Replace mocks with fetch in `ApiKeysPage`

```tsx
// src/pages/api-keys/ui/ApiKeysPage.tsx
import { useEffect, useState } from 'react'
import { fromApiResponse } from '../../../entities/api-key/model/mappers'
import type { ApiKey } from '../../../entities/api-key/model/types'

export function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([])

  useEffect(() => {
    fetch('/api/keys')
      .then(r => r.json())
      .then(data => setKeys(data.map(fromApiResponse)))
  }, [])

  // rest of the JSX unchanged — replace mockApiKeys with keys
}
```

#### 3. Wire up action handlers

`ApiKeyActionsMenu` already accepts `onAction?: (action: 'edit' | 'disable' | 'delete') => void`. Pass it from `ApiKeyRow` / `ApiKeyCard` and call the corresponding endpoint:

```ts
// edit    → PATCH /api/keys/:id  { name: '...' }
// disable → PATCH /api/keys/:id  { status: 'disabled' }
// delete  → DELETE /api/keys/:id
```

---

### Summary

No changes to the component tree are needed. The full migration to a real API requires:

1. `mappers.ts` with `fromApiResponse`
2. `useState` + `useEffect` in `ApiKeysPage` instead of importing `mockApiKeys`
3. `onAction` callbacks in `ApiKeyRow` / `ApiKeyCard` calling the API
