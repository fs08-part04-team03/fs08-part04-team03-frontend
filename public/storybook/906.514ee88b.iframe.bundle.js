'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [906],
  {
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
    './src/components/molecules/UserProfile/UserProfile.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        Ay: () => __WEBPACK_DEFAULT_EXPORT__,
        a0: () => UserProfileDefault,
      });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__('./node_modules/next/link.js'),
        next_link__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
          next_link__WEBPACK_IMPORTED_MODULE_1__
        ),
        _components_atoms_Avatar_Avatar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/components/atoms/Avatar/Avatar.tsx'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const UserProfileTablet = ({
          name,
          avatarSrc,
          profileHref = '/me/profile',
          className,
          company: _company,
        }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
            next_link__WEBPACK_IMPORTED_MODULE_1___default(),
            {
              href: profileHref,
              'aria-label': `View ${name}'s profile`,
              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                'flex items-center gap-8 hover:opacity-80 transition-opacity',
                className
              ),
              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _components_atoms_Avatar_Avatar__WEBPACK_IMPORTED_MODULE_2__.e,
                { src: avatarSrc, alt: name, name, size: 32 }
              ),
            }
          ),
        UserProfileDesktop = ({
          name,
          company,
          avatarSrc,
          profileHref = '/me/profile',
          className,
        }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
            next_link__WEBPACK_IMPORTED_MODULE_1___default(),
            {
              href: profileHref,
              'aria-label': `View ${name}'s profile`,
              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                'flex items-center gap-8 hover:opacity-80 transition-opacity',
                className
              ),
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _components_atoms_Avatar_Avatar__WEBPACK_IMPORTED_MODULE_2__.e,
                  { src: avatarSrc, alt: name, name, size: 32 }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                    'flex flex-col leading-tight'
                  ),
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                        'text-12 font-normal text-gray-900'
                      ),
                      children: name,
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                        'text-10 font-normal text-gray-900 truncate max-w-120'
                      ),
                      children: company.name,
                    }),
                  ],
                }),
              ],
            }
          ),
        UserProfileDefault = ({
          name,
          company,
          avatarSrc,
          profileHref = '/me/profile',
          className,
        }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
            next_link__WEBPACK_IMPORTED_MODULE_1___default(),
            {
              href: profileHref,
              'aria-label': `View ${name}'s profile`,
              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                'flex items-center gap-8 hover:opacity-80 transition-opacity',
                className
              ),
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _components_atoms_Avatar_Avatar__WEBPACK_IMPORTED_MODULE_2__.e,
                  { src: avatarSrc, alt: name, name, size: 32 }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                    'flex flex-col leading-tight'
                  ),
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                        'text-16 font-normal text-gray-900'
                      ),
                      children: name,
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                        'text-12 font-normal text-gray-900 truncate max-w-120'
                      ),
                      children: company.name,
                    }),
                  ],
                }),
              ],
            }
          ),
        UserProfileNameOnly = ({
          name,
          avatarSrc,
          profileHref = '/me/profile',
          className,
          company: _company,
        }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
            next_link__WEBPACK_IMPORTED_MODULE_1___default(),
            {
              href: profileHref,
              'aria-label': `View ${name}'s profile`,
              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                'flex items-center gap-8 hover:opacity-80 transition-opacity',
                className
              ),
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _components_atoms_Avatar_Avatar__WEBPACK_IMPORTED_MODULE_2__.e,
                  { src: avatarSrc, alt: name, name, size: 32 }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                    'text-14 tablet:text-13 font-normal text-gray-900 line-clamp-2'
                  ),
                  children: name,
                }),
              ],
            }
          ),
        UserProfile = ({
          name,
          company,
          avatarSrc,
          profileHref = '/me/profile',
          variant = 'secondary',
          className,
        }) =>
          'default' === variant
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserProfileDefault, {
                name,
                company,
                avatarSrc,
                profileHref,
                className,
              })
            : 'nameOnly' === variant
              ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserProfileNameOnly, {
                  name,
                  company,
                  avatarSrc,
                  profileHref,
                  className,
                })
              : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                  react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                  {
                    children: [
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                        className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                          'hidden tablet:flex desktop:hidden',
                          className
                        ),
                        children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          UserProfileTablet,
                          { name, company, avatarSrc, profileHref }
                        ),
                      }),
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                        className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                          'hidden desktop:flex',
                          className
                        ),
                        children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          UserProfileDesktop,
                          { name, company, avatarSrc, profileHref }
                        ),
                      }),
                    ],
                  }
                ),
        __WEBPACK_DEFAULT_EXPORT__ = UserProfile;
      ((UserProfileTablet.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'UserProfileTablet',
        props: {
          name: { required: !0, tsType: { name: 'string' }, description: '' },
          company: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'object',
              raw: '{\n  name: string;\n}',
              signature: { properties: [{ key: 'name', value: { name: 'string', required: !0 } }] },
            },
            description: '',
          },
          avatarSrc: { required: !1, tsType: { name: 'string' }, description: '' },
          profileHref: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'/me/profile'", computed: !1 },
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      }),
        (UserProfileDesktop.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'UserProfileDesktop',
          props: {
            name: { required: !0, tsType: { name: 'string' }, description: '' },
            company: {
              required: !0,
              tsType: {
                name: 'signature',
                type: 'object',
                raw: '{\n  name: string;\n}',
                signature: {
                  properties: [{ key: 'name', value: { name: 'string', required: !0 } }],
                },
              },
              description: '',
            },
            avatarSrc: { required: !1, tsType: { name: 'string' }, description: '' },
            profileHref: {
              required: !1,
              tsType: { name: 'string' },
              description: '',
              defaultValue: { value: "'/me/profile'", computed: !1 },
            },
            className: { required: !1, tsType: { name: 'string' }, description: '' },
          },
        }),
        (UserProfileDefault.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'UserProfileDefault',
          props: {
            name: { required: !0, tsType: { name: 'string' }, description: '' },
            company: {
              required: !0,
              tsType: {
                name: 'signature',
                type: 'object',
                raw: '{\n  name: string;\n}',
                signature: {
                  properties: [{ key: 'name', value: { name: 'string', required: !0 } }],
                },
              },
              description: '',
            },
            avatarSrc: { required: !1, tsType: { name: 'string' }, description: '' },
            profileHref: {
              required: !1,
              tsType: { name: 'string' },
              description: '',
              defaultValue: { value: "'/me/profile'", computed: !1 },
            },
            className: { required: !1, tsType: { name: 'string' }, description: '' },
          },
        }),
        (UserProfileNameOnly.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'UserProfileNameOnly',
          props: {
            name: { required: !0, tsType: { name: 'string' }, description: '' },
            company: {
              required: !0,
              tsType: {
                name: 'signature',
                type: 'object',
                raw: '{\n  name: string;\n}',
                signature: {
                  properties: [{ key: 'name', value: { name: 'string', required: !0 } }],
                },
              },
              description: '',
            },
            avatarSrc: { required: !1, tsType: { name: 'string' }, description: '' },
            profileHref: {
              required: !1,
              tsType: { name: 'string' },
              description: '',
              defaultValue: { value: "'/me/profile'", computed: !1 },
            },
            className: { required: !1, tsType: { name: 'string' }, description: '' },
          },
        }),
        (UserProfile.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'UserProfile',
          props: {
            name: { required: !0, tsType: { name: 'string' }, description: '' },
            company: {
              required: !0,
              tsType: {
                name: 'signature',
                type: 'object',
                raw: '{\n  name: string;\n}',
                signature: {
                  properties: [{ key: 'name', value: { name: 'string', required: !0 } }],
                },
              },
              description: '',
            },
            avatarSrc: { required: !1, tsType: { name: 'string' }, description: '' },
            profileHref: {
              required: !1,
              tsType: { name: 'string' },
              description: '',
              defaultValue: { value: "'/me/profile'", computed: !1 },
            },
            className: { required: !1, tsType: { name: 'string' }, description: '' },
            variant: {
              required: !1,
              tsType: {
                name: 'union',
                raw: "'default' | 'secondary' | 'nameOnly'",
                elements: [
                  { name: 'literal', value: "'default'" },
                  { name: 'literal', value: "'secondary'" },
                  { name: 'literal', value: "'nameOnly'" },
                ],
              },
              description: '',
              defaultValue: { value: "'secondary'", computed: !1 },
            },
          },
        }));
    },
  },
]);
