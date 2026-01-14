import { createChatBotMessage } from 'react-chatbot-kit';
import ChatHeader from './ChatHeader';

const config = {
  initialMessages: [createChatBotMessage('안녕하세요! 무엇을 도와드릴까요?', {})],

  // ✅ 상단 헤더 커스텀
  customComponents: {
    header: () => <ChatHeader />,
  },

  // 메시지 스타일
  customStyles: {
    botMessageBox: {
      backgroundColor: '#212121', // 검은색 배경
      color: '#ffffff', // 흰 글씨
      borderRadius: '8px',
      padding: '10px 12px',
      fontSize: '14px',
    },
    userMessageBox: {
      color: '#ffffff',
      borderRadius: '8px',
      padding: '10px 12px',
      fontSize: '14px',
    },
    chatButton: {
      backgroundColor: '#212121',
    },
  },
};

export default config;
