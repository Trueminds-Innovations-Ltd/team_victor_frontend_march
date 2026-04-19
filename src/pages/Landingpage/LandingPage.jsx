import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const stats = [
  { img: "/images/courses.png", label: "50 Courses" },
  { img: "/images/user.png", label: "10k+ learners" },
  { img: "/images/ratin.png", label: "4.8 Rating" },
];

export default function LandingHero() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/heroimg.png')" }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen px-5 sm:px-8 md:px-12 py-8 gap-8">
        
        {/* Logo */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-20 h-20 object-cover"
          />
        </motion.div>

        {/* Hero */}
        <div className="flex flex-col justify-center flex-1 gap-6">
          
          {/* Heading */}
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Learn Graphic Design with Real Projects
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-white/80 text-sm sm:text-base md:text-lg my-5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Master branding, typography, and UI/UX from industry experts
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link to="/signup">
              <button className="px-10 md:px-14 py-2 md:py-3 rounded-full bg-[#8533cd] text-white font-semibold transition hover:bg-[#5B21B6] hover:rounded-tr-2xl hover:rounded-bl-2xl cursor-pointer">
                Sign up
              </button>
              
            </Link>

            <Link to="/signin">
              <button className="px-10 md:px-14 py-2 md:py-3 rounded-full border border-[#8533CD] text-[#8533CD] font-semibold [#8533CD] hover:text-white hover:bg-[#5B21B6] hover:rounded-tr-2xl hover:rounded-bl-2xl cursor-pointer">
                Login
              </button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex gap-6 my-3 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2 text-white/90 text-sm"
              >
                <img
                  src={stat.img}
                  alt={stat.label}
                  className="w-5 h-5"
                />
                <span className="text-xs md:text-sm">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}