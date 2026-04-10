import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ProgressBar } from "./ProgressBar";

const MotionLink = motion(Link);

export function CourseCard({ course, index }) {
  const statusStyles = {
    orange: "bg-orange-100 text-orange-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
  };

  const isCompleted = course.progress === 100;
  
  return (
    <MotionLink
      to={`/courses/${course.id}`} // 🔥 THIS IS YOUR PARAM
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
      className="block bg-white rounded-2xl overflow-hidden border border-gray-100"
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
              "linear-gradient(135deg, #7c3aed, #a855f7)";
          }}
        />

        {/* Status badge */}
        <span
          className={`absolute top-2 left-2 text-xs font-semibold px-2.5 py-1 rounded-full ${
            statusStyles[course.statusColor]
          }`}
        >
          {course.status}
        </span>
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-1">
          {course.title}
        </h3>

        <ProgressBar value={course.progress} />

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-400">
            {isCompleted
              ? `Completed ${course.completedDate}`
              : `Lesson ${course.currentLesson} of ${course.totalLessons}`}
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xs font-semibold text-purple-600 flex items-center gap-0.5 hover:underline"
          >
            {isCompleted ? "Review →" : "Resume →"}
          </motion.button>
        </div>
      </div>
    </MotionLink>
  );
}