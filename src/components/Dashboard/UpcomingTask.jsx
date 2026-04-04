import { useApp } from "../../contexts/AppContext";
import { motion } from "framer-motion";
import TaskItem from "./TaskItem";  
export default function UpcomingTasks() {
  const { upcomingTasks } = useApp();
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="bg-white rounded-2xl p-5 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 text-sm">Upcoming Tasks</h3>
        <motion.button
          whileHover={{ x: 2 }}
          className="text-purple-600 text-xs font-medium hover:underline"
        >
          View All →
        </motion.button>
      </div>

      <div className="flex flex-col gap-3">
        {upcomingTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] text-xs font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
      >
        View All Deadlines
      </motion.button>
    </motion.div>
  );
}