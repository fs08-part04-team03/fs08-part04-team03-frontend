import { createChatBotMessage } from 'react-chatbot-kit';
import ChatHeader from './ChatHeader';

export const createChatbotConfig = (isAdmin: boolean) => ({
  initialMessages: isAdmin
    ? [
        createChatBotMessage('안녕하세요! SNACK AI 챗봇입니다. 무엇을 도와드릴까요?', {}),
        createChatBotMessage(
          '다음과 같은 질문을 하실 수 있습니다:\n\n• 재고 관리 및 확인\n• 매출 및 통계 조회\n• 상품 정보 검색\n• 주문 관련 문의\n• 시스템 사용 방법\n\n궁금하신 점을 자유롭게 물어보세요!',
          {}
        ),
      ]
    : [
        createChatBotMessage('안녕하세요! SNACK AI 챗봇입니다. 무엇을 도와드릴까요?', {}),
        createChatBotMessage(
          '다음과 같은 질문을 하실 수 있습니다:\n\n• 상품 정보 검색\n• 주문 관련 문의\n• 시스템 사용 방법\n\n※ 재고 관리 및 매출 통계는 관리자 전용 기능입니다.\n\n궁금하신 점을 자유롭게 물어보세요!',
          {}
        ),
      ],

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
});
