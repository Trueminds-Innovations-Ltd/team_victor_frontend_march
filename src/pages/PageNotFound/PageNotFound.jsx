// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <main className='min-h-screen bg-gray-50 flex items-center justify-center p-6'>
      <div className='max-w-lg w-full text-center'>
        {/* 404 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='relative mb-6 select-none'
        >
          <span className='text-[10rem] font-black leading-none tracking-tighter text-[#f3e8ff]' aria-hidden='true'>
            404
          </span>
          {/* Overlapping pill badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.35, type: "spring", stiffness: 300 }}
            className='absolute inset-0 flex items-center justify-center'
          >
            <span className='bg-[#8533cd] text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full'>
              Page not found
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.45 }}
          className='bg-white border border-gray-100 rounded-2xl px-8 py-10 shadow-sm'
        >
          {/* Icon */}
          <div className='w-14 h-14 rounded-2xl bg-[#f3e8ff] flex items-center justify-center mx-auto mb-5'>
            <svg
              width='28'
              height='28'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#8533cd'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='11' cy='11' r='8' />
              <path d='m21 21-4.35-4.35' />
              <line x1='11' y1='8' x2='11' y2='11' />
              <line x1='11' y1='14' x2='11.01' y2='14' />
            </svg>
          </div>

          <h1 className='text-2xl font-bold text-gray-900 mb-2 tracking-tight'>Oops wrong page!</h1>
          <p className='text-gray-400 text-sm leading-relaxed mb-8'>
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          {/* buttons */}
          <div className='flex flex-col sm:flex-row items-center justify-center gap-3'>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(-1)}
              className='flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center'
            >
              <ArrowLeft size={15} />
              Go back
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/dashboard")}
              className='flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8533cd] hover:bg-[#5B21B6] text-white text-sm font-semibold transition-colors w-full sm:w-auto justify-center shadow-[0_4px_14px_rgba(133,51,205,0.3)]'
            >
              <Home size={15} />
              Back to dashboard
            </motion.button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default PageNotFound;
