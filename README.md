# Farlabs Dashboard

## Getting started

```bash
yarn install
yarn dev
```

Dev site will be available on `http://localhost:5173/`

---

### What next?
- replace the favicon by correct one
- add i18n and replace all text by locales
- implement ApiKeyActionsMenu by another way with some popup-popover module and use this way for other tooltips in the project

## API Keys — backend requirements

### Endpoints

| Method   | Path            | Description                       | Used by                        |
|----------|-----------------|-----------------------------------|--------------------------------|
| `GET`    | `/api/keys`     | Fetch all keys for the user       | `ApiKeysPage` on mount         |
| `POST`   | `/api/keys`     | Create a new key                  | "Create API key" button        |
| `PATCH`  | `/api/keys/:id` | Rename a key or change its status | "Edit" / "Disable" menu items  |
| `DELETE` | `/api/keys/:id` | Delete a key                      | "Delete" menu item             |

---

### `GET /api/keys` — response shape

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

`status` values: `"active"` | `"expired"` | `"disabled"`

`lastUsedAt` is `null` when the key has never been used.

---

### `POST /api/keys` — request body

```json
{ "name": "my_key", "expiresAt": "2026-12-31T00:00:00Z" }
```

The response must include the full plaintext `key` value (shown to the user once) in addition to all fields above.

---

### `PATCH /api/keys/:id` — request body (partial)

```json
{ "name": "new_name" }
```
```json
{ "status": "disabled" }
```

---

### `DELETE /api/keys/:id`

No request body. Returns `204 No Content` on success.

---

## How to connect the API

The component tree (`ApiKeyTable`, `ApiKeyRow`, `ApiKeyCard`) accepts `ApiKey[]` as a prop and has no knowledge of the data source. The mock data and all display logic are already separated. Connecting real data requires **four steps**.

---

### Step 1 — add a mapper

Create `src/entities/api-key/model/mappers.ts`.

This function converts the raw server response into the `ApiKey` type used by the UI. The field names (`expiresAt`, `createdAt`, `lastUsedAt`) already match the backend — only the values need to be formatted.

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
  if (minutes < 60)   return `${minutes} min ago`
  if (minutes < 1440) return `${Math.floor(minutes / 60)} hours ago`
  return `${Math.floor(minutes / 1440)} days ago`
}

export function fromApiResponse(raw: ApiKeyResponse): ApiKey {
  return {
    id:         raw.id,
    name:       raw.name,
    maskedKey:  raw.maskedKey,
    status:     raw.status === 'active' ? 'Active' : 'Expired',
    expiresAt:  formatExpiry(raw.expiresAt, raw.status),
    createdAt:  formatDate(raw.createdAt),
    lastUsedAt: formatLastUsed(raw.lastUsedAt),
  }
}
```

---

### Step 2 — replace mocks with fetch in `ApiKeysPage`

File: `src/pages/api-keys/ui/ApiKeysPage.tsx`

Replace the mock import with `useState` + `useEffect`:

```tsx
import { useState, useEffect } from 'react'
import { ApiKeyTable, ApiKeyCard } from '@/entities/api-key'
import type { ApiKey } from '@/entities/api-key'
import { fromApiResponse } from '@/entities/api-key/model/mappers'

export function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([])

  useEffect(() => {
    fetch('/api/keys')
      .then(r => r.json())
      .then(data => setKeys(data.map(fromApiResponse)))
  }, [])

  // pass `keys` to ApiKeyTable / ApiKeyCard — everything else stays the same
}
```

---

### Step 3 — wire up action handlers

`ApiKeyActionsMenu` already accepts `onAction?: (action: 'edit' | 'disable' | 'delete') => void`.

Pass the handler from `ApiKeyRow` and `ApiKeyCard` down to the menu, then call the appropriate endpoint:

```ts
function handleAction(id: string, action: 'edit' | 'disable' | 'delete') {
  if (action === 'edit') {
    const name = prompt('New name')
    if (name) fetch(`/api/keys/${id}`, { method: 'PATCH', body: JSON.stringify({ name }) })
  }
  if (action === 'disable') {
    fetch(`/api/keys/${id}`, { method: 'PATCH', body: JSON.stringify({ status: 'disabled' }) })
  }
  if (action === 'delete') {
    fetch(`/api/keys/${id}`, { method: 'DELETE' })
  }
}
```

After each mutating request, either refetch the list or update local state to avoid a full page reload.

---

### Step 4 — wire up key creation

`CreateApiKeyButton` and `CreateApiKeyFab` both accept `onClick?: () => void`.

Open a modal or inline form, collect `name` and optionally `expiresAt`, then:

```ts
async function createKey(name: string, expiresAt?: string) {
  const res = await fetch('/api/keys', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, expiresAt }),
  })
  const data = await res.json()
  // data.key — full plaintext key, show it once then discard
  // data.id, data.name, … — add to local state via fromApiResponse
}
```

---

### Field reference

| `ApiKey` field | API field    | Value from server | Value in UI                              |
|----------------|--------------|-------------------|------------------------------------------|
| `id`           | `id`         | string            | unchanged                                |
| `name`         | `name`       | string            | unchanged                                |
| `maskedKey`    | `maskedKey`  | `"843...5abc"`    | unchanged (masked server-side)           |
| `status`       | `status`     | `"active"`        | `"Active"` / `"Expired"`                |
| `expiresAt`    | `expiresAt`  | ISO 8601 / null   | `"In N days"` / `"—"`                   |
| `createdAt`    | `createdAt`  | ISO 8601          | `"DD/MM/YYYY"`                           |
| `lastUsedAt`   | `lastUsedAt` | ISO 8601 / null   | `"N hours/days ago"` / `"Never"`        |
