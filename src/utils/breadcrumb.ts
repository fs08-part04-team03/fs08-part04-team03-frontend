import { type BreadcrumbItem } from '@/components/molecules/Breadcrumb/Breadcrumb';
// eslint-disable-next-line import/no-unresolved
import { BREADCRUMB_ITEMS } from '@/constants';

export function generateHomeBreadcrumb(): BreadcrumbItem[] {
  return [BREADCRUMB_ITEMS.HOME];
}

export function generateProductsBreadcrumb(): BreadcrumbItem[] {
  return [BREADCRUMB_ITEMS.HOME, BREADCRUMB_ITEMS.PRODUCTS];
}

export function generateCartBreadcrumb(): BreadcrumbItem[] {
  return [BREADCRUMB_ITEMS.HOME, BREADCRUMB_ITEMS.CART];
}

export function generatePurchaseRequestsBreadcrumb(): BreadcrumbItem[] {
  return [BREADCRUMB_ITEMS.HOME, BREADCRUMB_ITEMS.PURCHASE_REQUESTS];
}

export function generatePurchaseRequestDetailBreadcrumb(requestId: string): BreadcrumbItem[] {
  return [
    BREADCRUMB_ITEMS.HOME,
    BREADCRUMB_ITEMS.PURCHASE_REQUESTS,
    { label: `Request #${requestId.slice(0, 8)}` },
  ];
}

export function generateMyPageBreadcrumb(username?: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [BREADCRUMB_ITEMS.HOME, BREADCRUMB_ITEMS.MYPAGE];
  if (username) {
    items.push({ label: username });
  }
  return items;
}
