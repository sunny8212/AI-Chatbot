import { useState, useCallback } from 'react';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const WEBHOOK_URL = 'https://sunny8212.app.n8n.cloud/webhook/dashboard';

export const useWebhookChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Fetch greeting from n8n when chat opens
  const initChat = useCallback(async () => {
    if (initialized) return;
    
    setLoading(true);
    setInitialized(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'greeting', isInit: true }),
      });

      const data = await response.json();

      const greetingMessage: ChatMessage = {
        role: 'assistant',
        content: data.output || 'Hi there! How can I help you today?',
        timestamp: new Date(),
      };
      setMessages([greetingMessage]);
    } catch (err) {
      // Fallback greeting if API fails
      const fallbackMessage: ChatMessage = {
        role: 'assistant',
        content: 'Hi there! How can I help you today?',
        timestamp: new Date(),
      };
      setMessages([fallbackMessage]);
    } finally {
      setLoading(false);
    }
  }, [initialized]);

  const sendMessage = async (content: string): Promise<any> => {
    setLoading(true);
    setError(null);

    const userMessage: ChatMessage = {
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.output || data.message || JSON.stringify(data),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);

      setLoading(false);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setError(null);
    setInitialized(false);
  };

  return { messages, loading, error, sendMessage, clearMessages, initChat };
};