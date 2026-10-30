/**
 * Playwright verification: Face ID starting pill centers on `.phone__island`.
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '../tmp/face-id-verify')
mkdirSync(outDir, { recursive: true })

const BASE = process.env.FACE_ID_URL ?? 'http://127.0.0.1:5173/'
const TIMES = [0, 300, 800, 1400, 2400, 3500]

async function runAtViewport(browser, { width, height, label }) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2 })
  await page.goto(BASE, { waitUntil: 'networkidle' })

  // Force Face ID via React: click Add money → Add now, or wait for welcome overlay.
  const overlay = page.locator('.face-id-overlay__frame')
  const appeared = await overlay
    .waitFor({ state: 'attached', timeout: 12000 })
    .then(() => true)
    .catch(() => false)

  if (!appeared) {
    // Welcome may have finished; open Add money and trigger Face ID.
    await page.getByRole('button', { name: /Add money/i }).first().click()
    await page.getByRole('button', { name: /Add \$/i }).click()
    await overlay.waitFor({ state: 'attached', timeout: 8000 })
  }

  const alignment = await page.evaluate(() => {
    const island = document.querySelector('.phone__island')
    const frame = document.querySelector('.face-id-overlay__frame')
    const svg = frame?.querySelector('svg')
    const rect = svg?.querySelector('rect')
    if (!island || !frame || !svg || !rect) {
      return { ok: false, reason: 'missing nodes' }
    }
    svg.pauseAnimations()
    svg.setCurrentTime(0)
    const ir = island.getBoundingClientRect()
    const rr = rect.getBoundingClientRect()
    const dx = Math.abs(rr.left + rr.width / 2 - (ir.left + ir.width / 2))
    const dy = Math.abs(rr.top + rr.height / 2 - (ir.top + ir.height / 2))
    const dw = Math.abs(rr.width - ir.width)
    return {
      // Centers must match; height may differ (SVG pill aspect ≠ 126×37 island).
      ok: dx < 1.5 && dy < 1.5 && dw < 2,
      dx,
      dy,
      dw,
      island: { w: ir.width, h: ir.height, cx: ir.left + ir.width / 2, cy: ir.top + ir.height / 2 },
      pill: { w: rr.width, h: rr.height, cx: rr.left + rr.width / 2, cy: rr.top + rr.height / 2 },
    }
  })

  console.log(`[${label}] alignment`, alignment)

  for (const ms of TIMES) {
    await page.evaluate((t) => {
      const svg = document.querySelector('.face-id-overlay__frame svg')
      if (!svg) return
      svg.pauseAnimations()
      svg.setCurrentTime(t / 1000)
    }, ms)
    await page.waitForTimeout(40)
    const file = join(outDir, `${label}-t${ms}.png`)
    await page.locator('.phone').screenshot({ path: file })
    console.log(`[${label}] wrote`, file)
  }

  await page.close()
  return alignment
}

const browser = await chromium.launch({
  headless: true,
  channel: 'chrome',
})
try {
  const a = await runAtViewport(browser, { width: 390, height: 844, label: '390' })
  const b = await runAtViewport(browser, { width: 320, height: 720, label: '320' })
  if (!a.ok || !b.ok) {
    console.error('ALIGNMENT FAILED', { a, b })
    process.exitCode = 1
  } else {
    console.log('ALIGNMENT OK at both viewports')
  }
} finally {
  await browser.close()
}
