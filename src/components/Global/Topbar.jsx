import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../contexts/AppContext";

export default function Topbar() {
  const { user, searchQuery, setSearchQuery } = useApp();
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  // close dropdown on outside click
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
    <header className="sticky top-0 z-20 bg-[#F5F5F7] border-b border-gray-100 px-4 md:px-6 py-3">
      <div className="flex items-center justify-between gap-4">

        {/* SEARCH */}
        <div className="flex-1 w-full rounded-[20px] bg-white p-1.5">
          <div className="flex items-center gap-2 rounded-[16px] bg-[#F5F5F7] px-3 py-2">
            
            <img
              src="/images/Search.png"
              alt="search"
              className="h-5 w-5 object-contain opacity-70"
            />

            <input
              type="text"
              placeholder="Search modules, courses, or documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-gray-600 placeholder:text-gray-400 outline-none"
            />

            <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white transition">
              <img
                src="/images/sl.png"
                alt="filter"
                className="h-5 w-5 object-contain"
              />
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 flex-shrink-0">

          {/* NOTIFICATION */}
          <button className="relative p-2 rounded-full hover:bg-white transition">
            <img src="/images/nt.png" alt="notification" className="h-5 w-5" />

            {user.notifications > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                {user.notifications}
              </span>
            )}
          </button>

          {/* PROFILE */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-white transition"
            >
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                {user.name[0]}
                {user.lastName[0]}
              </div>

              {/* Name */}
              <div className="hidden md:flex flex-col leading-[1.1]">
                <span className="text-[12px] font-semibold text-gray-800">
                  {user.name} {user.lastName}
                </span>
                <span className="text-[10px] text-gray-400">
                  {user.role}
                </span>
              </div>

              {/* Arrow */}
              <span className="hidden md:block text-gray-500 text-sm">⌄</span>
            </button>

            {/* DROPDOWN */}
            <AnimatePresence>
              {openMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-[300px] bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
                >
                  {/* USER INFO */}
                  <div className="flex gap-3 p-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {user.name[0]}
                      {user.lastName[0]}
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {user.name} {user.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user.email}
                      </p>
                      <p className="text-sm text-gray-400">
                        {user.role}
                      </p>

                      <button className="mt-2 text-sm text-purple-600 font-medium hover:underline">
                        View Profile →
                      </button>
                    </div>

                    <button
                      onClick={() => setOpenMenu(false)}
                      className="text-xl text-gray-500"
                    >
                      ×
                    </button>
                  </div>

                  <div className="border-t" />

                  {/* MENU */}
                  <div className="p-2">
                    <button className="w-full text-left px-3 py-3 hover:bg-gray-50 rounded-xl">
                      ⚙️ Account Settings
                    </button>

                    <div className="flex items-center justify-between px-3 py-3 hover:bg-gray-50 rounded-xl">
                      <span>🌙 Dark Mode</span>
                      <div className="w-10 h-5 bg-gray-200 rounded-full" />
                    </div>

                    <button className="w-full text-left px-3 py-3 text-red-500 hover:bg-red-50 rounded-xl">
                      ↪ Logout
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