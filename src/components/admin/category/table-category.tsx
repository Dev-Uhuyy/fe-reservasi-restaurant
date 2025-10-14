"use client"

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash } from "lucide-react";

import DeleteCategory from "./delete-category";
import { CategoryItem } from "@/app/interface/admin/category";
import { categoryItems } from "@/app/data/admin/category";
import { useState } from "react";

function TableCategory({categories}: {categories?: CategoryItem[]}) {

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    id?: string;
    name?: string;
  }>({open: false})

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Category ID</TableHead>
            <TableHead>Category Name</TableHead>
            <TableHead  className="flex justify-center items-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoryItems.map((item: CategoryItem) => (
            <TableRow key={item.categoryId}>
              <TableCell className="font-medium">{item.categoryId}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell className="flex gap-2 justify-center items-center">
                <a href={`/admin/category/${item.categoryId}/edit/`}>
              <Button type="button" className="cursor-pointer">
                <SquarePen/>
                Edit
              </Button>
              </a>
              <Button
                type="button"
                variant="destructive"
                className="cursor-pointer"
                onClick={()=>
                  setDeleteDialog({
                  open: true,
                  id: item.categoryId,
                  name: item.name,
                })}
              >
                <Trash/>
                Delete
              </Button>
              <DeleteCategory 
                isOpen={deleteDialog.open}
                onClose={() => setDeleteDialog({open: false})}
                onConfirm={async() => {

                }}
              />
            </TableCell>
          </TableRow>
          )) }
        </TableBody>
      </Table>
    </div>
  );
}

export default TableCategory;
