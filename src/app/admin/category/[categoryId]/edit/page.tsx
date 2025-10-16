import React from 'react'
import FormCategory from '@/components/admin/category/form-category'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

function page() {
  return (
    <div>
        <div className="flex flex-wrap gap-4 px-14">
        <a href="/admin/category/">
          <Button className="cursor-pointer">
            <ArrowLeft />
          </Button>
        </a>
        <div className="font-medium text-2xl">Edit Category</div>
      </div>
        <FormCategory/>
    </div>
  )
}

export default page