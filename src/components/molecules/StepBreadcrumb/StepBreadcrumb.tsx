'use client';

import { Fragment } from 'react';
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

const StepBreadcrumb = ({ steps, currentStep, className }: StepBreadcrumbProps) => {
  if (!steps || steps.length === 0) return null;

  const safeCurrent = Math.min(Math.max(currentStep, 1), steps.length);

  return (
    <nav
      aria-label="Checkout steps"
      className={clsx(
        'flex flex-col gap-4',
        'tablet:flex-row tablet:items-center tablet:gap-20',
        className
      )}
    >
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === safeCurrent;

        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={index}>
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
              <span className="tabular-nums pr-4 tablet:pr-6">{stepNumber}.</span>
              <span>{step.label}</span>
            </span>
          </Fragment>
        );
      })}
    </nav>
  );
};

export default StepBreadcrumb;
