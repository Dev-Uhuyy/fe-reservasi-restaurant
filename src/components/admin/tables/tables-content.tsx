"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { StatusFilter } from "@/components/admin/tables/status-filter"
import { DeleteDialog } from "@/components/admin/tables/delete-dialog"
import { TableData } from "@/app/interface/admin/table"
import { mockTables } from "@/app/data/admin/table"
import { Pencil, Trash2 } from "lucide-react"

export default function TablesContent() {
  const [tables, setTables] = useState<TableData[]>(mockTables)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filteredTables = tables.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === "all" || t.status === filter
    return matchSearch && matchFilter
  })

  const handleDelete = (id: string) => {
    setTables((prev) => prev.filter((t) => String(t.id) !== id))
  }


  // const getStatusBadge = (status: string) => {
  //   let colorClass = ""

  //   switch (status.toLowerCase()) {
  //     case "available":
  //       colorClass = "bg-black text-white"
  //       break
  //     case "reserved":
  //       colorClass = "bg-green-500 text-white"
  //       break
  //     case "occupied":
  //       colorClass = "bg-red-600 text-white"
  //       break
  //     default:
  //       colorClass = "bg-gray-400 text-white"
  //   }

  //   return (
  //     <span
  //       className={`px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}
  //     >
  //       {status}
  //     </span>
  //   )
  // }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-[#1D3B2A]">Table Management</h1>
        <Link href="/admin/tables/add">
          <Button className="bg-[#1D3B2A] text-white rounded-xl px-5 py-2 hover:opacity-90">
            Add Table
          </Button>
        </Link>
      </div>

      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search table..."
          className="max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <StatusFilter value={filter} onChange={setFilter} />
      </div>

     <Card>
  <CardContent className="overflow-x-auto">
    <table className="w-full text-sm text-[#1D3B2A]">
      <thead>
        <tr className="border-b font-medium text-left">
          <th className="py-3">Name</th>
          <th>Room</th>
          <th>Min People</th>
          <th>Max People</th>
          <th>Status</th>
          <th className="w-[120px]">Image</th>
          <th className="text-center pr-6">Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredTables.map((table) => (
          <tr key={String(table.id)} className="border-b">
            <td className="py-3">{table.name}</td>
            <td>{table.room}</td>
            <td>{table.minCapacity}</td>
            <td>{table.maxCapacity}</td>
            <td>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  table.status === "available"
                  ? "bg-black text-white"
                  : table.status === "reserved"
                  ? "bg-gray-300 text-black"
                  : table.status === "occupied"
                  ? "bg-gray-300 text-black"
                  : "bg-gray-300 text-black"
                }`}
              >
                {table.status}
              </span>
            </td>
            <td className="text-center space-x-4 py-2">
  <Image
    src={
      table.image &&
      typeof table.image === "string" &&
      (table.image.startsWith("/") || table.image.startsWith("http"))
        ? table.image
        : "/images/placeholder.png"
    }
    alt={table.name || "Table image"}
    width={70}
    height={40}
    className="rounded-md object-cover"
    unoptimized
  />
</td>

            <td className="text-center space-x-4 py-6">
              <Link href={`/admin/tables/detail/${String(table.id)}`}>
                <Button variant="outline" size="sm">
                <Pencil className="h-4 w-4" />
                  Edit
                </Button>
              </Link>
              <Button
                className="bg-red-600 text-white hover:bg-red-700"
                size="sm"
                onClick={() => setDeleteId(String(table.id))}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </CardContent>
</Card>


      {deleteId && (
        <DeleteDialog
          open={!!deleteId}
          onClose={() => setDeleteId(null)}
          onConfirm={() => {
            handleDelete(deleteId)
            setDeleteId(null)
          }}
        />
      )}
    </div>
  )
}
