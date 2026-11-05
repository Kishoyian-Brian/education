import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/** Installed iOS PWAs: layout viewport ≠ visible height — pin shell to innerHeight. */
function syncAppViewportHeight() {
  const h = Math.round(window.innerHeight)
  document.documentElement.style.setProperty('--app-h', `${h}px`)
}

syncAppViewportHeight()
window.addEventListener('resize', syncAppViewportHeight)
window.addEventListener('orientationchange', syncAppViewportHeight)
window.visualViewport?.addEventListener('resize', syncAppViewportHeight)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}

const themeColor = document.querySelector('meta[name="theme-color"]')
const appBackground = '#eff2f7'

function opaqueBackground(el: Element) {
  const value = getComputedStyle(el).backgroundColor
  const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
  if (!match) return null
  const alpha = match[4] === undefined ? 1 : Number(match[4])
  if (alpha < 1) return null
  const channel = (part: string) => Number(part).toString(16).padStart(2, '0')
  return `#${channel(match[1])}${channel(match[2])}${channel(match[3])}`
}

function statusColor() {
  if (document.documentElement.classList.contains('splash-on')) return '#022485'
  const confirmation =
    document.querySelector('.send-done') || document.querySelector('.add-money__added')
  if (confirmation) return opaqueBackground(confirmation) ?? '#ffffff'
  const stack = document.elementsFromPoint(window.innerWidth / 2, 1)
  for (const el of stack) {
    if (!(el instanceof HTMLElement)) continue
    if (el.classList.contains('ios-blur-fix')) continue
    if (el.id === 'splash') continue
    const color = opaqueBackground(el)
    if (color) return color
  }
  return appBackground
}

let appliedStatus = ''
function applyStatusBar() {
  if (!themeColor) return
  const color = statusColor()
  if (color === appliedStatus) return
  appliedStatus = color
  themeColor.setAttribute('content', color)
}

let statusFrame = 0
function scheduleStatusBar() {
  if (statusFrame) return
  statusFrame = window.requestAnimationFrame(() => {
    statusFrame = window.requestAnimationFrame(() => {
      statusFrame = 0
      applyStatusBar()
    })
  })
}

applyStatusBar()
window.setInterval(applyStatusBar, 200)
new MutationObserver(scheduleStatusBar).observe(document.body, {
  subtree: true,
  childList: true,
  attributes: true,
  attributeFilter: ['class'],
})

const splash = document.getElementById('splash')
if (splash) {
  window.setTimeout(() => {
    splash.classList.add('splash--out')
    document.documentElement.classList.remove('splash-on')
    applyStatusBar()
    window.setTimeout(() => splash.remove(), 600)
  }, 1400)
}
