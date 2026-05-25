export function ThinkingLoader() {
  return (
    <span
      className="animate-thinking inline-block text-sm"
      style={{
        background: [
          'linear-gradient(90deg,',
          '  rgba(255,255,255,0.40) 0%,',
          '  rgba(255,255,255,0.40) 45%,',
          '  rgba(255,255,255,0.75) 48%,',
          '  rgba(255,255,255,1.00) 50%,',
          '  rgba(255,255,255,0.75) 52%,',
          '  rgba(255,255,255,0.40) 55%,',
          '  rgba(255,255,255,0.40) 100%',
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
