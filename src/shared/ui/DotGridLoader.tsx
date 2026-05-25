import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

const COLS           = 6
const ROWS           = 3
const STEP_MS        = 150
const TOTAL_STEPS    = 18
const APPEAR_STEP_MS = 60    // delay between each dot's appearance / disappearance
const FADE_MS        = 150   // opacity transition duration per dot
const PAUSE_MS       = 2000  // pause between loop iterations
const LOOP_ANIM_MS   = 5000  // how long to animate per loop cycle

// After the last dot appears (step index 12) + fade + short pause
const ANIM_DELAY_MS    = (COLS * 2 + 2) * APPEAR_STEP_MS + 300
// Time for all dots to finish fading out
const EXIT_COMPLETE_MS = (COLS * 2) * APPEAR_STEP_MS + FADE_MS + 50

function appearStepIdx(row: number, col: number): number {
  const rowOffset = row === 1 ? 0 : row === 0 ? 1 : 2
  return col * 2 + rowOffset
}

function getDotDelay(row: number, col: number): number {
  return appearStepIdx(row, col) * APPEAR_STEP_MS
}

// ─── wave animation ───────────────────────────────────────────────────────────

function colCenter(col: number): number {
  return 6 + col
}

type Level = 'inactive' | 'low' | 'mid' | 'high' | 'peak'

function getLevel(step: number, row: number, col: number): Level {
  const diff = Math.abs(step - colCenter(col))
  if (row === 1) {
    if (diff <= 1) return 'peak'
    if (diff === 2) return 'high'
    if (diff === 3) return 'mid'
    if (diff === 4) return 'low'
  } else {
    if (diff === 0) return 'peak'
    if (diff === 1) return 'high'
    if (diff === 2) return 'mid'
    if (diff === 3) return 'low'
  }
  return 'inactive'
}

function isWaveOffScreen(step: number): boolean {
  return step < 2 || step > 15
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
    peak: mkHsl(h, Math.max(s - 12, 30), Math.min(l + 22, 92)),
    high: mkHsl(h, s, l),
    mid:  mkHsl(h, s, Math.max(l - 20, 5)),
    low:  mkHsl(h, Math.min(s + 5, 100), Math.max(l - 42, 3)),
  }
}

// ─── component ────────────────────────────────────────────────────────────────

type Phase = 'idle' | 'entering' | 'animating' | 'exitPending' | 'exiting'

interface DotGridLoaderProps {
  color?:        string   // hex, e.g. "#a855f7"
  isLoading?:    boolean  // false triggers exit; true restarts after exit
  loop?:         boolean  // demo mode: automatically cycles indefinitely
  // TODO: initialDelay prop used only for demonstration purposes, it should be removed
  initialDelay?: number   // ms to wait before the very first appearance
}

export function DotGridLoader({ color = '#a855f7', isLoading, loop = false, initialDelay = 0 }: DotGridLoaderProps) {
  const [phase, setPhase]         = useState<Phase>('idle')
  const [step, setStep]           = useState(0)
  const [iteration, setIteration] = useState(0)
  const colors = useMemo(() => deriveColors(color), [color])

  // Keep a ref so the iteration effect can read the current isLoading without it being a dep
  const isLoadingRef = useRef(isLoading)
  useLayoutEffect(() => { isLoadingRef.current = isLoading })

  // Start / restart — driven by iteration counter
  useEffect(() => {
    if (isLoadingRef.current === false) return  // don't start if explicitly not loading
    let raf:       number | undefined
    let animTimer: ReturnType<typeof setTimeout> | undefined
    let loopTimer: ReturnType<typeof setTimeout> | undefined

    const delayTimer = setTimeout(() => {
      setPhase('idle')
      setStep(0)
      raf       = requestAnimationFrame(() => setPhase('entering'))
      animTimer = setTimeout(() => setPhase('animating'), ANIM_DELAY_MS)
      loopTimer = loop
        ? setTimeout(() => setPhase('exitPending'), ANIM_DELAY_MS + LOOP_ANIM_MS)
        : undefined
    }, iteration === 0 ? initialDelay : 0)

    return () => {
      clearTimeout(delayTimer)
      if (raf !== undefined)       cancelAnimationFrame(raf)
      if (animTimer !== undefined) clearTimeout(animTimer)
      if (loopTimer !== undefined) clearTimeout(loopTimer)
    }
  }, [iteration, loop, initialDelay])

  // React to isLoading prop changes
  const prevIsLoading = useRef<boolean | undefined>(undefined)
  useEffect(() => {
    const prev = prevIsLoading.current
    prevIsLoading.current = isLoading

    if (isLoading === false && prev !== false) {
      // loading → not loading: trigger exit
      setPhase(p =>
        p === 'animating' || p === 'entering' ? 'exitPending' : p,
      )
    } else if (isLoading === true && prev === false) {
      // not loading → loading: restart
      setIteration(i => i + 1)
    }
  }, [isLoading])

  // Wave interval — runs during animating and exitPending.
  // exitPending→exiting transition is handled here (not in a separate effect)
  // to avoid synchronous setState-inside-effect warning.
  useEffect(() => {
    if (phase !== 'animating' && phase !== 'exitPending') return
    let s = step
    const id = setInterval(() => {
      s = (s + 1) % TOTAL_STEPS
      setStep(s)
      if (phase === 'exitPending' && isWaveOffScreen(s)) setPhase('exiting')
    }, STEP_MS)
    return () => clearInterval(id)
  // step intentionally excluded — interval is the sole writer of step
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  // After dots disappear: loop restarts after pause
  useEffect(() => {
    if (phase !== 'exiting' || !loop) return
    const timer = setTimeout(
      () => setIteration(i => i + 1),
      EXIT_COMPLETE_MS + PAUSE_MS,
    )
    return () => clearTimeout(timer)
  }, [phase, loop])

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
        const row   = Math.floor(i / COLS)
        const col   = i % COLS
        const isWaving = phase === 'animating' || phase === 'exitPending'
        const level    = isWaving ? getLevel(step, row, col) : 'inactive'
        const isActive = level !== 'inactive'

        const opacity      = (phase === 'idle' || phase === 'exiting') ? 0 : 1
        const opacityDelay = (phase === 'entering' || phase === 'exiting')
          ? getDotDelay(row, col)
          : 0

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
              opacity,
              background: bg,
              border: `${borderWidth} solid ${borderColor}`,
              boxShadow,
              transition: [
                `opacity ${FADE_MS}ms ease ${opacityDelay}ms`,
                'background-color 120ms ease',
                'box-shadow 120ms ease',
                'border-color 120ms ease',
              ].join(', '),
            }}
          />
        )
      })}
    </div>
  )
}
