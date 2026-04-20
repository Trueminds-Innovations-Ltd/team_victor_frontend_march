import { createContext, useContext, useState } from "react";

// Global app state - easy to swap mock data with real API calls later
const AppContext = createContext(null);

// Mock user data - replace with API call: GET /api/user/profile

const mockUser = {
  name: "Emeka",
  lastName: "Ezekwe",
  role: "Graphic Design",
  avatar: null,
  notifications: 3,
  messages: 3,
};

// Mock courses in progress - replace with: GET /api/courses/in-progress
const mockContinueWatching = [
  {
    id: 1,
    title: "Visual Branding Basics",
    progress: 65,
    currentLesson: 4,
    totalLessons: 8,
    status: "In · Progress",
    statusColor: "orange",
    img: "/images/r5.png",
  },
  {
    id: 2,
    title: "Typography Essentials",
    progress: 30,
    currentLesson: 4,
    totalLessons: 8,
    status: "Last Accessed",
    statusColor: "purple",
    img: "/images/r6.png",
  },
  {
    id: 3,
    title: "Logo Design Essentials",
    progress: 100,
    currentLesson: 8,
    totalLessons: 8,
    status: "Completed",
    statusColor: "green",
    completedDate: "Mar 28, 2026",
    img: "/images/r1.png",
  },
];

// Mock explore courses - replace with: GET /api/courses/explore
const mockExploreCourses = [
  {
    id: 4,
    title: "Logo Design Fundamentals",
    duration: "8 weeks",
    level: "Beginner",
    rating: 4.8,
    students: "16k",
    badge: "Best Sellers",
    badgeColor: "orange",
    img: "/images/r2.png",
  },
  {
    id: 5,
    title: "Introduction to Design Laws",
    duration: "9 weeks",
    level: "Beginner",
    rating: 4.5,
    students: "14k",
    badge: "New",
    badgeColor: "teal",
    img: "/images/r4.png",
  },
  {
    id: 6,
    title: "Principles of Typography",
    duration: "8 weeks",
    level: "Intermediate",
    rating: 4.3,
    students: "5k",
    badge: null,
    img: "/images/r3.png",
  },
];

// Mock upcoming tasks - replace with: GET /api/tasks/upcoming
const mockUpcomingTasks = [
  {
    id: 1,
    title: "Visual Branding Report",
    due: "Due Tomorrow, 11:59PM",
    status: "Due soon",
    statusColor: "orange",
    img: "/images/f.png",
    iconBg: "bg-purple-600",
  },
  {
    id: 2,
    title: "Group Project: Branding",
    due: "Due April 24, 2026",
    status: "In· progress",
    statusColor: "green",
    img: "/images/Gp.png",
    iconBg: "bg-teal-500",
  },
  {
    id: 3,
    title: "Typography Quiz",
    due: "Due April 26, 2026",
    status: "Upcoming",
    statusColor: "blue",
    img: "/images/m.png",
    iconBg: "bg-purple-500",
  },
];

// Main hero course - replace with: GET /api/courses/current
const mockHeroCourse = {
  title: "Visual Branding Basics",
  progress: 65,
  nextLesson: "Typography Fundamentals",
  nextDuration: "12 min",
  lastPlayed: "2 days ago",
};

export function AppProvider({ children }) {
  const [activeNav, setActiveNav] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("truemind_user");
    return raw ? JSON.parse(raw) : null;
  });


  const mockUserWithAPI = {
    ...mockUser,
    name: user?.name?.split(" ")[0],
    lastName: user?.name?.split(" ")[1],
    role: user?.role || mockUser.role,
    avatar: user?.avatar || mockUser.avatar,
  };

  return (
    <AppContext.Provider
      value={{
        user: mockUserWithAPI,
        setUser,
        heroCourse: mockHeroCourse,
        continueWatching: mockContinueWatching,
        exploreCourses: mockExploreCourses,
        upcomingTasks: mockUpcomingTasks,
        activeNav,
        setActiveNav,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Custom hook for easy context access
// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
