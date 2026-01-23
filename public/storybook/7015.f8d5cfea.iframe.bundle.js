'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [7015],
  {
    './src/constants/categories/categories.constants.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        A: () => CHILD_CATEGORIES,
        _: () => PARENT_CATEGORIES,
      });
      const PARENT_CATEGORIES = [
          { id: 1, key: 'snack', name: '스낵' },
          { id: 2, key: 'drink', name: '음료' },
          { id: 3, key: 'water', name: '생수' },
          { id: 4, key: 'simple-meal', name: '간편식' },
          { id: 5, key: 'fresh-food', name: '신선식' },
          { id: 6, key: 'coffee-beans', name: '원두커피' },
          { id: 7, key: 'supplies', name: '비품' },
        ],
        CHILD_CATEGORIES = [
          { id: 101, parentId: 1, key: 'snack-snack', name: '과자' },
          { id: 102, parentId: 1, key: 'snack-cookie', name: '쿠키' },
          { id: 103, parentId: 1, key: 'snack-biscuit', name: '비스켓류' },
          { id: 104, parentId: 1, key: 'snack-chocolate', name: '초콜릿류' },
          { id: 105, parentId: 1, key: 'snack-candy', name: '캔디류' },
          { id: 106, parentId: 1, key: 'snack-jelly', name: '젤리류' },
          { id: 107, parentId: 1, key: 'snack-cereal-bar', name: '시리얼바' },
          { id: 108, parentId: 1, key: 'snack-nuts', name: '견과류' },
          { id: 201, parentId: 2, key: 'drink-soda', name: '탄산음료' },
          { id: 202, parentId: 2, key: 'drink-fruit', name: '과즙음료' },
          { id: 203, parentId: 2, key: 'drink-energy', name: '에너지음료' },
          { id: 204, parentId: 2, key: 'drink-ion', name: '이온음료' },
          { id: 205, parentId: 2, key: 'drink-health', name: '건강음료' },
          { id: 206, parentId: 2, key: 'drink-tea', name: '차류' },
          { id: 301, parentId: 3, key: 'water-water', name: '생수' },
          { id: 302, parentId: 3, key: 'water-sparkling', name: '스파클링' },
          { id: 401, parentId: 4, key: 'simple-cup-ramen', name: '컵라면' },
          { id: 402, parentId: 4, key: 'simple-sausage', name: '소시지' },
          { id: 403, parentId: 4, key: 'simple-egg', name: '계란' },
          { id: 404, parentId: 4, key: 'simple-cup-rice', name: '컵밥류' },
          { id: 405, parentId: 4, key: 'simple-cereal', name: '시리얼' },
          { id: 501, parentId: 5, key: 'fresh-fruit', name: '과일' },
          { id: 502, parentId: 5, key: 'fresh-salad', name: '샐러드' },
          { id: 503, parentId: 5, key: 'fresh-bread', name: '빵' },
          { id: 504, parentId: 5, key: 'fresh-sandwich', name: '샌드위치' },
          { id: 505, parentId: 5, key: 'fresh-yogurt', name: '요거트류' },
          { id: 506, parentId: 5, key: 'fresh-dairy', name: '유제품' },
          { id: 601, parentId: 6, key: 'coffee-drip', name: '드립커피' },
          { id: 602, parentId: 6, key: 'coffee-beans', name: '원두' },
          { id: 603, parentId: 6, key: 'coffee-capsule', name: '캡슐커피' },
          { id: 701, parentId: 7, key: 'supplies-disposable', name: '일회용품' },
          { id: 702, parentId: 7, key: 'supplies-office', name: '사무용품' },
          { id: 703, parentId: 7, key: 'supplies-cleaning', name: '청소용품' },
          { id: 704, parentId: 7, key: 'supplies-hygiene', name: '위생용품' },
        ];
    },
    './src/constants/categories/categories.utils.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        JV: () => getParentById,
        WW: () => getChildrenByParentId,
        ZV: () => getChildById,
        w: () => CATEGORY_SECTIONS,
        zk: () => PARENT_CATEGORY_OPTIONS,
      });
      var _categories_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        './src/constants/categories/categories.constants.ts'
      );
      const parentById = new Map(
          _categories_constants__WEBPACK_IMPORTED_MODULE_0__._.map((c) => [c.id, c])
        ),
        childById =
          (new Map(_categories_constants__WEBPACK_IMPORTED_MODULE_0__._.map((c) => [c.key, c])),
          new Map(_categories_constants__WEBPACK_IMPORTED_MODULE_0__.A.map((c) => [c.id, c]))),
        childrenByParentId = new Map(
          _categories_constants__WEBPACK_IMPORTED_MODULE_0__.A.reduce((map, child) => {
            const list = map.get(child.parentId) ?? [];
            return (map.set(child.parentId, [...list, child]), map);
          }, new Map())
        );
      function getParentById(id) {
        return null == id ? null : (parentById.get(id) ?? null);
      }
      function getChildById(id) {
        return null == id ? null : (childById.get(id) ?? null);
      }
      function getChildrenByParentId(parentId) {
        return null == parentId ? [] : (childrenByParentId.get(parentId) ?? []);
      }
      const PARENT_CATEGORY_OPTIONS = [
          { id: 'all', label: '상품', parentId: 1 },
          ..._categories_constants__WEBPACK_IMPORTED_MODULE_0__._.map((parent) => ({
            id: parent.key,
            label: parent.name,
            parentId: parent.id,
          })),
        ],
        CATEGORY_SECTIONS = _categories_constants__WEBPACK_IMPORTED_MODULE_0__._.map((parent) => {
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
    },
    './src/constants/index.ts'(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.d(__webpack_exports__, {
        Rn: () => BREADCRUMB_ITEMS,
        w: () => categories_utils.w,
        I$: () => LOADING_MESSAGES,
        zk: () => categories_utils.zk,
        vp: () => PATHNAME,
        Hf: () => getGNBPrimaryNavConfig,
        o1: () => isNavActive,
      });
      const ROUTES = {
          'product-list': { label: '상품 리스트', href: '/[companyId]/products' },
          'my-purchase-request-list': {
            label: '구매 요청 내역',
            href: '/[companyId]/my/purchase-requests',
          },
          'product-register-list': { label: '상품 등록 내역', href: '/[companyId]/products/my' },
          'purchase-request-list-manager': {
            label: '구매 요청 관리',
            href: '/[companyId]/requests',
          },
          'purchase-history-check': {
            label: '구매 내역 확인',
            href: '/[companyId]/purchase-history',
          },
          wishlist: { label: '찜목록', href: '/[companyId]/wishlist' },
          management: { label: '관리', href: '/[companyId]/admin' },
        },
        ROLE_NAV_KEYS = {
          user: ['product-list', 'my-purchase-request-list', 'product-register-list', 'wishlist'],
          manager: [
            'product-list',
            'my-purchase-request-list',
            'product-register-list',
            'purchase-request-list-manager',
            'purchase-history-check',
            'wishlist',
          ],
          admin: [
            'product-list',
            'my-purchase-request-list',
            'product-register-list',
            'purchase-request-list-manager',
            'purchase-history-check',
            'management',
            'wishlist',
          ],
        },
        getGNBPrimaryNavConfig = (role) =>
          ROLE_NAV_KEYS[role].map((key) => ({ key, ...ROUTES[key] })),
        isNavActive = (currentPath, targetHref) => {
          if (!currentPath || !targetHref) return !1;
          const target = targetHref.replace('/[companyId]', '') || '/';
          const current = ((path) => {
            const segments = path.split('/').filter(Boolean);
            return segments.length <= 1 ? '/' : `/${segments.slice(1).join('/')}`;
          })(currentPath);
          return current === target || current.startsWith(`${target}/`);
        };
      __webpack_require__('./src/constants/categories/categories.constants.ts');
      var categories_utils = __webpack_require__('./src/constants/categories/categories.utils.ts');
      (__webpack_require__('./src/features/auth/utils/constants.ts'),
        __webpack_require__('./src/features/purchase/constants/index.ts'));
      const LOADING_MESSAGES = { DEFAULT: '로딩 중...' },
        PATHNAME = {
          ROOT: '/',
          LOGIN: '/login',
          SIGNUP: '/signup',
          INVITE_SIGNUP: (token) => `/invite?token=${token}`,
          COMPANY_ROOT: (companyId) => `/${companyId}`,
          HOME: (companyId) => `/${companyId}/products`,
          PRODUCTS: (companyId) => `/${companyId}/products`,
          PRODUCT_DETAIL: (companyId, productId) => `/${companyId}/products/${productId}`,
          PRODUCT_MINE: (companyId) => `/${companyId}/products/my`,
          WISHLIST: (companyId) => `/${companyId}/wishlist`,
          PROFILE: (companyId) => `/${companyId}/my/profile`,
          MYPAGE: (companyId) => `/${companyId}/my/profile`,
          CART: (companyId) => `/${companyId}/cart`,
          PURCHASE_REQUEST: (companyId) => `/${companyId}/purchase-request`,
          PURCHASE_REQUEST_COMPLETED: (companyId) => `/${companyId}/purchase-request/completed`,
          ORDER_COMPLETED: (companyId) => `/${companyId}/order/completed`,
          MY_PURCHASE_REQUESTS: (companyId) => `/${companyId}/my/purchase-requests`,
          MY_PURCHASE_REQUEST_DETAIL: (companyId, requestId) =>
            `/${companyId}/my/purchase-requests/${requestId}`,
          MANAGER_PURCHASE_REQUESTS: (companyId) => `/${companyId}/requests`,
          MANAGER_PURCHASE_REQUEST_DETAIL: (companyId, requestId) =>
            `/${companyId}/requests/${requestId}`,
          MANAGER_PURCHASE_HISTORY: (companyId) => `/${companyId}/purchase-history`,
          MANAGER_PURCHASE_HISTORY_DETAIL: (companyId, orderId) =>
            `/${companyId}/purchase-history/${orderId}`,
          ADMIN_ROOT: (companyId) => `/${companyId}/admin`,
          ADMIN_DASHBOARD: (companyId) => `/${companyId}/admin/dashboard`,
          ADMIN_USERS: (companyId) => `/${companyId}/admin/users`,
          ADMIN_BUDGET: (companyId) => `/${companyId}/admin/budget`,
        },
        BREADCRUMB_ITEMS = {
          PRODUCTS: { label: '상품', href: (companyId) => PATHNAME.PRODUCTS(companyId) },
          MY_PURCHASE_REQUESTS: {
            label: '구매 요청 내역',
            href: (companyId) => PATHNAME.MY_PURCHASE_REQUESTS(companyId),
          },
          CART: { label: '장바구니', href: (companyId) => PATHNAME.CART(companyId) },
          MYPAGE: { label: '마이페이지', href: (companyId) => PATHNAME.MYPAGE(companyId) },
        };
    },
    './src/features/auth/utils/constants.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        cS: () => DEFAULT_TIMEOUT,
        h1: () => AUTH_API_PATHS,
        rK: () => DEFAULT_API_URL,
      });
      const DEFAULT_TIMEOUT = 3e4,
        DEFAULT_API_URL =
          { NODE_ENV: 'production', NODE_PATH: [], STORYBOOK: 'true', PUBLIC_URL: '.' }
            .NEXT_PUBLIC_API_URL || 'https://api.snock.store',
        AUTH_API_PATHS = {
          LOGIN: '/api/v1/auth/login',
          ADMIN_REGISTER: '/api/v1/auth/admin/register',
          REGISTER: '/api/v1/auth/register',
          REFRESH: '/api/v1/auth/refresh',
          LOGOUT: '/api/v1/auth/logout',
          INVITATION_VERIFY_URL: '/api/v1/auth/invitation/verifyUrl',
          CSRF: '/api/v1/auth/csrf',
        };
    },
    './src/features/purchase/constants/api.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { S: () => PURCHASE_API_PATHS });
      const PURCHASE_API_PATHS = {
        ADMIN_PURCHASE_NOW: '/api/v1/purchase/admin/purchaseNow',
        ADMIN_MANAGE_PURCHASE_REQUESTS: '/api/v1/purchase/admin/managePurchaseRequests',
        ADMIN_GET_PURCHASE_REQUEST_DETAIL: '/api/v1/purchase/admin/getPurchaseRequestDetail',
        ADMIN_APPROVE_PURCHASE_REQUEST: '/api/v1/purchase/admin/approvePurchaseRequest',
        ADMIN_REJECT_PURCHASE_REQUEST: '/api/v1/purchase/admin/rejectPurchaseRequest',
        ADMIN_PURCHASE_DASHBOARD: '/api/v1/purchase/admin/purchaseDashboard',
        USER_GET_MY_PURCHASES: '/api/v1/purchase/user/getMyPurchases',
        USER_GET_MY_PURCHASE_DETAIL: '/api/v1/purchase/user/getMyPurchaseDetail',
        USER_REQUEST_PURCHASE: '/api/v1/purchase/user/requestPurchase',
        USER_URGENT_REQUEST_PURCHASE: '/api/v1/purchase/user/urgentRequestPurchase',
        USER_CANCEL_PURCHASE_REQUEST: '/api/v1/purchase/user/cancelPurchaseRequest',
      };
    },
    './src/features/purchase/constants/index.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        GD: () => PURCHASE_BUTTON_STYLES,
        B4: () => PURCHASE_DEFAULTS,
        tO: () => PURCHASE_EMPTY_MESSAGES,
        jV: () => PURCHASE_HEIGHTS,
        kx: () => PURCHASE_ITEM_LIST_STYLES,
        WY: () => PURCHASE_LABELS,
        qd: () => PURCHASE_MARGINS,
        rk: () => PURCHASE_MESSAGES,
        _u: () => PURCHASE_PADDING,
        gU: () => PURCHASE_REQUEST_STATUS_LABEL,
        mO: () => PURCHASE_SPACING,
        q2: () => PURCHASE_TABLE_STYLES,
        Lh: () => PURCHASE_TEXT_SIZES,
        xi: () => PURCHASE_TIMERS,
      });
      const PURCHASE_DEFAULTS = {
          BUDGET: 2e6,
          DISPLAY_ITEM_COUNT: 6,
          SKELETON_ROWS: 6,
          INITIAL_PAGE: 1,
        },
        PURCHASE_REQUEST_STATUS_LABEL = {
          PENDING: '대기중',
          APPROVED: '요청 승인',
          REJECTED: '구매 반려',
          CANCELLED: '요청 취소',
        },
        PURCHASE_LABELS = {
          TITLE: '구매 요청 내역',
          SORT_PLACEHOLDER: '최신순',
          TABLE_HEADERS: {
            DATE: '구매 요청일',
            PRODUCT: '상품 정보',
            PRICE: '주문 금액',
            REQUESTER: '요청인',
            STATUS: '상태',
            ACTIONS: '비고',
          },
          BUTTONS: {
            REJECT: '반려',
            APPROVE: '승인',
            APPROVE_ACTION: '요청 승인',
            REJECT_ACTION: '요청 반려',
            CANCEL: '요청 취소',
            NAVIGATE_TO_PRODUCTS: '상품 리스트로 이동',
            ADD_TO_CART: '장바구니 다시 담기',
            ADDING_TO_CART: '담는 중...',
            GO_TO_LIST: '목록 보기',
            BACK_TO_LIST: '구매 요청 목록으로 돌아가기',
          },
        },
        PURCHASE_MESSAGES = {
          COMPANY_NOT_SELECTED: '회사가 선택되지 않았습니다.',
          NO_ITEMS_TO_ADD: '담을 상품이 없습니다.',
          ADD_TO_CART_SUCCESS: '장바구니에 상품을 담았습니다.',
          ADD_TO_CART_FAILED: '장바구니 담기에 실패했습니다.',
          ADD_TO_CART_PARTIAL: (count) =>
            `${count}개 상품만 담겼습니다. 일부 상품 추가에 실패했습니다.`,
          BUDGET_REQUEST_NOT_AVAILABLE: '예산 증액 요청 기능은 준비 중입니다.',
          COMPANY_NOT_FOUND: '회사 정보를 찾을 수 없습니다.',
        },
        PURCHASE_EMPTY_MESSAGES = {
          ADMIN_NO_REQUESTS: {
            TITLE: '요청 내역이 없어요',
            DESCRIPTION: '상품 리스트를 둘러보고\n상품을 담아보세요',
          },
          USER_NO_REQUESTS: {
            TITLE: '구매 요청한 내역이 없어요',
            DESCRIPTION: '상품 리스트를 둘러보고\n관리자에게 요청해보세요',
          },
        };
      __webpack_require__('./src/features/purchase/constants/api.ts');
      const PURCHASE_TABLE_STYLES = {
          CELL_BASE: {
            HEADER: 'text-left text-gray-700 text-14 font-bold shrink-0 py-20 pl-20',
            CELL: 'shrink-0 text-left py-20 pl-20',
          },
          COLUMN_WIDTHS: {
            DATE: 'tablet:w-100 desktop:w-140',
            PRODUCT: 'tablet:w-200 desktop:flex-1',
            PRICE: 'tablet:w-100 desktop:w-140',
            REQUESTER: 'tablet:w-100 desktop:w-140',
            STATUS: 'tablet:w-100 desktop:w-140',
            ACTIONS: 'tablet:w-140 desktop:w-180 desktop:max-w-180',
          },
        },
        PURCHASE_BUTTON_STYLES = { ACTION_BUTTON: 'w-60 py-8 px-0 text-10!' },
        PURCHASE_SPACING = { GAP_SMALL: 'gap-8', GAP_MEDIUM: 'gap-12' },
        PURCHASE_HEIGHTS = { TABLE_HEADER: 'h-60', TABLE_ROW: 'h-100' },
        PURCHASE_PADDING = { CELL_Y: 'py-20', CELL_X: 'pl-20' },
        PURCHASE_TEXT_SIZES = { SMALL: 'text-14', MEDIUM: 'text-18' },
        PURCHASE_MARGINS = { EMPTY_STATE_TOP: 'mt-200' },
        PURCHASE_ITEM_LIST_STYLES = {
          ROW: {
            MOBILE: {
              BASE: 'flex flex-col w-full py-16 border-b border-gray-200 gap-12',
              URGENT: 'bg-red-100',
              HOVER: 'cursor-pointer hover:bg-gray-50',
            },
            DESKTOP: {
              BASE: 'flex items-center w-full border-b border-gray-200',
              GAP: 'gap-16 tablet:gap-24 desktop:gap-32',
              URGENT: 'bg-red-100',
              HOVER: 'cursor-pointer hover:bg-gray-50',
            },
          },
          CELL: {
            TEXT: 'text-gray-700 text-14',
            BOLD: 'font-bold',
            NORMAL: 'font-normal',
            DATE: {
              BASE: 'text-gray-700 text-14 font-bold shrink-0',
              MOBILE: '',
              TABLET: 'tablet:w-100',
              DESKTOP: 'desktop:w-180 py-20 tablet:px-0 desktop:px-40',
            },
            PRODUCT: {
              BASE: 'text-gray-700 text-14 shrink-0',
              MOBILE: 'flex-1 min-w-0',
              TABLET: 'tablet:w-140',
              DESKTOP: 'desktop:w-260 min-w-0 py-20 tablet:px-0 desktop:px-40',
            },
            PRICE: {
              BASE: 'shrink-0 text-left',
              TABLET: 'tablet:w-100',
              DESKTOP: 'desktop:w-180 py-20 tablet:px-0 desktop:px-40',
            },
            ACTIONS: {
              BASE: 'shrink-0 text-left',
              TABLET: 'tablet:w-100',
              DESKTOP: 'desktop:w-180 py-20 tablet:px-0 desktop:px-40',
            },
          },
          BUTTON: {
            MOBILE: 'flex-1 h-40 tablet:w-auto tablet:h-44 text-10!',
            DESKTOP: 'h-44 w-126',
          },
          LINK: { HOVER: 'cursor-pointer hover:underline hover:text-primary-500' },
        },
        PURCHASE_TIMERS = { TOAST_DURATION: 3e3, CART_REDIRECT_DELAY: 1e3 };
    },
  },
]);
