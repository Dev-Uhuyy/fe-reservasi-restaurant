import React from 'react'
import TableCategory from '@/components/admin/category/table-category'
import { Button } from '@/components/ui/button'

function page() {
  return (
    <div className='p-4'>
        <div className="flex flex-wrap justify-between items-center pb-8">
            <div className="text-2xl font-bold">Category Management</div>
            <Button className='cursor-pointer'>Add Category</Button>
        </div>
        
        <TableCategory/>
    </div>
  )
}

export default page