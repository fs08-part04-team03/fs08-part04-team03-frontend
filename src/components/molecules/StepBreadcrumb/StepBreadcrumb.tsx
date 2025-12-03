'use client';

import React from 'react';
import { clsx } from '@/utils/clsx';

export interface StepBreadcrumbStep {
  label: string;
}

export interface StepBreadcrumbProps {
  steps: StepBreadcrumbStep[];
  /** 1-based index */
  currentStep: number;
  className?: string;
}

const StepBreadcrumb: React.FC<StepBreadcrumbProps> = ({ steps, currentStep, className }) => {
  if (!steps || steps.length === 0) return null;

  const safeCurrent = Math.min(Math.max(currentStep, 1), steps.length);

  return (
    <nav
      aria-label="Checkout steps"
      className={clsx(
        // 모바일: 세로, tablet 이상: 가로
        'flex flex-col gap-4',
        'tablet:flex-row tablet:items-center tablet:gap-20',
        className
      )}
    >
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === safeCurrent;

        return (
          <React.Fragment key={step.label}>
            {/* tablet 이상에서만 보이는 > 구분자 */}
            {index > 0 && <span className="hidden tablet:inline text-gray-300">&gt;</span>}

            <span
              className={clsx(
                'flex justify-center items-center gap-4',
                'text-16 leading-24 tracking--0.4',
                'tablet:text-18 tablet:leading-26 tablet:tracking--0.45',
                isActive ? 'text-gray-950 font-bold' : 'text-gray-300'
              )}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="tabular-nums">{stepNumber}.</span>
              <span>{step.label}</span>
            </span>
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default StepBreadcrumb;
