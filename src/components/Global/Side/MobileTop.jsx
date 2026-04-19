import { useMemo, useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  LogOut,
  Settings,
  User,
  ChevronRight,
  X,
} from "lucide-react";
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

          <div className="flex items-center justify-center">
            <img
              src="/images/logo.png"
              alt="logo"
              className="h-12 w-auto object-contain"
            />
          </div>

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
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-purple-300 to-purple-600 text-sm font-semibold text-white">
                {firstNameInitial}
                {lastNameInitial}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE PROFILE DROPDOWN */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-4 top-[73px] z-[100] w-[300px] overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
          >
            <div className="relative border-b border-gray-100 bg-gradient-to-br from-purple-50 via-white to-white p-5">
              <button
                onClick={() => setOpenMenu(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-black/5 hover:text-gray-700"
              >
                <X size={16} />
              </button>

              <div className="flex items-start gap-4 pr-8">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 text-base font-semibold tracking-wide text-white shadow-md">
                  {firstNameInitial}
                  {lastNameInitial}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold text-gray-900">
                    {fullName}
                  </p>
                  <p className="truncate text-sm text-gray-500">{email}</p>

                  <span className="mt-2 inline-flex rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium capitalize text-purple-700">
                    {track}
                  </span>

                  <button className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-purple-600 transition hover:text-purple-700">
                    View Profile
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-2">
              <button className="group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition hover:bg-gray-50">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition group-hover:bg-purple-100 group-hover:text-purple-600">
                  <User size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">My Account</p>
                  <p className="text-xs text-gray-500">
                    Manage your personal profile
                  </p>
                </div>
              </button>

              <button className="group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition hover:bg-gray-50">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition group-hover:bg-purple-100 group-hover:text-purple-600">
                  <Settings size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    Account Settings
                  </p>
                  <p className="text-xs text-gray-500">
                    Preferences and security
                  </p>
                </div>
              </button>

              <div className="my-2 border-t border-gray-100" />

              <button
                onClick={handleLogout}
                className="group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition hover:bg-red-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 transition group-hover:bg-red-100">
                  <LogOut size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-600">Logout</p>
                  <p className="text-xs text-red-400">
                    Sign out of your account
                  </p>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}