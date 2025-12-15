// 회원가입 폼 필드 이름
export type SignupFieldName =
  | 'name'
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'companyName'
  | 'businessNumber';

// 로그인 폼 필드 이름
export type LoginFieldName = 'email' | 'password';

// 초대 회원가입 폼 필드 이름
export type InviteSignupFieldName = 'email' | 'password' | 'confirmPassword';

// 공통 필드 설정 타입
export interface FormFieldConfig<Name extends string = string> {
  name: Name;
  label: string;
  placeholder: string;
  type?: 'text' | 'email' | 'password';
  disabled?: boolean; // 읽기 전용 필드용
}

// 회원가입 폼 필드 설정
export const signupFields: FormFieldConfig<SignupFieldName>[] = [
  {
    name: 'name',
    label: '이름',
    placeholder: '이름을 입력해주세요',
    type: 'text',
  },
  {
    name: 'email',
    label: '이메일',
    placeholder: 'example@company.com',
    type: 'email',
  },
  {
    name: 'password',
    label: '비밀번호',
    placeholder: '비밀번호를 입력해 주세요',
    type: 'password',
  },
  {
    name: 'confirmPassword',
    label: '비밀번호 확인',
    placeholder: '비밀번호를 다시 입력해 주세요',
    type: 'password',
  },
  {
    name: 'companyName',
    label: '회사명',
    placeholder: '회사명을 입력해주세요',
    type: 'text',
  },
  {
    name: 'businessNumber',
    label: '사업자 번호',
    placeholder: '123-45-67890',
    type: 'text',
  },
];

// 로그인 폼 필드 설정
export const loginFields: FormFieldConfig<LoginFieldName>[] = [
  {
    name: 'email',
    label: '이메일',
    placeholder: 'example@company.com',
    type: 'email',
  },
  {
    name: 'password',
    label: '비밀번호',
    placeholder: '비밀번호를 입력해 주세요',
    type: 'password',
  },
];

// 초대 회원가입 폼 필드 설정
export const inviteSignupFields: FormFieldConfig<InviteSignupFieldName>[] = [
  {
    name: 'email',
    label: '이메일',
    placeholder: 'example@company.com',
    type: 'email',
    disabled: true,
  },
  {
    name: 'password',
    label: '비밀번호',
    placeholder: '비밀번호를 입력해 주세요',
    type: 'password',
  },
  {
    name: 'confirmPassword',
    label: '비밀번호 확인',
    placeholder: '비밀번호를 다시 입력해 주세요',
    type: 'password',
  },
];
