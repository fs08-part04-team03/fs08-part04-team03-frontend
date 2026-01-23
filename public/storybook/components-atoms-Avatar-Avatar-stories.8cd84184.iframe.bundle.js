'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [2430],
  {
    './src/components/atoms/Avatar/Avatar.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          BgColorGray100: () => BgColorGray100,
          BgColorGray50: () => BgColorGray50,
          Clickable: () => Clickable,
          DefaultIcon: () => DefaultIcon,
          Size24: () => Size24,
          Size24WithImage: () => Size24WithImage,
          Size32: () => Size32,
          Size32WithImage: () => Size32WithImage,
          WithImage: () => WithImage,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Atoms/Avatar',
          component: __webpack_require__('./src/components/atoms/Avatar/Avatar.tsx').e,
          tags: ['autodocs'],
          argTypes: {
            size: { control: 'radio', options: [24, 32] },
            bgColor: { control: 'radio', options: ['gray-100', 'gray-50'] },
            src: { control: 'text' },
            alt: { control: 'text' },
            onClick: { action: 'clicked' },
          },
        },
        Size24 = { args: { size: 24 } },
        Size32 = { args: { size: 32 } },
        DefaultIcon = { args: { size: 32 } },
        BgColorGray100 = { args: { size: 32, bgColor: 'gray-100' } },
        BgColorGray50 = { args: { size: 32, bgColor: 'gray-50' } },
        Clickable = { args: { size: 32, onClick: () => {} } },
        WithImage = {
          args: { size: 32, src: '/images/test-profile-image.jpg', alt: 'User Avatar' },
        },
        Size24WithImage = {
          args: { size: 24, src: '/images/test-profile-image.jpg', alt: 'User Avatar' },
        },
        Size32WithImage = {
          args: { size: 32, src: '/images/test-profile-image.jpg', alt: 'User Avatar' },
        },
        __namedExportsOrder = [
          'Size24',
          'Size32',
          'DefaultIcon',
          'BgColorGray100',
          'BgColorGray50',
          'Clickable',
          'WithImage',
          'Size24WithImage',
          'Size32WithImage',
        ];
      ((Size24.parameters = {
        ...Size24.parameters,
        docs: {
          ...Size24.parameters?.docs,
          source: {
            originalSource: '{\n  args: {\n    size: 24\n  }\n}',
            ...Size24.parameters?.docs?.source,
          },
        },
      }),
        (Size32.parameters = {
          ...Size32.parameters,
          docs: {
            ...Size32.parameters?.docs,
            source: {
              originalSource: '{\n  args: {\n    size: 32\n  }\n}',
              ...Size32.parameters?.docs?.source,
            },
          },
        }),
        (DefaultIcon.parameters = {
          ...DefaultIcon.parameters,
          docs: {
            ...DefaultIcon.parameters?.docs,
            source: {
              originalSource: '{\n  args: {\n    size: 32\n  }\n}',
              ...DefaultIcon.parameters?.docs?.source,
            },
          },
        }),
        (BgColorGray100.parameters = {
          ...BgColorGray100.parameters,
          docs: {
            ...BgColorGray100.parameters?.docs,
            source: {
              originalSource: "{\n  args: {\n    size: 32,\n    bgColor: 'gray-100'\n  }\n}",
              ...BgColorGray100.parameters?.docs?.source,
            },
          },
        }),
        (BgColorGray50.parameters = {
          ...BgColorGray50.parameters,
          docs: {
            ...BgColorGray50.parameters?.docs,
            source: {
              originalSource: "{\n  args: {\n    size: 32,\n    bgColor: 'gray-50'\n  }\n}",
              ...BgColorGray50.parameters?.docs?.source,
            },
          },
        }),
        (Clickable.parameters = {
          ...Clickable.parameters,
          docs: {
            ...Clickable.parameters?.docs,
            source: {
              originalSource: '{\n  args: {\n    size: 32,\n    onClick: () => {}\n  }\n}',
              ...Clickable.parameters?.docs?.source,
            },
          },
        }),
        (WithImage.parameters = {
          ...WithImage.parameters,
          docs: {
            ...WithImage.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    size: 32,\n    src: '/images/test-profile-image.jpg',\n    alt: 'User Avatar'\n  }\n}",
              ...WithImage.parameters?.docs?.source,
            },
          },
        }),
        (Size24WithImage.parameters = {
          ...Size24WithImage.parameters,
          docs: {
            ...Size24WithImage.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    size: 24,\n    src: '/images/test-profile-image.jpg',\n    alt: 'User Avatar'\n  }\n}",
              ...Size24WithImage.parameters?.docs?.source,
            },
          },
        }),
        (Size32WithImage.parameters = {
          ...Size32WithImage.parameters,
          docs: {
            ...Size32WithImage.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    size: 32,\n    src: '/images/test-profile-image.jpg',\n    alt: 'User Avatar'\n  }\n}",
              ...Size32WithImage.parameters?.docs?.source,
            },
          },
        }));
    },
    './src/components/atoms/Avatar/Avatar.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { e: () => Avatar });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_2__ =
          (__webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
          __webpack_require__('./node_modules/@storybook/nextjs/dist/images/next-image.js')),
        clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const sizeClass = { 24: 'w-24 h-24', 32: 'w-32 h-32' },
        iconSizeClass = { 24: 12, 32: 16 },
        bgColorClass = { 'gray-100': 'bg-gray-100', 'gray-50': 'bg-gray-50' },
        Avatar = ({
          src,
          alt = 'avatar',
          name,
          size = 32,
          bgColor = 'gray-100',
          className,
          onClick,
          onKeyDown,
          onMouseEnter,
          onMouseLeave,
          style,
          id,
          'aria-label': ariaLabel,
          'aria-labelledby': ariaLabelledBy,
        }) => {
          const effectiveSrc = src,
            handleKeyDown = (event) => {
              (!onClick ||
                ('Enter' !== event.key && ' ' !== event.key) ||
                (event.preventDefault(), onClick(event)),
                onKeyDown?.(event));
            },
            renderContent = () => {
              if (effectiveSrc)
                return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                  {
                    src: effectiveSrc,
                    alt,
                    width: size,
                    height: size,
                    className: 'h-full w-full object-cover rounded-full aspect-square',
                  }
                );
              if (name) {
                const firstChar = name.charAt(0).toUpperCase(),
                  fontSize = 24 === size ? 'text-10' : 'text-14';
                return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                  className: (0, clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                    'font-medium text-gray-950 tracking--0.25',
                    fontSize
                  ),
                  children: firstChar,
                });
              }
              return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                {
                  src: '/icons/user-default.svg',
                  alt: 'Default user avatar',
                  width: iconSizeClass[size],
                  height: iconSizeClass[size],
                  className: 'shrink-0',
                  unoptimized: !0,
                }
              );
            },
            baseClassName = (0, clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
              'relative flex items-center justify-center overflow-hidden rounded-full flex-shrink-0',
              sizeClass[size],
              bgColorClass[bgColor],
              className
            );
          return onClick
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                className: baseClassName,
                onClick,
                onKeyDown: handleKeyDown,
                onMouseEnter,
                onMouseLeave,
                style,
                id,
                'aria-label': ariaLabel,
                'aria-labelledby': ariaLabelledBy,
                role: 'button',
                tabIndex: 0,
                children: renderContent(),
              })
            : onKeyDown
              ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                  className: baseClassName,
                  onKeyDown,
                  onMouseEnter,
                  onMouseLeave,
                  style,
                  id,
                  'aria-label': ariaLabel,
                  'aria-labelledby': ariaLabelledBy,
                  role: 'button',
                  tabIndex: 0,
                  children: renderContent(),
                })
              : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                  className: baseClassName,
                  onMouseEnter,
                  onMouseLeave,
                  style,
                  id,
                  'aria-label': ariaLabel,
                  'aria-labelledby': ariaLabelledBy,
                  children: renderContent(),
                });
        };
      Avatar.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'Avatar',
        props: {
          src: { required: !1, tsType: { name: 'string' }, description: '' },
          alt: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'avatar'", computed: !1 },
          },
          name: { required: !1, tsType: { name: 'string' }, description: '' },
          size: {
            required: !1,
            tsType: {
              name: 'union',
              raw: '24 | 32',
              elements: [
                { name: 'literal', value: '24' },
                { name: 'literal', value: '32' },
              ],
            },
            description: '',
            defaultValue: { value: '32', computed: !1 },
          },
          bgColor: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'gray-100' | 'gray-50'",
              elements: [
                { name: 'literal', value: "'gray-100'" },
                { name: 'literal', value: "'gray-50'" },
              ],
            },
            description: '',
            defaultValue: { value: "'gray-100'", computed: !1 },
          },
        },
      };
    },
  },
]);
