import type { ReactNode } from 'react'
import grammarlyMark from '../assets/grammarly.png'
import homeDepotMark from '../assets/homedepot.svg'
import plaidMark from '../assets/plaid.svg'
import bofaLogo from '../assets/banks/bofa.svg'
import capitalOneLogo from '../assets/banks/capitalone.svg'
import chaseLogo from '../assets/banks/chase.svg'
import chimeLogo from '../assets/banks/chime.svg'
import citiLogo from '../assets/banks/citi.svg'
import fifthThirdLogo from '../assets/banks/fifththird.svg'
import huntingtonLogo from '../assets/banks/huntington.svg'
import navyFederalLogo from '../assets/banks/navyfederal.svg'
import pncLogo from '../assets/banks/pnc.svg'
import regionsLogo from '../assets/banks/regions.svg'
import tdLogo from '../assets/banks/td.svg'
import truistLogo from '../assets/banks/truist.svg'
import usaaLogo from '../assets/banks/usaa.svg'
import usBankLogo from '../assets/banks/usbank.svg'
import wellsFargoLogo from '../assets/banks/wellsfargo.svg'
import capitalOneTileLogo from '../assets/banks/tile/capitalone.svg'
import citiTileLogo from '../assets/banks/tile/citi.svg'
import pncTileLogo from '../assets/banks/tile/pnc.svg'
import tdTileLogo from '../assets/banks/tile/td.svg'
import usBankTileLogo from '../assets/banks/tile/usbank.svg'
import wellsFargoTileLogo from '../assets/banks/tile/wellsfargo.svg'

export function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M3 5.5h14M3 10h14M3 14.5h14"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 2.5a4.5 4.5 0 0 0-4.5 4.5v3.2l-1.2 2.4a.75.75 0 0 0 .67 1.1h9.06a.75.75 0 0 0 .67-1.1l-1.2-2.4V7a4.5 4.5 0 0 0-4.5-4.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 15.5a1.75 1.75 0 0 0 3.5 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="7" r="3.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4.5 16.5c.9-2.8 3-4.5 5.5-4.5s4.6 1.7 5.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function PayPalLogo({ size = 34 }: { size?: number }) {
  const width = Math.round((size * 154) / 100)
  return (
    <svg width={width} height={size} viewBox="0 0 154 100" aria-hidden>
      <rect width="154" height="100" rx="16" fill="#003087" />
      <g transform="translate(8 6) scale(0.105)" fill="#7fd4ff">
        <path d="M1309.9993,0v328.2999h-74.7V0h74.7ZM1207.7994,110.7999v218.0999h-66.4v-18.8c-8.4,8.2-18,14.4-28.6,18.8-10.7,4.6-22.3,7-34.7,7-15.6,0-30.1-2.9-43.3999-8.7-13.3-6.1-24.9-14.4-34.7-24.8-9.9-10.5-17.7-22.7-23.5-36.6-5.5-14.2-8.2-29.5-8.2-45.8s2.7-31.4,8.2-45.3c5.8-14.2,13.6-26.6,23.5-37.1,9.7768-10.4201,21.5868-18.7245,34.7-24.4,13.3-6.1,27.8-9.2,43.3999-9.2,12.4,0,24,2.3,34.7,7,10.7,4.4,20.3,10.6,28.6,18.8v-18.8h66.4v-.2ZM1090.0994,269.4999c13.6,0,24.7-4.6,33.3999-14,9-9.3,13.5-21.2,13.5-35.7s-4.5-26.5-13.5-35.7c-8.7-9.3-19.9-14-33.3999-14s-24.9,4.6-33.9,14c-8.7,9.3-13,21.2-13,35.7s4.4,26.5,13,35.7c9,9.3,20.3,14,33.9,14ZM861.6996,0c19.7,0,36.5,2.8,50.4,8.3s25.6,13.2,35.1999,23.1c9.8,10.2,17.5,21.8,23,34.9s8.2,27.2,8.2,42.3-2.7,29.2-8.2,42.3c-5.3982,12.9791-13.202,24.8205-23,34.9-9.5,9.9-21.3,17.6-35.1999,23.1s-30.7,8.3-50.4,8.3h-36v111.6h-75.9999V0h111.9999ZM850.7996,149.5999c10.2,0,17.9-1,23.5-3.1,5.8-2.3,10.6-5.3,14.3-8.7,7.8-7.3,11.7-17,11.7-29.2s-3.9-21.9-11.7-29.2c-3.8-3.5-8.5-6.3-14.3-8.3-5.5-2.3-13.3-3.5-23.5-3.5h-25.2v82h25.2ZM469.6998,110.7999h82.5l56,104.6h.9l49.9-104.6h76.4l-163.6999,328.7998h-75.9999l74.7-150.3999-100.6999-178.3999ZM454.9998,110.7999v218.0999h-66.4v-18.8c-8.4,8.2-18,14.4-28.6,18.8-10.7,4.6-22.3,7-34.7,7-15.6,0-30.1-2.9-43.4-8.7-13.3-6.1-24.9-14.4-34.7-24.8-9.8-10.5-17.7-22.7-23.5-36.6-5.5-14.2-8.2-29.5-8.2-45.8s2.7-31.4,8.2-45.3c5.8-14.2,13.6-26.6,23.5-37.1,9.758-10.4418,21.5728-18.7496,34.7-24.4,13.3-6.1,27.8-9.2,43.4-9.2,12.4,0,24,2.3,34.7,7,10.7,4.4,20.3,10.6,28.6,18.8v-18.8h66.4v-.2ZM337.2998,269.4999c13.6,0,24.7-4.6,33.5-14,9-9.3,13.5-21.2,13.5-35.7s-4.5-26.5-13.5-35.7c-8.7-9.3-19.9-14-33.5-14s-24.9,4.6-33.9,14c-8.7,9.3-13,21.2-13,35.7s4.4,26.5,13,35.7c9,9.3,20.3,14,33.9,14ZM111.9999,0c19.7,0,36.5,2.8,50.4,8.3s25.6,13.2,35.2,23.1c9.8,10.2,17.5,21.8,23,34.9s8.2,27.2,8.2,42.3-2.7,29.2-8.2,42.3c-5.3982,12.9791-13.2019,24.8205-23,34.9-9.5,9.9-21.3,17.6-35.2,23.1-13.9,5.5-30.7,8.3-50.4,8.3h-36v111.6H0V0h111.9999ZM101.1999,149.5999c10.2,0,17.9-1,23.5-3.1,5.8-2.3,10.6-5.3,14.3-8.7,7.8-7.3,11.7-17,11.7-29.2s-3.9-21.9-11.7-29.2c-3.8-3.5-8.5-6.3-14.3-8.3-5.5-2.3-13.3-3.5-23.5-3.5h-25.2v82s25.2,0,25.2,0Z" />
      </g>
      <g transform="translate(108 70) scale(0.04)">
        <path fill="#EB001B" d="m308,0a309,309 0 1,0 2,0z" />
        <path fill="#F79E1B" d="m690,0a309,309 0 1,0 2,0z" />
        <path fill="#FF5F00" d="m500,66a309,309 0 0,0 0,486 309,309 0 0,0 0-486" />
      </g>
    </svg>
  )
}

export function ChevronLeft() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path
        d="M13.5 5.5 8 11l5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 6.5 8 10.5 12 6.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BillPlusIcon({ width, color }: { width: number; color: string }) {
  return (
    <svg width={width} height={(width * 68) / 116} viewBox="0 0 116 68" fill="none" aria-hidden>
      <rect x="3.5" y="3.5" width="109" height="61" rx="3" stroke={color} strokeWidth="7" />
      <path
        d="M22.5 0A22.5 22.5 0 0 1 0 22.5M93.5 0A22.5 22.5 0 0 0 116 22.5M0 45.5A22.5 22.5 0 0 1 22.5 68M116 45.5A22.5 22.5 0 0 0 93.5 68"
        stroke={color}
        strokeWidth="7"
      />
      <path d="M58 22.5v23M46 34h24" stroke={color} strokeWidth="7.2" strokeLinecap="round" />
    </svg>
  )
}

export function CardChipIcon() {
  return <BillPlusIcon width={23} color="#fff" />
}

function NavSvg({ active, children }: { active?: boolean; children: ReactNode }) {
  return (
    <svg
      width="27"
      height="27"
      viewBox="-2 -2 54 54"
      fill="none"
      stroke={active ? 'currentColor' : '#757575'}
      strokeWidth={active ? 5 : 3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  )
}

export function HomeIcon({ active }: { active?: boolean }) {
  return (
    <NavSvg active={active}>
      <path d="M4 29 0 26 25 5l25 21-4 3M4 29v17.5M46 29v17.5M19 46.5V32h12v14.5" />
      <path d="M1 46.5h48" strokeWidth={active ? 5.5 : 4.5} />
    </NavSvg>
  )
}

export function WalletIcon({ active }: { active?: boolean }) {
  return (
    <NavSvg active={active}>
      <path d="M40 5.5H6.5a3 3 0 0 0-3 3v29a5 5 0 0 0 5 5h33a5 5 0 0 0 5-5V16a3 3 0 0 0-3-3H3.5" />
      <circle cx="36" cy="27" r="2.8" fill={active ? 'currentColor' : '#757575'} stroke="none" />
    </NavSvg>
  )
}

export function SendRequestIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 17.2V4.6M4.7 8 8 4.6 11.3 8"
        stroke="#fff"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 6.8v12.6M12.7 16 16 19.4 19.3 16"
        stroke="#fff"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ActivityIcon({ active }: { active?: boolean }) {
  return (
    <NavSvg active={active}>
      <path d="M2.5 43.5V9.2a1.5 1.5 0 0 1 1.5-1.5h42a1.5 1.5 0 0 1 1.5 1.5v34.3c-2.5 0-5-2.5-7.5-2.5s-5 2.5-7.5 2.5-5-2.5-7.5-2.5-5 2.5-7.5 2.5-5-2.5-7.5-2.5-5 2.5-7.5 2.5Z" />
      <path d="M14.5 20h22M14.5 27h22" />
    </NavSvg>
  )
}

export function OffersIcon({ active }: { active?: boolean }) {
  return (
    <NavSvg active={active}>
      <path d="M4.5 13h41v32a3 3 0 0 1-3 3h-35a3 3 0 0 1-3-3V13Z" />
      <path d="M16 19v-8.5a8.5 8.5 0 0 1 17 0V19" />
    </NavSvg>
  )
}

export function TargetLogo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden>
      <circle cx="20" cy="20" r="18" fill="#cc0000" />
      <circle cx="20" cy="20" r="11" fill="white" />
      <circle cx="20" cy="20" r="5" fill="#cc0000" />
    </svg>
  )
}

export function HomeDepotLogo() {
  return (
    <img className="home-depot-logo" src={homeDepotMark} width={44} height={44} alt="" />
  )
}

export function BathBodyLogo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden>
      <rect width="40" height="40" rx="8" fill="#003087" />
      <text x="20" y="24" textAnchor="middle" fill="white" fontSize="8" fontWeight="600" fontFamily="Segoe UI, Helvetica, Arial, sans-serif">
        B&amp;BW
      </text>
    </svg>
  )
}

export function GrammarlyLogo() {
  return <img src={grammarlyMark} width={32} height={32} alt="" />
}

export function PencilIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M7.2 2.1 9.9 4.8 4.4 10.3 1.5 10.5 1.7 7.6 7.2 2.1Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function EditAmountIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <g transform="rotate(45 12 12)" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
        <path d="M9 3.5h6V16l-3 5-3-5V3.5Z" />
        <path d="M9 6.6h6M9 16h6" />
      </g>
    </svg>
  )
}

export function SelectedCheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
      <circle cx="10" cy="10" r="10" fill="#000" />
      <path d="m5.8 10.2 2.8 2.8 5.6-5.8" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ShiftIcon({ on }: { on: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
      <path
        d="M11 3.2 2.8 11.6h4.7v6.2h7v-6.2h4.7L11 3.2Z"
        fill={on ? '#000' : 'none'}
        stroke="#000"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function EmojiIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <circle cx="13" cy="13" r="10.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9.4" cy="10.6" r="1.25" fill="currentColor" />
      <circle cx="16.6" cy="10.6" r="1.25" fill="currentColor" />
      <path d="M8.2 15.2a5.4 5.4 0 0 0 9.6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function MicIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <rect x="9.5" y="3" width="7" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 12.5a7 7 0 0 0 14 0M13 19.5V23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function QrCodeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="3" y="3" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11.5" y="3" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="11.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11.5 11.5h2.4v2.4h-2.4zM14.6 14.6H17V17h-2.4z" fill="currentColor" />
    </svg>
  )
}

export function MoreVerticalIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <circle cx="10" cy="4.5" r="1.5" />
      <circle cx="10" cy="10" r="1.5" />
      <circle cx="10" cy="15.5" r="1.5" />
    </svg>
  )
}

export function MoneyLinkIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path d="M9 7H6.5a4 4 0 0 0 0 8H9M13 7h2.5a4 4 0 0 1 0 8H13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7.5 11h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function GearIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M8.2 2.6h3.6l.4 1.8a6 6 0 0 1 1.4.8l1.7-.7 1.8 1.8-.7 1.7c.3.4.6.9.8 1.4l1.8.4v3.6l-1.8.4a6 6 0 0 1-.8 1.4l.7 1.7-1.8 1.8-1.7-.7a6 6 0 0 1-1.4.8l-.4 1.8H8.2l-.4-1.8a6 6 0 0 1-1.4-.8l-1.7.7-1.8-1.8.7-1.7a6 6 0 0 1-.8-1.4l-1.8-.4V8.2l1.8-.4c.2-.5.5-1 .8-1.4l-.7-1.7 1.8-1.8 1.7.7c.4-.3.9-.6 1.4-.8l.4-1.8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

export function InviteIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect x="2.4" y="2.4" width="17.2" height="17.2" rx="3.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="8" cy="8.4" r="1.9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4.8 14.6c.55-1.7 1.7-2.6 3.2-2.6s2.65.9 3.2 2.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14.7 8.3v4.6M12.4 10.6h4.6"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function HelpIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7.85" stroke="currentColor" strokeWidth="1.65" />
      <circle cx="11" cy="11" r="3.25" stroke="currentColor" strokeWidth="1.65" />
      <path
        d="M11 3.95v3.05M11 15v3.05M3.95 11h3.05M15 11h3.05"
        stroke="currentColor"
        strokeWidth="1.65"
      />
    </svg>
  )
}

export function SubscriptionsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path
        d="M16.8 8.2A6.2 6.2 0 0 0 6.4 6.2L5 7.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M5 4.6v3h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M5.2 13.8a6.2 6.2 0 0 0 10.4 2L17 14.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M17 17.4v-3h-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function MessageIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect
        x="2.6"
        y="3.2"
        width="12.2"
        height="9.2"
        rx="2.1"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M7.4 8.2h10.2a2 2 0 0 1 2 2v4.6a2 2 0 0 1-2 2H12l-2.3 2.2v-2.2H7.4a2 2 0 0 1-2-2v-4.6a2 2 0 0 1 2-2Z"
        fill="#fff"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LogoutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M8 4.5H5.5A1.5 1.5 0 0 0 4 6v8a1.5 1.5 0 0 0 1.5 1.5H8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10.5 10H16m0 0-2.2-2.2M16 10l-2.2 2.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function TransferIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 8.2h12.2M13.2 5.2 16.6 8.2 13.2 11.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 15.8H7.8M10.8 12.8 7.4 15.8 10.8 18.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function InfoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 11.1V16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="12" cy="8.3" r="0.9" fill="currentColor" />
    </svg>
  )
}

export function WalmartLogo() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden>
      <circle cx="22" cy="22" r="22" fill="#0071ce" />
      <g fill="#ffc220">
        <rect x="20.2" y="6" width="3.6" height="32" rx="1.2" />
        <rect x="20.2" y="6" width="3.6" height="32" rx="1.2" transform="rotate(60 22 22)" />
        <rect x="20.2" y="6" width="3.6" height="32" rx="1.2" transform="rotate(120 22 22)" />
      </g>
    </svg>
  )
}

export function BestBuyLogo() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden>
      <circle cx="22" cy="22" r="22" fill="#0046be" />
      <text
        x="22"
        y="20"
        textAnchor="middle"
        fill="#fff"
        fontSize="7.2"
        fontWeight="800"
        fontFamily="Segoe UI, Helvetica, Arial, sans-serif"
      >
        BEST
      </text>
      <text
        x="22"
        y="29"
        textAnchor="middle"
        fill="#fff"
        fontSize="7.2"
        fontWeight="800"
        fontFamily="Segoe UI, Helvetica, Arial, sans-serif"
      >
        BUY
      </text>
      <path d="M30 30h8l-2 6h-6v-6Z" fill="#ffe000" />
    </svg>
  )
}

export function UberLogo() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden>
      <circle cx="22" cy="22" r="22" fill="#111" />
      <text
        x="22"
        y="26"
        textAnchor="middle"
        fill="#fff"
        fontSize="9"
        fontWeight="700"
        fontFamily="Segoe UI, Helvetica, Arial, sans-serif"
      >
        Uber
      </text>
    </svg>
  )
}

export function DollarGeneralLogo() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden>
      <circle cx="22" cy="22" r="22" fill="#ffd100" />
      <text
        x="22"
        y="27"
        textAnchor="middle"
        fill="#111"
        fontSize="13"
        fontWeight="800"
        fontFamily="Segoe UI, Helvetica, Arial, sans-serif"
      >
        DG
      </text>
    </svg>
  )
}

export function SevenElevenLogo() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden>
      <circle cx="22" cy="22" r="22" fill="#fff" />
      <path d="M14 12h16l-8 20h-5l6.2-15.2H14V12Z" fill="#e2231a" />
      <path d="M14 12h16v4.2H20.2L14 16.2V12Z" fill="#f58220" />
      <text
        x="22"
        y="36"
        textAnchor="middle"
        fill="#00843d"
        fontSize="5.5"
        fontWeight="800"
        fontFamily="Segoe UI, Helvetica, Arial, sans-serif"
      >
        ELEVEN
      </text>
    </svg>
  )
}

export function CloseIcon() {
  return (
    <svg width="15" height="15" viewBox="3 3 15 15" fill="none" aria-hidden>
      <path d="M4.6 4.6 16.4 16.4M16.4 4.6 4.6 16.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function ArrowLeftIcon() {
  return (
    <svg width="20" height="16" viewBox="4.6 2.6 22 17.8" fill="none" aria-hidden>
      <path d="M13.2 3.6 5.6 11.5l7.6 7.9M5.8 11.5h20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function KeypadDeleteIcon() {
  return (
    <svg width="27" height="20" viewBox="0 0 27 20" fill="none" aria-hidden>
      <path
        d="M8.6 1.2h14.6a2.6 2.6 0 0 1 2.6 2.6v12.4a2.6 2.6 0 0 1-2.6 2.6H8.6a2.6 2.6 0 0 1-1.95-.88L1.6 12.2a3.3 3.3 0 0 1 0-4.4l5.05-5.72A2.6 2.6 0 0 1 8.6 1.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="m11.4 6.4 7.2 7.2m0-7.2-7.2 7.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function CameraIcon() {
  return (
    <svg width="21" height="19" viewBox="-0.4 -0.3 23.8 20.6" fill="none" aria-hidden>
      <path
        d="M0.5 4a1.5 1.5 0 0 1 1.5-1.5h5.1L7.7.5h8.2l.6 2H21A1.5 1.5 0 0 1 22.5 4v14a1.5 1.5 0 0 1-1.5 1.5H2A1.5 1.5 0 0 1 .5 18Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="11.5" cy="11" r="4.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

export function HelpCircleIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10.7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.5 10a3.4 3.4 0 1 1 4.9 3.1c-.9.4-1.5 1-1.5 2v.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="11.9" cy="18.4" r="1.05" fill="currentColor" />
    </svg>
  )
}

export function BankIcon() {
  return (
    <svg width="27" height="23" viewBox="4 2.5 27 23" fill="none" aria-hidden>
      <path d="M5.8 10.9 17 4.2l11.2 6.7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9.4 11.6v7.8M14.8 11.6v7.8M20.4 11.6v7.8M25.4 11.6v7.8M6.4 20h21.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.6 23.9h25.8" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export function CardOutlineIcon() {
  return (
    <svg width="26" height="19" viewBox="4 4 26 19" fill="none" aria-hidden>
      <rect x="5.7" y="5.5" width="23" height="16" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5.7 10h23" stroke="currentColor" strokeWidth="2" />
      <path d="M16.4 18.3h2.4M21.4 18.3h3.6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

export function AmexMark({ size = 28, color = '#000' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 420 420" aria-hidden>
      <rect width="420" height="420" fill={color} />
      <g transform="translate(58.9 -1271)">
        <path
          fill="#fff"
          d="m 55.5,1422.7991 37.393125,-87.1766 64.667505,0 21.22103,48.8328 0,-48.8328 80.38767,0 12.63289,35.2949 12.24716,-35.2949 360.8573,0 0,17.7439 c 0,0 18.96995,-17.7439 50.14586,-17.7439 l 117.08499,0.4092 20.85469,48.1937 0,-48.6029 67.27259,0 18.5154,27.6834 0,-27.6834 67.88977,0 0,156.6093 -67.88977,0 -17.74392,-27.7731 0,27.7731 -98.83835,0 -9.93959,-24.6872 -26.57108,0 -9.77781,24.6872 -67.02872,0 c -26.82589,0 -43.97406,-17.3816 -43.97406,-17.3816 l 0,17.3816 -101.06318,0 -20.05835,-24.6872 0,24.6872 -375.80462,0 -9.93274,-24.6872 -26.48635,0 -9.86254,24.6872 -46.1989,0 z"
        />
      </g>
      <g transform="translate(-89.2 -1341.3)">
        <path
          fill="#fff"
          d="m 249.14015,1697.4441 0,-156.6094 165.82027,0 17.79072,23.1924 18.37901,-23.1924 601.88665,0 0,145.8088 c 0,0 -15.7404,10.644 -33.9449,10.8006 l -333.27706,0 -20.05834,-24.6872 0,24.6872 -65.72965,0 0,-42.1418 c 0,0 -8.97877,5.8825 -28.39026,5.8825 l -22.37277,0 0,36.2593 -99.52024,0 -17.7653,-23.6898 -18.03807,23.6898 z"
        />
      </g>
      <g transform="translate(58.9 -1271)" fill={color}>
        <path d="m 106.12803,1354.9291 -50.435161,117.2641 32.835892,0 9.305914,-23.4816 54.099665,0 9.2577,23.4816 33.55915,0 -50.38695,-117.2641 -38.23621,0 z m 18.66004,27.2909 16.49028,41.0329 -33.02877,0 16.53849,-41.0329 z" />
        <path d="m 198.22282,1472.1735 0,-117.2642 46.66163,0.1733 27.13999,75.6045 26.4901,-75.7778 46.28848,0 0,117.2642 -29.31604,0 0,-86.4052 -31.07562,86.4052 -25.71023,0 -31.16227,-86.4052 0,86.4052 z" />
      </g>
      <g transform="translate(-89.2 -1341.3)" fill={color}>
        <path d="m 269.1985,1677.3858 0,-117.2642 95.66286,0 0,26.2302 -66.03823,0 0,20.0583 64.49528,0 0,24.6872 -64.49528,0 0,20.8298 66.03823,0 0,25.4587 z" />
        <path d="m 368.57408,1677.3858 46.57779,-57.9089 -47.68678,-59.3553 36.93435,0 28.39991,36.6932 28.49635,-36.6932 35.48784,0 -47.05996,58.6321 46.66353,58.6321 -36.92851,0 -27.57537,-36.1148 -26.90518,36.1148 z" />
        <path d="m 499.86944,1560.1414 0,117.2641 30.08751,0 0,-37.0308 30.85899,0 c 26.11107,0 45.90274,-13.8524 45.90274,-40.7917 0,-22.3164 -15.52271,-39.4416 -42.09358,-39.4416 l -64.75566,0 z m 30.08751,26.5194 32.49837,0 c 8.43546,0 14.46515,5.1701 14.46515,13.5008 0,7.8262 -5.99925,13.5008 -14.56158,13.5008 l -32.40194,0 0,-27.0016 z" />
      </g>
    </svg>
  )
}

export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'jcb' | 'diners'

const cardBrandLabels: Record<CardBrand, string> = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'American Express',
  discover: 'Discover',
  jcb: 'JCB',
  diners: 'Diners Club',
}

function cardBrandMark(brand: CardBrand, fill?: string) {
  switch (brand) {
    case 'visa':
      return (
        <svg width="26" height="9" viewBox="0 7.9 24 8.2">
          <path
            fill={fill ?? '#1A1F71'}
            d="M9.112 8.262L5.97 15.758H3.92L2.374 9.775c-.094-.368-.175-.503-.461-.658C1.447 8.864.677 8.627 0 8.479l.046-.217h3.3a.904.904 0 01.894.764l.817 4.338 2.018-5.102zm8.033 5.049c.008-1.979-2.736-2.088-2.717-2.972.006-.269.262-.555.822-.628a3.66 3.66 0 011.913.336l.34-1.59a5.207 5.207 0 00-1.814-.333c-1.917 0-3.266 1.02-3.278 2.479-.012 1.079.963 1.68 1.698 2.04.756.367 1.01.603 1.006.931-.005.504-.602.725-1.16.734-.975.015-1.54-.263-1.992-.473l-.351 1.642c.453.208 1.289.39 2.156.398 2.037 0 3.37-1.006 3.377-2.564m5.061 2.447H24l-1.565-7.496h-1.656a.883.883 0 00-.826.55l-2.909 6.946h2.036l.405-1.12h2.488zm-2.163-2.656l1.02-2.815.588 2.815zm-8.16-4.84l-1.603 7.496H8.34l1.605-7.496z"
          />
        </svg>
      )
    case 'mastercard':
      return (
        <svg width="24" height="15" viewBox="0 0 1000 618">
          <path fill="#EB001B" d="m308,0a309,309 0 1,0 2,0z" />
          <path fill="#F79E1B" d="m690,0a309,309 0 1,0 2,0z" />
          <path fill="#FF5F00" d="m500,66a309,309 0 0,0 0,486 309,309 0 0,0 0-486" />
        </svg>
      )
    case 'amex':
      return <AmexMark size={22} color="#016FD0" />
    case 'discover':
      return (
        <svg width="28" height="6" viewBox="0 9.6 24 4.8">
          <path
            fill={fill ?? '#FF6000'}
            d="M14.58 12a2.023 2.023 0 1 1-2.025-2.023h.002c1.118 0 2.023.906 2.023 2.023zm-5.2-2.001c-1.124 0-2.025.884-2.025 1.99 0 1.118.878 1.984 2.007 1.984.319 0 .593-.063.93-.221v-.873c-.296.297-.559.416-.895.416-.747 0-1.277-.542-1.277-1.312 0-.73.547-1.306 1.243-1.306.354 0 .622.126.93.428v-.873a1.898 1.898 0 0 0-.913-.233zm-3.352 1.545c-.445-.165-.576-.273-.576-.479 0-.239.233-.422.553-.422.222 0 .405.091.598.308l.388-.508a1.665 1.665 0 0 0-1.117-.422c-.673 0-1.186.467-1.186 1.089 0 .524.239.792.936 1.043.291.103.438.171.513.217a.456.456 0 0 1 .222.394c0 .308-.245.536-.576.536-.354 0-.639-.177-.809-.507l-.479.461c.342.502.752.724 1.317.724.771 0 1.311-.513 1.311-1.249-.002-.603-.252-.876-1.095-1.185zM24 10.3a.29.29 0 0 1-.288.291.29.29 0 0 1-.291-.291v-.003A.29.29 0 1 1 24 10.3zm-.059.001a.235.235 0 0 0-.231-.239.234.234 0 0 0-.232.239c0 .132.104.239.232.239a.235.235 0 0 0 .231-.239zM3.472 13.887h.742v-3.803h-.742v3.803zm12.702-1.248l-1.014-2.554h-.81l1.614 3.9h.399l1.643-3.9h-.804l-1.028 2.554zm2.166 1.248h2.104v-.644h-1.362v-1.027h1.312v-.644h-1.312v-.844h1.362v-.644H18.34v3.803zm5.409-3.557l.11.138h-.097l-.094-.13v.13h-.08v-.334h.107c.081 0 .126.036.126.103.001.046-.025.08-.072.093zm-.006-.092c0-.029-.021-.043-.06-.043h-.014v.087h.014c.039 0 .06-.014.06-.044zm-1.228 2.047l1.197 1.602H22.8l-1.027-1.528h-.097v1.528h-.741v-3.803h1.1c.855 0 1.346.411 1.346 1.123 0 .583-.308.965-.866 1.078zm.103-1.038c0-.37-.251-.563-.713-.563h-.228v1.152h.217c.473-.001.724-.207.724-.589zm-19.487.742a1.91 1.91 0 0 1-.69 1.46c-.365.303-.781.439-1.357.439H.001v-3.803H1.09c1.202 0 2.041.781 2.041 1.904zm-.764-.006c0-.364-.154-.718-.411-.947-.245-.222-.536-.308-1.015-.308H.742v2.515h.199c.479 0 .782-.092 1.015-.302.256-.228.411-.593.411-.958z"
          />
        </svg>
      )
    case 'jcb':
      return (
        <svg width="24" height="7" viewBox="0 8.6 24 6.8">
          <path
            fill={fill ?? '#0B4EA2'}
            d="M13.05 9.8643c.9723.0736 1.7257.3671 2.3545.6843v-1.31s-1.2577-.3162-2.4408-.368c-4.1256-.1849-5.295 1.4344-5.295 3.1292 0 1.6947 1.1694 3.3145 5.295 3.1296 1.1831-.0536 2.4408-.3694 2.4408-.3694v-1.3086c-.6193.3081-1.3826.6107-2.3545.683-1.6793.1272-2.6898-.6907-2.6898-2.1342 0-1.4448 1.0105-2.2613 2.6898-2.1354m7.685 4.1223c-.0513.0105-.1581.02-.215.02h-1.8005V12.376H20.52c.0568 0 .1636.01.2149.02a.8056.8056 0 01.6325.7951c0 .4162-.2872.721-.6325.796zm-2.0155-4.0374h1.6325c.059 0 .1454.0077.1772.0137.3376.0572.6256.3307.6256.7392 0 .409-.288.6815-.626.7392a1.571 1.571 0 01-.1773.0137h-1.6311V9.9506zm3.4994 1.9856v-.0364c.9133-.1331 1.4149-.726 1.4149-1.4199 0-.8828-.7343-1.3916-1.7293-1.4416-.0772-.0032-.203-.011-.3044-.011h-5.3323v5.9467h5.7548c1.13 0 1.9774-.6043 1.9774-1.5466 0-.8701-.7724-1.4222-1.781-1.4917zm-17.8644.6788c0 .8787-.5906 1.5311-1.6656 1.5311-.917 0-1.8174-.2726-2.6889-.6938V14.76s1.4021.383 3.191.383c2.9714 0 3.8374-1.125 3.8374-2.529V9.0266H4.3541v3.5876Z"
          />
        </svg>
      )
    case 'diners':
      return (
        <svg width="18" height="16" viewBox="0 1.4 24 21.2">
          <path
            fill={fill ?? '#004C97'}
            d="M16.506 11.982a6.026 6.026 0 0 0-3.866-5.618V17.6a6.025 6.025 0 0 0 3.866-5.618zM8.33 17.598V6.365a6.03 6.03 0 0 0-3.863 5.617 6.028 6.028 0 0 0 3.863 5.616zm2.156-15.113A9.497 9.497 0 0 0 .99 11.982a9.495 9.495 0 0 0 9.495 9.494c5.245 0 9.495-4.25 9.496-9.494a9.499 9.499 0 0 0-9.496-9.497Zm-.023 19.888C4.723 22.4 0 17.75 0 12.09 0 5.905 4.723 1.626 10.463 1.627h2.69C18.822 1.627 24 5.903 24 12.09c0 5.658-5.176 10.283-10.848 10.283"
          />
        </svg>
      )
  }
}

export function CardBrandLogo({ brand }: { brand: CardBrand }) {
  return (
    <span className={`card-brand card-brand--${brand}`} role="img" aria-label={cardBrandLabels[brand]}>
      {cardBrandMark(brand)}
    </span>
  )
}

export function CardArtLogo({ brand }: { brand: CardBrand }) {
  return (
    <span className={`card-art__logo card-art__logo--${brand}`} role="img" aria-label={cardBrandLabels[brand]}>
      {brand === 'amex' ? <AmexMark size={34} color="#016FD0" /> : cardBrandMark(brand, '#fff')}
    </span>
  )
}

export type BankId =
  | 'chase'
  | 'bofa'
  | 'wellsfargo'
  | 'capitalone'
  | 'chime'
  | 'navyfederal'
  | 'td'
  | 'truist'
  | 'pnc'
  | 'huntington'
  | 'citi'
  | 'fifththird'
  | 'regions'
  | 'usaa'
  | 'usbank'

export type Issuer = BankId | 'amex' | 'discover'

const bankLogos: Record<BankId, string> = {
  chase: chaseLogo,
  bofa: bofaLogo,
  wellsfargo: wellsFargoLogo,
  capitalone: capitalOneLogo,
  chime: chimeLogo,
  navyfederal: navyFederalLogo,
  td: tdLogo,
  truist: truistLogo,
  pnc: pncLogo,
  huntington: huntingtonLogo,
  citi: citiLogo,
  fifththird: fifthThirdLogo,
  regions: regionsLogo,
  usaa: usaaLogo,
  usbank: usBankLogo,
}

// Logos that keep a brand accent on coloured backgrounds; the rest are shown all white.
const bankTileLogos: Partial<Record<BankId, string>> = {
  capitalone: capitalOneTileLogo,
  citi: citiTileLogo,
  pnc: pncTileLogo,
  td: tdTileLogo,
  usbank: usBankTileLogo,
  wellsfargo: wellsFargoTileLogo,
}

const issuerLabels: Record<Issuer, string> = {
  chase: 'Chase',
  bofa: 'Bank of America',
  wellsfargo: 'Wells Fargo',
  capitalone: 'Capital One',
  chime: 'Chime',
  navyfederal: 'Navy Federal Credit Union',
  td: 'TD Bank',
  truist: 'Truist',
  pnc: 'PNC',
  huntington: 'Huntington',
  citi: 'Citi',
  fifththird: 'Fifth Third',
  regions: 'Regions',
  usaa: 'USAA',
  usbank: 'U.S. Bank',
  amex: 'American Express',
  discover: 'Discover',
}

export function BankLogo({ bank, onColor = false, alt }: { bank: BankId; onColor?: boolean; alt?: string }) {
  const tileLogo = onColor ? bankTileLogos[bank] : undefined
  const mono = onColor && !tileLogo
  return (
    <img
      className={`bank-logo bank-logo--${bank}${mono ? ' bank-logo--mono' : ''}`}
      src={tileLogo ?? bankLogos[bank]}
      alt={alt ?? issuerLabels[bank]}
    />
  )
}

export function IssuerLogo({ issuer }: { issuer: Issuer }) {
  return (
    <span className={`card-art__logo card-art__logo--${issuer}`} role="img" aria-label={issuerLabels[issuer]}>
      {issuer === 'amex' ? (
        <AmexMark size={34} color="#016FD0" />
      ) : issuer === 'discover' ? (
        cardBrandMark('discover', '#fff')
      ) : (
        <BankLogo bank={issuer} onColor alt="" />
      )}
    </span>
  )
}

export function PlaidMark() {
  return <img className="plaid-mark" src={plaidMark} alt="Plaid" />
}

export function SuccessCheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="12.9" stroke="#2e8466" strokeWidth="2.2" />
      <path
        d="M8.8 14.4 12.3 17.9 19.2 10.6"
        stroke="#2e8466"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="8.6" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M6.3 10.2 8.8 12.7 13.8 7.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LinkedCardsIllustration() {
  return (
    <svg width="108" height="68" viewBox="0 0 156 99" aria-hidden>
      <rect width="106" height="71" rx="5" fill="#7fd9fb" />
      <rect x="14" y="14" width="21" height="22" rx="2.5" fill="#051868" />
      <rect x="50" y="29" width="106" height="70" rx="5" fill="#94e141" />
      <path d="M106 43h50v13h-50z" fill="#225311" />
      <rect x="58" y="81.5" width="34" height="5.5" rx="2.75" fill="#205706" />
      <rect x="50" y="29" width="56" height="42" rx="3" fill="#fff" />
      <path
        d="M65 50 74 59 90 40"
        fill="none"
        stroke="#051868"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AddMoneyIcon() {
  return <BillPlusIcon width={28} color="currentColor" />
}

export function BofaTileLogo() {
  return (
    <svg viewBox="0 0 175 109" aria-label="Bank of America">
      <rect width="175" height="109" fill="#E31837" />
      <g transform="translate(-566 18.5)" fill="#fff">
        <path d="M653.3 72.1c21-18 50.5-35.5 66.7-41.8-2.5-1.6-6.4-3.9-10.8-6.4-20.9 6.9-45.3 22.2-67.1 39.5 3.7 2.8 7.6 5.7 11.2 8.7z" />
        <path d="M643.7 23.2c-3.1-1.5-6.5-2.9-9.1-4.1-7.9 3.9-18.2 9.8-31.2 19.1 2.8 1.5 5.8 3.3 9 5.1 10-7.4 20.1-14.4 31.3-20.1z" />
        <path d="M662.4 14.6c-3.8-2.1-17-7-26.1-9.1-2.7 1-6.5 2.5-9.1 3.6 3.3.9 15.6 4.2 26.1 9.5 2.7-1.3 6.5-2.9 9.1-4z" />
        <path d="M617.7 13.3c-11.7 5.4-24 12.8-30.7 17.1 2.4 1.1 4.8 2 8.1 3.6 14.8-10 26.4-16.1 31-18.1-3.3-1.2-6.4-2-8.4-2.6z" />
        <path d="M671.2 11.5c2.7-.9 5.8-1.7 8.5-2.5-7.8-3.3-17.6-6.8-26.4-9-1.4.4-5.6 1.5-8.5 2.4 3 .9 12.9 3.2 26.4 9.1zm-49.3 37.6c3.2 1.9 6.6 4.5 9.9 6.7 21.9-17 43.5-30.1 67.2-37.5-3.3-1.7-6.2-3.2-9.9-5-14.2 3.6-38.5 13.3-67.2 35.8z" />
      </g>
    </svg>
  )
}

export function BoltFillIcon() {
  return (
    <svg width="10" height="14" viewBox="0 0 10 14" aria-hidden>
      <path d="M6.6 0 0.6 8h3.6L3.2 14l6.2-8.4H5.8L6.6 0Z" fill="currentColor" />
    </svg>
  )
}

export function FaceIdIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20v-6A10 10 0 0 1 14 4h6M44 4h6a10 10 0 0 1 10 10v6M60 44v6a10 10 0 0 1-10 10h-6M20 60h-6A10 10 0 0 1 4 50v-6" />
        <path className="faceid-glyph__face" d="M21 22v5M43 22v5M32.5 22v12.5c0 1.6-1 2.5-2.6 2.5h-1.4M22.5 44c5.4 4.8 13.6 4.8 19 0" />
      </g>
    </svg>
  )
}

export function PayPalAppIcon() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden>
      <rect width="40" height="40" rx="9" fill="#1b40c2" />
      <g transform="translate(10 8) scale(0.0533)">
        <path fill="#fff" d="M318.58,103.5c0,55.74-51.44,121.5-129.27,121.5h-74.97l-3.68,23.22-17.49,111.78H0L56.05,0h150.95c50.83,0,90.82,28.33,105.55,67.7,4.2482,11.4467,6.2941,23.5933,6.03,35.8Z" />
        <path fill="#dbe4ff" d="M372.28,207c-10.2713,62.4081-64.2924,108.1528-127.54,108h-52.06l-21.67,135h-92.67l14.83-90,17.5-111.78,3.67-23.22h74.97c77.73,0,129.27-65.76,129.27-121.5,38.25,19.74,60.55,59.63,53.7,103.5Z" />
        <path fill="#b8c9ff" d="M318.58,103.5c-16.04-8.39-35.49-13.5-56.66-13.5h-126.4l-21.18,135h74.97c77.73,0,129.27-65.76,129.27-121.5Z" />
      </g>
    </svg>
  )
}

export function PerplexityLogo() {
  return (
    <svg width="40" height="40" viewBox="0 0 50 50" aria-hidden>
      <circle cx="25" cy="25" r="25" fill="#0a1c22" />
      <path
        fill="#f7f8f8"
        fillRule="evenodd"
        d="M 25 6 L 26 6 L 26 15 L 28 15 L 28 14 L 29 14 L 29 13 L 31 13 L 31 12 L 32 12 L 32 11 L 33 11 L 33 10 L 34 10 L 34 9 L 35 9 L 35 8 L 36 8 L 36 7 L 38 7 L 38 17 L 39 17 L 39 18 L 40 18 L 40 17 L 41 17 L 41 18 L 43 18 L 43 34 L 42 34 L 42 35 L 38 35 L 38 44 L 37 44 L 37 43 L 35 43 L 35 42 L 34 42 L 34 41 L 33 41 L 33 40 L 32 40 L 32 39 L 31 39 L 31 38 L 30 38 L 30 37 L 28 37 L 28 36 L 26 36 L 26 45 L 25 45 L 25 37 L 24 37 L 24 36 L 23 36 L 23 37 L 22 37 L 22 38 L 20 38 L 20 39 L 19 39 L 19 40 L 18 40 L 18 41 L 17 41 L 17 42 L 16 42 L 16 43 L 15 43 L 15 44 L 13 44 L 13 35 L 9 35 L 9 34 L 8 34 L 8 19 L 9 19 L 9 18 L 11 18 L 11 17 L 13 17 L 13 7 L 15 7 L 15 8 L 16 8 L 16 9 L 17 9 L 17 10 L 18 10 L 18 11 L 19 11 L 19 12 L 20 12 L 20 13 L 21 13 L 21 14 L 22 14 L 22 15 L 25 15 Z M 15 11 L 17 11 L 17 12 L 18 12 L 18 13 L 19 13 L 19 14 L 20 14 L 20 15 L 21 15 L 21 17 L 18 17 L 18 18 L 16 18 L 16 17 L 15 17 L 15 11 Z M 34 11 L 36 11 L 36 17 L 32 17 L 32 18 L 31 18 L 31 17 L 30 17 L 30 15 L 31 15 L 31 14 L 32 14 L 32 13 L 33 13 L 33 12 L 34 12 L 34 11 Z M 11 19 L 21 19 L 21 20 L 22 20 L 22 21 L 21 21 L 21 22 L 20 22 L 20 23 L 19 23 L 19 24 L 18 24 L 18 25 L 16 25 L 16 27 L 14 27 L 14 28 L 13 28 L 13 32 L 12 32 L 12 33 L 11 33 L 11 32 L 10 32 L 10 20 L 11 20 L 11 19 Z M 30 19 L 40 19 L 40 20 L 41 20 L 41 32 L 40 32 L 40 33 L 39 33 L 39 32 L 38 32 L 38 28 L 36 28 L 36 27 L 35 27 L 35 25 L 34 25 L 34 24 L 32 24 L 32 23 L 31 23 L 31 22 L 30 22 L 30 21 L 29 21 L 29 20 L 30 20 L 30 19 Z M 22 22 L 24 22 L 24 23 L 25 23 L 25 32 L 24 32 L 24 34 L 22 34 L 22 36 L 20 36 L 20 37 L 19 37 L 19 38 L 18 38 L 18 39 L 17 39 L 17 40 L 15 40 L 15 29 L 16 29 L 16 28 L 17 28 L 17 27 L 18 27 L 18 26 L 19 26 L 19 25 L 20 25 L 20 24 L 21 24 L 21 23 L 22 23 L 22 22 Z M 26 22 L 29 22 L 29 23 L 30 23 L 30 24 L 31 24 L 31 25 L 32 25 L 32 26 L 33 26 L 33 27 L 34 27 L 34 28 L 36 28 L 36 40 L 34 40 L 34 39 L 33 39 L 33 38 L 32 38 L 32 37 L 31 37 L 31 36 L 30 36 L 30 35 L 29 35 L 29 34 L 27 34 L 27 33 L 26 33 L 26 22 Z"
      />
    </svg>
  )
}

export function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
      <path d="M6 1.2 7.3 4.3l3.4.3-2.6 2.2.8 3.3L6 8.4 3.1 10.1l.8-3.3L1.3 4.6l3.4-.3L6 1.2Z" />
    </svg>
  )
}
