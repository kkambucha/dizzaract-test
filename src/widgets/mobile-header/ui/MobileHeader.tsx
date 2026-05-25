interface MobileHeaderProps {
  title: string
}

export function MobileHeader({ title }: MobileHeaderProps) {
  return (
    <header className="relative flex items-center justify-between px-2 py-1 bg-[#121212] shrink-0">
      <div className="flex flex-1 h-[42px] items-center pl-2">
        <h1 className="flex-1 min-w-0 text-xl font-semibold leading-7 text-[#fafafa] m-0">
          {title}
        </h1>
      </div>
      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </header>
  )
}
