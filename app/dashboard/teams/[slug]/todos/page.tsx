import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Metadata } from "next";
import TodosTable from "@/app/ui/todos/todostable";

export const metadata: Metadata = {
  title: "Todos",
};

export default async function Page({ params }: { params: { slug: string } }) {
  const preloadedTodos = await preloadQuery(
    api.todos.list,
    { team: params.slug },
    { token: convexAuthNextjsToken() },
  );
  return <TodosTable preloadedTasks={preloadedTodos} />;
}
