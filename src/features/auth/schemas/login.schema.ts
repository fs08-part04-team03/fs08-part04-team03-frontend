import { z } from 'zod';
import { UserRole } from '@/constants/roles';

// 사용자 정보 스키마 (서버 응답)
export const userSchema = z.object({
  id: z.string().min(1, '사용자 ID가 필요합니다.'),
  email: z.string().min(1, '이메일이 필요합니다.').email('올바른 이메일 형식이 아닙니다.'),
  name: z.string().min(1, '사용자 이름이 필요합니다.'),
  role: z.enum(['user', 'manager', 'admin'], {
    message: '이 페이지에 접근할 권한이 없습니다.',
  }) as z.ZodType<UserRole>,
  companyId: z.string().min(1, '회사 ID가 필요합니다.'),
});

export type User = z.infer<typeof userSchema>;

// 로그인 요청 스키마
// 로그인은 기존 비밀번호를 입력하는 것이므로 형식 검증을 하지 않습니다.
// 비밀번호 형식 검증은 회원가입, 비밀번호 변경, 비밀번호 재설정 시에만 수행됩니다.
export const loginSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요.').email('유효하지 않은 이메일입니다.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

export type LoginInput = z.infer<typeof loginSchema>;

// 인증 응답 스키마 (로그인/토큰 갱신 응답)
export const authResponseSchema = z.object({
  user: userSchema,
  accessToken: z.string().min(1, '액세스 토큰이 필요합니다.'),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

// 비밀번호 변경 스키마
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, '현재 비밀번호를 입력해주세요.'),
    newPassword: z
      .string()
      .min(1, '새 비밀번호를 입력해주세요.')
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .max(30, '비밀번호는 최대 30자까지 입력 가능합니다.'),
    confirmNewPassword: z.string().min(1, '새 비밀번호 확인을 입력해주세요.'),
  })
  .refine(
    (data) => {
      const hasLowerCase = /[a-z]/.test(data.newPassword);
      const hasNumber = /[0-9]/.test(data.newPassword);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(data.newPassword);
      return hasLowerCase && hasNumber && hasSpecialChar;
    },
    {
      message: '비밀번호는 소문자, 숫자, 특수문자를 포함해야 합니다.',
      path: ['newPassword'],
    }
  )
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: '새 비밀번호가 일치하지 않습니다.',
    path: ['confirmNewPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: '현재 비밀번호와 동일한 비밀번호는 사용할 수 없습니다.',
    path: ['newPassword'],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

// 비밀번호 재설정 요청 스키마 (이메일로 재설정 링크 요청)
export const resetPasswordRequestSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요.').email('올바른 이메일 형식이 아닙니다.'),
});

export type ResetPasswordRequestInput = z.infer<typeof resetPasswordRequestSchema>;

// 비밀번호 재설정 스키마 (토큰과 새 비밀번호로 재설정)
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, '재설정 토큰이 필요합니다.'),
    newPassword: z
      .string()
      .min(1, '새 비밀번호를 입력해주세요.')
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .max(30, '비밀번호는 최대 30자까지 입력 가능합니다.'),
    confirmNewPassword: z.string().min(1, '새 비밀번호 확인을 입력해주세요.'),
  })
  .refine(
    (data) => {
      const hasLowerCase = /[a-z]/.test(data.newPassword);
      const hasNumber = /[0-9]/.test(data.newPassword);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(data.newPassword);
      return hasLowerCase && hasNumber && hasSpecialChar;
    },
    {
      message: '비밀번호는 소문자, 숫자, 특수문자를 포함해야 합니다.',
      path: ['newPassword'],
    }
  )
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: '새 비밀번호가 일치하지 않습니다.',
    path: ['confirmNewPassword'],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
