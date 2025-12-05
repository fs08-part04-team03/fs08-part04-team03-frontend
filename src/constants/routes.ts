export type AppRouteKey =
  | 'product-list'
  | 'purchase-request-list'
  | 'product-register-list'
  | 'purchase-request-manage'
  | 'purchase-history-check'
  | 'management';

export interface AppRouteConfig {
  key: AppRouteKey;
  label: string;
  href: string;
}

export const ROUTES: Record<AppRouteKey, AppRouteConfig> = {
  'product-list': {
    key: 'product-list',
    label: '상품 리스트',
    href: '/[companyId]/products',
  },
  'purchase-request-list': {
    key: 'purchase-request-list',
    label: '구매 요청 내역',
    href: '/[companyId]/my/purchase-requests',
  },
  'product-register-list': {
    key: 'product-register-list',
    label: '상품 등록 내역',
    href: '/[companyId]/products/mine',
  },
  'purchase-request-manage': {
    key: 'purchase-request-manage',
    label: '구매 요청 관리',
    href: '/[companyId]/manager/requests',
  },
  'purchase-history-check': {
    key: 'purchase-history-check',
    label: '구매 내역 확인',
    href: '/[companyId]/manager/purchase-history',
  },
  management: {
    key: 'management',
    label: '관리',
    href: '/[companyId]/admin',
  },
};
