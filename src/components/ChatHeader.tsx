interface ChatHeaderProps {
  userName: string
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function ChatHeader({ userName }: ChatHeaderProps) {
  const initials = getInitials(userName)

  return (
    <header className="flex items-center justify-between border-b border-primary/10 bg-white dark:bg-background-dark px-6 py-4 md:px-10 lg:px-40 shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center size-10 rounded-lg bg-primary text-accent">
          <span className="material-symbols-outlined text-2xl">school</span>
        </div>
        <div className="flex flex-col">
          <h1 className="text-primary dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">
            BYU-Pathway
          </h1>
          <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">
            Help Desk
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-6">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10">
          <div className="size-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-semibold text-primary/70">Support Online</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
              help_outline
            </span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-bold text-primary dark:text-slate-100">{userName}</span>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-tighter">
                Student
              </span>
            </div>
            <div className="bg-accent text-primary rounded-full size-10 flex items-center justify-center shrink-0 border-2 border-white dark:border-slate-800 shadow-sm font-bold text-sm">
              {initials}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
