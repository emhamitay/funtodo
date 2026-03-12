export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      {/* Icon badge */}
      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-600 shadow-sm shrink-0">
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      </div>
      {/* Text */}
      <div>
        <p className="text-sm font-bold text-blue-950 tracking-tight leading-tight">
          EmhLists
        </p>
        <p className="text-[10px] text-blue-400 leading-tight">
          Fun task management
        </p>
      </div>
    </div>
  );
}
