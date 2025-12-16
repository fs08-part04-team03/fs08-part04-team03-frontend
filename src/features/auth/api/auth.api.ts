import type { LoginInput } from '@/features/auth/schemas/login.schema';
import type { SignupInput } from '@/features/auth/schemas/signup.schema';
import type { User } from '@/lib/store/authStore';

/**
 * 회원가입 API 요청 타입 (confirmPassword 제외)
 */
type SignupRequest = Omit<SignupInput, 'confirmPassword'>;

/**
 * 백엔드 API 응답 타입
 */
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

/**
 * 로그인 응답 데이터 타입
 */
interface LoginResponseData {
  user: {
    id: string;
    companyId: string;
    email: string;
    name: string;
    role: string; // 'MANAGER', 'USER', 'ADMIN' 등
  };
  accessToken: string;
}

/**
 * 회원가입 응답 데이터 타입
 */
interface SignupResponseData {
  user: {
    id: string;
    companyId: string;
    email: string;
    name: string;
    role: string;
  };
  accessToken: string;
}

/**
 * 백엔드 role을 클라이언트 role로 변환
 */
function normalizeRole(role: string): 'user' | 'manager' | 'admin' {
  const upperRole = role.toUpperCase();
  if (upperRole === 'MANAGER') return 'manager';
  if (upperRole === 'ADMIN') return 'admin';
  return 'user';
}

/**
 * 로그인 API 호출
 */
export async function login(credentials: LoginInput): Promise<{ user: User; accessToken: string }> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });

  // 응답이 JSON인지 확인
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    await response.text(); // 응답 본문 소비
    throw new Error('서버 응답 형식이 올바르지 않습니다.');
  }

  let result: ApiResponse<LoginResponseData>;
  try {
    result = (await response.json()) as ApiResponse<LoginResponseData>;
  } catch {
    throw new Error('서버 응답을 파싱할 수 없습니다.');
  }

  if (!result.success || !response.ok) {
    throw new Error(result.message || '로그인에 실패했습니다.');
  }

  return {
    user: {
      id: result.data.user.id,
      email: result.data.user.email,
      role: normalizeRole(result.data.user.role),
      companyId: result.data.user.companyId,
    },
    accessToken: result.data.accessToken,
  };
}

/**
 * 회원가입 API 호출
 */
export async function signup(
  signupData: SignupRequest
): Promise<{ user: User; accessToken: string }> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
      companyName: signupData.companyName,
      businessNumber: signupData.businessNumber,
    }),
  });

  // 응답이 JSON인지 확인
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    await response.text(); // 응답 본문 소비
    throw new Error('서버 응답 형식이 올바르지 않습니다.');
  }

  let result: ApiResponse<SignupResponseData>;
  try {
    result = (await response.json()) as ApiResponse<SignupResponseData>;
  } catch {
    throw new Error('서버 응답을 파싱할 수 없습니다.');
  }

  if (!result.success || !response.ok) {
    throw new Error(result.message || '회원가입에 실패했습니다.');
  }

  return {
    user: {
      id: result.data.user.id,
      email: result.data.user.email,
      role: normalizeRole(result.data.user.role),
      companyId: result.data.user.companyId,
    },
    accessToken: result.data.accessToken,
  };
}
