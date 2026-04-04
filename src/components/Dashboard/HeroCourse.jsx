import { motion } from "framer-motion";
import { useApp } from "../../contexts/AppContext";

export default function HeroCourse() {
  const { user, heroCourse } = useApp();

  return (
    <section className="mb-8">
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-5"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-[#0F172A]">
          Welcome back {user.name}! 👋
        </h1>
        <p className="text-[#475569] font-light mt-1">
          Ready to continue your Learning Journey
        </p>
      </motion.div>

      {/* Course hero card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative rounded-2xl bg-[rgb(235,222,255)] p-6 md:p-8"
      >
        <div className="relative flex flex-col md:flex-row md:items-center gap-6 w-full">
          {/* Left content */}
          <div className="flex-1 w-full">
            <div className="absolute top-0 right-0">
              <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full shadow-sm">
                <svg
                  width="12"
                  height="12"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="text-gray-600"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>

                <span className="text-xs text-[#0F172A] font-medium">
                  Last played {heroCourse.lastPlayed}
                </span>
              </div>
            </div>

            <p className="text-[#8533CD] text-sm font-medium mb-1">
              Continue Learning
            </p>
            <h2 className="text-[#0F172A] text-2xl md:text-3xl font-bold mb-3 ">
              {heroCourse.title}
            </h2>

            {/* Progress */}
            <p className="text-[#475569] font-semibold text-sm mb-2">
              Progress: {heroCourse.progress}% Complete
            </p>
            <div className="w-full md:w-72 h-2 bg-white/30 rounded-full mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${heroCourse.progress}%` }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="h-full bg-[#8533CD] rounded-full"
              />
            </div>

            <p className="text-[#0F172A] text-sm mb-5 font-medium">
              <span className="font-bold text-[#0F172A]">Next:</span>{" "}
              {heroCourse.nextLesson} • {heroCourse.nextDuration}
            </p>

            {/* Resume button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-[#8533CD] text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-[#8533CD] transition-colors shadow-md"
            >
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Resume Course
            </motion.button>
          </div>

          {/* Right: decorative course preview */}
          <div className="hidden md:flex items-center justify-center">
            {/* <div className="w-40 h-28 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <div className="text-white/80 text-4xl font-black tracking-tighter">
                Aa
              </div>
            </div> */}
            <img src="/images/Gp.png" alt="Course Preview" className="w-full h-full object-contain"/>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
