import React from 'react';
import { clsx } from '@/utils/clsx';
import { formatDate } from '@/utils/formatDate';

interface DateTextProps {
  date: string | Date;
  className?: string;
}

const DateText: React.FC<DateTextProps> = ({ date, className }) => {
  const formattedDate = formatDate(date);

  return <span className={clsx('text-gray-950', className)}>{formattedDate}</span>;
};

export default DateText;
