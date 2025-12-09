export interface CartButtonProps {
  /** 회사 스코프 라우팅에 사용할 companyId */
  companyId: string;

  /** 장바구니에 담긴 상품 개수 (0이면 숫자만 0으로 노출) */
  count: number;

  /** 외부에서 추가 스타일 주입용 */
  className?: string;

  /**
   * 클릭 시 추가로 처리할 로직이 있을 때 사용
   * (라우팅은 기본적으로 /[companyId]/cart 로 이동)
   */
  onClick?: () => void;

  /** 접근성용 레이블 (기본값: `장바구니 (n개)` 형식) */
  ariaLabel?: string;
}
