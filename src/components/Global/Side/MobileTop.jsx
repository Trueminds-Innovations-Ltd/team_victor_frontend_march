import { useMemo, useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, LogOut, Settings, User, X } from "lucide-react";
import { useLogout } from "../../../hooks/useLogout";
import { useApp } from "../../../contexts/AppContext";

export default function MobileTopbar({ onOpen }) {
  const { searchQuery, setSearchQuery } = useApp();
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const handleLogout = useLogout();

  const storedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("truemind_user") || "null");
    } catch {
      return null;
    }
  }, []);

  const currentUser = storedUser || {};

  const fullName = currentUser?.name || "Guest User";
  const nameParts = fullName.trim().split(" ");
  const firstNameInitial = nameParts[0]?.[0] || "";
  const lastNameInitial = nameParts[1]?.[0] || "";

  const email = currentUser?.email || "No email";
  const track =
    currentUser?.track ||
    currentUser?.role ||
    currentUser?.learningTrack ||
    "User";

  const notifications = currentUser?.notifications || 0;

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative lg:hidden" ref={menuRef}>
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#8B3DFF] to-[#9333EA] px-4 pt-3 pb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onOpen}
            className="flex h-12 w-12 items-center justify-center rounded-xl text-white transition active:scale-95"
          >
            <Menu size={28} />
          </button>

          <img
            src="/images/logo.png"
            alt="logo"
            className="h-12 w-auto object-contain"
          />

          <div className="flex items-center gap-2">
            {/* NOTIFICATION */}
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full transition active:scale-95">
              <img
                src="/images/nt.png"
                alt="notification"
                className="h-5 w-5 object-contain"
              />

              {notifications > 0 && (
                <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#ff5b3d] text-[10px] font-bold text-white">
                  {notifications}
                </span>
              )}
            </button>

            {/* PROFILE */}
            <button
              onClick={() => setOpenMenu((prev) => !prev)}
              className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full ring-2 ring-white/20 transition active:scale-95"
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#a855f7] to-[#7c3aed] text-sm font-semibold text-white">
                {firstNameInitial}
                {lastNameInitial}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* DROPDOWN */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute right-4 top-[73px] z-[100] w-[320px] overflow-hidden rounded-3xl border border-[#ede9fe] bg-white shadow-[0_20px_60px_rgba(17,24,39,0.12)]"
          >
            {/* PROFILE HEADER */}
            <div className="relative border-b border-[#f1f5f9] bg-gradient-to-r from-[#faf5ff] to-white p-5">
              <button
                onClick={() => setOpenMenu(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-black/5 hover:text-gray-700"
              >
                <X size={16} />
              </button>

              <div className="flex items-start gap-4 pr-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#a855f7] to-[#7c3aed] text-base font-semibold text-white shadow-md">
                  {firstNameInitial}
                  {lastNameInitial}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold text-gray-900">
                    {fullName}
                  </p>
                  <p className="truncate text-sm text-gray-500">{email}</p>

                  <span className="mt-2 inline-flex rounded-full bg-[#f3e8ff] px-2.5 py-1 text-xs font-medium capitalize text-[#8533cd]">
                    {track}
                  </span>
                </div>
              </div>
            </div>

            {/* MENU ITEMS */}
            <div className="p-2">
              <button className="flex w-full items-center justify-between rounded-2xl px-3 py-3 transition hover:bg-[#f9f5ff]">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f3e8ff] text-[#8533cd]">
                    <User size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    My Account
                  </span>
                </div>
              </button>

              <button className="flex w-full items-center justify-between rounded-2xl px-3 py-3 transition hover:bg-[#f9f5ff]">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f3e8ff] text-[#8533cd]">
                    <Settings size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Settings
                  </span>
                </div>
              </button>

              <div className="my-2 border-t border-[#f1f5f9]" />

              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-between rounded-2xl px-3 py-3 transition hover:bg-red-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500">
                    <LogOut size={16} />
                  </div>
                  <span className="text-sm font-medium text-red-500">
                    Logout
                  </span>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}