"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MobileSidebarContent from "./MobileSideBarContent";

export default function MobileSidebar({
  open,
  onClose,
  pathname,
  onNavigate,
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClick = (path) => {
    onNavigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* SIDEBAR */}
          <motion.aside
            className="fixed left-0 top-[75px] z-40 h-[calc(100vh-72px)] w-full max-w-[340px] bg-white shadow-lg lg:hidden flex flex-col"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto">
              <MobileSidebarContent
                pathname={pathname}
                onNavigate={handleClick}
                onClose={onClose}
              />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}