import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    workspacesId: v.optional(v.id("workspaces")),
  }).index("email", ["email"]),
  messages: defineTable({
    userId: v.id("users"),
    body: v.string(),
  }),
  todos: defineTable({
    content: v.optional(v.string()),
    title: v.string(),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    id: v.number(),
    status: v.union(
      v.literal("backlog"),
      v.literal("todo"),
      v.literal("in progress"),
      v.literal("blocked"),
      v.literal("cancelled"),
      v.literal("duplicate"),
      v.literal("done"),
    ),
    workspacesId: v.id("workspaces"),
    identifier: v.optional(v.string()),
    updatedTime: v.optional(v.number()),
    userId: v.id("users"),
    assigneeId: v.optional(v.id("users")),
  }).index("by_workspaces", ["workspacesId"]),
  workspaces: defineTable({
    name: v.string(),
    members: v.optional(v.array(v.id("users"))),
    todos: v.optional(v.array(v.id("todos"))),
    identifier: v.optional(v.string()),
  }).index("by_members", ["members"]),
});
