import { motion } from "framer-motion";
import { badgeStyles } from "./ExploreCourses";
export default function ExploreCourseCard({ course, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={course.img}
          alt={course.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentElement.style.background =
              "linear-gradient(135deg, #1e1e2e, #7c3aed)";
          }}
        />
        {/* Badge */}
        {course.badge && (
          <span
            className={`absolute top-2 left-2 text-xs font-semibold px-2.5 py-1 rounded-full ${
              badgeStyles[course.badgeColor] || "bg-gray-700 text-white"
            }`}
          >
            {course.badge}
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-1">{course.title}</h3>

        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
          <span>{course.duration}</span>
          <span>•</span>
          <span>{course.level}</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-xs font-semibold text-gray-700">{course.rating}</span>
            <span className="text-xs text-gray-400">({course.students} Students)</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xs font-semibold text-purple-600 border border-purple-200 bg-purple-50 px-3 py-1.5 rounded-lg hover:bg-purple-100 transition-colors"
          >
            Start Learning
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
