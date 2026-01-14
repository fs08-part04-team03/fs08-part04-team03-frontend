import { type BreadcrumbItem } from '@/components/molecules/Breadcrumb/Breadcrumb';
// eslint-disable-next-line import/no-unresolved
import { BREADCRUMB_ITEMS } from '@/constants';

export function generateProductsBreadcrumb(companyId: string): BreadcrumbItem[] {
  return [
    { label: BREADCRUMB_ITEMS.PRODUCTS.label, href: BREADCRUMB_ITEMS.PRODUCTS.href(companyId) },
  ];
}

export function generateCartBreadcrumb(companyId: string): BreadcrumbItem[] {
  return [{ label: BREADCRUMB_ITEMS.CART.label, href: BREADCRUMB_ITEMS.CART.href(companyId) }];
}

export function generatePurchaseRequestsBreadcrumb(companyId: string): BreadcrumbItem[] {
  return [
    {
      label: BREADCRUMB_ITEMS.MY_PURCHASE_REQUESTS.label,
      href: BREADCRUMB_ITEMS.MY_PURCHASE_REQUESTS.href(companyId),
    },
  ];
}

export function generatePurchaseRequestDetailBreadcrumb(
  companyId: string,
  requestId: string
): BreadcrumbItem[] {
  return [
    {
      label: BREADCRUMB_ITEMS.MY_PURCHASE_REQUESTS.label,
      href: BREADCRUMB_ITEMS.MY_PURCHASE_REQUESTS.href(companyId),
    },
    { label: `Request #${requestId.slice(0, 8)}` },
  ];
}

export function generateMyPageBreadcrumb(companyId: string, username?: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { label: BREADCRUMB_ITEMS.MYPAGE.label, href: BREADCRUMB_ITEMS.MYPAGE.href(companyId) },
  ];
  if (username) {
    items.push({ label: username });
  }
  return items;
}
