import { motion } from "framer-motion";
export function AIRecommendation() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
      className="bg-white rounded-2xl p-5 border border-gray-100"
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span>✨</span>
        <h3 className="font-bold text-gray-900 text-sm">AI Recommendation</h3>
      </div>
      <p className="text-xs text-gray-400 mb-3">Recommendation for You</p>

      {/* Recommended course row */}
      <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
        <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-purple-600 to-blue-600" />

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900">Colour Psychology</p>
          <p className="text-xs text-gray-400 mb-2">Based on your progress</p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="text-xs font-semibold text-purple-600 border border-purple-200 bg-white px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-purple-50 transition-colors"
          >
            Continue Lesson →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
