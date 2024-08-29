import SideNav from "@/app/ui/dashboard/side-nav";

export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen bg-stone-200 dark:bg-gray-800">
      <SideNav />
      <div className="my-2 mr-2 w-full rounded bg-white dark:bg-slate-900 md:pl-0">{children}</div>
    </div>
  )
}