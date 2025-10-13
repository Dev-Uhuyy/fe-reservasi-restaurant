export type MenuStatus = "active" | "inactive"

export interface MenuItem {
  menuId: string
  name: string
  description: string
  price: number
  categoryId: string
  stock: number
  unit: string
  status: MenuStatus
  imageUrl?: string // public path or blob preview
}
