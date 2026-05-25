interface HeaderProps {
  balance?: string
  userInitials?: string
}

export function Header({ balance = '$145.20', userInitials = 'RG' }: HeaderProps) {
  return (
    <header className="flex items-center justify-between h-16 px-4 shrink-0 bg-[#121212] border-b border-white/10">
      <div className="w-[77px]" />

      <div className="flex items-center gap-2">
        <span className="flex items-center justify-center h-9 px-3 bg-[#262626] text-[#fafafa] text-xs font-medium rounded-xl whitespace-nowrap select-none">
          {balance}
        </span>

        <div
          aria-label={`User ${userInitials}`}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-[#262626] text-[#fafafa] text-sm font-normal shrink-0 select-none"
        >
          {userInitials}
        </div>
      </div>
    </header>
  )
}
