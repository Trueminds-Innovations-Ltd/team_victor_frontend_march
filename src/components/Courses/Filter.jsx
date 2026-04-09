import { motion } from "framer-motion";
export default function FilterButton({ label, active }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
        active
          ? "border-violet-600 bg-violet-600 text-white shadow-sm"
          : "border-slate-300 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-600"
      }`}
    >
      {label}
    </motion.button>
  );
}