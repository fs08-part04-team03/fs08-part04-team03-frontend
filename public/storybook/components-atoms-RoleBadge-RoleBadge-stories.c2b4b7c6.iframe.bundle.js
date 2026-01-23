'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [3866],
  {
    './node_modules/clsx/dist/clsx.mjs'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      function r(e) {
        var t,
          f,
          n = '';
        if ('string' == typeof e || 'number' == typeof e) n += e;
        else if ('object' == typeof e)
          if (Array.isArray(e)) {
            var o = e.length;
            for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += ' '), (n += f));
          } else for (f in e) e[f] && (n && (n += ' '), (n += f));
        return n;
      }
      function clsx() {
        for (var e, t, f = 0, n = '', o = arguments.length; f < o; f++)
          (e = arguments[f]) && (t = r(e)) && (n && (n += ' '), (n += t));
        return n;
      }
      __webpack_require__.d(__webpack_exports__, {
        $: () => clsx,
        A: () => __WEBPACK_DEFAULT_EXPORT__,
      });
      const __WEBPACK_DEFAULT_EXPORT__ = clsx;
    },
    './src/components/atoms/RoleBadge/RoleBadge.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          AllRoles: () => AllRoles,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => RoleBadge_stories,
        }));
      var jsx_runtime = __webpack_require__(
        './node_modules/next/dist/compiled/react/jsx-runtime.js'
      );
      const ROLE_LABEL_user = '사용자',
        ROLE_LABEL_manager = '관리자';
      var RoleBadge = __webpack_require__('./src/components/atoms/RoleBadge/RoleBadge.tsx');
      const RoleBadge_stories = {
          title: 'Atoms/RoleBadge',
          component: RoleBadge.A,
          tags: ['autodocs'],
          parameters: { layout: 'padded' },
        },
        AllRoles = {
          render: () =>
            (0, jsx_runtime.jsxs)('div', {
              className: 'flex flex-col gap-16',
              children: [
                (0, jsx_runtime.jsx)(RoleBadge.A, { role: 'user', children: ROLE_LABEL_user }),
                (0, jsx_runtime.jsx)(RoleBadge.A, {
                  role: 'manager',
                  children: ROLE_LABEL_manager,
                }),
              ],
            }),
        },
        __namedExportsOrder = ['AllRoles'];
      AllRoles.parameters = {
        ...AllRoles.parameters,
        docs: {
          ...AllRoles.parameters?.docs,
          source: {
            originalSource:
              '{\n  render: () => <div className="flex flex-col gap-16">\n      {/* eslint-disable-next-line jsx-a11y/aria-role */}\n      <RoleBadge role="user">{ROLE_LABEL.user}</RoleBadge>\n      {/* eslint-disable-next-line jsx-a11y/aria-role */}\n      <RoleBadge role="manager">{ROLE_LABEL.manager}</RoleBadge>\n    </div>\n}',
            ...AllRoles.parameters?.docs?.source,
          },
        },
      };
    },
    './src/components/atoms/RoleBadge/RoleBadge.tsx'(
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
      const roleStyles = {
          user: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)('bg-gray-50', 'text-gray-500'),
          manager: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)('bg-gray-700', 'text-white'),
        },
        RoleBadge = (0, react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(
          ({ role, className, children, ...props }, ref) =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
              ref,
              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                'inline-flex',
                'justify-center items-center',
                'w-51 h-23 tablet:w-64 tablet:h-30 desktop:w-64 desktop:h-30',
                'rounded-100',
                'text-12 tablet:text-14 desktop:text-14',
                'font-bold leading-normal',
                roleStyles[role],
                className
              ),
              style: { fontFamily: 'SUIT, var(--font-family-base), sans-serif' },
              ...props,
              children,
            })
        );
      RoleBadge.displayName = 'RoleBadge';
      const __WEBPACK_DEFAULT_EXPORT__ = RoleBadge;
      RoleBadge.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'RoleBadge',
        props: {
          role: {
            required: !0,
            tsType: {
              name: 'union',
              raw: "'user' | 'manager'",
              elements: [
                { name: 'literal', value: "'user'" },
                { name: 'literal', value: "'manager'" },
              ],
            },
            description: '',
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
        composes: ['Omit'],
      };
    },
  },
]);
