import Markdown from 'react-markdown'
import { ChatMessage } from '../types/chat.types'

interface MessageBubbleProps {
  message: ChatMessage
  userInitials: string
}

export function MessageBubble({ message, userInitials }: MessageBubbleProps) {
  const isBot = message.role === 'bot'

  if (isBot) {
    return (
      <div className="flex items-end gap-3 max-w-2xl">
        <div className="bg-primary/10 text-primary rounded-full size-10 flex items-center justify-center shrink-0 border border-primary/5">
          <span className="material-symbols-outlined text-xl">smart_toy</span>
        </div>
        <div className="flex flex-col gap-1.5 items-start">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
            Assistant
          </span>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm md:text-base px-5 py-3.5 rounded-2xl rounded-bl-none shadow-sm">
            <Markdown
              components={{
                a: ({ href, children }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:opacity-80">
                    {children}
                  </a>
                ),
                ul: ({ children }) => <ul className="list-disc pl-5 space-y-1 my-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1 my-1">{children}</ol>,
                strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
              }}
            >
              {message.text}
            </Markdown>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-end gap-3 justify-end ml-auto max-w-2xl">
      <div className="flex flex-col gap-1.5 items-end">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
          You
        </span>
        <div className="bg-primary text-white text-sm md:text-base px-5 py-3.5 rounded-2xl rounded-br-none shadow-md">
          {message.text}
        </div>
      </div>
      <div className="bg-accent text-primary rounded-full size-10 flex items-center justify-center shrink-0 border border-primary/10 font-bold text-sm">
        {userInitials}
      </div>
    </div>
  )
}
