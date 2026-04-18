// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function SignupSuccess() {
  const navigate = useNavigate();

  return (
    <div className='max-h-screen w-full bg-gray-100 flex items-center justify-center p-4 sm:p-6'>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className='w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 sm:p-10 text-center'
      >
        {/* Title */}
        <h1 className='text-xl sm:text-2xl font-semibold text-purple-600 mb-6'>Registration Complete!</h1>

        <div className='bg-purple-100 rounded-xl p-4 flex items-center justify-center mb-6'>
          <img src='/images/Rectangle 399.png' alt='celebration' className='rounded-lg object-cover' />
        </div>

        <div className='mb-6'>
          <h2 className='text-lg sm:text-xl font-bold text-purple-600 mb-2'>Welcome to the Team!</h2>
          <p className='text-gray-600 text-sm sm:text-base'>You have successfully signed up.</p>
          <p className='text-gray-600 text-sm sm:text-base'>Let's get started on your dashboard.</p>
        </div>

        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate("/dashboard")}
            className='px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold shadow-md w-full sm:w-auto'
          >
            Start Learning
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate(-1)}
            className='flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 w-full sm:w-auto'
          >
            <ArrowLeft size={16} />
            Go Back
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default SignupSuccess;
