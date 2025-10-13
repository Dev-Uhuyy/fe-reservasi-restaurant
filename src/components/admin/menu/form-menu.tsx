"use client";

import type React from "react";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryItems } from "@/app/data/admin/category";
import type { MenuItem, MenuStatus } from "@/app/interface/admin/menu";
import { menuSchema } from "@/lib/validations/menuSchema";
import { X } from "lucide-react";
import { addMenu, updateMenu } from "@/lib/menu-storage";

type FormMode = "create" | "edit";

interface FormMenuProps {
  mode?: FormMode;
  initialData?: Partial<MenuItem>;
}

export default function FormMenu({
  mode = "create",
  initialData,
}: FormMenuProps) {
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    name: initialData?.name ?? "",
    price: initialData?.price?.toString() ?? "",
    categoryId: initialData?.categoryId ?? "",
    description: initialData?.description ?? "",
    stock: initialData?.stock?.toString() ?? "",
    unit: initialData?.unit ?? "",
    status: (initialData?.status ?? "active") as MenuStatus,
    imageFile: null as File | null,
    imagePreview: initialData?.imageUrl ?? "/placeholder.jpg",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => categoryItems, []);

  const handleChange = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const onDrop = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFormValues((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: preview,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);
    setErrors({});

    try {
      const payload = {
        ...formValues,
        price: Number(formValues.price),
        stock: Number(formValues.stock),
      };

      await menuSchema.validate(payload, { abortEarly: false });

      if (mode === "create") {
        const newMenu: MenuItem = {
          menuId: crypto.randomUUID(),
          name: formValues.name,
          description: formValues.description,
          price: Number(formValues.price),
          categoryId: formValues.categoryId,
          stock: Number(formValues.stock),
          unit: formValues.unit,
          status: formValues.status,
          imageUrl: formValues.imagePreview || "/placeholder.jpg",
        };
        addMenu(newMenu);
      } else if (mode === "edit" && initialData?.menuId) {
        const updatedMenu: Partial<MenuItem> = {
          name: formValues.name,
          description: formValues.description,
          price: Number(formValues.price),
          categoryId: formValues.categoryId,
          stock: Number(formValues.stock),
          unit: formValues.unit,
          status: formValues.status,
          imageUrl: formValues.imagePreview,
        };
        updateMenu(initialData.menuId, updatedMenu);
      }

      setAlert({
        type: "success",
        message:
          mode === "create"
            ? "Menu item successfully added."
            : "Menu item successfully updated.",
      });

      setTimeout(() => {
        router.push("/admin/menu");
      }, 600);
    } catch (err) {
      if (
        err instanceof Error &&
        "name" in err &&
        err.name === "ValidationError"
      ) {
        const validationError = err as any;
        const fieldErrors: Record<string, string> = {};
        validationError.inner.forEach((e: any) => {
          if (e.path && !fieldErrors[e.path]) fieldErrors[e.path] = e.message;
        });
        setErrors(fieldErrors);
        setAlert({ type: "error", message: "Please check your inputs." });
      } else {
        setAlert({ type: "error", message: "An unexpected error occurred." });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-14 py-5">
      {alert && (
        <Alert
          variant={alert.type === "success" ? "default" : "destructive"}
          className="mb-4"
        >
          <AlertTitle>
            {alert.type === "success" ? "Success" : "Error"}
          </AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
          <div className="space-y-3">
            <Label htmlFor="menu-name">Name</Label>
            <Input
              id="menu-name"
              placeholder="Menu name"
              value={formValues.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && (
              <p className="text-sm text-rose-600">{errors.name}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="menu-price">Price</Label>
            <Input
              id="menu-price"
              placeholder="Price"
              inputMode="numeric"
              value={formValues.price}
              onChange={(e) => handleChange("price", e.target.value)}
            />
            {errors.price && (
              <p className="text-sm text-rose-600">{errors.price}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="menu-category">Category</Label>
            <Select
              value={formValues.categoryId}
              onValueChange={(v) => handleChange("categoryId", v)}
            >
              <SelectTrigger id="menu-category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.categoryId} value={c.categoryId}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && (
              <p className="text-sm text-rose-600">{errors.categoryId}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="menu-status">Status</Label>
            <Select
              value={formValues.status}
              onValueChange={(v) => handleChange("status", v)}
            >
              <SelectTrigger id="menu-status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-rose-600">{errors.status}</p>
            )}
          </div>

          <div className="md:col-span-2 space-y-3">
            <Label htmlFor="menu-description">Description</Label>
            <Textarea
              id="menu-description"
              placeholder="Menu description"
              value={formValues.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="min-h-24"
            />
            {errors.description && (
              <p className="text-sm text-rose-600">{errors.description}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="menu-stock">Stock</Label>
            <Input
              id="menu-stock"
              placeholder="Stock"
              inputMode="numeric"
              value={formValues.stock}
              onChange={(e) => handleChange("stock", e.target.value)}
            />
            {errors.stock && (
              <p className="text-sm text-rose-600">{errors.stock}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="menu-unit">Unit</Label>
            <Input
              id="menu-unit"
              placeholder="example : plate, glass, pcs"
              value={formValues.unit}
              onChange={(e) => handleChange("unit", e.target.value)}
            />
            {errors.unit && (
              <p className="text-sm text-rose-600">{errors.unit}</p>
            )}
          </div>

          <div className="md:col-span-2 space-y-3">
            <Label>Image</Label>
            <div
              ref={dropRef}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                onDrop(e.dataTransfer.files);
              }}
              className="border rounded-md p-4 flex flex-col md:flex-row gap-4 items-center justify-between"
            >
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={formValues.imagePreview || "/placeholder.jpg"}
                  alt="Preview"
                  className="h-20 w-20 object-cover rounded-md"
                />
                <div className="text-sm">
                  <p className="font-medium">Drag & drop an image here</p>
                  <p className="text-muted-foreground">
                    or click the button to select a file
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <label className="cursor-pointer">
                  <span className="sr-only">Select file</span>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onDrop(e.target.files)}
                  />
                </label>
                {formValues.imageFile && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setFormValues((prev) => ({
                        ...prev,
                        imageFile: null,
                        imagePreview: "/placeholder.jpg",
                      }))
                    }
                  >
                    <X className="mr-1 h-4 w-4" />
                    Clear
                  </Button>
                )}
              </div>
            </div>
            {errors.imageFile && (
              <p className="text-sm text-rose-600">{errors.imageFile}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer bg-transparent"
            onClick={() => router.push("/admin/menu")}
          >
            Cancel
          </Button>
          <Button type="submit" className="cursor-pointer">
            {mode === "create" ? "Save" : "Update"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
