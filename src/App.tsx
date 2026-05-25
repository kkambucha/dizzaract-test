import { Sidebar } from '@/widgets/sidebar'
import { Header } from '@/widgets/header'
import { MobileHeader } from '@/widgets/mobile-header'
import { BottomNav } from '@/widgets/bottom-nav'
import { ApiKeysPage } from '@/pages/api-keys'

export default function App() {
  return (
    <div className="flex w-full h-svh overflow-hidden bg-[#121212] md:rounded-2xl">

      {/* Sidebar — desktop only */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main column */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* Header — desktop only */}
        <div className="hidden md:block">
          <Header />
        </div>

        {/* Mobile header */}
        <div className="block md:hidden">
          <MobileHeader title="API keys" />
        </div>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto">
          <ApiKeysPage />
        </main>

        {/* Bottom nav — mobile only */}
        <div className="block md:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  )
}
