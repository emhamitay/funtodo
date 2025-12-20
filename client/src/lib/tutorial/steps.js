import { TooltipPlacement } from "./placement";

/*
Example:
  { selector: ".step-1", content: "This is part one of the tutorial" },
  { selector: ".step-2", content: "This is part two of the tutorial", placement: TooltipPlacement.BottomEnd },
*/

const steps = [
  {
    content:
      "Would you like to take a brief look at the tutorial I’ve created to introduce the platform and its benefits?",
  },
  {
    selector: ".tutorial-step-1",
    content: "Begin by creating a few tasks using the 'New Task' button.",
    placement: TooltipPlacement.RightStart,
  },
  {
    selector: ".tutorial-step-2",
    content:
      "Use the options menu (represented by the three-dot icon) to edit, view, or delete any task.",
    placement: TooltipPlacement.RightStart,
  },
  {
    selector: ".tutorial-step-3",
    content:
      "To schedule tasks, drag them into your calendar. \n" +
      "Days with pending tasks will appear with a yellow background. \n" +
      "Once all tasks for a day are completed, the background will turn green.",
    placement: TooltipPlacement.RightStart,
  },
  {
    selector: ".tutorial-step-4",
    content:
      "Selecting a specific day on your calendar will display its associated tasks below. \n" +
      "You can easily drag tasks between your inbox and the selected day's task list.",
    placement: TooltipPlacement.TopStart,
  },
  {
    selector: ".tutorial-step-5",
    content:
      "Need assistance organizing or generating tasks? Just ask the AI—it's here to help.",
    placement: TooltipPlacement.BottomStart,
  },
  {
    selector: ".tutorial-step-6",
    content:
      "By logging in, you can access your tasks across multiple devices.",
    placement: TooltipPlacement.LeftStart,
  },
];

export default steps;
