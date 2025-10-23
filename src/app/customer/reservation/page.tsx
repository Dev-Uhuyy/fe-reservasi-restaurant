"use client";

import React from "react";
import { useState } from "react";
import { Stepper } from "@/components/ui/stepper";
import { AlertCircleIcon, ArrowRightIcon, Terminal } from "lucide-react";
import IdentityForm from "@/components/customer/identity-form";
import MenuForm from "@/components/customer/menu-form";
import PaymentForm from "@/components/customer/payment-form";
import {
  ReservationProduct,
  IdentityFormData,
} from "@/app/interface/customer/reservation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function ReservationPage() {
  const [step, setStep] = useState(1);

  const [modalMessage, setModalMessage] = useState("");

  const [formData, setFormData] = useState<IdentityFormData>({
    name: "",
    email: "",
    phone: "",
    totalPerson: 1,
    date: new Date().toISOString().split("T")[0],
    time: "17.00-19.00",
    room: "",
    table: "",
  });

  const [order, setOrder] = useState<ReservationProduct[]>([]);

  const handleNext = () => {
    // Add validation here before proceeding
    if (step === 1 && (!formData.name || !formData.email || !formData.table)) {
      setModalMessage(
        "Please fill in your name, email, and select a room/table."
      );
      return;
    }
    if (step < 3) {
      setStep((s) => s + 1);
    } else {
      // Final submission logic would go here
      console.log("Final Booking Details:", {
        identity: formData,
        menuOrder: order,
      });
      setModalMessage(
        "Booking Submitted! Check the console for the final data."
      );
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <IdentityForm formData={formData} setFormData={setFormData} />;
      case 2:
        return <MenuForm formData={formData} order={order} setOrder={setOrder} />;
      case 3:
        return <PaymentForm formData={formData} order={order} />;
      default:
        return <IdentityForm formData={formData} setFormData={setFormData} />;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {modalMessage && (
        <Alert variant="default">
          <AlertCircleIcon />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>{modalMessage}</AlertDescription>
        </Alert>
      )}
      <header className="p-6">
        <Stepper currentStep={step} />
      </header>

      <main className="overflow-y-auto">{renderStep()}</main>
      <footer className="w-full max-w-6xl mx-auto mt-8 flex justify-between items-center px-4">
        <div>
          {step > 1 && (
            <Button
              onClick={handleBack}
              className="bg-muted-foreground hover:bg-muted-foreground/80"
            >
              Back
            </Button>
          )}
        </div>
        <Button type="submit" onClick={handleNext} variant="secondary">
          {step === 3 ? "Confirm & Pay" : "Next"}
          {step < 3 && <ArrowRightIcon />}
        </Button>
      </footer>
    </div>
  );
}

export default ReservationPage;
