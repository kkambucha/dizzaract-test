export function ThinkingLoader() {
  return (
    <span
      className="animate-thinking inline-block text-sm"
      style={{
        background: [
          'linear-gradient(90deg,',
          '  rgba(255,255,255,0.22) 0%,',
          '  rgba(255,255,255,0.22) 45%,',
          '  rgba(255,255,255,0.36) 48%,',
          '  rgba(255,255,255,0.45) 50%,',
          '  rgba(255,255,255,0.36) 52%,',
          '  rgba(255,255,255,0.22) 55%,',
          '  rgba(255,255,255,0.22) 100%',
          ')',
        ].join(''),
        backgroundSize: '300% 100%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }}
    >
      Thinking...
    </span>
  )
}
