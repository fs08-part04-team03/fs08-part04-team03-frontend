import { useAuthStore, type User } from '@/lib/store/authStore';

/**
 * 클라이언트에서 현재 사용자 정보를 가져오기
 */
export function getClientUser(): User | null {
  return useAuthStore.getState().user;
}

/**
 * 서버에서 전달받은 user/accessToken을 클라이언트에 넣기 위한 초깃값 설정
 */
export function initializeClientUser(user: User | null, accessToken: string | null = null) {
  const { setAuth } = useAuthStore.getState();
  setAuth({ user, accessToken });
}
