import { create } from 'zustand';
import type { UserRole } from '@/constants/roles';

/**
 * 사용자 인증 정보 타입
 */
export interface User {
  id: string;
  email: string;
  role: UserRole;
  companyId: string;
}

/**
 * 클라이언트 인증 상태(Zustand) 타입
 */
interface AuthState {
  user: User | null;
  accessToken: string | null; // ★ 추가됨
  isLoading: boolean;

  setAuth: (payload: { user: User | null; accessToken: string | null }) => void;
  setUser: (user: User | null) => void;
  startLoading: () => void;
  finishLoading: () => void;
  clearAuth: () => void;
}

/**
 * 클라이언트 전역 인증 상태(Zustand)
 * - accessToken 저장
 * - refreshToken은 httpOnly 쿠키로 브라우저가 관리
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null, // ★ 추가됨
  isLoading: false,

  setAuth: ({ user, accessToken }) => set({ user, accessToken }),
  setUser: (user) => set({ user }),

  startLoading: () => set({ isLoading: true }),
  finishLoading: () => set({ isLoading: false }),

  clearAuth: () => set({ user: null, accessToken: null }), // ★ 둘 다 삭제
}));

/**
 * 서버에서 사용자 정보 가져오기
 * - refreshToken 기반
 * - accessToken은 여기서 필요 없음 (refresh → me API가 인증 수행)
 */
// eslint-disable-next-line @typescript-eslint/require-await
export async function getServerUser(): Promise<User | null> {
  // TODO: 실제 구현 필요
  // const refreshToken = cookies().get('refreshToken')?.value;
  // if (!refreshToken) return null;
  //
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
  //   credentials: 'include',
  //   cache: 'no-store',
  // });
  //
  // if (!res.ok) return null;
  // return (await res.json()) as User;

  return null;
}

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
