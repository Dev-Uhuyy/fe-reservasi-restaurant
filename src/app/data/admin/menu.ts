import type { MenuItem } from "@/app/interface/admin/menu"

// Sample static data to mirror categoryItems usage
export const menuItems: MenuItem[] = [
  {
    id: "m-1",
    name: "Grilled Chicken",
    description: "Juicy grilled chicken with herbs.",
    price: 45000,
    categoryId: "1",
    stock: 12,
    unit: "plate",
    status: "active",
    imageUrl: "/placeholder.jpg",
  },
  {
    id: "m-2",
    name: "Iced Tea",
    description: "Refreshing sweet iced tea.",
    price: 10000,
    categoryId: "Beverage",
    stock: 50,
    unit: "glass",
    status: "active",
    imageUrl: "/placeholder.jpg",
  },
  {
    id: "m-3",
    name: "French Fries",
    description: "Crispy golden fries.",
    price: 20000,
    categoryId: "Appetizer",
    stock: 25,
    unit: "basket",
    status: "inactive",
    imageUrl: "/placeholder.jpg",
  },
]
