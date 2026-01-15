'use client';

import { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import Image from 'next/image';
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

const ChatBot = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

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
