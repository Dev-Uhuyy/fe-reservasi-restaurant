"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { RoomItem, RoomStatus } from "@/app/interface/admin/room";
import { roomItems as defaultRooms } from "@/app/data/admin/room";

type RoomFormValues = {
  name: string;
  status: RoomStatus;
  image: string; // dataURL or existing imageUrl
};

const schema = yup.object().shape({
  name: yup.string().required("Room name is required"),
  status: yup
    .mixed<RoomStatus>()
    .oneOf(["available", "reserved", "occupied"])
    .required("Status is required"),
  image: yup.string().nullable(),
});

export default function EditRoomForm() {
  const router = useRouter();
  const { id } = useParams();
  const dropRef = useRef<HTMLDivElement | null>(null);

  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RoomFormValues>({
    defaultValues: {
      name: "",
      status: "available",
      image: "",
    },
    resolver: async (data) => {
      try {
        const validated = await schema.validate(data, { abortEarly: false });
        return { values: validated as RoomFormValues, errors: {} };
      } catch (validationErrors) {
        const formErrors = (
          validationErrors as yup.ValidationError
        ).inner.reduce(
          (allErrors, curr) => ({
            ...allErrors,
            [curr.path as string]: {
              type: curr.type ?? "validation",
              message: curr.message,
            },
          }),
          {}
        );
        return { values: {}, errors: formErrors };
      }
    },
  });

  useEffect(() => {
    // load from localStorage or fallback to defaultRooms
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("rooms") : null;
    const data: RoomItem[] = stored ? JSON.parse(stored) : defaultRooms;
    setRooms(data);

    if (!id) return;

    const current = data.find((r) => String(r.id) === String(id));
    if (current) {
      setValue("name", current.name);
      setValue("status", current.status as RoomStatus);
      // store image preview from existing imageUrl
      if (current.imageUrl) {
        setImagePreview(current.imageUrl);
        setValue("image", current.imageUrl);
      }
    }
  }, [id, setValue]);

  const handleImageChange = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImagePreview(reader.result);
        setValue("image", reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: RoomFormValues) => {
    try {
      const updated = rooms.map((r) =>
        String(r.id) === String(id)
          ? {
              ...r,
              name: data.name,
              status: data.status,
              imageUrl: data.image || imagePreview || r.imageUrl || "",
            }
          : r
      );

      localStorage.setItem("rooms", JSON.stringify(updated));
      setRooms(updated);

      setAlert({
        type: "success",
        message: "Room updated successfully!",
      });

      // redirect after short delay so user sees notification
      setTimeout(() => router.push("/admin/room"), 1000);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update room";
      setAlert({ type: "error", message });
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-md">
      {alert && (
        <Alert
          className={`mb-4 ${
            alert.type === "success" ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <AlertTitle>
            {alert.type === "success" ? "Success" : "Error"}
          </AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="font-medium">Name</label>
          <Input placeholder="Room name" {...register("name")} />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="font-medium">Status</label>
          <Select
            onValueChange={(val) => setValue("status", val as RoomStatus)}
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
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="font-medium">Image</label>
          <Card
            className="border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer hover:bg-gray-50"
            ref={dropRef}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files?.[0] || null;
              handleImageChange(file);
            }}
            onClick={() => {
              const input = dropRef.current?.querySelector(
                "input[type=file]"
              ) as HTMLInputElement | null;
              input?.click();
            }}
          >
            <CardContent>
              {imagePreview ? (
                <div className="flex flex-col items-center">
                  {/* next/image works with data URLs */}
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={240}
                    height={140}
                    className="rounded-md object-cover mb-2"
                  />
                  <p className="text-sm text-gray-500">
                    Drag another image to replace
                  </p>
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
                id="roomImageInput"
                onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
              />
            </CardContent>
          </Card>

          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            className="mr-2"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-black text-white hover:opacity-90 rounded-xl px-6 py-2"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
