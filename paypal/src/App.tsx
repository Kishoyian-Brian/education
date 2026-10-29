import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react'
import './App.css'
import paypalMark from './assets/paypal-mark.png'
import { FaceIdOverlay } from './components/FaceIdOverlay'
import amexBusinessCashArt from './assets/cardart/amex-business-cash.webp'
import bofaUnlimitedCashArt from './assets/cardart/bofa-unlimited-cash-rewards.webp'
import paypalWordmark from './assets/cardart/paypal-wordmark.png'
import poolGrace from './assets/pool/grace.webp'
import poolRobert from './assets/pool/robert.webp'
import poolSam from './assets/pool/sam.webp'
import recoHeadphones from './assets/reco-headphones.jpg'
import recoOven from './assets/reco-oven.jpg'
import recoReceiver from './assets/reco-receiver.jpg'
import recoShoe from './assets/reco-shoe.jpg'
import sendContacts from './data/send-contacts.json'
import {
  ActivityIcon,
  AddMoneyIcon,
  AmexMark,
  ArrowLeftIcon,
  BankIcon,
  BofaTileLogo,
  BoltFillIcon,
  CameraIcon,
  CheckCircleIcon,
  CardArtLogo,
  CardBrandLogo,
  type CardBrand,
  BankLogo,
  type BankId,
  IssuerLogo,
  PlaidMark,
  type Issuer,
  LinkedCardsIllustration,
  SuccessCheckIcon,
  CardOutlineIcon,
  CloseIcon,
  BathBodyLogo,
  CardChipIcon,
  DollarGeneralLogo,
  EditAmountIcon,
  EmojiIcon,
  FaceIdIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  GearIcon,
  GrammarlyLogo,
  BestBuyLogo,
  HelpCircleIcon,
  HelpIcon,
  KeypadDeleteIcon,
  HomeDepotLogo,
  InfoIcon,
  HomeIcon,
  InviteIcon,
  LogoutIcon,
  MenuIcon,
  MessageIcon,
  MicIcon,
  MoneyLinkIcon,
  MoreVerticalIcon,
  OffersIcon,
  PayPalAppIcon,
  PayPalLogo,
  PerplexityLogo,
  PencilIcon,
  QrCodeIcon,
  SelectedCheckIcon,
  SendRequestIcon,
  ShiftIcon,
  SevenElevenLogo,
  StarIcon,
  SubscriptionsIcon,
  TargetLogo,
  TransferIcon,
  UberLogo,
  UserIcon,
  WalletIcon,
  WalmartLogo,
} from './components/icons'

type Screen = 'home' | 'profile' | 'accounts' | 'activity' | 'send'

const profilePhoto = '/profile-worley.jpg'

const startingBalanceCents = 358955

function formatUsd(cents: number, trimWhole = false) {
  const whole = trimWhole && cents % 100 === 0
  return `$${(cents / 100).toLocaleString('en-US', {
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  })}`
}

function DoorDashMark() {
  return (
    <span className="dash-badge">
      <svg viewBox="0 0 24 24" aria-hidden>
        <path
          fill="#fff"
          d="M23.071 8.409a6.09 6.09 0 0 0-5.396-3.228H.584A.589.589 0 0 0 .17 6.184L3.894 9.93a1.752 1.752 0 0 0 1.242.516h12.049a1.554 1.554 0 1 1 .031 3.108H8.91a.589.589 0 0 0-.415 1.003l3.725 3.747a1.75 1.75 0 0 0 1.242.516h3.757c4.887 0 8.584-5.225 5.852-10.413"
        />
      </svg>
      <span className="dash-plus">+</span>
    </span>
  )
}

const recommendations = [
  {
    brand: 'Sony',
    title: 'WH-1000XM4',
    detail: 'Premium Wireless Headphones',
    price: '$199.99',
    image: recoHeadphones,
    alt: 'Sony WH-1000XM4 headphones',
    position: 'center',
  },
  {
    brand: 'Sony',
    title: 'STR-AN1000 7.2',
    detail: 'Channel 8K A/V Receiver',
    price: '$749.99',
    image: recoReceiver,
    alt: 'Sony STR-AN1000 AV receiver rear panel',
    position: '42% center',
  },
  {
    brand: 'Hamilton Beach',
    title: 'Easy Reach Oven',
    detail: 'Sure-Crisp Air Fryer',
    price: '$79.99',
    image: recoOven,
    alt: 'Hamilton Beach toaster oven',
    position: 'center',
  },
  {
    brand: 'Jordan',
    title: 'Air Jordan 3',
    detail: 'White Cement Retro',
    price: '$209.99',
    image: recoShoe,
    alt: 'Air Jordan 3 White Cement',
    position: 'center 62%',
  },
]

function RecoCard({
  brand,
  title,
  detail,
  price,
  image,
  alt,
  position,
}: (typeof recommendations)[number]) {
  return (
    <article className="reco-card">
      <div className="reco-card__photo">
        <img src={image} alt={alt} style={{ objectPosition: position }} />
      </div>
      <div className="reco-card__body">
        <p className="reco-card__brand">{brand}</p>
        <p className="reco-card__title">{title}</p>
        <p className="reco-card__detail">{detail}</p>
        <p className="reco-card__price">{price}</p>
        <p className="reco-card__back">5% cash back</p>
      </div>
      <div className="reco-card__actions">
        <button type="button" aria-label={`Dismiss ${title}`}>
          <svg viewBox="0 0 24 24" aria-hidden>
            <path d="M7 7l10 10M17 7L7 17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </button>
        <button type="button" aria-label={`Save ${title}`}>
          <svg viewBox="0 0 24 24" aria-hidden>
            <path
              d="M12.1 18.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.42 5.42 5 7.5 5c1.74 0 3.41.81 4.5 2.09C13.09 5.81 14.76 5 16.5 5 18.58 5 20 6.42 20 8.5c0 2.89-3.14 5.74-7.9 10.05z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </article>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      <a href="#">
        See all
        <ChevronRight />
      </a>
    </div>
  )
}

function TilePlus({ className }: { className: string }) {
  return (
    <span className={className} aria-hidden>
      <svg viewBox="0 0 14 14">
        <path d="M7 0.5v13M0.5 7h13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    </span>
  )
}

function ProfileBanner() {
  return (
    <svg className="profile-banner" viewBox="0 0 360 112" preserveAspectRatio="none" aria-hidden>
      <rect width="360" height="112" fill="#0070e0" />
      <path d="M0 78c48-36 92-8 142-22s78-28 128-6 62 8 90-18V0H0Z" fill="#1b8ff2" opacity="0.55" />
      <path d="M210 0c30 28 18 62-8 84s-20 40 8 28 70-6 110 8V0H210Z" fill="#49b0ff" opacity="0.4" />
      <ellipse cx="78" cy="28" rx="70" ry="36" fill="#3aa0ff" opacity="0.28" />
    </svg>
  )
}

type WalletStep =
  | 'add'
  | 'card'
  | 'card-address'
  | 'card-linked'
  | 'bank-pick'
  | 'bank-details'
  | 'bank-linked'
  | 'amex-send'
  | 'amex-linked'

const billingAddresses = [
  { id: 'home', line1: '2215 Lost Creek Rd', line2: 'New Market, TN 37820', note: 'Primary' },
  { id: 'mill', line1: '806 Mill Springs Rd', line2: 'Jefferson City, TN 37760' },
  { id: 'chapman', line1: '4310 Chapman Hwy, Apt 12', line2: 'Knoxville, TN 37920' },
]

const walletOptions: { icon: ReactNode; title: string; detail: string; step?: WalletStep }[] = [
  {
    icon: <BankIcon />,
    title: 'Banks',
    detail: 'Transfer funds you receive to your bank account. Use it to make payments too.',
    step: 'bank-pick',
  },
  {
    icon: <CardOutlineIcon />,
    title: 'Debit and credit cards',
    detail: 'Keep your card info secure when shopping.',
    step: 'card',
  },
  {
    icon: <AmexMark />,
    title: 'Amex Send® Account',
    detail: 'Send money to friends and family in the US without a fee.',
    step: 'amex-send',
  },
]

type CardField = 'number' | 'exp' | 'cvv'

type CardType = {
  brand: CardBrand | null
  label: string
  length: number
  groups: number[]
  cvv: number
}

const fourGroups = [4, 4, 4, 4]

const cardBrands: (CardType & { prefix: RegExp })[] = [
  { brand: 'amex', label: 'American Express', prefix: /^3[47]/, length: 15, groups: [4, 6, 5], cvv: 4 },
  { brand: 'diners', label: 'Diners Club', prefix: /^3(0[0-5]|[689])/, length: 14, groups: [4, 6, 4], cvv: 3 },
  { brand: 'jcb', label: 'JCB', prefix: /^35(2[89]|[3-8])/, length: 16, groups: fourGroups, cvv: 3 },
  { brand: 'visa', label: 'Visa', prefix: /^4/, length: 16, groups: fourGroups, cvv: 3 },
  {
    brand: 'mastercard',
    label: 'Mastercard',
    prefix: /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)/,
    length: 16,
    groups: fourGroups,
    cvv: 3,
  },
  { brand: 'discover', label: 'Discover', prefix: /^(6011|65|64[4-9]|622)/, length: 16, groups: fourGroups, cvv: 3 },
]

const unknownCard: CardType = { brand: null, label: 'Card', length: 16, groups: fourGroups, cvv: 4 }

type BinInfo = { issuer: Issuer; funding: 'Debit' | 'Credit'; product: string; face: string; art?: string }

const binTable: { bin: string; info: BinInfo }[] = [
  { bin: '411111', info: { issuer: 'bofa', funding: 'Debit', product: 'Debit', face: 'bofa-red' } },
  {
    bin: '401288',
    info: {
      issuer: 'bofa',
      funding: 'Credit',
      product: 'Unlimited Cash Rewards',
      face: 'bofa-silver',
      art: bofaUnlimitedCashArt,
    },
  },
  { bin: '424242', info: { issuer: 'chase', funding: 'Credit', product: 'Freedom Unlimited', face: 'chase' } },
  { bin: '555555', info: { issuer: 'wellsfargo', funding: 'Debit', product: 'Debit', face: 'wellsfargo' } },
  {
    bin: '378282',
    info: { issuer: 'amex', funding: 'Credit', product: 'Business Cash', face: 'amex', art: amexBusinessCashArt },
  },
  { bin: '371449', info: { issuer: 'amex', funding: 'Credit', product: 'Blue Cash Preferred', face: 'amex' } },
  { bin: '601111', info: { issuer: 'discover', funding: 'Credit', product: 'Cash Back', face: 'discover' } },
]

function lookupBin(number: string) {
  return binTable
    .filter((entry) => number.startsWith(entry.bin))
    .sort((a, b) => b.bin.length - a.bin.length)[0]?.info
}

function detectCard(number: string): CardType {
  return cardBrands.find((card) => card.prefix.test(number)) ?? unknownCard
}

function isCardComplete(field: CardField, card: Record<CardField, string>) {
  const type = detectCard(card.number)
  if (field === 'number') return type.brand !== null && card.number.length === type.length
  if (field === 'exp') return expiryError(card.exp) === null
  return card.cvv.length === type.cvv
}

function normalizeExpiry(digits: string) {
  let exp = /^[2-9]/.test(digits) ? `0${digits}` : digits
  if (/^(00|1[3-9])/.test(exp)) exp = exp.slice(0, 1)
  return exp.slice(0, 4)
}

function expiryError(exp: string, today = new Date()) {
  if (!exp) return 'Enter the expiration date'
  if (exp.length < 4) return 'Enter a complete expiration date (MM/YY)'
  const month = Number(exp.slice(0, 2))
  const year = 2000 + Number(exp.slice(2))
  const thisYear = today.getFullYear()
  if (year < thisYear || (year === thisYear && month < today.getMonth() + 1)) return 'This card has expired'
  if (year > thisYear + 20) return 'Enter a valid expiration date'
  return null
}

function cardFieldMax(field: CardField, number: string) {
  if (field === 'number') return detectCard(number).length
  return field === 'exp' ? 4 : detectCard(number).cvv
}

function formatCardField(field: CardField, digits: string, number: string) {
  if (field === 'number') {
    const parts: string[] = []
    let start = 0
    for (const size of detectCard(number).groups) {
      if (start >= digits.length) break
      parts.push(digits.slice(start, start + size))
      start += size
    }
    return parts.join(' ')
  }
  if (field === 'exp' && digits.length >= 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return digits
}

type AccountType = 'Checking' | 'Savings'
type BankField = 'routing' | 'account'
type BankForm = { bank: BankId | null; type: AccountType; routing: string; account: string }

const maxLinkedBanks = 8

const banks: { id: BankId; name: string; routing: string[] }[] = [
  { id: 'chase', name: 'Chase', routing: ['021000021', '322271627'] },
  { id: 'bofa', name: 'Bank of America', routing: ['026009593', '121000358', '011000138'] },
  { id: 'wellsfargo', name: 'Wells Fargo', routing: ['121000248'] },
  { id: 'capitalone', name: 'Capital One', routing: ['051405515'] },
  { id: 'chime', name: 'Chime', routing: ['031101279', '103100195'] },
  { id: 'navyfederal', name: 'Navy Federal Credit Union', routing: ['256074974'] },
  { id: 'td', name: 'TD Bank', routing: ['031201360'] },
  { id: 'truist', name: 'Truist', routing: ['061000104'] },
  { id: 'pnc', name: 'PNC', routing: ['043000096'] },
  { id: 'huntington', name: 'Huntington', routing: ['044000024'] },
  { id: 'citi', name: 'Citi', routing: ['021000089', '322271724'] },
  { id: 'fifththird', name: 'Fifth Third', routing: ['042000314'] },
  { id: 'regions', name: 'Regions', routing: ['062000019'] },
  { id: 'usaa', name: 'USAA', routing: ['314074269'] },
  { id: 'usbank', name: 'U.S. Bank', routing: ['091000022'] },
]

function bankName(id: BankId | null) {
  return banks.find((bank) => bank.id === id)?.name ?? 'Bank account'
}

function routingError(routing: string, bank: BankId | null) {
  if (!routing) return 'Enter the routing number'
  if (routing.length < 9) return 'Routing numbers are 9 digits'
  const d = [...routing].map(Number)
  if ((3 * (d[0] + d[3] + d[6]) + 7 * (d[1] + d[4] + d[7]) + d[2] + d[5] + d[8]) % 10 !== 0)
    return 'Enter a valid routing number'
  const owner = banks.find((entry) => entry.routing.includes(routing))
  if (bank && owner && owner.id !== bank) return `This routing number belongs to ${owner.name}`
  return null
}

function accountError(account: string) {
  if (!account) return 'Enter the account number'
  if (account.length < 4) return 'Account numbers are 4 to 17 digits'
  return null
}

const keypadKeys = [
  ['1', ''],
  ['2', 'ABC'],
  ['3', 'DEF'],
  ['4', 'GHI'],
  ['5', 'JKL'],
  ['6', 'MNO'],
  ['7', 'PQRS'],
  ['8', 'TUV'],
  ['9', 'WXYZ'],
]

function typeAmountKey(value: string, key: string) {
  if (key === '.') return value.includes('.') ? value : `${value || '0'}.`
  const [whole, fraction] = value.split('.')
  if (fraction !== undefined) return fraction.length < 2 ? value + key : value
  return whole.length < 5 ? `${whole}${key}`.replace(/^0+(?=\d)/, '') : value
}

function parseAmountDraft(value: string) {
  const next = Math.round(Number(value) * 100)
  return value !== '' && Number.isFinite(next) && next > 0 ? next : null
}

function formatGroupedAmount(value: string) {
  if (value === '') return ''
  const [whole, fraction] = value.split('.')
  const formatted = Number(whole || '0').toLocaleString('en-US')
  return fraction === undefined ? formatted : `${formatted}.${fraction}`
}

function formatAmountDraft(value: string) {
  return value === '' ? '$' : `$${formatGroupedAmount(value)}`
}

function NumberPad({
  onDigit,
  onDelete,
  onDot,
}: {
  onDigit: (digit: string) => void
  onDelete: () => void
  onDot?: () => void
}) {
  return (
    <div
      className="keypad"
      onPointerDown={(e) => e.preventDefault()}
      onMouseDown={(e) => e.preventDefault()}
    >
      {keypadKeys.map(([digit, letters]) => (
        <button key={digit} type="button" tabIndex={-1} className="keypad__key" onClick={() => onDigit(digit)}>
          <span className="keypad__digit">{digit}</span>
          <span className="keypad__letters">{letters}</span>
        </button>
      ))}
      {onDot ? (
        <button type="button" tabIndex={-1} className="keypad__key keypad__key--dot" aria-label="Decimal point" onClick={onDot}>
          <span className="keypad__digit">.</span>
        </button>
      ) : (
        <span aria-hidden />
      )}
      <button type="button" tabIndex={-1} className="keypad__key keypad__key--zero" onClick={() => onDigit('0')}>
        <span className="keypad__digit">0</span>
      </button>
      <button type="button" tabIndex={-1} className="keypad__key keypad__key--delete" aria-label="Delete" onClick={onDelete}>
        <KeypadDeleteIcon />
      </button>
    </div>
  )
}

type LinkedAccount =
  | { kind: 'card'; brand: CardBrand; label: string; last4: string; exp: string; bin?: BinInfo; debit?: boolean }
  | { kind: 'bank'; bank: BankId | null; type: AccountType; routing: string; last4: string; nickname?: string }
  | { kind: 'amex-send' }

function accountKey(account: LinkedAccount) {
  if (account.kind === 'card') return `card-${account.brand}-${account.last4}-${account.exp}`
  if (account.kind === 'bank') return `bank-${account.routing}-${account.last4}`
  return 'amex-send'
}

const defaultLinkedAccounts: LinkedAccount[] = [
  { kind: 'bank', bank: 'bofa', type: 'Checking', routing: '026009593', last4: '4417', nickname: 'Personal BoA' },
  { kind: 'bank', bank: 'bofa', type: 'Checking', routing: '026009593', last4: '8203' },
  { kind: 'card', brand: 'visa', label: 'Visa', last4: '1881', exp: '08/29', bin: lookupBin('401288') },
  { kind: 'card', brand: 'amex', label: 'American Express', last4: '1002', exp: '11/30', bin: lookupBin('378282') },
]

type AddSource = Extract<LinkedAccount, { kind: 'card' | 'bank' }>

type AddMoneyTransfer = {
  id: string
  cents: number
  method: 'debit' | 'credit' | 'bank'
  source: string
  activityTitle: string
  createdAt: number
  availableAt: number
}

const addMoneyStorageKey = 'paypal-clone:add-money'
const sentStorageKey = 'paypal-clone:sent'
const syncedAtStorageKey = 'paypal-clone:synced-at'
const pullTrigger = 70
const pullHold = 56
const addMoneyPresets = [5000, 7500, 10000, 12500]
const bankInstantCents = 500000
const chaseInstantCents = 1000000
const dayMs = 24 * 60 * 60 * 1000
const debitAddLimits = [
  { days: 1, cents: 500000, period: 'day' },
  { days: 7, cents: 1000000, period: 'week' },
  { days: 30, cents: 2000000, period: 'month' },
]

function isFundableAccount(account: LinkedAccount): account is AddSource {
  return account.kind === 'bank' || account.kind === 'card'
}

function isInstantCard(account: Extract<LinkedAccount, { kind: 'card' }>) {
  if (account.debit) return true
  return account.bin?.funding === 'Debit' && (account.brand === 'visa' || account.brand === 'mastercard')
}

function cardFundingLabel(account: Extract<LinkedAccount, { kind: 'card' }>) {
  if (account.debit || account.bin?.funding === 'Debit') return 'Debit'
  if (account.bin?.funding === 'Credit') return 'Credit'
  return 'Card'
}

function addSourceTitle(source: AddSource) {
  if (source.kind === 'card') return `${source.label} ${cardFundingLabel(source)}`
  return source.nickname ?? bankName(source.bank)
}

function addSourceName(source: AddSource) {
  return source.kind === 'card' ? `${addSourceTitle(source)} ••${source.last4}` : `${addSourceTitle(source)} ${source.type} ••${source.last4}`
}

function instantLimit(source: AddSource, debitLeft: number) {
  if (source.kind === 'card') return Math.max(debitLeft, 0)
  return source.bank === 'chase' ? chaseInstantCents : bankInstantCents
}

function addBusinessDays(from: number, days: number) {
  const date = new Date(from)
  let left = days
  while (left > 0) {
    date.setDate(date.getDate() + 1)
    if (date.getDay() !== 0 && date.getDay() !== 6) left -= 1
  }
  return date.getTime()
}

function debitLimitError(cents: number, transfers: AddMoneyTransfer[], now: number) {
  for (const limit of debitAddLimits) {
    const used = transfers
      .filter((transfer) => transfer.method === 'debit' && now - transfer.createdAt < limit.days * dayMs)
      .reduce((sum, transfer) => sum + transfer.cents, 0)
    if (used + cents > limit.cents) {
      return `You can add up to ${formatUsd(limit.cents, true)} a ${limit.period} with a debit card. You have ${formatUsd(Math.max(limit.cents - used, 0), true)} left.`
    }
  }
  return null
}

function loadAddMoneyTransfers(): AddMoneyTransfer[] {
  try {
    const saved = JSON.parse(localStorage.getItem(addMoneyStorageKey) ?? '[]')
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

function loadSentPayments(): SentPayment[] {
  try {
    const saved = JSON.parse(localStorage.getItem(sentStorageKey) ?? '[]')
    if (!Array.isArray(saved)) return []
    return saved.flatMap((entry) => {
      if (!entry || typeof entry.name !== 'string' || typeof entry.cents !== 'number' || typeof entry.createdAt !== 'number')
        return []
      const payment: SentPayment = {
        id: typeof entry.id === 'number' ? entry.id : entry.createdAt,
        name: entry.name,
        photo: typeof entry.photo === 'string' ? entry.photo : undefined,
        initials: typeof entry.initials === 'string' ? entry.initials : '',
        cents: entry.cents,
        feeCents: typeof entry.feeCents === 'number' ? entry.feeCents : 0,
        note: typeof entry.note === 'string' ? entry.note : '',
        type: entry.type === 'goods' ? 'goods' : 'friends',
        sourceId: typeof entry.sourceId === 'string' ? entry.sourceId : null,
        createdAt: entry.createdAt,
      }
      return [payment]
    })
  } catch {
    return []
  }
}

function loadSyncedAt() {
  const saved = Number(localStorage.getItem(syncedAtStorageKey))
  return Number.isFinite(saved) && saved > 0 ? saved : Date.now()
}

function formatActivityDate(time: number) {
  return new Date(time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatTransferStamp(time: number) {
  const date = new Date(time)
  const clock = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${date.toLocaleDateString('en-US', { month: 'short' })} ${date.getDate()}, ${clock}`
}

function transactionCode(seed: string) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let hash = 2166136261
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  let code = ''
  for (let i = 0; i < 15; i += 1) {
    hash = Math.imul(hash ^ (hash >>> 13), 16777619)
    code += alphabet[Math.abs(hash) % alphabet.length]
  }
  return code
}

function debitCardParts(title: string) {
  const [name, last4 = ''] = title.split('••••')
  return { name: name.trim() || 'Debit Card', last4: last4.trim() }
}

function formatActivityMonth(time: number) {
  return new Date(time).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

type DigitKey = CardField | BankField

function DigitField({
  label,
  placeholder = label,
  value,
  active,
  invalid,
  errorId,
  className,
  before,
  after,
  fieldRef,
  onFocus,
  onBlur,
  onDigit,
  onDelete,
}: {
  label: string
  placeholder?: string
  value: string
  active: boolean
  invalid: boolean
  errorId: string
  className: string
  before?: ReactNode
  after?: ReactNode
  fieldRef: (node: HTMLDivElement | null) => void
  onFocus: () => void
  onBlur: () => void
  onDigit: (digit: string) => void
  onDelete: () => void
}) {
  const caret = active && <span className="card-form__caret" />
  return (
    <div
      ref={fieldRef}
      role="textbox"
      tabIndex={0}
      aria-label={label}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid ? errorId : undefined}
      className={invalid ? `${className} card-form__field--error` : className}
      onMouseDown={(e) => {
        e.preventDefault()
        e.currentTarget.focus()
      }}
      onFocus={onFocus}
      onBlur={(e) => {
        const next = e.relatedTarget
        if (next instanceof Element && next.closest('.keypad')) return
        onBlur()
      }}
      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
        if (/^\d$/.test(e.key)) onDigit(e.key)
        else if (e.key === 'Backspace') onDelete()
        else return
        e.preventDefault()
      }}
    >
      {before}
      <span className="card-form__value">
        {value ? (
          <>
            {value}
            {caret}
          </>
        ) : (
          <>
            {caret}
            <span className="card-form__placeholder">{placeholder}</span>
          </>
        )}
      </span>
      {after}
    </div>
  )
}

function FieldError({ id, message }: { id: string; message: string | null }) {
  if (!message) return null
  return (
    <p id={id} className="card-form__error" role="alert">
      {message}
    </p>
  )
}

function SheetHead({ title, onBack, onClose }: { title: string; onBack: () => void; onClose: () => void }) {
  return (
    <div className="card-form__head">
      <button type="button" className="card-form__back" aria-label="Back" onClick={onBack}>
        <ArrowLeftIcon />
      </button>
      <h2 id="wallet-sheet-title">{title}</h2>
      <button type="button" className="card-form__close" aria-label="Close" onClick={onClose}>
        <CloseIcon />
      </button>
    </div>
  )
}

function PlaidHead({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <>
      <div className="plaid__head">
        <button type="button" className="plaid__back" aria-label="Back" onClick={onBack}>
          <ArrowLeftIcon />
        </button>
        <PlaidMark />
      </div>
      <h2 id="wallet-sheet-title" className="plaid__title">
        {title}
      </h2>
    </>
  )
}

function LinkedSuccess({
  title,
  detail,
  note,
  anotherLabel,
  onAnother,
  onClose,
}: {
  title: string
  detail: string
  note?: string
  anotherLabel?: string
  onAnother?: () => void
  onClose: () => void
}) {
  return (
    <div className="card-linked">
      <button type="button" className="card-linked__close" aria-label="Close" onClick={onClose}>
        <CloseIcon />
      </button>
      <h2 id="wallet-sheet-title" className="card-linked__title">
        <SuccessCheckIcon />
        {title}
      </h2>
      <p className="card-linked__card">{detail}</p>
      {note && <p className="card-linked__note">{note}</p>}
      <LinkedCardsIllustration />
      {onAnother ? (
        <>
          <button type="button" className="card-linked__another" onClick={onAnother}>
            {anotherLabel}
          </button>
          <button type="button" className="card-linked__done" onClick={onClose}>
            All done for now
          </button>
        </>
      ) : (
        <button type="button" className="card-linked__another card-linked__another--last" onClick={onClose}>
          Done
        </button>
      )}
    </div>
  )
}

const emptyBankForm: BankForm = { bank: null, type: 'Checking', routing: '', account: '' }

type FaceIdPhase = 'prompt' | 'scan' | 'done' | 'closing' | 'cancelled'

function FaceIdPrompt({
  phase,
  onUsePasskey,
  onCancel,
  onFaceId,
}: {
  phase: FaceIdPhase
  onUsePasskey: () => void
  onCancel: () => void
  onFaceId: () => void
}) {
  const [scanned, setScanned] = useState(false)
  if (phase === 'scan' && !scanned) setScanned(true)
  const verified = phase === 'done' || phase === 'closing'
  const leaving = phase === 'closing' || phase === 'cancelled'

  useEffect(() => {
    if (phase === 'scan') onFaceId()
  }, [phase, onFaceId])

  return (
    <div
      className={['faceid', verified && 'faceid--verified', leaving && 'faceid--leaving'].filter(Boolean).join(' ')}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="faceid__sheet" role="dialog" aria-modal="true" aria-labelledby="faceid-title">
        <button type="button" className="faceid__close" aria-label="Cancel" onClick={onCancel}>
          <CloseIcon />
        </button>
        <div className="faceid__icon">
          <FaceIdIcon />
          <span className="faceid__badge">
            <PayPalAppIcon />
          </span>
        </div>
        <h2 id="faceid-title">Sign In</h2>
        <p>Worley Clifton</p>
        {phase === 'prompt' || (phase === 'cancelled' && !scanned) ? (
          <button type="button" className="faceid__passkey" onClick={onUsePasskey}>
            Use Passkey
          </button>
        ) : (
          <div className="faceid__status">
            {verified ? (
              <span className="faceid__check">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path pathLength={1} d="M6.5 12.6 10.3 16.4 17.6 8.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            ) : (
              <span className="faceid__scan">
                <FaceIdIcon />
              </span>
            )}
            <small>{verified ? 'Done' : 'Face ID'}</small>
          </div>
        )}
      </div>
    </div>
  )
}

function WalletSheet({
  initialStep = 'add',
  bankCount,
  amexSendLinked,
  debitCards = false,
  onClose,
  onLinked,
  onFaceId,
}: {
  initialStep?: WalletStep
  bankCount: number
  amexSendLinked: boolean
  debitCards?: boolean
  onClose: () => void
  onLinked: (account: LinkedAccount) => void
  onFaceId: () => void
}) {
  const [step, setStep] = useState<WalletStep>(initialStep)
  const [card, setCard] = useState<Record<CardField, string>>({ number: '', exp: '', cvv: '' })
  const [bank, setBank] = useState<BankForm>(emptyBankForm)
  const [query, setQuery] = useState('')
  const [activeField, setActiveField] = useState<DigitKey | null>(null)
  const [checked, setChecked] = useState<Partial<Record<DigitKey, boolean>>>({})
  const [bankLimitHit, setBankLimitHit] = useState(false)
  const [faceId, setFaceId] = useState<FaceIdPhase | null>(null)
  const [addressId, setAddressId] = useState(billingAddresses[0].id)
  const address = billingAddresses.find((entry) => entry.id === addressId) ?? billingAddresses[0]
  const fieldRefs = useRef<Partial<Record<DigitKey, HTMLDivElement | null>>>({})
  const faceIdTimers = useRef<number[]>([])

  useEffect(() => {
    const timers = faceIdTimers.current
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [])

  const cardType = detectCard(card.number)
  const expError = expiryError(card.exp)
  const showExpError = expError !== null && (card.exp.length === 4 || !!checked.exp)
  const bankErrors: Record<BankField, string | null> = {
    routing: routingError(bank.routing, bank.bank),
    account: accountError(bank.account),
  }
  const showBankError = (field: BankField) =>
    field === 'routing'
      ? bankErrors.routing !== null && (bank.routing.length === 9 || !!checked.routing)
      : bankErrors.account !== null && !!checked.account
  const matchingBanks = banks.filter((entry) => entry.name.toLowerCase().includes(query.trim().toLowerCase()))
  const keypadStep = step === 'card' || step === 'bank-details'
  const plaidStep = step === 'bank-pick' || step === 'bank-details'

  function valueOf(key: DigitKey) {
    return key === 'routing' || key === 'account' ? bank[key] : card[key]
  }

  function changeDigit(key: DigitKey, edit: 'add' | 'del', digit = '') {
    setChecked((current) => ({ ...current, [key]: false }))
    if (key === 'routing' || key === 'account') {
      setBankLimitHit(false)
      setBank((current) => {
        const raw = edit === 'del' ? current[key].slice(0, -1) : current[key] + digit
        return { ...current, [key]: raw.replace(/\D/g, '').slice(0, key === 'routing' ? 9 : 17) }
      })
      return
    }
    setCard((current) => {
      const raw = edit === 'del' ? current[key].slice(0, -1) : current[key] + digit
      const digits = raw.replace(/\D/g, '')
      const number = key === 'number' ? digits.slice(0, cardFieldMax('number', digits)) : current.number
      const next = { ...current, number }
      if (key === 'exp') next.exp = normalizeExpiry(digits)
      else if (key === 'cvv') next.cvv = digits
      next.cvv = next.cvv.slice(0, cardFieldMax('cvv', next.number))
      return next
    })
  }

  function digitField(key: DigitKey, label: string, className: string, extra: Partial<Parameters<typeof DigitField>[0]> = {}) {
    return (
      <DigitField
        label={label}
        value={key === 'routing' || key === 'account' ? bank[key] : formatCardField(key, card[key], card.number)}
        active={activeField === key}
        invalid={false}
        errorId={`${key}-error`}
        className={className}
        fieldRef={(node) => {
          fieldRefs.current[key] = node
        }}
        onFocus={() => setActiveField(key)}
        onBlur={() => {
          setActiveField(null)
          if (valueOf(key)) setChecked((current) => ({ ...current, [key]: true }))
        }}
        onDigit={(digit) => changeDigit(key, 'add', digit)}
        onDelete={() => changeDigit(key, 'del')}
        {...extra}
      />
    )
  }

  function linkCard() {
    if (faceId) return
    setChecked((current) => ({ ...current, exp: true }))
    const missing = (['number', 'exp', 'cvv'] as const).find((field) => !isCardComplete(field, card))
    if (missing || !cardType.brand) {
      fieldRefs.current[missing ?? 'number']?.focus()
      return
    }
    setActiveField(null)
    setFaceId('prompt')
  }

  function startPasskey() {
    if (faceId !== 'prompt' || !cardType.brand) return
    const lookedUp = lookupBin(card.number)
    const account: LinkedAccount = {
      kind: 'card',
      brand: cardType.brand,
      label: cardType.label,
      last4: card.number.slice(-4),
      exp: formatCardField('exp', card.exp, card.number),
      bin: lookedUp,
      debit: debitCards || lookedUp?.funding === 'Debit',
    }
    setFaceId('scan')
    faceIdTimers.current.push(
      window.setTimeout(() => setFaceId('done'), 2000),
      window.setTimeout(() => setFaceId('closing'), 3600),
      window.setTimeout(() => {
        faceIdTimers.current.length = 0
        setFaceId(null)
        onLinked(account)
        setStep('card-linked')
      }, 4000),
    )
  }

  function cancelFaceId() {
    if (faceId !== 'prompt' && faceId !== 'scan') return
    faceIdTimers.current.forEach((id) => window.clearTimeout(id))
    faceIdTimers.current.length = 0
    setFaceId('cancelled')
    faceIdTimers.current.push(
      window.setTimeout(() => {
        faceIdTimers.current.length = 0
        setFaceId(null)
      }, 400),
    )
  }

  function chooseBank(id: BankId | null) {
    setBank({ ...emptyBankForm, bank: id })
    setChecked({})
    setBankLimitHit(false)
    setStep('bank-details')
  }

  function linkBank() {
    setChecked((current) => ({ ...current, routing: true, account: true }))
    const missing = (['routing', 'account'] as const).find((field) => bankErrors[field] !== null)
    if (missing) {
      fieldRefs.current[missing]?.focus()
      return
    }
    if (bankCount >= maxLinkedBanks) {
      setBankLimitHit(true)
      return
    }
    const owner = banks.find((entry) => entry.routing.includes(bank.routing))?.id ?? null
    const linkedBank = bank.bank ?? owner
    setBank((current) => ({ ...current, bank: linkedBank }))
    onLinked({ kind: 'bank', bank: linkedBank, type: bank.type, routing: bank.routing, last4: bank.account.slice(-4) })
    setActiveField(null)
    setStep('bank-linked')
  }

  function linkAmexSend() {
    onLinked({ kind: 'amex-send' })
    setStep('amex-linked')
  }

  return (
    <div className="sheet-backdrop sheet-backdrop--front" onClick={onClose}>
      <div
        className={plaidStep ? 'plaid' : activeField && keypadStep ? 'sheet sheet--keypad' : 'sheet'}
        role="dialog"
        aria-modal="true"
        aria-labelledby="wallet-sheet-title"
        onClick={(e) => e.stopPropagation()}
      >
        {step === 'add' && (
          <>
            <div className="sheet__head">
              <h2 id="wallet-sheet-title">Add to Wallet</h2>
              <button type="button" className="sheet__close" aria-label="Close" onClick={onClose}>
                <CloseIcon />
              </button>
            </div>
            <div className="sheet__list">
              {walletOptions.map((option) => (
                <button
                  key={option.title}
                  type="button"
                  className="sheet-option"
                  onClick={() => option.step && setStep(option.step)}
                >
                  <span className="sheet-option__icon">{option.icon}</span>
                  <span className="sheet-option__text">
                    <strong>{option.title}</strong>
                    <small>{option.detail}</small>
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 'card' && (
          <form
            className="card-form"
            onSubmit={(e) => {
              e.preventDefault()
              linkCard()
            }}
          >
            <SheetHead title="Link a card" onBack={() => setStep('add')} onClose={onClose} />
            <button type="button" className="card-form__scan">
              <CameraIcon />
              Scan
            </button>
            {digitField('number', 'Card number', 'card-form__field card-form__field--number', {
              before: cardType.brand ? <CardBrandLogo brand={cardType.brand} /> : <CardOutlineIcon />,
            })}
            <div className="card-form__row">
              {digitField('exp', 'Expiration', 'card-form__field', {
                placeholder: activeField === 'exp' ? 'MM/YY' : 'Expiration',
                invalid: showExpError,
              })}
              {digitField('cvv', 'CVV', 'card-form__field', {
                after: (
                  <span className="card-form__help" aria-hidden>
                    <HelpCircleIcon />
                  </span>
                ),
              })}
            </div>
            <FieldError id="exp-error" message={showExpError ? expError : null} />
            <div className="card-form__billing">
              <span className="card-form__billing-text">
                <span>Billing address</span>
                <strong>
                  {address.line1}, {address.line2}
                </strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  setActiveField(null)
                  setStep('card-address')
                }}
              >
                Change
              </button>
            </div>
            <button type="submit" className="card-form__submit">
              Link Card
            </button>
          </form>
        )}

        {step === 'card-address' && (
          <div className="card-address">
            <SheetHead title="Billing address" onBack={() => setStep('card')} onClose={onClose} />
            <div className="card-address__list" role="radiogroup" aria-label="Billing address">
              {billingAddresses.map((entry) => {
                const on = entry.id === addressId
                return (
                  <button
                    key={entry.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    className="add-source"
                    onClick={() => {
                      setAddressId(entry.id)
                      setStep('card')
                    }}
                  >
                    <span className="add-source__text">
                      <strong>{entry.line1}</strong>
                      <span>{entry.line2}</span>
                      {entry.note && <small>{entry.note}</small>}
                    </span>
                    <span className={on ? 'add-source__radio add-source__radio--on' : 'add-source__radio'} />
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {step === 'card-linked' && (
          <LinkedSuccess
            title="You linked your card"
            detail={[cardType.label, lookupBin(card.number)?.funding, `••${card.number.slice(-4)}`]
              .filter(Boolean)
              .join(' ')}
            anotherLabel="Add Another Card"
            onAnother={() => {
              setCard({ number: '', exp: '', cvv: '' })
              setChecked({})
              setStep('card')
            }}
            onClose={onClose}
          />
        )}

        {step === 'bank-pick' && (
          <div className="bank-pick">
            <PlaidHead title="Choose your bank" onBack={() => setStep('add')} />
            <label className="bank-pick__search">
              <svg viewBox="0 0 20 20" aria-hidden>
                <circle cx="8.6" cy="8.6" r="6" fill="none" stroke="currentColor" strokeWidth="1.9" />
                <path d="M13.1 13.1 18 18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                placeholder="Search for 4K+ institutions"
                aria-label="Search for your bank"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            {matchingBanks.length > 0 ? (
              <div className="bank-pick__grid">
                {matchingBanks.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    className={`bank-pick__tile bank-pick__tile--${entry.id}`}
                    onClick={() => chooseBank(entry.id)}
                  >
                    <BankLogo bank={entry.id} onColor />
                  </button>
                ))}
              </div>
            ) : (
              <p className="bank-pick__empty">No banks match “{query.trim()}”</p>
            )}
            <button type="button" className="bank-pick__other" onClick={() => chooseBank(null)}>
              Don’t see your bank? Link it another way
            </button>
          </div>
        )}

        {step === 'bank-details' && (
          <form
            className="card-form bank-form"
            onSubmit={(e) => {
              e.preventDefault()
              linkBank()
            }}
          >
            <PlaidHead title="Enter your account details" onBack={() => setStep('bank-pick')} />
            {bank.bank ? (
              <div className={`bank-pick__tile bank-pick__tile--${bank.bank} bank-form__bank`}>
                <BankLogo bank={bank.bank} onColor />
              </div>
            ) : (
              <div className="bank-form__bank bank-form__bank--manual">
                <BankIcon />
                <span>Use the routing and account numbers from your checks or bank statement.</span>
              </div>
            )}
            <div className="bank-form__types" role="radiogroup" aria-label="Account type">
              {(['Checking', 'Savings'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  role="radio"
                  aria-checked={bank.type === type}
                  className={bank.type === type ? 'bank-form__type bank-form__type--active' : 'bank-form__type'}
                  onClick={() => setBank((current) => ({ ...current, type }))}
                >
                  {type}
                </button>
              ))}
            </div>
            {digitField('routing', 'Routing number', 'card-form__field bank-form__field', {
              invalid: showBankError('routing'),
            })}
            <FieldError id="routing-error" message={showBankError('routing') ? bankErrors.routing : null} />
            {digitField('account', 'Account number', 'card-form__field bank-form__field', {
              invalid: showBankError('account'),
            })}
            <FieldError id="account-error" message={showBankError('account') ? bankErrors.account : null} />
            <FieldError
              id="bank-limit-error"
              message={bankLimitHit ? `You can link up to ${maxLinkedBanks} banks. Remove one to add another.` : null}
            />
            <p className="bank-form__note">
              We’ll send 2 small deposits to this account within 3 business days. Enter the amounts in your Wallet to
              confirm it.
            </p>
            <button type="submit" className="card-form__submit bank-form__submit">
              Agree and Link
            </button>
          </form>
        )}

        {step === 'bank-linked' && (
          <LinkedSuccess
            title="You linked your bank"
            detail={`${bankName(bank.bank)} ${bank.type} ••${bank.account.slice(-4)}`}
            note="Confirm it with the 2 small deposits we’ll send within 3 business days."
            anotherLabel="Link Another Bank"
            onAnother={() => {
              setQuery('')
              setStep('bank-pick')
            }}
            onClose={onClose}
          />
        )}

        {step === 'amex-send' && (
          <div className="amex-send">
            <SheetHead title="Amex Send® Account" onBack={() => setStep('add')} onClose={onClose} />
            <div className="amex-send__hero">
              <AmexMark size={60} color="#016FD0" />
            </div>
            <h3 className="amex-send__title">Send money with your Amex® Card</h3>
            <ul className="amex-send__points">
              <li>No fee to send money to friends and family in the US.</li>
              <li>Add money to your Send Account from an eligible Card in the Amex® App.</li>
              <li>Recipients get the money right away.</li>
            </ul>
            <p className="amex-send__note">
              Requires an eligible US-issued American Express® Card. Send Account issued by American Express National
              Bank, Member FDIC.
            </p>
            <button
              type="button"
              className="card-form__submit amex-send__submit"
              disabled={amexSendLinked}
              onClick={linkAmexSend}
            >
              {amexSendLinked ? 'Already linked' : 'Link Amex Send Account'}
            </button>
          </div>
        )}

        {step === 'amex-linked' && (
          <LinkedSuccess
            title="You linked your account"
            detail="Amex Send® Account"
            note="Add money in the Amex® App, then choose Amex Send Account when you send."
            onClose={onClose}
          />
        )}

        {keypadStep && activeField && (
          <NumberPad
            onDigit={(digit) => changeDigit(activeField, 'add', digit)}
            onDelete={() => changeDigit(activeField, 'del')}
          />
        )}
      </div>
      {faceId && (
        <FaceIdPrompt phase={faceId} onUsePasskey={startPasskey} onCancel={cancelFaceId} onFaceId={onFaceId} />
      )}
    </div>
  )
}

type AddMoneyStep = 'amount' | 'source' | 'adding' | 'done'

function AddSourceLogo({ source }: { source: AddSource }) {
  if (source.kind === 'card')
    return (
      <span className="add-source__icon add-source__icon--card">
        <CardBrandLogo brand={source.brand} />
      </span>
    )
  if (source.bank === 'bofa')
    return (
      <span className="add-source__tile">
        <BofaTileLogo />
      </span>
    )
  return (
    <span className="add-source__icon">
      <BankIcon />
    </span>
  )
}

function AddSourceRow({ source, note }: { source: AddSource; note?: string }) {
  return (
    <>
      <AddSourceLogo source={source} />
      <span className="add-source__text">
        <strong>{addSourceTitle(source)}</strong>
        <span>{source.kind === 'card' ? `••••${source.last4}` : `${source.type} ••••${source.last4}`}</span>
        {note && <small>{note}</small>}
      </span>
    </>
  )
}

function MastercardMark() {
  return (
    <svg viewBox="0 0 44 28" aria-hidden>
      <circle cx="16" cy="14" r="12" fill="#eb001b" />
      <circle cx="28" cy="14" r="12" fill="#f79e1b" />
      <path d="M22 5.1a12 12 0 0 1 0 17.8 12 12 0 0 1 0-17.8Z" fill="#ff5f00" />
    </svg>
  )
}

function PayPalDebitMini() {
  return (
    <span className="pp-balance__debit" aria-hidden>
      <img src={paypalWordmark} alt="" />
      <MastercardMark />
    </span>
  )
}

const paypalBalanceAccount = '82103849'
const paypalBalanceRouting = '012345678'
const paypalDebitLast4 = '5523'
const paypalDebitNumber = '4532118822905523'

function formatGroupedDigits(value: string, size: number) {
  return value.replace(new RegExp(`(\\d{${size}})(?=\\d)`, 'g'), '$1 ').trim()
}

function PayPalBalancePage({
  balance,
  onBack,
  onAddMoney,
}: {
  balance: string
  onBack: () => void
  onAddMoney: () => void
}) {
  const [showAccount, setShowAccount] = useState(false)
  const [copied, setCopied] = useState<'account' | 'routing' | null>(null)
  const [cardOpen, setCardOpen] = useState(false)

  function copyValue(kind: 'account' | 'routing', value: string) {
    const markCopied = () => {
      setCopied(kind)
      window.setTimeout(() => setCopied((current) => (current === kind ? null : current)), 1500)
    }
    const fallback = () => {
      const area = document.createElement('textarea')
      area.value = value
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      area.remove()
    }
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(value).then(markCopied, () => {
        fallback()
        markCopied()
      })
      return
    }
    fallback()
    markCopied()
  }

  return (
    <div className="pp-balance" role="dialog" aria-modal="true" aria-labelledby="pp-balance-title">
      <div className="pp-balance__head">
        <button type="button" aria-label="Back" onClick={onBack}>
          <ArrowLeftIcon />
        </button>
        <h1 id="pp-balance-title">PayPal balance</h1>
      </div>
      <div className="pp-balance__scroll">
        <section className="pp-balance__card">
          <p className="pp-balance__label">Total PayPal balance</p>
          <p className="pp-balance__amount">{balance}</p>
          <button type="button" className="pp-balance__add" onClick={onAddMoney}>
            Add Money
          </button>
          <div className="pp-balance__number">
            <div>
              <p>Account number</p>
              <p className="pp-balance__digits">
                {showAccount ? formatGroupedDigits(paypalBalanceAccount, 4) : `•••• ${paypalBalanceAccount.slice(-4)}`}
                <button
                  type="button"
                  className="pp-balance__eye"
                  aria-label={showAccount ? 'Hide account number' : 'Show account number'}
                  onClick={() => setShowAccount((open) => !open)}
                >
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path
                      d="M2.8 12S6.2 6.5 12 6.5 21.2 12 21.2 12 17.8 17.5 12 17.5 2.8 12 2.8 12Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <circle cx="12" cy="12" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    {showAccount ? null : (
                      <path d="M5 19 19 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    )}
                  </svg>
                </button>
              </p>
            </div>
            <button type="button" className="pp-balance__copy" onClick={() => copyValue('account', paypalBalanceAccount)}>
              {copied === 'account' ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="pp-balance__number">
            <div>
              <p>Routing number</p>
              <p className="pp-balance__digits">{formatGroupedDigits(paypalBalanceRouting, 3)}</p>
            </div>
            <button type="button" className="pp-balance__copy" onClick={() => copyValue('routing', paypalBalanceRouting)}>
              {copied === 'routing' ? 'Copied' : 'Copy'}
            </button>
          </div>
          <button type="button" className="pp-balance__direct">
            Direct Deposit
          </button>
        </section>

        <button type="button" className="pp-balance__reload">
          <span className="pp-balance__reload-icon" aria-hidden>
            <svg viewBox="0 0 24 24">
              <path
                d="M19.5 12a7.5 7.5 0 0 1-12.6 5.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path d="M6.2 16.2H4.2v2.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M4.5 12A7.5 7.5 0 0 1 17.1 6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path d="M17.8 7.8h2v-2.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span>
            <strong>Manage auto reload</strong>
            <small>Add $200 when balance is low</small>
          </span>
        </button>

        <h2>Your card</h2>
        <button type="button" className="pp-balance__card pp-balance__yours" onClick={() => setCardOpen(true)}>
          <PayPalDebitMini />
          <span>
            <strong>Debit Card ••{paypalDebitLast4}</strong>
            <small>
              <span className="pp-balance__cash">+5%</span>
              cash back on clothing
            </small>
          </span>
        </button>

        <h2>More options</h2>
        <div className="pp-balance__options">
          <button type="button">
            <strong>Transfer money</strong>
            <small>From your balance</small>
          </button>
          <button type="button">
            <strong>Set up Direct Deposit</strong>
            <small>Get paid up to 2 days early</small>
          </button>
          <button type="button">
            <strong>Add cash</strong>
            <small>At a store</small>
          </button>
        </div>
      </div>
      {cardOpen && <PayPalDebitPage balance={balance} onBack={() => setCardOpen(false)} />}
    </div>
  )
}

function PayPalDebitPage({ balance, onBack }: { balance: string; onBack: () => void }) {
  const [showNumber, setShowNumber] = useState(false)
  const [locked, setLocked] = useState(false)

  return (
    <div className="pp-debit" role="dialog" aria-modal="true" aria-labelledby="pp-debit-title">
      <div className="pp-balance__head">
        <button type="button" aria-label="Back" onClick={onBack}>
          <ArrowLeftIcon />
        </button>
        <h1 id="pp-debit-title">PayPal Debit Card</h1>
      </div>
      <div className="pp-balance__scroll">
        <section className="pp-debit__face">
          <img className="pp-debit__logo" src={paypalWordmark} alt="" />
          <div className="pp-debit__meta">
            <div>
              <strong>{balance}</strong>
              <span>Available PayPal balance</span>
              <p>
                <button
                  type="button"
                  aria-label={showNumber ? 'Hide card number' : 'Show card number'}
                  onClick={() => setShowNumber((open) => !open)}
                >
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path
                      d="M2.8 12S6.2 6.5 12 6.5 21.2 12 21.2 12 17.8 17.5 12 17.5 2.8 12 2.8 12Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <circle cx="12" cy="12" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.7" />
                    {showNumber ? <path d="M5 19 19 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /> : null}
                  </svg>
                </button>
                {showNumber ? formatGroupedDigits(paypalDebitNumber, 4) : `•• ${paypalDebitLast4}`}
              </p>
            </div>
            <div className="pp-debit__mark">
              <span>debit</span>
              <MastercardMark />
            </div>
          </div>
        </section>

        <section className="pp-debit__row">
          <span className="pp-debit__pct">+5%</span>
          cash back on clothing
        </section>

        <section className="pp-debit__row">
          <span className="pp-debit__icon" aria-hidden>
            <svg viewBox="0 0 24 24">
              <rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </span>
          <span>
            <strong>Get the most out of your card</strong>
            <small>Complete a few more steps</small>
          </span>
        </section>

        <div className="pp-debit__actions">
          <button type="button" className="pp-debit__manage">
            Manage
          </button>
          <button type="button" className="pp-debit__activity">
            Activity
          </button>
        </div>

        <section className="pp-debit__menu">
          <div className="pp-debit__item">
            <span className="pp-debit__icon" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3.3" y="9.35" width="17.4" height="11.4" rx="1.9" stroke="currentColor" strokeWidth="1.7" />
                <path d="M8.05 9.45V7.55a3.95 3.95 0 0 1 7.9 0v1.9" stroke="currentColor" strokeWidth="1.7" />
                <path
                  d="M10.55 14.05a1.5 1.5 0 1 1 2.9 0L12 16.85Z"
                  stroke="currentColor"
                  strokeWidth="1.35"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Lock card</span>
            <button
              type="button"
              className={locked ? 'pp-debit__switch pp-debit__switch--on' : 'pp-debit__switch'}
              role="switch"
              aria-checked={locked}
              aria-label="Lock card"
              onClick={() => setLocked((on) => !on)}
            />
          </div>
          <button type="button" className="pp-debit__item">
            <span className="pp-debit__icon" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="5.55" y="2.65" width="12.9" height="18.7" rx="1.65" stroke="currentColor" strokeWidth="1.7" />
                <path d="M5.55 5.15h12.9M5.55 18.85h12.9" stroke="currentColor" strokeWidth="1.7" />
              </svg>
            </span>
            <span className="pp-debit__wallet-label">Add to Apple Wallet</span>
            <span className="pp-debit__apple" aria-hidden>
              <svg viewBox="0 0 40 32">
                <defs>
                  <clipPath id="pp-apple-wallet-card">
                    <rect x="1" y="1" width="38" height="30" rx="2.4" />
                  </clipPath>
                </defs>
                <g clipPath="url(#pp-apple-wallet-card)">
                  <rect width="40" height="32" fill="#f4f1e8" />
                  <rect x="2.1" y="2.1" width="35.8" height="5.2" fill="#8ec9e8" />
                  <rect x="2.1" y="7.3" width="35.8" height="3.6" fill="#c6ae4e" />
                  <rect x="2.1" y="10.9" width="35.8" height="3.6" fill="#73bc38" />
                  <rect x="2.1" y="14.5" width="35.8" height="2.3" fill="#b07e47" />
                  <rect x="2.1" y="16.8" width="35.8" height="13" fill="#e5e0d1" />
                  <path d="M3.2 16.8h33.6L20 22.8Z" fill="#ee6d66" />
                </g>
                <rect x="1" y="1" width="38" height="30" rx="2.4" fill="none" stroke="#f7f4ee" strokeWidth="1.4" />
              </svg>
              <span>
                <small>Add to</small>
                <b>Apple Wallet</b>
              </span>
            </span>
          </button>
          <button type="button" className="pp-debit__item">
            <span className="pp-debit__icon" aria-hidden>
              <svg viewBox="0 0 24 24">
                {[0, 1, 2].map((row) =>
                  [0, 1, 2].map((col) => (
                    <rect
                      key={`${row}-${col}`}
                      x={5.9 + col * 4.55}
                      y={5.9 + row * 4.55}
                      width="2.35"
                      height="2.35"
                      rx="0.35"
                      fill="currentColor"
                    />
                  )),
                )}
              </svg>
            </span>
            <span>Change PIN</span>
          </button>
          <button type="button" className="pp-debit__item">
            <span className="pp-debit__icon" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="1.9" y="6.15" width="20.2" height="11.7" rx="1.55" stroke="currentColor" strokeWidth="1.7" />
                <path d="M1.9 9.15h20.2" stroke="currentColor" strokeWidth="1.7" />
                <rect x="8.7" y="13.35" width="1.65" height="1.7" fill="currentColor" />
                <rect x="12.15" y="13.35" width="3.15" height="1.7" fill="currentColor" />
              </svg>
            </span>
            <span>Request a physical card</span>
          </button>
          <button type="button" className="pp-debit__item">
            <span className="pp-debit__icon" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 2.35 21.55 12 12 21.65 2.45 12Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                <path d="M12 7.15V12.05" stroke="currentColor" strokeWidth="1.7" />
                <rect x="11.2" y="14.05" width="1.6" height="1.6" fill="currentColor" />
              </svg>
            </span>
            <span>Report stolen digital card</span>
          </button>
          <button type="button" className="pp-debit__item">
            <span className="pp-debit__icon" aria-hidden>
              <svg viewBox="0 0 24 24">
                <path d="M5 8h14M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8M7 8l.8 11h8.4L17 8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </span>
            <span>Cancel card</span>
          </button>
        </section>

        <h2 className="pp-debit__heading">Funded by</h2>
        <section className="pp-debit__funded">
          <span className="pp-debit__paypal" aria-hidden>
            P
          </span>
          PayPal balance
        </section>

        <h2 className="pp-debit__heading">Daily limits</h2>
        <section className="pp-debit__limit">
          <span>Purchases</span>
          <b>$3,000</b>
        </section>
      </div>
    </div>
  )
}

function AddMoneyFlow({
  accounts,
  transfers,
  now,
  addedKey,
  onAdded,
  onLink,
  leaving,
  onClose,
  onFaceId,
}: {
  accounts: LinkedAccount[]
  transfers: AddMoneyTransfer[]
  now: number
  addedKey: string | null
  onAdded: (transfer: AddMoneyTransfer) => void
  onLink: (step: WalletStep) => void
  leaving: boolean
  onClose: () => void
  onFaceId: () => void
}) {
  const [step, setStep] = useState<AddMoneyStep>('amount')
  const [sourceKey, setSourceKey] = useState<string | null>(null)
  const [cents, setCents] = useState(addMoneyPresets[0])
  const [draft, setDraft] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [added, setAdded] = useState<AddMoneyTransfer | null>(null)
  const [sheetClosing, setSheetClosing] = useState(false)
  const waits = useRef<number[]>([])
  const sheetTimer = useRef<number | null>(null)

  useEffect(() => {
    if (!addedKey) return
    setSourceKey(addedKey)
    setStep('source')
    setError(null)
  }, [addedKey])

  function clearWaits() {
    waits.current.forEach((id) => window.clearTimeout(id))
    waits.current = []
  }

  function wait(ms: number, run: () => void) {
    const id = window.setTimeout(run, ms)
    waits.current.push(id)
  }

  useEffect(() => {
    return () => {
      waits.current.forEach((id) => window.clearTimeout(id))
      if (sheetTimer.current !== null) window.clearTimeout(sheetTimer.current)
    }
  }, [])

  function closeSource() {
    if (sheetTimer.current !== null) return
    setSheetClosing(true)
    sheetTimer.current = window.setTimeout(() => {
      setStep('amount')
      setSheetClosing(false)
      sheetTimer.current = null
    }, 250)
  }

  const sources = accounts.filter(isFundableAccount)
  const instantSources = sources.filter((entry) => entry.kind === 'card')
  const laterSources = sources.filter((entry) => entry.kind === 'bank')
  const source = sources.find((entry) => accountKey(entry) === sourceKey) ?? sources[0] ?? null
  const debitLeftToday =
    debitAddLimits[0].cents -
    transfers
      .filter((transfer) => transfer.method === 'debit' && now - transfer.createdAt < dayMs)
      .reduce((sum, transfer) => sum + transfer.cents, 0)

  function chooseAmount(next: number) {
    setCents(next)
    setDraft(null)
    setError(null)
  }

  function applyDraft(next: string) {
    setDraft(next)
    const parsed = parseAmountDraft(next)
    if (parsed !== null) {
      setCents(parsed)
      setError(null)
    }
  }

  function typeDigit(digit: string) {
    applyDraft(typeAmountKey(draft ?? '', digit))
  }

  function typeDot() {
    applyDraft(typeAmountKey(draft ?? '', '.'))
  }

  function finishDraft() {
    const parsed = parseAmountDraft(draft ?? '')
    if (parsed !== null) setCents(parsed)
    setDraft(null)
    setError(null)
  }

  function add() {
    if (!source || cents <= 0) return
    const instantCard = source.kind === 'card' && isInstantCard(source)
    const limit = instantCard ? debitLimitError(cents, transfers, now) : null
    if (limit) {
      setError(limit)
      return
    }
    const instant = source.kind === 'card'
    const pending = {
      cents,
      method: source.kind === 'bank' ? ('bank' as const) : instantCard ? ('debit' as const) : ('credit' as const),
      source: addSourceName(source),
      activityTitle:
        source.kind === 'card'
          ? `${source.label.toUpperCase()} ${cardFundingLabel(source)} Card ••••${source.last4}`
          : 'Bank account',
      instant,
    }
    clearWaits()
    setStep('adding')
    wait(2000, () => onFaceId())
    wait(5600, () => {
      const time = Date.now()
      const transfer: AddMoneyTransfer = {
        id: `${time}`,
        cents: pending.cents,
        method: pending.method,
        source: pending.source,
        activityTitle: pending.activityTitle,
        createdAt: time,
        availableAt: pending.instant ? time : addBusinessDays(time, 5),
      }
      onAdded(transfer)
      setAdded(transfer)
      setStep('done')
    })
  }

  const editing = draft !== null
  const done = step === 'done' && added !== null

  return (
    <div
      className={['add-money', done && 'add-money--covered', leaving && 'add-money--leaving'].filter(Boolean).join(' ')}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-money-title"
    >
      <div className="card-form__head">
        <button type="button" className="card-form__back" aria-label="Back" onClick={onClose}>
          <ArrowLeftIcon />
        </button>
        <h2 id="add-money-title">Add money</h2>
      </div>

      <button
        type="button"
        className="add-money__value"
        aria-label={editing ? 'Amount' : `Amount ${formatUsd(cents, true)}, edit`}
        onClick={() => setDraft(editing ? draft : '')}
      >
        <span>{editing ? formatAmountDraft(draft) : formatUsd(cents, true)}</span>
        {editing && <span className="card-form__caret" />}
        <EditAmountIcon />
      </button>

      <div className="add-money__presets">
        {addMoneyPresets.map((preset) => (
          <button
            key={preset}
            type="button"
            className={cents === preset ? 'add-money__preset add-money__preset--on' : 'add-money__preset'}
            onClick={() => chooseAmount(preset)}
          >
            {formatUsd(preset, true)}
          </button>
        ))}
      </div>

      {source ? (
        <button type="button" className="add-money__from" onClick={() => setStep('source')}>
          <span className="add-money__label">From</span>
          <AddSourceRow source={source} />
          <ChevronRight />
        </button>
      ) : (
        <button type="button" className="add-money__from" onClick={() => onLink('add')}>
          <span className="add-money__label">From</span>
          <span className="add-source__text">
            <strong>Link a bank or debit card</strong>
          </span>
          <ChevronRight />
        </button>
      )}

      <FieldError id="add-money-error" message={error} />

      {source &&
        (source.kind === 'bank' ? (
          <p className="add-money__eta">{formatUsd(cents, true)} will be available in 3 to 5 days</p>
        ) : (
          <p className="add-money__eta">
            {formatUsd(cents, true)} will be available in seconds <BoltFillIcon />
          </p>
        ))}
      {source?.kind === 'bank' && (
        <p className="add-money__note">It may take 3 to 5 days for this transfer to appear on your linked bank account.</p>
      )}

      {editing ? (
        <div className="add-money__keyboard">
          <div className="add-money__toolbar">
            <button type="button" onClick={finishDraft}>
              Done
            </button>
          </div>
          <NumberPad
            onDigit={typeDigit}
            onDot={typeDot}
            onDelete={() => applyDraft((draft ?? '').slice(0, -1))}
          />
        </div>
      ) : (
        <button
          type="button"
          className="card-form__submit add-money__submit"
          disabled={!source || cents <= 0}
          onClick={add}
        >
          Add {formatUsd(cents)} USD Now
        </button>
      )}

      {step === 'source' && (
        <div className={sheetClosing ? 'sheet-backdrop sheet-backdrop--closing' : 'sheet-backdrop'} onClick={closeSource}>
          <div
            className="sheet add-from"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-source-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sheet__head">
              <h2 id="add-source-title">Choose a way to add money</h2>
              <button type="button" className="sheet__close" aria-label="Close" onClick={closeSource}>
                <CloseIcon />
              </button>
            </div>
            <div className="add-from__list">
              <h3 className="add-from__section">In seconds</h3>
              <div role="radiogroup" aria-labelledby="add-source-title">
                {instantSources.map((entry) => {
                  const key = accountKey(entry)
                  const on = source !== null && accountKey(source) === key
                  const instantCents = instantLimit(entry, debitLeftToday)
                  return (
                    <button
                      key={key}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      className="add-from__row"
                      onClick={() => {
                        setSourceKey(key)
                        setError(null)
                        closeSource()
                      }}
                    >
                      <AddSourceRow source={entry} note={`${formatUsd(instantCents, true)} or less in seconds`} />
                      {on && (
                        <svg className="add-from__check" viewBox="0 0 20 20" fill="none" aria-hidden>
                          <path d="m3.5 10.4 4.4 4.4 8.6-9.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  )
                })}
              </div>
              <button type="button" className="add-from__row add-from__row--link" onClick={() => onLink('card')}>
                <span className="add-from__glyph">
                  <CardOutlineIcon />
                </span>
                <span>Add new debit card</span>
              </button>
              <h3 className="add-from__section">In 3 to 5 days</h3>
              <div role="radiogroup" aria-labelledby="add-source-title">
              {laterSources.map((entry) => {
                const key = accountKey(entry)
                const on = source !== null && accountKey(source) === key
                return (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    className="add-from__row"
                    onClick={() => {
                      setSourceKey(key)
                      setError(null)
                      closeSource()
                    }}
                  >
                    <AddSourceRow source={entry} note="Available in 3 to 5 days" />
                    {on && (
                      <svg className="add-from__check" viewBox="0 0 20 20" fill="none" aria-hidden>
                        <path d="m3.5 10.4 4.4 4.4 8.6-9.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                )
              })}
              </div>
              <button type="button" className="add-from__row add-from__row--link" onClick={() => onLink('bank-pick')}>
                <span className="add-from__glyph">
                  <BankIcon />
                  <svg className="add-from__plus" viewBox="0 0 8 8" aria-hidden>
                    <path d="M4 0.8v6.4M0.8 4h6.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </span>
                <span>Add new bank</span>
              </button>
            </div>
            <button type="button" className="add-from__help">
              Don’t see all of your payment methods?
            </button>
          </div>
        </div>
      )}

      {step === 'adding' && (
        <div className="add-money__adding" role="status" aria-live="polite">
          <span className="add-money__adding-mark">
            <FaceIdIcon />
          </span>
          <p>Adding money...</p>
        </div>
      )}

      {done && added && (
        <div className="add-money__added">
          <div className="add-money__added-copy">
            <h2>You added {formatUsd(added.cents, true)}</h2>
            <p>We’ll let you know when it’s available.</p>
            <button type="button" className="add-money__added-rate">
              Tell us how this transaction went
            </button>
          </div>
          <button type="button" className="add-money__added-done" onClick={onClose}>
            Done
          </button>
          <button
            type="button"
            className="add-money__added-more"
            onClick={() => {
              setAdded(null)
              setStep('amount')
            }}
          >
            Add More
          </button>
        </div>
      )}
    </div>
  )
}

const bankFaces: Record<BankId, string> = {
  chase: 'chase',
  bofa: 'bofa-red',
  wellsfargo: 'wellsfargo',
  capitalone: 'capitalone',
  chime: 'chime',
  navyfederal: 'navyfederal',
  td: 'td',
  truist: 'truist',
  pnc: 'pnc',
  huntington: 'huntington',
  citi: 'citi',
  fifththird: 'fifththird',
  regions: 'regions',
  usaa: 'usaa',
  usbank: 'usbank',
}

function LinkedAccountFace({ account }: { account: LinkedAccount }) {
  if (account.kind === 'amex-send') {
    return (
      <li className="card-art card-art--amex">
        <span className="card-art__top">
          <IssuerLogo issuer="amex" />
          <strong>Send Account</strong>
        </span>
        <span className="card-art__number">Amex Send®</span>
      </li>
    )
  }
  if (account.kind === 'bank') {
    return (
      <li className={`card-art card-art--${account.bank ? bankFaces[account.bank] : 'bank'}`}>
        <span className="card-art__top">
          {account.bank ? (
            <IssuerLogo issuer={account.bank} />
          ) : (
            <span className="card-art__bank">
              <BankIcon />
              Bank account
            </span>
          )}
          <strong>{account.type}</strong>
        </span>
        <span className="card-art__number">•• {account.last4}</span>
      </li>
    )
  }
  if (account.bin?.art) {
    return (
      <li className="card-art card-art--image">
        <img className="card-art__image" src={account.bin.art} alt={`${account.bin.product} card`} />
        <span className="card-art__number">•• {account.last4}</span>
      </li>
    )
  }
  return (
    <li className={`card-art card-art--${account.bin?.face ?? account.brand}`}>
      {account.bin ? (
        <>
          <span className="card-art__top">
            <IssuerLogo issuer={account.bin.issuer} />
            <strong>{account.bin.product}</strong>
          </span>
          <span className="card-art__bottom">
            <span className="card-art__number">•• {account.last4}</span>
            {account.bin.issuer !== account.brand && <CardArtLogo brand={account.brand} />}
          </span>
        </>
      ) : (
        <>
          <span className="card-art__top">
            <CardArtLogo brand={account.brand} />
            <strong>•• {account.last4}</strong>
          </span>
          <span className="card-art__exp">Expires {account.exp}</span>
        </>
      )}
    </li>
  )
}

const poolAvatars = [poolGrace, poolRobert, poolSam]

function IosSpinner() {
  return (
    <span className="ios-spinner" aria-hidden>
      {Array.from({ length: 8 }, (_, i) => (
        <i key={i} style={{ '--i': i } as CSSProperties} />
      ))}
    </span>
  )
}

function AccountsPage({
  balance,
  loading,
  linkedAccounts,
  onAddBanks,
  onAddMoney,
}: {
  balance: string
  loading: boolean
  linkedAccounts: LinkedAccount[]
  onAddBanks: () => void
  onAddMoney: () => void
}) {
  return (
    <div className="wallet">
      <h1>Accounts</h1>
      {loading && (
        <div className="wallet-loading" role="status" aria-label="Loading">
          <IosSpinner />
        </div>
      )}
      <div className="wallet-pills">
        <button type="button" onClick={onAddBanks}>
          Add banks and cards
        </button>
        <button type="button">Add cash at stores</button>
        <span className="wallet-pills__peek" aria-hidden />
      </div>

      <article className="wallet-card">
        <div className="wallet-card__head">
          <span>PayPal balance</span>
          <span className="wallet-card__mask">
            •• 5523
            <PayPalLogo size={18} />
          </span>
        </div>
        <p className="balance-card__amount">{balance}</p>
        <p className="wallet-card__available">Available balance</p>
        <div className="wallet-actions">
          <button type="button" onClick={onAddMoney}>
            <span className="wallet-actions__icon">
              <AddMoneyIcon />
            </span>
            Add Money
          </button>
          <button type="button">
            <span className="wallet-actions__icon">
              <TransferIcon />
            </span>
            Transfer
          </button>
          <button type="button">
            <span className="wallet-actions__icon">
              <InfoIcon />
            </span>
            Account Info
          </button>
        </div>
        <button type="button" className="wallet-promo">
          <span className="wallet-promo__badge">+5%</span>
          <span className="wallet-promo__copy">Choose a PayPal Debit 5% cash back category</span>
          <ChevronRight />
        </button>
      </article>

      <section className="wallet-rewards">
        <h2>Rewards</h2>
        <div className="rewards-card">
          <div className="rewards-card__copy">
            <p>Explore all the ways it pays to PayPal</p>
            <button type="button">Start earning cash back</button>
          </div>
          <div className="rewards-logos" aria-hidden>
            <WalmartLogo />
            <SevenElevenLogo />
            <BestBuyLogo />
            <UberLogo />
            <DollarGeneralLogo />
          </div>
        </div>
      </section>

      <section className="wallet-more">
        <h2>Do more with your money</h2>
        <div className="money-grid">
          <article className="savings-card">
            <span>PayPal Savings</span>
            <strong>3.65% APY</strong>
            <svg className="savings-card__chart" viewBox="0 0 100 50" aria-hidden>
              <path
                d="M-3 48.7C-2.5 48.7-2.3 48.9 0 48.5 2.3 48.1 8 47.2 10.7 46.5 13.4 45.8 14 45.6 16 44.2 18 42.8 20.7 39.7 22.6 38 24.5 36.3 25.8 35 27.5 34 29.2 33 31.2 32.6 33 32.1 34.8 31.6 36.4 31.7 38 31.2 39.6 30.7 40.7 30.5 42.6 29.1 44.5 27.7 47.1 24.8 49.3 22.6 51.5 20.4 53.9 17.2 55.9 15.9 57.9 14.6 59.3 14.9 61 15 62.7 15.1 64.3 15.6 66 16.6 67.7 17.6 69.3 19.8 71 20.8 72.7 21.8 74.5 22.3 76 22.4 77.5 22.5 78.3 22.5 80 21.6 81.7 20.7 83.9 18.7 86 17 88.1 15.3 90.3 13.4 92.6 11.5 94.9 9.6 98.1 7.1 100 5.6 101.9 4.1 103.3 2.9 104 2.4"
                fill="none"
                stroke="#fff"
                strokeWidth="6"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <TilePlus className="mini-card__plus savings-card__plus" />
          </article>
          <article className="crypto-card">
            <span>Crypto</span>
            <p className="crypto-card__return">$0.00 total return</p>
            <p className="crypto-card__amount">$0.00</p>
            <p className="crypto-card__hint">Available value</p>
          </article>
          <article className="giving-card">
            <span>PayPal Giving</span>
            <strong>Support a cause</strong>
            <div className="mini-card__foot">
              <svg className="giving-heart" viewBox="0 0 48 44" aria-hidden>
                <path
                  d="M24 40C12 30 4 22 4 14 4 7 9 3 15 3c4 0 7 2 9 6 2-4 5-6 9-6 6 0 11 4 11 11 0 8-8 16-20 26Z"
                  fill="none"
                  stroke="#3ec6ff"
                  strokeWidth="2.4"
                />
              </svg>
              <TilePlus className="mini-card__plus" />
            </div>
          </article>
          <article className="pools-card">
            <span>Pools</span>
            <strong>Pool money with friends</strong>
            <div className="mini-card__foot">
              <span className="pool-avatars" aria-hidden>
                {poolAvatars.map((src) => (
                  <img key={src} src={src} alt="" />
                ))}
              </span>
              <TilePlus className="mini-card__plus" />
            </div>
          </article>
        </div>
        <span className="money-dot" aria-hidden />
      </section>

      <section className="wallet-list">
        <div className="wallet-list__head">
          <h2>Linked banks and cards</h2>
          <button type="button" onClick={onAddBanks}>
            Add new
            <ChevronRight />
          </button>
        </div>
        {linkedAccounts.length > 0 ? (
          <ul className="card-stack">
            {linkedAccounts.map((account) => (
              <LinkedAccountFace key={accountKey(account)} account={account} />
            ))}
          </ul>
        ) : (
          <button type="button" className="wallet-add" onClick={onAddBanks}>
            <span>Add banks and cards</span>
            <span className="wallet-add__plus" aria-hidden>
              +
            </span>
          </button>
        )}
      </section>

      <section className="wallet-list">
        <div className="wallet-list__head">
          <h2>Linked loyalty cards</h2>
          <button type="button">
            Add new
            <ChevronRight />
          </button>
        </div>
        <button type="button" className="wallet-add">
          <span>Add loyalty cards</span>
          <span className="wallet-add__plus" aria-hidden>
            +
          </span>
        </button>
      </section>

      <section className="wallet-list">
        <h2>Payment preferences</h2>
        <div className="pref-card">
          <button type="button">Online purchases</button>
          <button type="button">In-store purchases</button>
          <button type="button">Linked businesses</button>
          <p>Manage where PayPal is saved for faster checkout.</p>
        </div>
      </section>
    </div>
  )
}

type SentPayment = {
  id: number
  name: string
  photo?: string
  initials: string
  cents: number
  feeCents: number
  note: string
  type: 'friends' | 'goods'
  sourceId: string | null
  createdAt: number
}

type ActivityFilter = 'All' | 'Purchases' | 'Sent & Received' | 'Subscriptions'

const activityFilters: ActivityFilter[] = ['All', 'Purchases', 'Sent & Received', 'Subscriptions']

type ActivityProfile = { name: string; photo: string }

const profileMoves = [
  { date: 'Apr 16, 2025', detail: 'Money received', amount: '+$42' },
  { date: 'Apr 15, 2025', detail: 'Money sent', amount: '-$18' },
  { date: 'Apr 14, 2025', detail: 'Money sent', amount: '-$9.50' },
  { date: 'Apr 14, 2025', detail: 'Money received', amount: '+$25' },
  { date: 'Apr 13, 2025', detail: 'Money sent', amount: '-$7' },
]

function AddMoneyRows({
  transfers,
  pending,
  onOpen,
}: {
  transfers: AddMoneyTransfer[]
  pending: boolean
  onOpen?: (entry: AddMoneyTransfer) => void
}) {
  return transfers.map((entry) => (
    <ActivityRow
      key={entry.id}
      mark={entry.method === 'bank' ? 'transfer' : 'card'}
      title={entry.activityTitle}
      date={formatActivityDate(entry.createdAt)}
      detail={entry.method === 'bank' ? (pending ? 'Pending' : undefined) : pending ? 'Pending' : 'Transfer using card - Completed'}
      amount={`+${formatUsd(entry.cents, true)}`}
      onOpen={entry.method !== 'bank' && !pending && onOpen ? () => onOpen(entry) : undefined}
    />
  ))
}

function SentRows({ payments }: { payments: SentPayment[] }) {
  return payments.map((payment) => (
    <ActivityRow
      key={payment.id}
      mark={payment.photo ? 'photo' : 'initials'}
      photo={payment.photo}
      initials={payment.initials}
      title={payment.name}
      date={formatActivityDate(payment.createdAt)}
      detail={payment.type === 'goods' ? 'Goods and services' : 'Money sent'}
      note={payment.note || undefined}
      amount={`-${formatUsd(payment.cents + payment.feeCents, true)}`}
    />
  ))
}

function CardTransferDetail({ entry, onBack }: { entry: AddMoneyTransfer; onBack: () => void }) {
  const card = debitCardParts(entry.activityTitle)
  const amount = `+${formatUsd(entry.cents, true)}`
  const code = transactionCode(entry.id)
  const [copied, setCopied] = useState(false)
  const cardLine = card.last4 ? `${card.name} ••••${card.last4}` : card.name

  function copyId() {
    const markCopied = () => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    }
    const fallback = () => {
      const area = document.createElement('textarea')
      area.value = code
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      area.remove()
    }
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(code).then(markCopied, () => {
        fallback()
        markCopied()
      })
      return
    }
    fallback()
    markCopied()
  }

  return (
    <div className="transfer-detail" role="dialog" aria-modal="true" aria-labelledby="transfer-detail-title">
      <div className="transfer-detail__head">
        <button type="button" aria-label="Back" onClick={onBack}>
          <ArrowLeftIcon />
        </button>
        <h2 id="transfer-detail-title">Transfer using card - Completed</h2>
      </div>
      <div className="transfer-detail__summary">
        <span className="transfer-detail__mark" aria-hidden>
          <CardMark />
        </span>
        <div>
          <strong>{card.name}</strong>
          {card.last4 ? <span>••••{card.last4}</span> : null}
          <span>{formatTransferStamp(entry.createdAt)}</span>
        </div>
        <b>{amount}</b>
      </div>
      <h3>From</h3>
      <div className="transfer-detail__box">
        <span>{cardLine}</span>
        <b>{formatUsd(entry.cents, true)}</b>
      </div>
      <h3>To</h3>
      <div className="transfer-detail__box">
        <span>PayPal balance</span>
        <b>{formatUsd(entry.cents, true)}</b>
      </div>
      <h3>Transaction ID</h3>
      <div className="transfer-detail__box">
        <span className="transfer-detail__code">{code}</span>
        <button type="button" aria-label={copied ? 'Copied' : 'Copy transaction ID'} onClick={copyId}>
          <svg viewBox="0 0 24 24" aria-hidden>
            <rect x="8" y="7" width="12" height="14" rx="2.2" fill="#1a3fad" />
            <rect x="4" y="3" width="12" height="14" rx="2.2" fill="#2450d0" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function ActivityPage({ addMoney, sent, now }: { addMoney: AddMoneyTransfer[]; sent: SentPayment[]; now: number }) {
  const [filter, setFilter] = useState<ActivityFilter>('All')
  const [profiles, setProfiles] = useState<ActivityProfile[]>([])
  const [transfer, setTransfer] = useState<AddMoneyTransfer | null>(null)
  const purchases = filter === 'All' || filter === 'Purchases'
  const moves = filter === 'All' || filter === 'Sent & Received'
  type HistoryItem =
    | { kind: 'add'; entry: AddMoneyTransfer; time: number }
    | { kind: 'sent'; entry: SentPayment; time: number }
  const history = [
    ...addMoney.map((entry): HistoryItem => ({ kind: 'add', entry, time: entry.createdAt })),
    ...sent.map((entry): HistoryItem => ({ kind: 'sent', entry, time: entry.createdAt })),
  ].sort((a, b) => b.time - a.time)
  const pendingAdds = history.filter(
    (item): item is Extract<HistoryItem, { kind: 'add' }> => item.kind === 'add' && item.entry.availableAt > now,
  )
  const completedHistory = history
    .filter((item) => item.kind === 'sent' || item.entry.availableAt <= now)
    .filter((item) => (filter === 'Purchases' ? item.kind === 'sent' && item.entry.type === 'goods' : moves))
  const historyMonths = completedHistory.reduce<{ month: string; entries: HistoryItem[] }[]>((months, entry) => {
    const month = formatActivityMonth(entry.time)
    const last = months[months.length - 1]
    if (last?.month === month) last.entries.push(entry)
    else months.push({ month, entries: [entry] })
    return months
  }, [])

  useEffect(() => {
    let ignore = false
    fetch('https://randomuser.me/api/?results=12&seed=paypal&nat=us&inc=name,picture')
      .then((response) => response.json())
      .then((data: { results: { name: { first: string; last: string }; picture: { large: string } }[] }) => {
        if (ignore) return
        const next: ActivityProfile[] = []
        for (const person of data.results) {
          const photo = person.picture.large
          if (next.some((item) => item.photo === photo)) continue
          next.push({ name: `${person.name.first} ${person.name.last}`, photo })
          if (next.length === 7) break
        }
        setProfiles(next)
      })
      .catch(() => {})
    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    if (!transfer) return
    const screen = document.querySelector('.screen--wallet')
    if (screen instanceof HTMLElement) screen.scrollTop = 0
  }, [transfer])

  return (
    <div className="activity">
      <h1>Activity</h1>
      <div className="activity-search">
        <label className="activity-search__field">
          <svg viewBox="0 0 20 20" aria-hidden>
            <circle cx="9" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M13.2 13.2 17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input type="search" placeholder="Search by name or email" />
        </label>
        <button type="button" className="activity-filter" aria-label="Filter">
          <svg viewBox="0 0 22 22" aria-hidden>
            <path d="M4 7h14M4 15h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="8" cy="7" r="2.1" fill="#f1f1f9" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="14" cy="15" r="2.1" fill="#f1f1f9" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </div>

      <div className="activity-chips">
        {activityFilters.map((name) => (
          <button
            key={name}
            type="button"
            className={filter === name ? 'activity-chip activity-chip--on' : 'activity-chip'}
            onClick={() => setFilter(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <button type="button" className="tracking-card">
        <span className="tracking-card__icon" aria-hidden>
          <svg viewBox="0 0 24 24">
            <path
              d="M12 4.5 19 8v8l-7 3.5L5 16V8l7-3.5Z"
              fill="none"
              stroke="#fff"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path d="M12 12.2 19 8.4M12 12.2V19.5M12 12.2 5 8.4" stroke="#fff" strokeWidth="1.4" />
          </svg>
        </span>
        <span>Get live package tracking</span>
        <svg viewBox="0 0 20 20" aria-hidden>
          <path d="M4 10h11M11 6l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <section className="activity-list">
        {moves && pendingAdds.length > 0 ? (
          <>
            <h2>Pending</h2>
            <div className="activity-group activity-group--pending">
              <AddMoneyRows transfers={pendingAdds.map((item) => item.entry)} pending />
            </div>
          </>
        ) : null}
        <h2>Completed</h2>
        {historyMonths.map((group) => (
          <div key={group.month}>
            <p className="activity-month">{group.month}</p>
            <div className="activity-group">
              {group.entries.map((item) =>
                item.kind === 'sent' ? (
                  <SentRows key={`sent-${item.entry.id}`} payments={[item.entry]} />
                ) : (
                  <AddMoneyRows
                    key={`add-${item.entry.id}`}
                    transfers={[item.entry]}
                    pending={false}
                    onOpen={setTransfer}
                  />
                ),
              )}
            </div>
          </div>
        ))}
        {moves ? (
          <>
            <p className="activity-month">Jun 2025</p>
            <div className="activity-group">
              <ActivityRow
                mark="card"
                title="VISA Debit Card ••••7..."
                date="Jun 15, 2025"
                detail="Instant transfer using card - Completed"
                amount="-$6.86"
              />
            </div>
          </>
        ) : null}
        {purchases ? (
          <>
            <p className="activity-month">May 2025</p>
            <div className="activity-group">
              <ActivityRow title="SHELL" date="May 27, 2025" detail="Payment" amount="-$3" />
              <ActivityRow title="SHELL" date="May 25, 2025" detail="Payment" amount="-$12.25" />
              <ActivityRow
                mark="card"
                title="ONE STOP - N00757"
                date="May 24, 2025"
                detail="ATM withdrawal"
                amount="-$125.25"
              />
              <ActivityRow title="SHELL SERVICE S" date="May 24, 2025" detail="Payment" amount="-$33.01" />
              <ActivityRow
                mark="card"
                title="PayPal debit card"
                date="May 24, 2025"
                detail="Credit received - Completed"
                amount="+$178"
              />
              <ActivityRow title="quierorollo.es" date="May 6, 2025" detail="Payment" amount="-$12.50" />
              <ActivityRow title="quierorollo.es" date="May 3, 2025" detail="Payment" amount="-$23.74" />
            </div>
          </>
        ) : null}
        {purchases || moves ? (
          <>
            <p className="activity-month">Apr 2025</p>
            <div className="activity-group">
              {purchases ? (
                <>
                  <ActivityRow
                    mark="btc"
                    title="Bitcoin (BTC)"
                    date="Apr 24, 2025, 3:30 PM"
                    detail="0.00031749 BTC sold"
                    amount="+$27.42"
                  />
                  <ActivityRow
                    mark="btc"
                    title="Bitcoin (BTC)"
                    date="Apr 24, 2025, 1:48 PM"
                    detail="0.00031749 BTC purchased"
                    amount="-$31.99"
                  />
                  <ActivityRow
                    mark="btc"
                    title="Bitcoin (BTC)"
                    date="Apr 23, 2025, 4:00 PM"
                    detail="0.00054139 BTC sold"
                    amount="+$48.28"
                  />
                </>
              ) : null}
              {moves ? (
                <>
                  <ActivityRow
                    mark="photo"
                    photo={profiles[0]?.photo}
                    title="Sylvia lamb"
                    date="Apr 15, 2025"
                    detail="Money sent"
                    note={'"This the rest till 1st.  Might we\'ll haveit foo..."'}
                    amount="-$8"
                  />
                  {profiles.slice(1, 6).map((person, index) => (
                    <ActivityRow
                      key={person.photo}
                      mark="photo"
                      photo={person.photo}
                      title={person.name}
                      date={profileMoves[index].date}
                      detail={profileMoves[index].detail}
                      amount={profileMoves[index].amount}
                    />
                  ))}
                </>
              ) : null}
              {purchases ? <ActivityRow title="AMDB" date="Apr 13, 2025" detail="Payment" amount="-$14.99" /> : null}
              {moves ? (
                <>
                  <ActivityRow
                    mark="transfer"
                    title="Transfer"
                    date="Apr 13, 2025"
                    detail="Transfer using card - Denied"
                    amount="-$23.48"
                  />
                  <ActivityRow
                    mark="transfer"
                    title="Transfer"
                    date="Apr 13, 2025"
                    detail="Transfer using card - Denied"
                    amount="-$23.48"
                  />
                </>
              ) : null}
              {purchases ? (
                <>
                  <ActivityRow title="quierorollo.es" date="Apr 13, 2025" detail="Payment" amount="-$9.19" />
                  <ActivityRow
                    mark="btc"
                    title="Bitcoin (BTC)"
                    date="Apr 12, 2025, 6:05 AM"
                    detail="0.00023658 BTC sold"
                    amount="+$18.66"
                  />
                  <ActivityRow
                    mark="btc"
                    title="Bitcoin (BTC)"
                    date="Apr 12, 2025, 5:55 AM"
                    detail="0.00023658 BTC purchased"
                    amount="-$20.99"
                  />
                </>
              ) : null}
              {moves ? <ActivityRow mark="transfer" title="Bank account" date="Apr 12, 2025" amount="+$50" /> : null}
            </div>
          </>
        ) : null}
        {purchases ? (
          <>
            <p className="activity-month">Sep 2024</p>
            <div className="activity-group">
              <ActivityRow
                title="FTC v FloatMe"
                date="Sep 23, 2024"
                detail="Payment received"
                note='"This payment is the result of a settlement..."'
                amount="+$5.99"
              />
            </div>
          </>
        ) : null}
        {moves ? (
          <>
            <p className="activity-month">Aug 2024</p>
            <div className="activity-group">
              <ActivityRow
                mark="initials"
                initials="PI"
                title="Paula Irizarry"
                date="Aug 1, 2024"
                detail="Money sent"
                note='"12 concrete foundation blocks"'
                amount="-$26.03"
              />
            </div>
            <p className="activity-month">Feb 2024</p>
            <div className="activity-group">
              <ActivityRow
                mark="photo"
                photo={profiles[6]?.photo}
                title="Heather Hammitt"
                date="Feb 13, 2024"
                detail="Request received - Canceled"
                amount="-$20"
              />
            </div>
          </>
        ) : null}
        {purchases ? (
          <>
            <p className="activity-month">Jan 2024</p>
            <div className="activity-group">
              <ActivityRow mark="google" title="Google" date="Jan 4, 2024" detail="Payment" amount="-$2.18" />
              <ActivityRow mark="adblock" title="TOTAL ADBLOCK" date="Jan 1, 2024" detail="Payment" amount="-$9.95" />
            </div>
            <p className="activity-month">Dec 2023</p>
            <div className="activity-group">
              {['Dec 28, 2023', 'Dec 21, 2023', 'Dec 14, 2023', 'Dec 7, 2023'].map((date) => (
                <ActivityRow key={date} mark="google" title="Google" date={date} detail="Payment" amount="-$2.18" />
              ))}
              <ActivityRow mark="adblock" title="TOTAL ADBLOCK" date="Dec 1, 2023" detail="Payment" amount="-$9.95" />
            </div>
          </>
        ) : null}
      </section>
      {transfer ? <CardTransferDetail entry={transfer} onBack={() => setTransfer(null)} /> : null}
    </div>
  )
}

function ActivityRow({
  mark = 'store',
  photo,
  initials,
  title,
  date,
  detail,
  note,
  amount,
  onOpen,
}: {
  mark?: 'store' | 'card' | 'btc' | 'transfer' | 'photo' | 'initials' | 'google' | 'adblock'
  photo?: string
  initials?: string
  title: string
  date?: string
  detail?: string
  note?: string
  amount: string
  onOpen?: () => void
}) {
  const markClass =
    mark === 'card'
      ? 'activity-row__mark activity-row__mark--card'
      : mark === 'btc'
        ? 'activity-row__mark activity-row__mark--btc'
        : mark === 'transfer'
          ? 'activity-row__mark activity-row__mark--transfer'
          : mark === 'photo'
            ? 'activity-row__mark activity-row__mark--photo'
            : mark === 'initials'
              ? 'activity-row__mark activity-row__mark--initials'
              : mark === 'google'
                ? 'activity-row__mark activity-row__mark--google'
                : mark === 'adblock'
                  ? 'activity-row__mark activity-row__mark--adblock'
                  : 'activity-row__mark'

  const row = (
    <>
      <span className={markClass} aria-hidden>
        {mark === 'card' ? (
          <CardMark />
        ) : mark === 'btc' ? (
          <svg viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="32" fill="#f7931a" />
            <path
              fill="#fff"
              d="M46.11 27.44c.64-4.27-2.61-6.57-7.06-8.1l1.44-5.78-3.52-.88-1.4 5.63c-.93-.23-1.88-.45-2.82-.67l1.41-5.66-3.52-.88-1.44 5.78c-.77-.17-1.52-.35-2.25-.53l.01-.04-4.86-1.21-.94 3.76s2.61.6 2.56.63c1.43.36 1.69 1.3 1.64 2.05l-1.65 6.6c.1.03.23.06.37.12l-.38-.09-2.31 9.25c-.17.44-.62 1.09-1.62.84.04.05-2.56-.64-2.56-.64l-1.75 4.03 4.59 1.14c.85.21 1.69.44 2.51.65l-1.46 5.85 3.51.88 1.44-5.78c.96.26 1.9.5 2.81.73l-1.44 5.75 3.52.88 1.46-5.84c6.01 1.14 10.52.68 12.42-4.75 1.53-4.37-.08-6.89-3.23-8.53 2.3-.53 4.03-2.04 4.49-5.16zm-8.04 11.27c-1.09 4.37-8.45 2.01-10.84 1.41l1.93-7.75c2.39.6 10.06 1.78 8.91 6.34zm1.09-11.32c-.99 3.98-7.12 1.96-9.1 1.46l1.75-7.02c1.98.49 8.36 1.41 7.35 5.56z"
            />
          </svg>
        ) : mark === 'transfer' ? (
          <TransferMark />
        ) : mark === 'photo' && photo ? (
          <img src={photo} alt="" />
        ) : mark === 'initials' ? (
          initials
        ) : mark === 'google' ? (
          <GoogleMark />
        ) : mark === 'adblock' ? (
          <AdblockMark />
        ) : mark === 'photo' ? null : (
          <StoreMark />
        )}
      </span>
      <div>
        <div className="activity-row__top">
          <strong>{title}</strong>
          <b className={amount.startsWith('+') ? 'is-credit' : undefined}>{amount}</b>
        </div>
        {date ? <span>{date}</span> : null}
        {detail ? <span>{detail}</span> : null}
        {note ? <span>{note}</span> : null}
      </div>
    </>
  )

  if (onOpen) {
    return (
      <button type="button" className="activity-row" onClick={onOpen}>
        {row}
      </button>
    )
  }

  return <article className="activity-row">{row}</article>
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z"
      />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C39.2 36.7 44 32 44 24c0-1.3-.1-2.7-.4-3.9z" />
    </svg>
  )
}

function AdblockMark() {
  return (
    <svg viewBox="0 0 92 22" aria-hidden>
      <circle cx="8" cy="11" r="7" fill="#e10600" />
      <circle cx="8" cy="11" r="2.3" fill="#fff" />
      <text x="18" y="15" fill="#222" fontFamily="Segoe UI, Helvetica, Arial, sans-serif" fontSize="9" fontWeight="800">
        TOTAL
      </text>
      <text x="54" y="15" fill="#6a6a6a" fontFamily="Segoe UI, Helvetica, Arial, sans-serif" fontSize="8.5" fontWeight="500">
        Adblock
      </text>
    </svg>
  )
}

function TransferMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        d="M3.4 8.2h13.4M13.6 5.1 17.3 8.2 13.6 11.3"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.6 15.8H7.2M10.4 12.7 6.7 15.8l3.7 3.1"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CardMark() {
  return (
    <svg viewBox="0 0 44 32" aria-hidden>
      <rect x="2" y="1.5" width="28" height="19" rx="3.2" fill="#a15ad0" />
      <rect x="11" y="8.5" width="31" height="21.5" rx="3.2" fill="#919191" />
      <rect x="14" y="13.2" width="25" height="4.6" rx="0.6" fill="#ededed" />
      <rect x="29.5" y="23" width="9" height="4.2" rx="1.1" fill="#f7f7f7" />
    </svg>
  )
}

function StoreMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        d="M5 10.5h14v8.2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8.2Z"
        fill="none"
        stroke="#fff"
        strokeWidth="1.6"
      />
      <path d="M4 10.5 6.2 6h11.6L20 10.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 19.7v-4.2h6v4.2" fill="none" stroke="#fff" strokeWidth="1.6" />
    </svg>
  )
}

function AccountsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="accounts">
      <header className="profile-top">
        <button type="button" className="profile-top__icon" aria-label="Back" onClick={onBack}>
          <ChevronLeft />
        </button>
        <button type="button" className="account-switch">
          Personal account
          <ChevronDown />
        </button>
        <span className="profile-top__spacer" aria-hidden />
      </header>
      <section className="profile-card">
        <ProfileBanner />
        <div className="profile-body">
          <div className="profile-avatar">
            <img src={profilePhoto} alt="" />
            <span className="profile-avatar__edit">
              <PencilIcon />
            </span>
          </div>
          <h1>Worley Clifton</h1>
          <p className="profile-handle">@Wclifton69</p>
          <p className="profile-meta">
            New Market, TN <span aria-hidden>·</span> Joined PayPal in 2023
          </p>
          <div className="profile-actions">
            <button type="button">
              <UserIcon />
              Contact info
            </button>
            <button type="button">
              <GearIcon />
              Settings
            </button>
          </div>
        </div>
      </section>

      <section className="menu-card">
        <button type="button" className="menu-row">
          <InviteIcon />
          <span>Invite friends</span>
          <span className="earn-badge">
            <StarIcon />
            Earn rewards
          </span>
        </button>
        <button type="button" className="menu-row">
          <HelpIcon />
          <span>Help</span>
        </button>
        <button type="button" className="menu-row">
          <SubscriptionsIcon />
          <span>Subscriptions</span>
        </button>
        <button type="button" className="menu-row">
          <MessageIcon />
          <span>Message Center</span>
        </button>
      </section>

      <button type="button" className="logout-btn">
        <LogoutIcon />
        Log out
      </button>

      <button type="button" className="legal-link">
        Legal agreements
      </button>
      <p className="app-version">Version 8.970</p>
    </div>
  )
}

type SuggestedContact = {
  name: string
  handle?: string
  email?: string
  phone?: string
  photo?: string
  tone?: 'black' | 'blue' | 'sky'
}

const suggestedContacts = sendContacts as SuggestedContact[]

function contactMatches(contact: SuggestedContact, search: string) {
  const digits = search.replace(/\D/g, '')
  const phone = (contact.phone ?? '').replace(/\D/g, '')
  const blob = `${contact.name} ${contact.handle ?? ''} ${contact.email ?? ''} ${contact.phone ?? ''}`.toLowerCase()
  return blob.includes(search) || (digits.length >= 3 && phone.includes(digits))
}

function contactLine(contact: SuggestedContact, search: string) {
  const digits = search.replace(/\D/g, '')
  const phone = (contact.phone ?? '').replace(/\D/g, '')
  if (digits.length >= 3 && phone.includes(digits)) return contact.phone
  return contact.handle ?? contact.email
}

function contactInitials(name: string) {
  const words = name.split(' ')
  return `${words[0][0]}${words[words.length - 1][0]}`
}

function ContactAvatar({ contact }: { contact: SuggestedContact }) {
  if (contact.photo) return <img className="send-row__avatar" src={contact.photo} alt="" />
  return <span className={`send-row__avatar send-row__avatar--${contact.tone}`}>{contactInitials(contact.name)}</span>
}

const currencies = [
  { code: 'USD', name: 'US Dollar', flag: 'us' },
  { code: 'AED', name: 'United Arab Emirates Dirham', flag: 'ae' },
  { code: 'ARS', name: 'Argentine Peso', flag: 'ar' },
  { code: 'AUD', name: 'Australian Dollar', flag: 'au' },
  { code: 'BAM', name: 'Bosnia-Herzegovina Convertible Mark', flag: 'ba' },
  { code: 'BDT', name: 'Bangladeshi Taka', flag: 'bd' },
  { code: 'BGN', name: 'Bulgarian Lev', flag: 'bg' },
  { code: 'BRL', name: 'Brazilian Real', flag: 'br' },
  { code: 'CAD', name: 'Canadian Dollar', flag: 'ca' },
  { code: 'CHF', name: 'Swiss Franc', flag: 'ch' },
  { code: 'CLP', name: 'Chilean Peso', flag: 'cl' },
  { code: 'CNY', name: 'Chinese Yuan', flag: 'cn' },
  { code: 'COP', name: 'Colombian Peso', flag: 'co' },
  { code: 'CZK', name: 'Czech Koruna', flag: 'cz' },
  { code: 'DKK', name: 'Danish Krone', flag: 'dk' },
  { code: 'DOP', name: 'Dominican Peso', flag: 'do' },
  { code: 'EGP', name: 'Egyptian Pound', flag: 'eg' },
  { code: 'EUR', name: 'Euro', flag: 'eu' },
  { code: 'GBP', name: 'British Pound', flag: 'gb' },
  { code: 'GHS', name: 'Ghanaian Cedi', flag: 'gh' },
  { code: 'GTQ', name: 'Guatemalan Quetzal', flag: 'gt' },
  { code: 'HKD', name: 'Hong Kong Dollar', flag: 'hk' },
  { code: 'HUF', name: 'Hungarian Forint', flag: 'hu' },
  { code: 'IDR', name: 'Indonesian Rupiah', flag: 'id' },
  { code: 'ILS', name: 'Israeli New Shekel', flag: 'il' },
  { code: 'INR', name: 'Indian Rupee', flag: 'in' },
  { code: 'JMD', name: 'Jamaican Dollar', flag: 'jm' },
  { code: 'JPY', name: 'Japanese Yen', flag: 'jp' },
  { code: 'KES', name: 'Kenyan Shilling', flag: 'ke' },
  { code: 'KRW', name: 'South Korean Won', flag: 'kr' },
  { code: 'LKR', name: 'Sri Lankan Rupee', flag: 'lk' },
  { code: 'MAD', name: 'Moroccan Dirham', flag: 'ma' },
  { code: 'MXN', name: 'Mexican Peso', flag: 'mx' },
  { code: 'MYR', name: 'Malaysian Ringgit', flag: 'my' },
  { code: 'NGN', name: 'Nigerian Naira', flag: 'ng' },
  { code: 'NOK', name: 'Norwegian Krone', flag: 'no' },
  { code: 'NPR', name: 'Nepalese Rupee', flag: 'np' },
  { code: 'NZD', name: 'New Zealand Dollar', flag: 'nz' },
  { code: 'PEN', name: 'Peruvian Sol', flag: 'pe' },
  { code: 'PHP', name: 'Philippine Peso', flag: 'ph' },
  { code: 'PKR', name: 'Pakistani Rupee', flag: 'pk' },
  { code: 'PLN', name: 'Polish Zloty', flag: 'pl' },
  { code: 'RON', name: 'Romanian Leu', flag: 'ro' },
  { code: 'SEK', name: 'Swedish Krona', flag: 'se' },
  { code: 'SGD', name: 'Singapore Dollar', flag: 'sg' },
  { code: 'THB', name: 'Thai Baht', flag: 'th' },
  { code: 'TRY', name: 'Turkish Lira', flag: 'tr' },
  { code: 'TWD', name: 'New Taiwan Dollar', flag: 'tw' },
  { code: 'UAH', name: 'Ukrainian Hryvnia', flag: 'ua' },
  { code: 'VND', name: 'Vietnamese Dong', flag: 'vn' },
  { code: 'ZAR', name: 'South African Rand', flag: 'za' },
]

function currencySymbol(code: string) {
  const parts = new Intl.NumberFormat('en-US', { style: 'currency', currency: code, currencyDisplay: 'narrowSymbol' }).formatToParts(0)
  return parts.find((part) => part.type === 'currency')?.value ?? code
}

function formatReviewMoney(draft: string, code: string) {
  const value = Number(draft)
  const amount = Number.isFinite(value) ? value : 0
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${code}`
}

const conversionFeeRate = 0.0291

function conversionFee(amount: number, payType: 'friends' | 'goods', currency: string) {
  if (!Number.isFinite(amount) || amount <= 0) return 0
  if (payType === 'friends' && currency === 'USD') return 0
  return Math.round(amount * conversionFeeRate * 100) / 100
}

function formatReviewFee(amount: number, code: string) {
  const text = amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return `$${text} ${code}`
}

function ReviewBankIcon() {
  return (
    <span className="send-review__bank">
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M3.2 10.2 12 4.4l8.8 5.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M6.2 10.6v6.2M10.1 10.6v6.2M13.9 10.6v6.2M17.8 10.6v6.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4.4 17.2h15.2M3.2 20h17.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  )
}

type PayMark = 'paypal' | 'bank' | 'spencer' | 'visa'

type PaySource = {
  id: string
  title: string
  lines: string[]
  fee: string | null
  mark: PayMark
}

const paySources: PaySource[] = [
  { id: 'balance', title: 'Balance', lines: ['PayPal'], fee: null, mark: 'paypal' },
  {
    id: 'bofa',
    title: 'BANK OF AMERICA, N.A.',
    lines: ['Checking •••• 0084', 'Bank of America, United States', 'No fee'],
    fee: null,
    mark: 'bank',
  },
  {
    id: 'idaho',
    title: 'BANK OF AMERICA NEW N.A. - IDAHO',
    lines: ['Checking •••• 0268', 'Bank of America, United States', 'No fee'],
    fee: null,
    mark: 'bank',
  },
  {
    id: 'spencer',
    title: 'Spencer Turnpike CC',
    lines: ['Credit •••• 0261', '• $0.33 fee'],
    fee: '0.33',
    mark: 'spencer',
  },
  {
    id: 'visa',
    title: 'Bank United/First Cash Rewards Visa',
    lines: ['Credit •••• 7734', '• $0.33 fee'],
    fee: '0.33',
    mark: 'visa',
  },
]

function isAddedBank(account: LinkedAccount): account is Extract<LinkedAccount, { kind: 'bank' }> {
  return account.kind === 'bank' && !defaultLinkedAccounts.some((linked) => accountKey(linked) === accountKey(account))
}

function bankPaySource(account: Extract<LinkedAccount, { kind: 'bank' }>): PaySource {
  const name = account.nickname ?? bankName(account.bank)
  return {
    id: accountKey(account),
    title: name.toUpperCase(),
    lines: [`${account.type} •••• ${account.last4}`, `${bankName(account.bank)}, United States`, 'No fee'],
    fee: null,
    mark: 'bank',
  }
}

function PaySourceMark({ mark }: { mark: PayMark }) {
  if (mark === 'bank') return <ReviewBankIcon />
  if (mark === 'paypal') {
    return <img className="pay-mark pay-mark--paypal" src={paypalMark} alt="" />
  }
  const art = mark === 'spencer' ? amexBusinessCashArt : bofaUnlimitedCashArt
  return <img className="pay-mark pay-mark--card" src={art} alt="" />
}

function GoodsTypeIcon() {
  return (
    <svg className="pay-type__goods" viewBox="0 0 32 32" aria-hidden>
      <rect width="32" height="32" rx="8" fill="#009cde" />
      <rect x="9" y="7.5" width="14" height="17" rx="1.6" fill="none" stroke="#fff" strokeWidth="1.6" />
      <path d="M12.2 12.2h7.6M12.2 16h7.6M12.2 19.8h5" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function FriendsFamilyIcon({ className = 'send-review__people' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <circle cx="16.2" cy="7.4" r="2.15" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12.6 16.8v-.4a3.2 3.2 0 0 1 3.2-3.2h.8a3.2 3.2 0 0 1 3.2 3.2v.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="8.1" cy="8.6" r="2.45" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2.8 18.6v-.5a4 4 0 0 1 4-4h2.6a4 4 0 0 1 4 4v.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

type KeyboardLayout = 'letters' | 'numbers' | 'symbols'

const keyboardRows: Record<KeyboardLayout, string[]> = {
  letters: ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'],
  numbers: ['1234567890', '-/:;()$&@"', ".,?!'"],
  symbols: ['[]{}#%^*+=', '_\\|~<>€£¥•', ".,?!'"],
}

function IosKeyboard({
  empty,
  onText,
  onDelete,
  onReturn,
}: {
  empty: boolean
  onText: (text: string) => void
  onDelete: () => void
  onReturn: () => void
}) {
  const [layout, setLayout] = useState<KeyboardLayout>('letters')
  const [shift, setShift] = useState<'auto' | 'on' | 'off'>('auto')
  const upper = layout === 'letters' && (shift === 'on' || (shift === 'auto' && empty))
  const [top, middle, bottom] = keyboardRows[layout]

  function key(char: string) {
    const label = upper ? char.toUpperCase() : char
    return (
      <button
        key={char}
        type="button"
        className="ios-kb__key"
        onClick={() => {
          onText(label)
          setShift('auto')
        }}
      >
        {label}
      </button>
    )
  }

  return (
    <div className={`ios-kb ios-kb--${layout}`} onPointerDown={(e) => e.preventDefault()}>
      <div className="ios-kb__row">{[...top].map(key)}</div>
      <div className="ios-kb__row ios-kb__row--middle">{[...middle].map(key)}</div>
      <div className="ios-kb__row">
        {layout === 'letters' ? (
          <button
            type="button"
            className={upper ? 'ios-kb__key ios-kb__key--fn ios-kb__key--shift ios-kb__key--on' : 'ios-kb__key ios-kb__key--fn ios-kb__key--shift'}
            aria-label="Shift"
            aria-pressed={upper}
            onClick={() => setShift(upper ? 'off' : 'on')}
          >
            <ShiftIcon on={upper} />
          </button>
        ) : (
          <button
            type="button"
            className="ios-kb__key ios-kb__key--fn ios-kb__key--shift"
            onClick={() => setLayout(layout === 'numbers' ? 'symbols' : 'numbers')}
          >
            {layout === 'numbers' ? '#+=' : '123'}
          </button>
        )}
        <span className="ios-kb__group">{[...bottom].map(key)}</span>
        <button type="button" className="ios-kb__key ios-kb__key--fn ios-kb__key--delete" aria-label="Delete" onClick={onDelete}>
          <KeypadDeleteIcon />
        </button>
      </div>
      <div className="ios-kb__row">
        <button
          type="button"
          className="ios-kb__key ios-kb__key--fn ios-kb__key--mode"
          onClick={() => setLayout(layout === 'letters' ? 'numbers' : 'letters')}
        >
          {layout === 'letters' ? '123' : 'ABC'}
        </button>
        <button type="button" className="ios-kb__key ios-kb__key--space" onClick={() => onText(' ')}>
          space
        </button>
        <button type="button" className="ios-kb__key ios-kb__key--fn ios-kb__key--mode" onClick={onReturn}>
          return
        </button>
      </div>
      <div className="ios-kb__bar" aria-hidden>
        <EmojiIcon />
        <MicIcon />
      </div>
    </div>
  )
}

function CurrencySheet({ value, onPick, onClose }: { value: string; onPick: (code: string) => void; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [typing, setTyping] = useState(false)
  const [closing, setClosing] = useState(false)
  const input = useRef<HTMLInputElement>(null)
  const timer = useRef<number | null>(null)
  const search = query.trim().toLowerCase()
  const list = search
    ? currencies.filter((entry) => entry.name.toLowerCase().includes(search) || entry.code.toLowerCase().startsWith(search))
    : currencies

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current)
    }
  }, [])

  function close() {
    if (timer.current !== null) return
    input.current?.blur()
    setClosing(true)
    timer.current = window.setTimeout(onClose, 250)
  }

  return (
    <div className={closing ? 'sheet-backdrop sheet-backdrop--closing' : 'sheet-backdrop'} onClick={close}>
      <div
        className="sheet currency-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="currency-title"
        onClick={(e) => {
          e.stopPropagation()
          if (e.target === e.currentTarget) input.current?.blur()
        }}
      >
        <div className="currency-sheet__head">
          <h2 id="currency-title">Choose a currency</h2>
          <button type="button" className="sheet__close currency-sheet__close" aria-label="Close" onClick={close}>
            <CloseIcon />
          </button>
        </div>
        <input
          ref={input}
          className="currency-sheet__search"
          type="search"
          inputMode="none"
          placeholder="Search"
          aria-label="Search currencies"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setTyping(true)}
          onBlur={() => setTyping(false)}
          onPointerDown={() => setTyping(true)}
        />
        <div className="currency-sheet__list" role="radiogroup" aria-labelledby="currency-title">
          {list.map((entry) => (
            <button
              key={entry.code}
              type="button"
              role="radio"
              aria-checked={entry.code === value}
              className="currency-sheet__row"
              onClick={() => {
                onPick(entry.code)
                close()
              }}
            >
              <img className="currency-sheet__flag" src={`https://flagcdn.com/w80/${entry.flag}.png`} alt="" />
              <span>{entry.name}</span>
              {entry.code === value && <SelectedCheckIcon />}
            </button>
          ))}
        </div>
        {typing && (
          <IosKeyboard
            empty={query === ''}
            onText={(text) => setQuery((current) => current + text)}
            onDelete={() => setQuery((current) => current.slice(0, -1))}
            onReturn={() => input.current?.blur()}
          />
        )}
      </div>
    </div>
  )
}

function SendAmount({
  contact,
  banks,
  payKey,
  leaving,
  onBack,
  onSent,
  onLinkBank,
}: {
  contact: SuggestedContact
  banks: Extract<LinkedAccount, { kind: 'bank' }>[]
  payKey: string | null
  leaving: boolean
  onBack: () => void
  onSent: (payment: SentPayment) => void
  onLinkBank: () => void
}) {
  const [draft, setDraft] = useState('')
  const [note, setNote] = useState('')
  const [typing, setTyping] = useState(false)
  const [currency, setCurrency] = useState('USD')
  const [picking, setPicking] = useState(false)
  const [reviewing, setReviewing] = useState(false)
  const [paying, setPaying] = useState(false)
  const [choosingType, setChoosingType] = useState(false)
  const [payType, setPayType] = useState<'friends' | 'goods'>('friends')
  const [payId, setPayId] = useState<string | null>('idaho')
  const [payDraft, setPayDraft] = useState('idaho')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const sendWait = useRef<number | null>(null)
  const symbol = currencySymbol(currency)
  const canSend = parseAmountDraft(draft) !== null
  const sources = [...paySources, ...banks.map(bankPaySource)]
  const paySource = sources.find((source) => source.id === payId) ?? null
  const amount = Number(draft || 0)
  const payFee = conversionFee(amount, payType, currency)
  const total = amount + payFee
  const firstName = contact.name.split(' ')[0]
  const payingWithBalance = !paySource || paySource.id === 'balance'

  useEffect(() => {
    return () => {
      if (sendWait.current !== null) window.clearTimeout(sendWait.current)
    }
  }, [])

  useEffect(() => {
    if (!payKey) return
    setPayDraft(payKey)
    setPayId(payKey)
    setPaying(true)
    document.getElementById(`pay-source-${payKey}`)?.scrollIntoView({ block: 'nearest' })
  }, [payKey])

  function confirmSend() {
    if (sending || sent || sendWait.current !== null) return
    const cents = Math.round(amount * 100)
    const feeCents = Math.round(payFee * 100)
    setSending(true)
    sendWait.current = window.setTimeout(() => {
      sendWait.current = null
      setSending(false)
      setSent(true)
      onSent({
        id: Date.now(),
        name: contact.name,
        photo: contact.photo,
        initials: contactInitials(contact.name),
        cents,
        feeCents,
        note,
        type: payType,
        sourceId: payId,
        createdAt: Date.now(),
      })
    }, 600)
  }

  useEffect(() => {
    if (!typing) return
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (/^[0-9.]$/.test(e.key)) setDraft((current) => typeAmountKey(current, e.key))
      else if (e.key === 'Backspace') setDraft((current) => current.slice(0, -1))
      else return
      e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [typing])

  return (
    <div
      className={['send-amount', typing && 'send-amount--typing', reviewing && 'send-amount--review', leaving && 'send-amount--leaving'].filter(Boolean).join(' ')}
      role="dialog"
      aria-modal="true"
      aria-labelledby="send-amount-title"
    >
      <div className="card-form__head">
        <button type="button" className="card-form__back" aria-label="Back" onClick={onBack}>
          <ArrowLeftIcon />
        </button>
        <h2 id="send-amount-title">Amount</h2>
      </div>

      <div className="send-amount__to">
        <ContactAvatar contact={contact} />
        <span className="send-row__text">
          <strong>{contact.name}</strong>
          {contact.handle && <small>{contact.handle}</small>}
        </span>
      </div>

      <div className="send-amount__row">
        <button
          type="button"
          className="send-amount__value"
          aria-label={draft ? `Amount ${symbol}${formatGroupedAmount(draft)}` : 'Amount'}
          onClick={() => {
            if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
            setTyping(true)
          }}
        >
          <span>
            {symbol}
            {formatGroupedAmount(draft)}
          </span>
          {typing && <span className="card-form__caret" />}
        </button>
        <button
          type="button"
          className="send-amount__currency"
          aria-label={`Currency ${currency}, change`}
          onClick={() => {
            setTyping(false)
            setPicking(true)
          }}
        >
          {currency}
          <ChevronDown />
        </button>
      </div>

      <div className="send-amount__space" onClick={() => setTyping(false)} />

      <input
        className="send-amount__note"
        placeholder="Add a note"
        aria-label="Add a note"
        maxLength={140}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onFocus={() => setTyping(false)}
        onPointerDown={() => setTyping(false)}
      />

      <div className="send-amount__actions">
        <button type="button">Request</button>
        <button
          type="button"
          disabled={!canSend}
          onClick={() => {
            setTyping(false)
            setReviewing(true)
          }}
        >
          Send
        </button>
      </div>

      {reviewing && (
        <div className="send-review" role="dialog" aria-modal="true" aria-labelledby="send-review-title">
          <div className="send-review__head">
            <button type="button" className="send-review__icon" aria-label="Back" onClick={() => setReviewing(false)}>
              <ArrowLeftIcon />
            </button>
            <h2 id="send-review-title">Review</h2>
            <button type="button" className="send-review__icon send-review__close" aria-label="Close" onClick={() => setReviewing(false)}>
              <CloseIcon />
            </button>
          </div>

          <div className="send-review__body">
            <button
              type="button"
              className="send-review__source"
              onClick={() => {
                setPayDraft(payId ?? 'idaho')
                setPaying(true)
              }}
            >
              {payingWithBalance ? <PaySourceMark mark="paypal" /> : paySource ? <PaySourceMark mark={paySource.mark} /> : <ReviewBankIcon />}
              <span className="send-review__source-text">
                {payingWithBalance ? (
                  <>
                    <strong>Paypal balance</strong>
                    <span>Preferred</span>
                  </>
                ) : paySource ? (
                  <>
                    <strong>{paySource.title}</strong>
                    {paySource.lines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </>
                ) : null}
              </span>
              <ChevronRight />
            </button>

            <button type="button" className="send-review__type" onClick={() => setChoosingType(true)}>
              {payType === 'goods' ? <GoodsTypeIcon /> : <FriendsFamilyIcon />}
              <strong>{payType === 'goods' ? 'Goods and Services' : 'Friends and Family'}</strong>
              <ChevronRight />
            </button>
            <p className="send-review__protect">
              {payType === 'goods'
                ? 'Purchase Protection applies for this payment.'
                : 'Purchase Protection doesn’t apply for this payment.'}
            </p>
            <p className="send-review__more">More on Purchase Protection</p>

            <div className="send-review__line">
              <span>
                PayPal fee
                <InfoIcon />
              </span>
              <span>{formatReviewFee(payFee, currency)}</span>
            </div>
            <div className="send-review__line send-review__line--total">
              <span>Total</span>
              <span>{formatReviewMoney(total.toFixed(2), currency)}</span>
            </div>
            <div className="send-review__line">
              <span>Estimated delivery</span>
              <span className="send-review__when">In seconds</span>
            </div>
          </div>

          <button type="button" className="send-review__send" disabled={sending} onClick={confirmSend}>
            {sending ? 'Sending' : 'Send'}
          </button>
        </div>
      )}

      {paying && (
        <div className="pay-sheet" role="dialog" aria-modal="true" aria-labelledby="pay-sheet-title">
          <div className="pay-sheet__head">
            <button type="button" className="send-review__icon" aria-label="Back" onClick={() => setPaying(false)}>
              <ArrowLeftIcon />
            </button>
            <h2 id="pay-sheet-title">How do you want to pay?</h2>
            <button type="button" className="send-review__icon" aria-label="Close" onClick={() => setPaying(false)}>
              <CloseIcon />
            </button>
          </div>
          <p className="pay-sheet__note">We’ll move money for the real time.</p>
          <div className="pay-sheet__list" role="radiogroup" aria-labelledby="pay-sheet-title">
            {sources.map((source) => (
              <button
                key={source.id}
                id={`pay-source-${source.id}`}
                type="button"
                role="radio"
                aria-checked={source.id === payDraft}
                className="pay-sheet__row"
                onClick={() => setPayDraft(source.id)}
              >
                <PaySourceMark mark={source.mark} />
                <span className="pay-sheet__text">
                  <strong>{source.title}</strong>
                  {source.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>
                {source.id === payDraft && (
                  <svg className="pay-sheet__check" viewBox="0 0 24 24" aria-hidden>
                    <path d="M5 12.2 9.2 16.6 19 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            ))}
            <button type="button" className="pay-sheet__row pay-sheet__link" onClick={onLinkBank}>
              <span className="pay-sheet__link-icon">
                <BankIcon />
                <svg className="pay-sheet__link-plus" viewBox="0 0 8 8" aria-hidden>
                  <path d="M4 0.8v6.4M0.8 4h6.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </span>
              <span className="pay-sheet__text">
                <strong>Link a bank</strong>
              </span>
            </button>
          </div>
          <button
            type="button"
            className="pay-sheet__done"
            onClick={() => {
              setPayId(payDraft)
              setPaying(false)
            }}
          >
            Done
          </button>
        </div>
      )}

      {choosingType && (
        <div className="pay-type" role="dialog" aria-modal="true" aria-labelledby="pay-type-title">
          <span className="send-review__grabber" aria-hidden />
          <div className="pay-sheet__head">
            <button type="button" className="send-review__icon" aria-label="Back" onClick={() => setChoosingType(false)}>
              <ArrowLeftIcon />
            </button>
            <h2 id="pay-type-title">Payment type</h2>
            <button type="button" className="send-review__icon" aria-label="Close" onClick={() => setChoosingType(false)}>
              <CloseIcon />
            </button>
          </div>
          <p className="pay-type__note">
            We’ll save this for all payments to {contact.name.split(' ')[0]}. You can change this on the review screen.
          </p>
          <div className="pay-type__list" role="radiogroup" aria-labelledby="pay-type-title">
            <div className="pay-type__option">
              <button
                type="button"
                role="radio"
                aria-checked={payType === 'goods'}
                className="pay-type__choice"
                onClick={() => {
                  setPayType('goods')
                  setChoosingType(false)
                }}
              >
                <GoodsTypeIcon />
                <span className="pay-type__text">
                  <strong>For goods and services</strong>
                  <span>
                    Add a U.S. address (if on eligible items) gets lost or damaged. Seller, buyer and Purchase Protection.
                  </span>
                </span>
                {payType === 'goods' && (
                  <svg className="pay-type__check" viewBox="0 0 24 24" aria-hidden>
                    <path d="M5 12.2 9.2 16.6 19 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <button type="button" className="pay-type__more">
                More on Purchase Protection
              </button>
            </div>
            <button
              type="button"
              role="radio"
              aria-checked={payType === 'friends'}
              className="pay-type__choice"
              onClick={() => {
                setPayType('friends')
                setChoosingType(false)
              }}
            >
              <FriendsFamilyIcon className="pay-type__people" />
              <span className="pay-type__text">
                <strong>For friends and family</strong>
                <span>Purchase Protection doesn’t apply for this payment.</span>
              </span>
              {payType === 'friends' && (
                <svg className="pay-type__check" viewBox="0 0 24 24" aria-hidden>
                  <path d="M5 12.2 9.2 16.6 19 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}

      {typing && (
        <NumberPad
          onDigit={(digit) => setDraft((current) => typeAmountKey(current, digit))}
          onDot={() => setDraft((current) => typeAmountKey(current, '.'))}
          onDelete={() => setDraft((current) => current.slice(0, -1))}
        />
      )}

      {picking && <CurrencySheet value={currency} onPick={setCurrency} onClose={() => setPicking(false)} />}

      {sent && (
        <div className="send-done" role="dialog" aria-modal="true" aria-labelledby="send-done-title">
          <div className="send-done__copy">
            <h2 id="send-done-title">
              You sent {formatReviewMoney(total.toFixed(2), currency)}
              <span>to {contact.name}</span>
            </h2>
            <p>
              We'll let {firstName} know right away that you sent money. You can see the details in your Activity in case you need them later.
            </p>
          </div>
          <button type="button" className="send-done__done" onClick={onBack}>
            Done
          </button>
          <button
            type="button"
            className="send-done__more"
            onClick={() => {
              setSent(false)
              setReviewing(false)
              setSending(false)
              setDraft('')
              setNote('')
            }}
          >
            Send More
          </button>
        </div>
      )}
    </div>
  )
}

function SendRequestPage({ onProfile, onPick }: { onProfile: () => void; onPick: (contact: SuggestedContact) => void }) {
  const [query, setQuery] = useState('')
  const search = query.trim().toLowerCase()
  const contacts = search ? suggestedContacts.filter((contact) => contactMatches(contact, search)) : suggestedContacts

  return (
    <>
      <header className="top-header">
        <button type="button" className="icon-btn" aria-label="Menu">
          <MenuIcon />
        </button>
        <div className="top-header__actions">
          <button type="button" className="icon-btn icon-btn--ghost" aria-label="Scan QR code">
            <QrCodeIcon />
          </button>
          <button type="button" className="icon-btn icon-btn--ghost profile-pic" aria-label="Profile" onClick={onProfile}>
            <img src={profilePhoto} alt="" />
          </button>
        </div>
      </header>
      <div className="send">
        <h1>Send and Request</h1>
        <div className="send-search">
          <label className="send-search__field">
            <svg viewBox="0 0 20 20" aria-hidden>
              <circle cx="9" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M13.2 13.2 17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              placeholder="Name, username, email, mobile"
              aria-label="Name, username, email, mobile"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <button type="button" className="send-search__more" aria-label="More options">
            <MoreVerticalIcon />
          </button>
        </div>

        <section className="send-list" aria-labelledby="send-suggested">
          <h2 id="send-suggested">{search ? 'Results' : 'Suggested'}</h2>
          {search && contacts.length === 0 && <p className="send-empty">No matches for “{query.trim()}”</p>}
          {!search && (
            <div className="send-row">
              <button type="button" className="send-row__main">
                <span className="send-row__avatar send-row__avatar--blue">
                  <MoneyLinkIcon />
                </span>
                <span className="send-row__text">
                  <strong>Send and request money with a link</strong>
                  <small>Share it over text, email, or any app.</small>
                </span>
              </button>
              <button type="button" className="send-row__info" aria-label="About payment links">
                <HelpCircleIcon />
              </button>
            </div>
          )}
          {contacts.map((contact) => (
            <div key={contact.name} className="send-row">
              <button type="button" className="send-row__main" onClick={() => onPick(contact)}>
                <ContactAvatar contact={contact} />
                <span className="send-row__text">
                  <strong>{contact.name}</strong>
                  {contactLine(contact, search) && <small>{contactLine(contact, search)}</small>}
                </span>
              </button>
              <button type="button" className="send-row__info" aria-label={`About ${contact.name}`}>
                <InfoIcon />
              </button>
            </div>
          ))}
        </section>
      </div>
    </>
  )
}

function JustAMoment() {
  return (
    <div className="moment" role="status" aria-live="polite" aria-label="Just a moment">
      <span className="moment__bar" aria-hidden />
      <div className="moment__center">
        <svg className="moment__spin" viewBox="0 0 48 48" aria-hidden>
          <circle
            cx="24"
            cy="24"
            r="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.35"
            strokeLinecap="round"
            strokeDasharray="74 27"
          />
        </svg>
        <p>Just a moment...</p>
      </div>
    </div>
  )
}

function WelcomeBack({ onDone, onFaceId }: { onDone: () => void; onFaceId: () => void }) {
  const [phase, setPhase] = useState<'moment' | 'wait' | 'scan' | 'done' | 'leaving'>('moment')
  const onDoneRef = useRef(onDone)
  const onFaceIdRef = useRef(onFaceId)
  onDoneRef.current = onDone
  onFaceIdRef.current = onFaceId

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase('wait'), 3800),
      window.setTimeout(() => {
        setPhase('scan')
        onFaceIdRef.current()
      }, 5400),
      window.setTimeout(() => setPhase('done'), 7400),
      window.setTimeout(() => setPhase('leaving'), 9000),
      window.setTimeout(() => onDoneRef.current(), 9400),
    ]
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [])

  if (phase === 'moment') return <JustAMoment />

  const scanning = phase === 'scan' || phase === 'done' || phase === 'leaving'

  return (
    <div
      className={['welcome', scanning ? 'welcome--scan' : '', phase === 'leaving' ? 'welcome--leaving' : '']
        .filter(Boolean)
        .join(' ')}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      <div className="welcome__body">
        <img className="welcome__logo" src={paypalMark} alt="" />
        <h1 id="welcome-title">Welcome back, Worley!</h1>
        <div className="welcome__account">
          <img className="welcome__avatar" src={profilePhoto} alt="" />
          <span>wc******9@gmail.com</span>
          <button type="button" className="welcome__edit" aria-label="Edit account">
            <PencilIcon />
          </button>
        </div>
      </div>
      <span className="welcome__spinner" aria-hidden />
    </div>
  )
}

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [entered, setEntered] = useState(false)
  const [target, setTarget] = useState<Screen | null>(null)
  const [loading, setLoading] = useState<'in' | 'out' | null>(null)
  const [walletSheet, setWalletSheet] = useState<WalletStep | null>(null)
  const [addMoneyOpen, setAddMoneyOpen] = useState(false)
  const [balanceOpen, setBalanceOpen] = useState(false)
  const [addMoneyLeaving, setAddMoneyLeaving] = useState(false)
  const [sendTo, setSendTo] = useState<SuggestedContact | null>(null)
  const [sendLeaving, setSendLeaving] = useState(false)
  const [sentPayments, setSentPayments] = useState<SentPayment[]>(loadSentPayments)
  const [linkedAccounts, setLinkedAccounts] = useState<LinkedAccount[]>(defaultLinkedAccounts)
  const [addedSourceKey, setAddedSourceKey] = useState<string | null>(null)
  const [sendPayKey, setSendPayKey] = useState<string | null>(null)
  const [addMoney, setAddMoney] = useState<AddMoneyTransfer[]>(loadAddMoneyTransfers)
  const [now, setNow] = useState(() => Date.now())
  const [syncedAt, setSyncedAt] = useState(loadSyncedAt)
  const [syncing, setSyncing] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null)
  const timer = useRef<number | null>(null)
  const syncTimer = useRef<number | null>(null)
  const addMoneyTimer = useRef<number | null>(null)
  const sendTimer = useRef<number | null>(null)
  const refreshingRef = useRef(false)
  const collapsePull = useRef(() => {})
  const phoneRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const [faceIdPlayKey, setFaceIdPlayKey] = useState<number | null>(null)
  const startFaceId = useCallback(() => {
    setFaceIdPlayKey((key) => (key ?? 0) + 1)
  }, [])
  const finishFaceId = useCallback(() => {
    setFaceIdPlayKey(null)
  }, [])
  const active = target ?? screen
  const synced = addMoney.filter((entry) => entry.createdAt <= syncedAt)
  const spentFromBalance = sentPayments
    .filter((payment) => payment.sourceId === 'balance')
    .reduce((sum, payment) => sum + payment.cents + payment.feeCents, 0)
  const balance = formatUsd(
    startingBalanceCents +
      synced.filter((entry) => entry.availableAt <= syncedAt).reduce((sum, entry) => sum + entry.cents, 0) -
      spentFromBalance,
  )

  useEffect(() => {
    syncTimer.current = window.setTimeout(() => {
      setSyncedAt(Date.now())
      setSyncing(false)
      syncTimer.current = null
    }, 1500 + Math.random() * 1500)
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current)
      if (syncTimer.current !== null) window.clearTimeout(syncTimer.current)
      if (addMoneyTimer.current !== null) window.clearTimeout(addMoneyTimer.current)
      if (sendTimer.current !== null) window.clearTimeout(sendTimer.current)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(syncedAtStorageKey, String(syncedAt))
  }, [syncedAt])

  useEffect(() => {
    if (!toast) return
    const id = window.setTimeout(() => setToast(null), 10000)
    return () => window.clearTimeout(id)
  }, [toast])

  useEffect(() => {
    const el = screenRef.current
    const phone = phoneRef.current
    if (!el || !phone) return
    let startY: number | null = null
    let pull = 0
    let dragging = false
    let settle: number | null = null

    const setPull = (px: number, animate: boolean) => {
      if (settle !== null) window.clearTimeout(settle)
      settle = null
      phone.classList.add('phone--ptr')
      phone.classList.toggle('phone--ptr-settle', animate)
      phone.style.setProperty('--pull', `${px}px`)
      phone.style.setProperty('--pull-progress', `${Math.min(px / pullTrigger, 1)}`)
      if (px === 0) settle = window.setTimeout(() => phone.classList.remove('phone--ptr', 'phone--ptr-settle'), 320)
    }
    const begin = (y: number) => {
      if (refreshingRef.current || el.scrollTop > 0) return
      startY = y
      pull = 0
    }
    const move = (y: number, e: Event) => {
      if (startY === null) return
      const dy = y - startY
      if (!dragging && dy < 6) {
        if (dy < 0) startY = null
        return
      }
      dragging = true
      if (e.cancelable) e.preventDefault()
      pull = Math.max(0, dy < 120 ? dy * 0.55 : 66 + (dy - 120) * 0.2)
      setPull(pull, false)
    }
    const end = () => {
      if (startY === null) return
      startY = null
      if (!dragging) return
      dragging = false
      window.addEventListener('click', swallowClick, { capture: true, once: true })
      window.setTimeout(() => window.removeEventListener('click', swallowClick, { capture: true }), 0)
      if (pull >= pullTrigger) {
        setPull(el.dataset.refresh === 'inline' ? 0 : pullHold, true)
        refreshingRef.current = true
        setRefreshing(true)
      } else setPull(0, true)
    }
    const swallowClick = (e: MouseEvent) => e.stopPropagation()
    const onTouchStart = (e: TouchEvent) => begin(e.touches[0].clientY)
    const onTouchMove = (e: TouchEvent) => move(e.touches[0].clientY, e)
    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 0) begin(e.clientY)
    }
    const onMouseMove = (e: MouseEvent) => move(e.clientY, e)
    collapsePull.current = () => setPull(0, true)

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', end)
    el.addEventListener('touchcancel', end)
    el.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', end)
    return () => {
      if (settle !== null) window.clearTimeout(settle)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', end)
      el.removeEventListener('touchcancel', end)
      el.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', end)
    }
  }, [])

  useEffect(() => {
    if (!refreshing) return
    const id = window.setTimeout(() => {
      const time = Date.now()
      setSyncedAt(time)
      setNow(time)
      refreshingRef.current = false
      setRefreshing(false)
      collapsePull.current()
    }, 1200 + Math.random() * 1200)
    return () => window.clearTimeout(id)
  }, [refreshing])

  useEffect(() => {
    localStorage.setItem(addMoneyStorageKey, JSON.stringify(addMoney))
  }, [addMoney])

  useEffect(() => {
    localStorage.setItem(sentStorageKey, JSON.stringify(sentPayments))
  }, [sentPayments])

  useEffect(() => {
    if (screen !== 'activity') return
    const tick = () => setNow(Date.now())
    const id = window.setInterval(tick, 1000)
    const onVisible = () => {
      if (document.visibilityState === 'visible') tick()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [screen])

  function finishNavigation(next: Screen | null) {
    if (timer.current !== null) window.clearTimeout(timer.current)
    setTarget(next)
    setLoading('in')
    timer.current = window.setTimeout(() => {
      setNow(Date.now())
      if (next) {
        setScreen(next)
        screenRef.current?.scrollTo(0, 0)
      }
      setTarget(null)
      setLoading('out')
      timer.current = window.setTimeout(() => {
        setLoading(null)
        timer.current = null
      }, 200)
    }, 700)
  }

  function openAddMoney() {
    if (addMoneyTimer.current !== null) window.clearTimeout(addMoneyTimer.current)
    addMoneyTimer.current = null
    setNow(Date.now())
    setAddMoneyLeaving(false)
    setAddMoneyOpen(true)
  }

  function closeAddMoney() {
    if (addMoneyTimer.current !== null) return
    setAddMoneyLeaving(true)
    addMoneyTimer.current = window.setTimeout(() => {
      setAddMoneyOpen(false)
      setAddMoneyLeaving(false)
      setAddedSourceKey(null)
      setNow(Date.now())
      addMoneyTimer.current = null
    }, 350)
  }

  function openSend(contact: SuggestedContact) {
    if (sendTimer.current !== null) window.clearTimeout(sendTimer.current)
    sendTimer.current = null
    setSendLeaving(false)
    setSendTo(contact)
  }

  function closeSend() {
    if (sendTimer.current !== null) return
    setSendLeaving(true)
    sendTimer.current = window.setTimeout(() => {
      setSendTo(null)
      setSendLeaving(false)
      setSendPayKey(null)
      sendTimer.current = null
    }, 350)
  }

  function go(next: Screen) {
    if (next === active) return
    finishNavigation(next)
  }

  return (
    <div
      className="phone"
      ref={phoneRef}
      data-pushed={(addMoneyOpen && !addMoneyLeaving) || (sendTo && !sendLeaving) ? '' : undefined}
      data-faceid={faceIdPlayKey !== null ? '' : undefined}
    >
      {faceIdPlayKey !== null && (
        <FaceIdOverlay playKey={faceIdPlayKey} onFinished={finishFaceId} />
      )}
      <div className={refreshing && screen !== 'accounts' ? 'ptr ptr--spinning' : 'ptr'}>
        <IosSpinner />
      </div>
      <div
        ref={screenRef}
        data-refresh={screen === 'accounts' ? 'inline' : undefined}
        className={
          screen === 'home'
            ? 'screen screen--home'
            : screen === 'accounts' || screen === 'activity' || screen === 'send'
              ? 'screen screen--accounts screen--wallet'
              : 'screen screen--accounts'
        }
      >
        {screen === 'profile' ? (
          <AccountsScreen onBack={() => go('home')} />
        ) : screen === 'accounts' ? (
          <AccountsPage
            balance={balance}
            loading={syncing || refreshing}
            linkedAccounts={linkedAccounts}
            onAddBanks={() => setWalletSheet('add')}
            onAddMoney={openAddMoney}
          />
        ) : screen === 'activity' ? (
          <ActivityPage addMoney={addMoney} sent={sentPayments} now={now} />
        ) : screen === 'send' ? (
          <SendRequestPage onProfile={() => go('profile')} onPick={openSend} />
        ) : (
          <>
        <header className="top-header">
          <button type="button" className="icon-btn" aria-label="Menu">
            <MenuIcon />
          </button>
          <div className="top-header__actions">
            <button
              type="button"
              className="icon-btn icon-btn--ghost profile-pic"
              aria-label="Profile"
              onClick={() => go('profile')}
            >
              <img src={profilePhoto} alt="" />
            </button>
          </div>
        </header>

        <div className="balance-carousel">
          <article className="balance-card">
            <button type="button" className="balance-card__top" onClick={() => setBalanceOpen(true)}>
              <div className="balance-card__brand">
                <PayPalLogo size={36} />
                <span>PayPal balance</span>
              </div>
              <p className="balance-card__amount">{balance}</p>
            </button>
            <button type="button" className="balance-card__promo" onClick={openAddMoney}>
              <span className="balance-card__promo-icon">
                <CardChipIcon />
              </span>
              <span className="balance-card__promo-text">
                <strong>Add money</strong>
                <small>Spend it online or in stores</small>
              </span>
              <ChevronRight />
            </button>
          </article>

          <article className="balance-card balance-card--crypto">
            <div>
              <h3>Crypto</h3>
              <p>Buy, sell, Bitcoin, and more</p>
            </div>
            <div className="crypto-chart" aria-hidden>
              <span />
              <span />
              <span />
            </div>
          </article>
        </div>

        <section className="section section--offers">
          <SectionHeader title="Featured Offers" />
          <div className="offer-carousel">
            <article className="offer-card offer-card--perplexity">
              <div className="offer-card__brand">
                <PerplexityLogo />
                Perplexity Pro
              </div>
              <div className="offer-card__bottom">
                <div className="offer-card__copy">
                  <h3>Free for 1 year</h3>
                  <p>when you subscribe and link ...</p>
                </div>
                <button type="button" className="offer-card__save">
                  Save
                </button>
              </div>
            </article>
            <article className="offer-card">
              <div className="offer-card__brand">
                <GrammarlyLogo />
                Grammarly
              </div>
              <div className="offer-card__bottom">
                <div className="offer-card__copy">
                  <h3>10% cash back</h3>
                  <p>on your subscription</p>
                </div>
                <button type="button" className="offer-card__save">
                  Save
                </button>
              </div>
            </article>
          </div>
          <p className="offer-disclaimer">
            Terms &amp; exclusions may apply. Check offers for details.
          </p>
        </section>

        <section className="section section--stores">
          <SectionHeader title="Stores with Pay Later" />
          <div className="stores-row">
            <div className="store-tile">
              <TargetLogo />
              <span>Target</span>
              <button type="button" className="store-shop">
                Shop
              </button>
            </div>
            <div className="store-tile">
              <HomeDepotLogo />
              <span>The Home Depot</span>
              <button type="button" className="store-shop">
                Shop
              </button>
            </div>
            <div className="store-tile">
              <BathBodyLogo />
              <span>Bath &amp; Body Works</span>
              <button type="button" className="store-shop">
                Shop
              </button>
            </div>
          </div>
        </section>

        <section className="section">
          <SectionHeader title="Link now, pay faster next time" />
          <p className="section-lead">Just sign in and save PayPal as the way you pay</p>
          <div className="link-row">
            <div className="link-card link-card--dash">
              <DoorDashMark />
            </div>
            <div className="link-card link-card--uber">
              <span className="uber-badge">
                <svg viewBox="0 0 24 24" aria-hidden>
                  <path
                    fill="#111"
                    d="M0 7.97v4.958c0 1.867 1.302 3.101 3 3.101.826 0 1.562-.316 2.094-.87v.736H6.27V7.97H5.082v4.888c0 1.257-.85 2.106-1.947 2.106-1.11 0-1.946-.827-1.946-2.106V7.971H0zm7.44 0v7.925h1.13v-.725c.521.532 1.257.86 2.06.86a3.006 3.006 0 0 0 3.034-3.01 3.01 3.01 0 0 0-3.033-3.024 2.86 2.86 0 0 0-2.049.861V7.971H7.439zm9.869 2.038c-1.687 0-2.965 1.37-2.965 3 0 1.72 1.334 3.01 3.066 3.01 1.053 0 1.913-.463 2.49-1.233l-.826-.611c-.43.577-.996.847-1.664.847-.973 0-1.753-.7-1.912-1.64h4.697v-.373c0-1.72-1.222-3-2.886-3zm6.295.068c-.634 0-1.098.294-1.381.758v-.713h-1.131v5.774h1.142V12.61c0-.894.544-1.47 1.291-1.47H24v-1.065h-.396zm-6.319.928c.85 0 1.564.588 1.756 1.47H15.52c.203-.882.916-1.47 1.765-1.47zm-6.732.012c1.086 0 1.98.883 1.98 2.004a1.993 1.993 0 0 1-1.98 2.001A1.989 1.989 0 0 1 8.56 13.02a1.99 1.99 0 0 1 1.992-2.004z"
                  />
                </svg>
                <span className="uber-plus">+</span>
              </span>
            </div>
          </div>
        </section>

        <section className="section section--reco">
          <SectionHeader title="Recommended for you" />
          <p className="section-lead">Store prices subject to change.</p>
          <div className="reco-grid">
            {recommendations.map((item) => (
              <RecoCard key={item.title} {...item} />
            ))}
          </div>
        </section>
          </>
        )}
      </div>

      {loading && (
        <div
          className={loading === 'out' ? 'route-loading route-loading--out' : 'route-loading'}
          role="status"
          aria-live="polite"
          aria-label="Loading"
        >
          <span className="route-spinner" />
        </div>
      )}

      <nav className="bottom-nav" aria-label="Main">
        <button
          type="button"
          className={active === 'home' ? 'nav-item nav-item--active' : 'nav-item'}
          onClick={() => go('home')}
        >
          <HomeIcon active={active === 'home'} />
          <span>Home</span>
        </button>
        <button
          type="button"
          className={active === 'accounts' ? 'nav-item nav-item--active' : 'nav-item'}
          onClick={() => go('accounts')}
        >
          <WalletIcon active={active === 'accounts'} />
          <span>Accounts</span>
        </button>
        <button
          type="button"
          className={active === 'send' ? 'nav-item nav-item--center nav-item--active' : 'nav-item nav-item--center'}
          onClick={() => go('send')}
        >
          <span className="nav-fab">
            <SendRequestIcon />
          </span>
          <span>Send/Request</span>
        </button>
        <button
          type="button"
          className={active === 'activity' ? 'nav-item nav-item--active' : 'nav-item'}
          onClick={() => go('activity')}
        >
          <ActivityIcon active={active === 'activity'} />
          <span>Activity</span>
        </button>
        <button type="button" className="nav-item" onClick={() => finishNavigation(null)}>
          <OffersIcon />
          <span>Offers</span>
        </button>
      </nav>

      {balanceOpen && (
        <PayPalBalancePage balance={balance} onBack={() => setBalanceOpen(false)} onAddMoney={openAddMoney} />
      )}

      {addMoneyOpen && (
        <AddMoneyFlow
          accounts={linkedAccounts}
          transfers={addMoney}
          now={now}
          addedKey={addedSourceKey}
          onAdded={(entry) => {
            setAddMoney((entries) => [...entries, entry])
            setNow(entry.createdAt)
            if (entry.availableAt <= entry.createdAt)
              setToast({ id: entry.createdAt, text: `Your ${formatUsd(entry.cents, true)} is available now` })
          }}
          onLink={(step) => setWalletSheet(step)}
          leaving={addMoneyLeaving}
          onClose={closeAddMoney}
          onFaceId={startFaceId}
        />
      )}

      {walletSheet && (
        <WalletSheet
          initialStep={walletSheet}
          bankCount={linkedAccounts.filter((account) => account.kind === 'bank').length}
          amexSendLinked={linkedAccounts.some((account) => account.kind === 'amex-send')}
          debitCards={addMoneyOpen && walletSheet === 'card'}
          onClose={() => setWalletSheet(null)}
          onLinked={(account) => {
            setLinkedAccounts((accounts) => [
              ...accounts.filter((linked) => accountKey(linked) !== accountKey(account)),
              account,
            ])
            if (addMoneyOpen && account.kind !== 'amex-send') setAddedSourceKey(accountKey(account))
            if (account.kind === 'bank' && sendTo && isAddedBank(account)) setSendPayKey(accountKey(account))
          }}
          onFaceId={startFaceId}
        />
      )}

      {sendTo && (
        <SendAmount
          contact={sendTo}
          banks={linkedAccounts.filter(isAddedBank)}
          payKey={sendPayKey}
          leaving={sendLeaving}
          onBack={closeSend}
          onSent={(payment) => {
            setSentPayments((payments) => [payment, ...payments])
            setNow(payment.createdAt)
          }}
          onLinkBank={() => setWalletSheet('bank-pick')}
        />
      )}

      {toast && (
        <div key={toast.id} className="toast" role="status">
          <CheckCircleIcon />
          {toast.text}
        </div>
      )}

      {!entered && <WelcomeBack onDone={() => setEntered(true)} onFaceId={startFaceId} />}
    </div>
  )
}

export default App
