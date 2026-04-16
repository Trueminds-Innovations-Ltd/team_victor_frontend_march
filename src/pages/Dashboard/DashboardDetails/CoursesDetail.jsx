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
          id: 1,
          title: "Customizing panels for speed",
          duration: "5:00",
          locked: false,
        },
        {
          id: 2,
          title: "Creating efficient artboard layouts",
          duration: "",
          upNext: "Up Next 8:00",
          locked: true,
        },
        {
          id: 3,
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

  if (!course) {
    return <p className="p-6">Course not found</p>;
  }

  const currentModule = staticModules[activeLesson.moduleIndex];
  const currentLesson = currentModule?.lessons?.[activeLesson.lessonIndex];

  const totalLessons = staticModules.reduce(
    (sum, module) => sum + module.lessons.length,
    0
  );

  const completedLessons = 0;
  const progress = 0;

  const goToNextLesson = () => {
    const { moduleIndex, lessonIndex } = activeLesson;
    const currentLessons = staticModules[moduleIndex]?.lessons || [];

    if (lessonIndex < currentLessons.length - 1) {
      setActiveLesson({
        moduleIndex,
        lessonIndex: lessonIndex + 1,
      });
      return;
    }

    if (moduleIndex < staticModules.length - 1) {
      setActiveLesson({
        moduleIndex: moduleIndex + 1,
        lessonIndex: 0,
      });
      setOpenModules([moduleIndex + 1]);
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
            />

            <CourseModules
              modules={staticModules}
              openModules={openModules}
              setOpenModules={setOpenModules}
              activeLesson={activeLesson}
              setActiveLesson={setActiveLesson}
            />
          </div>

          <div className="space-y-4">
            <CourseAI/>
            <CourseResources />
            <CourseHelpCard />
          </div>
        </div>
      </div>
    </div>
  );
}