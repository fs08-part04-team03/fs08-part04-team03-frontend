import type { Meta, StoryObj } from '@storybook/nextjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signupSchema, type SignupInput } from '@/features/auth/schemas/signup.schema';
import SignupTem, { SignupTemMobile, SignupTemDesktop } from './SignupTem';

const meta = {
  title: 'Features/Auth/Template/SignupTem',
  component: SignupTem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/signup',
      },
    },
    docs: {
      description: {
        component:
          '회원가입 템플릿 컴포넌트입니다. UI만 담당하며, React Hook Form의 control과 handleSubmit을 props로 받습니다. 이름, 이메일, 비밀번호, 비밀번호 확인, 회사명, 사업자 번호를 입력받아 회원가입을 처리합니다.',
      },
    },
  },
} satisfies Meta<typeof SignupTem>;

export default meta;

type Story = StoryObj<typeof SignupTem>;

// 기본 스토리
export const Default: Story = {
  render: () => {
    const Wrapper = () => {
      const { control, handleSubmit, formState } = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
        mode: 'onTouched',
        defaultValues: {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          companyName: '',
          businessNumber: '',
        },
      });

      const onSubmit = (values: SignupInput) => {
        // eslint-disable-next-line no-console
        console.log('Form submitted:', values);
      };

      return (
        <SignupTem
          control={control}
          isValid={formState.isValid}
          serverError={null}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        />
      );
    };

    return <Wrapper />;
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 회원가입 템플릿입니다. 이름, 이메일, 비밀번호, 비밀번호 확인, 회사명, 사업자 번호를 입력받습니다.',
      },
    },
  },
};

// 서버 에러가 있는 경우
export const WithServerError: Story = {
  render: () => {
    const Wrapper = () => {
      const { control, handleSubmit, formState } = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
        mode: 'onTouched',
        defaultValues: {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          companyName: '',
          businessNumber: '',
        },
      });

      const onSubmit = (values: SignupInput) => {
        // eslint-disable-next-line no-console
        console.log('Form submitted:', values);
      };

      return (
        <SignupTem
          control={control}
          isValid={formState.isValid}
          serverError="회원가입에 실패했습니다. 다시 시도해 주세요."
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        />
      );
    };

    return <Wrapper />;
  },
  parameters: {
    docs: {
      description: {
        story: '서버 에러 메시지가 표시되는 경우입니다.',
      },
    },
  },
};

// 모바일 버전
export const Mobile: Story = {
  render: () => {
    const Wrapper = () => {
      const { control, handleSubmit, formState } = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
        mode: 'onTouched',
        defaultValues: {
          name: '홍길동',
          email: 'hong@example.com',
          password: '',
          confirmPassword: '',
          companyName: '',
          businessNumber: '',
        },
      });

      const onSubmit = (values: SignupInput) => {
        // eslint-disable-next-line no-console
        console.log('Form submitted:', values);
      };

      return (
        <SignupTemMobile
          control={control}
          isValid={formState.isValid}
          serverError={null}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        />
      );
    };

    return <Wrapper />;
  },
  parameters: {
    docs: {
      description: {
        story: '모바일 화면 크기에 맞춘 회원가입 템플릿입니다. Logo가 포함되어 있습니다.',
      },
    },
  },
};

// 데스크톱 버전
export const Desktop: Story = {
  render: () => {
    const Wrapper = () => {
      const { control, handleSubmit, formState } = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
        mode: 'onTouched',
        defaultValues: {
          name: '홍길동',
          email: 'hong@example.com',
          password: '',
          confirmPassword: '',
          companyName: '',
          businessNumber: '',
        },
      });

      const onSubmit = (values: SignupInput) => {
        // eslint-disable-next-line no-console
        console.log('Form submitted:', values);
      };

      return (
        <SignupTemDesktop
          control={control}
          isValid={formState.isValid}
          serverError={null}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        />
      );
    };

    return <Wrapper />;
  },
  parameters: {
    docs: {
      description: {
        story: '데스크톱 화면 크기에 맞춘 회원가입 템플릿입니다.',
      },
    },
  },
};

// 커스텀 텍스트
export const CustomText: Story = {
  render: () => {
    const Wrapper = () => {
      const { control, handleSubmit, formState } = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
        mode: 'onTouched',
        defaultValues: {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          companyName: '',
          businessNumber: '',
        },
      });

      const onSubmit = (values: SignupInput) => {
        // eslint-disable-next-line no-console
        console.log('Form submitted:', values);
      };

      return (
        <SignupTem
          control={control}
          isValid={formState.isValid}
          serverError={null}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          title="기업 담당자 회원가입"
          subtitle="회사 정보를 입력하여 계정을 생성해주세요"
          submitButtonText="가입하기"
        />
      );
    };

    return <Wrapper />;
  },
  parameters: {
    docs: {
      description: {
        story: '커스텀 제목, 부제목, 버튼 텍스트를 사용하는 경우입니다.',
      },
    },
  },
};

// 유효하지 않은 폼 상태
export const InvalidForm: Story = {
  render: () => {
    const Wrapper = () => {
      const { control, handleSubmit, formState } = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
        mode: 'onTouched',
        defaultValues: {
          name: '',
          email: 'invalid-email', // 유효하지 않은 이메일
          password: '123', // 유효하지 않은 비밀번호
          confirmPassword: '456', // 일치하지 않는 비밀번호
          companyName: '',
          businessNumber: '123', // 유효하지 않은 사업자 번호
        },
      });

      const onSubmit = (values: SignupInput) => {
        // eslint-disable-next-line no-console
        console.log('Form submitted:', values);
      };

      return (
        <SignupTem
          control={control}
          isValid={formState.isValid}
          serverError={null}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        />
      );
    };

    return <Wrapper />;
  },
  parameters: {
    docs: {
      description: {
        story: '유효하지 않은 입력값이 있는 경우입니다. 버튼이 비활성화됩니다.',
      },
    },
  },
};
