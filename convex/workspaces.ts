import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
import { Id } from "./_generated/dataModel";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);

    if (userId === null) {
      throw new Error("Not signed in");
    }

    const user = await ctx.db.get(userId);

    if (user === null) {
      throw new Error("User not found");
    }

    const allWorkspaces = await ctx.db.query("workspaces").collect();

    return allWorkspaces.filter((workspace) =>
      workspace.members?.includes(userId),
    );
  },
});

export const getTeamMembers = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);

    if (userId === null) {
      throw new Error("Not signed in");
    }

    const user = await ctx.db.get(userId);

    if (user === null) {
      throw new Error("User not found");
    }

    if (!user.workspacesId) {
      throw new Error("User is not in a workspace");
    }

    const workspace = await ctx.db.get(
      user.workspacesId as unknown as Id<"workspaces">,
    );

    if (workspace === null) {
      throw new Error("Workspace not found");
    }

    if (!workspace.members) {
      throw new Error("Workspace has no members");
    }

    return await Promise.all(
      workspace.members.map(async (memberId) => ctx.db.get(memberId)),
    );
  },
});

export const create = mutation({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    const userId = await ctx.auth.getUserIdentity();

    if (userId === null) {
      throw new Error("Not signed in");
    }

    let identifier;

    if (name.split(" ").length === 1) {
      identifier = name.slice(0, 3).toUpperCase();
    } else {
      identifier =
        name.slice(0)[0].toUpperCase() +
        name.slice(0)[2].toUpperCase() +
        name.split(" ")[1][0].toUpperCase();
    }

    return await ctx.db.insert("workspaces", {
      name,
      identifier: identifier,
    });
  },
});

export const update = mutation({
  args: { workspacesId: v.id("workspaces"), userId: v.id("users") },
  handler: async (ctx, { workspacesId, userId }) => {
    if (userId === null || workspacesId === null) {
      throw new Error("Please provide both user and the workspace info.");
    }

    const workspace = await ctx.db.get(workspacesId);

    await ctx.db.patch(workspacesId, {
      members: [...(<[]>workspace?.members), userId],
    });
  },
});
