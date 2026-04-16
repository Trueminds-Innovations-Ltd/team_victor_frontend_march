import { Send } from "lucide-react";
export default function CourseAI() {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center gap-2">
        <h3 className="text-[15px] font-semibold text-[#111827]">
          <span className="text-[#9333ea]">AI</span> Learning Assistant
        </h3>
        <span className="rounded-full bg-[#9333ea] px-2 py-0.5 text-[10px] text-white">
          BETA
        </span>
      </div>

      {/* Key Points */}
      <div className="mt-5">
        <h4 className="text-[1rem] font-semibold text-[#111827]">
          Key Points
        </h4>

        <ul className="mt-3 mx-2 space-y-3 text-[13px] text-[#6b7280] list-disc pl-5 marker:text-black">
          <li> Adobe Illustrator creates scalable vector graphics without quality loss.</li>
          <li>Master pen, shapes, layers, and typography for design.</li>
          <li> Practice real projects to improve speed and confidence.</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="mt-5 space-y-3">
        <button className="flex items-center gap-2 w-full rounded-xl bg-[#f3f4f6] px-4 py-3 text-left text-[13px] text-[#374151] hover:bg-gray-200">
          <img src="/images/s1.png" alt="ai span icon" className="w-5 h-5 object-contain"/> Explain this for more understanding
        </button>

        <button className="flex items-center gap-2 w-full rounded-xl bg-[#f3f4f6] px-4 py-3 text-left text-[13px] text-[#374151] hover:bg-gray-200">
          <img src="/images/s3.png" alt="ai span icon" className="w-5 h-5 object-contain "/> Give me examples
        </button>

        <button className=" flex items-center gap-2 w-full rounded-xl bg-[#f3f4f6] px-4 py-3 text-left text-[13px] text-[#374151] hover:bg-gray-200">
          <img src="/images/s2.png" alt="ai span icon" className="w-5 h-5 object-contain"/> Turn this into notes
        </button>
      </div>

      {/* Input */}
      <div className="mt-5 flex items-center gap-2 rounded-xl border px-3 py-3">
        <input
          type="text"
          placeholder="Ask anything about this lessons"
          className="w-full text-sm outline-none"
        />

        <button className="rounded-md bg-[#9333ea] px-2 py-2 text-white cursor-pointer">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}