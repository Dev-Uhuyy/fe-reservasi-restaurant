import React from "react";
import { useMemo } from "react";
import { ReservationProduct } from "@/app/interface/customer/reservation";
import { IdentityFormData } from "@/app/interface/customer/reservation";

interface PaymentFormProps {
  formData: IdentityFormData;
  order: ReservationProduct[];
}

function PaymentForm({ formData, order }: PaymentFormProps) {
  const total = useMemo(
    () =>
      order.reduce(
        (sum, item) => sum + (item.product?.price ?? 0) * item.qty,
        0
      ),
    [order]
  );
  return (
    <div className="w-full max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="font-bold text-lg text-gray-800 border-b pb-2 mb-4">
            Detail Booking
          </h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <strong className="text-gray-500">Name</strong>
            <span className="text-gray-800 truncate">{formData.name}</span>
            <strong className="text-gray-500">Total Person</strong>
            <span className="text-gray-800">{formData.totalPerson}</span>
            <strong className="text-gray-500">Email</strong>
            <span className="text-gray-800 truncate">{formData.email}</span>
            <strong className="text-gray-500">Phone Number</strong>
            <span className="text-gray-800">{formData.phone}</span>
            <strong className="text-gray-500">Date</strong>
            <span className="text-gray-800">
              {new Date(formData.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <strong className="text-gray-500">Time</strong>
            <span className="text-gray-800">{formData.time}</span>
            <strong className="text-gray-500">Room</strong>
            <span className="text-gray-800">{formData.room}</span>
            <strong className="text-gray-500">Table</strong>
            <span className="text-gray-800">{formData.table}</span>
          </div>
        </div>

        <div className="p-4 bg-lime-50 rounded-lg shadow mt-6">
          <h3 className="font-bold text-gray-700 mb-2">MY ORDER</h3>
          <div className="flex justify-between items-center bg-primary text-white p-2 rounded-md text-sm">
            <span className="font-semibold">Minimum Spend</span>
            <span>300.000</span>
          </div>
          <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
            {order.map((item) => (
              <div
                key={item.product_id}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center">
                  <img
                    src={item.product?.image_url}
                    alt={item.product?.name}
                    className="w-10 h-10 rounded-md object-cover mr-3"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.product?.name}
                    </p>
                    <p className="text-gray-500">Qty: {item.qty}</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-800">
                  {((item.product?.price ?? 0) * item.qty).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <hr className="my-3" />
          <div className="flex justify-between items-center font-bold text-lg text-gray-800">
            <span>Total</span>
            <span>{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 rounded-2xl flex items-center justify-center h-full min-h-[300px] p-4">
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-700">
            Payment Integration
          </h3>
          <p className="text-gray-500 mt-2">
            This is where a payment gateway like Midtrans, Stripe, or Xendit
            would be integrated.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
