import { Reservation } from "@/app/interface/cashier/reservation"

export const listReservations: Reservation[] = [
  {
    id: 1,
    customerName: "John Doe",
    room: "Outdoor",
    date: "2025-10-15",
    peopleCount: 4,
    paymentStatus: "paid",
    reservationStatus: "confirmed",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    room: "Indoor",
    date: "2025-10-16",
    peopleCount: 2,
    paymentStatus: "unpaid",
    reservationStatus: "pending",
  },
  {
    id: 3,
    customerName: "Michael Lee",
    room: "Outdoor",
    date: "2025-10-17",
    peopleCount: 8,
    paymentStatus: "unpaid",
    reservationStatus: "cancelled",
  },
]
