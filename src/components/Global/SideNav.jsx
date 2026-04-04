"use client";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  Home,
  Layers,
  Users,
  CheckSquare,
  MessageCircle,
  Sparkles,
  Settings,
  LogOut,
} from "lucide-react";

/* ================= NAV ITEMS ================= */
const navItems = [
  { id: "home", icon: Home, path: "/dashboard" },
  { id: "courses", icon: Layers, path: "/mo" },
  { id: "community", icon: Users, path: "/dashboard" },
  { id: "tasks", icon: CheckSquare, path: "/file" },
  { id: "chat", icon: MessageCircle, path: "/message", badge: 3 },
];

/* ================= COMPONENT ================= */
export default function SideNav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      {/* ================= MOBILE HEADER ================= */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-14 bg-white flex items-center px-4 shadow-sm z-30">
        <button onClick={() => setOpen(true)}>
          <Menu size={22} />
        </button>
        <span className="ml-4 font-semibold">Dashboard</span>
      </div>

      {/* =MOBILE SIDEBAR == */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Sidebar */}
            <motion.aside
              className="fixed left-0 top-0 h-full w-[72px] bg-white z-40 shadow-lg flex flex-col items-center"
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              exit={{ x: -100 }}
            >
              <SidebarContent location={location} handleNav={handleNav} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-[72px] bg-white flex-col items-center shadow-sm">
        <SidebarContent location={location} handleNav={navigate} />
      </aside>
    </>
  );
}

/* ================= SIDEBAR CONTENT ================= */
function SidebarContent({ location, handleNav }) {
  return (
    <>
      {/* Logo */}
      <div className="w-full h-[88px] bg-purple-600 flex items-center justify-center">
        <span className="text-white font-bold">Logo</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col items-center gap-1 pt-4 flex-1">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isActive={location.pathname === item.path}
            onClick={() => handleNav(item.path)}
          />
        ))}
      </nav>

      {/* Divider */}
      <div className="w-10 h-px bg-gray-200 my-2" />

      {/* AI Button */}
      <button
        onClick={() => handleNav("/magic")}
        className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4 text-white"
      >
        <Sparkles size={20} />
      </button>

      {/* Divider */}
      <div className="w-10 h-px bg-gray-200 my-2" />

      {/* Bottom */}
      <div className="flex flex-col items-center gap-7 pb-5">
        <button
          onClick={() => handleNav("/settings")}
          className="text-gray-500 hover:text-black"
        >
          <Settings size={20} />
        </button>

        <button
          onClick={() => handleNav("/logout")}
          className="text-gray-500 hover:text-black"
        >
          <LogOut size={20} />
        </button>
      </div>
    </>
  );
}

/* ================= NAV ITEM ================= */
function NavItem({ item, isActive, onClick }) {
  const Icon = item.icon;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className={`relative w-12 h-12 flex items-center justify-center rounded-xl transition ${
        isActive
          ? "text-purple-600 bg-purple-50"
          : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
      }`}
    >
      {/* Active Indicator */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-purple-600 rounded-r" />
      )}

      <Icon size={20} />

      {/* Badge */}
      {item.badge && (
        <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold">
          {item.badge}
        </span>
      )}
    </motion.button>
  );
}