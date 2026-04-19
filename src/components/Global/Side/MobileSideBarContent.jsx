import {
  X,
  Bell,
  Home,
  Layers,
  Users,
  FileText,
  MessageCircle,
  Folder,
  Settings,
  LogOut,
} from "lucide-react";
import { useLogout } from "../../../hooks/useLogout";

const mobileNavItems = [
  { id: "dashboard", label: "Dashboard", img: "/images/nv9.png",path: "/dashboard" },
  { id: "courses", label: "My Courses",  img: "/images/nv8.png", path: "/courses" },
  { id: "community", label: "Community", img: "/images/nv7.png", path: "/community" },
  { id: "projects", label: "My Projects", img:"/images/nv6.png", path: "/project" },
  { id: "messages", label: "Messages", img:"/images/nv5.png", path: "/message", badge: 3 },
  { id: "resources", label: "Resources",img:"/images/nv2.png", path: "/resources" },
  { id: "settings", label: "Settings", img:"/images/nv1.png", path: "/settings" },
  { id: "logout", label: "Log out", img:"/images/nv11.png", action: "logout" },
];

export default function MobileSidebarContent({ pathname, onNavigate, onClose }) {
  const handleLogout = useLogout();

  const handleItemClick = (item) => {
    if (item.action === "logout") {
      handleLogout();
      onClose();
      return;
    }

    onNavigate(item.path);
  };

  return (
    <div className="flex h-full flex-col bg-[#f7f7f8]">
      {/* Nav items */}
      <nav className="flex flex-1 flex-col gap-5 px-4 py-8">
        {mobileNavItems.map((item) => {
          const Images = item.img;
          const isActive = item.path && pathname === item.path;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left transition ${
                isActive
                  ? "bg-[#e9ddf7] text-purple-600"
                  : "text-[#1f2937]"
              }`}
            >
              <div className="flex items-center gap-4">
                <img src={Images} alt="img" className="w-5 h-5 object-cover" />
                <span className="text-[17px] font-medium">{item.label}</span>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}