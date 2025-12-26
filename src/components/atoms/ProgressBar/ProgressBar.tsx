'use client';

import { clsx } from '@/utils/clsx';

export interface ProgressBarProps {
  value: number; // 0~100
  currentBudget: number; // 이번 달 남은 예산
  lastBudget: number; // 지난 달 남은 예산
  className?: string; // 컨테이너 width를 조절하기 위한 className
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  currentBudget,
  lastBudget,
  className,
}) => {
  const clampedValue = Math.max(0, Math.min(100, value));
  const diff = currentBudget - lastBudget; // 양수면 "덜 사용", 음수면 "더 사용"

  // 중첩 삼항 연산 제거
  let diffText = '';
  if (diff > 0) diffText = ' 덜 사용했어요';
  else if (diff < 0) diffText = ' 더 사용했어요';
  else diffText = ' 동일하게 사용했어요';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // 추가로 필요하면 여기에 키보드 동작 처리 가능
    }
  };

  // 기본 width 클래스
  const defaultContainerWidth = 'w-345 desktop:w-345 tablet:w-179 mobile:w-116';
  const defaultTrackWidth = 'w-304 desktop:w-304 tablet:w-179 mobile:w-116';

  // className이 제공되면 기본 width를 override
  const containerWidthClass = className || defaultContainerWidth;
  // track width는 container width에 비례하여 계산 (약 88% 정도)
  // className이 제공되면 track도 full width로 설정하거나, 기본 비율 유지
  const trackWidthClass = className ? 'w-full' : defaultTrackWidth;
  // 최상위 컨테이너 width: className이 있으면 적용, 없으면 w-fit
  const wrapperWidthClass = className || 'w-fit';

  return (
    <div
      className={clsx('relative group', wrapperWidthClass)}
      tabIndex={0}
      role="button"
      onKeyDown={handleKeyDown}
    >
      {/* ProgressBar 본체 */}
      <div
        className={clsx(
          'flex items-center justify-between h-17 tablet:h-17 mobile:h-15',
          containerWidthClass
        )}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="진행률"
      >
        {/* Progress track */}
        <div
          className={clsx('relative h-6 rounded-6 bg-gray-200 overflow-hidden', trackWidthClass)}
        >
          <div
            className={clsx('h-full bg-secondary-500 rounded-6 transition-all duration-500')}
            style={{ width: `${clampedValue}%` }}
          />
        </div>

        {/* Percentage */}
        <span
          className={clsx(
            'text-gray-950 leading-none',
            'desktop:text-14 tablet:text-14 mobile:text-12',
            'desktop:font-normal tablet:font-normal mobile:font-normal',
            'desktop:tracking--0.35 tablet:tracking--0.35 mobile:tracking--0.3'
          )}
        >
          {clampedValue}%
        </span>
      </div>

      {/* Hover & Focus Tooltip Box */}
      <div
        className={clsx(
          'absolute left-0 mt-8',
          'hidden group-hover:flex group-focus-within:flex',
          'flex-col justify-center items-start text-center gap-8',
          'w-260 h-130 p-24 rounded-4 bg-gray-950',
          'text-white',
          'z-tooltip'
        )}
        role="tooltip"
      >
        {/* 1줄 */}
        <p className="text-14 font-extrabold tracking-tight">
          이번 달 남은 예산: {currentBudget.toLocaleString()}원
        </p>

        {/* 2줄 */}
        <p className="text-12 font-normal tracking--0.35">
          지난 달 남은 예산: {lastBudget.toLocaleString()}원
        </p>

        {/* 3줄 */}
        <p className="text-12 font-normal tracking--0.35">
          지난 달 보다 {Math.abs(diff).toLocaleString()}원{diffText}
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;
