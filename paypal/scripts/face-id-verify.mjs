/**
 * Playwright verification: Face ID overlay aligns to `.phone__island` at t≈0
 * and expands from the cutout. Captures two viewport sizes.
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

  // Wait until Face ID overlay mounts (after splash + moment + wait ≈ 5.4s from app start;
  // splash may already be gone by load). Poll for the overlay frame.
  const overlay = page.locator('.face-id-overlay__frame')
  await overlay.waitFor({ state: 'attached', timeout: 20000 })

  // Freeze SMIL at t=0 for alignment check, then screenshot timeline via setCurrentTime.
  const alignment = await page.evaluate(() => {
    const phone = document.querySelector('.phone')
    const island = document.querySelector('.phone__island')
    const frame = document.querySelector('.face-id-overlay__frame')
    const svg = frame?.querySelector('svg')
    const rect = svg?.querySelector('rect')
    if (!phone || !island || !frame || !svg || !rect) {
      return { ok: false, reason: 'missing nodes' }
    }
    svg.pauseAnimations()
    svg.setCurrentTime(0)
    const ir = island.getBoundingClientRect()
    const rr = rect.getBoundingClientRect()
    const dx = Math.abs(rr.left + rr.width / 2 - (ir.left + ir.width / 2))
    const dy = Math.abs(rr.top + rr.height / 2 - (ir.top + ir.height / 2))
    const dw = Math.abs(rr.width - ir.width)
    const dh = Math.abs(rr.height - ir.height)
    return {
      ok: dx < 1.5 && dy < 1.5 && dw < 2 && dh < 2,
      dx,
      dy,
      dw,
      dh,
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
    // Brief paint
    await page.waitForTimeout(40)
    const file = join(outDir, `${label}-t${ms}.png`)
    await page.locator('.phone').screenshot({ path: file })
    console.log(`[${label}] wrote`, file)
  }

  // Confirm overlay unmounts after duration (resume clock from mount is hard; check attribute path)
  await page.evaluate(() => {
    const svg = document.querySelector('.face-id-overlay__frame svg')
    if (svg) {
      svg.unpauseAnimations()
      svg.setCurrentTime(3.6)
    }
  })

  await page.close()
  return alignment
}

const browser = await chromium.launch({
  headless: true,
  channel: 'chrome', // system Google Chrome (Playwright browser download blocked in sandbox)
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
