import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MailOpen, Send } from "lucide-react";

const mockContact = {
  name: "Alex Morgan",
  avatar: "https://picsum.photos/seed/alexmorgan/40/40",
  online: true,
};

const initialMessages = [
  { id: 1, from: "them", text: "Hi, How are you?", time: "11:00am" },
  { id: 2, from: "me", text: "I am good ma'am", time: "11:07am" },
  { id: 3, from: "them", text: "Do you need assistant?", time: "2:15pm" },
];

function ChatPanel() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { id: Date.now(), from: "me", text, time: now }]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className='flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
      <h2 className='text-sm font-semibold text-gray-900 text-center p-1 '>Chat with a Mentor</h2>
      {/* Header */}
      <div className='flex items-center gap-3 px-5 py-4 border-b border-gray-100 shrink-0'>
        <div className='relative'>
          <img src={mockContact.avatar} alt={mockContact.name} className='w-10 h-10 rounded-full object-cover' />
          <span className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full' />
        </div>
        <div>
          <p className='font-semibold text-gray-900 text-sm'>{mockContact.name}</p>
          <p className='text-xs text-green-400 font-medium flex items-center gap-1'>
            <span className='w-1.5 h-1.5 rounded-full bg-green-400 inline-block' />
            Online
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className='flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3 min-h-0'>
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i < initialMessages.length ? i * 0.06 : 0 }}
            className={`flex flex-col ${msg.from === "me" ? "items-end" : "items-start"}`}
          >
            <div
              className={`px-4 py-2.5 rounded-2xl text-sm font-medium max-w-[75%] leading-relaxed ${
                msg.from === "me" ? "bg-[#1aaf8b] text-white rounded-br-sm" : "bg-[#7c3aed] text-white rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>
            <span className='text-[11px] text-gray-400 mt-1 px-1'>{msg.time}</span>
          </motion.div>
        ))}

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className='flex items-center gap-1 pl-1 mt-1'
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className='w-2.5 h-2.5 rounded-full bg-gray-300 block'
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className='px-4 py-3 border-t border-gray-100 shrink-0'>
        <div className='flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5'>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Say something...'
            className='flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none'
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className='text-[#7c3aed] disabled:text-gray-300 transition-colors shrink-0'
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Message() {
  return (
    <main className='min-h-screen w-full bg-gray-50 p-6'>
      <div className='h-[calc(100vh-3rem)] grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 max-w-6xl mx-auto'>
        {/* Left — empty inbox state */}
        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center p-6'>
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
        </div>

        {/* Right — chat panel */}
        <ChatPanel />
      </div>
    </main>
  );
}
