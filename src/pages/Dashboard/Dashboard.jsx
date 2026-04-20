import { lazy, Suspense } from "react";
const HeroCourse = lazy(() => import("../../components/Dashboard/HeroCourse"));
const ContinueWatching = lazy(() => import("../../components/Dashboard/ContinueWatching"));
const ExploreCourses = lazy(() => import("../../components/Dashboard/ExploreCourses"));
const RightPanel = lazy(() => import("../../components/Dashboard/RightPanel"));

function DashboardPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">

      {/* Left Content */}
      <div className="flex-1 min-w-0 space-y-6">
        <Suspense fallback={<div>Loading Hero...</div>}>
          <HeroCourse />
        </Suspense>

        <Suspense fallback={<div>Loading Continue Watching...</div>}>
          <ContinueWatching />
        </Suspense>

        <Suspense fallback={<div>Loading Courses...</div>}>
          <ExploreCourses />
        </Suspense>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-[320px]">
        <Suspense fallback={<div>Loading Panel...</div>}>
          <RightPanel />
        </Suspense>
      </div>

    </div>
  );
}

export default DashboardPage;