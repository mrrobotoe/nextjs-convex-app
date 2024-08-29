"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function TodosTable(props: {
  preloadedTasks: Preloaded<typeof api.todos.list>;
}) {
  const tasks = usePreloadedQuery(props.preloadedTasks);

  if (tasks.length === 0) {
    return <div>No tasks</div>;
  }

  return <div>{tasks.map((task) => <div key={task._id}>{task.title}</div>)}</div>;
}