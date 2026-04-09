import { useState } from "react";
import { motion } from "framer-motion";
import { filters } from "./CourseData";
import { coursesData } from "./CourseData";
import { levelStyles } from "./CourseData";

export default function CourseOverview() {
  const [activeFilter, setActiveFilter] = useState("All");

  //FILTER LOGIC
  const filteredCourses = coursesData.filter((course) => {
    if (activeFilter === "All") return true;
    if (
      activeFilter === "Beginner" ||
      activeFilter === "Intermediate" ||
      activeFilter === "Advanced"
    ) {
      return course.level === activeFilter;
    }
    if (activeFilter === "In Progress" || activeFilter === "Completed") {
      return course.status === activeFilter;
    }
    return true;
  });
  return (
    <section className="w-full min-h-screen bg-[#f5f5f7] px-4 py-3">
      <div className=" w-full">
        {/* FILTERS */}
        <div className="mb-6 flex flex-wrap gap-3 w-full">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeFilter === filter
                  ? "bg-violet-600 text-white"
                  : "bg-white border border-gray-300 text-gray-600 hover:border-violet-400 hover:text-violet-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="overflow-hidden rounded-[12px] border border-[#d9dde4] bg-white shadow-sm"
            >
              {/* top image */}
              <div className="h-[155px] w-full overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* content */}
              <div className="flex min-h-[158px] flex-col">
                <div className="flex-1 border-t border-[#d9dde4] px-5 pt-4 pb-3">
                  <h3 className="text-xl font-bold leading-[1.4] text-[#0F172A]">
                    {course.title}
                  </h3>

                  <span
                    className={`mt-3 inline-flex rounded-md px-2.5 py-1 text-[11px] font-medium ${levelStyles[course.level]}`}
                  >
                    {course.level}
                  </span>
                </div>

                {/* bottom area */}
                {course.progress ? (
                  <div className="border-t border-[#d9dde4] px-5 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <p className="mb-2 text-[12px] text-[#7b8494]">
                          {course.progress}% Completed
                        </p>

                        <div className="h-[6px] w-full rounded-full bg-[#ececf1]">
                          <div
                            className="h-full rounded-full bg-[#7c3aed]"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>

                      <button className="rounded-md bg-[#7c3aed] px-4 py-1.5 text-[12px] font-semibold text-white">
                        Resume
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-t border-[#d9dde4] px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={course.img}
                        alt={course.author}
                        className="h-9 w-9 rounded-full object-contain"
                      />

                      <div className="leading-tight">
                        <p className="text-[13px] font-medium text-[#374151]">
                          {course.author}
                        </p>
                        <p className="mt-1 text-[11px] text-[#7b8494]">
                          {course.enrolled}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        {/* EMPTY STATE */}
        {filteredCourses.length === 0 && (
          <p className="text-center mt-10 text-gray-500">No courses found</p>
        )}
      </div>
    </section>
  );
}
