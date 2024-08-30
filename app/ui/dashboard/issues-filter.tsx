// "use client";
//
// import { AvatarIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
// import { CircleDashed, ListFilter } from "lucide-react";
// import React from "react";
//
// import FullBarGraph from "@/assets/fullbar-graph.svg";
// import { Button } from "@/app/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/app/ui/command";
// import { Popover, PopoverContent, PopoverTrigger } from "@/app/ui/popover";
// import { cn } from "@/app/lib/utils";
//
// const filters = [
//   {
//     value: "status",
//     label: "Status",
//     icon: CircleDashed,
//   },
//   {
//     value: "priority",
//     label: "Priority",
//     icon: FullBarGraph,
//   },
//   {
//     value: "assignee",
//     label: "Assignee",
//     icon: AvatarIcon,
//   },
// ];
//
// const statuses = [
//   "Backlog",
//   "In Progress",
//   "Done",
//   "Todo",
//   "Blocked",
//   "Cancelled",
//   "Duplicated",
// ];
//
// const priorities = ["Low", "Medium", "High"];
//
// type StatusFilter = {
//   status?: string;
// };
//
// type PriorityFilter = {
//   priority?: string;
// };
//
// type TFilters = StatusFilter | PriorityFilter;
//
// enum MenuOptions {
//   STATUS,
//   PRIORITY,
// }
//
// const IssuesFilter = () => {
//   const [open, setOpen] = React.useState(false);
//   const [statusMenuOpen, setStatusMenuOpen] =
//     React.useState<MenuOptions | null>(null);
//   const [value, setValue] = React.useState("");
//   const [filterSet, setFilterSet] = React.useState(new Set<TFilters>());
//
//   const filterSetArray = Array.from(filterSet) as TFilters[];
//
//   return (
//     <>
//       <Popover open={open} onOpenChange={setOpen}>
//         <div className="flex gap-2 items-center">
//           {filterSet.size > 0 && (
//             <div className="flex flex-auto flex-wrap items-center  pt-2">
//               {filterSetArray.map((filter, index) => {
//                 return (
//                   <div
//                     key={index}
//                     className="flex items-center justify-center gap-0.5 group"
//                   >
//                     <div className="mr-2 mb-2 inline-flex items-center gap-3 border border-gray-300 rounded-sm select-none dark:bg-slate-700">
//                       <span className="py-0.5 pl-2 rounded-l-sm bg-white dark:bg-slate-700 text-[0.825rem] font-light text-gray-800 dark:text-white">
//                         {Object.keys(filter)[0][0].toUpperCase() +
//                           Object.keys(filter)[0].slice(1)}
//                       </span>
//                       <span className="py-0.5 bg-white dark:bg-slate-700 text-[0.825rem] font-light text-gray-800 dark:text-white">
//                         is
//                       </span>
//                       <span className="py-0.5 bg-white dark:bg-slate-700 text-[0.825rem] font-light text-gray-800 dark:text-white">
//                         {Object.values(filter)[0]}
//                       </span>
//                       <button
//                         type="button"
//                         onClick={() => {
//                           filterSet.delete(filter);
//                           setFilterSet(new Set(filterSet));
//                         }}
//                         className="py-1.5 px-2 -ml-1 rounded-r-sm bg-white dark:bg-slate-700 text-sm font-light hover:bg-gray-100 hover:dark:bg-slate-400"
//                       >
//                         <Cross2Icon className="" />
//                         <span className="sr-only">Remove filter</span>
//                       </button>
//                     </div>
//                     <div className="hidden group-[&:last-child]:inline-block -mt-2">
//                       <PopoverTrigger asChild>
//                         <Button
//                           className="h-7 px-2 dark:bg-slate-700"
//                           variant="outline"
//                           size="sm"
//                           role="combobox"
//                           aria-expanded={open}
//                         >
//                           <ListFilter className="size-3.5 " />
//                           {filterSet.size <= 0 && <span>Filter</span>}
//                         </Button>
//                       </PopoverTrigger>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//           {filterSet.size <= 0 && (
//             <PopoverTrigger asChild>
//               <Button
//                 className="my-2 h-7 px-2 dark:bg-slate-700"
//                 variant="outline"
//                 size="sm"
//                 role="combobox"
//                 aria-expanded={open}
//               >
//                 <ListFilter className="size-3.5 " />
//               </Button>
//             </PopoverTrigger>
//           )}
//         </div>
//
//         <PopoverContent align="start" className="w-[175px] p-0">
//           <Command onBlur={() => setStatusMenuOpen(null)}>
//             <CommandInput placeholder="Filter" />
//             <CommandList>
//               <CommandEmpty>No statuses found.</CommandEmpty>
//               <CommandGroup>
//                 {statusMenuOpen === MenuOptions.STATUS ? (
//                   <StatusFilter
//                     value={value}
//                     filterSet={filterSet}
//                     setFilterSet={setFilterSet}
//                     setOpen={setOpen}
//                     setStatusMenuOpen={setStatusMenuOpen}
//                     setValue={setValue}
//                   />
//                 ) : statusMenuOpen === MenuOptions.PRIORITY ? (
//                   <PriorityFilter
//                     value={value}
//                     filterSet={filterSet}
//                     setFilterSet={setFilterSet}
//                     setOpen={setOpen}
//                     setStatusMenuOpen={setStatusMenuOpen}
//                     setValue={setValue}
//                   />
//                 ) : (
//                   filters.map((filter) => (
//                     <CommandItem
//                       key={filter.value}
//                       value={filter.value}
//                       className="gap-2 text-[0.825rem]"
//                       onSelect={(currentValue) => {
//                         setValue(currentValue === value ? "" : currentValue);
//                         if (currentValue === "status") {
//                           setStatusMenuOpen(MenuOptions.STATUS);
//                         }
//                         if (currentValue === "priority") {
//                           setStatusMenuOpen(MenuOptions.PRIORITY);
//                         }
//                       }}
//                     >
//                       <filter.icon className="size-3.5" />
//                       <div>{filter.label}</div>
//                     </CommandItem>
//                   ))
//                 )}
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>
//     </>
//   );
// };
//
// export { IssuesFilter };
//
// const StatusFilter = ({
//   value,
//   filterSet,
//   setFilterSet,
//   setValue,
//   setStatusMenuOpen,
//   setOpen,
// }: {
//   value: string;
//   filterSet: Set<TFilters>;
//   setFilterSet: (value: Set<TFilters>) => void;
//   setValue: (value: string) => void;
//   setStatusMenuOpen: (value: MenuOptions | null) => void;
//   setOpen: (value: boolean) => void;
// }) => {
//   return statuses.map((status) => (
//     <CommandItem
//       key={status}
//       value={status}
//       className="gap-2 text-[0.825rem]"
//       onSelect={(currentValue) => {
//         setValue(currentValue === value ? "" : currentValue);
//         setFilterSet(new Set([...filterSet, { status: currentValue }]));
//         setOpen(false);
//         setStatusMenuOpen(null);
//       }}
//     >
//       <div>{status}</div>
//       <CheckIcon
//         className={cn(
//           "ml-auto h-4 w-4",
//           value === status ? "opacity-100" : "opacity-0",
//         )}
//       />
//     </CommandItem>
//   ));
// };
//
// const PriorityFilter = ({
//   value,
//   filterSet,
//   setFilterSet,
//   setValue,
//   setStatusMenuOpen,
//   setOpen,
// }: {
//   value: string;
//   filterSet: Set<TFilters>;
//   setFilterSet: (value: Set<TFilters>) => void;
//   setValue: (value: string) => void;
//   setStatusMenuOpen: (value: MenuOptions | null) => void;
//   setOpen: (value: boolean) => void;
// }) => {
//   return priorities.map((priority) => (
//     <CommandItem
//       key={priority}
//       value={priority}
//       className="gap-2 text-[0.825rem]"
//       onSelect={(currentValue) => {
//         setValue(currentValue === value ? "" : currentValue);
//         setFilterSet(new Set([...filterSet, { priority: currentValue }]));
//         setOpen(false);
//         setStatusMenuOpen(null);
//       }}
//     >
//       <div>{priority}</div>
//       <CheckIcon
//         className={cn(
//           "ml-auto h-4 w-4",
//           value === priority ? "opacity-100" : "opacity-0",
//         )}
//       />
//     </CommandItem>
//   ));
// };
