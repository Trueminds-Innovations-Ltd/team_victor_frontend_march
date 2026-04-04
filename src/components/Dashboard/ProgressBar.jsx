import { motion } from "framer-motion";
export function ProgressBar({ value }) {
  const color =
    value === 100
      ? "bg-green-500"
      : value >= 60
      ? "bg-purple-600"
      : "bg-purple-400";

  return (
    <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1 mb-0.5">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  );
}