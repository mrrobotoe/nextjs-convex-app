import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateOptions: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
};

export const priorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const statuses = [
  { value: "todo", label: "Todo" },
  { value: "done", label: "Done" },
  { value: "in progress", label: "In Progress" },
  { value: "cancelled", label: "Cancelled" },
  { value: "duplicate", label: "Duplicate" },
  { value: "backlog", label: "Backlog" },
];
