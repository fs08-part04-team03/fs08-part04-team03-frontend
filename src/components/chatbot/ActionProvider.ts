import type { ReactNode } from 'react';
import { sendChatMessage } from '@/features/chat/api/chat.api';
import { useAuthStore } from '@/lib/store/authStore';

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

const CHATBOT_STORAGE_KEY = 'chatbot_messages';

// 세션 스토리지에 메시지 저장
const saveMessagesToStorage = (messages: ChatMessage[]) => {
  if (typeof window === 'undefined') return;

  const { user } = useAuthStore.getState();
  if (!user) return;

  try {
    const storageKey = `${CHATBOT_STORAGE_KEY}_${user.id}`;
    sessionStorage.setItem(storageKey, JSON.stringify(messages));
    console.log('[Chatbot] Messages saved to session storage:', messages.length);
  } catch (error) {
    console.error('[Chatbot] Failed to save messages to session storage:', error);
  }
};

class ActionProvider {
  private createChatBotMessage: CreateChatBotMessage;

  private setState: SetState;

  constructor(createChatBotMessage: CreateChatBotMessage, setState: SetState) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setState;
  }

  async sendToServer(message: string): Promise<void> {
    try {
      // JWT 토큰에서 자동으로 회사 ID를 추출하여 멀티테넌시 적용
      const reply = await sendChatMessage(message);
      const botMessage = this.createChatBotMessage(reply);

      this.setState((prev) => {
        const newMessages = [...prev.messages, botMessage];
        // 세션 스토리지에 저장
        saveMessagesToStorage(newMessages);
        return {
          ...prev,
          messages: newMessages,
        };
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '메시지 전송에 실패했습니다.';
      const botMessage = this.createChatBotMessage(
        `죄송합니다. 오류가 발생했습니다: ${errorMessage}`
      );

      this.setState((prev) => {
        const newMessages = [...prev.messages, botMessage];
        // 세션 스토리지에 저장
        saveMessagesToStorage(newMessages);
        return {
          ...prev,
          messages: newMessages,
        };
      });
    }
  }
}

export default ActionProvider;
