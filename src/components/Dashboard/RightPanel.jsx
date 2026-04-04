import { motion } from "framer-motion";
import { useApp } from "../../contexts/AppContext";
import { LiveSession } from "./Livesession";
import { AIRecommendation } from "./Recommendation";
import UpcomingTasks from "./UpcomingTask";
import { ProgressBar } from "./ProgressBar";

// Badge color map for task status
export const taskBadgeStyles = {
  orange: "bg-orange-100 text-orange-600",
  green: "bg-green-100 text-green-600",
  blue: "bg-blue-100 text-blue-600",
};

export default function RightPanel() {
  return (
    <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0 flex flex-col gap-4">
      <UpcomingTasks />
      <LiveSession />
      <AIRecommendation />
    </aside>
  );
}


