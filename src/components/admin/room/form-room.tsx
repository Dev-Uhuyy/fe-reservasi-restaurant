"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert } from "@/components/ui/alert";
import type { RoomItem, RoomStatus } from "@/app/interface/admin/room";

const roomSchema = Yup.object().shape({
  name: Yup.string().required("The room name is mandatory"),
  status: Yup.mixed<RoomStatus>()
    .oneOf(["available", "reserved", "occupied"])
    .required("Status must be selected"),
  image: Yup.mixed().required("Images must be uploaded"),
});

type Values = {
  name: string;
  status: RoomStatus;
  image: File | null;
};

export default function FormRoom({
  initial,
  isEdit = false,
}: {
  initial?: Partial<RoomItem>;
  isEdit?: boolean;
}) {
  const router = useRouter();
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [preview, setPreview] = useState<string | undefined>(initial?.imageUrl);
  const dropRef = useRef<HTMLDivElement | null>(null);

  const initialValues: Values = {
    name: initial?.name || "",
    status: (initial?.status as RoomStatus) || "active",
    image: null,
  };

  const onDrop = useCallback(
    (
      files: FileList | null,
      setFieldValue: (field: keyof Values, value: Values[keyof Values]) => void
    ) => {
      if (!files || files.length === 0) return;
      const file = files[0];
      setFieldValue("image", file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    },
    []
  );

  return (
    <div className="px-4 md:px-14 py-5">
      {alert && (
        <Alert variant={alert.type === "success" ? "default" : "destructive"}>
          {alert.message}
        </Alert>
      )}

      <Card>
        <CardContent className="space-y-5 pt-6">
          <Formik
            initialValues={initialValues}
            validationSchema={roomSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                // Simulate API save
                await new Promise((r) => setTimeout(r, 600));
                setAlert({
                  type: "success",
                  message: isEdit
                    ? "The room was successfully updated."
                    : "Room added successfully.",
                });
                setTimeout(() => {
                  router.push("/admin/room");
                }, 900);
              } catch (e) {
                setAlert({
                  type: "error",
                  message: "An error occurred. Please try again.",
                });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Room name</Label>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    placeholder="cth: Indoor"
                  />
                  <ErrorMessage name="name">
                    {(msg) => <p className="text-sm text-rose-500">{msg}</p>}
                  </ErrorMessage>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    onValueChange={(v) => setFieldValue("status", v)}
                    defaultValue={initialValues.status}
                  >
                    <SelectTrigger className="w-full md:max-w-xs">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="reserved">Reserved</SelectItem>
                      <SelectItem value="occupied">Occupied</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage name="status">
                    {(msg) => <p className="text-sm text-rose-500">{msg}</p>}
                  </ErrorMessage>
                </div>

                <div className="space-y-2">
                  <Label>Image</Label>
                  <div
                    ref={dropRef}
                    className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      onDrop(e.dataTransfer.files, setFieldValue);
                    }}
                    onClick={() => {
                      const input = dropRef.current?.querySelector(
                        "input[type=file]"
                      ) as HTMLInputElement | null;
                      input?.click();
                    }}
                    aria-label="Dropzone upload images"
                  >
                    <p className="text-sm text-muted-foreground">
                      Drag & drop images here, or click to select
                    </p>
                    {preview && (
                      <div className="mt-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={preview || "/placeholder.svg"}
                          alt="Preview room image"
                          className="mx-auto h-32 w-auto rounded-md object-cover"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => onDrop(e.target.files, setFieldValue)}
                    />
                  </div>
                  <ErrorMessage name="image">
                    {(msg) => <p className="text-sm text-rose-500">{msg}</p>}
                  </ErrorMessage>
                </div>

                <CardFooter className="flex justify-end gap-2 px-0">
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer bg-transparent"
                    onClick={() => history.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="cursor-pointer"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Menyimpan..." : "Save"}
                  </Button>
                </CardFooter>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
