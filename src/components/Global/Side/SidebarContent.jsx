import { LogOut, Settings, Sparkles } from "lucide-react";
import { useLogout } from "../../../hooks/useLogout";
import Logo from "../Logo";
import NavItem from "./NavItem";
import { navItems } from "./SideNavItems";
export default function SidebarContent({ pathname, onNavigate }) {
  const handleLogout = useLogout();
  return (
    <>
      <div className='flex h-[88px] w-full items-center justify-center bg-purple-600'>
        <a href="dashboard" className='font-bold text-white'>
          <img src="/images/logo.png" alt="logo" className="w-20 h-20 object-cover"/>
        </a>
      </div>
      <nav className='flex flex-1 flex-col items-center gap-1 pt-4'>
        {navItems.map((item) => (
          <NavItem key={item.id} item={item} isActive={pathname === item.path} onClick={() => onNavigate(item.path)} />
        ))}
      </nav>

      <div className='my-2 h-px w-10 bg-gray-200' />

      <button
        onClick={() => onNavigate("/magic")}
        className='mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#B685E1] text-white'
      >
        <Sparkles size={20} />
      </button>

      <div className='my-2 h-px w-10 bg-gray-200' />

      <div className='flex flex-col items-center gap-7 pb-5'>
        <button onClick={() => onNavigate("/settings")} className='text-gray-500 hover:text-black'>
          <Settings size={20} />
        </button>

        <button onClick={handleLogout} className='text-gray-500 hover:text-black'>
          <LogOut size={20} />
        </button>
      </div>
    </>
  );
}
