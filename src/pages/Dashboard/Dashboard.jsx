import HeroCourse from "../../components/Dashboard/HeroCourse";
import ContinueWatching from "../../components/Dashboard/ContinueWatching";
import ExploreCourses from "../../components/Dashboard/ExploreCourses";
import RightPanel from "../../components/Dashboard/RightPanel"; 
function DashboardPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      
      {/* Left Content */}
      <div className="flex-1 min-w-0 space-y-6">
        <HeroCourse />
        <ContinueWatching />
        <ExploreCourses />
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-[320px]">
        <RightPanel />
      </div>

    </div>
  );
}

export default DashboardPage;