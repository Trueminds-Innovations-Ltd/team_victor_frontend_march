import { motion } from "framer-motion";
import { MailOpen } from "lucide-react";

export default function Message() {
  return (
    <main className='min-h-screen w-full bg-gray-50 flex items-center justify-center p-6'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className='flex flex-col items-center text-center max-w-sm'
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4, type: "spring", stiffness: 260 }}
          className='w-24 h-24 rounded-3xl bg-[#f3e8ff] flex items-center justify-center mb-6'
        >
          <MailOpen size={44} strokeWidth={1.5} className='text-[#8533cd]' />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.35 }}
        >
          <h2 className='text-xl font-bold text-gray-900 mb-2 tracking-tight'>No messages yet</h2>
          <p className='text-gray-400 text-sm leading-relaxed'>
            Your inbox is empty. When someone sends you a message, it'll show up here.
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}
