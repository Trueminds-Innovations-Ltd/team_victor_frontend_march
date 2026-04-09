import { AnimatePresence, motion } from "framer-motion";
import SidebarContent from "./SidebarContent";

export default function MobileSidebar({ open, onClose, pathname, onNavigate }) {
  const handleClick = (path) => {
    onNavigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-30 bg-black lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed left-0 top-0 z-40 flex h-full w-[72px] flex-col items-center bg-white shadow-lg lg:hidden"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: -100 }}
          >
            <SidebarContent pathname={pathname} onNavigate={handleClick} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}