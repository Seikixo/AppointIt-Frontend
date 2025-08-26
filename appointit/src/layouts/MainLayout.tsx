import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      <SidebarProvider>
        <AppSidebar />
        <main className="p-4 w-full min-h-svh">
          <SidebarTrigger className="cursor-pointer" />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default MainLayout;
