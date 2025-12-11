import type { Meta, StoryObj } from '@storybook/nextjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Button from '@/components/atoms/Button/Button';

import RHFInputField from './RHFInputField';

const meta: Meta<typeof RHFInputField> = {
  title: 'Molecules/RHFInputField',
  component: RHFInputField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'React Hook Form과 Zod를 사용하는 InputField 래퍼 컴포넌트입니다. InputField를 React Hook Form의 Controller로 감싸서 validation과 에러 처리를 자동화합니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// 1) 이름 필드
export const NameField: Story = {
  render: () => {
    const Wrapper = () => {
      const schema = z.object({
        name: z.string().min(1, '이름을 입력해주세요.'),
      });

      type FormData = z.infer<typeof schema>;

      const { control } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
          name: '',
        },
      });

      return (
        <RHFInputField
          control={control}
          name="name"
          label="이름 (기업 담당자)"
          placeholder="이름을 입력해주세요."
          type="text"
        />
      );
    };
    return <Wrapper />;
  },
  parameters: {
    docs: {
      description: {
        story: '기본 텍스트 입력 필드입니다. 이름을 입력받습니다.',
      },
    },
  },
};

// 2) 이메일 필드
export const EmailField: Story = {
  render: () => {
    const Wrapper = () => {
      const schema = z.object({
        email: z.string().email('유효한 이메일을 입력해주세요.'),
      });

      type FormData = z.infer<typeof schema>;

      const { control } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
          email: '',
        },
      });

      return (
        <RHFInputField
          control={control}
          name="email"
          label="이메일"
          placeholder="이메일을 입력해주세요."
          type="email"
        />
      );
    };
    return <Wrapper />;
  },
  parameters: {
    docs: {
      description: {
        story: '이메일 입력 필드입니다. Zod 스키마로 이메일 형식을 검증합니다.',
      },
    },
  },
};

// 3) 비밀번호 필드
export const PasswordField: Story = {
  render: () => {
    const Wrapper = () => {
      const schema = z.object({
        password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
      });

      type FormData = z.infer<typeof schema>;

      const { control } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
          password: '',
        },
      });

      return (
        <RHFInputField
          control={control}
          name="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          type="password"
          minLength={8}
        />
      );
    };
    return <Wrapper />;
  },
  parameters: {
    docs: {
      description: {
        story: '비밀번호 입력 필드입니다. 최소 8자 이상 입력해야 합니다.',
      },
    },
  },
};

// 4) 비밀번호 확인 필드
export const PasswordConfirmField: Story = {
  render: () => {
    const Wrapper = () => {
      const schema = z
        .object({
          password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
          passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
        })
        .refine((data) => data.password === data.passwordConfirm, {
          message: '비밀번호가 일치하지 않습니다.',
          path: ['passwordConfirm'],
        });

      type FormData = z.infer<typeof schema>;

      const { control, watch } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
          password: '',
          passwordConfirm: '',
        },
      });

      const password = watch('password');

      return (
        <div className="flex flex-col gap-20">
          <RHFInputField
            control={control}
            name="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            minLength={8}
          />
          <RHFInputField
            control={control}
            name="passwordConfirm"
            label="비밀번호 확인"
            placeholder="비밀번호를 한 번 더 입력해주세요."
            type="passwordConfirm"
            compareWith={password}
          />
        </div>
      );
    };
    return <Wrapper />;
  },
  parameters: {
    docs: {
      description: {
        story: '비밀번호와 비밀번호 확인 필드입니다. 두 비밀번호가 일치하는지 검증합니다.',
      },
    },
  },
};

// 5) 회사명 필드
export const CompanyField: Story = {
  render: () => {
    const Wrapper = () => {
      const schema = z.object({
        company: z.string().min(1, '회사명을 입력해주세요.'),
      });

      type FormData = z.infer<typeof schema>;

      const { control } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
          company: '',
        },
      });

      return (
        <RHFInputField
          control={control}
          name="company"
          label="회사명"
          placeholder="회사명을 입력해주세요."
          type="text"
        />
      );
    };
    return <Wrapper />;
  },
  parameters: {
    docs: {
      description: {
        story: '회사명 입력 필드입니다.',
      },
    },
  },
};

// 6) 사업자 번호 필드
export const BusinessNumberField: Story = {
  render: () => {
    const Wrapper = () => {
      const schema = z.object({
        businessNumber: z
          .string()
          .regex(/^\d{3}-\d{3}-\d{3}$/, '사업자 번호는 123-456-789 형식입니다.'),
      });

      type FormData = z.infer<typeof schema>;

      const { control } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
          businessNumber: '',
        },
      });

      return (
        <RHFInputField
          control={control}
          name="businessNumber"
          label="사업자 번호"
          placeholder="사업자 번호를 입력해주세요."
          type="businessNumber"
        />
      );
    };
    return <Wrapper />;
  },
  parameters: {
    docs: {
      description: {
        story: '사업자 번호 입력 필드입니다. 자동으로 123-456-789 형식으로 포맷됩니다.',
      },
    },
  },
};

// 7) 전체 폼 예시
export const FullForm: Story = {
  render: () => {
    const Wrapper = () => {
      const schema = z
        .object({
          name: z.string().min(1, '이름을 입력해주세요.'),
          email: z.string().email('유효한 이메일을 입력해주세요.'),
          password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
          passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
          company: z.string().min(1, '회사명을 입력해주세요.'),
          businessNumber: z
            .string()
            .regex(/^\d{3}-\d{3}-\d{3}$/, '사업자 번호는 123-456-789 형식입니다.'),
        })
        .refine((data) => data.password === data.passwordConfirm, {
          message: '비밀번호가 일치하지 않습니다.',
          path: ['passwordConfirm'],
        });

      type FormData = z.infer<typeof schema>;

      const { control, handleSubmit, watch } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
          name: '',
          email: '',
          password: '',
          passwordConfirm: '',
          company: '',
          businessNumber: '',
        },
      });

      const password = watch('password');

      const onSubmit = (data: FormData) => {
        // eslint-disable-next-line no-console
        console.log('Form submitted:', data);
      };

      return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-20 w-327">
          <RHFInputField
            control={control}
            name="name"
            label="이름 (기업 담당자)"
            placeholder="이름을 입력해주세요."
            type="text"
          />
          <RHFInputField
            control={control}
            name="email"
            label="이메일"
            placeholder="이메일을 입력해주세요."
            type="email"
          />
          <RHFInputField
            control={control}
            name="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            minLength={8}
          />
          <RHFInputField
            control={control}
            name="passwordConfirm"
            label="비밀번호 확인"
            placeholder="비밀번호를 한 번 더 입력해주세요."
            type="passwordConfirm"
            compareWith={password}
          />
          <RHFInputField
            control={control}
            name="company"
            label="회사명"
            placeholder="회사명을 입력해주세요."
            type="text"
          />
          <RHFInputField
            control={control}
            name="businessNumber"
            label="사업자 번호"
            placeholder="사업자 번호를 입력해주세요."
            type="businessNumber"
          />
          <Button type="submit" variant="primary" className="w-full">
            제출
          </Button>
        </form>
      );
    };
    return <Wrapper />;
  },
  parameters: {
    docs: {
      description: {
        story:
          '모든 필드를 포함한 전체 폼 예시입니다. React Hook Form과 Zod를 사용하여 validation을 처리합니다.',
      },
    },
  },
};
