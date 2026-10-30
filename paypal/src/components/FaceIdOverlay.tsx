import { useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import faceIdSvg from '../assets/apple-face-id.svg?raw'

export const FACE_ID_DURATION_MS = 3600

/** Face ID fixed at the very top of the screen (status bar / camera). */
export function FaceIdOverlay({
  playKey,
  onFinished,
}: {
  playKey: number
  onFinished: () => void
}) {
  const markup = useMemo(
    () =>
      faceIdSvg
        .replaceAll('repeatCount="indefinite"', 'repeatCount="1"')
        .replace('width="100%" height="100%"', 'width="100%"'),
    [],
  )

  useEffect(() => {
    const done = window.setTimeout(() => onFinished(), FACE_ID_DURATION_MS)
    return () => window.clearTimeout(done)
  }, [playKey, onFinished])

  return createPortal(
    <div className="face-id-overlay" aria-hidden>
      <div
        key={playKey}
        className="face-id-overlay__frame"
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    </div>,
    document.body,
  )
}
