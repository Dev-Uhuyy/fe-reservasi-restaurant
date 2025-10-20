"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { SquarePen, Trash } from "lucide-react";
import DeleteRoom from "./delete-room";
import type { RoomItem, RoomStatus } from "@/app/interface/admin/room";
import { roomItems as initialRooms } from "@/app/data/admin/room";
import { Alert } from "@/components/ui/alert";

// 🔹 Gabungan tipe filter status (all | available | reserved | occupied)
type FilterStatus = "all" | RoomStatus;

function TableRoom() {
  const [rooms, setRooms] = useState<RoomItem[]>(initialRooms);
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    id?: string;
    name?: string;
  }>({
    open: false,
  });
  const [notif, setNotif] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // 🔹 Filtering data berdasarkan keyword & status
  const filtered = useMemo(() => {
    return rooms.filter((r) => {
      const matchesKeyword =
        !keyword || r.name.toLowerCase().includes(keyword.toLowerCase());
      const matchesStatus = statusFilter === "all" || r.status === statusFilter;
      return matchesKeyword && matchesStatus;
    });
  }, [rooms, keyword, statusFilter]);

  // 🔹 Update status ruangan
  const updateStatus = (id: string, status: RoomStatus) => {
    setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    setNotif({
      type: "success",
      message: "Room status successfully updated.",
    });
    setTimeout(() => setNotif(null), 2000);
  };

  // 🔹 Konfirmasi delete
  const onConfirmDelete = () => {
    if (!deleteDialog.id) return;
    setRooms((prev) => prev.filter((r) => r.id !== deleteDialog.id));
    setDeleteDialog({ open: false });
    setNotif({
      type: "success",
      message: "The room was successfully deleted.",
    });
    setTimeout(() => setNotif(null), 2000);
  };

  return (
    <div className="space-y-4">
      {notif && (
        <Alert variant={notif.type === "success" ? "default" : "destructive"}>
          {notif.message}
        </Alert>
      )}

      {/* 🔹 Filter Section */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <Input
              placeholder="Cari ruangan..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="md:max-w-xs"
            />
            <Select
              value={statusFilter}
              onValueChange={(v: FilterStatus) => setStatusFilter(v)}
            >
              <SelectTrigger className="md:max-w-[180px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 🔹 Tabel Data */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[160px]">Status</TableHead>
            <TableHead className="w-[200px]">Image</TableHead>
            <TableHead className="text-center w-[200px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((room) => (
            <TableRow key={room.id}>
              <TableCell className="font-medium">{room.name}</TableCell>
              <TableCell className="w-[220px]">
                <Select
                  value={room.status}
                  onValueChange={(v: RoomStatus) => updateStatus(room.id, v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              {/* ✅ Kolom Image */}
              <TableCell>
                {room.imageUrl ? (
                  <img
                    src={room.imageUrl}
                    alt={room.name}
                    className="h-16 w-24 object-cover rounded-md"
                  />
                ) : (
                  <span className="text-gray-400 italic">No image</span>
                )}
              </TableCell>
              <TableCell className="flex gap-2 justify-center">
                <Link href={`/admin/room/detail/${room.id}`}>
                  <Button type="button" className="cursor-pointer">
                    <SquarePen />
                    Edit
                  </Button>
                </Link>
                <Button
                  type="button"
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={() =>
                    setDeleteDialog({
                      open: true,
                      id: room.id,
                      name: room.name,
                    })
                  }
                >
                  <Trash />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {filtered.length === 0 && (
            <TableRow>
              <TableCell colSpan={3}>There are no suitable rooms.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* 🔹 Dialog Delete */}
      <DeleteRoom
        isOpen={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false })}
        onConfirm={onConfirmDelete}
        itemName={deleteDialog.name}
      />
    </div>
  );
}

export default TableRoom;
