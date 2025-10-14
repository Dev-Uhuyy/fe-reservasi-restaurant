import React from 'react'
import TableForm from '@/components/admin/tables/table-form'
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
        <div className="font-medium text-2xl">Add Table</div>
      </div>
        <TableForm/>
    </div>
  )
}

export default page