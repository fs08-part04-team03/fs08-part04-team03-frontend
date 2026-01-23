'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [2146],
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
    './src/components/atoms/Label/Label.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          WithCustomClass: () => WithCustomClass,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => Label_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        clsx = __webpack_require__('./node_modules/clsx/dist/clsx.mjs');
      const Label = (0, react.forwardRef)(({ className, children, ...props }, ref) =>
        (0, jsx_runtime.jsx)('label', {
          ref,
          className: (0, clsx.A)(
            'self-stretch',
            'text-gray-500',
            'text-12 font-normal leading-normal tracking-[-0.3px]',
            className
          ),
          style: {
            color: 'var(--gray-primary-500, #878787)',
            fontFamily: 'SUIT, var(--font-family-base), sans-serif',
          },
          ...props,
          children,
        })
      );
      Label.displayName = 'Label';
      const Label_Label = Label;
      Label.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'Label',
        props: { className: { required: !1, tsType: { name: 'string' }, description: '' } },
        composes: ['LabelHTMLAttributes'],
      };
      const Label_stories = {
          title: 'Atoms/Label',
          component: Label_Label,
          tags: ['autodocs'],
          argTypes: {
            children: { control: 'text', description: '라벨 텍스트', defaultValue: '라벨 텍스트' },
            className: { control: 'text', description: '추가 CSS 클래스' },
          },
        },
        Default = { args: { children: '이메일' } },
        WithCustomClass = { args: { children: '비밀번호', className: 'text-gray-700' } },
        __namedExportsOrder = ['Default', 'WithCustomClass'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource: "{\n  args: {\n    children: '이메일'\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (WithCustomClass.parameters = {
          ...WithCustomClass.parameters,
          docs: {
            ...WithCustomClass.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    children: '비밀번호',\n    className: 'text-gray-700'\n  }\n}",
              ...WithCustomClass.parameters?.docs?.source,
            },
          },
        }));
    },
  },
]);
