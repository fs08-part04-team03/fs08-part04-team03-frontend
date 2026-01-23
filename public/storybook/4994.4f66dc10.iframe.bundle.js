'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [4994],
  {
    './src/components/molecules/ApprovalRequestModal/ApprovalRequestModal.tsx'(
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
        _components_molecules_UserProfile_UserProfile__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__('./src/components/molecules/UserProfile/UserProfile.tsx'),
        _components_molecules_TextAreaField_TextAreaField__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__('./src/components/molecules/TextAreaField/TextAreaField.tsx'),
        _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './src/components/atoms/Button/Button.tsx'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        _utils_array__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__('./src/utils/array.ts');
      const ApprovalItemIcon = ({ srcOrKey, alt }) => {
          const effectiveSrc =
            srcOrKey && 0 !== srcOrKey.trim().length
              ? srcOrKey.trim()
              : '/icons/no-image-small.svg';
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
            next_image__WEBPACK_IMPORTED_MODULE_6__.A,
            {
              src: effectiveSrc,
              width: 40,
              height: 40,
              alt,
              className: 'w-40 h-40 shrink-0 object-cover',
            }
          );
        },
        ApprovalRequestModal = ({
          open,
          onClose,
          onSubmit,
          user,
          items,
          deliveryFee,
          budget,
          action,
        }) => {
          const [message, setMessage] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            [touched, setTouched] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            textAreaRef = (0, react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null),
            modalRef = (0, react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null),
            calculatedItems = items.map((item) => {
              const { imageSrc: originalImageSrc } = item;
              let imageSrc = originalImageSrc;
              return (
                (imageSrc && '' !== imageSrc.trim()) || (imageSrc = void 0),
                {
                  ...item,
                  totalPrice: item.price * item.quantity,
                  icon: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ApprovalItemIcon, {
                    srcOrKey: imageSrc,
                    alt: item.title,
                  }),
                }
              );
            }),
            orderAmount = (0, _utils_array__WEBPACK_IMPORTED_MODULE_7__.xu)(
              calculatedItems,
              'totalPrice'
            ),
            totalAmount = orderAmount + deliveryFee,
            remainBudget = budget - totalAmount,
            isScrollable = items.length >= 3,
            isMessageValid = message.trim().length > 0;
          ((0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            if (!open) return;
            const handleKey = (e) => {
              'Escape' === e.key && onClose();
            };
            return (
              document.addEventListener('keydown', handleKey),
              () => document.removeEventListener('keydown', handleKey)
            );
          }, [open, onClose]),
            (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
              if (!open) return;
              const modal = modalRef.current;
              if (!modal) return;
              const firstAutofocus = modal.querySelector('[data-autofocus="true"]');
              firstAutofocus && firstAutofocus.focus();
            }, [open]),
            (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
              if (!open) return;
              const modal = modalRef.current;
              if (!modal) return;
              const focusable = Array.from(
                modal.querySelectorAll(
                  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                )
              );
              if (0 === focusable.length) return;
              const first = focusable[0],
                last = focusable[focusable.length - 1],
                trap = (e) => {
                  'Tab' === e.key &&
                    (e.shiftKey
                      ? document.activeElement === first && (e.preventDefault(), last?.focus())
                      : document.activeElement === last && (e.preventDefault(), first?.focus()));
                };
              return (
                document.addEventListener('keydown', trap),
                () => document.removeEventListener('keydown', trap)
              );
            }, [open]),
            (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
              open || (setMessage(''), setTouched(!1));
            }, [open]));
          if (!open) return null;
          const headerText = 'approve' === action ? '구매 요청 승인' : '구매 요청 반려',
            labelText = 'approve' === action ? '승인 메시지' : '반려 메시지',
            placeholderText =
              'approve' === action ? '승인 메시지를 입력해주세요' : '반려 메시지를 입력해주세요',
            buttonText = 'approve' === action ? '승인하기' : '반려하기';
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            role: 'button',
            tabIndex: 0,
            className: 'fixed inset-0 z-modal flex items-center justify-center',
            onClick: onClose,
            onKeyDown: () => {},
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                className: 'absolute inset-0 bg-black opacity-50',
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                ref: modalRef,
                role: 'presentation',
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_5__.A)(
                  'relative bg-white flex flex-col z-10 w-full h-full',
                  'tablet:w-600 tablet:h-976',
                  'desktop:w-600 desktop:h-976'
                ),
                onClick: (e) => e.stopPropagation(),
                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('form', {
                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_5__.A)(
                    'flex flex-col w-full h-full pt-0 pb-24 px-24',
                    'tablet:pt-40 tablet:px-60 tablet:pb-40',
                    'desktop:pt-40 desktop:px-60 desktop:pb-40'
                  ),
                  onSubmit: (e) => {
                    (e.preventDefault(),
                      (async (e) => {
                        (e.preventDefault(),
                          isMessageValid
                            ? await onSubmit(message)
                            : (setTouched(!0), textAreaRef.current?.focus()));
                      })(e).catch(() => {}));
                  },
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('header', {
                      className:
                        'flex flex-col items-center mb-12 py-16 px-8 tablet:mb-20 tablet:py-0 tablet:px-0 desktop:mb-20 desktop:py-15 desktop:px-0',
                      children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h2', {
                        className: 'text-20 font-bold tracking-tight',
                        children: headerText,
                      }),
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('section', {
                      className: 'flex flex-col gap-20 mb-20',
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          _components_molecules_UserProfile_UserProfile__WEBPACK_IMPORTED_MODULE_2__.Ay,
                          {
                            variant: 'default',
                            name: user.name,
                            company: user.company,
                            avatarSrc: user.avatarSrc,
                          }
                        ),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                          className: 'flex gap-6 items-baseline',
                          children: [
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                              className: 'text-14 font-bold text-gray-950 tracking-tight',
                              children: '요청 품목',
                            }),
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
                              className: 'text-12 tablet:text-16 text-gray-950 tracking-tight',
                              children: ['총 ', items.length, '개'],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('section', {
                      className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_5__.A)(
                        'w-full rounded-8 border border-gray-200 bg-white shadow-sm mb-20 px-20 pt-20 pb-5 flex flex-col gap-10',
                        isScrollable && 'max-h-300 overflow-y-auto scrollbar-none'
                      ),
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                          className: 'flex flex-col w-full',
                          children: calculatedItems.map((item) =>
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              'div',
                              {
                                className: 'w-full py-20 px-2 border-b border-gray-200',
                                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                                  'div',
                                  {
                                    className: 'flex w-full justify-between items-center',
                                    children: [
                                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                                        'div',
                                        {
                                          className: 'flex items-center gap-12',
                                          children: [
                                            item.icon,
                                            (0,
                                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                                              'div',
                                              {
                                                className: 'flex flex-col',
                                                children: [
                                                  (0,
                                                  react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                                    'span',
                                                    {
                                                      className:
                                                        'text-12 tablet:text-14 text-gray-900',
                                                      children: item.title,
                                                    }
                                                  ),
                                                  (0,
                                                  react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                                                    'span',
                                                    {
                                                      className:
                                                        'text-12 tablet:text-14 text-gray-900',
                                                      children: [item.price.toLocaleString(), '원'],
                                                    }
                                                  ),
                                                ],
                                              }
                                            ),
                                          ],
                                        }
                                      ),
                                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                                        'div',
                                        {
                                          className: (0,
                                          _utils_clsx__WEBPACK_IMPORTED_MODULE_5__.A)(
                                            'text-right flex flex-col',
                                            'tablet:flex-row tablet:items-center tablet:gap-90'
                                          ),
                                          children: [
                                            (0,
                                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                                              'span',
                                              {
                                                className:
                                                  'text-13 tablet:text-14 text-gray-500 whitespace-nowrap',
                                                children: ['수량 ', item.quantity, '개'],
                                              }
                                            ),
                                            (0,
                                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                                              'span',
                                              {
                                                className:
                                                  'text-16 tablet:text-18 text-gray-700 whitespace-nowrap',
                                                children: [item.totalPrice.toLocaleString(), '원'],
                                              }
                                            ),
                                          ],
                                        }
                                      ),
                                    ],
                                  }
                                ),
                              },
                              `${item.id}-${item.title}`
                            )
                          ),
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                          className:
                            'sticky bottom-0 bg-white pt-16 pb-8 border-t border-gray-200 mt-16',
                          children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                            'div',
                            {
                              className: 'flex flex-col text-14',
                              children: [
                                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                                  className: 'flex justify-between items-center',
                                  children: [
                                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                      'span',
                                      {
                                        className: 'text-12 text-gray-700 tablet:text-14',
                                        children: '주문 금액',
                                      }
                                    ),
                                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                                      'span',
                                      {
                                        className: 'text-16 text-gray-700 tablet:text-16',
                                        children: [orderAmount.toLocaleString(), '원'],
                                      }
                                    ),
                                  ],
                                }),
                                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                                  className: 'flex justify-between items-center',
                                  children: [
                                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                      'span',
                                      {
                                        className: 'text-12 text-gray-700 tablet:text-14',
                                        children: '배송비',
                                      }
                                    ),
                                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                                      'span',
                                      {
                                        className: 'text-16 text-gray-700 tablet:text-16',
                                        children: [deliveryFee.toLocaleString(), '원'],
                                      }
                                    ),
                                  ],
                                }),
                                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                                  className: 'flex justify-between items-center font-bold mt-1',
                                  children: [
                                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                      'span',
                                      {
                                        className: 'text-12 text-gray-950 tablet:text-16',
                                        children: '총 주문 금액',
                                      }
                                    ),
                                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                                      className: 'text-16 text-gray-950 tablet:text-18 font-bold',
                                      children: (0,
                                      react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
                                        children: [totalAmount.toLocaleString(), '원'],
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            }
                          ),
                        }),
                      ],
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('section', {
                      className:
                        'w-full border border-gray-100 rounded-8 py-16 px-8 mb-20 flex justify-between items-center',
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                          className: 'text-14 tablet:text-16 font-bold',
                          children: '남은 예산 금액',
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
                          className: 'text-18 tablet:text-20 font-bold',
                          children: [remainBudget.toLocaleString(), '원'],
                        }),
                      ],
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('section', {
                      className: 'mb-18 tablet:mb-9 flex flex-col gap-1',
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('label', {
                          htmlFor: 'approvalMessage',
                          className: 'text-14 font-bold text-gray-950 tracking-tight mb-12',
                          children: labelText,
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          _components_molecules_TextAreaField_TextAreaField__WEBPACK_IMPORTED_MODULE_3__.A,
                          {
                            id: 'approvalMessage',
                            ref: textAreaRef,
                            placeholder: placeholderText,
                            value: message,
                            onFocus: () => setTouched(!0),
                            onBlur: () => setTouched(!0),
                            onChange: (e) => {
                              e.target.value.length <= 50 && setMessage(e.target.value);
                            },
                            error: touched && !isMessageValid,
                            label: void 0,
                            className: 'scrollbar-none',
                          }
                        ),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                          className: 'flex justify-between mt-1 text-14',
                          children: [
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                              className: 'text-red-500',
                              children:
                                touched && !isMessageValid ? `${placeholderText} (최대 50자)` : ' ',
                            }),
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
                              className: 'text-gray-400',
                              children: [message.length, '/50'],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('footer', {
                      className: 'flex gap-20 w-full',
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_4__.A,
                          {
                            variant: 'secondary',
                            size: 'lg',
                            className: 'flex-1 h-56 cursor-pointer',
                            type: 'button',
                            onClick: onClose,
                            children: '취소',
                          }
                        ),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_4__.A,
                          {
                            variant: 'primary',
                            size: 'lg',
                            className: 'flex-1 h-56 cursor-pointer',
                            type: 'submit',
                            inactive: !isMessageValid,
                            children: buttonText,
                          }
                        ),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = ApprovalRequestModal;
      ApprovalRequestModal.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'ApprovalRequestModal',
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
          onSubmit: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(message: string) => void | Promise<void>',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'message' }],
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
          user: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'object',
              raw: '{\n  name: string;\n  company: { name: string };\n  avatarSrc?: string;\n}',
              signature: {
                properties: [
                  { key: 'name', value: { name: 'string', required: !0 } },
                  {
                    key: 'company',
                    value: {
                      name: 'signature',
                      type: 'object',
                      raw: '{ name: string }',
                      signature: {
                        properties: [{ key: 'name', value: { name: 'string', required: !0 } }],
                      },
                      required: !0,
                    },
                  },
                  { key: 'avatarSrc', value: { name: 'string', required: !1 } },
                ],
              },
            },
            description: '',
          },
          items: {
            required: !0,
            tsType: { name: 'Array', elements: [{ name: 'Item' }], raw: 'Item[]' },
            description: '',
          },
          deliveryFee: { required: !0, tsType: { name: 'number' }, description: '' },
          budget: { required: !0, tsType: { name: 'number' }, description: '' },
          action: {
            required: !0,
            tsType: {
              name: 'union',
              raw: "'approve' | 'reject'",
              elements: [
                { name: 'literal', value: "'approve'" },
                { name: 'literal', value: "'reject'" },
              ],
            },
            description: '',
          },
        },
      };
    },
    './src/components/molecules/TextAreaField/TextAreaField.tsx'(
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
        _utils_clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const TextAreaField = (0, react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(
        ({ label, placeholder, error = !1, className, ...props }, ref) => {
          const uniqueId = (0, react__WEBPACK_IMPORTED_MODULE_1__.useId)(),
            inputId = label ? `textarea-${uniqueId}` : void 0;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)('flex flex-col', className),
            children: [
              label &&
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('label', {
                  htmlFor: inputId,
                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                    'text-16 font-bold text-gray-950 tracking-tight mb-1'
                  ),
                  children: label,
                }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('textarea', {
                ref,
                id: inputId,
                placeholder,
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                  'w-full tablet:w-480 h-140',
                  'px-12 py-8',
                  'text-16 tracking-tight',
                  'font-sans font-normal text-gray-950',
                  'border border-gray-300 rounded-default',
                  'bg-transparent',
                  'resize-none',
                  'focus:outline-none focus:border-gray-500',
                  error && 'border-error-500 focus:border-error-500',
                  'placeholder:text-gray-500',
                  'disabled:text-gray-300 disabled:border-gray-200 disabled:cursor-not-allowed'
                ),
                ...props,
              }),
            ],
          });
        }
      );
      TextAreaField.displayName = 'TextAreaField';
      const __WEBPACK_DEFAULT_EXPORT__ = TextAreaField;
      TextAreaField.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'TextAreaField',
        props: {
          label: { required: !1, tsType: { name: 'string' }, description: '' },
          placeholder: { required: !1, tsType: { name: 'string' }, description: '' },
          error: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
        composes: ['Omit'],
      };
    },
    './src/utils/array.ts'(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      function filterByIds(items, ids, idField = 'id') {
        const idSet = new Set(ids.map(String));
        return items.filter((item) => idSet.has(String(item[idField])));
      }
      function sumPrices(items) {
        return items.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0);
      }
      function sumBy(items, field) {
        return items.reduce((sum, item) => {
          const value = item[field];
          return sum + ('number' == typeof value ? value : 0);
        }, 0);
      }
      function sumTotal(items, priceField, quantityField) {
        return items.reduce((sum, item) => {
          const price = item[priceField],
            quantity = item[quantityField];
          return (
            sum +
            ('number' == typeof price ? price : 0) * ('number' == typeof quantity ? quantity : 1)
          );
        }, 0);
      }
      __webpack_require__.d(__webpack_exports__, {
        _l: () => sumTotal,
        as: () => filterByIds,
        mN: () => sumPrices,
        xu: () => sumBy,
      });
    },
  },
]);
