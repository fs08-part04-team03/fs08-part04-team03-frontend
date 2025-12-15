// 대분류
export const PARENT_CATEGORIES = [
  { id: 1, key: 'snack', name: '스낵' },
  { id: 2, key: 'drink', name: '음료' },
  { id: 3, key: 'water', name: '생수' },
  { id: 4, key: 'simple-meal', name: '간편식' },
  { id: 5, key: 'fresh-food', name: '신선식' },
  { id: 6, key: 'coffee-beans', name: '원두커피' },
  { id: 7, key: 'supplies', name: '비품' },
] as const;

// 소분류
export const CHILD_CATEGORIES = [
  // 스낵(1)
  { id: 101, parentId: 1, key: 'snack-snack', name: '과자' },
  { id: 102, parentId: 1, key: 'snack-cookie', name: '쿠키' },
  { id: 103, parentId: 1, key: 'snack-biscuit', name: '비스켓류' },
  { id: 104, parentId: 1, key: 'snack-chocolate', name: '초콜릿류' },
  { id: 105, parentId: 1, key: 'snack-candy', name: '캔디류' },
  { id: 106, parentId: 1, key: 'snack-jelly', name: '젤리류' },
  { id: 107, parentId: 1, key: 'snack-cereal-bar', name: '시리얼바' },
  { id: 108, parentId: 1, key: 'snack-nuts', name: '견과류' },

  // 음료(2)
  { id: 201, parentId: 2, key: 'drink-soda', name: '탄산음료' },
  { id: 202, parentId: 2, key: 'drink-fruit', name: '과즙음료' },
  { id: 203, parentId: 2, key: 'drink-energy', name: '에너지음료' },
  { id: 204, parentId: 2, key: 'drink-ion', name: '이온음료' },
  { id: 205, parentId: 2, key: 'drink-health', name: '건강음료' },
  { id: 206, parentId: 2, key: 'drink-tea', name: '차류' },

  // 생수(3)
  { id: 301, parentId: 3, key: 'water-water', name: '생수' },
  { id: 302, parentId: 3, key: 'water-sparkling', name: '스파클링' },

  // 간편식(4)
  { id: 401, parentId: 4, key: 'simple-cup-ramen', name: '컵라면' },
  { id: 402, parentId: 4, key: 'simple-sausage', name: '소시지' },
  { id: 403, parentId: 4, key: 'simple-egg', name: '계란' },
  { id: 404, parentId: 4, key: 'simple-cup-rice', name: '컵밥류' },
  { id: 405, parentId: 4, key: 'simple-cereal', name: '시리얼' },

  // 신선식(5)
  { id: 501, parentId: 5, key: 'fresh-fruit', name: '과일' },
  { id: 502, parentId: 5, key: 'fresh-salad', name: '샐러드' },
  { id: 503, parentId: 5, key: 'fresh-bread', name: '빵' },
  { id: 504, parentId: 5, key: 'fresh-sandwich', name: '샌드위치' },
  { id: 505, parentId: 5, key: 'fresh-yogurt', name: '요거트류' },
  { id: 506, parentId: 5, key: 'fresh-dairy', name: '유제품' },

  // 원두커피(6)
  { id: 601, parentId: 6, key: 'coffee-drip', name: '드립커피' },
  { id: 602, parentId: 6, key: 'coffee-beans', name: '원두' },
  { id: 603, parentId: 6, key: 'coffee-capsule', name: '캡슐커피' },

  // 비품(7)
  { id: 701, parentId: 7, key: 'supplies-disposable', name: '일회용품' },
  { id: 702, parentId: 7, key: 'supplies-office', name: '사무용품' },
  { id: 703, parentId: 7, key: 'supplies-cleaning', name: '청소용품' },
  { id: 704, parentId: 7, key: 'supplies-hygiene', name: '위생용품' },
] as const;

// 타입 정의
export type ParentCategory = (typeof PARENT_CATEGORIES)[number];
export type ChildCategory = (typeof CHILD_CATEGORIES)[number];

export type ParentCategoryId = ParentCategory['id'];
export type ChildCategoryId = ChildCategory['id'];

export type ParentCategoryKey = ParentCategory['key'];
export type ChildCategoryKey = ChildCategory['key'];

// Breadcrumb 타입
export type CategoryBreadcrumbItem = {
  label: string;
  href?: string;
};

// Panel 타입
export interface CategoryOption {
  value: number; // ChildCategory의 id (숫자)
  label: string;
  count?: number;
  key?: string; // ChildCategory의 key (참조용)
}

export interface CategorySection {
  id: number; // ParentCategory의 id (숫자)
  title: string;
  key?: string; // ParentCategory의 key (참조용)
  icon?: React.ReactNode;
  description?: React.ReactNode;
  options: CategoryOption[];
}

export type ParentCategoryOption = {
  id: ParentCategoryKey;
  label: string;
  parentId: ParentCategoryId;
};
