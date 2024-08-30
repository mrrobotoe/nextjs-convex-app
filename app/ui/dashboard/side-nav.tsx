import NavLinks from "./nav-links";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import UserMenu from "./user-menu";
import WorkspacesMenu from "./workspace-menu";
import CreateTodo from "@/app/ui/dashboard/create-todo";

export default async function SideNav() {
  const preloadedUser = await preloadQuery(
    api.users.viewer,
    {},
    { token: convexAuthNextjsToken() },
  );
  const preloadedWorkspaces = await preloadQuery(
    api.workspaces.list,
    {},
    { token: convexAuthNextjsToken() },
  );
  return (
    <nav className="inset-y-0 flex min-w-[240px] flex-col p-3 pt-2.5">
      <div className="gap-8">
        <UserMenu preloadedUser={preloadedUser} />
        <NavLinks />
        <WorkspacesMenu preloadWorkspaces={preloadedWorkspaces} />
      </div>
    </nav>
  );
}
