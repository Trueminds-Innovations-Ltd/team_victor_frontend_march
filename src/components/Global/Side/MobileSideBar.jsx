"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MobileSidebarContent from "./MobileSidebarContent";

export default function MobileSidebar({ open, onClose, pathname, onNavigate }) {
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
          <motion.div
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed left-0 top-20 z-40 h-screen w-full max-w-[340px] bg-white shadow-lg lg:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <MobileSidebarContent
              pathname={pathname}
              onNavigate={handleClick}
              onClose={onClose}
            />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}