export function LoginHeader() {
  return (
    <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 lg:px-12 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="size-10 bg-primary flex items-center justify-center rounded-lg text-white">
          <span className="material-symbols-outlined text-2xl">school</span>
        </div>
        <div className="flex flex-col">
          <h2 className="text-primary dark:text-slate-100 text-lg font-bold leading-none tracking-tight">
            BYU-Pathway
          </h2>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
            Worldwide
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:block text-right">
          <p className="text-xs text-slate-500 font-medium">Support Center</p>
          <p className="text-sm font-bold text-primary dark:text-slate-300">Help Desk</p>
        </div>
        <div className="size-10 rounded-full border-2 border-slate-100 dark:border-slate-700 overflow-hidden bg-slate-200 flex items-center justify-center">
          <span className="material-symbols-outlined text-slate-400">account_circle</span>
        </div>
      </div>
    </header>
  )
}
