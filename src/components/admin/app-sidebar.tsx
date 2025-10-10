import {
  Armchair,
  Home,
  Microwave,
  SquareMenu,
  Wallet,
  Warehouse,
} from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Image from "next/image";
import { Button } from "../ui/button";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Menu Management",
    url: "#",
    icon: SquareMenu,
  },
  {
    title: "Category Management",
    url: "#",
    icon: Microwave,
  },
  {
    title: "Rooms Management",
    url: "#",
    icon: Warehouse,
  },
  {
    title: "Table Management",
    url: "#",
    icon: Armchair,
  },
  {
    title: "Payment Method Management",
    url: "#",
    icon: Wallet,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex justify-center">
          <Image src="/logo.svg" alt="logo" width={120} height={40} priority />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant={"destructive"}>Logout</Button>
      </SidebarFooter>
    </Sidebar>
  );
}
