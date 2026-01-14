import type { ReactNode } from 'react';

interface ChatMessage {
  id: number;
  message: string | ReactNode;
  type: 'bot' | 'user';
}

interface ChatbotState {
  messages: ChatMessage[];
}

type CreateChatBotMessage = (message: string | ReactNode) => ChatMessage;

type SetState = (updater: (prev: ChatbotState) => ChatbotState) => void;

interface ChatResponse {
  reply: string;
}

class ActionProvider {
  private createChatBotMessage: CreateChatBotMessage;

  private setState: SetState;

  constructor(createChatBotMessage: CreateChatBotMessage, setState: SetState) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setState;
  }

  async sendToServer(message: string): Promise<void> {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const json = (await res.json()) as ChatResponse;

    const botMessage = this.createChatBotMessage(json.reply);

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }
}

export default ActionProvider;
