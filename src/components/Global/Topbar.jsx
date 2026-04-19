import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../contexts/AppContext";
import { useLogout } from "../../hooks/useLogout";
import { LogOut, Settings, User, ChevronRight, X } from "lucide-react";

export default function Topbar() {
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

  // ✅ FIXED (no crash)
  const fullName = currentUser?.name ?? "";
  const nameParts = fullName.split(" ");
  const firstNameInitial = nameParts[0]?.[0] || "";
  const lastNameInitial = nameParts[1]?.[0] || "";

  const track =
    currentUser?.track ||
    currentUser?.role ||
    currentUser?.learningTrack ||
    "User";

  const email = currentUser?.email || "";
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
    <header className="z-20 bg-[#F5F5F7] px-2 py-2 md:px-6 md:py-3">
      <div className="flex items-center justify-between gap-4">
        {/* SEARCH */}
        <div className="w-full flex-1 rounded-[14px] bg-white p-1 shadow-sm md:rounded-[20px] md:p-1.5">
          <div className="flex items-center gap-2 rounded-[10px] bg-[#F5F5F7] px-2.5 py-2 md:rounded-[16px] md:px-3">
            <img
              src="/images/Search.png"
              alt="search"
              className="h-4 w-4 object-contain opacity-70 md:h-5 md:w-5"
            />

            <input
              type="text"
              placeholder="Search modules, courses, or documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-[10px] text-gray-600 outline-none placeholder:text-gray-400 md:text-sm"
            />

            <button className="flex h-6 w-6 items-center justify-center rounded-full transition hover:bg-white md:h-8 md:w-8">
              <img
                src="/images/sl.png"
                alt="filter"
                className="h-3.5 w-3.5 object-contain md:h-5 md:w-5"
              />
            </button>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden items-center gap-3 md:flex">
          <button className="relative rounded-full p-2 transition hover:bg-white">
            <img src="/images/nt.png" alt="notification" className="h-5 w-5" />

            {notifications > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {notifications}
              </span>
            )}
          </button>

          {/* USER MENU */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-white"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-purple-600 text-sm font-semibold text-white">
                {firstNameInitial}
                {lastNameInitial}
              </div>

              <div className="hidden flex-col md:flex leading-tight">
                <span className="text-xs font-semibold text-gray-800">
                  {fullName || "User"}
                </span>
                <span className="text-[10px] capitalize text-gray-400">
                  {track}
                </span>
              </div>

              <span className="hidden text-sm text-gray-500 md:block">⌄</span>
            </button>

            <AnimatePresence>
              {openMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full z-50 mt-3 w-[300px] rounded-2xl border bg-white shadow-xl"
                >
                  <div className="p-4 border-b">
                    <p className="font-semibold text-sm text-gray-800">
                      {fullName || "User"}
                    </p>
                    <p className="text-xs text-gray-500">{email}</p>
                  </div>

                  <div className="p-2">
                    <button className="flex w-full items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50">
                      <User size={16} />
                      <span className="text-sm">My Account</span>
                    </button>

                    <button className="flex w-full items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50">
                      <Settings size={16} />
                      <span className="text-sm">Settings</span>
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-red-500"
                    >
                      <LogOut size={16} />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}