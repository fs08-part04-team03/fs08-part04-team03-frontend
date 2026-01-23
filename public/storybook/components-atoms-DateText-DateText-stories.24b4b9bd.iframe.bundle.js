'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [9110],
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
    './src/components/atoms/DateText/DateText.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          DateObject: () => DateObject,
          Default: () => Default,
          DifferentDate: () => DifferentDate,
          InvalidDate: () => InvalidDate,
          WithCustomClassName: () => WithCustomClassName,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Atoms/DateText',
          component: __webpack_require__('./src/components/atoms/DateText/DateText.tsx').A,
          tags: ['autodocs'],
          argTypes: {
            date: { control: 'text', description: '날짜 (ISO 문자열 또는 Date 객체)' },
            className: { control: 'text', description: '추가 CSS 클래스' },
          },
        },
        Default = { args: { date: '2025-06-03T00:00:00.000Z' } },
        DifferentDate = { args: { date: '2024-12-25T00:00:00.000Z' } },
        DateObject = { args: { date: new Date('2025-01-15') } },
        WithCustomClassName = {
          args: { date: '2025-06-03T00:00:00.000Z', className: 'text-18 font-bold' },
        },
        InvalidDate = { args: { date: 'invalid-date' } },
        __namedExportsOrder = [
          'Default',
          'DifferentDate',
          'DateObject',
          'WithCustomClassName',
          'InvalidDate',
        ];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource: "{\n  args: {\n    date: '2025-06-03T00:00:00.000Z'\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (DifferentDate.parameters = {
          ...DifferentDate.parameters,
          docs: {
            ...DifferentDate.parameters?.docs,
            source: {
              originalSource: "{\n  args: {\n    date: '2024-12-25T00:00:00.000Z'\n  }\n}",
              ...DifferentDate.parameters?.docs?.source,
            },
          },
        }),
        (DateObject.parameters = {
          ...DateObject.parameters,
          docs: {
            ...DateObject.parameters?.docs,
            source: {
              originalSource: "{\n  args: {\n    date: new Date('2025-01-15')\n  }\n}",
              ...DateObject.parameters?.docs?.source,
            },
          },
        }),
        (WithCustomClassName.parameters = {
          ...WithCustomClassName.parameters,
          docs: {
            ...WithCustomClassName.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    date: '2025-06-03T00:00:00.000Z',\n    className: 'text-18 font-bold'\n  }\n}",
              ...WithCustomClassName.parameters?.docs?.source,
            },
          },
        }),
        (InvalidDate.parameters = {
          ...InvalidDate.parameters,
          docs: {
            ...InvalidDate.parameters?.docs,
            source: {
              originalSource: "{\n  args: {\n    date: 'invalid-date'\n  }\n}",
              ...InvalidDate.parameters?.docs?.source,
            },
          },
        }));
    },
    './src/components/atoms/DateText/DateText.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _utils_formatDate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/utils/formatDate.ts'
        );
      const DateText = ({ date, className }) => {
          const formattedDate = (0, _utils_formatDate__WEBPACK_IMPORTED_MODULE_2__.Y)(date);
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)('text-gray-950', className),
            children: formattedDate,
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = DateText;
      DateText.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'DateText',
        props: {
          date: {
            required: !0,
            tsType: {
              name: 'union',
              raw: 'string | Date',
              elements: [{ name: 'string' }, { name: 'Date' }],
            },
            description: '',
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
    },
    './src/utils/formatDate.ts'(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      function formatDate(dateInput) {
        const dateObj = dateInput instanceof Date ? dateInput : new Date(dateInput);
        if (Number.isNaN(dateObj.getTime())) return '-';
        return `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${String(dateObj.getDate()).padStart(2, '0')}`;
      }
      __webpack_require__.d(__webpack_exports__, { Y: () => formatDate });
    },
  },
]);
