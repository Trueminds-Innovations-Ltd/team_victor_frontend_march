import { motion } from "framer-motion";
import { useApp } from "../../contexts/AppContext";
import ExploreCourseCard from "./ExploreCourseCard";
import { Link } from "react-router-dom";

export const badgeStyles = {
  orange: "bg-orange-500 text-white",
  teal: "bg-teal-500 text-white",
};

export default function ExploreCourses() {
  const { exploreCourses } = useApp();
  const MotionLink = motion(Link);

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Explore Graphic Design Courses</h2>
         <MotionLink
          to='/courses'
          whileHover={{ x: 3 }}
          className='text-purple-600 text-sm font-medium flex items-center gap-1 hover:underline'
        >
          View All →
        </MotionLink>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {exploreCourses.map((course, index) => (
          <ExploreCourseCard key={course.id} course={course} index={index} />
        ))}
      </div>
    </section>
  );
}

