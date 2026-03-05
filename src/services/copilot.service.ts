import { DirectLine } from 'botframework-directlinejs'
import { ChatMessage } from '../types/chat.types'

type MessageCallback = (message: ChatMessage) => void

function createMessage(role: 'user' | 'bot', text: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    text,
    timestamp: new Date(),
  }
}

// ─── Mock Service ────────────────────────────────────────────────────────────

const BOT_MOCK_REPLIES: Record<string, string> = {
  default: 'Lo siento, no entendí tu pregunta. ¿Puedes reformularla?',
  greeting: '¡Hola! Soy tu asistente de BYU-Pathway. ¿En qué puedo ayudarte hoy?',
  courses: 'Puedo ayudarte a encontrar información sobre tus cursos. ¿Qué necesitas saber?',
  guid: 'Puedes encontrar tu Contact GUID en el portal de estudiantes, en la sección de Configuración de Perfil.',
}

function getBotReply(text: string): string {
  if (/hola|hi|hello|buenos/i.test(text)) return BOT_MOCK_REPLIES.greeting
  if (/curso|course/i.test(text)) return BOT_MOCK_REPLIES.courses
  if (/guid|id|portal/i.test(text)) return BOT_MOCK_REPLIES.guid
  return BOT_MOCK_REPLIES.default
}

class MockCopilotService {
  private callbacks: MessageCallback[] = []

  async startConversation(contact_guid: string): Promise<string> {
    const conversationId = `mock-${contact_guid}-${Date.now()}`
    setTimeout(() => {
      const greeting = createMessage('bot', '¡Hola! Soy tu asistente de BYU-Pathway. ¿En qué puedo ayudarte hoy?')
      this.callbacks.forEach((cb) => cb(greeting))
    }, 800)
    return conversationId
  }

  async sendMessage(_conversationId: string, text: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 500))
    const message = createMessage('bot', getBotReply(text))
    this.callbacks.forEach((cb) => cb(message))
  }

  onMessage(callback: MessageCallback): () => void {
    this.callbacks.push(callback)
    return () => {
      this.callbacks = this.callbacks.filter((cb) => cb !== callback)
    }
  }
}

// ─── Adaptive Card text extractor ────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractTextFromActivity(activity: any): string | null {
  if (activity.text) return activity.text

  if (activity.attachments?.length) {
    for (const attachment of activity.attachments) {
      if (attachment.contentType === 'application/vnd.microsoft.card.adaptive') {
        const parts: string[] = []
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const traverse = (node: any) => {
          if (!node) return
          if (node.type === 'TextBlock' && node.text) parts.push(node.text)
          for (const key of ['body', 'items', 'columns', 'cells', 'rows']) {
            if (Array.isArray(node[key])) node[key].forEach(traverse)
          }
        }
        traverse(attachment.content)
        if (parts.length) return parts.join('\n')
      }
    }
  }

  return null
}

// ─── Real Direct Line Implementation ─────────────────────────────────────────

async function fetchTokenFromUrl(tokenUrl: string): Promise<string> {
  const res = await fetch(tokenUrl, { method: 'POST' })
  if (!res.ok) throw new Error('Failed to fetch Direct Line token')
  const data = await res.json()
  return data.token
}

class DirectLineCopilotService {
  private dl: DirectLine | null = null
  private callbacks: MessageCallback[] = []
  private userId = ''

  async startConversation(contact_guid: string): Promise<string> {
    this.userId = contact_guid

    const tokenUrl = import.meta.env.VITE_DIRECTLINE_TOKEN_URL
    const secret = import.meta.env.VITE_DIRECTLINE_SECRET

    const token = tokenUrl ? await fetchTokenFromUrl(tokenUrl) : undefined

    // Pass userId so Direct Line associates all activities with this user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.dl = new DirectLine(token
      ? { token, userId: contact_guid }
      : { secret, userId: contact_guid } as any
    )

    this.dl.activity$.subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (activity: any) => {
        if (activity.type === 'message' && activity.from?.role === 'bot') {
          const text = extractTextFromActivity(activity)
          if (text) {
            const msg = createMessage('bot', text)
            this.callbacks.forEach((cb) => cb(msg))
          }
        }
      },
    })

    this.dl.postActivity({
      type: 'event',
      name: 'startConversation',
      from: { id: contact_guid, role: 'user' },
      value: { contact_guid },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any).subscribe()

    return contact_guid
  }

  async sendMessage(_conversationId: string, text: string): Promise<void> {
    if (!this.dl) return
    await this.dl.postActivity({
      type: 'message',
      text,
      from: { id: this.userId, role: 'user' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any).toPromise()
  }

  onMessage(callback: MessageCallback): () => void {
    this.callbacks.push(callback)
    return () => {
      this.callbacks = this.callbacks.filter((cb) => cb !== callback)
    }
  }
}

// ─── Export active service ───────────────────────────────────────────────────

const useMock = import.meta.env.VITE_USE_MOCK !== 'false'
export const copilotService = useMock ? new MockCopilotService() : new DirectLineCopilotService()
