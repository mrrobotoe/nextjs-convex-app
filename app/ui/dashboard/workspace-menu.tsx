"use client";

import { ArchiveIcon, LayersIcon } from "@radix-ui/react-icons";
import { ContactRound } from "lucide-react";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/ui/accordion";
import { cn } from "@/app/lib/utils";

export default function WorkspacesMenu({
  preloadWorkspaces,
}: {
  preloadWorkspaces: Preloaded<typeof api.workspaces.list>;
}) {
  const workspaces = usePreloadedQuery(preloadWorkspaces);
  const pathname = usePathname();

  return (
    <div className="mt-4">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem className="border-0" value="item-1">
          <AccordionTrigger className="cursor-default justify-normal gap-3 rounded-sm px-2 py-1 text-[0.7675rem] hover:bg-black/10 dark:hover:bg-white/10">
            Teams
          </AccordionTrigger>
          <AccordionContent>
            {workspaces?.map((workspace) => (
              <Accordion
                key={workspace._id}
                type="single"
                collapsible
                className="w-full"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="flex items-center cursor-default rounded-sm justify-normal gap-3 px-2 py-1 my-1 pl-3 text-[0.7675rem] hover:bg-stone-300 dark:hover:bg-white/10">
                    <ContactRound className="rounded-md size-4 stroke-red-500 stroke-2" />{" "}
                    {workspace.name}
                  </AccordionTrigger>
                  <AccordionContent asChild className="text-[0.7675rem]">
                    <Link
                      href={`/dashboard/teams/${workspace.identifier}/todos`}
                    >
                      <div
                        className={cn(
                          `${pathname === `/dashboard/teams/${workspace.identifier}/todos` && "bg-black/10 dark:bg-white/10"}`,
                          "group cursor-default flex gap-2 py-1 px-2 pl-6 rounded-sm items-center hover:bg-stone-300 dark:hover:bg-white/10",
                        )}
                      >
                        <ArchiveIcon className="size-4 dark:stroke-gray-400 group-hover:dark:stroke-white" />
                        <h2 className="text-[0.8675rem]">Issues</h2>
                      </div>
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
