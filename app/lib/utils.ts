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

export const prioritiesProperties: any = {
  low: {
    name: "low",
    icon: "bar-graph-1.svg",
  },
  medium: {
    name: "medium",
    icon: "bar-graph-2.svg",
  },
  high: {
    name: "high",
    icon: "full-bar-graph.svg",
  },
};

export const statusProperties: any = {
  backlog: {
    name: "backlog",
    icon: "dotted-circle.svg",
  },
  todo: {
    name: "todo",
    icon: "circle.svg",
  },
  "in progress": {
    name: "in progress",
    icon: "half-circle-color.svg",
  },
  done: {
    name: "done",
    icon: "check-circle.svg",
  },
  cancelled: {
    name: "cancelled",
    icon: "close-circle.svg",
  },
  duplicate: {
    name: "duplicate",
    icon: "close-circle.svg",
  },
};
