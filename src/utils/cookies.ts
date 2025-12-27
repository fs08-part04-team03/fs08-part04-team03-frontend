import type { UserRole } from '@/constants/roles';

interface ErrorResponse {
  success: boolean;
  message?: string;
}

/**
 * 서버 측에서 인증 쿠키를 설정합니다.
 * HttpOnly, Secure 플래그를 포함한 안전한 쿠키를 설정합니다.
 *
 * 보안 강화: accessToken을 함께 전송하여 서버 측에서 검증할 수 있도록 합니다.
 */
export async function setAuthCookies(
  role: UserRole,
  companyId: string,
  accessToken: string
): Promise<void> {
  try {
    const response = await fetch('/api/auth/set-cookies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ role, companyId, accessToken }),
    });

    if (!response.ok) {
      let errorMessage = '쿠키 설정에 실패했습니다.';
      try {
        const error = (await response.json()) as ErrorResponse;
        errorMessage = error.message || errorMessage;
      } catch {
        // JSON 파싱 실패 시 기본 메시지 사용
      }
      throw new Error(errorMessage);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('쿠키 설정 실패:', error);
    throw error;
  }
}

/**
 * 인증 쿠키를 삭제합니다 (로그아웃 시 사용).
 */
export async function clearAuthCookies(): Promise<void> {
  try {
    const response = await fetch('/api/auth/clear-cookies', {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      let errorMessage = '쿠키 삭제에 실패했습니다.';
      try {
        const error = (await response.json()) as ErrorResponse;
        errorMessage = error.message || errorMessage;
      } catch {
        // JSON 파싱 실패 시 기본 메시지 사용
      }
      throw new Error(errorMessage);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('쿠키 삭제 실패:', error);
    throw error;
  }
}
