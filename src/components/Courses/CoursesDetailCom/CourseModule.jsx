"use client";

import { useState } from "react";
import { ChevronDown, Lock, Play } from "lucide-react";

const modulesData = [
  {
    id: "module-1",
    title: "Module 1: Introduction to Graphic Design",
    lessons: [
      {
        id: "lesson-1-1",
        title: "What is Graphic Design?",
        duration: "00:00",
      },
      {
        id: "lesson-1-2",
        title: "History of Graphic Design",
        duration: "02:15",
        upNext: "Up Next 02:15",
      },
      {
        id: "lesson-1-3",
        title: "Role of Graphic Designer",
        duration: "01:00",
        locked: true,
      },
    ],
  },
  {
    id: "module-2",
    title: "Module 2: Design Principles in Real Projects",
    badge: "Unlock Course",
    lessons: [
      {
        id: "lesson-2-1",
        title: "Real-World Design Breakdown",
        duration: "01:00",
        locked: true,
      },
      {
        id: "lesson-2-2",
        title: "Principles in Action",
        duration: "01:35",
        locked: true,
      },
      {
        id: "lesson-2-3",
        title: "Practical Redesign Project",
        duration: "02:00",
        locked: true,
      },
    ],
  },
  {
    id: "module-3",
    title: "Modules 3: Colour Theory & Psychology",
    badge: "Unlock Course",
    lessons: [
      {
        id: "lesson-3-1",
        title: "Emotional Impact of Color",
        duration: "02:20",
        locked: true,
      },
      {
        id: "lesson-3-2",
        title: "Color in Branding & UI",
        duration: "02:40",
        locked: true,
      },
      {
        id: "lesson-3-3",
        title: "Practical Color Application",
        duration: "02:55",
        locked: true,
      },
    ],
  },
  {
    id: "module-4",
    title: "Module 4: Typography Essentials",
    badge: "Unlock Course",
    lessons: [
      {
        id: "lesson-4-1",
        title: "Typography for Clear Communication",
        duration: "03:00",
        locked: true,
      },
      {
        id: "lesson-4-2",
        title: "Typography & Visual Hierarchy",
        duration: "03:35",
        locked: true,
      },
      {
        id: "lesson-4-3",
        title: "Practical Typography Application",
        duration: "03:50",
        locked: true,
      },
    ],
  },
  {
    id: "module-5",
    title: "Module 5: Layout and Composition",
    badge: "Unlock Course",
    lessons: [
      {
        id: "lesson-5-1",
        title: "Structuring Layouts for Clarity",
        duration: "04:00",
        locked: true,
      },
      {
        id: "lesson-5-2",
        title: "Composition and Visual Balance",
        duration: "03:40",
        locked: true,
      },
      {
        id: "lesson-5-3",
        title: "Practical Layout Application",
        duration: "04:10",
        locked: true,
      },
    ],
  },
];

export default function CourseModules() {
  const [openModules, setOpenModules] = useState([0]);
  const [activeLesson, setActiveLesson] = useState({
    moduleIndex: 0,
    lessonIndex: 0,
  });

  const toggleModule = (index) => {
    setOpenModules((prev) => (prev.includes(index) ? [] : [index]));
  };

  const selectLesson = (moduleIndex, lessonIndex) => {
    setActiveLesson({ moduleIndex, lessonIndex });

    if (!openModules.includes(moduleIndex)) {
      setOpenModules([moduleIndex]);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
      {modulesData.map((module, moduleIndex) => {
        const isOpen = openModules.includes(moduleIndex);

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

                {moduleIndex === 0 ? (
                  <span className="rounded-md bg-[#ede9fe] px-3 py-1 text-[11px] font-medium text-[#6d28d9]">
                    0/3 Completed
                  </span>
                ) : (
                  <Lock size={15} className="text-[#6b7280]" />
                )}
              </div>
            </button>

            {isOpen && (
              <div className="border-t border-black/5">
                {module.lessons.map((lesson, lessonIndex) => {
                  const isCurrent =
                    activeLesson.moduleIndex === moduleIndex &&
                    activeLesson.lessonIndex === lessonIndex;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => selectLesson(moduleIndex, lessonIndex)}
                      className={`flex w-full flex-col gap-3 px-4 py-4 text-left transition sm:px-5 md:flex-row md:items-center md:justify-between ${
                        isCurrent ? "bg-[#f3e8ff]" : "hover:bg-[#fafafa]"
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
                            <span>○</span>
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
                            {lesson.upNext && (
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

                {moduleIndex === 0 && (
                  <div className="px-4 py-4 sm:px-5">
                    <div className="flex flex-col gap-4 rounded-xl border-2 border-[#a855f7] bg-[#f5eefe] px-4 py-3 md:flex-row md:items-center md:justify-between">
                      <div className="min-w-0">
                        <h4 className="text-[15px] font-semibold text-[#111827]">
                          Quick Quiz
                        </h4>
                        <p className="text-[12px] leading-5 text-[#6b7280]">
                          Test your knowledge before moving forward
                        </p>
                      </div>

                      <button className="w-full rounded-lg bg-[#9333ea] px-4 py-3 text-[13px] font-semibold text-white sm:w-fit">
                        Start Quiz (2mins)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}