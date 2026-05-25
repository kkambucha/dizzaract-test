import { ApiKeyTable, ApiKeyCard, mockApiKeys } from '../../../entities/api-key'
import { CreateApiKeyButton, CreateApiKeyFab } from '../../../features/api-key'
import { ThinkingLoader } from '../../../shared/ui/ThinkingLoader'
import { DotGridLoader } from '../../../shared/ui/DotGridLoader'

export function ApiKeysPage() {
  return (
    <>
      {/* ── Desktop view (md+) ── */}
      <div className="hidden md:flex flex-col gap-4 w-full max-w-[1280px]">
        <div className="flex items-start gap-1 w-full">
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <h1 className="text-xl font-semibold leading-7 text-[#fafafa] m-0">API keys</h1>
            <p className="text-sm font-normal leading-5 text-[#a3a3a3] m-0">
              Manage your API keys to access all models
            </p>
          </div>
          <CreateApiKeyButton />
        </div>
        <ApiKeyTable keys={mockApiKeys} />
        <div className="flex items-center gap-4 pt-1">
          <DotGridLoader color="#a855f7" />
          <ThinkingLoader />
        </div>
      </div>

      {/* ── Mobile view (<md) ── */}
      <div className="flex md:hidden flex-col gap-3 w-full relative">
        {mockApiKeys.map((key) => (
          <ApiKeyCard key={key.id} apiKey={key} />
        ))}
        <div className="flex items-center gap-3 pt-1">
          <DotGridLoader color="#a855f7" />
          <ThinkingLoader />
        </div>

        {/* FAB */}
        <div className="sticky bottom-0 flex justify-end pt-2 pb-1">
          <CreateApiKeyFab />
        </div>
      </div>
    </>
  )
}
