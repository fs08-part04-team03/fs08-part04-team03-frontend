'use client';

import { fetchWithAuth } from '@/utils/api';
import { logger } from '@/utils/logger';
import { CHAT_API_PATHS } from '@/features/chat/constants/api';

/**
 * 백엔드 API 응답 타입
 */
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * 채팅 응답 데이터 타입
 */
export interface ChatResponseData {
  reply: string;
}

/**
 * 채팅 메시지 전송
 * @param message - 사용자가 입력한 메시지
 * @returns 챗봇의 응답 메시지
 * @note 회사 ID는 JWT 토큰에서 자동으로 추출됩니다 (멀티테넌시)
 */
export async function sendChatMessage(message: string): Promise<string> {
  const response = await fetchWithAuth(CHAT_API_PATHS.SEND_MESSAGE, {
    method: 'POST',
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = '메시지 전송에 실패했습니다.';
    try {
      const errorJson = JSON.parse(errorText) as {
        message?: string;
        error?: string;
      };
      errorMessage = errorJson.message || errorJson.error || errorMessage;
    } catch {
      // JSON 파싱 실패 시 기본 메시지 사용
    }
    logger.error('[Chat API Error]', {
      status: response.status,
      statusText: response.statusText,
      errorText: errorText.substring(0, 500),
      url: CHAT_API_PATHS.SEND_MESSAGE,
    });
    throw new Error(errorMessage);
  }

  const result = (await response.json()) as ApiResponse<ChatResponseData>;

  if (!result.success || !result.data) {
    throw new Error(result.message || '응답 데이터 형식이 올바르지 않습니다.');
  }

  return result.data.reply;
}
