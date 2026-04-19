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
  { id: "dashboard", label: "Dashboard", icon: Home, path: "/dashboard" },
  { id: "courses", label: "My Courses", icon: Layers, path: "/courses" },
  { id: "community", label: "Community", icon: Users, path: "/community" },
  { id: "projects", label: "My Projects", icon: FileText, path: "/project" },
  { id: "messages", label: "Messages", icon: MessageCircle, path: "/message", badge: 3 },
  { id: "resources", label: "Resources", icon: Folder, path: "/resources" },
  { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  { id: "logout", label: "Log out", icon: LogOut, action: "logout" },
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
          const Icon = item.icon;
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
                <Icon size={24} strokeWidth={1.9} />
                <span className="text-[17px] font-medium">{item.label}</span>
              </div>

              {item.badge && (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}