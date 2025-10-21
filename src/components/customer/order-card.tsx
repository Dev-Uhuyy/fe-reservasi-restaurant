import { ReservationProduct } from "@/app/interface/customer/reservation";
import React from "react";
import { useMemo } from "react";
import { Card } from "../ui/card";
import { InfoIcon } from "lucide-react";
import { IdentityFormData } from "@/app/interface/customer/reservation";

interface OrderProps {
  formData: IdentityFormData;
  order: ReservationProduct[];
}

function OrderCard({ formData, order }: OrderProps) {
  const total = useMemo(
    () =>
      order.reduce(
        (sum, item) => sum + (item.product?.price ?? 0) * item.qty,
        0
      ),
    [order]
  );

  const minimum_spend = (formData.totalPerson)*100000;

  return (
    <Card className="p-4 bg-lime-50 rounded-lg shadow">
      <h3 className="font-bold text-gray-700 mb-2">MY ORDER</h3>
      <div className="max-h-60 overflow-y-auto flex flex-col gap-2">
        {order.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">
            Your order is empty.
          </p>
        ) : (
          order.map((item) => (
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
          ))
        )}
      </div>
      <div className="flex flex-col gap-2 border-t-1 pt-4">
        <div className="flex justify-between items-center font-bold text-lg text-gray-800">
          <span>Total</span>
          <span>{total.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-blue-500 bg-blue-50 py-2 px-4">
          <div className=" flex items-center gap-1">
            <InfoIcon className="w-4" />
            <span className="text-sm">Minimum Spend</span>
          </div>
          <span className="text-sm font-bold">Rp {minimum_spend.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  );
}

export default OrderCard;
