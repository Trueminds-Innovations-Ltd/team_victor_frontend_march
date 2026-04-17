import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../contexts/AppContext";
import { useLogout } from "../../hooks/useLogout";

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

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fullName = currentUser?.name || "Guest";
  const nameParts = fullName.trim().split(" ");
  const firstNameInitial = nameParts[0]?.[0] || "";
  const lastNameInitial = nameParts[1]?.[0] || "";

  const track =
    currentUser?.track ||
    currentUser?.role ||
    currentUser?.learningTrack ||
    "User";

  const email = currentUser?.email || "";
  const notifications = currentUser?.notifications || 0;

  return (
    <header className="sticky top-0 z-20 border-b border-gray-100 bg-[#F5F5F7] px-4 py-3 md:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="w-full flex-1 rounded-[20px] bg-white p-1.5">
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
              className="w-full bg-transparent text-sm text-gray-600 outline-none placeholder:text-gray-400"
            />

            <button className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white">
              <img
                src="/images/sl.png"
                alt="filter"
                className="h-5 w-5 object-contain"
              />
            </button>
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center gap-3">
          <button className="relative rounded-full p-2 transition hover:bg-white">
            <img
              src="/images/nt.png"
              alt="notification"
              className="h-5 w-5"
            />

            {notifications > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {notifications}
              </span>
            )}
          </button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-white"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-purple-600 text-sm font-semibold text-white">
                {firstNameInitial}
                {lastNameInitial}
              </div>

              <div className="hidden flex-col leading-[1.1] md:flex">
                <span className="text-[12px] font-semibold text-gray-800">
                  {fullName}
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
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-[300px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl"
                >
                  <div className="flex gap-3 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-purple-600 font-semibold text-white">
                      {firstNameInitial}
                      {lastNameInitial}
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{fullName}</p>
                      <p className="text-sm text-gray-500">{email}</p>
                      <p className="text-sm capitalize text-gray-400">
                        {track}
                      </p>

                      <button className="mt-2 text-sm font-medium text-purple-600 hover:underline">
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

                  <div className="p-2">
                    <button className="w-full rounded-xl px-3 py-3 text-left hover:bg-gray-50">
                      Account Settings
                    </button>

                    <div className="flex items-center justify-between rounded-xl px-3 py-3 hover:bg-gray-50">
                      <span> Dark Mode</span>
                      <div className="h-5 w-10 rounded-full bg-gray-200" />
                    </div>

                    <button
                      className="w-full rounded-xl px-3 py-3 text-left text-red-500 hover:bg-red-50"
                      onClick={handleLogout}
                    >
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