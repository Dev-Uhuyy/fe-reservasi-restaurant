"use client";

import React, { useState } from "react";
import { ReservationData } from "@/app/data/customer/reservation";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IdentityFormData } from "@/app/interface/customer/reservation";



type RoomKey = keyof typeof ReservationData.tables;

interface identityFormProps{
  formData: IdentityFormData;
      setFormData: React.Dispatch<React.SetStateAction<IdentityFormData>>;
}

export default function IdentityForm({formData, setFormData}: identityFormProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = ( e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target;
     const num = parseInt(value || "0", 10);
     setFormData(prev => ({ ...prev, [name]: isNaN(num) ? 1 : num}));
  }


  const handleSelectChange = (name: keyof IdentityFormData, value: string) => {
    if (name === 'room') {
        // When room changes, reset the table selection
        setFormData(prev => ({...prev, room: value, table: ""}));
    } else {
        setFormData(prev => ({...prev, [name]: value}));
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Label htmlFor="name" className="mb-2">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="email" className="mb-2">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="phone" className="mb-2">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="08123456789"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="totalPerson" className="mb-2">Total Person</Label>
          <Input
            id="totalPerson"
            name="totalPerson"
            type="number"
            min={1}
            value={String(formData.totalPerson)}
            onChange={handleNumberChange}
          />
        </div>

        <div>
          <Label htmlFor="date" className="mb-2">Date</Label>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger className="bg-transparent text-muted-foreground" asChild>
              <Button
                variant="outline"
                id="date"
                className="w-full justify-between font-normal hover:bg-transparent"
              >
                {formData.date
                  ? new Date(formData.date).toLocaleDateString()
                  : "Select date"}
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={new Date(formData.date)}
                onSelect={(d) => {
                  if (!d) return;
                  const adjustedDate = new Date(d.getTime() - (d.getTimezoneOffset() * 60000));
                  const iso = adjustedDate.toISOString().split("T")[0];
                  setFormData((s) => ({ ...s, date: iso }));
                  setCalendarOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label htmlFor="time" className="mb-2">Time</Label>
          <Select value={formData.time} onValueChange={(v) => handleSelectChange('time', v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose Your Time" />
            </SelectTrigger>
            <SelectContent>
              {ReservationData.time.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="room" className="mb-2">Room</Label>
          <Select value={formData.room} onValueChange={(v) => handleSelectChange('room', v as RoomKey)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose Your Room" />
            </SelectTrigger>
            <SelectContent>
              {ReservationData.rooms.map((r) => (
                <SelectItem key={r} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="table" className="mb-2">Table</Label>
          <Select
            value={formData.table}
            onValueChange={(v) => handleSelectChange('table', v)}
            disabled={!formData.room}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose Your Table" />
            </SelectTrigger>
            <SelectContent>
              {(formData.room && ReservationData.tables[formData.room as RoomKey] || []).map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
