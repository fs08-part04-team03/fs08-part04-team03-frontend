'use client';

import { useState, useEffect, useMemo } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';
import { createChatbotConfig } from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';

const CHATBOT_STORAGE_KEY = 'chatbot_messages';

/* === 버튼 스타일 === */
const toggleButtonStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 24,
  right: 24,
  width: 56,
  height: 56,
  borderRadius: '50%',
  border: 'none',
  backgroundColor: '#000000',
  cursor: 'pointer',
  zIndex: 51,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

/* === 챗봇 래퍼 스타일 === */
const chatBotWrapperStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 96,
  right: 24,
  zIndex: 50,
};

const ChatBot = (): JSX.Element | null => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatKey, setChatKey] = useState(0);
  const [previousUserId, setPreviousUserId] = useState<number | null>(null);
  const { user, isHydrated } = useAuthStore();

  // 사용자 role에 따라 동적으로 config 생성
  const config = useMemo(() => {
    const isAdmin = user?.role === 'ADMIN';
    return createChatbotConfig(isAdmin);
  }, [user?.role]);

  // 세션 스토리지에서 메시지 로드
  const loadMessages = () => {
    if (typeof window === 'undefined' || !user) return undefined;

    try {
      const storageKey = `${CHATBOT_STORAGE_KEY}_${user.id}`;
      const stored = sessionStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as unknown[];
        console.log('[Chatbot] Loaded messages from storage:', parsed.length);
        return parsed;
      }
    } catch (error) {
      console.error('[Chatbot] Failed to load messages from session storage:', error);
    }
    return undefined;
  };

  // 세션 스토리지에 메시지 저장 (react-chatbot-kit이 자동으로 호출)
  const saveMessages = (messages: unknown[]) => {
    if (typeof window === 'undefined' || !user) return;

    try {
      const storageKey = `${CHATBOT_STORAGE_KEY}_${user.id}`;
      sessionStorage.setItem(storageKey, JSON.stringify(messages));
      console.log('[Chatbot] saveMessages called:', messages.length, 'messages');
    } catch (error) {
      console.error('[Chatbot] Failed to save messages to session storage:', error);
    }
  };

  // 로그아웃 및 사용자 변경 처리
  useEffect(() => {
    if (!user) {
      // 로그아웃 시
      setIsOpen(false);

      // 모든 챗봇 관련 세션 스토리지 클리어
      if (typeof window !== 'undefined') {
        Object.keys(sessionStorage).forEach((key) => {
          if (key.startsWith(CHATBOT_STORAGE_KEY)) {
            sessionStorage.removeItem(key);
            console.log('[Chatbot] Cleared session storage:', key);
          }
        });
      }

      setPreviousUserId(null);
    } else if (previousUserId !== user.id) {
      // 사용자가 변경되었을 때 (다른 계정으로 로그인)
      console.log('[Chatbot] User changed from', previousUserId, 'to', user.id);

      // 이전 사용자의 세션 스토리지 클리어 (있다면)
      if (previousUserId !== null && typeof window !== 'undefined') {
        const oldStorageKey = `${CHATBOT_STORAGE_KEY}_${previousUserId}`;
        sessionStorage.removeItem(oldStorageKey);
        console.log('[Chatbot] Cleared previous user storage:', oldStorageKey);
      }

      setPreviousUserId(user.id);
      setChatKey((prev) => prev + 1); // 챗봇 재렌더링
    }
  }, [user, previousUserId]);

  // hydration이 완료될 때까지 대기
  if (!isHydrated) {
    return null;
  }

  // 로그인하지 않은 경우 챗봇을 표시하지 않음
  if (!user) {
    return null;
  }

  return (
    <>
      {/* 플로팅 버튼 */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        style={toggleButtonStyle}
        aria-label="챗봇 열기"
      >
        <Image
          src="/icons/chatbot.svg"
          alt="챗봇"
          width={24}
          height={24}
          style={{ display: 'block' }}
        />
      </button>

      {/* 챗봇 본체 */}
      {isOpen && (
        <div style={chatBotWrapperStyle}>
          <Chatbot
            key={chatKey}
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            messageHistory={loadMessages()}
            saveMessages={saveMessages}
          />
        </div>
      )}
    </>
  );
};

export default ChatBot;
