import { Sparkles, Settings, LogOut } from "lucide-react";
import { navItems } from "./SideNavItems";
import NavItem from "./NavItem";
export default function SidebarContent({ pathname, onNavigate }) {
  return (
    <>
      <div className="flex h-[88px] w-full items-center justify-center bg-purple-600">
        <span className="font-bold text-white">Logo</span>
      </div>
      <nav className="flex flex-1 flex-col items-center gap-1 pt-4">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isActive={pathname === item.path}
            onClick={() => onNavigate(item.path)}
          />
        ))}
      </nav>

      <div className="my-2 h-px w-10 bg-gray-200" />

      <button
        onClick={() => onNavigate("/magic")}
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 text-white"
      >
        <Sparkles size={20} />
      </button>

      <div className="my-2 h-px w-10 bg-gray-200" />

      <div className="flex flex-col items-center gap-7 pb-5">
        <button
          onClick={() => onNavigate("/settings")}
          className="text-gray-500 hover:text-black"
        >
          <Settings size={20} />
        </button>

        <button
          onClick={() => onNavigate("/logout")}
          className="text-gray-500 hover:text-black"
        >
          <LogOut size={20} />
        </button>
      </div>
    </>
  );
}