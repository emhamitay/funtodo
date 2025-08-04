import { useState, useMemo } from "react";
import Tooltip from "./Tooltip";
import { TooltipPlacement } from "./placement";

/**
 * A wrapper for the Tooltip component that handles multiple tutorial steps.
 *
 * @param {Object} props
 * @param {Array<{selector: string, content: React.ReactNode, placement?: string}>} props.steps - Array of tutorial steps.
 * @param {Function} [props.onFinish] - Callback when tutorial ends.
 * @param {boolean} [props.AskAtFirstStage] - If true, shows Yes/No prompt before starting.
 * @param {string} [props.className] - Custom class for the tooltip.
 */
export default function Tutorial({
  steps,
  className,
  onFinish,
  AskAtFirstStage = false,
}) {
  const [stepIndex, setStepIndex] = useState(AskAtFirstStage ? -1 : 0);
  const [rect, setRect] = useState(null);

  const realSteps = useMemo(() => AskAtFirstStage ? steps.slice(1) : steps, [steps, AskAtFirstStage]);
  const isLast = stepIndex === realSteps.length - 1;

  function goToStep(index) {
    if (index < 0 || index >= realSteps.length) {
      onFinish?.();
      return;
    }

    const step = realSteps[index];
    const el = document.querySelector(step.selector);

    if (el) {
      const r = el.getBoundingClientRect();
      setRect(r);
    } else {
      console.warn(`[Tutorial] Element not found for selector: "${step.selector}"`);
      setRect(null);
    }

    setStepIndex(index);
  }

  // Start prompt if enabled
  if (stepIndex === -1) {
    const firstStep = steps[0];
    const centerScreenRect = {
      top: window.innerHeight * 0.25,
      left: window.innerWidth / 2,
      width: 0,
      height: 0,
      right: window.innerWidth / 2,
      bottom: window.innerHeight * 0.25,
    };

    return (
      <Tooltip
        targetRect={centerScreenRect}
        content={firstStep.content}
        placement={TooltipPlacement.BottomCenter}
        className={className}
        onClose={onFinish}
        customActions={[
          {
            label: "No",
            onClick: () => onFinish?.(),
            className: "text-zinc-500 hover:text-zinc-700 text-sm",
          },
          {
            label: "Yes",
            onClick: () => goToStep(0),
            className: "text-sky-500 font-semibold text-sm",
          },
        ]}
      />
    );
  }

  // If out of bounds or no rect found, stop rendering tooltip
  if (stepIndex >= realSteps.length || !rect) return null;

  const currentStep = realSteps[stepIndex];

  return (
    <Tooltip
      targetRect={rect}
      content={currentStep.content}
      placement={currentStep.placement || TooltipPlacement.BottomStart}
      className={className}
      onNext={() => goToStep(stepIndex + 1)}
      onBack={() => goToStep(stepIndex - 1)}
      onClose={onFinish}
      isLast={isLast}
    />
  );
}
