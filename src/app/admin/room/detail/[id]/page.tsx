import { notFound } from "next/navigation"
import FormRoom from "@/components/admin/room/form-room"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { roomItems } from "@/app/data/admin/room"

export default function Page({ params }: { params: { id: string } }) {
  const data = roomItems.find((r) => r.id === params.id)
  if (!data) return notFound()

  return (
    <div>
      <div className="flex flex-wrap gap-4 px-14 items-center py-4">
        <a href="/admin/room">
          <Button className="cursor-pointer">
            <ArrowLeft />
          </Button>
        </a>
        <div className="font-medium text-2xl">Edit Ruangan</div>
      </div>
      <FormRoom initial={data} isEdit />
    </div>
  )
}
