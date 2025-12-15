import { z } from 'zod';

// 회원가입 요청 스키마
export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, '이름을 입력해주세요.')
      .max(30, '이름은 최대 30자까지 입력 가능합니다.'),
    email: z.string().min(1, '이메일을 입력해주세요.').email('유효하지 않은 이메일입니다.'),
    password: z
      .string()
      .min(1, '비밀번호를 입력해주세요.')
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .max(30, '비밀번호는 최대 30자까지 입력 가능합니다.'),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
    companyName: z
      .string()
      .min(1, '회사명을 입력해주세요.')
      .max(30, '회사명은 최대 30자까지 입력 가능합니다.'),
    businessNumber: z
      .string()
      .min(1, '사업자 번호를 입력해주세요.')
      .regex(/^\d{3}-\d{2}-\d{5}$/, '유효하지 않은 사업자 번호입니다. (예: 123-45-67890)'),
  })
  .refine(
    (data) => {
      const hasLetter = /[A-Za-z]/.test(data.password);
      const hasNumber = /[0-9]/.test(data.password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(data.password);
      return hasLetter && hasNumber && hasSpecialChar;
    },
    {
      message: '유효하지 않은 비밀번호입니다.',
      path: ['password'],
    }
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type SignupInput = z.infer<typeof signupSchema>;

// 초대 회원가입 요청 스키마 (이메일은 백엔드에서 제공, 비밀번호만 입력)
export const inviteSignupSchema = z
  .object({
    email: z.string().min(1, '이메일을 입력해주세요.').email('유효하지 않은 이메일입니다.'),
    password: z
      .string()
      .min(1, '비밀번호를 입력해주세요.')
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .max(30, '비밀번호는 최대 30자까지 입력 가능합니다.'),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine(
    (data) => {
      const hasLetter = /[A-Za-z]/.test(data.password);
      const hasNumber = /[0-9]/.test(data.password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(data.password);
      return hasLetter && hasNumber && hasSpecialChar;
    },
    {
      message: '유효하지 않은 비밀번호입니다.',
      path: ['password'],
    }
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type InviteSignupInput = z.infer<typeof inviteSignupSchema>;
