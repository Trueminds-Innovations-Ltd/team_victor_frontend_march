import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { coursesData } from "../../../components/Courses/CourseData";
import CourseHero from "../../../components/Courses/CoursesDetailCom/CoursesDetailHero";
import CourseHelpCard from "../../../components/Courses/CoursesDetailCom/CourseHelpCard";
import CourseResources from "../../../components/Courses/CoursesDetailCom/CourseResource";
import CourseModules from "../../../components/Courses/CoursesDetailCom/CourseModule";
import CoursePlayer from "../../../components/Courses/CoursesDetailCom/CoursePlayer";
import CourseAI from "../../../components/Courses/CoursesDetailCom/CousesAi";

export default function CoursesDetail() {
  const { id } = useParams();
  const course = useMemo(
    () => coursesData.find((item) => String(item.id) === String(id)),
    [id]
  );

  const staticModules = [
    {
      id: 1,
      title: "Module 1: Workflow & Precision",
      lessons: [
        {
          id: "lesson-1",
          title: "Customizing panels for speed",
          duration: "5:00",
          locked: false,
        },
        {
          id: "lesson-2",
          title: "Creating efficient artboard layouts",
          duration: "8:00",
          upNext: "Up Next 8:00",
          locked: true,
        },
        {
          id: "lesson-3",
          title: "Saving workspace presets",
          duration: "15:20",
          locked: true,
        },
      ],
    },
    {
      id: 2,
      title: "Module 2: Vector Mastery",
      lessons: [],
    },
    {
      id: 3,
      title: "Module 3: Color, Gradients & Effects",
      lessons: [],
    },
    {
      id: 4,
      title: "Module 4: Illustration & Typography",
      badge: "Linked Course",
      lessons: [],
    },
    {
      id: 5,
      title: "Module 5: Branding & Pro Workflow",
      badge: "Linked Course",
      lessons: [],
    },
  ];

  const [openModules, setOpenModules] = useState([0]);
  const [activeLesson, setActiveLesson] = useState({
    moduleIndex: 0,
    lessonIndex: 0,
  });
  const [completedLessonIds, setCompletedLessonIds] = useState([]);

  if (!course) {
    return <p className="p-6">Course not found</p>;
  }

  const currentModule = staticModules[activeLesson.moduleIndex];
  const currentLesson = currentModule?.lessons?.[activeLesson.lessonIndex];

  const allLessons = staticModules.flatMap((module) => module.lessons || []);
  const totalLessons = allLessons.length;
  const completedLessons = completedLessonIds.length;
  const progress =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const handleSelectLesson = (moduleIndex, lessonIndex) => {
    const lesson = staticModules[moduleIndex]?.lessons?.[lessonIndex];
    if (!lesson || lesson.locked) return;

    setActiveLesson({ moduleIndex, lessonIndex });

    if (!openModules.includes(moduleIndex)) {
      setOpenModules([moduleIndex]);
    }
  };

  const markCurrentLessonComplete = () => {
    if (!currentLesson) return;

    setCompletedLessonIds((prev) =>
      prev.includes(currentLesson.id) ? prev : [...prev, currentLesson.id]
    );
  };

  const goToNextLesson = () => {
    for (
      let moduleIndex = activeLesson.moduleIndex;
      moduleIndex < staticModules.length;
      moduleIndex++
    ) {
      const lessons = staticModules[moduleIndex]?.lessons || [];

      let startLessonIndex = 0;
      if (moduleIndex === activeLesson.moduleIndex) {
        startLessonIndex = activeLesson.lessonIndex + 1;
      }

      for (
        let lessonIndex = startLessonIndex;
        lessonIndex < lessons.length;
        lessonIndex++
      ) {
        const lesson = lessons[lessonIndex];

        if (!lesson.locked) {
          setActiveLesson({ moduleIndex, lessonIndex });
          setOpenModules([moduleIndex]);
          return;
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="mx-auto max-w-7xl space-y-6">
        <CourseHero course={course} />

        <div className="grid gap-6 xl:grid-cols-[1.5fr_0.72fr]">
          <div className="space-y-6">
            <CoursePlayer
              course={course}
              currentLesson={currentLesson}
              progress={progress}
              completedLessons={completedLessons}
              totalLessons={totalLessons}
              goToNextLesson={goToNextLesson}
              onMarkComplete={markCurrentLessonComplete}
            />

            <CourseModules
              modules={staticModules}
              openModules={openModules}
              setOpenModules={setOpenModules}
              activeLesson={activeLesson}
              onSelectLesson={handleSelectLesson}
              completedLessonIds={completedLessonIds}
            />
          </div>

          <div className="space-y-4">
            <CourseAI />
            <CourseResources />
            <CourseHelpCard />
          </div>
        </div>
      </div>
    </div>
  );
}