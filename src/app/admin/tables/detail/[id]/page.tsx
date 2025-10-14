import React from 'react'
import EditTableForm from '@/components/admin/tables/edit-table-form'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

function page() {
  return (
    <div>
        <div className="flex flex-wrap gap-4 px-14">
        <a href="/admin/tables/">
          <Button className="cursor-pointer">
            <ArrowLeft />
          </Button>
        </a>
        <div className="font-medium text-2xl">Edit Table</div>
      </div>
        <EditTableForm/>
    </div>
  )
}

export default page