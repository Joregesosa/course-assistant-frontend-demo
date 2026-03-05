export type MessageRole = 'user' | 'bot'

export interface ChatMessage {
  id: string
  role: MessageRole
  text: string
  timestamp: Date
}

export interface SessionUser {
  name: string
  contact_guid: string
}
