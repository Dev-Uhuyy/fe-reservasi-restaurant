import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/app-sidebar";
import { CircleUserRound } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header>
          <div className="flex justify-between">
            <SidebarTrigger />
            <div className="flex flex-wrap gap-2 p-4">
              <CircleUserRound></CircleUserRound>
              <h6>Admin</h6>
            </div>
          </div>
          {children}
        </header>
      </SidebarInset>
    </SidebarProvider>
  );
}
