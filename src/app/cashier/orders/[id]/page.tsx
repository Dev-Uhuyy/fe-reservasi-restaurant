import { reservationDetails } from "@/app/data/cashier/reservation-details"
import { listReservations } from "@/app/data/cashier/reservation"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Mail, Printer } from "lucide-react"
import Link from "next/link"

interface PageProps {
  params: { id: string }
}

export default function ReservationDetailPage({ params }: PageProps) {
  const id = Number(params.id)

  const mainReservation = listReservations.find((r) => r.id === id)
  const detail = reservationDetails.find((r) => r.id === id)

  if (!mainReservation || !detail) {
    return notFound()
  }

  const totalAmount = detail.menu.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
)

  const currentStatus = mainReservation.paymentStatus

  return (
    <div className="max-w-5xl mx-auto mt-8 bg-white rounded-2xl shadow p-6">
      {/* Back Button */}
      <div className="mb-8">
        <Link href="/cashier/orders">
          <Button variant="secondary" className="flex items-center gap-">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Reservation Detail</h2>
      </div>

      {/* Customer Information */}
    <section className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Customer Information :</h3>
        <div className="grid grid-cols-2 text-sm gap-4">
        <div>
            <p className="mb-2 leading-relaxed">
                <span className="font-semibold">Name:</span> {detail.user.name}
            </p>
            <p className="mb-2 leading-relaxed">
                <span className="font-semibold">Phone:</span> {detail.user.phone}
            </p>
            <p className="mb-2 leading-relaxed">
                <span className="font-semibold">People:</span> {mainReservation.peopleCount}
            </p>
        </div>
        <div>
            <p className="mb-2 leading-relaxed">
                <span className="font-semibold">Email:</span> {detail.user.email}
            </p>
                <p className="mb-2 leading-relaxed">
                <span className="font-semibold">Date:</span> {detail.date}
            </p>
        </div>
    </div>
</section>

      <hr className="my-4" />

      {/* Room & Table */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Room & Table : </h3>
        <div className="flex justify-between text-sm">
          <p><strong>Room:</strong> {detail.room}</p>
          <p><strong>Table:</strong> {detail.table}</p>
          <div className="flex items-center gap-2">
            <p><strong>Status:</strong></p>
            <Select defaultValue={currentStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select status..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <hr className="my-4" />

      {/* Ordered Menu */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Ordered Menu : </h3>
        <table className="w-full text-sm">
          <thead className="border-b font-medium">
            <tr>
              <th className="text-left text-sm py-2">Menu Name</th>
              <th className="text-center py-2">Qty</th>
              <th className="text-right py-2">Price</th>
              <th className="text-right py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {detail.menu.map((item, index) => (
              <tr key={index} className="border-b last:border-none">
                <td className="py-2">{item.name}</td>
                <td className="text-center py-2">{item.quantity}</td>
                <td className="text-right py-2">Rp {item.price.toLocaleString("id-ID")}</td>
                <td className="text-right py-2">
                  Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-semibold">
              <td colSpan={3} className="text-right py-3">Grand Total</td>
              <td className="text-right py-3">Rp {totalAmount.toLocaleString("id-ID")}</td>
            </tr>
          </tfoot>
        </table>
      </section>

      <hr className="my-4" />

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <Button  className="bg-primary flex items-center gap-2">
          <Printer className="w-4 h-4" />
          Print Invoice
        </Button>
        <Button variant="secondary" className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Send Invoice
        </Button>
      </div>
    </div>
  )
}
