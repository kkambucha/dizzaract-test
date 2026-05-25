import { IconPlus } from '../../../shared/ui/icons'

interface CreateApiKeyButtonProps {
  onClick?: () => void
}

export function CreateApiKeyButton({ onClick }: CreateApiKeyButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 h-9 px-3 bg-[#5462fd] hover:opacity-90 text-white text-xs font-medium rounded-xl shrink-0 whitespace-nowrap transition-opacity cursor-pointer"
    >
      <IconPlus />
      Create API key
    </button>
  )
}
