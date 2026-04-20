import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../contexts/AppContext";
import { useLogout } from "../../hooks/useLogout";
import { LogOut, Settings, User } from "lucide-react";

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

        <div className="hidden items-center gap-3 md:flex">
          <button className="relative rounded-full p-2 transition hover:bg-white">
            <img src="/images/nt.png" alt="notification" className="h-5 w-5" />

            {notifications > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {notifications}
              </span>
            )}
          </button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpenMenu((prev) => !prev)}
              className={`flex items-center gap-2 rounded-full px-2 py-1.5 transition-all ${
                openMenu
                  ? "bg-white shadow-sm ring-1 ring-[#8533cd]/15"
                  : "hover:bg-white"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#a855f7] to-[#7c3aed] text-sm font-semibold text-white shadow-md">
                {firstNameInitial}
                {lastNameInitial}
              </div>

              <div className="hidden flex-col leading-tight md:flex">
                <span className="text-xs font-semibold text-gray-800">
                  {fullName || "User"}
                </span>
                <span className="text-[10px] capitalize text-gray-400">
                  {track}
                </span>
              </div>

              <span
                className={`hidden text-sm text-gray-500 transition-transform md:block ${
                  openMenu ? "rotate-180" : ""
                }`}
              >
                ⌄
              </span>
            </button>

            <AnimatePresence>
              {openMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full z-50 mt-3 w-[320px] overflow-hidden rounded-3xl border border-[#ede9fe] bg-white shadow-[0_20px_50px_rgba(17,24,39,0.12)]"
                >
                  <div className="border-b border-[#f1f5f9] bg-gradient-to-r from-[#faf5ff] to-white p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#a855f7] to-[#7c3aed] text-sm font-semibold text-white">
                        {firstNameInitial}
                        {lastNameInitial}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-800">
                          {fullName || "User"}
                        </p>
                        <p className="truncate text-xs text-gray-500">{email}</p>
                        <p className="mt-1 text-[11px] font-medium capitalize text-[#8533cd]">
                          {track}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <button className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left transition hover:bg-[#f9f5ff]">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f3e8ff] text-[#8533cd]">
                          <User size={16} />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          My Account
                        </span>
                      </div>
                    </button>

                    <button className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left transition hover:bg-[#f9f5ff]">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f3e8ff] text-[#8533cd]">
                          <Settings size={16} />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          Settings
                        </span>
                      </div>
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left transition hover:bg-red-50"
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
        </div>
      </div>
    </header>
  );
}