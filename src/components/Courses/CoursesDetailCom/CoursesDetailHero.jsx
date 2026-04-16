import { ChevronLeft, Clock3, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CourseHero({ course }) {
  const navigate = useNavigate();
  return (
    <section className="w-full bg-[#f5f5f7] px-4 py-0 md:px-6 md:py-0 ">
      <button
        onClick={() => navigate(-1)}
        className=" mb-2 flex w-fit items-center text-[#6b7280] transition hover:text-black cursor-pointer"
      >
        <ChevronLeft size={18} strokeWidth={1.8} />
      </button>
      <div className="grid items-start justify-center  lg:grid-cols-[1.08fr_0.92fr]">
        {/* Left */}
        <div className="pt-1">
          <h1 className="text-[2.1rem] font-bold leading-[1.08] tracking-[-0.03em] text-[#0f172a] md:text-[2.9rem]">
            {course.title}
          </h1>

          <p className="mt-5 max-w-[600px] text-[15px] leading-[1.85] text-[#667085]">
            {course.description ||
              "Advanced techniques in Adobe Illustrator focused on precision, complex vector design, and professional workflows for high-level creative projects."}
          </p>

          <div className="mt-6 flex items-center gap-7 text-[12px] text-[#667085]">
            <div className="flex items-center gap-2">
              <Clock3 size={14} strokeWidth={1.8} />
              <span>{course.duration || "8 hours"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Users size={14} strokeWidth={1.8} />
              <span>{course.enrolled || "2k Enrolled"}</span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <img
              src={course.instructorImage || "https://i.pravatar.cc/100?img=12"}
              alt={course.instructor || "Instructor"}
              className="h-10 w-10 rounded-full object-cover"
            />

            <div>
              <h3 className="text-[15px] font-semibold leading-none text-[#0f172a]">
                {course.author}
              </h3>
              <p className="mt-1.5 text-[11px] text-[#667085]">{course.role}</p>
            </div>
          </div>
        </div>

        <div className="flex items-start justify-end pt-10 lg:pt-4">
          <div className="relative w-full max-w-[470px] overflow-hidden">
            <img
              src={course.image}
              alt={course.title}
              className="h-[205px] w-full object-cover md:h-[230px] lg:h-[255px]"
            />
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f7_20%,rgba(245,245,247,0.85)_45%,rgba(124,58,237,0.25)_100%)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
