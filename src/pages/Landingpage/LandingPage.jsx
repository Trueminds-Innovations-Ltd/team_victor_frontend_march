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
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
           backgroundImage: "url('/images/heroimg.png')",
        }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen px-10 py-8">
        {/* Navbar */}
        <motion.nav
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-white text-xl font-semibold tracking-widest uppercase">
            Logo
          </span>
        </motion.nav>

        {/* Hero Content */}
        <div className="flex flex-col justify-center flex-1 max-w-3xl">
          {/* Heading */}
          <motion.h1
            className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-5"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Learn Graphic Design with{" "}
            <span className="text-white">Real Projects</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-white/80 text-base md:text-lg mb-10 max-w-lg"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            Master branding, typography, and UI/UX from industry experts
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex gap-10 mb-12 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* Sign Up */}
             
            <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-15 py-2 rounded-full text-white font-bold text-base cursor-pointer shadow-lg"
              style={{
                background: "linear-gradient(90deg, #9333ea, #7c3aed)",
                boxShadow: "0 4px 24px 0 rgba(147,51,234,0.45)",
              }}
            >
              Sign up
            </motion.button>
            </Link>

            {/* Login */}
            <Link to="/signin">
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(147,51,234,0.15)",
              }}
              whileTap={{ scale: 0.97 }}
              className="px-15 py-2 rounded-full font-bold text-base cursor-pointer border-2 transition-colors"
              style={{
                background: "transparent",
                borderColor: "#9333ea",
                color: "#c084fc",
              }}
            >
              Login
            </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex gap-8 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex items-center gap-2 text-white/90 text-sm font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 + i * 0.12 }}
              >
                <img
                  src={stat.img}
                  alt={stat.label}
                  className="w-6 h-6 object-contain"
                  style={{ filter: i === 2 ? "none" : undefined }}
                />
                <span>{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Animated border glow effect */}
      <motion.div
        className="absolute inset-0 rounded-none pointer-events-none z-20"
        style={{
          boxShadow: "inset 0 0 0 2px rgba(147,51,234,0.3)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      />
    </div>
  );
}