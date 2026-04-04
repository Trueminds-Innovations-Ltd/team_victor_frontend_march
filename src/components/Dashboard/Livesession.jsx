import { motion } from "framer-motion";
import { useApp } from "../../contexts/AppContext";
export function LiveSession() {
//   const { liveSessions } = useApp();
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="bg-orange-50 rounded-2xl p-5 border border-orange-100"
    >
      {/* Live indicator */}
      <div className="flex items-center gap-1.5 mb-2">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-xs font-semibold text-red-500">Live Now</span>
      </div>

      <h3 className="font-bold text-gray-900 text-sm mb-0.5">Design Mentorship Session</h3>
      <p className="text-xs text-gray-500 mb-3">
        With <span className="font-semibold text-gray-700">Michael Chen</span> • 45 student online
      </p>

      {/* Avatar stack + join button */}
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {["bg-purple-400", "bg-blue-400", "bg-pink-400", "bg-teal-400", "bg-orange-400"].map(
            (color, i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-full ${color} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
              >
                {String.fromCharCode(65 + i)}
              </div>
            )
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 bg-orange-500 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-orange-600 transition-colors"
        >
          <span>🎥</span> Join Now
        </motion.button>
      </div>
    </motion.div>
  );
}