import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function NavItem({ item, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Button */}
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex h-12 w-12 items-center justify-center rounded-xl transition ${
          isActive
            ? "bg-purple-50 text-purple-600"
            : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        }`}
      >
        {/* Active indicator */}
        {isActive && (
          <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-purple-600" />
        )}

        {/* Icon */}
        <img
          src={item.img}
          alt={item.label}
          className="w-5 h-5 object-contain"
        />
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-14 !z-1000 flex items-center"
          >
            {/* Arrow */}
            <div className="absolute -left-1 h-2 w-2 rotate-45 bg-[#8533cd]" />

            {/* Tooltip content */}
            <div className="whitespace-nowrap rounded-lg !z-1000 bg-[#8533cd] px-3 py-1 text-xs font-medium text-white shadow-[0_4px_20px_rgba(109,40,217,0.35)]">
              {item.label}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}