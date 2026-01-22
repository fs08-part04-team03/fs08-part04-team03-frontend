'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import { formatNumberToKorean } from '@/features/admin/budget/utils/format';

// 예산 최댓값
const MAX_BUDGET = 1_500_000_000;
const MIN_BUDGET = 0;

// 예산 설정 폼
interface BudgetFormOrgProps {
  initialThisMonthBudget?: number;
  initialMonthlyStartBudget?: number;
  onSubmit?: (values: {
    thisMonthBudget: number;
    monthlyStartBudget: number;
  }) => void | Promise<void>;
}

const BudgetFormOrg = ({
  initialThisMonthBudget = 0,
  initialMonthlyStartBudget = 0,
  onSubmit,
}: BudgetFormOrgProps) => {
  const [thisMonthBudget, setThisMonthBudget] = useState<string>('');
  const [monthlyStartBudget, setMonthlyStartBudget] = useState<string>('');
  const [thisMonthError, setThisMonthError] = useState<string>('');
  const [monthlyStartError, setMonthlyStartError] = useState<string>('');

  // 초기값 설정
  useEffect(() => {
    if (initialThisMonthBudget !== undefined) setThisMonthBudget(initialThisMonthBudget.toString());
    if (initialMonthlyStartBudget !== undefined)
      setMonthlyStartBudget(initialMonthlyStartBudget.toString());
  }, [initialThisMonthBudget, initialMonthlyStartBudget]);

  // 예산 유효성 검증
  const validateBudget = (value: string): string => {
    if (!value) return '';
    const numValue = Number(value);
    if (numValue < MIN_BUDGET) return `최소 ${MIN_BUDGET.toLocaleString()}원 이상이어야 합니다.`;
    if (numValue > MAX_BUDGET) return `최대 ${MAX_BUDGET.toLocaleString()}원까지 입력 가능합니다.`;
    return '';
  };

  // 입력값이 변경될 때마다 호출 (실시간으로 입력값을 state에 저장)
  const handleBudgetChange =
    (setter: (value: string) => void, errorSetter: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      // 숫자만 입력 가능하도록 처리
      const numericValue = value.replace(/[^0-9]/g, '');

      // 예산 최댓값 검증 - 초과 시 입력 차단
      if (numericValue && Number(numericValue) > MAX_BUDGET) {
        errorSetter(`최대 ${MAX_BUDGET.toLocaleString()}원까지 입력 가능합니다.`);
        return;
      }

      setter(numericValue);
      errorSetter(validateBudget(numericValue));
    };

  // 변경 사항이 있는지 확인
  const isChanged =
    Number(thisMonthBudget) !== initialThisMonthBudget ||
    Number(monthlyStartBudget) !== initialMonthlyStartBudget;

  // 제출 가능 여부 확인
  const isSubmitDisabled =
    !!thisMonthError ||
    !!monthlyStartError ||
    !thisMonthBudget ||
    !monthlyStartBudget ||
    !isChanged;

  const handleSubmit = () => {
    if (onSubmit) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      onSubmit({
        thisMonthBudget: Number(thisMonthBudget),
        monthlyStartBudget: Number(monthlyStartBudget),
      });
    }
  };

  return (
    <div className="w-full max-w-960 bg-white">
      {/* 헤더 */}
      <div
        className="
            flex flex-col
            gap-8 tablet:gap-12 desktop:gap-12 mb-40"
      >
        <h2
          className="
            font-bold text-black leading-normal
            text-18 tablet:text-24 desktop:text-24
            tracking--0.45 tablet:tracking--0.6 desktop:tracking--0.6"
        >
          예산 관리
        </h2>
        <p
          className="
            font-normal text-gray-500 leading-normal
            text-14 tablet:text-16 desktop:text-16
            tracking--0.35 tablet:tracking--0.4 desktop:tracking--0.4"
        >
          이번 달 예산을 정해서 지출을 관리해보세요
        </p>
      </div>

      {/* 메인 */}
      <div
        className="
            flex flex-col 
            gap-64 tablet:gap-64 desktop:gap-80
            mb-80 tablet:mb-120 desktop:mb-120
      "
      >
        {/* 이번 달 예산 */}
        <div className="flex flex-col gap-8">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            htmlFor="this-month-budget"
            className="
              font-bold text-gray-950 leading-normal
              text-14 tablet:text-16 desktop:text-16
              tracking--0.35 tablet:tracking--0.4 desktop:tracking--0.4"
          >
            이번 달
          </label>
          <div className="relative flex items-center border-b border-gray-950">
            <Input
              id="this-month-budget"
              value={thisMonthBudget ? Number(thisMonthBudget).toLocaleString() : ''}
              onChange={handleBudgetChange(setThisMonthBudget, setThisMonthError)}
              placeholder="예산을 입력해주세요"
              className="
                pr-50 border-none focus:border-none p-0 h-auto
                font-extrabold
                text-gray-950
                !text-30 tablet:!text-40 desktop:!text-40
                !tracking--0.75 tablet:!tracking--1 desktop:!tracking--1
                placeholder:font-bold placeholder:text-gray-200
                placeholder:text-20 tablet:placeholder:text-32 desktop:placeholder:text-32
                placeholder:tracking--0.75 tablet:placeholder:tracking--0.8 desktop:placeholder:tracking--0.8"
            />
            <span
              className="
                absolute right-0 text-gray-950
                text-30 tablet:text-40 desktop:text-40
                font-bold tablet:font-extrabold desktop:font-extrabold
                tracking--0.75 tablet:tracking--1 desktop:tracking--1"
            >
              원
            </span>
          </div>
          <span
            className="
              font-bold text-gray-500 leading-normal
              text-14 tablet:text-16 desktop:text-16
              tracking--0.35 tablet:tracking--0.4 desktop:tracking--0.4"
          >
            {formatNumberToKorean(Number(thisMonthBudget))}
          </span>
          {thisMonthError && <span className="text-12 text-red-500 mt-4">{thisMonthError}</span>}
        </div>

        {/* 매달 시작 예산 */}
        <div className="flex flex-col gap-8">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            htmlFor="monthly-start-budget"
            className="
              font-bold text-gray-950 leading-normal
              text-14 tablet:text-16 desktop:text-16
              tracking--0.35 tablet:tracking--0.4 desktop:tracking--0.4"
          >
            매달 시작
          </label>
          <div className="relative flex items-center border-b border-gray-950">
            <Input
              id="monthly-start-budget"
              value={monthlyStartBudget ? Number(monthlyStartBudget).toLocaleString() : ''}
              onChange={handleBudgetChange(setMonthlyStartBudget, setMonthlyStartError)}
              placeholder="예산을 입력해주세요"
              className="
                pr-50 border-none focus:border-none p-0 h-auto
                font-extrabold
                text-gray-950
                !text-30 tablet:!text-40 desktop:!text-40
                !tracking--0.75 tablet:!tracking--1 desktop:!tracking--1
                placeholder:font-bold placeholder:text-gray-200
                placeholder:text-20 tablet:placeholder:text-32 desktop:placeholder:text-32
                placeholder:tracking--0.75 tablet:placeholder:tracking--0.8 desktop:placeholder:tracking--0.8"
            />
            <span
              className="
                absolute right-0 text-gray-950
                text-30 tablet:text-40 desktop:text-40
                font-bold tablet:font-extrabold desktop:font-extrabold
                tracking--0.75 tablet:tracking--1 desktop:tracking--1"
            >
              원
            </span>
          </div>
          <span
            className="
              font-bold text-gray-500 leading-normal
              text-14 tablet:text-16 desktop:text-16
              tracking--0.35 tablet:tracking--0.4 desktop:tracking--0.4"
          >
            {formatNumberToKorean(Number(monthlyStartBudget))}
          </span>
          {monthlyStartError && (
            <span className="text-12 text-red-500 mt-4">{monthlyStartError}</span>
          )}
        </div>
      </div>

      {/* 입력 가능 한도 안내 */}
      <p
        className="
          text-12 tablet:text-14 text-gray-400 mb-16
          tracking--0.3 tablet:tracking--0.35"
      >
        입력 가능 범위: {MIN_BUDGET.toLocaleString()}원 ~ {MAX_BUDGET.toLocaleString()}원
      </p>

      <Button
        fullWidth
        size="lg"
        variant="primary"
        onClick={handleSubmit}
        inactive={isSubmitDisabled}
      >
        수정하기
      </Button>
    </div>
  );
};

export default BudgetFormOrg;
