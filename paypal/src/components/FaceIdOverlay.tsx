import { useEffect, useMemo, type RefObject } from 'react'
import faceIdSvg from '../assets/apple-face-id.svg?raw'

export const FACE_ID_DURATION_MS = 3600

/**
 * Face ID animation pinned to the top of the phone (status bar).
 * Remount with a new `playKey` to restart. Plays once, then onFinished.
 */
export function FaceIdOverlay({
  playKey,
  onFinished,
}: {
  playKey: number
  phoneRef?: RefObject<HTMLDivElement | null>
  onFinished: () => void
}) {
  const markup = useMemo(
    () => faceIdSvg.replaceAll('repeatCount="indefinite"', 'repeatCount="1"'),
    [],
  )

  useEffect(() => {
    const done = window.setTimeout(() => onFinished(), FACE_ID_DURATION_MS)
    return () => window.clearTimeout(done)
  }, [playKey, onFinished])

  return (
    <div className="face-id-overlay" aria-hidden>
      <div
        key={playKey}
        className="face-id-overlay__frame"
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    </div>
  )
}
