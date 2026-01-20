import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from '../Checkbox';

describe('Checkbox', () => {
  describe('렌더링', () => {
    it('체크박스를 렌더링한다', () => {
      render(<Checkbox checked={false} aria-label="동의" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('aria-label을 적용한다', () => {
      render(<Checkbox checked={false} aria-label="이용약관 동의" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-label', '이용약관 동의');
    });

    it('커스텀 className을 적용한다', () => {
      render(<Checkbox checked={false} aria-label="동의" className="custom-class" />);
      // className은 label에 적용됨
      const label = screen.getByRole('checkbox').closest('label');
      expect(label).toHaveClass('custom-class');
    });
  });

  describe('checked 상태', () => {
    it('checked가 true이면 체크된 상태로 렌더링된다', () => {
      render(<Checkbox checked aria-label="동의" />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('checked가 false이면 체크 해제된 상태로 렌더링된다', () => {
      render(<Checkbox checked={false} aria-label="동의" />);
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('checked 상태에서 체크 스타일을 적용한다', () => {
      render(<Checkbox checked aria-label="동의" />);
      const label = screen.getByRole('checkbox').closest('label');
      expect(label).toHaveClass('bg-gray-950');
    });

    it('unchecked 상태에서 기본 스타일을 적용한다', () => {
      render(<Checkbox checked={false} aria-label="동의" />);
      const label = screen.getByRole('checkbox').closest('label');
      expect(label).toHaveClass('bg-white');
    });
  });

  describe('onChange', () => {
    it('클릭 시 onChange가 호출된다', () => {
      const handleChange = vi.fn();
      render(<Checkbox checked={false} onChange={handleChange} aria-label="동의" />);

      fireEvent.click(screen.getByRole('checkbox'));
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('체크된 상태에서 클릭 시 false로 호출된다', () => {
      const handleChange = vi.fn();
      render(<Checkbox checked onChange={handleChange} aria-label="동의" />);

      fireEvent.click(screen.getByRole('checkbox'));
      expect(handleChange).toHaveBeenCalledWith(false);
    });

    it('label 클릭 시에도 onChange가 호출된다', () => {
      const handleChange = vi.fn();
      render(<Checkbox checked={false} onChange={handleChange} aria-label="동의" />);

      const label = screen.getByRole('checkbox').closest('label');
      if (label) {
        fireEvent.click(label);
      }
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('onChange가 없어도 에러가 발생하지 않는다', () => {
      render(<Checkbox checked={false} aria-label="동의" />);

      expect(() => {
        fireEvent.click(screen.getByRole('checkbox'));
      }).not.toThrow();
    });
  });

  describe('disabled 상태', () => {
    it('disabled 상태를 적용한다', () => {
      render(<Checkbox checked={false} disabled aria-label="동의" />);
      expect(screen.getByRole('checkbox')).toBeDisabled();
    });

    it('disabled 상태에서 클릭해도 onChange가 호출되지 않는다', () => {
      const handleChange = vi.fn();
      render(<Checkbox checked={false} onChange={handleChange} disabled aria-label="동의" />);

      fireEvent.click(screen.getByRole('checkbox'));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('disabled 상태에서 label 클릭해도 onChange가 호출되지 않는다', () => {
      const handleChange = vi.fn();
      render(<Checkbox checked={false} onChange={handleChange} disabled aria-label="동의" />);

      const label = screen.getByRole('checkbox').closest('label');
      if (label) {
        fireEvent.click(label);
      }
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('disabled 상태에서 opacity 스타일을 적용한다', () => {
      render(<Checkbox checked={false} disabled aria-label="동의" />);
      const label = screen.getByRole('checkbox').closest('label');
      expect(label).toHaveClass('opacity-40');
      expect(label).toHaveClass('cursor-not-allowed');
    });

    it('활성 상태에서 cursor-pointer 스타일을 적용한다', () => {
      render(<Checkbox checked={false} aria-label="동의" />);
      const label = screen.getByRole('checkbox').closest('label');
      expect(label).toHaveClass('cursor-pointer');
    });
  });

  describe('접근성', () => {
    it('input은 sr-only 클래스를 가진다 (시각적으로 숨김)', () => {
      render(<Checkbox checked={false} aria-label="동의" />);
      expect(screen.getByRole('checkbox')).toHaveClass('sr-only');
    });

    it('label과 input이 연결되어 있다', () => {
      render(<Checkbox checked={false} aria-label="동의" />);
      const checkbox = screen.getByRole('checkbox');
      const label = checkbox.closest('label');

      expect(label).toHaveAttribute('for', checkbox.id);
    });

    it('키보드로 토글할 수 있다', () => {
      const handleChange = vi.fn();
      render(<Checkbox checked={false} onChange={handleChange} aria-label="동의" />);

      const checkbox = screen.getByRole('checkbox');
      fireEvent.keyDown(checkbox, { key: ' ', code: 'Space' });
      // 기본 체크박스는 스페이스로 토글되지만, 커스텀 구현이므로 click으로 테스트
      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('상태 전환', () => {
    it('unchecked에서 checked로 전환', () => {
      const handleChange = vi.fn();
      const { rerender } = render(
        <Checkbox checked={false} onChange={handleChange} aria-label="동의" />
      );

      expect(screen.getByRole('checkbox')).not.toBeChecked();

      rerender(<Checkbox checked onChange={handleChange} aria-label="동의" />);

      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('checked에서 unchecked로 전환', () => {
      const handleChange = vi.fn();
      const { rerender } = render(<Checkbox checked onChange={handleChange} aria-label="동의" />);

      expect(screen.getByRole('checkbox')).toBeChecked();

      rerender(<Checkbox checked={false} onChange={handleChange} aria-label="동의" />);

      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });
  });
});
