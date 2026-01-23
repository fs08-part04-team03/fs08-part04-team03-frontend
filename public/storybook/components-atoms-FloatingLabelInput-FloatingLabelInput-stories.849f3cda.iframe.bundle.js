'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [1788],
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
    './src/components/atoms/FloatingLabelInput/FloatingLabelInput.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          Disabled: () => Disabled,
          PasswordWithToggle: () => PasswordWithToggle,
          WithError: () => WithError,
          WithValue: () => WithValue,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => FloatingLabelInput_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        clsx = __webpack_require__('./node_modules/clsx/dist/clsx.mjs');
      const FloatingLabelInput = (0, react.forwardRef)(
        (
          {
            className,
            label,
            error = !1,
            showPasswordToggle = !1,
            type = 'text',
            value,
            id,
            ...props
          },
          ref
        ) => {
          const generatedId = (0, react.useId)(),
            [showPassword, setShowPassword] = (0, react.useState)(!1),
            hasValue = void 0 !== value && '' !== value,
            isDisabled = props.disabled,
            inputId = id || generatedId;
          let inputType = type;
          showPasswordToggle && (inputType = showPassword ? 'text' : 'password');
          return (0, jsx_runtime.jsxs)('div', {
            className: (0, clsx.A)(
              'relative flex h-56 px-4 py-8',
              'border-b border-t-0 border-l-0 border-r-0',
              error
                ? 'border-error-500'
                : isDisabled
                  ? 'border-gray-200'
                  : hasValue
                    ? 'border-gray-950'
                    : 'border-gray-600',
              hasValue || isDisabled ? 'flex-col justify-between' : 'items-center justify-between',
              className
            ),
            children: [
              (hasValue || isDisabled) &&
                (0, jsx_runtime.jsx)('label', {
                  htmlFor: inputId,
                  className: (0, clsx.A)(
                    'text-12 tracking--0.3 leading-normal',
                    isDisabled ? 'text-gray-500' : 'text-gray-600'
                  ),
                  children: label,
                }),
              (0, jsx_runtime.jsxs)('div', {
                className: 'flex items-center justify-between w-full gap-4',
                children: [
                  (0, jsx_runtime.jsx)('input', {
                    ref,
                    id: inputId,
                    type: inputType,
                    value,
                    placeholder: hasValue || isDisabled ? void 0 : label,
                    className: (0, clsx.A)(
                      'flex-1 bg-transparent outline-none border-none p-0',
                      'text-16 tracking--0.4 leading-normal',
                      isDisabled
                        ? 'text-gray-300 cursor-not-allowed'
                        : hasValue
                          ? 'text-gray-950'
                          : 'text-gray-500 placeholder:text-gray-500'
                    ),
                    ...props,
                  }),
                  showPasswordToggle &&
                    !isDisabled &&
                    (0, jsx_runtime.jsx)('button', {
                      type: 'button',
                      onClick: () => setShowPassword(!showPassword),
                      className: 'flex items-center justify-center w-20 h-20 shrink-0',
                      'aria-label': showPassword ? '비밀번호 숨기기' : '비밀번호 보기',
                      children: (0, jsx_runtime.jsx)('svg', {
                        width: '20',
                        height: '20',
                        viewBox: '0 0 20 20',
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                        children: showPassword
                          ? (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                              children: [
                                (0, jsx_runtime.jsx)('path', {
                                  d: 'M2.5 10C2.5 10 5 4.16667 10 4.16667C15 4.16667 17.5 10 17.5 10C17.5 10 15 15.8333 10 15.8333C5 15.8333 2.5 10 2.5 10Z',
                                  stroke: '#666666',
                                  strokeWidth: '1.5',
                                  strokeLinecap: 'round',
                                  strokeLinejoin: 'round',
                                }),
                                (0, jsx_runtime.jsx)('path', {
                                  d: 'M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z',
                                  stroke: '#666666',
                                  strokeWidth: '1.5',
                                  strokeLinecap: 'round',
                                  strokeLinejoin: 'round',
                                }),
                              ],
                            })
                          : (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                              children: [
                                (0, jsx_runtime.jsx)('path', {
                                  d: 'M2.5 2.5L17.5 17.5',
                                  stroke: '#666666',
                                  strokeWidth: '1.5',
                                  strokeLinecap: 'round',
                                }),
                                (0, jsx_runtime.jsx)('path', {
                                  d: 'M8.82 8.82C8.42848 9.21151 8.20312 9.74696 8.20312 10.305C8.20312 10.863 8.42848 11.3985 8.82 11.79C9.21151 12.1815 9.74696 12.4069 10.305 12.4069C10.863 12.4069 11.3985 12.1815 11.79 11.79',
                                  stroke: '#666666',
                                  strokeWidth: '1.5',
                                  strokeLinecap: 'round',
                                  strokeLinejoin: 'round',
                                }),
                                (0, jsx_runtime.jsx)('path', {
                                  d: 'M14.4167 14.4167C13.0833 15.4167 11.5833 15.8333 10 15.8333C5 15.8333 2.5 10 2.5 10C3.25 8.41667 4.25 7.08333 5.58333 5.58333M8.33333 4.58333C8.88333 4.41667 9.43333 4.16667 10 4.16667C15 4.16667 17.5 10 17.5 10C17.0833 10.9167 16.5833 11.75 16 12.5',
                                  stroke: '#666666',
                                  strokeWidth: '1.5',
                                  strokeLinecap: 'round',
                                  strokeLinejoin: 'round',
                                }),
                              ],
                            }),
                      }),
                    }),
                ],
              }),
            ],
          });
        }
      );
      FloatingLabelInput.displayName = 'FloatingLabelInput';
      const FloatingLabelInput_FloatingLabelInput = FloatingLabelInput;
      FloatingLabelInput.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'FloatingLabelInput',
        props: {
          label: { required: !0, tsType: { name: 'string' }, description: '' },
          error: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
          showPasswordToggle: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
          type: { defaultValue: { value: "'text'", computed: !1 }, required: !1 },
        },
        composes: ['Omit'],
      };
      const FloatingLabelInput_stories = {
          title: 'Atoms/FloatingLabelInput',
          component: FloatingLabelInput_FloatingLabelInput,
          tags: ['autodocs'],
          argTypes: {
            label: {
              control: 'text',
              description:
                '입력 필드의 레이블 텍스트. 값이 없을 때는 placeholder로 표시되고, 값이 있거나 disabled 상태일 때는 상단에 작은 레이블로 표시됩니다. 필수 prop입니다.',
            },
            error: {
              control: 'boolean',
              description:
                '에러 상태를 표시합니다. true일 경우 입력 필드 하단 테두리가 빨간색(error-500)으로 변경되어 에러 상태임을 시각적으로 표시합니다.',
            },
            showPasswordToggle: {
              control: 'boolean',
              description:
                '비밀번호 입력 필드에서 텍스트 표시/숨김을 토글할 수 있는 버튼을 표시합니다. true일 경우 입력 필드 오른쪽에 눈 아이콘이 표시되며, 클릭하면 password 타입과 text 타입을 전환합니다. type이 password일 때만 의미가 있습니다.',
            },
            disabled: {
              control: 'boolean',
              description:
                '입력 필드를 비활성화합니다. true일 경우 입력이 불가능하고, 시각적으로 투명도가 낮아지며 커서가 not-allowed로 변경됩니다. disabled 상태일 때도 레이블이 상단에 표시됩니다.',
            },
            type: {
              control: 'select',
              options: ['text', 'email', 'password', 'tel', 'number', 'url'],
              description:
                'HTML input 요소의 type 속성입니다. 입력 필드의 타입에 따라 브라우저의 기본 검증 및 키보드가 다르게 동작합니다. 기본값은 "text"입니다. password 타입과 함께 showPasswordToggle을 사용하면 비밀번호 토글 기능을 활용할 수 있습니다.',
            },
            value: {
              control: 'text',
              description:
                '입력 필드의 현재 값입니다. controlled component로 사용할 때 상태와 함께 사용합니다. 값이 있을 경우 레이블이 상단에 작은 텍스트로 표시되고, placeholder는 숨겨집니다.',
            },
            className: {
              control: 'text',
              description:
                '컴포넌트의 최상위 div 요소에 추가할 커스텀 CSS 클래스입니다. 기본 스타일을 오버라이드하거나 추가 스타일을 적용할 때 사용합니다.',
            },
            placeholder: {
              control: 'text',
              description:
                '입력 필드에 값이 없고 disabled가 아닐 때 표시되는 placeholder 텍스트입니다. label과 동일한 값을 사용하며, 값이 있거나 disabled 상태일 때는 표시되지 않습니다.',
            },
            onChange: {
              control: !1,
              description:
                '입력 값이 변경될 때 호출되는 콜백 함수입니다. React.ChangeEvent<HTMLInputElement>를 인자로 받습니다.',
            },
            onFocus: {
              control: !1,
              description:
                '입력 필드에 포커스가 들어올 때 호출되는 콜백 함수입니다. React.FocusEvent<HTMLInputElement>를 인자로 받습니다.',
            },
            onBlur: {
              control: !1,
              description:
                '입력 필드에서 포커스가 나갈 때 호출되는 콜백 함수입니다. React.FocusEvent<HTMLInputElement>를 인자로 받습니다.',
            },
          },
        },
        Default = { args: { label: '이메일', type: 'text' } },
        WithValue = { args: { label: '이메일', type: 'email', value: 'user@example.com' } },
        WithError = { args: { label: '이메일', type: 'email', value: 'invalid-email', error: !0 } },
        Disabled = {
          args: { label: '이메일', type: 'text', value: 'disabled@example.com', disabled: !0 },
        },
        PasswordWithToggle = {
          args: { label: '비밀번호', type: 'password', showPasswordToggle: !0 },
        },
        __namedExportsOrder = [
          'Default',
          'WithValue',
          'WithError',
          'Disabled',
          'PasswordWithToggle',
        ];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource: "{\n  args: {\n    label: '이메일',\n    type: 'text'\n  }\n}",
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
                "{\n  args: {\n    label: '이메일',\n    type: 'email',\n    value: 'user@example.com'\n  }\n}",
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
                "{\n  args: {\n    label: '이메일',\n    type: 'email',\n    value: 'invalid-email',\n    error: true\n  }\n}",
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
                "{\n  args: {\n    label: '이메일',\n    type: 'text',\n    value: 'disabled@example.com',\n    disabled: true\n  }\n}",
              ...Disabled.parameters?.docs?.source,
            },
          },
        }),
        (PasswordWithToggle.parameters = {
          ...PasswordWithToggle.parameters,
          docs: {
            ...PasswordWithToggle.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    label: '비밀번호',\n    type: 'password',\n    showPasswordToggle: true\n  }\n}",
              ...PasswordWithToggle.parameters?.docs?.source,
            },
          },
        }));
    },
  },
]);
