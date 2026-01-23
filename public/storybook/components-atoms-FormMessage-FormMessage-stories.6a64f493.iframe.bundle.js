'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [4078],
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
    './src/components/atoms/FormMessage/FormMessage.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          LongMessage: () => LongMessage,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => FormMessage_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        clsx = __webpack_require__('./node_modules/clsx/dist/clsx.mjs');
      const FormMessage = (0, react.forwardRef)(({ className, children, ...props }, ref) =>
        (0, jsx_runtime.jsx)('p', {
          ref,
          className: (0, clsx.A)(
            'flex-1',
            'text-14 font-normal leading-normal tracking-[-0.35px]',
            'font-(--font-family-base)',
            className
          ),
          style: {
            color: 'var(--Status-error-500, var(--error, #F31D1D))',
            background: 'var(--error, #F31D1D)',
            fontFamily: 'SUIT, var(--font-family-base), sans-serif',
          },
          ...props,
          children,
        })
      );
      FormMessage.displayName = 'FormMessage';
      const FormMessage_FormMessage = FormMessage;
      FormMessage.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'FormMessage',
        props: { className: { required: !1, tsType: { name: 'string' }, description: '' } },
        composes: ['HTMLAttributes'],
      };
      const FormMessage_stories = {
          title: 'Atoms/FormMessage',
          component: FormMessage_FormMessage,
          tags: ['autodocs'],
          argTypes: {
            children: {
              control: 'text',
              description: '메시지 내용',
              defaultValue: '입력값을 다시 확인해주세요.',
            },
            className: { control: 'text', description: '추가 CSS 클래스' },
          },
        },
        Default = { args: { children: '입력값을 다시 확인해주세요.' } },
        LongMessage = {
          args: { children: '비밀번호는 8자 이상, 영문 대소문자와 숫자를 모두 포함해야 합니다.' },
        },
        __namedExportsOrder = ['Default', 'LongMessage'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource: "{\n  args: {\n    children: '입력값을 다시 확인해주세요.'\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (LongMessage.parameters = {
          ...LongMessage.parameters,
          docs: {
            ...LongMessage.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    children: '비밀번호는 8자 이상, 영문 대소문자와 숫자를 모두 포함해야 합니다.'\n  }\n}",
              ...LongMessage.parameters?.docs?.source,
            },
          },
        }));
    },
  },
]);
