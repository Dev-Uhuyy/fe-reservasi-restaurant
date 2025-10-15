import TableRoom from "@/components/admin/room/table-room"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-between items-center pb-8">
        <div className="text-2xl font-bold">Room Management</div>
        <a href="/admin/room/add">
          <Button className="cursor-pointer">Add New Room</Button>
        </a>
      </div>

      <TableRoom />
    </div>
  )
}
