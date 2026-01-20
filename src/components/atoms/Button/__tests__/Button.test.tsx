import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button, { SignupButton } from '../Button';

describe('Button', () => {
  describe('렌더링', () => {
    it('children을 렌더링한다', () => {
      render(<Button>클릭</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('클릭');
    });

    it('기본 type은 button이다', () => {
      render(<Button>버튼</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('submit type을 지원한다', () => {
      render(<Button type="submit">제출</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('reset type을 지원한다', () => {
      render(<Button type="reset">초기화</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
    });

    it('커스텀 className을 적용한다', () => {
      render(<Button className="custom-class">버튼</Button>);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
  });

  describe('variant', () => {
    it('primary variant가 기본이다', () => {
      render(<Button>Primary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-gray-950');
      expect(button).toHaveClass('text-gray-50');
    });

    it('secondary variant를 적용한다', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-white');
      expect(button).toHaveClass('border-gray-900');
    });

    it('signup variant를 적용한다', () => {
      render(<Button variant="signup">Signup</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-black');
      expect(button).toHaveClass('text-white');
    });
  });

  describe('size', () => {
    it('sm 사이즈를 적용한다', () => {
      render(<Button size="sm">Small</Button>);
      expect(screen.getByRole('button')).toHaveClass('h-40');
    });

    it('md 사이즈가 기본이다', () => {
      render(<Button>Medium</Button>);
      expect(screen.getByRole('button')).toHaveClass('h-44');
    });

    it('lg 사이즈를 적용한다', () => {
      render(<Button size="lg">Large</Button>);
      expect(screen.getByRole('button')).toHaveClass('h-64');
    });

    it('signup variant는 size를 무시한다', () => {
      render(
        <Button variant="signup" size="lg">
          Signup
        </Button>
      );
      const button = screen.getByRole('button');
      // signup은 고정 사이즈
      expect(button).toHaveClass('h-44');
      expect(button).not.toHaveClass('h-64');
    });
  });

  describe('inactive 상태', () => {
    it('inactive 상태에서 disabled 된다', () => {
      render(<Button inactive>비활성</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('inactive 상태에서 비활성 스타일을 적용한다', () => {
      render(<Button inactive>비활성</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-gray-100');
      expect(button).toHaveClass('text-gray-300');
      expect(button).toHaveClass('cursor-not-allowed');
    });

    it('inactive가 false이면 활성 상태이다', () => {
      render(<Button inactive={false}>활성</Button>);
      expect(screen.getByRole('button')).not.toBeDisabled();
    });
  });

  describe('fullWidth', () => {
    it('fullWidth를 적용한다', () => {
      render(<Button fullWidth>Full Width</Button>);
      expect(screen.getByRole('button')).toHaveClass('w-full');
    });

    it('기본값은 fullWidth가 아니다', () => {
      render(<Button>Normal</Button>);
      expect(screen.getByRole('button')).not.toHaveClass('w-full');
    });
  });

  describe('rightIcon', () => {
    it('rightIcon을 렌더링한다', () => {
      render(<Button rightIcon={<span data-testid="icon">→</span>}>다음</Button>);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toHaveTextContent('→');
    });

    it('rightIcon 없이도 정상 동작한다', () => {
      render(<Button>버튼</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('이벤트', () => {
    it('onClick이 호출된다', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>클릭</Button>);

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('inactive 상태에서 onClick이 호출되지 않는다', () => {
      const handleClick = vi.fn();
      render(
        <Button inactive onClick={handleClick}>
          클릭
        </Button>
      );

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('onFocus가 호출된다', () => {
      const handleFocus = vi.fn();
      render(<Button onFocus={handleFocus}>버튼</Button>);

      fireEvent.focus(screen.getByRole('button'));
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('onBlur가 호출된다', () => {
      const handleBlur = vi.fn();
      render(<Button onBlur={handleBlur}>버튼</Button>);

      const button = screen.getByRole('button');
      fireEvent.focus(button);
      fireEvent.blur(button);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('접근성', () => {
    it('aria-label을 적용한다', () => {
      render(<Button aria-label="닫기 버튼">X</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', '닫기 버튼');
    });

    it('id를 적용한다', () => {
      render(<Button id="submit-btn">제출</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('id', 'submit-btn');
    });
  });
});

describe('SignupButton', () => {
  it('signup variant로 렌더링된다', () => {
    render(<SignupButton aria-label="가입">가입</SignupButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-black');
    expect(button).toHaveClass('rounded-100');
  });

  it('children을 렌더링한다', () => {
    render(<SignupButton aria-label="가입하기">회원가입</SignupButton>);
    expect(screen.getByRole('button')).toHaveTextContent('회원가입');
  });

  it('inactive 상태를 지원한다', () => {
    render(
      <SignupButton inactive aria-label="가입 비활성">
        가입
      </SignupButton>
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('onClick이 호출된다', () => {
    const handleClick = vi.fn();
    render(
      <SignupButton onClick={handleClick} aria-label="가입">
        가입
      </SignupButton>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('rightIcon을 렌더링한다', () => {
    render(
      <SignupButton rightIcon={<span data-testid="plus">+</span>} aria-label="추가">
        추가
      </SignupButton>
    );
    expect(screen.getByTestId('plus')).toBeInTheDocument();
  });

  it('fullWidth를 적용한다', () => {
    render(
      <SignupButton fullWidth aria-label="가입">
        가입
      </SignupButton>
    );
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  it('type을 지정할 수 있다', () => {
    render(
      <SignupButton type="submit" aria-label="가입">
        가입
      </SignupButton>
    );
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('aria-label을 적용한다', () => {
    render(<SignupButton aria-label="회원 가입">가입</SignupButton>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', '회원 가입');
  });
});
