"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { toast } from "sonner" // ✅ gunakan sonner

export default function PaymentModal({
  reservation,
  onSuccess,
}: {
  reservation: any
  onSuccess: () => void
}) {
  const [open, setOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [amount, setAmount] = useState("")

  const handlePay = () => {
    if (!paymentMethod || !amount) {
      toast.error("Please fill in all fields!")
      return
    }

    // Simulasi pembayaran sukses
    const isSuccess = Math.random() > 0.2 // 80% sukses
    if (isSuccess) {
      toast.success("Payment successful!")
      onSuccess()
      setOpen(false)
    } else {
      toast.error("Payment failed! Please try again.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger modal */}
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white"
          size="sm"
        >
          Settle Payment
        </Button>
      </DialogTrigger>

      {/* Isi modal */}
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Payment Settlement</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Reservation details */}
          <div className="border p-3 rounded-md bg-muted/30">
            <p className="text-sm font-medium">
              Name: {reservation.customerName}
            </p>
            <p className="text-sm text-gray-600">Room: {reservation.room}</p>
            <p className="text-sm text-gray-600">Table: {reservation.table}</p>
            <p className="text-sm text-gray-600">
              Total: Rp {reservation.total}
            </p>
          </div>

          {/* Payment method */}
          <div className="space-y-2">
            <Label>Payment Method</Label>
            <Select onValueChange={setPaymentMethod} value={paymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="debit">Debit</SelectItem>
                <SelectItem value="qris">QRIS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label>Amount Paid</Label>
            <Input
              type="text"
              placeholder="0"
              value={amount}
              readOnly
              className="text-right font-semibold"
            />
          </div>

          

          {/* Numpad */}
          <div className="grid grid-cols-3 gap-2">
            {["1","2","3","4","5","6","7","8","9","0"].map((num) => (
              <Button
                key={num}
                variant="outline"
                onClick={() => setAmount(prev => prev + num)}
              >
                {num}
              </Button>
            ))}
            <Button
              variant="secondary"
              className="col-span-3"
              onClick={() => setAmount("")}
            >
              Clear
            </Button>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button onClick={handlePay}>Confirm Payment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
