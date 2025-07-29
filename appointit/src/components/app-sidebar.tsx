import { Calendar, Home, Inbox, Search, Settings, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/services/auth";
import { clearCredentials } from "@/store/authSlice";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try{
            await logoutUser();
            dispatch(clearCredentials());
            navigate("/login");
        }
        catch(err){
            console.error("Logout failed", err);
        }
    }

  return (
    <Sidebar collapsible="icon">
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>AppointIt</SidebarGroupLabel>
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
            <Dialog>
                <DialogTrigger asChild>
                <SidebarMenuButton asChild>
                    <button type="button" className="flex items-center gap-2 w-full text-left cursor-pointer">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                    </button>
                </SidebarMenuButton>
                </DialogTrigger>

                <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Logout</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to log out?</p>
                <DialogFooter className="gap-2 sm:justify-end">
                    <DialogClose asChild>
                    <button className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer">
                        Cancel
                    </button>
                    </DialogClose>
                    <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                    >
                    Logout
                    </button>
                </DialogFooter>
                </DialogContent>
            </Dialog>
        </SidebarFooter>
    </Sidebar>
  )
}