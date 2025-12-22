import React from 'react';
import { clsx } from '@/utils/clsx';

interface DateTextProps {
  date: string | Date;
  className?: string;
}

const DateText: React.FC<DateTextProps> = ({ date, className }) => {
  const formatDate = (dateInput: string | Date): string => {
    const dateObj = dateInput instanceof Date ? dateInput : new Date(dateInput);

    if (Number.isNaN(dateObj.getTime())) {
      return '-';
    }

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  };

  const formattedDate = formatDate(date);

  return <span className={clsx('text-gray-950', className)}>{formattedDate}</span>;
};

export default DateText;
