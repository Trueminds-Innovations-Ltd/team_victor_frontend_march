import { useMemo } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { filters, coursesData, levelStyles } from "./CourseData";

const filterMap = {
  all: "All",
  inprogress: "In Progress",
  completed: "Completed",
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};
const filterToSlug = (filter) => {
  if (filter === "All") return "all";
  return filter.toLowerCase().replace(/\s+/g, "-");
};

export default function CourseOverview() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterFromUrl = searchParams.get("filter") || "all";
  const activeFilter = filterMap[filterFromUrl] || "All";
  const handleFilterClick = (filter) => {
    setSearchParams({ filter: filterToSlug(filter) });
  };
  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
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
  }, [activeFilter]);

  return (
    <section className="min-h-screen w-full bg-[#f5f5f7] px-4 py-3">
      <div className="w-full">

        {/* FILTER BUTTONS */}
        <div className="mb-6 flex w-full flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeFilter === filter
                  ? "bg-violet-600 text-white"
                  : "border border-gray-300 bg-white text-gray-600 hover:border-violet-400 hover:text-violet-600"
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
              <div className="h-[155px] w-full overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex min-h-[158px] flex-col">
                <div className="flex-1 border-t border-[#d9dde4] px-5 pb-3 pt-4">
                  <h3 className="text-xl font-bold leading-[1.4] text-[#0F172A]">
                    {course.title}
                  </h3>

                  <span
                    className={`mt-3 inline-flex rounded-md px-2.5 py-1 text-[11px] font-medium ${levelStyles[course.level]}`}
                  >
                    {course.level}
                  </span>
                </div>

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

        {filteredCourses.length === 0 && (
          <p className="mt-10 text-center text-gray-500">
            No courses found
          </p>
        )}
      </div>
    </section>
  );
}