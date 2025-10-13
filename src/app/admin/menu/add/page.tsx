import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import FormMenu from "@/components/admin/menu/form-menu"

export default function Page() {
  return (
    <div>
      <div className="flex flex-wrap gap-4 px-14">
        <a href="/admin/menu">
          <Button className="cursor-pointer">
            <ArrowLeft />
          </Button>
        </a>
        <div className="font-medium text-2xl">Add Menu</div>
      </div>
      <FormMenu mode="create" />
    </div>
  )
}
