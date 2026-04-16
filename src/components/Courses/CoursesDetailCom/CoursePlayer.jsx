import { Play, Flame } from "lucide-react";

export default function CoursePlayer({
  course,
  currentLesson,
  progress,
  completedLessons,
  totalLessons,
  goToNextLesson,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="h-[220px] w-full object-cover sm:h-[260px] md:h-[420px]"
        />

        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute left-3 top-3 flex h-16 w-16 flex-col items-center justify-center rounded-full border-4 border-white text-white sm:left-4 sm:top-4 sm:h-20 sm:w-20 md:left-6 md:top-6 md:h-28 md:w-28">
          <span className="text-lg font-bold sm:text-xl md:text-3xl">
            {progress}%
          </span>
          <span className="text-[10px] sm:text-xs md:text-sm">Complete</span>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <button className="flex h-12 w-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-purple-600 text-white shadow-lg sm:h-14 sm:w-14 md:h-16 md:w-16">
            <Play className="ml-0.5 sm:ml-1" size={20} fill="currentColor" />
          </button>
        </div>

        <div className="absolute left-3 top-3 translate-x-20 rounded-xl bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white sm:left-4 sm:top-4 sm:translate-x-24 sm:px-4 sm:py-2 sm:text-sm md:left-6 md:top-6 md:translate-x-36">
          Now Playing
        </div>

        <div className="absolute bottom-16 left-3 right-3 text-white sm:bottom-18 sm:left-4 sm:right-4 md:bottom-20 md:left-6 md:right-6">
          <h2 className="text-base font-bold leading-tight sm:text-xl md:text-4xl">
            {currentLesson?.title || "Customizing panels for speed"}
          </h2>
          <p className="mt-1 text-xs text-white/85 sm:mt-2 sm:text-sm md:text-base">
            Next: Creating efficient art board layouts
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
          <div className="h-2 w-full rounded-full bg-white/30">
            <div
              className="h-2 rounded-full bg-purple-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-3 flex flex-col gap-2 text-xs text-white sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:text-sm">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button>
                <Play className="h-4 w-4" />
              </button>
              <span>1.25x</span>
              <span>{currentLesson?.duration || "5:00"} / 8:00:00</span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <img
                src="/images/s9.png"
                alt="video player"
                className="h-4 w-4 cursor-pointer object-contain"
              />
              <img
                src="/images/s8.png"
                alt="video player"
                className="h-4 w-4 cursor-pointer object-contain"
              />
              <img
                src="/images/s10.png"
                alt="video player"
                className="h-4 w-4 cursor-pointer object-contain"
              />
              <img
                src="/images/s11.png"
                alt="video player"
                className="h-4 w-4 cursor-pointer object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-[#111827] sm:text-2xl">
              Course Progress
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              <span className="mr-2 text-purple-600">●</span>
              {progress}% • {completedLessons} of {totalLessons} lessons
              Completed
            </p>
            <div className="mt-4 h-3 w-full max-w-full rounded-full bg-gray-200 sm:max-w-64">
              <div
                className="h-3 rounded-full bg-purple-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 md:items-center">
            <div className="flex w-fit gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-500">
              <Flame className="h-4 w-4" />
              7 Day Streak
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button className="rounded-xl border border-purple-500 px-5 py-3 font-medium text-purple-600 transition hover:bg-purple-50">
                Mark Complete
              </button>
              <button
                onClick={goToNextLesson}
                className="rounded-xl bg-purple-600 px-5 py-3 font-medium text-white transition hover:bg-purple-700"
              >
                Next Lesson
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}