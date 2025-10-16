"use client"

import { useState } from "react"
import { listReservations } from "@/app/data/cashier/reservation"
import { Reservation } from "@/app/interface/cashier/reservation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { SquarePen, Trash, CreditCard, Eye } from "lucide-react"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import PaymentModal from "./payment-modal"

export default function ReservationList() {
  const [reservations, setReservations] = useState<Reservation[]>(listReservations)
  const [search, setSearch] = useState("")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredReservations = reservations.filter((r) => {
    const matchesSearch = r.customerName.toLowerCase().includes(search.toLowerCase())
    const matchesPayment =
      paymentFilter === "all" || r.paymentStatus === paymentFilter
    const matchesStatus =
      statusFilter === "all" || r.reservationStatus === statusFilter
    return matchesSearch && matchesPayment && matchesStatus
  })

  const handleDelete = (id: number) => {
    setReservations(reservations.filter((r) => r.id !== id))
  }

  const handlePayment = (id: number) => {
    setReservations(
      reservations.map((r) =>
        r.id === id ? { ...r, paymentStatus: "paid" } : r
      )
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Search dan Filter */}
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[240px] rounded-md border border-gray-300"
        />

        <Select value={paymentFilter} onValueChange={setPaymentFilter}>
          <SelectTrigger className="w-[150px] rounded-md border border-gray-300">
            <SelectValue placeholder="Payment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payment</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="unpaid">Unpaid</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px] rounded-md border border-gray-300">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-4">
        <table className="w-full text-sm ">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 text-left font-semibold">Name</th>
              <th className="py-3 text-left font-semibold">Room</th>
              <th className="py-3 text-left font-semibold">Date</th>
              <th className="py-3 text-left font-semibold">People</th>
              <th className="py-3 text-left font-semibold">Payment</th>
              <th className="py-3 text-left font-semibold">Status</th>
              <th className="py-3 text-center font-semibold w-[10px]">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredReservations.length > 0 ? (
              filteredReservations.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-3">{r.customerName}</td>
                  <td className="py-3">{r.room}</td>
                  <td className="py-3">{r.date}</td>
                  <td className="py-3">{r.peopleCount}</td>

                  {/* Payment Badge */}
                  <td className="py-3">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        r.paymentStatus === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {r.paymentStatus}
                    </span>
                  </td>

                  {/* Reservation Badge */}
                  <td className="py-3">
                    <span
                      className={`px-3 py-1 text-xs rounded-full capitalize ${
                        r.reservationStatus === "confirmed"
                          ? "bg-black text-white"
                          : r.reservationStatus === "pending"
                          ? "bg-gray-200 text-gray-700"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {r.reservationStatus}
                    </span>
                  </td>

                  {/* Action Buttons */}
<td className="py-6 text-center">
  <div className="flex justify-center gap-2">
    {/* Tombol Detail */}
    <Link href={`/cashier/orders/${r.id}`}>
      <Button
        type="button"
        variant="default"
        className="cursor-pointer text-primary-foreground hover:bg-primary/80 flex items-center gap-2"
        size="sm"
      >
        <Eye className="w-4 h-4" />
        Details
      </Button>
    </Link>

    

                      <Button
                        type="button"
                        variant="destructive"
                        className="cursor-pointer hover:bg-destructive/80 "
                        size="sm"
                        onClick={() => handleDelete(r.id)}
                      >
                        <Trash />
                        Delete
                      </Button>

                      {r.paymentStatus === "unpaid" && (
                        <PaymentModal
                          reservation={r}
                          className="cursor-pointer flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white"
                          size="sm"
                           onSuccess={() => handlePayment(r.id)}
                        >
                          <CreditCard />
                          Settle Payment
                        </PaymentModal>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500 italic">
                  No reservations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
