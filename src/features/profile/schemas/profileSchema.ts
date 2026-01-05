import { z } from 'zod';

export const profileEditSchema = z
  .object({
    companyName: z.string().min(1, '기업명을 입력해주세요.'),
    role: z.string().min(1, '권한 정보가 필요합니다.'),
    name: z.string().min(1, '이름을 입력해주세요.'),
    email: z.string().email(),
    password: z
      .string()
      .optional()
      .or(z.literal(''))
      .refine(
        (val) => {
          // 비밀번호가 입력된 경우에만 길이 검증
          if (!val || val === '') return true;
          return val.length >= 8;
        },
        { message: '비밀번호는 최소 8자 이상이어야 합니다.' }
      ),
    passwordConfirm: z.string().optional().or(z.literal('')),
  })
  .refine((data) => !data.password || data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type ProfileEditInput = z.infer<typeof profileEditSchema>;
