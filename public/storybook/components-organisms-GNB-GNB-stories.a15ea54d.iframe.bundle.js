'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [7095],
  {
    './src/components/atoms/Logo/Logo.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__('./node_modules/next/link.js'),
        next_link__WEBPACK_IMPORTED_MODULE_2___default = __webpack_require__.n(
          next_link__WEBPACK_IMPORTED_MODULE_2__
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const sizeClass = {
          sm: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)('w-70 h-20'),
          md: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)('w-225 h-100'),
          lg: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)('w-344 h-97'),
        },
        sizeValues = {
          sm: { width: 70, height: 20 },
          md: { width: 225, height: 100 },
          lg: { width: 344, height: 97 },
        },
        Logo = ({ size = 'md', src = '/logo/logo.svg', alt = 'Logo', href, className }) => {
          const { width, height } = sizeValues[size],
            isSvg = src.endsWith('.svg'),
            imageElement = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              next_image__WEBPACK_IMPORTED_MODULE_1__.A,
              {
                src,
                alt,
                width,
                height,
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                  sizeClass[size],
                  className
                ),
                priority: !0,
                unoptimized: isSvg,
              }
            );
          return href
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                next_link__WEBPACK_IMPORTED_MODULE_2___default(),
                { href, children: imageElement }
              )
            : imageElement;
        },
        __WEBPACK_DEFAULT_EXPORT__ = Logo;
      Logo.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'Logo',
        props: {
          size: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'sm' | 'md' | 'lg'",
              elements: [
                { name: 'literal', value: "'sm'" },
                { name: 'literal', value: "'md'" },
                { name: 'literal', value: "'lg'" },
              ],
            },
            description: '',
            defaultValue: { value: "'md'", computed: !1 },
          },
          src: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'/logo/logo.svg'", computed: !1 },
          },
          alt: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'Logo'", computed: !1 },
          },
          href: { required: !1, tsType: { name: 'string' }, description: '' },
        },
        composes: ['Omit'],
      };
    },
    './src/components/molecules/GNBBrand/GNBBrand.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__('./node_modules/next/link.js'),
        next_link__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
          next_link__WEBPACK_IMPORTED_MODULE_1__
        ),
        next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/export-mocks/navigation/index.js'
        ),
        _components_atoms_Logo_Logo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './src/components/atoms/Logo/Logo.tsx'
        ),
        _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__('./src/constants/index.ts');
      const GNBBrand = () => {
          const params = (0, next_navigation__WEBPACK_IMPORTED_MODULE_2__.useParams)(),
            companyId = params?.companyId,
            href = companyId
              ? _constants__WEBPACK_IMPORTED_MODULE_4__.vp.HOME(companyId)
              : _constants__WEBPACK_IMPORTED_MODULE_4__.vp.ROOT;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
            next_link__WEBPACK_IMPORTED_MODULE_1___default(),
            {
              href,
              className: 'flex items-center',
              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _components_atoms_Logo_Logo__WEBPACK_IMPORTED_MODULE_3__.A,
                { size: 'sm' }
              ),
            }
          );
        },
        __WEBPACK_DEFAULT_EXPORT__ = GNBBrand;
      GNBBrand.__docgenInfo = { description: '', methods: [], displayName: 'GNBBrand' };
    },
    './src/components/molecules/GNBCategorySwitcher/GNBCategorySwitcher.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { p: () => GNBCategorySwitcher });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/next/dist/compiled/react-dom/index.js'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const GNBCategorySwitcher = ({
        categories,
        categorySections,
        sectionIdByParentKey,
        activeCategoryId,
        productCategoryId,
        onCategoryChange,
        onSubCategoryChange,
        className,
      }) => {
        const sections = (0, react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(
            () => categorySections ?? [],
            [categorySections]
          ),
          [isOpen, setIsOpen] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
          [mounted, setMounted] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
          triggerRef = (0, react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null),
          effectiveCategoryId = productCategoryId ?? activeCategoryId,
          activeOption = (0, react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(
            () => categories.find((c) => c.id === effectiveCategoryId) ?? categories[0],
            [categories, effectiveCategoryId]
          ),
          derivedSectionIdByParentKey = (0, react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
            const mapping = {};
            return (
              sections.forEach((section) => {
                section.key && (mapping[section.key] = section.id);
              }),
              mapping
            );
          }, [sections]),
          finalSectionIdByParentKey = sectionIdByParentKey ?? derivedSectionIdByParentKey;
        (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
          setMounted(!0);
        }, []);
        const close = () => {
            (setIsOpen(!1),
              requestAnimationFrame(() => {
                triggerRef.current?.focus();
              }));
          },
          handleParentClick = (parentKey) => {
            onCategoryChange(parentKey);
            const firstSubValue = ((parentKey) => {
              const sectionId = finalSectionIdByParentKey[parentKey];
              if (!sectionId) return null;
              const section = sections.find((s) => s.id === sectionId),
                first = section?.options?.[0];
              return first?.value ?? null;
            })(parentKey);
            (close(),
              null != firstSubValue &&
                onSubCategoryChange &&
                queueMicrotask(() => {
                  onSubCategoryChange(firstSubValue);
                }));
          };
        if (
          ((0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            if (!isOpen) return;
            const handleKeyDown = (event) => {
              'Escape' === event.key && close();
            };
            return (
              document.addEventListener('keydown', handleKeyDown),
              () => document.removeEventListener('keydown', handleKeyDown)
            );
          }, [isOpen]),
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            if (!isOpen) return;
            const prevOverflow = document.body.style.overflow;
            return (
              (document.body.style.overflow = 'hidden'),
              () => {
                document.body.style.overflow = prevOverflow;
              }
            );
          }, [isOpen]),
          !categories.length || !activeOption)
        )
          return null;
        const overlay = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
          className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
            'fixed inset-0 z-menu tablet:hidden',
            'transition-opacity duration-200',
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          ),
          onClick: (event) => {
            null === event.target.closest('[role="dialog"]') && close();
          },
          role: 'button',
          tabIndex: 0,
          'aria-label': '오버레이 닫기',
          onKeyDown: (e) => {
            ('Enter' !== e.key && ' ' !== e.key) || close();
          },
          children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
              'absolute left-0 right-0 top-56 w-full',
              'bg-white/95 backdrop-blur-sm',
              'py-24',
              'shadow-lg',
              'transform transition-transform duration-200 ease-out',
              isOpen ? 'translate-y-0' : '-translate-y-full'
            ),
            role: 'dialog',
            'aria-modal': 'true',
            'aria-label': '카테고리 선택',
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
              className: 'px-24',
              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('ul', {
                className: 'flex flex-col gap-10 max-h-[60vh] overflow-y-auto',
                role: 'listbox',
                'aria-label': '카테고리 목록',
                children: categories.map((category) => {
                  const isActive = category.id === effectiveCategoryId;
                  return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    'li',
                    {
                      children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('button', {
                        type: 'button',
                        className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                          'w-full text-center text-16 py-12',
                          'transition-colors',
                          isActive
                            ? 'font-semibold text-gray-950'
                            : 'font-normal text-gray-400 hover:text-gray-800',
                          'cursor-pointer'
                        ),
                        role: 'option',
                        'aria-selected': isActive,
                        onClick: (e) => {
                          (e.stopPropagation(), handleParentClick(category.id));
                        },
                        children: category.label,
                      }),
                    },
                    category.id
                  );
                }),
              }),
            }),
          }),
        });
        return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
          {
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                  'relative flex items-center justify-start tablet:hidden',
                  className
                ),
                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('button', {
                  ref: triggerRef,
                  type: 'button',
                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                    'flex justify-end items-center gap-10',
                    'px-8 py-4 rounded-999',
                    'text-16 font-medium text-gray-950',
                    'active:scale-[0.97] transition-transform',
                    'cursor-pointer'
                  ),
                  onClick: () => {
                    categories.length && setIsOpen((prev) => !prev);
                  },
                  'aria-haspopup': 'dialog',
                  'aria-expanded': isOpen,
                  'aria-label': '카테고리 선택',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      children: activeOption.label,
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      next_image__WEBPACK_IMPORTED_MODULE_3__.A,
                      {
                        src: '/icons/arrow-down.svg',
                        alt: '',
                        width: 12,
                        height: 7,
                        className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                          'transition-transform duration-200',
                          isOpen && 'rotate-180'
                        ),
                        'aria-hidden': 'true',
                      }
                    ),
                  ],
                }),
              }),
              mounted &&
                isOpen &&
                (0, react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)(overlay, document.body),
            ],
          }
        );
      };
      GNBCategorySwitcher.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'GNBCategorySwitcher',
        props: {
          categories: {
            required: !0,
            tsType: {
              name: 'Array',
              elements: [{ name: 'ParentCategoryOption' }],
              raw: 'CategoryOption[]',
            },
            description: "대분류 카테고리 리스트\n예: [{ id: 'drink', label: '음료' }]",
          },
          categorySections: {
            required: !1,
            tsType: {
              name: 'Array',
              elements: [{ name: 'CategorySection' }],
              raw: 'CategorySection[]',
            },
            description:
              "대분류별 소분류 카테고리 섹션\n예: [{ id: 2, title: '음료', options: [{ value: 201, label: '탄산음료' }, ...] }]",
          },
          sectionIdByParentKey: {
            required: !1,
            tsType: {
              name: 'Partial',
              elements: [
                {
                  name: 'Record',
                  elements: [{ name: 'ParentCategoryKey' }, { name: 'number' }],
                  raw: 'Record<ParentCategoryKey, number>',
                },
              ],
              raw: 'Partial<Record<ParentCategoryKey, number>>',
            },
            description:
              'ParentCategoryKey -> CategorySection.id(number) 매핑\n\nParentCategoryKey는 문자열 키(\'drink\')이고,\ncategorySections의 id는 number(2)인 구조이므로\n"대분류 클릭 시 해당 섹션의 첫 소분류로 이동" UX를 구현하려면 매핑이 필요합니다.\n\n예: { drink: 2, snack: 1 }',
          },
          activeCategoryId: {
            required: !0,
            tsType: { name: 'ParentCategoryKey' },
            description: '현재 선택된 카테고리 ID\n예: "drink"',
          },
          productCategoryId: {
            required: !1,
            tsType: { name: 'ParentCategoryKey' },
            description:
              '상품의 대분류 ID (상품 상세 페이지에서 사용)\n이 값이 있으면 activeCategoryId보다 우선적으로 표시됩니다.\n예: "drink"',
          },
          onCategoryChange: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(id: ParentCategoryKey) => void',
              signature: {
                arguments: [{ type: { name: 'ParentCategoryKey' }, name: 'id' }],
                return: { name: 'void' },
              },
            },
            description:
              '카테고리 변경 시 호출되는 콜백\n카테고리 클릭 → 부모(GNB 또는 페이지)에서 URL 업데이트 or 상태 업데이트 처리',
          },
          onSubCategoryChange: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(subCategoryId: number) => void',
              signature: {
                arguments: [{ type: { name: 'number' }, name: 'subCategoryId' }],
                return: { name: 'void' },
              },
            },
            description: '소분류 카테고리 선택 시 호출되는 콜백 (선택 사항)',
          },
          className: {
            required: !1,
            tsType: { name: 'string' },
            description:
              "추가 스타일링용 className\n(모바일 전용 노출: 'mobile:flex tablet:hidden' 과 함께 사용 가능)",
          },
        },
      };
    },
    './src/components/molecules/GNBPrimaryNav/GNBPrimaryNav.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        Ay: () => __WEBPACK_DEFAULT_EXPORT__,
        rw: () => GNBPrimaryNavSidebar,
      });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__('./node_modules/next/link.js'),
        next_link__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
          next_link__WEBPACK_IMPORTED_MODULE_1__
        ),
        next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/export-mocks/navigation/index.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__('./src/constants/index.ts');
      const GNBPrimaryNavDesktop = ({
          role,
          companyId,
          activePath,
          onItemClick,
          navClassName,
          className,
        }) => {
          const pathname = (0, next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname)(),
            currentPath = activePath ?? pathname ?? '',
            desktopItems = (0, _constants__WEBPACK_IMPORTED_MODULE_4__.Hf)(role).filter(
              (item) => 'wishlist' !== item.key
            ),
            sortedItems = [...desktopItems].sort((a, b) => b.href.length - a.href.length),
            activeKeys = new Set(),
            activeItem = sortedItems.find((item) =>
              (0, _constants__WEBPACK_IMPORTED_MODULE_4__.o1)(currentPath, item.href)
            );
          return (
            activeItem && activeKeys.add(activeItem.key),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('nav', {
              'aria-label': '주요 페이지',
              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                'flex justify-center items-center gap-13',
                navClassName,
                className
              ),
              children: desktopItems.map((item) => {
                const href = item.href.replace('[companyId]', companyId),
                  active = activeKeys.has(item.key);
                return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  next_link__WEBPACK_IMPORTED_MODULE_1___default(),
                  {
                    href,
                    onClick: () => onItemClick?.(item.key),
                    'aria-current': active ? 'page' : void 0,
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                      'text-14 leading-22 transition-colors',
                      active ? 'font-semibold text-black' : 'text-gray-500 hover:text-black'
                    ),
                    children: item.label,
                  },
                  item.key
                );
              }),
            })
          );
        },
        GNBPrimaryNav = ({ role, companyId, activePath, onItemClick, navClassName, className }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
              'hidden desktop:flex',
              className
            ),
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              GNBPrimaryNavDesktop,
              { role, companyId, activePath, onItemClick, navClassName }
            ),
          }),
        __WEBPACK_DEFAULT_EXPORT__ = GNBPrimaryNav,
        GNBPrimaryNavSidebar = ({
          role,
          companyId,
          activePath,
          onItemClick,
          onProfileClick,
          onLogout,
          navClassName,
          className,
        }) => {
          const pathname = (0, next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname)(),
            currentPath = activePath ?? pathname ?? '',
            items = (0, _constants__WEBPACK_IMPORTED_MODULE_4__.Hf)(role),
            profileHref = _constants__WEBPACK_IMPORTED_MODULE_4__.vp.PROFILE(companyId),
            isProfileActive = (0, _constants__WEBPACK_IMPORTED_MODULE_4__.o1)(
              currentPath,
              '/[companyId]/my/profile'
            ),
            sortedItems = [...items].sort((a, b) => b.href.length - a.href.length),
            activeKeys = new Set(),
            activeItem = sortedItems.find((item) =>
              (0, _constants__WEBPACK_IMPORTED_MODULE_4__.o1)(currentPath, item.href)
            );
          return (
            activeItem && activeKeys.add(activeItem.key),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('nav', {
              'aria-label': '주요 페이지',
              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                'flex flex-col justify-center gap-36',
                navClassName,
                className
              ),
              children: [
                items.map((item) => {
                  const href = item.href.replace('[companyId]', companyId),
                    active = activeKeys.has(item.key);
                  return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    next_link__WEBPACK_IMPORTED_MODULE_1___default(),
                    {
                      href,
                      onClick: () => onItemClick?.(item.key),
                      'aria-current': active ? 'page' : void 0,
                      className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                        'flex items-center justify-center',
                        'text-16 leading-22 transition-colors',
                        active ? 'font-semibold text-black' : 'text-gray-500 hover:text-black'
                      ),
                      children: item.label,
                    },
                    item.key
                  );
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  next_link__WEBPACK_IMPORTED_MODULE_1___default(),
                  {
                    href: profileHref,
                    onClick: onProfileClick,
                    'aria-current': isProfileActive ? 'page' : void 0,
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                      'flex items-center justify-center',
                      'text-16 leading-22 transition-colors',
                      isProfileActive
                        ? 'font-semibold text-black'
                        : 'text-gray-500 hover:text-black'
                    ),
                    children: '마이페이지',
                  }
                ),
                onLogout &&
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('button', {
                    type: 'button',
                    onClick: onLogout,
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                      'flex items-center justify-center',
                      'text-16 leading-22 transition-colors',
                      'text-gray-500 hover:text-black',
                      'cursor-pointer'
                    ),
                    children: '로그아웃',
                  }),
              ],
            })
          );
        };
      ((GNBPrimaryNavDesktop.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'GNBPrimaryNavDesktop',
        props: {
          role: {
            required: !0,
            tsType: { name: 'UserRole' },
            description: '사용자 역할 (user | manager | admin)',
          },
          companyId: {
            required: !0,
            tsType: { name: 'string' },
            description: '회사 스코프 라우팅에 사용할 companyId',
          },
          activePath: {
            required: !1,
            tsType: { name: 'string' },
            description: '현재 활성 경로 (pathname 대신 사용 가능)',
          },
          onItemClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(key: AppRouteKey) => void',
              signature: {
                arguments: [{ type: { name: 'AppRouteKey' }, name: 'key' }],
                return: { name: 'void' },
              },
            },
            description: '네비게이션 아이템 클릭 시 호출되는 콜백',
          },
          navClassName: {
            required: !1,
            tsType: { name: 'string' },
            description: '네비게이션 메뉴 className',
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      }),
        (GNBPrimaryNav.__docgenInfo = {
          description:
            'GNBPrimaryNav\n\n반응형 GNB 상단 네비게이션 컴포넌트\n- 데스크탑 (1024px ~): 네비게이션 링크들',
          methods: [],
          displayName: 'GNBPrimaryNav',
          props: {
            role: {
              required: !0,
              tsType: { name: 'UserRole' },
              description: '사용자 역할 (user | manager | admin)',
            },
            companyId: {
              required: !0,
              tsType: { name: 'string' },
              description: '회사 스코프 라우팅에 사용할 companyId',
            },
            activePath: {
              required: !1,
              tsType: { name: 'string' },
              description: '현재 활성 경로 (pathname 대신 사용 가능)',
            },
            onItemClick: {
              required: !1,
              tsType: {
                name: 'signature',
                type: 'function',
                raw: '(key: AppRouteKey) => void',
                signature: {
                  arguments: [{ type: { name: 'AppRouteKey' }, name: 'key' }],
                  return: { name: 'void' },
                },
              },
              description: '네비게이션 아이템 클릭 시 호출되는 콜백',
            },
            navClassName: {
              required: !1,
              tsType: { name: 'string' },
              description: '데스크탑 네비게이션 메뉴 className',
            },
            className: { required: !1, tsType: { name: 'string' }, description: '' },
          },
        }),
        (GNBPrimaryNavSidebar.__docgenInfo = {
          description:
            'GNBPrimaryNavSidebar\n\n사이드바 메뉴용 네비게이션 컴포넌트\n- 기본 네비게이션 아이템들\n- 마이페이지(프로필)\n- 로그아웃',
          methods: [],
          displayName: 'GNBPrimaryNavSidebar',
          props: {
            role: {
              required: !0,
              tsType: { name: 'UserRole' },
              description: '사용자 역할 (user | manager | admin)',
            },
            companyId: {
              required: !0,
              tsType: { name: 'string' },
              description: '회사 스코프 라우팅에 사용할 companyId',
            },
            activePath: {
              required: !1,
              tsType: { name: 'string' },
              description: '현재 활성 경로 (pathname 대신 사용 가능)',
            },
            onItemClick: {
              required: !1,
              tsType: {
                name: 'signature',
                type: 'function',
                raw: '(key: AppRouteKey) => void',
                signature: {
                  arguments: [{ type: { name: 'AppRouteKey' }, name: 'key' }],
                  return: { name: 'void' },
                },
              },
              description: '네비게이션 아이템 클릭 시 호출되는 콜백',
            },
            onProfileClick: {
              required: !1,
              tsType: {
                name: 'signature',
                type: 'function',
                raw: '() => void',
                signature: { arguments: [], return: { name: 'void' } },
              },
              description: '마이페이지 클릭 시 호출되는 콜백',
            },
            onLogout: {
              required: !1,
              tsType: {
                name: 'signature',
                type: 'function',
                raw: '() => void',
                signature: { arguments: [], return: { name: 'void' } },
              },
              description: '로그아웃 클릭 시 호출되는 콜백',
            },
            navClassName: {
              required: !1,
              tsType: { name: 'string' },
              description: '네비게이션 메뉴 className',
            },
            className: { required: !1, tsType: { name: 'string' }, description: '' },
          },
        }));
    },
    './src/components/molecules/MobileCategoryBar/MobileCategoryBar.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { _: () => MobileCategoryBar });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _constants_categories_categories_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './src/constants/categories/categories.utils.ts'
        );
      const MobileCategoryBar = ({ categoryId, onClick, className }) => {
        if (!categoryId) return null;
        const childCategory = (0,
        _constants_categories_categories_utils__WEBPACK_IMPORTED_MODULE_3__.ZV)(categoryId);
        let displayText = '';
        if (childCategory) {
          const parentCategory = (0,
          _constants_categories_categories_utils__WEBPACK_IMPORTED_MODULE_3__.JV)(
            childCategory.parentId
          );
          displayText = parentCategory
            ? `${parentCategory.name} · ${childCategory.name}`
            : childCategory.name;
        } else {
          const parentCategory = (0,
          _constants_categories_categories_utils__WEBPACK_IMPORTED_MODULE_3__.JV)(categoryId);
          parentCategory && (displayText = parentCategory.name);
        }
        return displayText
          ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                'w-full bg-white border-b border-gray-200',
                'tablet:hidden',
                className
              ),
              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('button', {
                type: 'button',
                onClick,
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                  'w-full px-24 py-16',
                  'flex items-center justify-between',
                  'text-16 font-semibold text-gray-950',
                  'hover:bg-gray-50 active:bg-gray-100',
                  'transition-colors'
                ),
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                    children: displayText,
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    next_image__WEBPACK_IMPORTED_MODULE_1__.A,
                    {
                      src: '/icons/arrow-down.svg',
                      alt: '',
                      width: 12,
                      height: 12,
                      'aria-hidden': 'true',
                    }
                  ),
                ],
              }),
            })
          : null;
      };
      MobileCategoryBar.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'MobileCategoryBar',
        props: {
          categoryId: {
            required: !1,
            tsType: {
              name: 'union',
              raw: 'number | null',
              elements: [{ name: 'number' }, { name: 'null' }],
            },
            description: '선택된 카테고리 ID (대분류 or 소분류)',
          },
          onClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '클릭 핸들러',
          },
          className: { required: !1, tsType: { name: 'string' }, description: '추가 className' },
        },
      };
    },
    './src/components/molecules/Toast/Toast.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { y: () => Toast });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './src/components/atoms/IconButton/IconButton.tsx'
        );
      const CloseButton = ({ onClose }) =>
          onClose
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_4__.K,
                {
                  variant: 'filled',
                  size: 'sm',
                  onClick: onClose,
                  className: 'bg-white hover:bg-white cursor-pointer ml-2',
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                    className: 'relative w-24 h-24',
                    children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                      { src: '/icons/close-circle.svg', alt: 'close', fill: !0, unoptimized: !0 }
                    ),
                  }),
                }
              )
            : null,
        ToastContent = ({ variant, formattedAmount, onClose }) =>
          'error' !== variant
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CloseButton, { onClose })
            : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: 'flex items-center gap-2',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                    className: 'font-suit font-bold text-16 leading-none tracking--0.35',
                    children: '남은 예산',
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                    className: 'font-suit font-bold text-16 leading-none tracking--0.35',
                    children: formattedAmount,
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CloseButton, { onClose }),
                ],
              }),
        DesktopMessage = ({ message }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
            className: 'font-suit font-bold text-16 leading-none tracking--0.35',
            children: message,
          }),
        TabletMessage = ({ message, variant }) =>
          'error' === variant
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                className: 'font-suit font-bold text-16 leading-none tracking--0.35',
                children: '수량을 줄이거나 항목을 제거해주세요.',
              })
            : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                className: 'font-suit font-bold text-16 leading-none tracking--0.35',
                children: message,
              }),
        MobileMessage = ({ variant, message }) =>
          'error' === variant
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
                children: [
                  '예산이 부족합니다.',
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('br', {}),
                  '수량을 줄이거나 항목을 제거해 주세요.',
                ],
              })
            : 'custom' === variant
              ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                  children: message || '',
                })
              : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                  children: '예산이 변경되었습니다.',
                }),
        Toast = ({ amount = '0', variant, message, onClose, duration = 2e3 }) => {
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            if (!onClose) return () => {};
            const timer = setTimeout(() => {
              onClose();
            }, duration);
            return () => clearTimeout(timer);
          }, [onClose, duration]);
          let iconSrc = '',
            defaultMessage = '';
          'error' === variant
            ? ((iconSrc = '/icons/red-info.svg'),
              (defaultMessage = '예산이 부족합니다. 수량을 줄이거나 항목을 제거해주세요.'))
            : 'custom' === variant
              ? ((iconSrc = '/icons/red-info.svg'), (defaultMessage = message || ''))
              : ((iconSrc = '/icons/check-icon.svg'), (defaultMessage = '예산이 변경되었습니다.'));
          const finalMessage = message || defaultMessage;
          let formattedAmount = '0원';
          const amountNumber = Number(amount);
          return (
            Number.isNaN(amountNumber) ||
              (formattedAmount = `${new Intl.NumberFormat('ko-KR').format(amountNumber)}원`),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
              role: 'status',
              'aria-live': 'error' === variant ? 'assertive' : 'polite',
              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                'flex items-center text-white relative rounded-default bg-[rgba(0,0,0,0.80)] shadow-toast backdrop-blur-toast',
                'gap-8',
                'z-toast',
                'px-20',
                'mobile:px-20',
                'tablet:px-toast-32',
                'desktop:px-50',
                'desktop:w-1152 desktop:h-80',
                'tablet:w-696 tablet:h-80',
                'mobile:w-350 mobile:h-64'
              ),
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                  className: 'shrink-0 w-24 h-24 relative',
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                    { src: iconSrc, alt: 'toast-icon', fill: !0, unoptimized: !0 }
                  ),
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'flex-1 flex flex-col justify-center ml-3',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      className:
                        'desktop:flex tablet:hidden mobile:hidden justify-between items-center w-full',
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DesktopMessage, {
                          message: finalMessage,
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToastContent, {
                          variant,
                          formattedAmount,
                          onClose,
                        }),
                      ],
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      className:
                        'tablet:flex desktop:hidden mobile:hidden justify-between items-center w-full',
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TabletMessage, {
                          message: finalMessage,
                          variant,
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToastContent, {
                          variant,
                          formattedAmount,
                          onClose,
                        }),
                      ],
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      className:
                        'mobile:flex tablet:hidden desktop:hidden justify-between items-center w-full',
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                          className:
                            'flex flex-col font-suit font-bold text-14 leading-160 tracking--0.35',
                          children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            MobileMessage,
                            { variant, message: finalMessage }
                          ),
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CloseButton, {
                          onClose,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            })
          );
        };
      Toast.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'Toast',
        props: {
          amount: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'0'", computed: !1 },
          },
          variant: {
            required: !0,
            tsType: {
              name: 'union',
              raw: "'error' | 'success' | 'custom'",
              elements: [
                { name: 'literal', value: "'error'" },
                { name: 'literal', value: "'success'" },
                { name: 'literal', value: "'custom'" },
              ],
            },
            description: '',
          },
          message: { required: !1, tsType: { name: 'string' }, description: '' },
          onClose: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          duration: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '2000', computed: !1 },
          },
        },
      };
    },
    './src/components/organisms/GNB/GNB.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          Desktop: () => Desktop,
          Mobile: () => Mobile,
          Tablet: () => Tablet,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => GNB_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        constants = __webpack_require__('./src/constants/index.ts'),
        navigation = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/export-mocks/navigation/index.js'
        ),
        clsx = __webpack_require__('./node_modules/clsx/dist/clsx.mjs'),
        GNBBrand = __webpack_require__('./src/components/molecules/GNBBrand/GNBBrand.tsx'),
        GNBPrimaryNav = __webpack_require__(
          './src/components/molecules/GNBPrimaryNav/GNBPrimaryNav.tsx'
        ),
        GNBUserActions = __webpack_require__(
          './src/components/molecules/GNBUserActions/GNBUserActions.tsx'
        ),
        GNBCategorySwitcher = __webpack_require__(
          './src/components/molecules/GNBCategorySwitcher/GNBCategorySwitcher.tsx'
        ),
        SideBarMenu = __webpack_require__('./src/components/organisms/SideBarMenu/SideBarMenu.tsx'),
        react_dom = __webpack_require__('./node_modules/next/dist/compiled/react-dom/index.js'),
        next_image = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        notification_queries = __webpack_require__(
          './src/features/notification/queries/notification.queries.ts'
        ),
        notification_constants = __webpack_require__('./src/constants/notification.constants.ts');
      function getNotificationTargetLabel(targetType) {
        switch (targetType) {
          case notification_constants.Nh.PURCHASE_REQUEST:
            return '구매 요청';
          case notification_constants.Nh.APPROVAL_NOTICE:
            return '승인 알림';
          case notification_constants.Nh.DENIAL_NOTICE:
            return '반려 알림';
          case notification_constants.Nh.ADMIN_MESSAGE:
            return '관리자 메시지';
          case notification_constants.Nh.GENERAL_NOTICE:
            return '공지사항';
          default:
            return '알림';
        }
      }
      var useToast = __webpack_require__('./src/hooks/useToast.ts'),
        Toast = __webpack_require__('./src/components/molecules/Toast/Toast.tsx');
      const NotificationModal = ({ open, onClose }) => {
        const router = (0, navigation.useRouter)(),
          params = (0, navigation.useParams)(),
          companyId = params?.companyId || '',
          [mounted, setMounted] = (0, react.useState)(!1);
        (0, react.useEffect)(() => {
          setMounted(!0);
        }, []);
        const modalRef = (0, react.useRef)(null),
          {
            data: notificationsData,
            isLoading,
            refetch,
          } = (0, notification_queries.E$)({
            page: notification_constants.p1.DEFAULT_PAGE,
            limit: notification_constants.p1.MODAL_LIMIT,
            enabled: open,
          }),
          { mutate: markAsRead } = (0, notification_queries.SF)(),
          { showToast, toastVariant, toastMessage, triggerToast, closeToast } = (0, useToast.d)();
        (0, react.useEffect)(() => {
          const handleEsc = (e) => {
            'Escape' === e.key && onClose();
          };
          return (
            open && (window.addEventListener('keydown', handleEsc), refetch().catch(() => {})),
            () => window.removeEventListener('keydown', handleEsc)
          );
        }, [open, onClose, refetch]);
        const handleNotificationClick = (0, react.useCallback)(
            (notification) => {
              if (
                (notification.isRead ||
                  markAsRead(notification.id, {
                    onError: (err) => {
                      const message =
                        err instanceof Error ? err.message : '알림 읽음 처리에 실패했습니다.';
                      triggerToast('error', message);
                    },
                  }),
                !companyId)
              )
                return void onClose();
              const targetUrl = (function getNotificationTargetUrl(
                companyId,
                targetType,
                targetId
              ) {
                switch (targetType) {
                  case notification_constants.Nh.PURCHASE_REQUEST:
                    return constants.vp.MANAGER_PURCHASE_REQUEST_DETAIL(companyId, targetId);
                  case notification_constants.Nh.APPROVAL_NOTICE:
                  case notification_constants.Nh.DENIAL_NOTICE:
                    return constants.vp.MY_PURCHASE_REQUEST_DETAIL(companyId, targetId);
                  case notification_constants.Nh.ADMIN_MESSAGE:
                  case notification_constants.Nh.GENERAL_NOTICE:
                  default:
                    return null;
                }
              })(companyId, notification.targetType, notification.targetId);
              targetUrl && (onClose(), router.push(targetUrl));
            },
            [companyId, markAsRead, onClose, router, triggerToast]
          ),
          formatTime = (dateString) => {
            const date = new Date(dateString),
              diffMs = new Date().getTime() - date.getTime(),
              diffMins = Math.floor(diffMs / 6e4),
              diffHours = Math.floor(diffMs / 36e5),
              diffDays = Math.floor(diffMs / 864e5);
            return diffMins < 1
              ? '방금 전'
              : diffMins < 60
                ? `${diffMins}분 전`
                : diffHours < 24
                  ? `${diffHours}시간 전`
                  : diffDays < 7
                    ? `${diffDays}일 전`
                    : date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
          };
        if (
          ((0, react.useEffect)(() => {
            const handleClickOutside = (e) => {
              (modalRef.current && modalRef.current.contains(e.target)) || onClose();
            };
            return (
              open && document.addEventListener('mousedown', handleClickOutside, !0),
              () => {
                document.removeEventListener('mousedown', handleClickOutside, !0);
              }
            );
          }, [open, onClose]),
          !open || !mounted)
        )
          return null;
        const notifications = (notificationsData?.data ?? []).filter(
            (notification) => !notification.isRead
          ),
          modalContent = (0, react_dom.createPortal)(
            (0, jsx_runtime.jsx)('div', {
              className: (0, clsx.A)(
                'fixed inset-0 z-[var(--z-overlay)] flex items-start justify-end pointer-events-none'
              ),
              role: 'dialog',
              'aria-modal': 'true',
              'aria-label': '알림',
              children: (0, jsx_runtime.jsxs)('div', {
                ref: modalRef,
                role: 'presentation',
                className: (0, clsx.A)(
                  'bg-white pointer-events-auto flex flex-col',
                  'fixed inset-0 w-full h-full z-[var(--z-overlay-content)]',
                  'tablet:static tablet:z-auto',
                  'tablet:w-full tablet:max-w-300 tablet:h-auto tablet:max-h-[500px]',
                  'tablet:mt-56 tablet:mr-24',
                  'tablet:rounded-12 tablet:shadow-xl tablet:border tablet:border-gray-200',
                  'overflow-hidden'
                ),
                onClick: (e) => e.stopPropagation(),
                children: [
                  (0, jsx_runtime.jsxs)('div', {
                    className:
                      'flex items-center justify-between px-16 py-14 border-b border-gray-200',
                    children: [
                      (0, jsx_runtime.jsx)('h2', {
                        className: 'text-16 font-bold text-gray-900',
                        children: '알림',
                      }),
                      (0, jsx_runtime.jsx)('button', {
                        type: 'button',
                        onClick: onClose,
                        className: 'p-4 hover:bg-gray-100 rounded-full transition-colors',
                        'aria-label': '닫기',
                        children: (0, jsx_runtime.jsx)(next_image.A, {
                          src: '/icons/close-white.svg',
                          alt: '',
                          width: 20,
                          height: 20,
                          'aria-hidden': 'true',
                          className: 'cursor-pointer',
                        }),
                      }),
                    ],
                  }),
                  (0, jsx_runtime.jsx)('div', {
                    className: 'flex-1 overflow-y-auto scrollbar-none',
                    children: isLoading
                      ? (0, jsx_runtime.jsx)('div', {
                          className: 'flex items-center justify-center py-40',
                          children: (0, jsx_runtime.jsx)('div', {
                            className:
                              'animate-spin w-24 h-24 border-2 border-primary border-t-transparent rounded-full',
                          }),
                        })
                      : 0 === notifications.length
                        ? (0, jsx_runtime.jsxs)('div', {
                            className:
                              'flex flex-col items-center justify-center py-40 text-gray-500',
                            children: [
                              (0, jsx_runtime.jsx)(next_image.A, {
                                src: '/icons/notification.svg',
                                alt: '알림 없음',
                                width: 48,
                                height: 48,
                                className: 'mb-12',
                              }),
                              (0, jsx_runtime.jsx)('p', {
                                className: 'text-14',
                                children: '알림이 없습니다',
                              }),
                            ],
                          })
                        : (0, jsx_runtime.jsx)('ul', {
                            children: notifications.map((notification) =>
                              (0, jsx_runtime.jsx)(
                                'li',
                                {
                                  children: (0, jsx_runtime.jsx)('button', {
                                    type: 'button',
                                    onClick: () => handleNotificationClick(notification),
                                    className: (0, clsx.A)(
                                      'w-full text-left px-16 py-12',
                                      'border-b border-gray-100',
                                      'transition-colors hover:bg-gray-50 cursor-pointer',
                                      !notification.isRead && 'bg-gray-60'
                                    ),
                                    children: (0, jsx_runtime.jsxs)('div', {
                                      className: 'flex items-start gap-12',
                                      children: [
                                        !notification.isRead &&
                                          (0, jsx_runtime.jsx)('span', {
                                            className:
                                              'mt-10 w-8 h-8 rounded-full bg-red-500 flex-shrink-0',
                                          }),
                                        notification.isRead &&
                                          (0, jsx_runtime.jsx)('span', {
                                            className: 'w-8 flex-shrink-0',
                                          }),
                                        (0, jsx_runtime.jsxs)('div', {
                                          className: 'flex-1 min-w-0',
                                          children: [
                                            (0, jsx_runtime.jsx)('span', {
                                              className: 'text-11 text-gray-500 font-medium',
                                              children: getNotificationTargetLabel(
                                                notification.targetType
                                              ),
                                            }),
                                            (0, jsx_runtime.jsx)('p', {
                                              className: (0, clsx.A)(
                                                'text-14 mt-2',
                                                notification.isRead
                                                  ? 'text-gray-600'
                                                  : 'text-gray-900 font-medium'
                                              ),
                                              children: notification.content,
                                            }),
                                            (0, jsx_runtime.jsx)('span', {
                                              className: 'text-12 text-gray-400 mt-4 block',
                                              children: formatTime(notification.createdAt),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  }),
                                },
                                notification.id
                              )
                            ),
                          }),
                  }),
                ],
              }),
            }),
            document.body
          );
        return (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
          children: [
            modalContent,
            showToast &&
              (0, jsx_runtime.jsx)('div', {
                className: 'fixed bottom-24 left-1/2 -translate-x-1/2 z-[var(--z-toast)]',
                children: (0, jsx_runtime.jsx)(Toast.y, {
                  variant: toastVariant,
                  message: toastMessage,
                  onClose: closeToast,
                }),
              }),
          ],
        });
      };
      ((NotificationModal.displayName = 'NotificationModal'),
        (NotificationModal.__docgenInfo = {
          description:
            'NotificationModal\n\n알림 목록을 표시하는 모달 컴포넌트\n- 알림 클릭 시 읽음 처리 + 해당 URL로 이동\n- 빈 상태 UI 제공',
          methods: [],
          displayName: 'NotificationModal',
          props: {
            open: { required: !0, tsType: { name: 'boolean' }, description: '' },
            onClose: {
              required: !0,
              tsType: {
                name: 'signature',
                type: 'function',
                raw: '() => void',
                signature: { arguments: [], return: { name: 'void' } },
              },
              description: '',
            },
          },
        }));
      var eventsource = __webpack_require__(
          './node_modules/event-source-polyfill/src/eventsource.js'
        ),
        QueryClientProvider = __webpack_require__(
          './node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js'
        ),
        authStore = __webpack_require__('./src/lib/store/authStore.ts'),
        api = __webpack_require__('./src/utils/api.ts'),
        logger = __webpack_require__('./src/utils/logger.ts'),
        utils_constants = __webpack_require__('./src/features/auth/utils/constants.ts');
      __webpack_require__('./src/components/molecules/MobileCategoryBar/MobileCategoryBar.tsx');
      const GNB = ({ baseState, handlers, navigationState, categoryState }) => {
          const params = (0, navigation.useParams)(),
            pathname = (0, navigation.usePathname)(),
            companyId = params?.companyId || '',
            [isSidebarOpen, setIsSidebarOpen] = (0, react.useState)(!1),
            [isNotificationModalOpen, setIsNotificationModalOpen] = (0, react.useState)(!1),
            { data: unreadCountData } = (0, notification_queries.J9)(),
            unreadCount = unreadCountData?.data?.count ?? 0;
          !(function useNotificationSSE(options) {
            const { enabled = !0 } = options ?? {},
              accessToken = (0, authStore.n)((state) => state.accessToken),
              queryClient = (0, QueryClientProvider.jE)(),
              sseRef = (0, react.useRef)(null),
              reconnectTimeoutRef = (0, react.useRef)(null),
              isConnectingRef = (0, react.useRef)(!1),
              connect = (0, react.useCallback)(() => {
                if (isConnectingRef.current || sseRef.current?.readyState === EventSource.OPEN)
                  return;
                if (!accessToken)
                  return void logger.v.info('[SSE] No access token, skipping connection');
                ((isConnectingRef.current = !0),
                  sseRef.current && (sseRef.current.close(), (sseRef.current = null)));
                const streamUrl = `${(0, api.e9)() || utils_constants.rK || ''}${notification_constants.l4.STREAM}`;
                logger.v.info('[SSE] Connecting to notification stream', { streamUrl });
                try {
                  ((sseRef.current = new eventsource.EventSourcePolyfill(streamUrl, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                    heartbeatTimeout: notification_constants.x8.HEARTBEAT_TIMEOUT,
                  })),
                    (sseRef.current.onopen = () => {
                      ((isConnectingRef.current = !1),
                        logger.v.info('[SSE] Notification stream connected'));
                    }),
                    (sseRef.current.onmessage = (event) => {
                      try {
                        const notification = JSON.parse(event.data);
                        (logger.v.info('[SSE] New notification received', {
                          id: notification.id,
                          targetType: notification.targetType,
                        }),
                          queryClient
                            .invalidateQueries({ queryKey: notification_queries.qn.unreadCount() })
                            .catch((err) => {
                              logger.v.error('[SSE] Failed to invalidate unreadCount', err);
                            }),
                          queryClient
                            .invalidateQueries({ queryKey: notification_queries.qn.all })
                            .catch((err) => {
                              logger.v.error('[SSE] Failed to invalidate notification list', err);
                            }));
                      } catch (err) {
                        logger.v.warn('[SSE] Invalid notification payload', {
                          error: err instanceof Error ? err.message : String(err),
                        });
                      }
                    }),
                    (sseRef.current.onerror = (err) => {
                      ((isConnectingRef.current = !1),
                        logger.v.warn('[SSE] Connection error', {
                          readyState: sseRef.current?.readyState,
                          error: err,
                        }),
                        sseRef.current?.close(),
                        (sseRef.current = null),
                        enabled &&
                          (reconnectTimeoutRef.current = setTimeout(() => {
                            (async () => {
                              try {
                                (logger.v.info(
                                  '[SSE] Attempting token refresh before reconnection'
                                ),
                                  (await (0, api.yn)())
                                    ? (logger.v.info(
                                        '[SSE] Token refreshed successfully, reconnecting'
                                      ),
                                      connect())
                                    : authStore.n.getState().accessToken
                                      ? (logger.v.info(
                                          '[SSE] Token refresh returned null, but access token exists. Reconnecting with current token'
                                        ),
                                        connect())
                                      : logger.v.info(
                                          '[SSE] No valid token after refresh attempt, skipping reconnection'
                                        ));
                              } catch (refreshError) {
                                (logger.v.warn(
                                  '[SSE] Token refresh failed, trying to reconnect with existing token',
                                  {
                                    error:
                                      refreshError instanceof Error
                                        ? refreshError.message
                                        : String(refreshError),
                                  }
                                ),
                                  authStore.n.getState().accessToken
                                    ? (logger.v.info('[SSE] Reconnecting with existing token'),
                                      connect())
                                    : logger.v.info('[SSE] No valid token, skipping reconnection'));
                              }
                            })().catch((error) => {
                              logger.v.error('[SSE] Reconnection failed', {
                                error: error instanceof Error ? error.message : String(error),
                              });
                            });
                          }, notification_constants.x8.RECONNECT_DELAY)));
                    }));
                } catch (err) {
                  ((isConnectingRef.current = !1),
                    logger.v.error('[SSE] Failed to create EventSource', {
                      error: err instanceof Error ? err.message : String(err),
                    }));
                }
              }, [accessToken, enabled, queryClient]),
              disconnect = (0, react.useCallback)(() => {
                (reconnectTimeoutRef.current &&
                  (clearTimeout(reconnectTimeoutRef.current), (reconnectTimeoutRef.current = null)),
                  sseRef.current &&
                    (logger.v.info('[SSE] Disconnecting notification stream'),
                    sseRef.current.close(),
                    (sseRef.current = null)),
                  (isConnectingRef.current = !1));
              }, []);
            return (
              (0, react.useEffect)(() => {
                if (enabled && accessToken)
                  return (
                    connect(),
                    () => {
                      disconnect();
                    }
                  );
                disconnect();
              }, [enabled, accessToken, connect, disconnect]),
              { connect, disconnect }
            );
          })({ enabled: !0 });
          const { role, userProfile, cartCount = 0, className, isLoadingProfile } = baseState,
            currentActivePath = navigationState?.activePath ?? pathname ?? '',
            categories = categoryState?.categories ?? [],
            showCategorySwitcher =
              !!pathname &&
              pathname.includes('/products') &&
              !pathname.includes('/products/my') &&
              (pathname.match(/\/products$/) || pathname.match(/\/products\/[^/]+$/));
          (0, react.useEffect)(() => {
            const handleResize = () => {
              window.innerWidth >= 1024 && setIsSidebarOpen(!1);
            };
            return (
              window.addEventListener('resize', handleResize),
              handleResize(),
              () => window.removeEventListener('resize', handleResize)
            );
          }, []);
          const closeSidebar = () => {
            setIsSidebarOpen(!1);
          };
          return (0, jsx_runtime.jsxs)('div', {
            className: (0, clsx.A)(
              'gnb-container',
              'w-full h-56',
              'bg-white border-b border-gray-200',
              'flex items-center justify-between',
              'px-14 tablet:px-24',
              className
            ),
            children: [
              (0, jsx_runtime.jsx)('div', {
                className: 'flex items-center shrink-0 pr-5',
                children: (0, jsx_runtime.jsx)(GNBBrand.A, {}),
              }),
              (0, jsx_runtime.jsxs)('div', {
                className: 'flex-1 flex items-center justify-start desktop:ml-10 translate-y-3',
                children: [
                  (0, jsx_runtime.jsx)(GNBPrimaryNav.Ay, {
                    role,
                    companyId,
                    activePath: currentActivePath,
                    onItemClick: handlers?.onNavItemClick,
                  }),
                  showCategorySwitcher &&
                    categories &&
                    categories.length > 0 &&
                    categoryState?.activeCategoryId &&
                    categoryState?.onCategoryChange &&
                    (0, jsx_runtime.jsx)('div', {
                      className: 'flex-1 flex items-center justify-center tablet:hidden',
                      children: (0, jsx_runtime.jsx)(GNBCategorySwitcher.p, {
                        categories,
                        categorySections: constants.w,
                        activeCategoryId: categoryState.activeCategoryId,
                        productCategoryId: categoryState.productCategoryId,
                        onCategoryChange: categoryState.onCategoryChange,
                        onSubCategoryChange: categoryState.onSubCategoryChange,
                      }),
                    }),
                ],
              }),
              (0, jsx_runtime.jsx)('div', {
                className: 'flex items-center shrink-0',
                children: (0, jsx_runtime.jsx)(GNBUserActions.ec, {
                  companyId,
                  userProfile,
                  cartCount,
                  notificationCount: unreadCount,
                  isLoadingProfile,
                  onNotificationClick: () => {
                    setIsNotificationModalOpen(!0);
                  },
                  onLogout: handlers?.onLogout,
                  onMenuClick: () => {
                    (setIsSidebarOpen(!0), handlers?.onMenuClick?.());
                  },
                }),
              }),
              (0, jsx_runtime.jsx)(SideBarMenu.C, {
                open: isSidebarOpen,
                onClose: closeSidebar,
                children: (0, jsx_runtime.jsx)(GNBPrimaryNav.rw, {
                  role,
                  companyId,
                  activePath: currentActivePath,
                  onItemClick: (key) => {
                    (closeSidebar(), handlers?.onNavItemClick?.(key));
                  },
                  onProfileClick: closeSidebar,
                  onLogout: handlers?.onLogout
                    ? () => {
                        (closeSidebar(), handlers?.onLogout?.());
                      }
                    : void 0,
                }),
              }),
              (0, jsx_runtime.jsx)(NotificationModal, {
                open: isNotificationModalOpen,
                onClose: () => {
                  setIsNotificationModalOpen(!1);
                },
              }),
            ],
          });
        },
        GNB_GNB = GNB;
      GNB.__docgenInfo = {
        description: '개선된 GNB - 깔끔하고 단순한 조립 레이어',
        methods: [],
        displayName: 'GNB',
        props: {
          baseState: { required: !0, tsType: { name: 'GNBBaseState' }, description: '' },
          handlers: { required: !1, tsType: { name: 'GNBHandlers' }, description: '' },
          navigationState: {
            required: !1,
            tsType: { name: 'GNBNavigationState' },
            description: '',
          },
          categoryState: { required: !1, tsType: { name: 'GNBCategoryState' }, description: '' },
        },
      };
      const GNB_stories = {
          title: 'Organisms/GNB',
          component: GNB_GNB,
          tags: ['autodocs'],
          parameters: {
            layout: 'fullscreen',
            viewport: { defaultViewport: 'desktop' },
            nextjs: {
              appDirectory: !0,
              navigation: { pathname: '/company-1/products', segments: ['company-1'] },
            },
            docs: {
              description: {
                component:
                  '전역 네비게이션 바 컴포넌트입니다. Brand, PrimaryNav, CategorySwitcher, UserActions를 통합하여 반응형으로 동작합니다. 모바일/태블릿에서 햄버거 메뉴를 클릭하면 오른쪽에서 사이드바가 열립니다.',
              },
              canvas: { withToolbar: !0 },
            },
          },
        },
        Default = {
          parameters: { viewport: { defaultViewport: 'desktop' } },
          render: () => {
            const [activeCategoryId, setActiveCategoryId] = (0, react.useState)('drink');
            return (0, jsx_runtime.jsxs)('div', {
              className: 'w-full min-h-screen bg-gray-50',
              children: [
                (0, jsx_runtime.jsx)(GNB_GNB, {
                  baseState: {
                    role: 'user',
                    userProfile: (0, jsx_runtime.jsx)('div', { children: '사용자' }),
                    cartCount: 3,
                  },
                  handlers: { onLogout: () => {}, onMenuClick: () => {}, onNavItemClick: () => {} },
                  navigationState: { activePath: '/company-1/products' },
                  categoryState: {
                    categories: constants.zk,
                    activeCategoryId,
                    onCategoryChange: (id) => {
                      setActiveCategoryId(id);
                    },
                  },
                }),
                (0, jsx_runtime.jsx)('main', {
                  className: 'p-24',
                  children: (0, jsx_runtime.jsxs)('div', {
                    className: 'max-w-1200 mx-auto',
                    children: [
                      (0, jsx_runtime.jsx)('h1', {
                        className: 'text-24 font-bold mb-16',
                        children: 'GNB 컴포넌트 예시',
                      }),
                      (0, jsx_runtime.jsx)('p', {
                        className: 'text-16 text-gray-600 mb-8',
                        children:
                          '상단의 GNB를 통해 네비게이션과 사용자 액션을 확인할 수 있습니다.',
                      }),
                      (0, jsx_runtime.jsxs)('div', {
                        className: 'space-y-8',
                        children: [
                          (0, jsx_runtime.jsx)('p', {
                            className: 'text-14 text-gray-500',
                            children:
                              '- 모바일: Brand | CategorySwitcher | UserActions (햄버거 메뉴)',
                          }),
                          (0, jsx_runtime.jsx)('p', {
                            className: 'text-14 text-gray-500',
                            children: '- 태블릿: Brand | UserActions (햄버거 메뉴)',
                          }),
                          (0, jsx_runtime.jsx)('p', {
                            className: 'text-14 text-gray-500',
                            children: '- 데스크탑: Brand | PrimaryNav | UserActions',
                          }),
                          (0, jsx_runtime.jsx)('p', {
                            className: 'text-14 text-gray-600 mt-16',
                            children:
                              '💡 모바일/태블릿 뷰포트에서 우측 상단의 햄버거 메뉴를 클릭하면 사이드바가 열립니다.',
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            });
          },
        },
        Mobile = {
          parameters: {
            viewport: { defaultViewport: 'mobile' },
            docs: { canvas: { withToolbar: !0 } },
          },
          render: Default.render,
          args: Default.args,
        },
        Tablet = {
          parameters: {
            viewport: { defaultViewport: 'tablet' },
            docs: { canvas: { withToolbar: !0 } },
          },
          render: Default.render,
          args: Default.args,
        },
        Desktop = {
          parameters: {
            viewport: { defaultViewport: 'desktop' },
            docs: { canvas: { withToolbar: !0 } },
          },
          render: Default.render,
          args: Default.args,
        },
        __namedExportsOrder = ['Default', 'Mobile', 'Tablet', 'Desktop'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  parameters: {\n    viewport: {\n      defaultViewport: 'desktop'\n    }\n  },\n  render: () => {\n    // eslint-disable-next-line react-hooks/rules-of-hooks\n    const [activeCategoryId, setActiveCategoryId] = useState<'drink' | 'snack' | 'water' | 'simple-meal' | 'fresh-food' | 'coffee-beans' | 'supplies'>('drink');\n    return <div className=\"w-full min-h-screen bg-gray-50\">\n        <GNB baseState={{\n        role: 'user',\n        userProfile: <div>사용자</div>,\n        cartCount: 3\n      }} handlers={{\n        onLogout: () => {},\n        onMenuClick: () => {},\n        onNavItemClick: () => {}\n      }} navigationState={{\n        activePath: '/company-1/products'\n      }} categoryState={{\n        categories: PARENT_CATEGORY_OPTIONS,\n        activeCategoryId,\n        onCategoryChange: id => {\n          setActiveCategoryId(id);\n        }\n      }} />\n        <main className=\"p-24\">\n          <div className=\"max-w-1200 mx-auto\">\n            <h1 className=\"text-24 font-bold mb-16\">GNB 컴포넌트 예시</h1>\n            <p className=\"text-16 text-gray-600 mb-8\">\n              상단의 GNB를 통해 네비게이션과 사용자 액션을 확인할 수 있습니다.\n            </p>\n            <div className=\"space-y-8\">\n              <p className=\"text-14 text-gray-500\">\n                - 모바일: Brand | CategorySwitcher | UserActions (햄버거 메뉴)\n              </p>\n              <p className=\"text-14 text-gray-500\">- 태블릿: Brand | UserActions (햄버거 메뉴)</p>\n              <p className=\"text-14 text-gray-500\">- 데스크탑: Brand | PrimaryNav | UserActions</p>\n              <p className=\"text-14 text-gray-600 mt-16\">\n                💡 모바일/태블릿 뷰포트에서 우측 상단의 햄버거 메뉴를 클릭하면 사이드바가 열립니다.\n              </p>\n            </div>\n          </div>\n        </main>\n      </div>;\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (Mobile.parameters = {
          ...Mobile.parameters,
          docs: {
            ...Mobile.parameters?.docs,
            source: {
              originalSource:
                "{\n  parameters: {\n    viewport: {\n      defaultViewport: 'mobile'\n    },\n    docs: {\n      canvas: {\n        withToolbar: true\n      }\n    }\n  },\n  render: Default.render,\n  args: Default.args\n}",
              ...Mobile.parameters?.docs?.source,
            },
          },
        }),
        (Tablet.parameters = {
          ...Tablet.parameters,
          docs: {
            ...Tablet.parameters?.docs,
            source: {
              originalSource:
                "{\n  parameters: {\n    viewport: {\n      defaultViewport: 'tablet'\n    },\n    docs: {\n      canvas: {\n        withToolbar: true\n      }\n    }\n  },\n  render: Default.render,\n  args: Default.args\n}",
              ...Tablet.parameters?.docs?.source,
            },
          },
        }),
        (Desktop.parameters = {
          ...Desktop.parameters,
          docs: {
            ...Desktop.parameters?.docs,
            source: {
              originalSource:
                "{\n  parameters: {\n    viewport: {\n      defaultViewport: 'desktop'\n    },\n    docs: {\n      canvas: {\n        withToolbar: true\n      }\n    }\n  },\n  render: Default.render,\n  args: Default.args\n}",
              ...Desktop.parameters?.docs?.source,
            },
          },
        }));
    },
    './src/components/organisms/SideBarMenu/SideBarMenu.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { C: () => SideBarMenu });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/next/dist/compiled/react-dom/index.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './src/components/atoms/IconButton/IconButton.tsx'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        );
      const SideBarMenu = ({ open, onClose, children, className }) => {
        const [isMounted, setIsMounted] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1);
        ((0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
          setIsMounted(!0);
        }, []),
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(
            () => (
              (document.body.style.overflow = open ? 'hidden' : ''),
              () => {
                document.body.style.overflow = '';
              }
            ),
            [open]
          ),
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            if (!open) return;
            const handleKeyDown = (e) => {
              'Escape' === e.key && onClose();
            };
            return (
              window.addEventListener('keydown', handleKeyDown),
              () => window.removeEventListener('keydown', handleKeyDown)
            );
          }, [open, onClose]));
        const content = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
          {
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                  'fixed inset-0 bg-black/40 transition-opacity duration-200 z-menu',
                  open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                ),
                onClick: onClose,
                'aria-hidden': 'true',
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('aside', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                  'fixed top-0 right-0 z-menu',
                  'w-225 h-full bg-white shadow-lg',
                  'transform transition-transform duration-250 ease-out',
                  'overflow-y-auto overflow-x-hidden',
                  open ? 'translate-x-0' : 'translate-x-full',
                  className
                ),
                role: 'dialog',
                'aria-modal': 'true',
                'aria-label': '사이드바 메뉴',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                    className: 'flex justify-end items-center p-12 sticky top-0 bg-white z-10',
                    children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_4__.K,
                      {
                        'aria-label': '메뉴 닫기',
                        size: 'md',
                        variant: 'default',
                        onClick: onClose,
                        className: 'text-gray-500 hover:text-gray-900',
                        children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          next_image__WEBPACK_IMPORTED_MODULE_5__.A,
                          {
                            src: '/icons/close-white.svg',
                            alt: '',
                            width: 24,
                            height: 24,
                            'aria-hidden': 'true',
                          }
                        ),
                      }
                    ),
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                    className: 'flex flex-col justify-center gap-8 my-16 mx-24 pb-24',
                    children,
                  }),
                ],
              }),
            ],
          }
        );
        return isMounted
          ? (0, react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)(content, document.body)
          : null;
      };
    },
    './src/constants/notification.constants.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        Nh: () => NOTIFICATION_TARGET_TYPE,
        l4: () => NOTIFICATION_API,
        p1: () => NOTIFICATION_PAGINATION,
        x8: () => SSE_CONFIG,
      });
      const NOTIFICATION_API = {
          STREAM: '/api/v1/notification/stream',
          LIST: '/api/v1/notification',
          UNREAD_COUNT: '/api/v1/notification/unread-count',
          READ: (id) => `/api/v1/notification/${id}/read`,
          BROADCAST: '/api/v1/notification/broadcast',
        },
        NOTIFICATION_TARGET_TYPE = {
          PURCHASE_REQUEST: 'PURCHASE_REQUEST',
          APPROVAL_NOTICE: 'APPROVAL_NOTICE',
          DENIAL_NOTICE: 'DENIAL_NOTICE',
          ADMIN_MESSAGE: 'ADMIN_MESSAGE',
          GENERAL_NOTICE: 'GENERAL_NOTICE',
        },
        SSE_CONFIG = { HEARTBEAT_TIMEOUT: 36e5, RECONNECT_DELAY: 5e3, POLLING_INTERVAL: 6e4 },
        NOTIFICATION_PAGINATION = { DEFAULT_PAGE: 1, DEFAULT_LIMIT: 10, MODAL_LIMIT: 20 };
    },
    './src/features/notification/queries/notification.queries.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        qn: () => notificationKeys,
        Yf: () => useBroadcastNotification,
        SF: () => useMarkNotificationAsRead,
        E$: () => useNotifications,
        J9: () => useUnreadNotificationCount,
      });
      var useQuery = __webpack_require__(
          './node_modules/@tanstack/react-query/build/modern/useQuery.js'
        ),
        QueryClientProvider = __webpack_require__(
          './node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js'
        ),
        useMutation = __webpack_require__(
          './node_modules/@tanstack/react-query/build/modern/useMutation.js'
        ),
        api = __webpack_require__('./src/utils/api.ts'),
        notification_constants = __webpack_require__('./src/constants/notification.constants.ts');
      const notificationApi_getNotifications = async (
          page = notification_constants.p1.DEFAULT_PAGE,
          limit = notification_constants.p1.DEFAULT_LIMIT
        ) => {
          const response = await (0, api.v$)(
            `${notification_constants.l4.LIST}?page=${page}&limit=${limit}`,
            { method: 'GET' }
          );
          if (!response.ok) {
            let errorMessage = '알림 목록 조회 실패';
            try {
              errorMessage = (await response.json()).message || errorMessage;
            } catch {}
            throw new Error(errorMessage);
          }
          const data = await response.json();
          if (!data.success || !Array.isArray(data.data))
            throw new Error(data.message || '알림 데이터 형식이 올바르지 않습니다.');
          return data;
        },
        notificationApi_getUnreadCount = async () => {
          const response = await (0, api.v$)(notification_constants.l4.UNREAD_COUNT, {
            method: 'GET',
          });
          if (!response.ok) {
            let errorMessage = '읽지 않은 알림 수 조회 실패';
            try {
              errorMessage = (await response.json()).message || errorMessage;
            } catch {}
            throw new Error(errorMessage);
          }
          const data = await response.json();
          if (!data.success || 'number' != typeof data.data?.count)
            throw new Error(data.message || '알림 수 데이터 형식이 올바르지 않습니다.');
          return data;
        },
        notificationApi_markAsRead = async (id) => {
          const response = await (0, api.v$)(notification_constants.l4.READ(id), {
            method: 'PATCH',
          });
          if (!response.ok) {
            let errorMessage = '알림 읽음 처리 실패';
            try {
              errorMessage = (await response.json()).message || errorMessage;
            } catch {}
            throw new Error(errorMessage);
          }
          const data = await response.json();
          if (!data.success || !data.data)
            throw new Error(data.message || '알림 읽음 처리 응답 형식이 올바르지 않습니다.');
          return data;
        },
        notificationApi_broadcastNotification = async (content) => {
          const response = await (0, api.v$)(notification_constants.l4.BROADCAST, {
            method: 'POST',
            body: JSON.stringify({ content }),
          });
          if (!response.ok) {
            let errorMessage = '전체 알림 발송 실패';
            try {
              errorMessage = (await response.json()).message || errorMessage;
            } catch {}
            throw new Error(errorMessage);
          }
          const data = await response.json();
          if (!data.success) throw new Error(data.message || '전체 알림 발송에 실패했습니다.');
          return data;
        };
      var staleTime = __webpack_require__('./src/constants/staleTime.ts');
      const notificationKeys = {
        all: ['notification'],
        list: (page, limit) => [...notificationKeys.all, 'list', page, limit],
        unreadCount: () => [...notificationKeys.all, 'unread-count'],
      };
      function useNotifications(params) {
        const {
          page = notification_constants.p1.DEFAULT_PAGE,
          limit = notification_constants.p1.DEFAULT_LIMIT,
          enabled = !0,
        } = params || {};
        return (0, useQuery.I)({
          queryKey: notificationKeys.list(page, limit),
          queryFn: () => notificationApi_getNotifications(page, limit),
          staleTime: staleTime.S.SHORT,
          enabled,
        });
      }
      function useUnreadNotificationCount(options) {
        const { enabled = !0 } = options || {};
        return (0, useQuery.I)({
          queryKey: notificationKeys.unreadCount(),
          queryFn: () => notificationApi_getUnreadCount(),
          staleTime: staleTime.S.SHORT,
          enabled,
          refetchInterval: notification_constants.x8.POLLING_INTERVAL,
          refetchIntervalInBackground: !1,
        });
      }
      function useMarkNotificationAsRead() {
        const queryClient = (0, QueryClientProvider.jE)();
        return (0, useMutation.n)({
          mutationFn: (id) => notificationApi_markAsRead(id),
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: notificationKeys.all });
          },
        });
      }
      function useBroadcastNotification() {
        const queryClient = (0, QueryClientProvider.jE)();
        return (0, useMutation.n)({
          mutationFn: (content) => notificationApi_broadcastNotification(content),
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: notificationKeys.all });
          },
        });
      }
    },
    './src/hooks/useToast.ts'(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.d(__webpack_exports__, { d: () => useToast });
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        './node_modules/next/dist/compiled/react/index.js'
      );
      const useToast = (autoCloseDuration = 3e3) => {
        const [showToast, setShowToast] = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),
          [toastVariant, setToastVariant] = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(
            'success'
          ),
          [toastMessage, setToastMessage] = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
        (0, react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
          if (!showToast) return;
          const timer = setTimeout(() => {
            setShowToast(!1);
          }, autoCloseDuration);
          return () => {
            clearTimeout(timer);
          };
        }, [showToast, autoCloseDuration]);
        const triggerToast = (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
            (variant, message) => {
              (setToastVariant(variant), setToastMessage(message), setShowToast(!0));
            },
            []
          ),
          closeToast = (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
            setShowToast(!1);
          }, []);
        return { showToast, toastVariant, toastMessage, triggerToast, closeToast };
      };
    },
  },
]);
