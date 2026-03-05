import { useState, KeyboardEvent } from 'react'

interface ChatInputProps {
  onSend: (text: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [value, setValue] = useState('')

  const handleSend = () => {
    if (!value.trim() || disabled) return
    onSend(value)
    setValue('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <footer className="bg-white dark:bg-background-dark border-t border-primary/10 px-4 py-6 md:px-10 lg:px-40">
      <div className="max-w-4xl mx-auto">
        <div className="relative flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              placeholder="Type your message..."
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-xl px-4 py-4 pr-24 text-sm md:text-base outline-none transition-all disabled:opacity-50"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button className="p-2 text-slate-400 hover:text-primary transition-colors" type="button">
                <span className="material-symbols-outlined">attach_file</span>
              </button>
              <button className="p-2 text-slate-400 hover:text-primary transition-colors" type="button">
                <span className="material-symbols-outlined">mood</span>
              </button>
            </div>
          </div>
          <button
            onClick={handleSend}
            disabled={disabled || !value.trim()}
            className="bg-primary hover:bg-primary/90 text-white size-12 md:w-auto md:px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
          >
            <span className="hidden md:inline font-bold">Send</span>
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-4 font-medium uppercase tracking-tighter">
          BYU-Pathway Support Agent is available 24/7 for your academic needs.
        </p>
      </div>
    </footer>
  )
}
