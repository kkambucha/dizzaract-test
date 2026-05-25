type IconProps = JSX.IntrinsicElements['svg']

export function IconPanelLeft(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <rect x="1.75" y="1.75" width="12.5" height="12.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="5.5" y1="2" x2="5.5" y2="14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function IconLayers(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path d="M2 5.5L8 2L14 5.5L8 9L2 5.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M2 9L8 12.5L14 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12L8 15.5L14 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconKey(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <circle cx="5.5" cy="9.5" r="3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 7.5L14 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M12 3.5L14 1.5V4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 7L12 5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export function IconStats(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <rect x="1.5" y="8" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="6.5" y="5" width="3" height="9" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="11.5" y="2" width="3" height="12" rx="1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

export function IconCard(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <line x1="1.5" y1="6.5" x2="14.5" y2="6.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

export function IconGamepad(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path d="M2 8C2 5.5 3 4 5 4H11C13 4 14 5.5 14 8C14 10.5 12.5 12 10.5 12H5.5C3.5 12 2 10.5 2 8Z" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5.5 7V9M4.5 8H6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="10.5" cy="8" r="0.75" fill="currentColor" />
      <circle cx="12" cy="6.5" r="0.75" fill="currentColor" />
    </svg>
  )
}

export function IconWallet(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path d="M2 4.5C2 3.67 2.67 3 3.5 3H12.5C13.33 3 14 3.67 14 4.5V11.5C14 12.33 13.33 13 12.5 13H3.5C2.67 13 2 12.33 2 11.5V4.5Z" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 7H14" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="11" cy="10" r="1" fill="currentColor" />
    </svg>
  )
}

export function IconSettings(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 1V3M8 13V15M1 8H3M13 8H15M2.93 2.93L4.34 4.34M11.66 11.66L13.07 13.07M13.07 2.93L11.66 4.34M4.34 11.66L2.93 13.07" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export function IconDocs(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path d="M3.5 2H10.5L13.5 5V14H3.5V2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M10.5 2V5H13.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <line x1="6" y1="7" x2="11" y2="7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="6" y1="10" x2="11" y2="10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export function IconPlus(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <line x1="8" y1="3" x2="8" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconEllipsisVertical(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <circle cx="8" cy="4" r="1.2" fill="currentColor" />
      <circle cx="8" cy="8" r="1.2" fill="currentColor" />
      <circle cx="8" cy="12" r="1.2" fill="currentColor" />
    </svg>
  )
}

export function IconUserCircle(props: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="9.5" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 19.5C6.5 16.5 9 14.5 12 14.5C15 14.5 17.5 16.5 18.5 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
