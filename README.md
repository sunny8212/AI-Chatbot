# 📊 AI Dashboard with Smart Chatbot

A modern dashboard application featuring an AI-powered chatbot that can read, update, and manage data in Google Sheets — all through natural conversation.

## 🌐 Live Demo

**[View Live Dashboard]([https://your-vercel-app.vercel.app](https://ai-dashboard-with-chatbot.vercel.app/))**

---

## ✨ What It Does

### Dashboard
- View and visualize your data in real-time
- Sync data from Google Sheets with one click
- Clean, modern UI for easy data management

### AI Chatbot
The built-in assistant can:

| Feature | Example |
|---------|---------|
| 📊 **View Data** | "Show me all entries" |
| ✏️ **Update Records** | "Change John's status to completed" |
| ➕ **Add Entries** | "Add a new record for Sarah" |
| 🔍 **Search** | "Find all pending tasks" |
| 📧 **Send Emails** | "Email John about the meeting tomorrow" |

The chatbot automatically fetches email addresses from your sheet and composes professional emails on your behalf.

---

## 🛠️ Technical Details

### Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React + TypeScript |
| Styling | Tailwind CSS |
| Hosting | Vercel |
| Workflow Automation | n8n Cloud |
| AI Model | Google Gemini |
| Database | Google Sheets |
| Email Service | Gmail API |

### Architecture

```
┌──────────────┐       POST       ┌──────────────┐       ┌──────────────┐
│              │ ───────────────▶ │              │ ◀───▶ │    Google    │
│   Frontend   │                  │  n8n Cloud   │       │    Sheets    │
│   (Vercel)   │ ◀─────────────── │   Workflow   │       │              │
│              │       JSON       │              │       └──────────────┘
└──────────────┘                  └──────┬───────┘
                                         │
                                  ┌──────┴───────┐
                                  │    Google    │
                                  │    Gemini    │
                                  │   AI Agent   │
                                  └──────────────┘
                                         │
                                  ┌──────┴───────┐
                                  │    Gmail     │
                                  │     API      │
                                  └──────────────┘
```

### How It Works

1. **User sends a message** → Frontend POSTs to n8n webhook
2. **n8n receives request** → Passes to AI Agent (Google Gemini)
3. **AI processes intent** → Reads/updates Google Sheets as needed
4. **Response generated** → Sent back to frontend
5. **Email (if requested)** → AI fetches email from sheet & sends via Gmail

### Key Files

```
├── src/
│   ├── hooks/
│   │   └── useWebhookChat.ts    # Chat logic & API calls
│   ├── components/
│   │   └── ChatBot.tsx          # Chat UI component
│   └── App.tsx                  # Main application
├── .env                         # Environment variables (gitignored)
└── README.md
```

### Environment Variables

```env
VITE_WEBHOOK_URL=https://your-n8n-instance.app.n8n.cloud/webhook/dashboard
```

---

## 🚀 Deployment

### Frontend (Vercel)
- Push to GitHub
- Connect repo to Vercel
- Add environment variables
- Deploy

### Backend (n8n Cloud)
- Workflow hosted on n8n Cloud
- Webhook URL: Production
- Workflow status: Active
