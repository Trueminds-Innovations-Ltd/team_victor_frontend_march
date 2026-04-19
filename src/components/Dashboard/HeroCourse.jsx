import { motion } from "framer-motion";
import { useApp } from "../../contexts/AppContext";

export default function HeroCourse() {
  const { heroCourse } = useApp();

  const storedUser = JSON.parse(localStorage.getItem("truemind_user") || "null");

  const displayName = storedUser?.name || "User";
  return (
    <section className='mb-8'>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className='mb-5'
      >
        <h1 className='text-2xl font-bold text-[#0F172A] md:text-3xl'>Welcome back {displayName}! 👋</h1>
        <p className='mt-1 font-light text-[#475569]'>Ready to continue your Learning Journey</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className='relative rounded-2xl bg-[rgb(235,222,255)] p-6 md:p-8'
      >
        <div className='relative flex w-full flex-col gap-6 md:flex-row md:items-center'>
          <div className='w-full flex-1'>
            <div className='absolute right-0 top-0'>
              <div className='flex items-center gap-1 rounded-full bg-white px-2 py-1 shadow-sm'>
                <svg width='12' height='12' fill='currentColor' viewBox='0 0 24 24' className='text-gray-600'>
                  <path d='M8 5v14l11-7z' />
                </svg>

                <span className='text-xs font-medium text-[#0F172A]'>Last played {heroCourse.lastPlayed}</span>
              </div>
            </div>

            <p className='mb-1 text-sm font-medium text-[#8533CD]'>Continue Learning</p>
            <h2 className='mb-3 text-2xl font-bold text-[#0F172A] md:text-3xl'>{heroCourse.title}</h2>

            <p className='mb-2 text-sm font-semibold text-[#475569]'>Progress: {heroCourse.progress}% Complete</p>
            <div className='mb-4 h-2 w-full rounded-full bg-white/30 md:w-72'>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${heroCourse.progress}%` }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className='h-full rounded-full bg-[#8533CD]'
              />
            </div>

            <p className='mb-5 text-sm font-medium text-[#0F172A]'>
              <span className='font-bold text-[#0F172A]'>Next:</span> {heroCourse.nextLesson} •{" "}
              {heroCourse.nextDuration}
            </p>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className='inline-flex items-center gap-2 rounded-xl bg-[#8533CD] px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#8533CD]'
            >
              <svg width='16' height='16' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M8 5v14l11-7z' />
              </svg>
              Resume Course
            </motion.button>
          </div>

          <div className='hidden items-center justify-center md:flex'>
            <img src='/images/Gp.png' alt='Course Preview' className='h-full w-full object-contain' />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
