import type { PaymentMethod } from "./payment_method"

interface Purchased {
  id: string
  paymentMethod: PaymentMethod
  debtorName: string
  pricePerUnit: number
  qty: number
  total: number
  time: string
  type: 'PURCHASE' | 'BORROW'
}

export interface PurchasedLogGroup {
  date: string
  entries: Purchased[]
}