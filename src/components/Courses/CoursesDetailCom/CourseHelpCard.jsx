export default function CourseHelpCard() {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      <h3 className="text-[15px] font-semibold text-[#111827]">Need Help?</h3>
      <p className="mt-2 max-w-[220px] text-[13px] leading-5 text-[#6b7280]">
        Chat with your mentor or community anytime
      </p>

      <div className="mt-4 flex items-end justify-between gap-3">
        <button className="rounded-lg bg-[#9333ea] px-4 py-2 text-[13px] font-semibold text-white">
          Open Mentor Chat
        </button>

        <img
          src="https://api.dicebear.com/7.x/adventurer/svg?seed=mentor"
          alt="mentor"
          className="h-16 w-16"
        />
      </div>
    </div>
  );
}