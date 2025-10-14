import React from "react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function FormCategory() {
  return (
      <div className="px-14 py-5">
        <Card>
          <CardContent className="space-y-3">
            <Label htmlFor="category-name">Category Name</Label>
            <Input id="category-name" placeholder="Category Name"></Input>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button className="cursor-pointer">Save</Button>
          </CardFooter>
        </Card>
      </div>
  );
}

export default FormCategory;
