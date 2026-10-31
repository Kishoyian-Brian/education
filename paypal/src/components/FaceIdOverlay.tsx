import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import faceIdSvg from '../assets/apple-face-id.svg?raw'

export const FACE_ID_DURATION_MS = 3600
const ENTER_MS = 250
const EXIT_MS = 300

type Phase = 'in' | 'pending' | 'out'

/** Face ID fixed at the very top of the screen (status bar / camera). */
export function FaceIdOverlay({
  playKey,
  onFinished,
}: {
  playKey: number
  onFinished: () => void
}) {
  const [phase, setPhase] = useState<Phase>('in')

  const markup = useMemo(
    () =>
      faceIdSvg
        .replaceAll('repeatCount="indefinite"', 'repeatCount="1"')
        .replace('width="100%" height="100%"', 'width="100%"')
        .replace(/filter="url\(#b\)"/g, '')
        .replace(/filter="url\(#g\)"/g, ''),
    [],
  )

  useEffect(() => {
    setPhase('in')
    const toPending = window.setTimeout(() => setPhase('pending'), ENTER_MS)
    const toOut = window.setTimeout(() => setPhase('out'), FACE_ID_DURATION_MS)
    const done = window.setTimeout(() => onFinished(), FACE_ID_DURATION_MS + EXIT_MS)
    return () => {
      window.clearTimeout(toPending)
      window.clearTimeout(toOut)
      window.clearTimeout(done)
    }
  }, [playKey, onFinished])

  return createPortal(
    <div className={['face-id-overlay', `face-id-overlay--${phase}`].join(' ')} aria-hidden>
      <div
        key={playKey}
        className="face-id-overlay__frame"
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    </div>,
    document.body,
  )
}
