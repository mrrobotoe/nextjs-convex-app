"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { dateOptions } from "@/app/lib/utils";
import Image from "next/image";

const statusHeaders = [
  { name: "backlog", icon: "/dotted-circle.svg " },
  { name: "todo", icon: "/circle.svg " },
  { name: "in progress", icon: "/half-circle-color.svg" },
  { name: "done", icon: "/check-circle.svg " },
  { name: "cancelled", icon: "/close-circle.svg" },
  { name: "duplicated", icon: "/close-circle.svg " },
];

const prioritiesProperties: any = {
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

const statusProperties: any = {
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

export default function TodosTable(props: {
  preloadedTasks: Preloaded<typeof api.todos.list>;
}) {
  const tasks = usePreloadedQuery(props.preloadedTasks);

  if (tasks.length === 0) {
    return <div className={"pl-8 py-2 text-sm text-slate-800"}>No tasks</div>;
  }

  return (
    <>
      {statusHeaders.map((header) => (
        <div key={header.name}>
          {tasks.map((task) =>
            task.status === header.name ? (
              <div key={task.status}>
                <Header key={header.name} header={header.name} />
                <Row key={task.title} todo={task} />
              </div>
            ) : null,
          )}
        </div>
      ))}
    </>
  );
}

function Header({ header }: { header: string }) {
  return (
    <div className="flex gap-2 bg-stone-200 py-2 px-8 text-sm capitalize border-t border-gray-200">
      <Image
        src={`/${statusProperties[header].icon}`}
        alt={""}
        width={15}
        height={15}
      />
      <span>{header}</span>
      <span></span>
    </div>
  );
}

function Row({ todo }: { todo: any }) {
  return (
    <div className="flex items-center justify-center  bg-white hover:bg-stone-100 px-8 py-2 text-sm border-b-1 border-gray-400">
      <div className="flex items-center gap-3 select-none">
        <Image
          src={`/${prioritiesProperties[todo.priority].icon}`}
          alt=""
          width={15}
          height={15}
        />
        <span className="text-gray-700 font-light min-w-[44px]">
          {todo.identifier}
        </span>
        <Image
          src={`/${statusProperties[todo.status].icon}`}
          alt=""
          width={15}
          height={15}
        />
      </div>
      <div className="ml-2">{todo.title}</div>
      <div className="ml-auto flex gap-2 items-center">
        <span className="text-xs">
          {new Date(todo._creationTime).toLocaleDateString(
            "en-US",
            dateOptions,
          )}
        </span>
        <span className="text-xs">
          {" "}
          {new Date(todo.updatedTime).toLocaleDateString("en-US", dateOptions)}
        </span>
        <span>OO</span>
      </div>
    </div>
  );
}
