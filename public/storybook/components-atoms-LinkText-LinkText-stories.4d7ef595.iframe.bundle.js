'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [4166],
  {
    './src/components/atoms/LinkText/LinkText.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          CoKrDomain: () => CoKrDomain,
          Default: () => Default,
          MobileSize: () => MobileSize,
          NotClickable: () => NotClickable,
          WithoutProtocol: () => WithoutProtocol,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Atoms/LinkText',
          component: __webpack_require__('./src/components/atoms/LinkText/LinkText.tsx').A,
          parameters: { layout: 'centered' },
          tags: ['autodocs'],
          argTypes: {
            url: { control: 'text', description: '표시할 URL' },
            className: { control: 'text', description: '텍스트 크기 클래스' },
            clickable: { control: 'boolean', description: '클릭 가능 여부' },
          },
        },
        Default = {
          args: {
            url: 'https://www.codeit.com/item123',
            className: 'text-16 tracking--0.4 text-gray-950',
            clickable: !0,
          },
        },
        WithoutProtocol = {
          args: {
            url: 'www.coupang.com/products/item123',
            className: 'text-16 tracking--0.4 text-gray-950',
            clickable: !0,
          },
        },
        CoKrDomain = {
          args: {
            url: 'https://www.example.co.kr/products/item123',
            className: 'text-16 tracking--0.4 text-gray-950',
            clickable: !0,
          },
        },
        NotClickable = {
          args: {
            url: 'https://www.coupang.com/products/item123',
            className: 'text-16 tracking--0.4 text-gray-950',
            clickable: !1,
          },
        },
        MobileSize = {
          args: {
            url: 'https://www.coupang.com/products/item123',
            className: 'text-14 tracking--0.35 text-gray-600',
            clickable: !0,
          },
        },
        __namedExportsOrder = [
          'Default',
          'WithoutProtocol',
          'CoKrDomain',
          'NotClickable',
          'MobileSize',
        ];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    url: 'https://www.codeit.com/item123',\n    className: 'text-16 tracking--0.4 text-gray-950',\n    clickable: true\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (WithoutProtocol.parameters = {
          ...WithoutProtocol.parameters,
          docs: {
            ...WithoutProtocol.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    url: 'www.coupang.com/products/item123',\n    className: 'text-16 tracking--0.4 text-gray-950',\n    clickable: true\n  }\n}",
              ...WithoutProtocol.parameters?.docs?.source,
            },
          },
        }),
        (CoKrDomain.parameters = {
          ...CoKrDomain.parameters,
          docs: {
            ...CoKrDomain.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    url: 'https://www.example.co.kr/products/item123',\n    className: 'text-16 tracking--0.4 text-gray-950',\n    clickable: true\n  }\n}",
              ...CoKrDomain.parameters?.docs?.source,
            },
          },
        }),
        (NotClickable.parameters = {
          ...NotClickable.parameters,
          docs: {
            ...NotClickable.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    url: 'https://www.coupang.com/products/item123',\n    className: 'text-16 tracking--0.4 text-gray-950',\n    clickable: false\n  }\n}",
              ...NotClickable.parameters?.docs?.source,
            },
          },
        }),
        (MobileSize.parameters = {
          ...MobileSize.parameters,
          docs: {
            ...MobileSize.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    url: 'https://www.coupang.com/products/item123',\n    className: 'text-14 tracking--0.35 text-gray-600',\n    clickable: true\n  }\n}",
              ...MobileSize.parameters?.docs?.source,
            },
          },
        }));
    },
    './src/components/atoms/LinkText/LinkText.tsx'(
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
        ),
        _components_molecules_CustomModal_CustomModal__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__('./src/components/molecules/CustomModal/CustomModal.tsx');
      const LinkText = ({ url, className, clickable = !0 }) => {
          const [linkModalOpen, setLinkModalOpen] = (0,
            react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            formatLinkDisplay = (0, react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((linkUrl) => {
              if (!linkUrl) return '';
              try {
                let fullUrl = linkUrl;
                linkUrl.startsWith('http://') ||
                  linkUrl.startsWith('https://') ||
                  (fullUrl = `https://${linkUrl}`);
                const { hostname } = new URL(fullUrl);
                return `${hostname}`;
              } catch {
                return linkUrl;
              }
            }, []),
            handleLinkClick = (0, react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(
              (e) => {
                clickable && (e.stopPropagation(), url && setLinkModalOpen(!0));
              },
              [url, clickable]
            ),
            handleLinkModalConfirm = (0, react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
              if (url) {
                let linkUrl = url;
                (linkUrl.startsWith('http://') ||
                  linkUrl.startsWith('https://') ||
                  (linkUrl = `https://${linkUrl}`),
                  window.open(linkUrl, '_blank', 'noopener,noreferrer'));
              }
              setLinkModalOpen(!1);
            }, [url]),
            handleLinkModalClose = (0, react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
              setLinkModalOpen(!1);
            }, []),
            displayText = formatLinkDisplay(url);
          return clickable
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                {
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                        className,
                        'cursor-pointer hover:underline'
                      ),
                      onClick: handleLinkClick,
                      role: 'button',
                      tabIndex: 0,
                      onKeyDown: (e) => {
                        ('Enter' !== e.key && ' ' !== e.key) ||
                          (e.preventDefault(), handleLinkClick(e));
                      },
                      children: displayText,
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _components_molecules_CustomModal_CustomModal__WEBPACK_IMPORTED_MODULE_3__.A,
                      {
                        open: linkModalOpen,
                        type: 'link-confirm',
                        description: `외부 링크로 이동하시겠습니까?\n${displayText}`,
                        onClose: handleLinkModalClose,
                        onConfirm: handleLinkModalConfirm,
                      }
                    ),
                  ],
                }
              )
            : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                className,
                children: displayText,
              });
        },
        __WEBPACK_DEFAULT_EXPORT__ = LinkText;
      LinkText.__docgenInfo = {
        description:
          'URL을 도메인까지만 표시하고 클릭 시 모달을 띄워 확인 후 이동하는 컴포넌트\n예: https://www.codeit.com/products → www.codeit.com',
        methods: [],
        displayName: 'LinkText',
        props: {
          url: { required: !0, tsType: { name: 'string' }, description: '표시할 URL' },
          className: {
            required: !1,
            tsType: { name: 'string' },
            description: '텍스트 크기 클래스',
          },
          clickable: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '클릭 가능 여부 (기본값: true)',
            defaultValue: { value: 'true', computed: !1 },
          },
        },
      };
    },
    './src/utils/logger.ts'(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.d(__webpack_exports__, { v: () => logger });
      __webpack_require__('./node_modules/console-browserify/index.js');
      const logger = {
        error: (message, ...args) => {
          false;
        },
        warn: (message, ...args) => {
          false;
        },
        info: (message, ...args) => {
          false;
        },
      };
    },
  },
]);
