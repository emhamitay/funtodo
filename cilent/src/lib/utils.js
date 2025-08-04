import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { isSameDay } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Returns tailwind classes for a given date depending on tasks' completion status.
 * Yellow background = has incomplete tasks.
 * Green background = all tasks completed.
 * @param {Date} date
 * @returns {string} Tailwind classes
 */

export function getTaskDayClasses(date, tasks) {
  const tasksForDay = tasks.filter(
    (task) => task.date && isSameDay(new Date(task.date), date)
  );

  if (tasksForDay.length === 0) return "";

  const hasIncomplete = tasksForDay.some((task) => !task.isdone);
  const hasCompleted = tasksForDay.some((task) => task.isdone);

  if (hasIncomplete) return "bg-yellow-200 text-yellow-800";
  if (hasCompleted) return "bg-green-200 text-green-800";

  return "";
}

export function ConvertDateToYMD(dateToConvert) {
  const original = new Date(dateToConvert); //could be a date or a string
  const d = new Date(
    original.getFullYear(),
    original.getMonth(),
    original.getDate()
  );
  return d;
}
