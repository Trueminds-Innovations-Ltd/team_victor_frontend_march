import { useMemo, useState } from "react";
import { Clock3 } from "lucide-react";
import { quizzes } from "../../components/DashData/ProfitData";
import { assignments } from "../../components/DashData/ProfitData";
import { projects } from "../../components/DashData/ProfitData";
import { tabs } from "../../components/DashData/ProfitData";

export default function Project() {
  const [activeTab, setActiveTab] = useState("All");
  const stats = useMemo(
    () => [
      { label: "Total projects", value: 4 },
      { label: "Ongoing", value: 2 },
      { label: "Completed", value: 2 },
    ],
    [],
  );
  const showAssignments = activeTab === "All" || activeTab === "Assignments";
  const showQuizzes = activeTab === "All" || activeTab === "Quizzes";
  const showProjects = activeTab === "All" || activeTab === "Projects";

  return (
    <section className="min-h-screen bg-[#f3f4f8] px-4 py-6 md:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Tabs */}
        <div className="mb-8 flex gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-1.5 text-xs ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "bg-white border border-[#475569] text-[#475569]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {(showAssignments || showQuizzes) && (
          <div className="grid gap-28 lg:grid-cols-2">
            {/* Assignments */}
            {showAssignments && (
              <div>
                <div className="mb-3 flex justify-between">
                  <h2 className="text-sm font-semibold text-[#0F172A]">Assignments</h2>
                  <button
                    onClick={() => setActiveTab("Assignments")}
                    className="text-xs text-purple-600 font-semibold"
                  >
                    View all
                  </button>
                </div>

                <div className="space-y-3">
                  {assignments.map((item) =>
                    item.variant === "simple" ? (
                      <div key={item.id} className="bg-white p-4 rounded-xl">
                        <h3 className="text-sm font-semibold text-[#0F172A]">
                          {item.title}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                          {item.description}
                        </p>

                        <div className="flex justify-between text-[10px] text-[#475569] mt-5">
                          <span className="flex items-center gap-1"><img src="/images/f4.png" alt="icon" className="w-3 h-3 object-contain"/>{item.files} Files Attached</span>
                          <span className="font-medium">{item.due}</span>
                        </div>
                      </div>
                    ) : (
                      <div key={item.id} className="bg-white p-4 rounded-xl">
                        <div className="flex items-center gap-2 text-[10px]">
                          <span className="text-purple-600 font-medium space-x-32 py-1 rounded">
                            {item.badge}
                          </span>
                          <span className="text-[#475569]">
                            {item.module}
                          </span>
                        </div>

                        <h3 className="text-sm font-semibold mt-2">
                          {item.title}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                          {item.description}
                        </p>

                        <div className="flex justify-between text-[11px] mt-3">
                          <span className="text-green-500">
                            {item.status}
                          </span>
                          <span className="text-[#475569] font-medium flex gap-1 items-center">
                            <img src="/images/f5.png" alt="icon" className="w-3 h-3 object-contain"/>{item.date}
                          </span>
                        </div>

                        <div className="flex justify-between text-[11px] mt-3">
                          <span className="text-gray-400">
                            +{item.collabs} collabs
                          </span>
                          <span className="text-green-500 font-semibold">
                            {item.points} pts
                          </span>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Quiz */}
            {showQuizzes && (
              <div>
                <div className="mb-3 flex justify-between">
                  <h2 className="text-sm font-semibold">Quizzes</h2>
                  <button
                    onClick={() => setActiveTab("Quizzes")}
                    className="text-xs text-purple-600 font-semibold"
                  >
                    View all
                  </button>
                </div>

                {quizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="border border-purple-500 bg-white"
                  >
                    <div className="h-[160px] overflow-hidden">
                      <img
                        src={quiz.image}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-4">
                      <span className="bg-purple-100 text-purple-600 text-[10px] px-2 py-1 rounded relative top-[-4rem]">
                        {quiz.status}
                      </span>

                      <h3 className="mt-3 text-sm font-semibold">
                        {quiz.title}
                      </h3>

                      <div className="flex justify-between mt-5">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock3 size={12} />
                          {quiz.duration}
                        </div>

                        <div>
                          <span className="text-lg font-bold text-purple-600">
                            {quiz.score}%
                          </span>
                          <span className="text-[10px] text-gray-400 ml-1">
                            score
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Project Overview */}
        {showProjects && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">
              Project Overview
            </h2>

            <div className="flex mb-5">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white border border-[#A2A0A0] text-black font-bold px-3 py-2 text-xs rounded"
                >
                  {s.label} {s.value}
                </div>
              ))}
            </div>

            <div className="mb-3 flex items-center justify-between w-full">
              {/* <div className="flex items-center justify-between"> */}
              <h3 className="text-sm font-semibold">Projects</h3>
              <button
                onClick={() => setActiveTab("Projects")}
                className="text-xs text-purple-600 font-semibold"
              >
                View all
              </button>
              </div>
              <div></div>
            {/* </div> */}

            <div className="flex gap-4">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="w-[220px] bg-white border rounded-lg p-3"
                >
                  <div className="relative h-[110px] overflow-hidden rounded">
                    <img
                      src={p.image}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 text-[9px] bg-purple-100 text-purple-600 px-2 py-1 rounded">
                      {p.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold mt-3">
                    {p.title}
                  </h3>

                  <p className="text-[11px] text-gray-500 mt-1">
                    {p.description}
                  </p>

                  <div className="flex justify-between text-[10px] text-gray-400 mt-3">
                    <span>Progress</span>
                    <span>{p.date}</span>
                  </div>

                  <div className="mt-2 h-1.5 bg-gray-200 rounded-full">
                    <div
                      className="h-1.5 bg-green-500 rounded-full"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>

                  <div className="text-right text-[10px] text-gray-500 mt-1">
                    {p.progress}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}