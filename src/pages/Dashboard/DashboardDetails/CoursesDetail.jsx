import { useParams } from "react-router-dom";
import { coursesData } from "../../../components/Courses/CourseData";

export default function CoursesDetail() {
  const { id } = useParams();

  const course = coursesData.find(
    (item) => item.id === Number(id)
  );

  if (!course) {
    return <p>Course not found</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <img src={course.img} className="mt-4 w-full max-w-lg" />
    </div>
  );
}