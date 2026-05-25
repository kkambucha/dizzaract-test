import { IconPlus } from '../../../shared/ui/icons'

interface CreateApiKeyFabProps {
  onClick?: () => void
}

export function CreateApiKeyFab({ onClick }: CreateApiKeyFabProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Create API key"
      className="flex items-center justify-center w-11 h-11 bg-[#5462fd] hover:opacity-90 rounded-xl transition-opacity shadow-lg"
    >
      <IconPlus className="w-4 h-4 text-white" />
    </button>
  )
}
