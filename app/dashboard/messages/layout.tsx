export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full shadow-sm overflow-auto flex flex-col border border-slate-200 sm:rounded-sm bg-white dark:bg-slate-900 dark:border-slate-700">
      <div className="flex-none">
        <h1 className="border-b border-gray-200 dark:border-slate-700 p-2 pl-12 md:pl-8 text-[0.825rem] font-normal">
          Messages
        </h1>
      </div>
      <div className="flex-1 h-full">{children}</div>
    </div>

  )
}