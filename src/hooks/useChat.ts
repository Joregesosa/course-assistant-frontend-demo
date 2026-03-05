import { useState, useEffect, useRef, useCallback } from 'react'
import { ChatMessage } from '../types/chat.types'
import { copilotService } from '../services/copilot.service'

interface UseChatOptions {
  contact_guid: string
}

export function useChat({ contact_guid }: UseChatOptions) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isConnecting, setIsConnecting] = useState(true)
  const conversationIdRef = useRef<string | null>(null)

  useEffect(() => {
    let unsubscribe: (() => void) | null = null

    const init = async () => {
      setIsConnecting(true)
      unsubscribe = copilotService.onMessage((msg) => {
        setMessages((prev) => {
          const last = prev[prev.length - 1]
          if (last?.role === 'bot' && last.text === msg.text) return prev
          return [...prev, msg]
        })
        setIsLoading(false)
      })
      conversationIdRef.current = await copilotService.startConversation(contact_guid)
      setIsConnecting(false)
      setIsLoading(true)
    }

    init()

    return () => {
      unsubscribe?.()
    }
  }, [contact_guid])

  const sendMessage = useCallback(async (text: string) => {
    if (!conversationIdRef.current || isLoading || !text.trim()) return

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    await copilotService.sendMessage(conversationIdRef.current, text.trim())
  }, [isLoading])

  return { messages, isLoading, isConnecting, sendMessage }
}
