export type MessageRole = 'user' | 'bot'

export interface CalendarFile {
  filename: string
  content: string
}

export interface ChatMessage {
  id: string
  role: MessageRole
  text: string
  timestamp: Date
  calendarFiles?: CalendarFile[]
}

export interface SessionUser {
  name: string
  contact_guid: string
}
