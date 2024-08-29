
import NavLinks from "./nav-links";
import SignOut from "./sign-out";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import UserMenu from "./user-menu";
import Link from "next/link";
import WorkspacesMenu from "./workspace-menu";

export default async function SideNav() {
  const preloadedUser = await preloadQuery(api.users.viewer, {}, { token: convexAuthNextjsToken() });
  const preloadedWorkspaces = await preloadQuery(api.workspaces.list, {}, { token: convexAuthNextjsToken() });
  return (
    <nav className="inset-y-0 flex min-w-[240px] flex-col p-3 pt-2.5">
      <div className="gap-8">
        <UserMenu preloadedUser={preloadedUser} />
        <NavLinks />
        <WorkspacesMenu preloadWorkspaces={preloadedWorkspaces} />
      </div>
      {/* <div className='mb-2 h-20 px-4 flex items-end justify-center bg-slate-800 rounded-md p-4 md:h-28'>
        <h4 className='text-xl text-white font-bold'>Robot Dev</h4>
      </div>
      <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
        <NavLinks />
        <div className='hidden h-auto w-full grow rounded-md bg-gray-50 md:block'></div>
        <SignOut />
      </div> */}
    </nav>
  );
}
