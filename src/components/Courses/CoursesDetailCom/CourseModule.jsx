import { ChevronDown, Lock, Play } from "lucide-react";

export default function CourseModules({
  modules = [],
  openModules,
  setOpenModules,
  activeLesson,
  onSelectLesson,
  completedLessonIds = [],
}) {
  const toggleModule = (index) => {
    setOpenModules((prev) => (prev.includes(index) ? [] : [index]));
  };

  const handleLessonClick = (moduleIndex, lessonIndex, lesson) => {
    if (lesson.locked) return;
    onSelectLesson(moduleIndex, lessonIndex);

    if (!openModules.includes(moduleIndex)) {
      setOpenModules([moduleIndex]);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
      {modules.map((module, moduleIndex) => {
        const isOpen = openModules.includes(moduleIndex);

        const moduleCompletedCount = module.lessons.filter((lesson) =>
          completedLessonIds.includes(lesson.id)
        ).length;

        return (
          <div
            key={module.id}
            className="border-b border-black/10 last:border-b-0"
          >
            <button
              onClick={() => toggleModule(moduleIndex)}
              className="flex w-full flex-col gap-3 px-4 py-4 text-left sm:px-5 sm:py-5 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex min-w-0 items-center gap-3">
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-[#6b7280] transition ${
                    isOpen ? "rotate-0" : "-rotate-90"
                  }`}
                />

                <h3 className="text-[14px] font-semibold text-[#111827] sm:text-[15px]">
                  {module.title}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {module.badge && (
                  <span className="rounded-full bg-[#c7f7df] px-2 py-1 text-[10px] font-medium text-[#12a150]">
                    {module.badge}
                  </span>
                )}

                <span className="rounded-md bg-[#ede9fe] px-3 py-1 text-[11px] font-medium text-[#6d28d9]">
                  {moduleCompletedCount}/{module.lessons.length} Completed
                </span>
              </div>
            </button>

            {isOpen && (
              <div className="border-t border-black/5">
                {module.lessons.map((lesson, lessonIndex) => {
                  const isCurrent =
                    activeLesson.moduleIndex === moduleIndex &&
                    activeLesson.lessonIndex === lessonIndex;

                  const isCompleted = completedLessonIds.includes(lesson.id);

                  return (
                    <button
                      key={lesson.id}
                      onClick={() =>
                        handleLessonClick(moduleIndex, lessonIndex, lesson)
                      }
                      disabled={lesson.locked}
                      className={`flex w-full flex-col gap-3 px-4 py-4 text-left transition sm:px-5 md:flex-row md:items-center md:justify-between ${
                        isCurrent
                          ? "bg-[#f3e8ff]"
                          : lesson.locked
                          ? "cursor-not-allowed opacity-70"
                          : "hover:bg-[#fafafa]"
                      }`}
                    >
                      <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                        {isCurrent ? (
                          <div className="flex h-8 w-14 shrink-0 items-center justify-center gap-1 rounded-md bg-[#9333ea] text-sm font-semibold text-white">
                            <Play className="h-3.5 w-3.5 fill-white" />
                            {String(lessonIndex + 1).padStart(2, "0")}
                          </div>
                        ) : (
                          <div className="flex shrink-0 items-center gap-3 text-[#6b7280]">
                            <span>{isCompleted ? "✓" : "○"}</span>
                            <span className="text-[14px] font-medium sm:text-[15px]">
                              {String(lessonIndex + 1).padStart(2, "0")}
                            </span>
                          </div>
                        )}

                        <p
                          className={`min-w-0 text-[14px] font-medium leading-6 sm:text-[15px] ${
                            isCurrent ? "text-[#9333ea]" : "text-[#374151]"
                          }`}
                        >
                          {lesson.title}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 md:justify-end">
                        {isCurrent ? (
                          <>
                            <span className="text-[12px] font-medium text-[#9333ea]">
                              ▶ Playing
                            </span>
                            <span className="text-[12px] text-[#6b7280]">
                              {lesson.duration}
                            </span>
                          </>
                        ) : (
                          <>
                            {lesson.upNext && !lesson.locked && (
                              <span className="rounded-full bg-[#ede9fe] px-3 py-1 text-[11px] text-[#6d28d9]">
                                {lesson.upNext}
                              </span>
                            )}

                            {lesson.duration && (
                              <span className="text-[12px] text-[#6b7280]">
                                {lesson.duration}
                              </span>
                            )}

                            {lesson.locked && (
                              <Lock
                                size={15}
                                className="shrink-0 text-[#6b7280]"
                              />
                            )}
                          </>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}