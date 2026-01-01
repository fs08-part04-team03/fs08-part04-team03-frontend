interface PriceTextProps {
  value: number;
  showUnit?: boolean; // "원" 표시 여부
  className?: string;
}

const PriceText = ({ value, showUnit = true, className }: PriceTextProps) => {
  // NaN, undefined, null 체크 및 기본값 0 처리
  const safeValue = Number.isFinite(value) && value >= 0 ? value : 0;
  const formattedValue = safeValue.toLocaleString('ko-KR');
  const displayText = showUnit ? `${formattedValue}원` : formattedValue;

  return <span className={className}>{displayText}</span>;
};

export default PriceText;
