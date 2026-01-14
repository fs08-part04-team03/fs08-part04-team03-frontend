import {
  PARENT_CATEGORIES,
  CHILD_CATEGORIES,
  ParentCategory,
  ChildCategory,
  ParentCategoryId,
  ChildCategoryId,
  ParentCategoryKey,
  CategoryBreadcrumbItem,
  CategorySection,
  ParentCategoryOption,
} from './categories.constants';

// Map 인덱스 생성
const parentById = new Map<ParentCategoryId, ParentCategory>(
  PARENT_CATEGORIES.map((c) => [c.id, c])
);

const parentByKey = new Map<ParentCategoryKey, ParentCategory>(
  PARENT_CATEGORIES.map((c) => [c.key, c])
);

const childById = new Map<ChildCategoryId, ChildCategory>(CHILD_CATEGORIES.map((c) => [c.id, c]));

const childrenByParentId = new Map<ParentCategoryId, ChildCategory[]>(
  CHILD_CATEGORIES.reduce<Map<ParentCategoryId, ChildCategory[]>>((map, child) => {
    const list = map.get(child.parentId) ?? [];
    map.set(child.parentId, [...list, child]);
    return map;
  }, new Map<ParentCategoryId, ChildCategory[]>())
);

// 조회 함수
export function getParentById(id: number | null | undefined) {
  if (id == null) return null;
  return parentById.get(id as ParentCategoryId) ?? null;
}

export function getParentByKey(key: ParentCategoryKey) {
  return parentByKey.get(key) ?? null;
}

export function getChildById(id: number | null | undefined) {
  if (id == null) return null;
  return childById.get(id as ChildCategoryId) ?? null;
}

export function getChildrenByParentId(parentId: number | null | undefined) {
  if (parentId == null) return [];
  return childrenByParentId.get(parentId as ParentCategoryId) ?? [];
}

// 경로 빌더
export function buildParentPath(parent: ParentCategory) {
  return `/products/${parent.key}`;
}

export function buildChildPath(parent: ParentCategory, child: ChildCategory) {
  return `/products/${parent.key}/${child.key}`;
}

// Breadcrumb
export function buildProductBreadcrumb(params: {
  categoryId?: number | null;
  onParentCategoryClick?: (parentKey: ParentCategoryKey) => void;
  onSubCategoryClick?: (subCategoryId: number) => void;
}): CategoryBreadcrumbItem[] {
  const { categoryId, onParentCategoryClick, onSubCategoryClick } = params;

  const items: CategoryBreadcrumbItem[] = [];

  const child = getChildById(categoryId ?? null);

  if (child) {
    const parent = getParentById(child.parentId);

    if (parent) {
      // 대분류 클릭 시 CategorySwitcher와 동일하게 첫 소분류로 이동
      if (onParentCategoryClick) {
        const parentKey = parent.key;
        items.push({
          label: parent.name,
          onClick: () => {
            onParentCategoryClick(parentKey);
            // 해당 대분류의 첫 소분류로 필터링
            if (onSubCategoryClick) {
              const firstChild = getChildrenByParentId(parent.id)[0];
              if (firstChild) {
                queueMicrotask(() => {
                  onSubCategoryClick(firstChild.id);
                });
              }
            }
          },
        });
      } else {
        // onClick 핸들러가 없으면 클릭 불가능
        items.push({ label: parent.name });
      }
      items.push({ label: child.name, href: buildChildPath(parent, child) });
    }
  }

  return items;
}

// Panel 관련
export const PARENT_CATEGORY_OPTIONS: ParentCategoryOption[] = [
  // "상품" 옵션을 맨 앞에 추가 (모든 상품 보기)
  {
    id: 'all' as ParentCategoryKey,
    label: '상품',
    parentId: 1 as ParentCategoryId, // 특수 값 (실제로는 사용되지 않음, 타입 호환을 위해 1 사용)
  },
  ...PARENT_CATEGORIES.map((parent) => ({
    id: parent.key,
    label: parent.name,
    parentId: parent.id,
  })),
];

/**
 * 카테고리 데이터를 CategoryPanel 형식으로 변환
 * breadcrumb과 동일하게 숫자 ID를 사용
 */
export const CATEGORY_SECTIONS: CategorySection[] = PARENT_CATEGORIES.map((parent) => {
  const children = getChildrenByParentId(parent.id);
  return {
    id: parent.id,
    key: parent.key,
    title: parent.name,
    options: children.map((child) => ({
      value: child.id,
      key: child.key,
      label: child.name,
    })),
  };
});

// 카테고리 ID로 라벨 찾기
export const getCategoryLabelById = (categoryId: number): string | undefined => {
  const category = CATEGORY_SECTIONS.find((section) => section.id === categoryId);
  return category?.title;
};

//  서브 카테고리 ID로 라벨 찾기
export const getSubCategoryLabelById = (subCategoryId: number): string | undefined => {
  const section = CATEGORY_SECTIONS.find((s) =>
    s.options.some((opt) => opt.value === subCategoryId)
  );
  return section?.options.find((opt) => opt.value === subCategoryId)?.label;
};
