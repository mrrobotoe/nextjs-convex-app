import { v } from "convex/values";

import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const list = query({
  args: { team: v.string() },
  handler: async (ctx, { team }) => {
    const userId = await auth.getUserId(ctx);

    if (userId === null) {
      throw new Error("Not signed in");
    }

    const user = await ctx.db.get(userId);

    if (user === null) {
      throw new Error("User not found");
    }

    if (user.workspacesId === null || user.workspacesId === undefined) {
      throw new Error("User is not associated with a workspace");
    }

    return await ctx.db
      .query("todos")
      .withIndex("by_workspaces")
      .filter((q) => q.eq(q.field("workspacesIdentifier"), team))
      .collect();
  },
});

export const create = mutation({
  args: {
    content: v.string(),
    title: v.string(),
    priority: v.optional(
      v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    ),
    status: v.optional(
      v.union(
        v.literal("backlog"),
        v.literal("todo"),
        v.literal("in progress"),
        v.literal("blocked"),
        v.literal("cancelled"),
        v.literal("duplicate"),
        v.literal("done"),
      ),
    ),
    assigneeId: v.optional(v.id("users")),
    workspacesId: v.id("workspaces"),
  },
  handler: async (
    ctx,
    {
      content,
      title,
      priority = "low",
      status = "backlog",
      assigneeId,
      workspacesId,
    },
  ) => {
    const userId = await auth.getUserId(ctx);

    if (userId === null) {
      throw new Error("Not signed in");
    }

    const user = await ctx.db.get(userId);

    if (user === null) {
      throw new Error("User not found");
    }

    if (user.workspacesId === null || user.workspacesId === undefined) {
      throw new Error("User is not associated with a workspace");
    }

    // set update time on creation and patching
    const updatedTime = Date.now();

    // get id to create identifier
    const id = (await ctx.db.query("todos").collect()).length + 1;

    const workspaceName = await ctx.db.get(
      user.workspacesId as unknown as Id<"workspaces">,
    );

    if (workspaceName === null) {
      throw new Error("Workspace not found");
    }

    return await ctx.db.insert("todos", {
      content,
      id,
      title,
      identifier: `${workspaceName.identifier}-${id}`,
      priority,
      status,
      updatedTime,
      userId: userId,
      assigneeId: assigneeId ? assigneeId : undefined,
      workspacesId: workspacesId,
    });
  },
});

export const getTodo = query({
  args: { id: v.id("todos") },
  handler: async (ctx, { id }) => {
    const user = await auth.getUserId(ctx);

    if (user === null) {
      throw new Error("Not signed in");
    }

    const todo = await ctx.db.get(id);

    if (todo === null) {
      throw new Error("Todo not found");
    }

    return todo;
  },
});
