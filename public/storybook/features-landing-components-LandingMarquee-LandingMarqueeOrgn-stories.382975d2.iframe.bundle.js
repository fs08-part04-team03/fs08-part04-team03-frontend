'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [6761],
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
    './src/features/landing/components/LandingMarquee/LandingMarqueeOrgn.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => LandingMarqueeOrgn_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        clsx = __webpack_require__('./node_modules/clsx/dist/clsx.mjs');
      const getMarqueeItems = (prefix, items) => [
          ...items.map((item) => ({ ...item, uniqueKey: `${prefix}-1-${item.id}` })),
          ...items.map((item) => ({ ...item, uniqueKey: `${prefix}-2-${item.id}` })),
          ...items.map((item) => ({ ...item, uniqueKey: `${prefix}-3-${item.id}` })),
          ...items.map((item) => ({ ...item, uniqueKey: `${prefix}-4-${item.id}` })),
        ],
        MarqueeCard = ({ text, paddingClass }) =>
          (0, jsx_runtime.jsx)('div', {
            className: (0, clsx.A)(
              'flex shrink-0 items-center justify-center rounded-8 border border-gray-100 bg-white/40 shadow-[0_7px_20px_0_rgba(0,0,0,0.02)] backdrop-blur-[20px]',
              paddingClass
            ),
            children: (0, jsx_runtime.jsx)('span', {
              className:
                ' whitespace-pre-wrap text-left text-gray-500 tracking-tight text-16 leading-160',
              style: { fontFamily: 'Pretendard' },
              children: text,
            }),
          }),
        LandingMarqueeOrgn = ({ className, items }) =>
          (0, jsx_runtime.jsxs)('section', {
            className: (0, clsx.A)(
              'relative w-full overflow-hidden',
              'h-[236px]',
              'tablet:h-[190px]',
              'desktop:h-[195.05px]',
              className
            ),
            style: {
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0.00) -171.69%, rgba(255, 255, 255, 0.90) 100%)',
            },
            children: [
              (0, jsx_runtime.jsxs)('div', {
                className: 'flex w-full flex-col justify-center gap-16 tablet:hidden h-full',
                children: [
                  (0, jsx_runtime.jsx)('div', {
                    className: 'flex w-full overflow-hidden',
                    children: (0, jsx_runtime.jsx)('div', {
                      className: 'animate-marquee flex gap-12 px-6',
                      children: getMarqueeItems('row1', items).map((item) =>
                        (0, jsx_runtime.jsx)(
                          MarqueeCard,
                          { text: item.text, paddingClass: 'px-24 py-20' },
                          item.uniqueKey
                        )
                      ),
                    }),
                  }),
                  (0, jsx_runtime.jsx)('div', {
                    className: 'flex w-full overflow-hidden',
                    children: (0, jsx_runtime.jsx)('div', {
                      className: 'animate-marquee flex gap-12 px-6',
                      style: { animationDelay: '-2.5s' },
                      children: getMarqueeItems('row2', [
                        ...items.slice(Math.floor(items.length / 2)),
                        ...items.slice(0, Math.floor(items.length / 2)),
                      ]).map((item) =>
                        (0, jsx_runtime.jsx)(
                          MarqueeCard,
                          { text: item.text, paddingClass: 'px-24 py-20' },
                          item.uniqueKey
                        )
                      ),
                    }),
                  }),
                ],
              }),
              (0, jsx_runtime.jsx)('div', {
                className: 'hidden h-full w-full items-center overflow-hidden tablet:flex',
                children: (0, jsx_runtime.jsx)('div', {
                  className: 'animate-marquee flex items-center',
                  children: (0, jsx_runtime.jsx)('div', {
                    className: 'flex gap-20 px-10 desktop:gap-40 desktop:px-20',
                    children: getMarqueeItems('desktop', items).map((item) =>
                      (0, jsx_runtime.jsx)(
                        MarqueeCard,
                        { text: item.text, paddingClass: 'tablet:px-30 tablet:py-24 desktop:p-30' },
                        item.uniqueKey
                      )
                    ),
                  }),
                }),
              }),
            ],
          });
      LandingMarqueeOrgn.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'LandingMarqueeOrgn',
        props: {
          className: { required: !1, tsType: { name: 'string' }, description: '' },
          items: {
            required: !0,
            tsType: { name: 'Array', elements: [{ name: 'MarqueeItem' }], raw: 'MarqueeItem[]' },
            description: '',
          },
        },
      };
      const LandingMarqueeOrgn_stories = {
          title: 'Features/Landing/LandingMarqueeOrgn',
          component: LandingMarqueeOrgn,
          tags: ['autodocs'],
          parameters: {
            layout: 'fullscreen',
            docs: {
              description: {
                component:
                  '\n### 개요\n랜딩 페이지 하단에서 정보를 흘려보내는 **무한 스크롤 마키(Marquee)** 섹션입니다.\n\n### 주요 특징\n*   **끊김 없는 애니메이션**: CSS Keyframes 애니메이션을 활용하여 텍스트가 왼쪽으로 자연스럽게 흐릅니다.\n*   **반응형 레이아웃**:\n    *   **Mobile (<768px)**: 2줄(Row)로 구성되어 더 많은 정보를 밀도 있게 보여줍니다. 두 번째 줄은 반박자 늦게 시작하여 서로 다른 정보를 엇갈려 보여줍니다.\n    *   **Tablet/Desktop (≥768px)**: 1줄(Row)로 시원하게 배치되어 가독성을 높입니다.\n\n### 사용 방법\n`items` prop에 표시하고 싶은 텍스트 배열을 전달하여 사용합니다. 각 아이템은 자동으로 카드 형태의 스타일이 적용됩니다.\n        ',
              },
            },
          },
          args: {
            items: [
              { id: 1, text: '흩어진 간식 구매처를 통합하고,\n기수별 지출을 똑똑하게 관리하세요.' },
              { id: 2, text: '관리자와 유저\n모두 이용할 수 있어요.' },
              { id: 3, text: '다양한 품목도\n한 눈에 파악해봐요.' },
              { id: 4, text: '쉽고 빠르게\n구매를 요청해보세요.' },
              { id: 5, text: '여러 플랫폼에서 구매한 간식 내역을\n한 곳에서 쉽게 관리해요' },
            ],
          },
          argTypes: {
            className: {
              description: '추가적인 스타일링을 위한 클래스명 (주로 위치 조정용)',
              control: 'text',
            },
            items: { description: 'Marquee에 표시될 텍스트 아이템 배열', control: 'object' },
          },
        },
        Default = {
          parameters: {
            viewport: { defaultViewport: 'responsive' },
            docs: {
              story:
                '기본 마키 컴포넌트입니다. 화면 너비에 따라 1줄 또는 2줄로 변하는 반응형 레이아웃을 확인해보세요.',
            },
          },
        },
        __namedExportsOrder = ['Default'];
      Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  parameters: {\n    viewport: {\n      defaultViewport: 'responsive'\n    },\n    docs: {\n      story: '기본 마키 컴포넌트입니다. 화면 너비에 따라 1줄 또는 2줄로 변하는 반응형 레이아웃을 확인해보세요.'\n    }\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      };
    },
  },
]);
