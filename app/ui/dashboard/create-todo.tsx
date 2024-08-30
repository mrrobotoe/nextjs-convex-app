"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { ChevronRight, SquarePenIcon } from "lucide-react";

import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { z } from "zod";

import { Button } from "@/app/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/app/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem } from "@/app/ui/form";
import { Input } from "@/app/ui/input";
import { Badge } from "@/app/ui/badge";
import { useToast } from "@/app/ui/use-toast";

import { api } from "@/convex/_generated/api";
import React from "react";

import { priorities, statuses, statusProperties } from "@/app/lib/utils";

export default function CreateTodo() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { toast } = useToast();

  const createTodoSchema = z.object({
    title: z.string().min(1, "Required"),
    content: z.string(),
    status: z.enum([
      "todo",
      "done",
      "in progress",
      "cancelled",
      "duplicate",
      "backlog",
    ]),
    priority: z.enum(["low", "medium", "high"]),
    assignee: z.string(),
    user: z.string().optional(),
  });

  const form = useForm<z.infer<typeof createTodoSchema>>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: "",
      content: "",
      status: "backlog",
      priority: "low",
      assignee: "no assignee",
      user: "",
    },
  });

  React.useEffect(() => {
    if (form.formState.errors.title) {
      toast({
        title: "Title is required",
        description: "Please enter a title before creating.",
      });
    }
  });

  const onSubmit = (values: z.infer<typeof createTodoSchema>) => {
    console.log(values);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 h-7 w-7 px-1 mr-1 bg-stone-100 hover:bg-white dark:bg-slate-600 group"
        >
          <SquarePenIcon className="dark:stroke-gray-400 group-hover:dark:stroke-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4 sm:max-w-[800px] shadow-lg bg-white left-[50%] top-[30%] gap-2">
        <Form {...form}>
          <DialogHeader className="flex flex-row gap-1 items-center w-full">
            <Badge className="w-[max-content] bg-slate-600 text-white">
              {/*{workspaces ? workspaces[0]?.identifier : "Workspace"}*/}
            </Badge>
            <ChevronRight className="stroke-gray-600 size-4 !mt-0" />
            <DialogTitle className="text-sm text-gray-900 dark:text-white font-light !mt-0">
              New Issue
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={() => {
              form.handleSubmit(onSubmit);
            }}
            className="grid gap-2 py-1"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Issue Title"
                      className="pl-1 shadow-none border-0 text-lg placeholder:text-neutral-400 dark:placeholder:text-neutral-400 font-medium focus-visible:ring-0 active:border-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="min-h-[5rem] mb-2">
                  <FormControl>
                    <TextareaAutosize
                      placeholder="Add a description..."
                      className="pl-1 resize-none w-full overflow-hidden bg-transparent shadow-none border-0 text-[0.95rem] placeholder:text-neutral-400 dark:placeholder:text-neutral-400 font-light outline-none active:border-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="h-7">
                            {field.value.charAt(0).toUpperCase() +
                              field.value.slice(1)}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-32">
                          <DropdownMenuLabel>Priority</DropdownMenuLabel>
                          <DropdownMenuRadioGroup
                            {...field}
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            {priorities.map((priority) => (
                              <DropdownMenuRadioItem
                                key={priority.value}
                                value={priority.value}
                                className={"capitalize"}
                              >
                                <span>{priority.value}</span>
                              </DropdownMenuRadioItem>
                            ))}
                          </DropdownMenuRadioGroup>{" "}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="h-7">
                            {field.value.charAt(0).toUpperCase() +
                              field.value.slice(1)}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-40">
                          <DropdownMenuLabel>Status</DropdownMenuLabel>
                          <DropdownMenuRadioGroup
                            {...field}
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            {statuses.map((status) => (
                              <DropdownMenuRadioItem
                                key={status.value}
                                value={status.value}
                                className={"capitalize"}
                              >
                                {status.value}
                              </DropdownMenuRadioItem>
                            ))}
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assignee"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="h-7">
                            {field.value !== "no assignee"
                              ? field.value.split("@")[0]
                              : "Assignee"}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56">
                          <DropdownMenuLabel>Members</DropdownMenuLabel>
                          <DropdownMenuRadioGroup
                            {...field}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={"no assignee"}
                          >
                            <DropdownMenuRadioItem
                              className="text-xs"
                              key="no assignee"
                              value="no assignee"
                            >
                              No Assignee
                            </DropdownMenuRadioItem>
                            {/*{members?.map((member) => (*/}
                            {/*  <DropdownMenuRadioItem*/}
                            {/*    className="text-xs"*/}
                            {/*    key={member?._id}*/}
                            {/*    value={member?.email as string}*/}
                            {/*  >*/}
                            {/*    {member?.email}*/}
                            {/*  </DropdownMenuRadioItem>*/}
                            {/*))}*/}
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter className="-mb-3 -mx-4 px-4 pt-3 border-t border-gray-200">
          <DialogClose asChild>
            <Button
              className="bg-slate-600 dark:text-white dark:hover:bg-slate-500 font-light text-sm h-8 mt-0"
              onClick={form.handleSubmit(onSubmit)}
              type="submit"
              disabled={loading}
            >
              Create issue
            </Button>
          </DialogClose>
        </DialogFooter>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
}
