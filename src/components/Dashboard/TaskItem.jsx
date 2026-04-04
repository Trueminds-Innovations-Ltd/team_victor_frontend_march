import { taskBadgeStyles } from "./RightPanel";

export default function TaskItem({ task }) {
  return (
    <div className="w-full flex items-center gap-3">
      {/* Icon */}
      <div className=" p-2 rounded-[0.4rem] bg-[#8533CD]">
      <img
        src={task.img}
        alt={task.title}
        className="w-6 h-6 flex justify-center items-center object-contain flex-shrink-0  rounded-[0.2rem]"
      />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="w-full text-sm font-semibold text-gray-800 truncate">
          {task.title}
        </p>
        <p className="text-xs text-gray-400">{task.due}</p>
      </div>

      {/* Status badge */}
      <span
        className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
          taskBadgeStyles[task.statusColor]
        }`}
      >
        {task.status}
      </span>
    </div>
  );
}