'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [4016],
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
    './src/components/atoms/TextArea/TextArea.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          Disabled: () => Disabled,
          WithError: () => WithError,
          WithValue: () => WithValue,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => TextArea_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        clsx = __webpack_require__('./node_modules/clsx/dist/clsx.mjs');
      const TextArea = (0, react.forwardRef)(
        ({ className, placeholder, error = !1, ...props }, ref) =>
          (0, jsx_runtime.jsx)('textarea', {
            ref,
            placeholder,
            className: (0, clsx.A)(
              'flex',
              'w-570 h-165',
              'p-6',
              'items-start',
              'gap-2',
              'rounded-default',
              'border',
              error ? 'border-error-500' : 'border-[#D1D1D1]',
              'bg-white',
              'text-gray-950 placeholder:text-gray-500',
              'focus:outline-none',
              error ? 'focus:border-error-500' : 'focus:border-gray-950',
              'disabled:text-gray-300 disabled:border-gray-200 disabled:cursor-not-allowed',
              'resize-none',
              className
            ),
            ...props,
          })
      );
      TextArea.displayName = 'TextArea';
      const TextArea_TextArea = TextArea;
      TextArea.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'TextArea',
        props: {
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
      const TextArea_stories = {
          title: 'Atoms/TextArea',
          component: TextArea_TextArea,
          tags: ['autodocs'],
          argTypes: {
            placeholder: { control: 'text', description: '입력 필드의 placeholder 텍스트' },
            error: { control: 'boolean', description: '에러 상태 표시 여부' },
            disabled: { control: 'boolean', description: '비활성화 상태' },
            className: { control: 'text', description: '추가 CSS 클래스' },
          },
        },
        Default = { args: { placeholder: '문의 내용을 입력해주세요.' } },
        WithValue = {
          args: {
            placeholder: '문의 내용을 입력해주세요.',
            defaultValue: '기본으로 입력된 텍스트입니다.',
          },
        },
        WithError = { args: { placeholder: '문의 내용을 입력해주세요.', error: !0 } },
        Disabled = {
          args: {
            placeholder: '문의 내용을 입력해주세요.',
            defaultValue: '입력이 비활성화된 상태입니다.',
            disabled: !0,
          },
        },
        __namedExportsOrder = ['Default', 'WithValue', 'WithError', 'Disabled'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource: "{\n  args: {\n    placeholder: '문의 내용을 입력해주세요.'\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (WithValue.parameters = {
          ...WithValue.parameters,
          docs: {
            ...WithValue.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    placeholder: '문의 내용을 입력해주세요.',\n    defaultValue: '기본으로 입력된 텍스트입니다.'\n  }\n}",
              ...WithValue.parameters?.docs?.source,
            },
          },
        }),
        (WithError.parameters = {
          ...WithError.parameters,
          docs: {
            ...WithError.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    placeholder: '문의 내용을 입력해주세요.',\n    error: true\n  }\n}",
              ...WithError.parameters?.docs?.source,
            },
          },
        }),
        (Disabled.parameters = {
          ...Disabled.parameters,
          docs: {
            ...Disabled.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    placeholder: '문의 내용을 입력해주세요.',\n    defaultValue: '입력이 비활성화된 상태입니다.',\n    disabled: true\n  }\n}",
              ...Disabled.parameters?.docs?.source,
            },
          },
        }));
    },
  },
]);
