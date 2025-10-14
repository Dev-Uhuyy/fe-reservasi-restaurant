"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Upload } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { mockTables } from "@/app/data/admin/table"
import { TableData } from "@/app/interface/admin/table"

const schema = yup.object().shape({
  name: yup.string().required("Table name is required"),
  room: yup.string().required("Room is required"),
  minCapacity: yup
    .number()
    .typeError("Min capacity must be a number")
    .required("Min capacity is required"),
  maxCapacity: yup
    .number()
    .typeError("Max capacity must be a number")
    .required("Max capacity is required"),
  status: yup.string().required("Status is required"),
  image: yup.mixed().required("Image is required"),
})

export default function EditTableForm() {
  const router = useRouter()
  const { id } = useParams()
  const [tables, setTables] = useState<TableData[]>([])
  const [imagePreview, setImagePreview] = useState<string>("")
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  
  useEffect(() => {
    const storedTables = localStorage.getItem("tables")
    const data = storedTables ? JSON.parse(storedTables) : mockTables
    setTables(data)

    const current = data.find((t: TableData) => String(t.id) === String(id))
    if (current) {
      setValue("name", current.name)
      setValue("room", current.room)
      setValue("minCapacity", current.minCapacity)
      setValue("maxCapacity", current.maxCapacity)
      setValue("status", current.status)
      setImagePreview(current.image)
    }
  }, [id, setValue])

  const handleImageChange = (file: File | null) => {
  if (!file) return
  const reader = new FileReader()

  reader.onloadend = () => {
    if (typeof reader.result === "string") {
      setImagePreview(reader.result)
      setValue("image", reader.result)
    }
  }

  reader.readAsDataURL(file)
}


  const onSubmit = (data: any) => {
    try {
      const updatedTables = tables.map((t) =>
        String(t.id) === String(id)
          ? {
              ...t,
              name: data.name,
              room: data.room,
              minCapacity: data.minCapacity,
              maxCapacity: data.maxCapacity,
              status: data.status,
              image: data.image || imagePreview,
            }
          : t
      )
      localStorage.setItem("tables", JSON.stringify(updatedTables))
      setAlert({ type: "success", message: "Table updated successfully!" })
      setTimeout(() => router.push("/admin/tables"), 1200)
    } catch (error) {
      setAlert({ type: "error", message: "Failed to update table!" })
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-md">
     

      {alert && (
        <Alert
          className={`mb-4 ${
            alert.type === "success" ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <AlertTitle>{alert.type === "success" ? "Success" : "Error"}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="font-medium">Name</label>
          <Input placeholder="Table name" {...register("name")} />
          {errors.name && <p className="text-red-600 text-sm">{String(errors.name.message)}</p>}
        </div>

        <div>
          <label className="font-medium">Room</label>
          <Input placeholder="Room name" {...register("room")} />
          {errors.room && <p className="text-red-600 text-sm">{String(errors.room.message)}</p>}
        </div>

        <div className="flex gap-3">
          <div className="w-1/2">
            <label className="font-medium">Min Capacity</label>
            <Input type="number" {...register("minCapacity")} />
            {errors.minCapacity && (
              <p className="text-red-600 text-sm">{String(errors.minCapacity.message)}</p>
            )}
          </div>
          <div className="w-1/2">
            <label className="font-medium">Max Capacity</label>
            <Input type="number" {...register("maxCapacity")} />
            {errors.maxCapacity && (
              <p className="text-red-600 text-sm">{String(errors.maxCapacity.message)}</p>
            )}
          </div>
        </div>

        <div>
          <label className="font-medium">Status</label>
          <Select
            onValueChange={(val) => setValue("status", val)}
            defaultValue={watch("status")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="occupied">Occupied</SelectItem>
              <SelectItem value="reserved">Reserved</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && <p className="text-red-600 text-sm">{String(errors.status.message)}</p>}
        </div>

        <div>
          <label className="font-medium">Image</label>
          <Card
            className="border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer hover:bg-gray-50"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              const file = e.dataTransfer.files[0]
              handleImageChange(file)
            }}
          >
            <CardContent>
              {imagePreview ? (
                <div className="flex flex-col items-center">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={160}
                    height={100}
                    className="rounded-md object-cover mb-2"
                  />
                  <p className="text-sm text-gray-500">Drag another image to replace</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <Upload size={32} />
                  <p>Drag & drop image here</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="imageInput"
                onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
              />
            </CardContent>
          </Card>
          {errors.image && <p className="text-red-600 text-sm">{String(errors.image.message)}</p>}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-black text-white hover:opacity-90 rounded-xl px-6 py-2"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
