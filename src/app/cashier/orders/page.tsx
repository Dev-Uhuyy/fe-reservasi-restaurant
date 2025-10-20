import React from "react";
import ReservationList from "@/components/cashier/order/reservation-list"
import { Button } from "@/components/ui/button";


function page() {
  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-between items-center pb-8">
        <div className="text-2xl font-bold">Reservation Management</div>
        <a href="/cashier/orders">
        </a>
      </div>
      <ReservationList />
    </div>
  );
}

export default page;
