const GITHUB_ICON = (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const NPM_ICON = (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M0 0v24h24V0H0zm19.2 19.2H12v-9.6H9.6v9.6H4.8V4.8h14.4v14.4z" />
  </svg>
);

export default function Link({ src, type, label, description }) {
  const isGithub = type === "github";
  const accentColor = isGithub ? "text-gray-800" : "text-red-600";
  const bgHover = isGithub
    ? "hover:bg-blue-50 hover:border-blue-200"
    : "hover:bg-red-50 hover:border-red-200";

  return (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg border border-transparent transition-all duration-150 group ${bgHover}`}
    >
      {/* Icon badge */}
      <span className={`shrink-0 ${accentColor}`}>
        {isGithub ? GITHUB_ICON : NPM_ICON}
      </span>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-blue-950 truncate leading-tight">
          {label}
        </p>
        {description && (
          <p className="text-[10px] text-blue-400 truncate leading-tight mt-0.5">
            {description}
          </p>
        )}
      </div>

      {/* Arrow */}
      <svg
        className="w-3 h-3 text-blue-300 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </a>
  );
}
