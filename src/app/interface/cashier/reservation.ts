export interface Reservation {
  id: number
  customerName: string
  room: string
  date: string
  peopleCount: number
  paymentStatus: "paid" | "unpaid"
  reservationStatus: "confirmed" | "pending" | "cancelled"

  phone?: string
  notes?: string
  menus?: {
    name: string
    quantity: number
    price: number
  }[]
  totalAmount?: number
}
