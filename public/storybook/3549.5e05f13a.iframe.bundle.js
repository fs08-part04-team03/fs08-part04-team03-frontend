'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [3549],
  {
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
    './src/features/cart/components/CartSummaryBlockOrg/CartSummaryBlockOrg.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        A: () => CartSummaryBlockOrg_CartSummaryBlockOrg,
      });
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        navigation = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/export-mocks/navigation/index.js'
        ),
        QueryClientProvider = __webpack_require__(
          './node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js'
        ),
        Checkbox = __webpack_require__('./src/components/atoms/Checkbox/Checkbox.tsx'),
        Button = __webpack_require__('./src/components/atoms/Button/Button.tsx'),
        OrderItemCard = __webpack_require__(
          './src/components/molecules/OrderItemCard/OrderItemCard.tsx'
        ),
        PriceText = __webpack_require__('./src/components/atoms/PriceText/PriceText.tsx'),
        Toast = __webpack_require__('./src/components/molecules/Toast/Toast.tsx'),
        constants = __webpack_require__('./src/constants/index.ts'),
        useToast = __webpack_require__('./src/hooks/useToast.ts'),
        utils_logger = __webpack_require__('./src/utils/logger.ts'),
        array = __webpack_require__('./src/utils/array.ts'),
        api = __webpack_require__('./src/features/purchase/constants/api.ts'),
        utils_api = __webpack_require__('./src/utils/api.ts');
      async function purchase_utils_fetchWithAuth(url, options = {}) {
        const response = await (0, utils_api.v$)(url, options);
        if (404 === response.status) {
          let errorMessage = '구매 내역을 찾을 수 없습니다.';
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json'))
            try {
              errorMessage = (await response.json()).message || errorMessage;
            } catch (parseError) {
              utils_logger.v.warn('Failed to parse 404 error response', {
                hasError: !0,
                errorType: parseError instanceof Error ? parseError.constructor.name : 'Unknown',
              });
            }
          throw new Error(errorMessage);
        }
        if (429 === response.status) {
          const retryAfter = response.headers.get('Retry-After');
          let errorMessage = '너무 많은 요청입니다. 잠시 후 다시 시도해주세요.';
          if (retryAfter) {
            const retrySeconds = Number.parseInt(retryAfter, 10);
            if (Number.isFinite(retrySeconds)) {
              errorMessage += ` (약 ${Math.ceil(retrySeconds / 60)}분 후 재시도 가능)`;
            }
          }
          throw new Error(errorMessage);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json'))
          throw (
            await response.text(),
            utils_logger.v.error('API response format error', {
              status: response.status,
              statusText: response.statusText,
              hasContentType: !!contentType,
            }),
            new Error('서버 응답 형식이 올바르지 않습니다.')
          );
        let result;
        try {
          result = await response.json();
        } catch (parseError) {
          throw (
            utils_logger.v.error('JSON parsing error', {
              hasError: !0,
              errorType: parseError instanceof Error ? parseError.constructor.name : 'Unknown',
            }),
            new Error('서버 응답을 파싱할 수 없습니다.')
          );
        }
        if (!result.success || !response.ok) {
          utils_logger.v.error('API request failed', {
            status: response.status,
            statusText: response.statusText,
            method: options.method || 'GET',
            hasResult: !!result,
          });
          const errorMessage =
            result.error?.message ||
            result.message ||
            (400 === response.status
              ? '잘못된 요청입니다. 입력값을 확인해주세요.'
              : '요청에 실패했습니다.');
          throw new Error(errorMessage);
        }
        return result;
      }
      var cart_api = __webpack_require__('./src/features/cart/api/cart.api.ts'),
        cart_keys = __webpack_require__('./src/features/cart/queries/cart.keys.ts');
      const CartSummaryBlockOrg = ({ dataState, actionHandlers }) => {
          const { cartRole, items, budget = 0, loading = !1 } = dataState,
            router = (0, navigation.useRouter)(),
            params = (0, navigation.useParams)(),
            queryClient = (0, QueryClientProvider.jE)(),
            { triggerToast } = (0, useToast.d)(),
            companyId = 'string' == typeof params?.companyId ? params.companyId : '',
            [checkedIds, setCheckedIds] = (0, react.useState)([]),
            [showBudgetToast, setShowBudgetToast] = (0, react.useState)(!1),
            [errorMessage, setErrorMessage] = (0, react.useState)(null),
            [isPurchasing, setIsPurchasing] = (0, react.useState)(!1),
            isAdminRole = 'manager' === cartRole || 'admin' === cartRole;
          (0, react.useEffect)(() => {
            setCheckedIds((prev) => prev.filter((id) => items.some((i) => i.cartItemId === id)));
          }, [items]);
          const allChecked = items.length > 0 && checkedIds.length === items.length,
            selectedItems = (0, react.useMemo)(
              () => (0, array.as)(items, checkedIds, 'cartItemId'),
              [items, checkedIds]
            ),
            totalProductPrice = (0, react.useMemo)(
              () => (0, array.mN)(selectedItems),
              [selectedItems]
            ),
            totalPrice = totalProductPrice + 0,
            remainBudget = budget - totalPrice,
            isBudgetExceeded = isAdminRole && remainBudget < 0;
          (0, react.useEffect)(() => {
            isAdminRole && setShowBudgetToast(isBudgetExceeded);
          }, [isBudgetExceeded, isAdminRole]);
          const submitButtonLabel = (0, react.useMemo)(
              () =>
                'admin' === cartRole && isBudgetExceeded
                  ? '예산 관리'
                  : 'manager' === cartRole && isBudgetExceeded
                    ? '긴급 구매 요청'
                    : '구매 요청',
              [cartRole, isBudgetExceeded]
            ),
            handleAdminPurchaseNow = async (item) => {
              if (
                isAdminRole &&
                checkedIds.includes(item.cartItemId) &&
                !isBudgetExceeded &&
                !loading &&
                !isPurchasing
              )
                try {
                  (setIsPurchasing(!0),
                    await (async function purchaseNow(request) {
                      return (
                        await purchase_utils_fetchWithAuth(api.S.ADMIN_PURCHASE_NOW, {
                          method: 'POST',
                          body: JSON.stringify(request),
                        })
                      ).data;
                    })({ productId: item.productId, quantity: item.quantity }));
                  const cartItemIdToDelete = item.cartItemId;
                  (cartItemIdToDelete &&
                    (await cart_api.z.deleteFromCart(cartItemIdToDelete).catch((deleteError) => {
                      utils_logger.v.error('Failed to delete cart item after purchase', {
                        hasError: !0,
                        errorType:
                          deleteError instanceof Error ? deleteError.constructor.name : 'Unknown',
                        cartItemId: cartItemIdToDelete,
                      });
                    })),
                    queryClient
                      .invalidateQueries({ queryKey: cart_keys.z.all })
                      .then(() => {
                        queryClient.refetchQueries({ queryKey: cart_keys.z.all }).catch(() => {});
                      })
                      .catch((error) => {
                        utils_logger.v.error('Failed to invalidate cart queries', {
                          hasError: !0,
                          errorType: error instanceof Error ? error.constructor.name : 'Unknown',
                        });
                      }),
                    companyId &&
                      (router.push(constants.vp.ORDER_COMPLETED(companyId)),
                      triggerToast('success', '즉시 구매가 완료되었습니다.')));
                } catch (error) {
                  (utils_logger.v.error('[CartSummaryBlock] 즉시 구매 실패', {
                    message: error instanceof Error ? error.message : '알 수 없는 오류',
                  }),
                    setErrorMessage('즉시 구매에 실패했습니다.'));
                } finally {
                  setIsPurchasing(!1);
                }
            },
            handleManagerUrgentPurchase = async () => {
              if (0 !== checkedIds.length && !loading && !isPurchasing)
                try {
                  setIsPurchasing(!0);
                  const result = await (async function urgentRequestPurchase(request) {
                    return (
                      await purchase_utils_fetchWithAuth(api.S.USER_URGENT_REQUEST_PURCHASE, {
                        method: 'POST',
                        body: JSON.stringify(request),
                      })
                    ).data;
                  })({
                    items: selectedItems.map((item) => ({
                      productId: item.productId,
                      quantity: item.quantity,
                    })),
                    shippingFee: 0,
                    requestMessage: '긴급 구매 요청',
                  });
                  (checkedIds.length > 0 &&
                    (await cart_api.z.deleteMultiple(checkedIds).catch((deleteError) => {
                      utils_logger.v.error('Failed to delete cart items after urgent purchase', {
                        hasError: !0,
                        errorType:
                          deleteError instanceof Error ? deleteError.constructor.name : 'Unknown',
                        cartItemIds: checkedIds,
                      });
                    })),
                    queryClient
                      .invalidateQueries({ queryKey: cart_keys.z.all })
                      .then(() => {
                        queryClient.refetchQueries({ queryKey: cart_keys.z.all }).catch(() => {});
                      })
                      .catch((error) => {
                        utils_logger.v.error('Failed to invalidate cart queries', {
                          hasError: !0,
                          errorType: error instanceof Error ? error.constructor.name : 'Unknown',
                        });
                      }),
                    companyId &&
                      (router.push(
                        `${constants.vp.ORDER_COMPLETED(companyId)}${result?.id ? `?id=${result.id}` : ''}`
                      ),
                      triggerToast('success', '긴급 구매 요청이 완료되었습니다.')));
                } catch (error) {
                  (utils_logger.v.error('Urgent purchase request failed', { error }),
                    setErrorMessage('긴급 구매 요청에 실패했습니다.'));
                } finally {
                  setIsPurchasing(!1);
                }
            },
            handleManagerPurchaseRequest = async () => {
              if (0 !== checkedIds.length && !loading && !isPurchasing)
                try {
                  setIsPurchasing(!0);
                  const result = await (async function purchaseNowMultiple(request) {
                    return (
                      await purchase_utils_fetchWithAuth(api.S.ADMIN_PURCHASE_NOW, {
                        method: 'POST',
                        body: JSON.stringify(request),
                      })
                    ).data;
                  })({
                    items: selectedItems.map((item) => ({
                      productId: item.productId,
                      quantity: item.quantity,
                    })),
                    shippingFee: 0,
                  });
                  (checkedIds.length > 0 &&
                    (await cart_api.z.deleteMultiple(checkedIds).catch((deleteError) => {
                      utils_logger.v.error('Failed to delete cart items after purchase request', {
                        hasError: !0,
                        errorType:
                          deleteError instanceof Error ? deleteError.constructor.name : 'Unknown',
                        cartItemIds: checkedIds,
                      });
                    })),
                    queryClient
                      .invalidateQueries({ queryKey: cart_keys.z.all })
                      .then(() => {
                        queryClient.refetchQueries({ queryKey: cart_keys.z.all }).catch(() => {});
                      })
                      .catch((error) => {
                        utils_logger.v.error('Failed to invalidate cart queries', {
                          hasError: !0,
                          errorType: error instanceof Error ? error.constructor.name : 'Unknown',
                        });
                      }),
                    companyId &&
                      (router.push(
                        `${constants.vp.ORDER_COMPLETED(companyId)}${result?.id ? `?id=${result.id}` : ''}`
                      ),
                      triggerToast('success', '구매 요청이 완료되었습니다.')));
                } catch (error) {
                  (utils_logger.v.error('Purchase request failed', { error }),
                    setErrorMessage('구매 요청에 실패했습니다.'));
                } finally {
                  setIsPurchasing(!1);
                }
            };
          return (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
              (0, jsx_runtime.jsxs)('div', {
                className: 'mx-auto w-327 tablet:w-696 desktop:w-1150',
                children: [
                  (0, jsx_runtime.jsxs)('div', {
                    className:
                      'rounded-default bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.12)] overflow-hidden flex flex-col',
                    children: [
                      (0, jsx_runtime.jsxs)('div', {
                        className:
                          'flex items-center justify-between px-12 py-16 tablet:px-16 desktop:px-20 shrink-0',
                        children: [
                          (0, jsx_runtime.jsxs)('div', {
                            className: 'flex items-center gap-10',
                            children: [
                              (0, jsx_runtime.jsx)(Checkbox.A, {
                                checked: allChecked,
                                onChange: (checked) => {
                                  setCheckedIds(checked ? items.map((i) => i.cartItemId) : []);
                                },
                                'aria-label': '전체 선택',
                              }),
                              (0, jsx_runtime.jsxs)('span', {
                                className:
                                  'text-black font-bold text-16 tablet:text-18 tracking--0.4 tablet:tracking--0.45',
                                children: ['전체 선택 (', items.length, '개)'],
                              }),
                            ],
                          }),
                          (0, jsx_runtime.jsx)('button', {
                            type: 'button',
                            onClick: () => {
                              loading ||
                                isPurchasing ||
                                (actionHandlers?.onDeleteSelected?.(checkedIds), setCheckedIds([]));
                            },
                            disabled: loading || isPurchasing,
                            className:
                              'text-gray-600 underline text-14 tablet:text-16 tracking--0.35 tablet:tracking--0.4 cursor-pointer',
                            children: '선택 삭제',
                          }),
                        ],
                      }),
                      (0, jsx_runtime.jsx)('div', {
                        className:
                          'flex flex-col gap-12 overflow-y-auto scrollbar-none max-h-349 tablet:max-h-516 desktop:max-h-540',
                        children: items.map((item) => {
                          const isChecked = checkedIds.includes(item.cartItemId),
                            purchaseButtonLabel = 'user' === cartRole ? '바로 요청' : '즉시 구매',
                            purchaseButtonDisabled =
                              'user' === cartRole ||
                              !isChecked ||
                              isBudgetExceeded ||
                              isPurchasing ||
                              loading;
                          return (0, jsx_runtime.jsx)(
                            OrderItemCard.A,
                            {
                              name: item.name,
                              unitPrice: item.price,
                              quantity: item.quantity,
                              shippingCost: 0,
                              imageSrc: item.imageSrc,
                              productId: item.productId,
                              cartItemId: item.cartItemId,
                              checked: isChecked,
                              onCheckboxChange: (checked) =>
                                ((cartItemId, checked) => {
                                  setCheckedIds((prev) =>
                                    checked
                                      ? [...prev, cartItemId]
                                      : prev.filter((v) => v !== cartItemId)
                                  );
                                })(item.cartItemId, checked),
                              purchaseButtonLabel,
                              purchaseButtonDisabled,
                              onPurchaseClick: () => {
                                purchaseButtonDisabled ||
                                  handleAdminPurchaseNow(item).catch((err) => {
                                    (utils_logger.v.error('[CartSummaryBlock] 즉시 구매 실패', {
                                      message:
                                        err instanceof Error ? err.message : '알 수 없는 오류',
                                    }),
                                      setErrorMessage('즉시 구매 실패'));
                                  });
                              },
                            },
                            item.cartItemId
                          );
                        }),
                      }),
                    ],
                  }),
                  (0, jsx_runtime.jsxs)('div', {
                    className:
                      'mt-40 flex flex-col tablet:flex-row tablet:justify-between tablet:items-start gap-40 tablet:mt-70',
                    children: [
                      (0, jsx_runtime.jsxs)('div', {
                        className: 'flex flex-col gap-14',
                        children: [
                          (0, jsx_runtime.jsxs)('p', {
                            className:
                              'font-bold text-gray-950 text-24 tablet:text-30 tracking--0.6',
                            children: [
                              '총 주문금액 ',
                              (0, jsx_runtime.jsx)(PriceText.A, { value: totalPrice }),
                            ],
                          }),
                          (0, jsx_runtime.jsxs)('p', {
                            className: 'text-16 text-gray-400 tracking--0.4',
                            children: ['주문 상품은 ', totalProductPrice.toLocaleString(), '원'],
                          }),
                          (0, jsx_runtime.jsxs)('p', {
                            className: 'text-16 text-gray-400 tracking--0.4',
                            children: ['배송비는 ', (0).toLocaleString(), '원입니다.'],
                          }),
                          'user' !== cartRole &&
                            budget > 0 &&
                            (0, jsx_runtime.jsxs)('p', {
                              className: 'font-bold text-18 tracking--0.45 text-gray-700',
                              children: [
                                isBudgetExceeded ? '전체 예산 금액' : '남은 예산 금액',
                                ' ',
                                (0, jsx_runtime.jsx)(PriceText.A, {
                                  value: isBudgetExceeded ? budget : remainBudget,
                                }),
                              ],
                            }),
                        ],
                      }),
                      (0, jsx_runtime.jsxs)('div', {
                        className:
                          'flex flex-col items-center gap-16 ' +
                          ('user' === cartRole ? 'tablet:gap-20' : 'tablet:gap-34'),
                        children: [
                          (0, jsx_runtime.jsx)(Button.A, {
                            variant: 'secondary',
                            className:
                              'w-327 h-64 text-14 cursor-pointer font-bold tracking--0.4 tablet:w-296 tablet:text-16',
                            inactive: loading || isPurchasing,
                            onClick: actionHandlers?.onContinueShopping,
                            children: '계속 쇼핑하기',
                          }),
                          (0, jsx_runtime.jsx)(Button.A, {
                            variant: 'primary',
                            className:
                              'w-327 h-64 text-14 cursor-pointer font-bold tracking--0.4 tablet:w-296 tablet:text-16',
                            inactive: 0 === checkedIds.length || loading || isPurchasing,
                            onClick: () => {
                              (async () => {
                                loading ||
                                  isPurchasing ||
                                  ('admin' === cartRole && isBudgetExceeded
                                    ? actionHandlers?.onGoBudgetManage?.()
                                    : 'manager' === cartRole && isBudgetExceeded
                                      ? await handleManagerUrgentPurchase()
                                      : !isAdminRole || isBudgetExceeded
                                        ? actionHandlers?.onSubmit?.(checkedIds)
                                        : await handleManagerPurchaseRequest());
                              })().catch(() => {
                                setErrorMessage('요청 처리 중 오류가 발생했습니다.');
                              });
                            },
                            children: submitButtonLabel,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              showBudgetToast &&
                (0, jsx_runtime.jsx)('div', {
                  className: 'fixed top-60 left-1/2 -translate-x-1/2 z-toast tablet:top-30',
                  children: (0, jsx_runtime.jsx)(Toast.y, {
                    variant: 'error',
                    amount: remainBudget.toString(),
                    onClose: () => setShowBudgetToast(!1),
                  }),
                }),
              errorMessage &&
                (0, jsx_runtime.jsx)('div', {
                  className: 'fixed top-60 left-1/2 -translate-x-1/2 z-toast tablet:top-30',
                  children: (0, jsx_runtime.jsx)(Toast.y, {
                    variant: 'custom',
                    message: errorMessage,
                    onClose: () => setErrorMessage(null),
                  }),
                }),
            ],
          });
        },
        CartSummaryBlockOrg_CartSummaryBlockOrg = CartSummaryBlockOrg;
      CartSummaryBlockOrg.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'CartSummaryBlockOrg',
        props: {
          dataState: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'object',
              raw: '{\n  cartRole: CartRole;\n  items: OrderItem[];\n  budget?: number;\n  loading?: boolean;\n}',
              signature: {
                properties: [
                  { key: 'cartRole', value: { name: 'CartRole', required: !0 } },
                  {
                    key: 'items',
                    value: {
                      name: 'Array',
                      elements: [{ name: 'OrderItem' }],
                      raw: 'OrderItem[]',
                      required: !0,
                    },
                  },
                  { key: 'budget', value: { name: 'number', required: !1 } },
                  { key: 'loading', value: { name: 'boolean', required: !1 } },
                ],
              },
            },
            description: '',
          },
          actionHandlers: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'object',
              raw: '{\n  onDeleteSelected?: (cartItemIds: string[]) => void;\n  onSubmit?: (cartItemIds: string[]) => void;\n  onGoBudgetManage?: () => void;\n  onContinueShopping?: () => void;\n}',
              signature: {
                properties: [
                  {
                    key: 'onDeleteSelected',
                    value: {
                      name: 'signature',
                      type: 'function',
                      raw: '(cartItemIds: string[]) => void',
                      signature: {
                        arguments: [
                          {
                            type: {
                              name: 'Array',
                              elements: [{ name: 'string' }],
                              raw: 'string[]',
                            },
                            name: 'cartItemIds',
                          },
                        ],
                        return: { name: 'void' },
                      },
                      required: !1,
                    },
                  },
                  {
                    key: 'onSubmit',
                    value: {
                      name: 'signature',
                      type: 'function',
                      raw: '(cartItemIds: string[]) => void',
                      signature: {
                        arguments: [
                          {
                            type: {
                              name: 'Array',
                              elements: [{ name: 'string' }],
                              raw: 'string[]',
                            },
                            name: 'cartItemIds',
                          },
                        ],
                        return: { name: 'void' },
                      },
                      required: !1,
                    },
                  },
                  {
                    key: 'onGoBudgetManage',
                    value: {
                      name: 'signature',
                      type: 'function',
                      raw: '() => void',
                      signature: { arguments: [], return: { name: 'void' } },
                      required: !1,
                    },
                  },
                  {
                    key: 'onContinueShopping',
                    value: {
                      name: 'signature',
                      type: 'function',
                      raw: '() => void',
                      signature: { arguments: [], return: { name: 'void' } },
                      required: !1,
                    },
                  },
                ],
              },
            },
            description: '',
          },
        },
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
