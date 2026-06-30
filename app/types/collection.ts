import type { PaymentMethod } from "./payment_method"

interface Collection {
  id: string
  paymentMethod: PaymentMethod
  amount: number
  time: string
  type: string
}

export interface CollectionLogGroup {
  date: string
  entries: Collection[]
}