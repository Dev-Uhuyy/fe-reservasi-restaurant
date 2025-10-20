import { Button } from "@/components/ui/button"
import TablesContent from "@/components/admin/tables/tables-content"

export default function Page() {
  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-between items-center pb-8">
        <div className="text-2xl font-bold">Table Management</div>
        <a href="/admin/tables/add">
          <Button className="cursor-pointer">Add New Table</Button>
        </a>
      </div>

      <TablesContent />
    </div>
  )
}