'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [6408],
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
    './src/features/auth/schemas/signup.schema.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        O: () => signupSchema,
        x: () => inviteSignupSchema,
      });
      var _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        './node_modules/zod/v4/classic/external.js'
      );
      const signupSchema = _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_0__
          .Ikc({
            name: _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_0__
              .YjP()
              .min(1, '이름을 입력해주세요.')
              .max(30, '이름은 최대 30자까지 입력 가능합니다.'),
            email: _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_0__
              .YjP()
              .min(1, '이메일을 입력해주세요.')
              .email('유효하지 않은 이메일입니다.'),
            password: _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_0__
              .YjP()
              .min(1, '비밀번호를 입력해주세요.')
              .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
              .max(30, '비밀번호는 최대 30자까지 입력 가능합니다.'),
            confirmPassword: _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_0__
              .YjP()
              .min(1, '비밀번호 확인을 입력해주세요.'),
            companyName: _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_0__
              .YjP()
              .min(1, '회사명을 입력해주세요.')
              .max(30, '회사명은 최대 30자까지 입력 가능합니다.'),
            businessNumber: _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_0__
              .YjP()
              .min(1, '사업자 번호를 입력해주세요.')
              .max(12, '사업자 번호는 10자리입니다. (예: 123-45-67890)')
              .regex(/^\d{3}-\d{2}-\d{5}$/, '올바른 형식이 아닙니다. (예: 123-45-67890)'),
          })
          .refine(
            (data) => {
              const hasLowerCase = /[a-z]/.test(data.password),
                hasNumber = /[0-9]/.test(data.password),
                hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(data.password);
              return hasLowerCase && hasNumber && hasSpecialChar;
            },
            { message: '비밀번호는 소문자, 숫자, 특수문자를 포함해야 합니다.', path: ['password'] }
          )
          .refine((data) => data.password === data.confirmPassword, {
            message: '비밀번호가 일치하지 않습니다.',
            path: ['confirmPassword'],
          }),
        inviteSignupSchema = _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_0__
          .Ikc({
            email: _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_0__
              .YjP()
              .min(1, '이메일을 입력해주세요.')
              .email('유효하지 않은 이메일입니다.'),
            password: _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_0__
              .YjP()
              .min(1, '비밀번호를 입력해주세요.')
              .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
              .max(30, '비밀번호는 최대 30자까지 입력 가능합니다.'),
            confirmPassword: _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_0__
              .YjP()
              .min(1, '비밀번호 확인을 입력해주세요.'),
          })
          .refine(
            (data) => {
              const hasLowerCase = /[a-z]/.test(data.password),
                hasNumber = /[0-9]/.test(data.password),
                hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(data.password);
              return hasLowerCase && hasNumber && hasSpecialChar;
            },
            { message: '비밀번호는 소문자, 숫자, 특수문자를 포함해야 합니다.', path: ['password'] }
          )
          .refine((data) => data.password === data.confirmPassword, {
            message: '비밀번호가 일치하지 않습니다.',
            path: ['confirmPassword'],
          });
    },
    './src/features/auth/template/InviteSignupTem/InviteSignupTem.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          ComplexState: () => ComplexState,
          Default: () => Default,
          NetworkError: () => NetworkError,
          WithImagePreview: () => WithImagePreview,
          WithLongName: () => WithLongName,
          WithServerError: () => WithServerError,
          WithToast: () => WithToast,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => InviteSignupTem_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        index_esm = __webpack_require__('./node_modules/react-hook-form/dist/index.esm.mjs'),
        zod = __webpack_require__('./node_modules/@hookform/resolvers/zod/dist/zod.mjs'),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        signup_schema = __webpack_require__('./src/features/auth/schemas/signup.schema.ts'),
        RHFInputField = __webpack_require__(
          './src/components/molecules/RHFInputField/RHFInputField.tsx'
        ),
        Button = __webpack_require__('./src/components/atoms/Button/Button.tsx'),
        formFields = __webpack_require__('./src/features/auth/formFields.ts'),
        Logo = __webpack_require__('./src/components/atoms/Logo/Logo.tsx'),
        next_link = __webpack_require__('./node_modules/next/link.js'),
        link_default = __webpack_require__.n(next_link),
        constants = __webpack_require__('./src/constants/index.ts'),
        Toast = __webpack_require__('./src/components/molecules/Toast/Toast.tsx'),
        next_image = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        );
      const InviteSignupTemContent = ({
          control,
          isValid,
          onSubmit,
          handleSubmit,
          preview,
          onImageChange,
          onImageDelete,
          isUploading,
          name,
          className,
          imageInputId,
        }) =>
          (0, jsx_runtime.jsxs)('form', {
            onSubmit: (e) => {
              (e.preventDefault(), handleSubmit(onSubmit)(e));
            },
            className,
            noValidate: !0,
            children: [
              (0, jsx_runtime.jsxs)('header', {
                className: 'mb-4 text-center tablet:text-left',
                children: [
                  (0, jsx_runtime.jsxs)('h1', {
                    className: 'text-20 font-bold text-black-400',
                    children: [name, ' 님, 만나서 반갑습니다.'],
                  }),
                  (0, jsx_runtime.jsx)('p', {
                    className: 'mt-4 text-14 text-gray-600',
                    children: '비밀번호를 입력해 회원가입을 완료해주세요',
                  }),
                ],
              }),
              (0, jsx_runtime.jsxs)('div', {
                className: 'mb-24',
                children: [
                  (0, jsx_runtime.jsx)('div', {
                    className: 'block mb-8 text-14 font-medium text-gray-700',
                    children: '프로필 이미지 (선택)',
                  }),
                  (0, jsx_runtime.jsx)('div', {
                    className: 'flex justify-center',
                    children: (0, jsx_runtime.jsxs)('div', {
                      className: 'relative',
                      children: [
                        (0, jsx_runtime.jsxs)('label', {
                          htmlFor: imageInputId,
                          className: 'cursor-pointer',
                          children: [
                            (0, jsx_runtime.jsx)('div', {
                              className:
                                'w-140 h-140 rounded-8 flex items-center justify-center overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors relative',
                              children:
                                preview && preview.startsWith('blob:')
                                  ? (0, jsx_runtime.jsx)(next_image.A, {
                                      src: preview,
                                      alt: '프로필 미리보기',
                                      width: 140,
                                      height: 140,
                                      className: 'object-cover',
                                      unoptimized: !0,
                                    })
                                  : (0, jsx_runtime.jsx)(next_image.A, {
                                      src: '/icons/upload.svg',
                                      alt: '이미지 업로드',
                                      width: 140,
                                      height: 140,
                                      className: 'object-contain',
                                    }),
                            }),
                            (0, jsx_runtime.jsx)('input', {
                              id: imageInputId,
                              type: 'file',
                              accept: 'image/*',
                              onChange: onImageChange,
                              disabled: isUploading,
                              className: 'hidden',
                            }),
                          ],
                        }),
                        preview &&
                          preview.startsWith('blob:') &&
                          onImageDelete &&
                          (0, jsx_runtime.jsx)('button', {
                            type: 'button',
                            onClick: (e) => {
                              (e.stopPropagation(), onImageDelete());
                            },
                            className:
                              'absolute top-0 right-0 w-24 h-24 flex items-center justify-center bg-white rounded-full z-50 shadow-sm',
                            'aria-label': '이미지 삭제',
                            children: (0, jsx_runtime.jsx)(next_image.A, {
                              src: '/icons/close-circle.svg',
                              alt: '삭제',
                              width: 24,
                              height: 24,
                              unoptimized: !0,
                            }),
                          }),
                      ],
                    }),
                  }),
                  isUploading &&
                    (0, jsx_runtime.jsx)('p', {
                      className: 'mt-8 text-center text-12 text-gray-600',
                      children: '이미지 업로드 중...',
                    }),
                ],
              }),
              formFields.tW.map((field) =>
                (0, jsx_runtime.jsx)(
                  RHFInputField.A,
                  {
                    control,
                    name: field.name,
                    label: field.label,
                    placeholder: field.placeholder,
                    type: field.type,
                    className: 'w-full',
                    disabled: field.disabled,
                    errorLines: 2,
                  },
                  field.name
                )
              ),
              (0, jsx_runtime.jsx)(Button.A, {
                type: 'submit',
                variant: 'primary',
                className: 'mt-8',
                fullWidth: !0,
                inactive: !isValid,
                children: '회원가입',
              }),
            ],
          }),
        InviteSignupTem = (props) => {
          const {
              control,
              handleSubmit,
              isValid,
              onSubmit,
              showToast,
              toastMessage,
              onCloseToast,
              preview,
              onImageChange,
              onImageDelete,
              isUploading,
              name,
            } = (function isGroupedProps(props) {
              return (
                'formState' in props &&
                'toastState' in props &&
                'imageState' in props &&
                'inviteInfo' in props
              );
            })(props)
              ? {
                  control: props.formState.control,
                  handleSubmit: props.formState.handleSubmit,
                  isValid: props.formState.isValid,
                  onSubmit: props.formState.onSubmit,
                  showToast: props.toastState.showToast,
                  toastMessage: props.toastState.toastMessage,
                  onCloseToast: props.toastState.onCloseToast,
                  preview: props.imageState.preview,
                  onImageChange: props.imageState.onImageChange,
                  onImageDelete: props.imageState.onImageDelete,
                  isUploading: props.imageState.isUploading,
                  name: props.inviteInfo.name,
                }
              : {
                  ...props,
                  onCloseToast: () => props.setShowToast(!1),
                  isUploading: props.isUploading ?? !1,
                },
            contentProps = {
              control,
              handleSubmit,
              isValid,
              onSubmit,
              preview,
              onImageChange,
              onImageDelete,
              isUploading,
              name,
            };
          return (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
              (0, jsx_runtime.jsxs)('div', {
                className: 'flex flex-col items-center justify-center tablet:hidden desktop:hidden',
                children: [
                  (0, jsx_runtime.jsx)('div', {
                    className: 'm-38',
                    children: (0, jsx_runtime.jsx)(Logo.A, { size: 'lg' }),
                  }),
                  (0, jsx_runtime.jsx)(InviteSignupTemContent, {
                    ...contentProps,
                    imageInputId: 'invite-profile-image-upload-mobile',
                    className: 'flex w-327 flex-col tablet:hidden desktop:hidden',
                  }),
                  (0, jsx_runtime.jsxs)('p', {
                    className: 'mt-24 text-center text-14 text-gray-600',
                    children: [
                      '이미 계정이 있으신가요?',
                      ' ',
                      (0, jsx_runtime.jsx)(link_default(), {
                        href: constants.vp.LOGIN,
                        className: 'underline font-bold text-gray-950 underline-offset-4',
                        children: '로그인',
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime.jsxs)('div', {
                className: 'hidden tablet:flex desktop:flex flex-col items-center justify-center',
                children: [
                  (0, jsx_runtime.jsx)('div', {
                    className: 'mt-120',
                    children: (0, jsx_runtime.jsx)(Logo.A, { size: 'lg' }),
                  }),
                  (0, jsx_runtime.jsx)('div', {
                    className: 'w-600 relative',
                    children: (0, jsx_runtime.jsxs)('div', {
                      className:
                        'flex flex-col items-center justify-center py-40 bg-white rounded-16 shadow-2xl relative',
                      children: [
                        (0, jsx_runtime.jsx)(InviteSignupTemContent, {
                          ...contentProps,
                          imageInputId: 'invite-profile-image-upload-desktop',
                          className: 'flex flex-col w-full tablet:w-480 desktop:w-480',
                        }),
                        (0, jsx_runtime.jsxs)('p', {
                          className: 'flex justify-center mt-24 text-14 text-gray-600 ',
                          children: [
                            '이미 계정이 있으신가요?',
                            ' ',
                            (0, jsx_runtime.jsx)(link_default(), {
                              href: constants.vp.LOGIN,
                              className: 'underline font-bold text-gray-950 underline-offset-4',
                              children: '로그인',
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
                    variant: 'custom',
                    message: toastMessage,
                    onClose: onCloseToast,
                  }),
                }),
            ],
          });
        },
        InviteSignupTem_InviteSignupTem = InviteSignupTem;
      InviteSignupTem.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'InviteSignupTem',
      };
      const InviteSignupTem_stories = {
          title: 'Features/Auth/Template/InviteSignupTem',
          component: InviteSignupTem_InviteSignupTem,
          tags: ['autodocs'],
          parameters: {
            layout: 'fullscreen',
            nextjs: {
              appDirectory: !0,
              navigation: { pathname: '/invite', query: { token: 'dummy-token-123' } },
            },
            docs: {
              description: {
                component:
                  '초대 회원가입 UI 템플릿 컴포넌트입니다. 순수 UI만 담당하며, 모든 비즈니스 로직(폼 상태, 제출 핸들러, 에러 처리, 이미지 업로드)은 Props로 전달받습니다. 이메일은 초대 정보에서 가져오므로 읽기 전용이며, 사용자는 비밀번호만 입력합니다. 프로필 이미지 업로드는 선택 사항입니다.',
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
        InviteSignupTemWithForm = (args) => {
          const form = (0, index_esm.mN)({
              resolver: (0, zod.u)(signup_schema.x),
              mode: 'onTouched',
              defaultValues: {
                email: args?.name ? `${args.name}@example.com` : 'user@example.com',
                password: '',
                confirmPassword: '',
              },
            }),
            [preview, setPreview] = (0, react.useState)(args?.preview ?? null);
          return (0, jsx_runtime.jsx)(InviteSignupTem_InviteSignupTem, {
            control: form.control,
            handleSubmit: form.handleSubmit,
            isValid: form.formState.isValid,
            onSubmit: args?.onSubmit ?? (() => {}),
            showToast: args?.showToast ?? !1,
            toastMessage: args?.toastMessage ?? '',
            setShowToast: args?.setShowToast ?? (() => {}),
            preview,
            onImageChange:
              args?.onImageChange ??
              ((e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const previewUrl = URL.createObjectURL(file);
                  setPreview(previewUrl);
                }
              }),
            name: args?.name ?? '홍길동',
          });
        },
        Default = {
          render: (args) => (0, jsx_runtime.jsx)(InviteSignupTemWithForm, { ...args }),
          args: {
            name: '홍길동',
            showToast: !1,
            toastMessage: '',
            preview: null,
            onSubmit: () => {},
            setShowToast: () => {},
            onImageChange: () => {},
          },
        },
        WithImagePreview = {
          render: (args) => (0, jsx_runtime.jsx)(InviteSignupTemWithForm, { ...args }),
          args: {
            name: '김철수',
            showToast: !1,
            toastMessage: '',
            preview: 'https://picsum.photos/200/200',
            onSubmit: () => {},
            setShowToast: () => {},
            onImageChange: () => {},
          },
        },
        WithServerError = {
          render: (args) => (0, jsx_runtime.jsx)(InviteSignupTemWithForm, { ...args }),
          args: {
            name: '이영희',
            showToast: !0,
            toastMessage: '초대 토큰이 만료되었습니다. 관리자에게 문의해 주세요.',
            preview: null,
            onSubmit: () => {},
            setShowToast: () => {},
            onImageChange: () => {},
          },
        },
        WithToast = {
          render: (args) => (0, jsx_runtime.jsx)(InviteSignupTemWithForm, { ...args }),
          args: {
            name: '박민수',
            showToast: !0,
            toastMessage: '이미지 업로드에 실패했습니다. 다시 시도해 주세요.',
            preview: null,
            onSubmit: () => {},
            setShowToast: () => {},
            onImageChange: () => {},
          },
        },
        WithLongName = {
          render: (args) => (0, jsx_runtime.jsx)(InviteSignupTemWithForm, { ...args }),
          args: {
            name: '알렉산더 막시밀리안 요한',
            showToast: !1,
            toastMessage: '',
            preview: null,
            onSubmit: () => {},
            setShowToast: () => {},
            onImageChange: () => {},
          },
        },
        ComplexState = {
          render: (args) => (0, jsx_runtime.jsx)(InviteSignupTemWithForm, { ...args }),
          args: {
            name: '정수현',
            showToast: !0,
            toastMessage: '입력 정보를 확인해 주세요.',
            preview: 'https://picsum.photos/200/200',
            onSubmit: () => {},
            setShowToast: () => {},
            onImageChange: () => {},
          },
        },
        NetworkError = {
          render: (args) => (0, jsx_runtime.jsx)(InviteSignupTemWithForm, { ...args }),
          args: {
            name: '최지훈',
            showToast: !0,
            toastMessage: '요청 시간이 초과되었습니다. 다시 시도해주세요.',
            preview: null,
            onSubmit: () => {},
            setShowToast: () => {},
            onImageChange: () => {},
          },
        },
        __namedExportsOrder = [
          'Default',
          'WithImagePreview',
          'WithServerError',
          'WithToast',
          'WithLongName',
          'ComplexState',
          'NetworkError',
        ];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  render: args => <InviteSignupTemWithForm {...args as StoryArgs} />,\n  args: {\n    name: '홍길동',\n    showToast: false,\n    toastMessage: '',\n    preview: null,\n    onSubmit: fn(),\n    setShowToast: fn(),\n    onImageChange: fn()\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
          description: {
            story:
              '기본 초대 회원가입 템플릿\n\n초대된 사용자를 위한 회원가입 폼을 제공합니다.\n- 환영 메시지 (이름 표시)\n- 프로필 이미지 업로드 (선택)\n- 이메일 (읽기 전용, 초대 정보에서 자동 입력)\n- 비밀번호, 비밀번호 확인\n\n모든 필드가 초기 상태에서 시작합니다.',
            ...Default.parameters?.docs?.description,
          },
        },
      }),
        (WithImagePreview.parameters = {
          ...WithImagePreview.parameters,
          docs: {
            ...WithImagePreview.parameters?.docs,
            source: {
              originalSource:
                "{\n  render: args => <InviteSignupTemWithForm {...args as StoryArgs} />,\n  args: {\n    name: '김철수',\n    showToast: false,\n    toastMessage: '',\n    preview: 'https://picsum.photos/200/200',\n    onSubmit: fn(),\n    setShowToast: fn(),\n    onImageChange: fn()\n  }\n}",
              ...WithImagePreview.parameters?.docs?.source,
            },
            description: {
              story:
                '프로필 이미지 미리보기\n\n사용자가 프로필 이미지를 업로드한 상태를 보여줍니다.\n이미지 업로드는 선택 사항이며, 140x140px 크기로 표시됩니다.',
              ...WithImagePreview.parameters?.docs?.description,
            },
          },
        }),
        (WithServerError.parameters = {
          ...WithServerError.parameters,
          docs: {
            ...WithServerError.parameters?.docs,
            source: {
              originalSource:
                "{\n  render: args => <InviteSignupTemWithForm {...args as StoryArgs} />,\n  args: {\n    name: '이영희',\n    showToast: true,\n    toastMessage: '초대 토큰이 만료되었습니다. 관리자에게 문의해 주세요.',\n    preview: null,\n    onSubmit: fn(),\n    setShowToast: fn(),\n    onImageChange: fn()\n  }\n}",
              ...WithServerError.parameters?.docs?.source,
            },
            description: {
              story:
                '서버 에러 상태 (Toast로 표시)\n\n회원가입 실패 시 서버에서 반환된 에러 메시지가 Toast로 표시됩니다.\n서버 통신 에러는 Toast로만 표시되며, 폼 상단에는 표시되지 않습니다.',
              ...WithServerError.parameters?.docs?.description,
            },
          },
        }),
        (WithToast.parameters = {
          ...WithToast.parameters,
          docs: {
            ...WithToast.parameters?.docs,
            source: {
              originalSource:
                "{\n  render: args => <InviteSignupTemWithForm {...args as StoryArgs} />,\n  args: {\n    name: '박민수',\n    showToast: true,\n    toastMessage: '이미지 업로드에 실패했습니다. 다시 시도해 주세요.',\n    preview: null,\n    onSubmit: fn(),\n    setShowToast: fn(),\n    onImageChange: fn()\n  }\n}",
              ...WithToast.parameters?.docs?.source,
            },
            description: {
              story:
                'Toast 알림 표시\n\n회원가입 성공/실패 또는 이미지 업로드 실패 시 Toast 알림이 화면 상단에 표시됩니다.\nToast는 3초 후 자동으로 사라집니다.',
              ...WithToast.parameters?.docs?.description,
            },
          },
        }),
        (WithLongName.parameters = {
          ...WithLongName.parameters,
          docs: {
            ...WithLongName.parameters?.docs,
            source: {
              originalSource:
                "{\n  render: args => <InviteSignupTemWithForm {...args as StoryArgs} />,\n  args: {\n    name: '알렉산더 막시밀리안 요한',\n    showToast: false,\n    toastMessage: '',\n    preview: null,\n    onSubmit: fn(),\n    setShowToast: fn(),\n    onImageChange: fn()\n  }\n}",
              ...WithLongName.parameters?.docs?.source,
            },
            description: {
              story:
                '긴 이름 테스트\n\n긴 사용자 이름이 UI에 어떻게 표시되는지 확인합니다.\n환영 메시지에 이름이 포함되므로 레이아웃이 깨지지 않는지 검증합니다.',
              ...WithLongName.parameters?.docs?.description,
            },
          },
        }),
        (ComplexState.parameters = {
          ...ComplexState.parameters,
          docs: {
            ...ComplexState.parameters?.docs,
            source: {
              originalSource:
                "{\n  render: args => <InviteSignupTemWithForm {...args as StoryArgs} />,\n  args: {\n    name: '정수현',\n    showToast: true,\n    toastMessage: '입력 정보를 확인해 주세요.',\n    preview: 'https://picsum.photos/200/200',\n    onSubmit: fn(),\n    setShowToast: fn(),\n    onImageChange: fn()\n  }\n}",
              ...ComplexState.parameters?.docs?.source,
            },
            description: {
              story:
                '복합 상태 (이미지 + Toast)\n\n여러 상태가 동시에 활성화된 복합적인 시나리오입니다.\n실제 사용 시 발생할 수 있는 상황을 시뮬레이션합니다.',
              ...ComplexState.parameters?.docs?.description,
            },
          },
        }),
        (NetworkError.parameters = {
          ...NetworkError.parameters,
          docs: {
            ...NetworkError.parameters?.docs,
            source: {
              originalSource:
                "{\n  render: args => <InviteSignupTemWithForm {...args as StoryArgs} />,\n  args: {\n    name: '최지훈',\n    showToast: true,\n    toastMessage: '요청 시간이 초과되었습니다. 다시 시도해주세요.',\n    preview: null,\n    onSubmit: fn(),\n    setShowToast: fn(),\n    onImageChange: fn()\n  }\n}",
              ...NetworkError.parameters?.docs?.source,
            },
            description: {
              story:
                '네트워크 에러 시나리오\n\n초대 토큰 검증 중 네트워크 에러가 발생한 상황을 시뮬레이션합니다.\n서버 에러는 Toast로만 표시됩니다.',
              ...NetworkError.parameters?.docs?.description,
            },
          },
        }));
    },
  },
]);
