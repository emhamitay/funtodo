export default function View({ taskParams }) {
  const name = taskParams.name;
  const description = taskParams.description;
  const isdone = taskParams.isdone;
  return (
    <div className="font-sans subpixel-antialiased text-neutral-400 text-sm">
      <h3 className="underline text-neutral-900 antialiased">
        <b>{name}</b>
      </h3>
      {/* Show green success box only if isdone */}
      {isdone && (
        <div className="mt-2 mb-2 px-3 py-2 rounded-md border border-green-200 bg-green-100 text-green-800 flex items-center gap-2">
          <svg
            className="w-4 h-4 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Task is done</span>
        </div>
      )}
      {description && (
        <p className="whitespace-pre-line text-sm">
          Description: {description}
        </p>
      )}
    </div>
  );
}
