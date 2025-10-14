"use client"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

export function StatusFilter({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="available">Available</SelectItem>
        <SelectItem value="occupied">Occupied</SelectItem>
        <SelectItem value="reserved">Reserved</SelectItem>
      </SelectContent>
    </Select>
  )
}
