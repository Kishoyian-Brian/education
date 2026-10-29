import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import bofaUnlimitedCashArt from '../assets/cardart/bofa-unlimited-cash-rewards.webp'
import amexBusinessCashArt from '../assets/cardart/amex-business-cash.webp'
import type { CardBrand } from '../components/icons'

export type PaymentMethodKind = 'bank' | 'debit' | 'credit'

export type PaymentMethod = {
  id: string
  kind: PaymentMethodKind
  brand: string
  last4: string
  expiry: string
  label: string
  canAddMoney: boolean
  bankId?: string
  accountType?: string
  routing?: string
  nickname?: string
  cardBrand?: CardBrand
  binFunding?: 'Debit' | 'Credit'
  art?: string
  face?: string
  issuer?: string
  type?: string
}

type PaymentMethodsContextType = {
  methods: PaymentMethod[]
  addMethod: (method: Omit<PaymentMethod, 'id'> & { id?: string }) => PaymentMethod
  updateMethod: (id: string, updates: Partial<PaymentMethod>) => void
  getById: (id: string) => PaymentMethod | undefined
}

const PaymentMethodsContext = createContext<PaymentMethodsContextType | undefined>(undefined)

const STORAGE_KEY = 'paypal-clone:payment-methods'

function loadFromStorage(): PaymentMethod[] | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return null
    const parsed = JSON.parse(saved)
    if (Array.isArray(parsed)) return parsed
  } catch {
    // ignore
  }
  return null
}

function createInitialMethods(): PaymentMethod[] {
  return [
    {
      id: 'bank-bofa-4417',
      kind: 'bank',
      brand: 'bofa',
      last4: '4417',
      expiry: '',
      label: 'Bank of America',
      canAddMoney: true,
      bankId: 'bofa',
      accountType: 'Checking',
      routing: '026009593',
      nickname: 'Personal BoA',
      type: 'Checking',
    },
    {
      id: 'bank-bofa-8203',
      kind: 'bank',
      brand: 'bofa',
      last4: '8203',
      expiry: '',
      label: 'Bank of America',
      canAddMoney: true,
      bankId: 'bofa',
      accountType: 'Checking',
      routing: '026009593',
      type: 'Checking',
    },
    {
      id: 'card-bofa-unlimited',
      kind: 'credit',
      brand: 'bofa',
      last4: '',
      expiry: '',
      label: 'BoA Unlimited Cash Rewards',
      canAddMoney: false,
      cardBrand: 'visa',
      binFunding: 'Credit',
      art: bofaUnlimitedCashArt,
      issuer: 'bofa',
    },
    {
      id: 'card-amex-business',
      kind: 'credit',
      brand: 'amex',
      last4: '',
      expiry: '',
      label: 'American Express Business Cash',
      canAddMoney: false,
      cardBrand: 'amex',
      binFunding: 'Credit',
      art: amexBusinessCashArt,
      issuer: 'amex',
    },
    {
      id: 'card-visa-5212',
      kind: 'debit',
      brand: 'visa',
      last4: '5212',
      expiry: '02/29',
      label: 'Visa',
      canAddMoney: true,
      cardBrand: 'visa',
      binFunding: 'Debit',
    },
  ]
}

export function PaymentMethodsProvider({ children }: { children: ReactNode }) {
  const [methods, setMethods] = useState<PaymentMethod[]>(() => {
    const stored = loadFromStorage()
    if (stored) return stored
    const initial = createInitialMethods()
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial))
    } catch {
      // ignore
    }
    return initial
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(methods))
    } catch {
      // ignore
    }
  }, [methods])

  const addMethod = (method: Omit<PaymentMethod, 'id'> & { id?: string }) => {
    const id = method.id ?? `pm-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    const newMethod: PaymentMethod = { ...method, id }
    setMethods((prev) => {
      const filtered = prev.filter((m) => m.id !== newMethod.id)
      return [...filtered, newMethod]
    })
    return newMethod
  }

  const updateMethod = (id: string, updates: Partial<PaymentMethod>) => {
    setMethods((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)))
  }

  const getById = (id: string) => methods.find((m) => m.id === id)

  return (
    <PaymentMethodsContext.Provider value={{ methods, addMethod, updateMethod, getById }}>
      {children}
    </PaymentMethodsContext.Provider>
  )
}

export function usePaymentMethods() {
  const context = useContext(PaymentMethodsContext)
  if (!context) {
    throw new Error('usePaymentMethods must be used within a PaymentMethodsProvider')
  }
  return context
}
