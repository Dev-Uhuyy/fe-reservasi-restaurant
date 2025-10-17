import FormRoom from "@/components/admin/room/form-room"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function Page() {
  return (
    <div>
      <div className="flex flex-wrap gap-4 px-14 items-center py-4">
        <a href="/admin/room">
          <Button className="cursor-pointer">
            <ArrowLeft />
          </Button>
        </a>
        <div className="font-medium text-2xl">Add Room</div>
      </div>
      <FormRoom />
    </div>
  )
}
