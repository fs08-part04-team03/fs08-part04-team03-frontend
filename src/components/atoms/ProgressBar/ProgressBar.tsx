import React from 'react';
import { clsx } from '@/utils/clsx';

export interface ProgressBarProps {
  value: number; // 0~100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => (
  <div className="flex items-center justify-between w-345 h-17">
    {/* Progress track */}
    <div className="relative w-304 h-6 rounded-6 bg-gray-200 overflow-hidden">
      <div
        className={clsx('h-full bg-secondary-500 rounded-6 transition-all duration-500')}
        style={{ width: `${value}%` }}
      />
    </div>

    {/* Percentage */}
    <span className="text-gray-950 text-14 font-normal tracking--0.4 leading-none">{value}%</span>
  </div>
);

export default ProgressBar;
