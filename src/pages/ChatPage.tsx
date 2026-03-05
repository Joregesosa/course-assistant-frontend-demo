import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatHeader } from '../components/ChatHeader'
import { MessageBubble } from '../components/MessageBubble'
import { ChatInput } from '../components/ChatInput'
import { useChat } from '../hooks/useChat'
import { SessionUser } from '../types/chat.types'

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function ChatPage() {
  const navigate = useNavigate()
  const bottomRef = useRef<HTMLDivElement>(null)

  const rawSession = sessionStorage.getItem('session')
  const session: SessionUser | null = rawSession ? JSON.parse(rawSession) : null

  useEffect(() => {
    if (!session) navigate('/', { replace: true })
  }, [])

  const { messages, isLoading, isConnecting, sendMessage } = useChat({
    contact_guid: session?.contact_guid ?? '',
  })

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!session) return null

  const userInitials = getInitials(session.name)

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark font-display">
      <ChatHeader userName={session.name} />

      <main className="flex-1 overflow-y-auto px-4 py-8 md:px-10 lg:px-40 space-y-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {isConnecting && (
          <div className="flex items-end gap-3 max-w-2xl">
            <div className="bg-primary/10 text-primary rounded-full size-10 flex items-center justify-center shrink-0 border border-primary/5">
              <span className="material-symbols-outlined text-xl">smart_toy</span>
            </div>
            <div className="flex flex-col gap-1.5 items-start">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Assistant
              </span>
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 text-sm px-5 py-3.5 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                <span className="inline-flex gap-1">
                  <span className="size-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
                  <span className="size-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
                  <span className="size-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
                </span>
                Connecting…
              </div>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            userInitials={userInitials}
          />
        ))}

        {isLoading && !isConnecting && (
          <div className="flex items-end gap-3 max-w-2xl">
            <div className="bg-primary/10 text-primary rounded-full size-10 flex items-center justify-center shrink-0 border border-primary/5">
              <span className="material-symbols-outlined text-xl">smart_toy</span>
            </div>
            <div className="flex flex-col gap-1.5 items-start">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Assistant
              </span>
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-5 py-3.5 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
                <span className="size-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
                <span className="size-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </main>

      <ChatInput onSend={sendMessage} disabled={isConnecting || isLoading} />
    </div>
  )
}
