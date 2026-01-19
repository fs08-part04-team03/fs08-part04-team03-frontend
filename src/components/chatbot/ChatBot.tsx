'use client';

import { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';
import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';

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
  const { user, isHydrated } = useAuthStore();

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
          <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
        </div>
      )}
    </>
  );
};

export default ChatBot;
