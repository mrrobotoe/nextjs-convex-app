import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { TodosTable } from "@/app/ui/todos";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Todos',
};

export default async function Page() {
  const preloadedTodos = await preloadQuery(api.todos.list, {}, { token: convexAuthNextjsToken() });

  return <TodosTable preloadedTasks={preloadedTodos} />;
}