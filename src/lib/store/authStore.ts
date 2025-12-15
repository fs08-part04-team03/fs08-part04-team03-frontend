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
