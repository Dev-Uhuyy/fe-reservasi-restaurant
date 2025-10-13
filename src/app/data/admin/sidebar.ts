import { Home, SquareMenu, Microwave, Warehouse, Armchair, Wallet } from "lucide-react";
import { SidebarItem } from "@/app/interface/admin/sidebar-item";

export const sidebarItems: SidebarItem[] = [
  { title: "Dashboard", url: "#", icon: Home },
  { title: "Menu Management", url: "/admin/menu", icon: SquareMenu },
  { title: "Category Management", url: "/admin/category", icon: Microwave },
  { title: "Rooms Management", url: "#", icon: Warehouse },
  { title: "Table Management", url: "#", icon: Armchair },
  { title: "Payment Method Management", url: "#", icon: Wallet },
];