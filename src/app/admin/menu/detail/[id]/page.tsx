"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { menuItems } from "@/app/data/admin/menu"
import FormMenu from "@/components/admin/menu/form-menu"
import type { MenuItem } from "@/app/interface/admin/menu"

export default function Page() {
  const params = useParams<{ id: string }>()
  const current = useMemo<MenuItem | undefined>(() => menuItems.find((m) => m.menuId === params.id), [params.id])

  return (
    <div>
      <div className="flex flex-wrap gap-4 px-14">
        <a href="/admin/menu">
          <Button className="cursor-pointer">
            <ArrowLeft />
          </Button>
        </a>
        <div className="font-medium text-2xl">Edit Menu</div>
      </div>
      <FormMenu mode="edit" initialData={current} />
    </div>
  )
}
