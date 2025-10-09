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

function TableCategory() {
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
          <TableRow>
            <TableCell className="font-medium">CTG001</TableCell>
            <TableCell>Main Course</TableCell>
            <TableCell className="flex gap-2 justify-center items-center">
              <Button type="button" className="cursor-pointer">
                <SquarePen/>
                Edit
              </Button>
              <Button
                type="button"
                variant="destructive"
                className="cursor-pointer"
              >
                <Trash/>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default TableCategory;
