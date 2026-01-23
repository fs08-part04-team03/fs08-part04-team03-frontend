'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [7162],
  {
    './src/components/atoms/Button/Button.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        A: () => __WEBPACK_DEFAULT_EXPORT__,
        X: () => SignupButton,
      });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const baseClass = (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
          'inline-flex items-center justify-center',
          'font-bold',
          'cursor-pointer',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary-500',
          'disabled:opacity-40 disabled:cursor-not-allowed'
        ),
        variantClass = {
          primary: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
            'bg-gray-950 text-gray-50',
            'hover:bg-gray-800',
            'rounded-default'
          ),
          secondary: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
            'bg-white text-gray-900',
            'border border-gray-900',
            'hover:bg-gray-25',
            'rounded-default'
          ),
          signup: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
            'bg-black text-white',
            'hover:bg-gray-700'
          ),
        },
        inactiveClass = (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
          'bg-gray-100 text-gray-300 border border-gray-200',
          'cursor-not-allowed',
          'rounded-default'
        ),
        sizeClass = {
          sm: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)('h-40 text-13 px-16'),
          md: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)('h-44 text-14 px-20'),
          lg: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)('h-64 text-16 px-24'),
        },
        Button = ({
          variant = 'primary',
          size = 'md',
          fullWidth = !1,
          inactive,
          rightIcon,
          children,
          className,
          type = 'button',
          ...rest
        }) => {
          const isSignup = 'signup' === variant;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('button', {
            type,
            disabled: inactive,
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
              baseClass,
              inactive ? inactiveClass : variantClass[variant],
              !isSignup && size && sizeClass[size],
              isSignup && 'w-160 h-44 text-14 px-20 rounded-100',
              fullWidth && 'w-full',
              className
            ),
            ...rest,
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', { children }),
              rightIcon,
            ],
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = Button,
        SignupButton = ({
          inactive,
          rightIcon,
          children,
          className,
          onClick,
          onFocus,
          onBlur,
          id,
          type = 'button',
          'aria-label': ariaLabel,
          fullWidth,
        }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Button, {
            type,
            variant: 'signup',
            inactive,
            rightIcon,
            fullWidth,
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)('gap-4', className),
            onClick,
            onFocus,
            onBlur,
            id,
            'aria-label': ariaLabel,
            children,
          });
      ((Button.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'Button',
        props: {
          type: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'button' | 'submit' | 'reset'",
              elements: [
                { name: 'literal', value: "'button'" },
                { name: 'literal', value: "'submit'" },
                { name: 'literal', value: "'reset'" },
              ],
            },
            description: '',
            defaultValue: { value: "'button'", computed: !1 },
          },
          variant: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'primary' | 'secondary' | 'signup'",
              elements: [
                { name: 'literal', value: "'primary'" },
                { name: 'literal', value: "'secondary'" },
                { name: 'literal', value: "'signup'" },
              ],
            },
            description: '',
            defaultValue: { value: "'primary'", computed: !1 },
          },
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
          fullWidth: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
          inactive: { required: !1, tsType: { name: 'boolean' }, description: '' },
          rightIcon: { required: !1, tsType: { name: 'ReactNode' }, description: '' },
        },
        composes: ['Omit'],
      }),
        (SignupButton.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'SignupButton',
          props: { type: { defaultValue: { value: "'button'", computed: !1 }, required: !1 } },
        }));
    },
    './src/components/molecules/CustomModal/CustomModal.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './src/components/atoms/Button/Button.tsx'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _utils_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__('./src/utils/logger.ts');
      const CustomModal = ({
          open,
          productName,
          cancelCount = 0,
          type,
          description,
          onClose,
          onConfirm,
          onHome,
          onOrder,
          onBudgetRequest,
          onGoToCart,
          onGoToProducts,
        }) => {
          const modalRef = (0, react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            const handleEsc = (e) => {
              'Escape' === e.key && onClose();
            };
            return (
              open && window.addEventListener('keydown', handleEsc),
              () => window.removeEventListener('keydown', handleEsc)
            );
          }, [open, onClose]);
          if (!open) return null;
          const content = {
            delete: {
              title: '상품을 삭제하시겠어요?',
              description: '삭제 후에는 복구할 수 없습니다.',
              buttonLeft: '더 생각해볼게요',
              buttonRight: '상품 삭제',
              icon: '/icons/blue-x.svg',
            },
            cancel: {
              title: '구매 요청을 취소하시겠어요?',
              description: '구매 요청 취소 후에는 복구할 수 없습니다.',
              buttonLeft: '더 생각해볼게요',
              buttonRight: '요청 취소',
              icon: '/icons/red-x.svg',
            },
            approved: {
              title: '승인 완료',
              description: '승인이 완료되었어요!\n구매 내역을 통해 배송 현황을 확인해보세요.',
              buttonLeft: '홈으로',
              buttonRight: '구매 내역 보기',
              icon: '/icons/red-i.svg',
            },
            rejected: {
              title: '요청 반려',
              description: '요청이 반려되었어요!\n목록에서 다른 요청을 확인해보세요.',
              buttonLeft: '홈으로',
              buttonRight: '구매 요청 내역 보기',
              icon: '/icons/red-i.svg',
            },
            'budget-shortage': {
              title: '예산 부족',
              description: '이번 달 남은 예산이 부족합니다.\n예산 증액을 요청해주세요.',
              buttonLeft: '닫기',
              buttonRight: '예산 증액 요청',
              icon: '/icons/red-i.svg',
            },
            'user-delete': {
              title: '계정 탈퇴',
              description: description || '계정을 탈퇴시킬까요?',
              buttonLeft: '더 생각해볼게요',
              buttonRight: '탈퇴시키기',
              icon: '/icons/red-i.svg',
            },
            'purchase-failed': {
              title: '구매 요청 실패',
              description: description || '구매 요청에 실패했습니다.\n나중에 다시 시도해주세요.',
              buttonLeft: '닫기',
              buttonRight: '장바구니로',
              icon: '/icons/red-i.svg',
            },
            'cart-add-failed': {
              title: '장바구니 추가 실패',
              description: description || '나중에 다시 시도해주세요.',
              buttonLeft: '닫기',
              buttonRight: '확인',
              icon: '/icons/red-x.svg',
            },
            'cart-add-success': {
              title: '장바구니에 담았습니다',
              description: description || '장바구니에 상품이 추가되었습니다.',
              buttonLeft: '상품 리스트',
              buttonRight: '장바구니로',
              icon: '/icons/check-circle.svg',
            },
            'link-confirm': {
              title: '외부 링크로 이동',
              description: description || '외부 링크로 이동하시겠습니까?',
              buttonLeft: '취소',
              buttonRight: '이동',
              icon: '/icons/info.svg',
            },
          }[type];
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
              'fixed inset-0 z-50 flex items-center justify-center',
              'bg-black/50 backdrop-blur-sm'
            ),
            role: 'dialog',
            'aria-modal': 'true',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                role: 'button',
                tabIndex: 0,
                'aria-label': '모달 닫기',
                className: 'absolute inset-0',
                onClick: (e) => {
                  modalRef.current && !modalRef.current.contains(e.target) && onClose();
                },
                onKeyDown: (e) => {
                  ('Enter' !== e.key && ' ' !== e.key) || onClose();
                },
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                ref: modalRef,
                role: 'presentation',
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                  'relative bg-white rounded-20 w-327 h-auto p-20 flex flex-col items-center',
                  'tablet:w-512 tablet:h-auto tablet:p-30',
                  'desktop:w-512 desktop:h-auto desktop:p-30'
                ),
                onClick: (e) => e.stopPropagation(),
                children: [
                  'approved' === type ||
                  'rejected' === type ||
                  'budget-shortage' === type ||
                  'user-delete' === type ||
                  'purchase-failed' === type ||
                  'cart-add-failed' === type ||
                  'cart-add-success' === type ||
                  'link-confirm' === type
                    ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                        className: 'flex flex-col items-center gap-5 mb-36',
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h2', {
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                              'text-16 text-center tablet:text-18 desktop:text-18',
                              'font-bold'
                            ),
                            children: content.title,
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                            className:
                              'hidden tablet:flex items-center justify-center w-20 h-20 my-8',
                            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                              { src: content.icon, alt: '아이콘', width: 20, height: 20 }
                            ),
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                            className:
                              'text-14 text-gray-700 text-center tablet:text-16 desktop:text-16 whitespace-pre-line',
                            children: content.description,
                          }),
                        ],
                      })
                    : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                        {
                          children: [
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h2', {
                              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                                'text-16 text-center tablet:text-18 desktop:text-18',
                                'font-extrabold'
                              ),
                              children: content.title,
                            }),
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                              className:
                                'text-14 text-gray-700 mt-8 mb-20 text-center tablet:text-16 tablet:mb-30 desktop:text-16 desktop:mb-30',
                              children: content.description,
                            }),
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                              className: 'flex items-center gap-8 mb-36',
                              children: [
                                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                                  className:
                                    'w-20 h-20 flex items-center justify-center bg-gray-200 rounded-full',
                                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                    next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                                    { src: content.icon, alt: '아이콘', width: 20, height: 20 }
                                  ),
                                }),
                                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                                    'text-14 font-suit tablet:text-16 desktop:text-16',
                                    'cancel' === type ? 'font-extrabold' : 'font-normal'
                                  ),
                                  children:
                                    'cancel' === type && cancelCount > 0
                                      ? `${productName} 외 ${cancelCount}건`
                                      : productName,
                                }),
                              ],
                            }),
                          ],
                        }
                      ),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                    className: 'flex gap-10 tablet:gap-20 desktop:gap-20',
                    children: [
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                        _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_3__.A,
                        {
                          variant: 'secondary',
                          className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                            'w-139 h-50 rounded-none border-r border-gray-200 cursor-pointer text-14',
                            'tablet:w-216 tablet:h-64 tablet:text-16',
                            'desktop:w-216 desktop:h-64 desktop:text-16'
                          ),
                          onClick: ('cart-add-success' === type && onGoToProducts) || onClose,
                          children: content.buttonLeft,
                        }
                      ),
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                        _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_3__.A,
                        {
                          variant: 'primary',
                          className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                            'w-139 h-50 rounded-none cursor-pointer text-14',
                            'rejected' === type ? 'p-0 whitespace-nowrap' : '',
                            'tablet:w-216 tablet:h-64 tablet:text-16',
                            'desktop:w-216 desktop:h-64 desktop:text-16'
                          ),
                          onClick:
                            'approved' === type || 'rejected' === type
                              ? (onOrder ?? onHome)
                              : 'budget-shortage' === type
                                ? onBudgetRequest
                                : 'purchase-failed' === type
                                  ? onConfirm
                                    ? () => {
                                        Promise.resolve(onConfirm()).catch((error) => {
                                          _utils_logger__WEBPACK_IMPORTED_MODULE_5__.v.error(
                                            'CustomModal onConfirm error',
                                            {
                                              hasError: !0,
                                              errorType:
                                                error instanceof Error
                                                  ? error.constructor.name
                                                  : 'Unknown',
                                            }
                                          );
                                        });
                                      }
                                    : void 0
                                  : 'cart-add-failed' === type
                                    ? onConfirm
                                      ? () => {
                                          Promise.resolve(onConfirm()).catch((error) => {
                                            _utils_logger__WEBPACK_IMPORTED_MODULE_5__.v.error(
                                              'CustomModal onConfirm error',
                                              {
                                                hasError: !0,
                                                errorType:
                                                  error instanceof Error
                                                    ? error.constructor.name
                                                    : 'Unknown',
                                              }
                                            );
                                          });
                                        }
                                      : onClose
                                    : 'cart-add-success' === type
                                      ? onGoToCart
                                      : 'link-confirm' === type
                                        ? onConfirm
                                          ? () => {
                                              Promise.resolve(onConfirm()).catch((error) => {
                                                _utils_logger__WEBPACK_IMPORTED_MODULE_5__.v.error(
                                                  'CustomModal onConfirm error',
                                                  {
                                                    hasError: !0,
                                                    errorType:
                                                      error instanceof Error
                                                        ? error.constructor.name
                                                        : 'Unknown',
                                                  }
                                                );
                                              });
                                            }
                                          : void 0
                                        : onConfirm
                                          ? () => {
                                              Promise.resolve(onConfirm()).catch((error) => {
                                                _utils_logger__WEBPACK_IMPORTED_MODULE_5__.v.error(
                                                  'Modal confirm error',
                                                  {
                                                    hasError: !0,
                                                    errorType:
                                                      error instanceof Error
                                                        ? error.constructor.name
                                                        : 'Unknown',
                                                  }
                                                );
                                              });
                                            }
                                          : void 0,
                          children: content.buttonRight,
                        }
                      ),
                    ],
                  }),
                ],
              }),
            ],
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = CustomModal;
      CustomModal.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'CustomModal',
        props: {
          open: { required: !0, tsType: { name: 'boolean' }, description: '' },
          productName: { required: !1, tsType: { name: 'string' }, description: '' },
          cancelCount: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '0', computed: !1 },
          },
          type: {
            required: !0,
            tsType: {
              name: 'union',
              raw: "| 'delete'\n| 'cancel'\n| 'approved'\n| 'rejected'\n| 'budget-shortage'\n| 'user-delete'\n| 'purchase-failed'\n| 'cart-add-failed'\n| 'cart-add-success'\n| 'link-confirm'",
              elements: [
                { name: 'literal', value: "'delete'" },
                { name: 'literal', value: "'cancel'" },
                { name: 'literal', value: "'approved'" },
                { name: 'literal', value: "'rejected'" },
                { name: 'literal', value: "'budget-shortage'" },
                { name: 'literal', value: "'user-delete'" },
                { name: 'literal', value: "'purchase-failed'" },
                { name: 'literal', value: "'cart-add-failed'" },
                { name: 'literal', value: "'cart-add-success'" },
                { name: 'literal', value: "'link-confirm'" },
              ],
            },
            description: '',
          },
          description: { required: !1, tsType: { name: 'string' }, description: '' },
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
          onConfirm: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void | Promise<void>',
              signature: {
                arguments: [],
                return: {
                  name: 'union',
                  raw: 'void | Promise<void>',
                  elements: [
                    { name: 'void' },
                    { name: 'Promise', elements: [{ name: 'void' }], raw: 'Promise<void>' },
                  ],
                },
              },
            },
            description: '',
          },
          onHome: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          onOrder: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          onBudgetRequest: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          onGoToCart: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          onGoToProducts: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
        },
      };
    },
  },
]);
