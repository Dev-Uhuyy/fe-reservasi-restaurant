"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { categoryItems } from "@/app/data/admin/category";
import {
  getAllMenu,
  deleteMenu as removeMenu,
  seedIfEmpty,
} from "@/lib/menu-storage";
import type { CategoryItem } from "@/app/interface/admin/category";
import type { MenuItem, MenuStatus } from "@/app/interface/admin/menu";
import { SquarePen, Trash } from "lucide-react";
import DeleteMenu from "./delete-menu";

export default function TableMenu() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<MenuStatus | "all">("all");

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    id?: string;
    name?: string;
  }>({ open: false });

  const [items, setItems] = useState<MenuItem[]>([]);

  // Init
  useEffect(() => {
    seedIfEmpty();
    setItems(getAllMenu());

    const onStorage = (e: StorageEvent) => {
      if (e.key === "admin_menu_items_v1") {
        setItems(getAllMenu());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const categoriesMap = useMemo(() => {
    const map = new Map<string, string>();
    categoryItems.forEach((c) => map.set(c.categoryId, c.name));
    return map;
  }, []);

  const filtered = useMemo(() => {
    return items.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" ? true : m.categoryId === categoryFilter;
      const matchesStatus =
        statusFilter === "all" ? true : m.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [items, search, categoryFilter, statusFilter]);

  const handleDelete = (id: string | undefined) => {
    if (!id) return;
    removeMenu(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
    setDeleteDialog({ open: false });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <Input
          placeholder="Search menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select
          value={categoryFilter}
          onValueChange={(v) => setCategoryFilter(v)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categoryItems.map((c: CategoryItem) => (
              <SelectItem key={c.categoryId} value={c.categoryId}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as MenuStatus | "all")}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableCaption>A list of your menu items.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((item: MenuItem) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="h-12 w-12 relative overflow-hidden rounded-md">
                  <Image
                    src={item.imageUrl || "/placeholder.jpg"}
                    alt={`Image of ${item.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="max-w-[300px]">{item.description}</TableCell>
              <TableCell>{Intl.NumberFormat("id-ID").format(item.price)}</TableCell>
              <TableCell>{categoriesMap.get(item.categoryId) ?? "-"}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell
                className={item.status === "active" ? "text-emerald-600" : "text-rose-600"}
              >
                {item.status === "active" ? "Active" : "Inactive"}
              </TableCell>
              <TableCell className="flex gap-2 justify-center items-center">
                <a href={`/admin/menu/detail/${item.id}`}>
                  <Button type="button" className="cursor-pointer">
                    <SquarePen />
                    Edit
                  </Button>
                </a>
                <Button
                  type="button"
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={() =>
                    setDeleteDialog({ open: true, id: item.id, name: item.name })
                  }
                >
                  <Trash />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DeleteMenu
        isOpen={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false })}
        onConfirm={() => handleDelete(deleteDialog.id)}
        itemName={deleteDialog.name}
      />
    </div>
  );
}
