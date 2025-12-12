export type AppRouteKey =
  | 'product-list'
  | 'purchase-request-list'
  | 'product-register-list'
  | 'purchase-request-manage'
  | 'purchase-history-check'
  | 'management';

export interface AppRouteConfig {
  label: string;
  href: string;
}

export const ROUTES: Record<AppRouteKey, AppRouteConfig> = {
  'product-list': {
    label: '상품 리스트',
    href: '/[companyId]/products',
  },
  'purchase-request-list': {
    label: '구매 요청 내역',
    href: '/[companyId]/my',
  },
  'product-register-list': {
    label: '상품 등록 내역',
    href: '/[companyId]/products/my',
  },
  'purchase-request-manage': {
    label: '구매 요청 관리',
    href: '/[companyId]/manager/requests',
  },
  'purchase-history-check': {
    label: '구매 내역 확인',
    href: '/[companyId]/manager/purchase-history',
  },
  management: {
    label: '관리',
    href: '/[companyId]/admin',
  },
};
