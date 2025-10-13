"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { v4 as uuidv4 } from "uuid"
import { TableData } from "@/app/interface/admin/table"
import { mockTables } from "@/app/data/admin/table"
import { mockRooms } from "@/app/data/admin/table"


export default function TableForm() {
  const router = useRouter()
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const schema = yup.object().shape({
    name: yup.string().required("Table name is required"),
    room: yup.string().required("Room is required"),
    minCapacity: yup.number().required("Min capacity required"),
    maxCapacity: yup.number().required("Max capacity required"),
    status: yup.string().required("Status required"),
    image: yup.mixed().required("Image required"),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TableData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: TableData) => {
    try {
      const newTable = {
        ...data,
        id: uuidv4(),
        image: imagePreview || "/images/placeholder.png",
      }
    
      mockTables.push(newTable)

      toast.success("Table added successfully!")
      router.push("/admin/tables")
    } catch {
      toast.error("Failed to add table.")
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
        setValue("image", reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
      
        
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Table Name</label>
              <Input {...register("name")} placeholder="Enter table name" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            
      <div>
  <label className="block mb-1 text-sm font-medium">Room</label>
  <select
    {...register("room")}
    className="w-full border rounded-md p-2 focus:ring focus:ring-green-300"
  >
    <option value="">-- Select Room --</option>
    {mockRooms.map((room) => (
      <option key={room.id} value={room.name}>
        {room.name}
      </option>
    ))}
  </select>
  {errors.room && <p className="text-red-500 text-sm">{errors.room.message}</p>}
</div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Min Capacity</label>
                <Input type="number" {...register("minCapacity")} />
                {errors.minCapacity && (
                  <p className="text-red-500 text-sm">{errors.minCapacity.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Max Capacity</label>
                <Input type="number" {...register("maxCapacity")} />
                {errors.maxCapacity && (
                  <p className="text-red-500 text-sm">{errors.maxCapacity.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Status</label>
              <select
                {...register("status")}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select status</option>
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="occuppied">Occupied</option>
              </select>
              {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium">Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mx-auto w-32 h-32 object-cover rounded-md"
                    />
                  ) : (
                    <p className="text-gray-500">Click or drag to upload image</p>
                  )}
                </label>
              </div>
              {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-black text-white hover:bg-gray-800 rounded-xl w-full mt-4">
                Save
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
