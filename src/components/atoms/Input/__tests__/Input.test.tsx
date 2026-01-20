import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import Input from '../Input';

describe('Input', () => {
  describe('렌더링', () => {
    it('input 요소를 렌더링한다', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('기본 type은 text이다', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    it('placeholder를 표시한다', () => {
      render(<Input placeholder="이메일을 입력하세요" />);
      expect(screen.getByPlaceholderText('이메일을 입력하세요')).toBeInTheDocument();
    });

    it('커스텀 className을 적용한다', () => {
      render(<Input className="custom-input" />);
      expect(screen.getByRole('textbox')).toHaveClass('custom-input');
    });

    it('w-full 클래스가 기본으로 적용된다', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toHaveClass('w-full');
    });
  });

  describe('type', () => {
    it('email type을 지원한다', () => {
      render(<Input type="email" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    });

    it('password type을 지원한다', () => {
      render(<Input type="password" />);
      // password는 role이 없으므로 다른 방법으로 확인
      const input = document.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });

    it('number type을 지원한다', () => {
      render(<Input type="number" />);
      expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number');
    });

    it('tel type을 지원한다', () => {
      render(<Input type="tel" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel');
    });
  });

  describe('error 상태', () => {
    it('error 상태에서 에러 스타일을 적용한다', () => {
      render(<Input error />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-error-500');
    });

    it('기본 상태에서는 일반 스타일을 적용한다', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-gray-600');
      expect(input).not.toHaveClass('border-error-500');
    });

    it('error={false}일 때 일반 스타일을 적용한다', () => {
      render(<Input error={false} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-gray-600');
    });
  });

  describe('disabled 상태', () => {
    it('disabled 상태를 적용한다', () => {
      render(<Input disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('disabled 상태에서 입력이 불가능하다', () => {
      render(<Input disabled defaultValue="" />);
      const input = screen.getByRole('textbox');

      // disabled 상태에서는 실제 브라우저에서 입력이 차단됨
      // Testing Library에서는 disabled 속성 확인으로 검증
      expect(input).toBeDisabled();
      expect(input).toHaveAttribute('disabled');
    });
  });

  describe('값 입력', () => {
    it('값을 입력할 수 있다', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');

      fireEvent.change(input, { target: { value: 'test@example.com' } });
      expect(input).toHaveValue('test@example.com');
    });

    it('value prop을 전달할 수 있다', () => {
      render(<Input value="초기값" onChange={() => {}} />);
      expect(screen.getByRole('textbox')).toHaveValue('초기값');
    });

    it('defaultValue를 전달할 수 있다', () => {
      render(<Input defaultValue="기본값" />);
      expect(screen.getByRole('textbox')).toHaveValue('기본값');
    });
  });

  describe('이벤트', () => {
    it('onChange가 호출된다', () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'test' },
      });

      expect(handleChange).toHaveBeenCalled();
    });

    it('onFocus가 호출된다', () => {
      const handleFocus = vi.fn();
      render(<Input onFocus={handleFocus} />);

      fireEvent.focus(screen.getByRole('textbox'));
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('onBlur가 호출된다', () => {
      const handleBlur = vi.fn();
      render(<Input onBlur={handleBlur} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.blur(input);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('onKeyDown이 호출된다', () => {
      const handleKeyDown = vi.fn();
      render(<Input onKeyDown={handleKeyDown} />);

      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe('ref', () => {
    it('ref를 전달할 수 있다', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('ref로 focus를 호출할 수 있다', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} />);

      ref.current?.focus();
      expect(document.activeElement).toBe(ref.current);
    });

    it('ref로 value에 접근할 수 있다', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} defaultValue="테스트" />);

      expect(ref.current?.value).toBe('테스트');
    });
  });

  describe('접근성', () => {
    it('aria-label을 적용한다', () => {
      render(<Input aria-label="이메일 입력" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', '이메일 입력');
    });

    it('aria-describedby를 적용한다', () => {
      render(<Input aria-describedby="email-error" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'email-error');
    });

    it('aria-invalid를 적용한다', () => {
      render(<Input aria-invalid="true" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('id를 적용한다', () => {
      render(<Input id="email-input" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'email-input');
    });

    it('name을 적용한다', () => {
      render(<Input name="email" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('name', 'email');
    });
  });

  describe('기타 속성', () => {
    it('maxLength를 적용한다', () => {
      render(<Input maxLength={10} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '10');
    });

    it('minLength를 적용한다', () => {
      render(<Input minLength={5} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('minLength', '5');
    });

    it('required를 적용한다', () => {
      render(<Input required />);
      expect(screen.getByRole('textbox')).toBeRequired();
    });

    it('readOnly를 적용한다', () => {
      render(<Input readOnly value="읽기 전용" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    });

    it('autoComplete를 적용한다', () => {
      render(<Input autoComplete="email" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'email');
    });
  });
});
