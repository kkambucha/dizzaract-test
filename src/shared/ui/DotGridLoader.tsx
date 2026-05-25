import { useEffect, useMemo, useState } from 'react'

const COLS       = 6
const ROWS       = 3
const STEP_MS    = 150
const TOTAL_STEPS = 22

// Horizontal wave: all rows in a column peak at the same step.
// Middle row (1) has a wider peak zone (±1 step) than outer rows (exact step only).
function colCenter(col: number): number {
  return 6 + col
}

type Level = 'inactive' | 'low' | 'mid' | 'high' | 'peak'

function getLevel(step: number, row: number, col: number): Level {
  const diff = Math.abs(step - colCenter(col))

  if (row === 1) {
    // Middle row: 3-step peak
    if (diff <= 1) return 'peak'
    if (diff === 2) return 'high'
    if (diff === 3) return 'mid'
    if (diff === 4) return 'low'
  } else {
    // Top / bottom rows: 1-step peak
    if (diff === 0) return 'peak'
    if (diff === 1) return 'high'
    if (diff === 2) return 'mid'
    if (diff === 3) return 'low'
  }
  return 'inactive'
}

// ─── colour derivation ────────────────────────────────────────────────────────

function hexToHsl(hex: string): [number, number, number] {
  const m = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!m) return [271, 91, 65]
  const r = parseInt(m[1], 16) / 255
  const g = parseInt(m[2], 16) / 255
  const b = parseInt(m[3], 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0, s = 0
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r)      h = ((g - b) / d + (g < b ? 6 : 0)) / 6
    else if (max === g) h = ((b - r) / d + 2) / 6
    else                h = ((r - g) / d + 4) / 6
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function mkHsl(h: number, s: number, l: number) {
  const sc = Math.max(0, Math.min(100, s))
  const lc = Math.max(2, Math.min(97, l))
  return `hsl(${h}deg ${sc}% ${lc}%)`
}

function deriveColors(hex: string) {
  const [h, s, l] = hexToHsl(hex)
  return {
    peak: mkHsl(h, Math.max(s - 12, 30), Math.min(l + 22, 92)),  // lightest
    high: mkHsl(h, s, l),                                          // base colour
    mid:  mkHsl(h, s, Math.max(l - 20, 5)),                       // darker
    low:  mkHsl(h, Math.min(s + 5, 100), Math.max(l - 42, 3)),    // darkest
  }
}

// ─── component ────────────────────────────────────────────────────────────────

interface DotGridLoaderProps {
  color?: string  // hex, e.g. "#a855f7"
}

export function DotGridLoader({ color = '#a855f7' }: DotGridLoaderProps) {
  const [step, setStep] = useState(0)
  const colors = useMemo(() => deriveColors(color), [color])

  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % TOTAL_STEPS), STEP_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1px',
        width: `${COLS * 5 + (COLS - 1)}px`,
        alignContent: 'start',
      }}
    >
      {Array.from({ length: ROWS * COLS }, (_, i) => {
        const row  = Math.floor(i / COLS)
        const col  = i % COLS
        const level = getLevel(step, row, col)
        const isActive = level !== 'inactive'

        const bg          = isActive ? colors[level] : 'rgba(255,255,255,0.06)'
        const borderWidth = level === 'peak' ? '1px' : '0.5px'
        const borderColor = isActive ? 'rgba(255,255,255,0.16)' : 'transparent'
        const boxShadow   =
          level === 'peak' ? `0 0 5px 1px ${colors.high}55` :
          level === 'high' ? `0 0 3px 1px ${colors.high}33` :
          'none'

        return (
          <div
            key={i}
            style={{
              width: 5,
              height: 5,
              flexShrink: 0,
              boxSizing: 'border-box',
              backdropFilter: 'blur(3px)',
              background: bg,
              border: `${borderWidth} solid ${borderColor}`,
              boxShadow,
              transition: 'background-color 120ms ease, box-shadow 120ms ease, border-color 120ms ease',
            }}
          />
        )
      })}
    </div>
  )
}
