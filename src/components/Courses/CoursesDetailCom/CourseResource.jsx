import {  ChevronRight, BookOpen} from "lucide-react";

export default function CourseResources() {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-[#111827]">Resources</h3>
        <button className="text-[12px] font-medium text-[#9333ea]">
          View All →
        </button>
      </div>

      <div className="mt-3 h-1 w-14 rounded-full bg-[#c7f7df]" />

      <div className="mt-5">
        <p className="mb-3 text-[13px] font-semibold text-[#111827]">PDFs</p>

        <div className="space-y-3">
          <div className="rounded-xl bg-[#f9fafb] px-3 py-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <img src="/images/s5.png" alt="book icon" className="w-4 h-4 object-contain"/>
                <div>
                  <p className="text-[13px] font-semibold leading-5 text-[#111827]">
                    Adobe Illustrator Learning Guide
                  </p>
                  <p className="mt-1 text-[11px] text-[#6b7280]">PDF 5.2MB</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#374151]">
                <img src="/images/s7.png" alt="book icon" className="w-4 h-4 object-contain"/>
                 <img src="/images/s6.png" alt="book icon" className="w-4 h-4 object-contain"/>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-[#f9fafb] px-3 py-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <img src="/images/s5.png" alt="book icon" className="w-4 h-4 object-contain"/>
                {/* <BookOpen size={16} className="mt-1 text-[#6b7280]" /> */}
                <div>
                  <p className="text-[13px] font-semibold leading-5 text-[#111827]">
                    Illustrator Layers & Workflow PDF Guide
                  </p>
                  <p className="mt-1 text-[11px] text-[#6b7280]">PDF 40MB</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#374151]">
                 <img src="/images/s7.png" alt="book icon" className="w-4 h-4 object-contain"/>
                 <img src="/images/s6.png" alt="book icon" className="w-4 h-4 object-contain"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-3 text-[13px] font-semibold text-[#111827]">
          Exercise
        </p>

        <div className="rounded-xl bg-[#dcfce7] px-3 py-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex gap-3">
              <img src="/images/s5.png" alt="book icon" className="w-4 h-4 object-contain"/>
              <div>
                <p className="text-[13px] font-semibold leading-5 text-[#111827]">
                  Complex Vector Illustration
                </p>
                <p className="text-[12px] text-[#374151]">
                  (No Raster Images)
                </p>
                <p className="mt-1 text-[11px] text-[#6b7280]">ZIP 24MB</p>
              </div>
            </div>

            <button className="text-[#374151]">↓</button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-3 text-[13px] font-semibold text-[#111827]">
          Other Resources
        </p>

        <button className="flex w-full items-center justify-between rounded-xl border border-black/10 bg-[#f9fafb] px-3 py-3 text-left">
          <div className="flex items-center gap-3">
            <span className="text-[#6b7280]"></span>
             <img src="/images/s4.png" alt="recomm icon" className="w-4 h-4 object-contain"/>
            <span className="text-[13px] font-semibold text-[#374151]">
              Recommended Tools & Links
            </span>
          </div>
          <span className="text-[#6b7280]"><ChevronRight /></span>
        </button>
      </div>
    </div>
  );
}