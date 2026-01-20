import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import FormMessage from '../FormMessage';

describe('FormMessage', () => {
  describe('렌더링', () => {
    it('children을 렌더링한다', () => {
      render(<FormMessage>에러 메시지입니다</FormMessage>);
      expect(screen.getByText('에러 메시지입니다')).toBeInTheDocument();
    });

    it('p 요소로 렌더링된다', () => {
      render(<FormMessage>메시지</FormMessage>);
      const element = screen.getByText('메시지');
      expect(element.tagName).toBe('P');
    });

    it('빈 children도 렌더링된다', () => {
      const { container } = render(<FormMessage />);
      expect(container.querySelector('p')).toBeInTheDocument();
    });
  });

  describe('스타일', () => {
    it('기본 클래스가 적용된다', () => {
      render(<FormMessage>메시지</FormMessage>);
      const element = screen.getByText('메시지');
      expect(element).toHaveClass('flex-1');
      expect(element).toHaveClass('text-14');
    });

    it('커스텀 className을 적용한다', () => {
      render(<FormMessage className="custom-class">메시지</FormMessage>);
      expect(screen.getByText('메시지')).toHaveClass('custom-class');
    });

    it('에러 색상 스타일이 적용된다', () => {
      render(<FormMessage>에러</FormMessage>);
      const element = screen.getByText('에러');
      // inline style로 color가 적용됨
      expect(element).toHaveStyle({
        color: 'var(--Status-error-500, var(--error, #F31D1D))',
      });
    });
  });

  describe('ref', () => {
    it('ref를 전달할 수 있다', () => {
      const ref = createRef<HTMLParagraphElement>();
      render(<FormMessage ref={ref}>메시지</FormMessage>);

      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });

    it('ref로 텍스트 내용에 접근할 수 있다', () => {
      const ref = createRef<HTMLParagraphElement>();
      render(<FormMessage ref={ref}>에러 내용</FormMessage>);

      expect(ref.current?.textContent).toBe('에러 내용');
    });
  });

  describe('HTML 속성', () => {
    it('id를 적용한다', () => {
      render(<FormMessage id="error-msg">에러</FormMessage>);
      expect(screen.getByText('에러')).toHaveAttribute('id', 'error-msg');
    });

    it('role을 적용한다', () => {
      render(<FormMessage role="alert">에러</FormMessage>);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('aria-live를 적용한다', () => {
      render(<FormMessage aria-live="polite">메시지</FormMessage>);
      expect(screen.getByText('메시지')).toHaveAttribute('aria-live', 'polite');
    });

    it('data-* 속성을 적용한다', () => {
      render(<FormMessage data-testid="form-error">에러</FormMessage>);
      expect(screen.getByTestId('form-error')).toBeInTheDocument();
    });
  });

  describe('다양한 children', () => {
    it('문자열 children을 렌더링한다', () => {
      render(<FormMessage>단순 텍스트</FormMessage>);
      expect(screen.getByText('단순 텍스트')).toBeInTheDocument();
    });

    it('JSX children을 렌더링한다', () => {
      render(
        <FormMessage>
          <span data-testid="inner">내부 요소</span>
        </FormMessage>
      );
      expect(screen.getByTestId('inner')).toBeInTheDocument();
    });

    it('여러 children을 렌더링한다', () => {
      render(
        <FormMessage>
          <span>첫 번째</span>
          <span>두 번째</span>
        </FormMessage>
      );
      expect(screen.getByText('첫 번째')).toBeInTheDocument();
      expect(screen.getByText('두 번째')).toBeInTheDocument();
    });
  });

  describe('접근성', () => {
    it('role="alert"로 에러 메시지 역할을 할 수 있다', () => {
      render(<FormMessage role="alert">필수 항목입니다</FormMessage>);
      expect(screen.getByRole('alert')).toHaveTextContent('필수 항목입니다');
    });

    it('aria-describedby로 연결할 수 있다', () => {
      render(
        <>
          <input aria-describedby="error-message" />
          <FormMessage id="error-message">에러 설명</FormMessage>
        </>
      );

      const input = screen.getByRole('textbox');
      const message = screen.getByText('에러 설명');

      expect(input).toHaveAttribute('aria-describedby', 'error-message');
      expect(message).toHaveAttribute('id', 'error-message');
    });
  });

  describe('displayName', () => {
    it('displayName이 FormMessage이다', () => {
      expect(FormMessage.displayName).toBe('FormMessage');
    });
  });
});
