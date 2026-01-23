'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [2452],
  {
    './src/components/atoms/Logo/Logo.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__('./node_modules/next/link.js'),
        next_link__WEBPACK_IMPORTED_MODULE_2___default = __webpack_require__.n(
          next_link__WEBPACK_IMPORTED_MODULE_2__
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const sizeClass = {
          sm: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)('w-70 h-20'),
          md: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)('w-225 h-100'),
          lg: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)('w-344 h-97'),
        },
        sizeValues = {
          sm: { width: 70, height: 20 },
          md: { width: 225, height: 100 },
          lg: { width: 344, height: 97 },
        },
        Logo = ({ size = 'md', src = '/logo/logo.svg', alt = 'Logo', href, className }) => {
          const { width, height } = sizeValues[size],
            isSvg = src.endsWith('.svg'),
            imageElement = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              next_image__WEBPACK_IMPORTED_MODULE_1__.A,
              {
                src,
                alt,
                width,
                height,
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                  sizeClass[size],
                  className
                ),
                priority: !0,
                unoptimized: isSvg,
              }
            );
          return href
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                next_link__WEBPACK_IMPORTED_MODULE_2___default(),
                { href, children: imageElement }
              )
            : imageElement;
        },
        __WEBPACK_DEFAULT_EXPORT__ = Logo;
      Logo.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'Logo',
        props: {
          size: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'sm' | 'md' | 'lg'",
              elements: [
                { name: 'literal', value: "'sm'" },
                { name: 'literal', value: "'md'" },
                { name: 'literal', value: "'lg'" },
              ],
            },
            description: '',
            defaultValue: { value: "'md'", computed: !1 },
          },
          src: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'/logo/logo.svg'", computed: !1 },
          },
          alt: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'Logo'", computed: !1 },
          },
          href: { required: !1, tsType: { name: 'string' }, description: '' },
        },
        composes: ['Omit'],
      };
    },
    './src/components/molecules/Toast/Toast.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { y: () => Toast });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './src/components/atoms/IconButton/IconButton.tsx'
        );
      const CloseButton = ({ onClose }) =>
          onClose
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_4__.K,
                {
                  variant: 'filled',
                  size: 'sm',
                  onClick: onClose,
                  className: 'bg-white hover:bg-white cursor-pointer ml-2',
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                    className: 'relative w-24 h-24',
                    children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                      { src: '/icons/close-circle.svg', alt: 'close', fill: !0, unoptimized: !0 }
                    ),
                  }),
                }
              )
            : null,
        ToastContent = ({ variant, formattedAmount, onClose }) =>
          'error' !== variant
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CloseButton, { onClose })
            : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: 'flex items-center gap-2',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                    className: 'font-suit font-bold text-16 leading-none tracking--0.35',
                    children: '남은 예산',
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                    className: 'font-suit font-bold text-16 leading-none tracking--0.35',
                    children: formattedAmount,
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CloseButton, { onClose }),
                ],
              }),
        DesktopMessage = ({ message }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
            className: 'font-suit font-bold text-16 leading-none tracking--0.35',
            children: message,
          }),
        TabletMessage = ({ message, variant }) =>
          'error' === variant
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                className: 'font-suit font-bold text-16 leading-none tracking--0.35',
                children: '수량을 줄이거나 항목을 제거해주세요.',
              })
            : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                className: 'font-suit font-bold text-16 leading-none tracking--0.35',
                children: message,
              }),
        MobileMessage = ({ variant, message }) =>
          'error' === variant
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
                children: [
                  '예산이 부족합니다.',
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('br', {}),
                  '수량을 줄이거나 항목을 제거해 주세요.',
                ],
              })
            : 'custom' === variant
              ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                  children: message || '',
                })
              : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                  children: '예산이 변경되었습니다.',
                }),
        Toast = ({ amount = '0', variant, message, onClose, duration = 2e3 }) => {
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            if (!onClose) return () => {};
            const timer = setTimeout(() => {
              onClose();
            }, duration);
            return () => clearTimeout(timer);
          }, [onClose, duration]);
          let iconSrc = '',
            defaultMessage = '';
          'error' === variant
            ? ((iconSrc = '/icons/red-info.svg'),
              (defaultMessage = '예산이 부족합니다. 수량을 줄이거나 항목을 제거해주세요.'))
            : 'custom' === variant
              ? ((iconSrc = '/icons/red-info.svg'), (defaultMessage = message || ''))
              : ((iconSrc = '/icons/check-icon.svg'), (defaultMessage = '예산이 변경되었습니다.'));
          const finalMessage = message || defaultMessage;
          let formattedAmount = '0원';
          const amountNumber = Number(amount);
          return (
            Number.isNaN(amountNumber) ||
              (formattedAmount = `${new Intl.NumberFormat('ko-KR').format(amountNumber)}원`),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
              role: 'status',
              'aria-live': 'error' === variant ? 'assertive' : 'polite',
              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                'flex items-center text-white relative rounded-default bg-[rgba(0,0,0,0.80)] shadow-toast backdrop-blur-toast',
                'gap-8',
                'z-toast',
                'px-20',
                'mobile:px-20',
                'tablet:px-toast-32',
                'desktop:px-50',
                'desktop:w-1152 desktop:h-80',
                'tablet:w-696 tablet:h-80',
                'mobile:w-350 mobile:h-64'
              ),
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                  className: 'shrink-0 w-24 h-24 relative',
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                    { src: iconSrc, alt: 'toast-icon', fill: !0, unoptimized: !0 }
                  ),
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'flex-1 flex flex-col justify-center ml-3',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      className:
                        'desktop:flex tablet:hidden mobile:hidden justify-between items-center w-full',
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DesktopMessage, {
                          message: finalMessage,
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToastContent, {
                          variant,
                          formattedAmount,
                          onClose,
                        }),
                      ],
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      className:
                        'tablet:flex desktop:hidden mobile:hidden justify-between items-center w-full',
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TabletMessage, {
                          message: finalMessage,
                          variant,
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToastContent, {
                          variant,
                          formattedAmount,
                          onClose,
                        }),
                      ],
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      className:
                        'mobile:flex tablet:hidden desktop:hidden justify-between items-center w-full',
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                          className:
                            'flex flex-col font-suit font-bold text-14 leading-160 tracking--0.35',
                          children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            MobileMessage,
                            { variant, message: finalMessage }
                          ),
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CloseButton, {
                          onClose,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            })
          );
        };
      Toast.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'Toast',
        props: {
          amount: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'0'", computed: !1 },
          },
          variant: {
            required: !0,
            tsType: {
              name: 'union',
              raw: "'error' | 'success' | 'custom'",
              elements: [
                { name: 'literal', value: "'error'" },
                { name: 'literal', value: "'success'" },
                { name: 'literal', value: "'custom'" },
              ],
            },
            description: '',
          },
          message: { required: !1, tsType: { name: 'string' }, description: '' },
          onClose: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          duration: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '2000', computed: !1 },
          },
        },
      };
    },
    './src/features/auth/formFields.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        Xs: () => loginFields,
        q4: () => signupFields,
        tW: () => inviteSignupFields,
      });
      const signupFields = [
          { name: 'name', label: '이름', placeholder: '이름을 입력해주세요', type: 'text' },
          { name: 'email', label: '이메일', placeholder: 'example@company.com', type: 'email' },
          {
            name: 'password',
            label: '비밀번호',
            placeholder: '비밀번호를 입력해 주세요',
            type: 'password',
          },
          {
            name: 'confirmPassword',
            label: '비밀번호 확인',
            placeholder: '비밀번호를 다시 입력해 주세요',
            type: 'password',
          },
          {
            name: 'companyName',
            label: '회사명',
            placeholder: '회사명을 입력해주세요',
            type: 'text',
          },
          {
            name: 'businessNumber',
            label: '사업자 번호',
            placeholder: '123-45-67890',
            type: 'text',
          },
        ],
        loginFields = [
          { name: 'email', label: '이메일', placeholder: 'example@company.com', type: 'email' },
          {
            name: 'password',
            label: '비밀번호',
            placeholder: '비밀번호를 입력해 주세요',
            type: 'password',
          },
        ],
        inviteSignupFields = [
          {
            name: 'email',
            label: '이메일',
            placeholder: 'example@company.com',
            type: 'email',
            disabled: !0,
          },
          {
            name: 'password',
            label: '비밀번호',
            placeholder: '비밀번호를 입력해 주세요',
            type: 'password',
          },
          {
            name: 'confirmPassword',
            label: '비밀번호 확인',
            placeholder: '비밀번호를 다시 입력해 주세요',
            type: 'password',
          },
        ];
    },
    './src/features/auth/template/LoginTem/LoginTem.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          WithErrorToast: () => WithErrorToast,
          WithNetworkErrorToast: () => WithNetworkErrorToast,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => LoginTem_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        index_esm = __webpack_require__('./node_modules/react-hook-form/dist/index.esm.mjs'),
        zod = __webpack_require__('./node_modules/@hookform/resolvers/zod/dist/zod.mjs'),
        external = __webpack_require__('./node_modules/zod/v4/classic/external.js');
      const userSchema = external.Ikc({
          id: external.YjP().min(1, '사용자 ID가 필요합니다.'),
          email: external
            .YjP()
            .min(1, '이메일이 필요합니다.')
            .email('올바른 이메일 형식이 아닙니다.'),
          name: external.YjP().min(1, '사용자 이름이 필요합니다.'),
          role: external.k5n(['user', 'manager', 'admin'], {
            message: '이 페이지에 접근할 권한이 없습니다.',
          }),
          companyId: external.YjP().min(1, '회사 ID가 필요합니다.'),
        }),
        loginSchema = external.Ikc({
          email: external
            .YjP()
            .min(1, '이메일을 입력해주세요.')
            .email('유효하지 않은 이메일입니다.'),
          password: external.YjP().min(1, '비밀번호를 입력해주세요.'),
          companyId: external.YjP().optional(),
        });
      (external.Ikc({
        user: userSchema,
        accessToken: external.YjP().min(1, '액세스 토큰이 필요합니다.'),
      }),
        external
          .Ikc({
            currentPassword: external.YjP().min(1, '현재 비밀번호를 입력해주세요.'),
            newPassword: external
              .YjP()
              .min(1, '새 비밀번호를 입력해주세요.')
              .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
              .max(30, '비밀번호는 최대 30자까지 입력 가능합니다.'),
            confirmNewPassword: external.YjP().min(1, '새 비밀번호 확인을 입력해주세요.'),
          })
          .refine(
            (data) => {
              const hasLowerCase = /[a-z]/.test(data.newPassword),
                hasNumber = /[0-9]/.test(data.newPassword),
                hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(data.newPassword);
              return hasLowerCase && hasNumber && hasSpecialChar;
            },
            {
              message: '비밀번호는 소문자, 숫자, 특수문자를 포함해야 합니다.',
              path: ['newPassword'],
            }
          )
          .refine((data) => data.newPassword === data.confirmNewPassword, {
            message: '새 비밀번호가 일치하지 않습니다.',
            path: ['confirmNewPassword'],
          })
          .refine((data) => data.currentPassword !== data.newPassword, {
            message: '현재 비밀번호와 동일한 비밀번호는 사용할 수 없습니다.',
            path: ['newPassword'],
          }),
        external.Ikc({
          email: external
            .YjP()
            .min(1, '이메일을 입력해주세요.')
            .email('올바른 이메일 형식이 아닙니다.'),
        }),
        external
          .Ikc({
            token: external.YjP().min(1, '재설정 토큰이 필요합니다.'),
            newPassword: external
              .YjP()
              .min(1, '새 비밀번호를 입력해주세요.')
              .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
              .max(30, '비밀번호는 최대 30자까지 입력 가능합니다.'),
            confirmNewPassword: external.YjP().min(1, '새 비밀번호 확인을 입력해주세요.'),
          })
          .refine(
            (data) => {
              const hasLowerCase = /[a-z]/.test(data.newPassword),
                hasNumber = /[0-9]/.test(data.newPassword),
                hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(data.newPassword);
              return hasLowerCase && hasNumber && hasSpecialChar;
            },
            {
              message: '비밀번호는 소문자, 숫자, 특수문자를 포함해야 합니다.',
              path: ['newPassword'],
            }
          )
          .refine((data) => data.newPassword === data.confirmNewPassword, {
            message: '새 비밀번호가 일치하지 않습니다.',
            path: ['confirmNewPassword'],
          }));
      var RHFInputField = __webpack_require__(
          './src/components/molecules/RHFInputField/RHFInputField.tsx'
        ),
        Button = __webpack_require__('./src/components/atoms/Button/Button.tsx'),
        formFields = __webpack_require__('./src/features/auth/formFields.ts'),
        Logo = __webpack_require__('./src/components/atoms/Logo/Logo.tsx'),
        next_link = __webpack_require__('./node_modules/next/link.js'),
        link_default = __webpack_require__.n(next_link),
        constants = __webpack_require__('./src/constants/index.ts'),
        Toast = __webpack_require__('./src/components/molecules/Toast/Toast.tsx');
      const LoginTemContent = ({ control, isValid, onSubmit, handleSubmit, className, idPrefix }) =>
          (0, jsx_runtime.jsxs)('form', {
            onSubmit: (e) => {
              (e.preventDefault(), handleSubmit(onSubmit)(e));
            },
            className,
            noValidate: !0,
            children: [
              (0, jsx_runtime.jsx)('header', {
                className: 'mb-4 text-center tablet:text-left',
                children: (0, jsx_runtime.jsx)('h1', {
                  className: 'text-20 font-bold text-black-400',
                  children: '로그인',
                }),
              }),
              formFields.Xs.map((field) =>
                (0, jsx_runtime.jsx)(
                  RHFInputField.A,
                  {
                    control,
                    name: field.name,
                    label: field.label,
                    placeholder: field.placeholder,
                    type: field.type,
                    id: `${idPrefix}-${field.name}`,
                    className: 'w-full',
                  },
                  field.name
                )
              ),
              (0, jsx_runtime.jsx)(Button.A, {
                type: 'submit',
                variant: 'primary',
                size: 'md',
                className: 'mt-8',
                fullWidth: !0,
                inactive: !isValid,
                children: '로그인',
              }),
            ],
          }),
        LoginTem = (props) => {
          const {
              control,
              handleSubmit,
              isValid,
              onSubmit,
              showToast,
              toastVariant,
              toastMessage,
              onCloseToast,
            } = (function isGroupedProps(props) {
              return 'formState' in props && 'toastState' in props;
            })(props)
              ? {
                  control: props.formState.control,
                  handleSubmit: props.formState.handleSubmit,
                  isValid: props.formState.isValid,
                  onSubmit: props.formState.onSubmit,
                  showToast: props.toastState.showToast,
                  toastVariant: props.toastState.toastVariant ?? 'custom',
                  toastMessage: props.toastState.toastMessage,
                  onCloseToast: props.toastState.onCloseToast,
                }
              : { ...props, onCloseToast: () => props.setShowToast(!1) },
            contentProps = { control, handleSubmit, isValid, onSubmit };
          return (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
              (0, jsx_runtime.jsxs)('div', {
                className: 'flex flex-col items-center justify-center tablet:hidden desktop:hidden',
                children: [
                  (0, jsx_runtime.jsx)('div', {
                    className: 'm-38',
                    children: (0, jsx_runtime.jsx)(Logo.A, { size: 'lg' }),
                  }),
                  (0, jsx_runtime.jsx)(LoginTemContent, {
                    ...contentProps,
                    idPrefix: 'login-mobile',
                    className: 'flex w-327 flex-col tablet:hidden desktop:hidden',
                  }),
                  (0, jsx_runtime.jsxs)('p', {
                    className: 'mt-24 text-center text-14 text-gray-600',
                    children: [
                      '계정이 없으신가요?',
                      ' ',
                      (0, jsx_runtime.jsx)(link_default(), {
                        href: constants.vp.SIGNUP,
                        className: 'underline font-bold text-gray-950 underline-offset-4',
                        children: '회원가입',
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime.jsxs)('div', {
                className: 'hidden tablet:flex desktop:flex flex-col items-center justify-center',
                children: [
                  (0, jsx_runtime.jsx)('div', {
                    className: 'mt-177',
                    children: (0, jsx_runtime.jsx)(Logo.A, { size: 'lg' }),
                  }),
                  (0, jsx_runtime.jsx)('div', {
                    className: 'w-600 relative',
                    children: (0, jsx_runtime.jsxs)('div', {
                      className:
                        'flex flex-col items-center justify-center py-40 bg-white rounded-16 shadow-2xl relative',
                      children: [
                        (0, jsx_runtime.jsx)(LoginTemContent, {
                          ...contentProps,
                          idPrefix: 'login-desktop',
                          className: 'flex flex-col w-full tablet:w-480 desktop:w-480',
                        }),
                        (0, jsx_runtime.jsxs)('p', {
                          className: 'flex justify-center mt-24 text-14 text-gray-600 gap-5',
                          children: [
                            '기업 담당자이신가요?',
                            (0, jsx_runtime.jsx)(link_default(), {
                              href: constants.vp.SIGNUP,
                              className: 'underline font-bold text-gray-950 underline-offset-4',
                              children: '회원가입',
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
              showToast &&
                (0, jsx_runtime.jsx)('div', {
                  className: 'fixed top-60 left-1/2 transform -translate-x-1/2 z-toast',
                  children: (0, jsx_runtime.jsx)(Toast.y, {
                    variant: toastVariant,
                    message: toastMessage,
                    onClose: onCloseToast,
                  }),
                }),
            ],
          });
        },
        LoginTem_LoginTem = LoginTem;
      LoginTem.__docgenInfo = { description: '', methods: [], displayName: 'LoginTem' };
      const LoginTem_stories = {
          title: 'Features/Auth/Template/LoginTem',
          component: LoginTem_LoginTem,
          tags: ['autodocs'],
          parameters: {
            layout: 'fullscreen',
            nextjs: { appDirectory: !0, navigation: { pathname: '/login' } },
            docs: {
              description: {
                component:
                  '로그인 UI 템플릿 컴포넌트입니다. 순수 UI만 담당하며, 모든 비즈니스 로직(폼 상태, 제출 핸들러, 에러 처리)은 Props로 전달받습니다. React Hook Form의 control과 handleSubmit을 외부에서 주입받아 사용합니다.',
              },
            },
          },
          decorators: [
            (Story) =>
              (0, jsx_runtime.jsx)('div', {
                className: 'min-h-screen bg-gray-50',
                children: (0, jsx_runtime.jsx)(Story, {}),
              }),
          ],
        },
        LoginTemWithForm = (args) => {
          const form = (0, index_esm.mN)({
            resolver: (0, zod.u)(loginSchema),
            mode: 'onTouched',
            defaultValues: { email: '', password: '' },
          });
          return (0, jsx_runtime.jsx)(LoginTem_LoginTem, {
            control: form.control,
            handleSubmit: form.handleSubmit,
            isValid: form.formState.isValid,
            onSubmit: args?.onSubmit ?? (() => {}),
            showToast: args?.showToast ?? !1,
            toastVariant: args?.toastVariant ?? 'error',
            toastMessage: args?.toastMessage ?? '',
            setShowToast: args?.setShowToast ?? (() => {}),
          });
        },
        Default = {
          render: (args) => (0, jsx_runtime.jsx)(LoginTemWithForm, { ...args }),
          args: {
            showToast: !1,
            toastVariant: 'error',
            toastMessage: '',
            onSubmit: () => {},
            setShowToast: () => {},
          },
        },
        WithErrorToast = {
          render: (args) => (0, jsx_runtime.jsx)(LoginTemWithForm, { ...args }),
          args: {
            showToast: !0,
            toastVariant: 'error',
            toastMessage: '이메일 또는 비밀번호가 올바르지 않습니다.',
            onSubmit: () => {},
            setShowToast: () => {},
          },
        },
        WithNetworkErrorToast = {
          render: (args) => (0, jsx_runtime.jsx)(LoginTemWithForm, { ...args }),
          args: {
            showToast: !0,
            toastVariant: 'error',
            toastMessage: '네트워크 오류가 발생했습니다. 다시 시도해 주세요.',
            onSubmit: () => {},
            setShowToast: () => {},
          },
        },
        __namedExportsOrder = ['Default', 'WithErrorToast', 'WithNetworkErrorToast'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  render: args => <LoginTemWithForm {...args as StoryArgs} />,\n  args: {\n    showToast: false,\n    toastVariant: 'error',\n    toastMessage: '',\n    onSubmit: fn(),\n    setShowToast: fn()\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
          description: {
            story:
              '기본 로그인 템플릿\n\n이메일과 비밀번호 입력 필드를 제공합니다.\n모든 필드가 비어있는 초기 상태에서 시작합니다.',
            ...Default.parameters?.docs?.description,
          },
        },
      }),
        (WithErrorToast.parameters = {
          ...WithErrorToast.parameters,
          docs: {
            ...WithErrorToast.parameters?.docs,
            source: {
              originalSource:
                "{\n  render: args => <LoginTemWithForm {...args as StoryArgs} />,\n  args: {\n    showToast: true,\n    toastVariant: 'error',\n    toastMessage: '이메일 또는 비밀번호가 올바르지 않습니다.',\n    onSubmit: fn(),\n    setShowToast: fn()\n  }\n}",
              ...WithErrorToast.parameters?.docs?.source,
            },
            description: {
              story:
                'Toast 알림 - 로그인 실패\n\n로그인 실패 시 Toast 알림이 화면 상단에 표시됩니다.\nToast는 3초 후 자동으로 사라집니다.',
              ...WithErrorToast.parameters?.docs?.description,
            },
          },
        }),
        (WithNetworkErrorToast.parameters = {
          ...WithNetworkErrorToast.parameters,
          docs: {
            ...WithNetworkErrorToast.parameters?.docs,
            source: {
              originalSource:
                "{\n  render: args => <LoginTemWithForm {...args as StoryArgs} />,\n  args: {\n    showToast: true,\n    toastVariant: 'error',\n    toastMessage: '네트워크 오류가 발생했습니다. 다시 시도해 주세요.',\n    onSubmit: fn(),\n    setShowToast: fn()\n  }\n}",
              ...WithNetworkErrorToast.parameters?.docs?.source,
            },
            description: {
              story: 'Toast 알림 - 네트워크 오류\n\n네트워크 오류 발생 시 Toast 알림이 표시됩니다.',
              ...WithNetworkErrorToast.parameters?.docs?.description,
            },
          },
        }));
    },
  },
]);
