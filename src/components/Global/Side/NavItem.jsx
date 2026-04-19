import { motion } from "framer-motion";

export default function NavItem({ item, isActive, onClick }) {
  // const Images = item.img;
  return (
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
      {isActive && (
        <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-purple-600" />
      )}

      <img src={item.img} alt="item img" className="w-5 h-5 object-contain" />

      {/* {item.badge && (
        <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
          {item.badge}
        </span>
      )} */}
    </motion.button>
  );
}