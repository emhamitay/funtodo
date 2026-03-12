import Link from "./Information/Link";

export default function Information() {
  return (
    <div className="font-sans antialiased space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-100">
          <svg
            className="w-4 h-4 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-sm font-semibold text-blue-950 tracking-tight">
          About this project
        </h1>
      </div>

      {/* Repositories section */}
      <div className="space-y-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-400 px-1">
          Repositories
        </p>
        <div className="space-y-1">
          <Link
            src="https://github.com/emhamitay/funtodo"
            type="github"
            label="FunTodo"
            description="Full-stack source code"
          />
          <Link
            src="https://github.com/emhamitay/TutorialFramework"
            type="github"
            label="Tutorial Framework"
            description="Interactive tutorial engine"
          />
          <Link
            src="https://github.com/emhamitay/ghostdrop"
            type="github"
            label="GhostDrop"
            description="Drag & drop framework"
          />
        </div>
      </div>

      {/* Packages section */}
      <div className="space-y-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-red-400 px-1">
          Packages
        </p>
        <div className="space-y-1">
          <Link
            src="https://www.npmjs.com/package/@emhamitay/ghostdrop"
            type="npm"
            label="@emhamitay/ghostdrop"
            description="Available on npm"
          />
        </div>
      </div>
    </div>
  );
}
