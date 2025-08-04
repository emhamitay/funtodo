import { TooltipPlacement } from "./placement";
import clsx from "clsx";
import { X } from "lucide-react";

/**
 * Tooltip component to highlight a specific DOM element and show helpful content near it.
 *
 * @param {Object} props
 * @param {DOMRect} props.targetRect - The target element's bounding rectangle.
 * @param {React.ReactNode} props.content - The tooltip content.
 * @param {string} [props.placement] - Placement string (e.g., "top-start", "bottom-center").
 * @param {Function} [props.onNext] - Called when the "Next" button is clicked.
 * @param {Function} [props.onBack] - Called when the "Back" button is clicked.
 * @param {Function} [props.onClose] - Called when tooltip is closed via X button.
 * @param {string} [props.className] - Extra CSS class for the tooltip.
 * @param {Array<{label: string, onClick: Function, className?: string}>} [props.customActions] - Optional custom action buttons.
 * @returns {JSX.Element|null}
 */
export default function Tooltip({
  targetRect,
  content,
  placement = TooltipPlacement.BottomStart,
  onNext,
  onBack,
  onClose,
  className = "",
  isLast = false,
  customActions = null,
}) {
  if (!targetRect) return null;

  /**
   * Calculate the tooltip's position based on the targetRect and placement.
   */
  const getPositionStyle = () => {
    const [side, align = "start"] = placement.split("-");
    const margin = 8;

    let left = 0;
    let top = 0;
    let transform = "";

    switch (side) {
      case "top":
        top = targetRect.top - margin;
        if (align === "start") {
          left = targetRect.left;
          transform = "translateY(-100%)";
        } else if (align === "center") {
          left = targetRect.left + targetRect.width / 2;
          transform = "translate(-50%, -100%)";
        } else {
          left = targetRect.right;
          transform = "translateX(-100%) translateY(-100%)";
        }
        break;
      case "bottom":
        top = targetRect.bottom + margin;
        if (align === "start") {
          left = targetRect.left;
        } else if (align === "center") {
          left = targetRect.left + targetRect.width / 2;
          transform = "translate(-50%, 0)";
        } else {
          left = targetRect.right;
          transform = "translateX(-100%)";
        }
        break;
      case "left":
        left = targetRect.left - margin;
        if (align === "start") {
          top = targetRect.top;
          transform = "translateX(-100%)";
        } else if (align === "center") {
          top = targetRect.top + targetRect.height / 2;
          transform = "translate(-100%, -50%)";
        } else {
          top = targetRect.bottom;
          transform = "translate(-100%, -100%)";
        }
        break;
      case "right":
        left = targetRect.right + margin;
        if (align === "start") {
          top = targetRect.top;
        } else if (align === "center") {
          top = targetRect.top + targetRect.height / 2;
          transform = "translate(0, -50%)";
        } else {
          top = targetRect.bottom;
          transform = "translate(0, -100%)";
        }
        break;
    }

    return { position: "absolute", left, top, transform };
  };

  return (
    <div
      role="tooltip"
      aria-live="polite"
      className={clsx(
        "z-50 pre-line text-zinc-600 bg-zinc-50 border p-4 rounded shadow font-sans text-sm antialiased border-zinc-200 relative max-w-sm",
        className
      )}
      style={getPositionStyle()}
    >
      {/* Close (X) button */}
      <button
        onClick={onClose || onNext}
        className="absolute top-1 right-1 text-zinc-400 hover:text-zinc-600 transition cursor-pointer"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Tooltip content */}
      <div className="mb-2">{content}</div>

      {/* Action buttons */}
      <div className="flex gap-3 justify-end mt-3">
        {customActions ? (
          customActions.map((action, index) => (
            <button
              key={index}
              type="button"
              onClick={action.onClick}
              className={clsx("font-sans text-sm antialiased cursor-pointer", action.className)}
            >
              {action.label}
            </button>
          ))
        ) : (
          <>
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="text-zinc-500 hover:text-zinc-700 text-xs cursor-pointer"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={onNext}
              className="text-sky-500 font-sans text-sm antialiased cursor-pointer"
            >
              {isLast ? "Done" : "Next"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
