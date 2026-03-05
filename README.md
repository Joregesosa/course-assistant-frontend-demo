# Course Assistant Frontend Demo

Frontend demo for a BYU-Pathway course assistant chatbot, built with React + Vite + TypeScript + Tailwind CSS. Connects to a Microsoft Copilot Studio bot via Azure Bot Framework Direct Line.

## Tech Stack

- **React 19** with React Router v7
- **TypeScript** + Vite
- **Tailwind CSS** for styling
- **botframework-directlinejs** for bot communication
- **pnpm** as package manager

## Project Structure

```
src/
├── components/
│   ├── ChatHeader.tsx       # Header shown on the chat page
│   ├── ChatInput.tsx        # Message input with send button
│   ├── LoginHeader.tsx      # Header shown on the login page
│   └── MessageBubble.tsx    # Individual chat message bubble
├── hooks/
│   └── useChat.ts           # Hook that manages conversation state
├── pages/
│   ├── LoginPage.tsx        # Login form (name + Contact GUID)
│   └── ChatPage.tsx         # Main chat interface
├── services/
│   └── copilot.service.ts   # Direct Line service (real + mock)
├── types/
│   └── chat.types.ts        # TypeScript interfaces
└── App.tsx                  # Route definitions
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
pnpm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_USE_MOCK` | Set to `true` to use the mock service (no bot required) |
| `VITE_DIRECTLINE_TOKEN_URL` | URL of an endpoint that returns a Direct Line token via `POST` |
| `VITE_DIRECTLINE_SECRET` | Direct Line secret (fallback if no token URL is provided) |

> **Note:** Prefer `VITE_DIRECTLINE_TOKEN_URL` over `VITE_DIRECTLINE_SECRET` in production to avoid exposing the secret in the browser.

### Run in development

```bash
pnpm dev
```

### Build for production

```bash
pnpm build
pnpm preview
```

## How It Works

1. The user enters their **Full Name** and **Contact GUID** on the login page.
2. The session is stored in `sessionStorage` and the user is redirected to `/chat`.
3. The `useChat` hook initializes the conversation by calling `copilotService.startConversation(contact_guid)`, which sends a `startConversation` event to the bot with the user's GUID.
4. Incoming bot messages are received via the Direct Line activity stream and rendered as `MessageBubble` components. Adaptive Card attachments are parsed and rendered as plain text.
5. The user can send messages through the `ChatInput` component.

## Mock Mode

When `VITE_USE_MOCK=true`, the app uses a local mock service instead of connecting to the bot. This is useful for UI development and testing without needing bot credentials.

The mock responds to keywords:

| Keyword | Response |
|---|---|
| `hola`, `hi`, `hello` | Greeting message |
| `curso`, `course` | Course info message |
| `guid`, `id`, `portal` | Help finding the Contact GUID |
| anything else | Default fallback response |

## Authentication Flow

The Direct Line connection supports two authentication methods:

- **Token URL (recommended):** A `POST` request is made to `VITE_DIRECTLINE_TOKEN_URL` to retrieve a short-lived token. Use this in production.
- **Secret (development only):** The Direct Line secret is passed directly. Avoid this in production as it exposes credentials in the browser.
