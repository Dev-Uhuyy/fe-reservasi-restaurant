import { Button } from "@/components/ui/button"
import TableMenu from "@/components/admin/menu/table-menu"

export default function Page() {
  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-between items-center pb-8">
        <div className="text-2xl font-bold">Menu Management</div>
        <a href="/admin/menu/add">
          <Button className="cursor-pointer">Add Menu</Button>
        </a>
      </div>

      <TableMenu />
    </div>
  )
}
