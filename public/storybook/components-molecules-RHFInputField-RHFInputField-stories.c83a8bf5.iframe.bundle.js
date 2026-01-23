'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [6159],
  {
    './src/components/molecules/RHFInputField/RHFInputField.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          BusinessNumberField: () => BusinessNumberField,
          CompanyField: () => CompanyField,
          EmailField: () => EmailField,
          FullForm: () => FullForm,
          NameField: () => NameField,
          PasswordConfirmField: () => PasswordConfirmField,
          PasswordField: () => PasswordField,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react_hook_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/react-hook-form/dist/index.esm.mjs'
        ),
        _hookform_resolvers_zod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/@hookform/resolvers/zod/dist/zod.mjs'
        ),
        _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/zod/v4/classic/external.js'
        ),
        _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './src/components/atoms/Button/Button.tsx'
        ),
        _RHFInputField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          './src/components/molecules/RHFInputField/RHFInputField.tsx'
        );
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Molecules/RHFInputField',
          component: _RHFInputField__WEBPACK_IMPORTED_MODULE_5__.A,
          tags: ['autodocs'],
          parameters: {
            docs: {
              description: {
                component:
                  'React Hook Form과 Zod를 사용하는 InputField 래퍼 컴포넌트입니다. InputField를 React Hook Form의 Controller로 감싸서 validation과 에러 처리를 자동화합니다.',
              },
            },
          },
        },
        NameField = {
          render: () => {
            const Wrapper = () => {
              const schema = _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_3__.Ikc({
                  name: _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_3__
                    .YjP()
                    .min(1, '이름을 입력해주세요.'),
                }),
                { control } = (0, react_hook_form__WEBPACK_IMPORTED_MODULE_1__.mN)({
                  resolver: (0, _hookform_resolvers_zod__WEBPACK_IMPORTED_MODULE_2__.u)(schema),
                  mode: 'onBlur',
                  defaultValues: { name: '' },
                });
              return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _RHFInputField__WEBPACK_IMPORTED_MODULE_5__.A,
                {
                  control,
                  name: 'name',
                  label: '이름 (기업 담당자)',
                  placeholder: '이름을 입력해주세요.',
                  type: 'text',
                }
              );
            };
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Wrapper, {});
          },
          parameters: {
            docs: { description: { story: '기본 텍스트 입력 필드입니다. 이름을 입력받습니다.' } },
          },
        },
        EmailField = {
          render: () => {
            const Wrapper = () => {
              const schema = _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_3__.Ikc({
                  email: _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_3__
                    .YjP()
                    .email('유효한 이메일을 입력해주세요.'),
                }),
                { control } = (0, react_hook_form__WEBPACK_IMPORTED_MODULE_1__.mN)({
                  resolver: (0, _hookform_resolvers_zod__WEBPACK_IMPORTED_MODULE_2__.u)(schema),
                  mode: 'onBlur',
                  defaultValues: { email: '' },
                });
              return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _RHFInputField__WEBPACK_IMPORTED_MODULE_5__.A,
                {
                  control,
                  name: 'email',
                  label: '이메일',
                  placeholder: '이메일을 입력해주세요.',
                  type: 'email',
                }
              );
            };
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Wrapper, {});
          },
          parameters: {
            docs: {
              description: {
                story: '이메일 입력 필드입니다. Zod 스키마로 이메일 형식을 검증합니다.',
              },
            },
          },
        },
        PasswordField = {
          render: () => {
            const Wrapper = () => {
              const schema = _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_3__.Ikc({
                  password: _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_3__
                    .YjP()
                    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
                }),
                { control } = (0, react_hook_form__WEBPACK_IMPORTED_MODULE_1__.mN)({
                  resolver: (0, _hookform_resolvers_zod__WEBPACK_IMPORTED_MODULE_2__.u)(schema),
                  mode: 'onBlur',
                  defaultValues: { password: '' },
                });
              return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _RHFInputField__WEBPACK_IMPORTED_MODULE_5__.A,
                {
                  control,
                  name: 'password',
                  label: '비밀번호',
                  placeholder: '비밀번호를 입력해주세요.',
                  type: 'password',
                }
              );
            };
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Wrapper, {});
          },
          parameters: {
            docs: {
              description: { story: '비밀번호 입력 필드입니다. 최소 8자 이상 입력해야 합니다.' },
            },
          },
        },
        PasswordConfirmField = {
          render: () => {
            const Wrapper = () => {
              const schema = _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_3__
                  .Ikc({
                    password: _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_3__
                      .YjP()
                      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
                    passwordConfirm: _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_3__
                      .YjP()
                      .min(1, '비밀번호 확인을 입력해주세요.'),
                  })
                  .refine((data) => data.password === data.passwordConfirm, {
                    message: '비밀번호가 일치하지 않습니다.',
                    path: ['passwordConfirm'],
                  }),
                { control } = (0, react_hook_form__WEBPACK_IMPORTED_MODULE_1__.mN)({
                  resolver: (0, _hookform_resolvers_zod__WEBPACK_IMPORTED_MODULE_2__.u)(schema),
                  mode: 'onBlur',
                  defaultValues: { password: '', passwordConfirm: '' },
                });
              return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: 'flex flex-col gap-20',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _RHFInputField__WEBPACK_IMPORTED_MODULE_5__.A,
                    {
                      control,
                      name: 'password',
                      label: '비밀번호',
                      placeholder: '비밀번호를 입력해주세요.',
                      type: 'password',
                    }
                  ),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _RHFInputField__WEBPACK_IMPORTED_MODULE_5__.A,
                    {
                      control,
                      name: 'passwordConfirm',
                      label: '비밀번호 확인',
                      placeholder: '비밀번호를 한 번 더 입력해주세요.',
                      type: 'password',
                    }
                  ),
                ],
              });
            };
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Wrapper, {});
          },
          parameters: {
            docs: {
              description: {
                story: '비밀번호와 비밀번호 확인 필드입니다. 두 비밀번호가 일치하는지 검증합니다.',
              },
            },
          },
        },
        CompanyField = {
          render: () => {
            const Wrapper = () => {
              const schema = _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_3__.Ikc({
                  company: _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_3__
                    .YjP()
                    .min(1, '회사명을 입력해주세요.'),
                }),
                { control } = (0, react_hook_form__WEBPACK_IMPORTED_MODULE_1__.mN)({
                  resolver: (0, _hookform_resolvers_zod__WEBPACK_IMPORTED_MODULE_2__.u)(schema),
                  mode: 'onBlur',
                  defaultValues: { company: '' },
                });
              return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _RHFInputField__WEBPACK_IMPORTED_MODULE_5__.A,
                {
                  control,
                  name: 'company',
                  label: '회사명',
                  placeholder: '회사명을 입력해주세요.',
                  type: 'text',
                }
              );
            };
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Wrapper, {});
          },
          parameters: { docs: { description: { story: '회사명 입력 필드입니다.' } } },
        },
        BusinessNumberField = {
          render: () => {
            const Wrapper = () => {
              const schema = _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_3__.Ikc({
                  businessNumber: _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_3__
                    .YjP()
                    .regex(/^\d{3}-\d{2}-\d{5}$/, '사업자 번호는 123-45-67890 형식입니다.'),
                }),
                { control } = (0, react_hook_form__WEBPACK_IMPORTED_MODULE_1__.mN)({
                  resolver: (0, _hookform_resolvers_zod__WEBPACK_IMPORTED_MODULE_2__.u)(schema),
                  mode: 'onBlur',
                  defaultValues: { businessNumber: '' },
                });
              return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _RHFInputField__WEBPACK_IMPORTED_MODULE_5__.A,
                {
                  control,
                  name: 'businessNumber',
                  label: '사업자 번호',
                  placeholder: '사업자 번호를 입력해주세요.',
                  type: 'text',
                }
              );
            };
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Wrapper, {});
          },
          parameters: {
            docs: {
              description: {
                story: '사업자 번호 입력 필드입니다. 자동으로 123-45-67890 형식으로 포맷됩니다.',
              },
            },
          },
        },
        FullForm = {
          render: () => {
            const Wrapper = () => {
              const schema = _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_3__
                  .Ikc({
                    name: _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_3__
                      .YjP()
                      .min(1, '이름을 입력해주세요.'),
                    email: _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_3__
                      .YjP()
                      .email('유효한 이메일을 입력해주세요.'),
                    password: _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_3__
                      .YjP()
                      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
                    passwordConfirm: _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_3__
                      .YjP()
                      .min(1, '비밀번호 확인을 입력해주세요.'),
                    company: _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_3__
                      .YjP()
                      .min(1, '회사명을 입력해주세요.'),
                    businessNumber: _barrel_optimize_names_z_zod__WEBPACK_IMPORTED_MODULE_3__
                      .YjP()
                      .regex(/^\d{3}-\d{2}-\d{5}$/, '사업자 번호는 123-45-67890 형식입니다.'),
                  })
                  .refine((data) => data.password === data.passwordConfirm, {
                    message: '비밀번호가 일치하지 않습니다.',
                    path: ['passwordConfirm'],
                  }),
                { control, handleSubmit } = (0, react_hook_form__WEBPACK_IMPORTED_MODULE_1__.mN)({
                  resolver: (0, _hookform_resolvers_zod__WEBPACK_IMPORTED_MODULE_2__.u)(schema),
                  mode: 'onBlur',
                  defaultValues: {
                    name: '',
                    email: '',
                    password: '',
                    passwordConfirm: '',
                    company: '',
                    businessNumber: '',
                  },
                }),
                onSubmit = (_data) => {};
              return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('form', {
                onSubmit: (e) => {
                  (e.preventDefault(), handleSubmit(onSubmit)(e).catch(() => {}));
                },
                className: 'flex flex-col gap-20 w-327',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _RHFInputField__WEBPACK_IMPORTED_MODULE_5__.A,
                    {
                      control,
                      name: 'name',
                      label: '이름 (기업 담당자)',
                      placeholder: '이름을 입력해주세요.',
                      type: 'text',
                    }
                  ),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _RHFInputField__WEBPACK_IMPORTED_MODULE_5__.A,
                    {
                      control,
                      name: 'email',
                      label: '이메일',
                      placeholder: '이메일을 입력해주세요.',
                      type: 'email',
                    }
                  ),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _RHFInputField__WEBPACK_IMPORTED_MODULE_5__.A,
                    {
                      control,
                      name: 'password',
                      label: '비밀번호',
                      placeholder: '비밀번호를 입력해주세요.',
                      type: 'password',
                    }
                  ),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _RHFInputField__WEBPACK_IMPORTED_MODULE_5__.A,
                    {
                      control,
                      name: 'passwordConfirm',
                      label: '비밀번호 확인',
                      placeholder: '비밀번호를 한 번 더 입력해주세요.',
                      type: 'password',
                    }
                  ),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _RHFInputField__WEBPACK_IMPORTED_MODULE_5__.A,
                    {
                      control,
                      name: 'company',
                      label: '회사명',
                      placeholder: '회사명을 입력해주세요.',
                      type: 'text',
                    }
                  ),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _RHFInputField__WEBPACK_IMPORTED_MODULE_5__.A,
                    {
                      control,
                      name: 'businessNumber',
                      label: '사업자 번호',
                      placeholder: '사업자 번호를 입력해주세요.',
                      type: 'text',
                    }
                  ),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_4__.A,
                    { type: 'submit', variant: 'primary', className: 'w-full', children: '제출' }
                  ),
                ],
              });
            };
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Wrapper, {});
          },
        },
        __namedExportsOrder = [
          'NameField',
          'EmailField',
          'PasswordField',
          'PasswordConfirmField',
          'CompanyField',
          'BusinessNumberField',
          'FullForm',
        ];
      ((NameField.parameters = {
        ...NameField.parameters,
        docs: {
          ...NameField.parameters?.docs,
          source: {
            originalSource:
              '{\n  render: () => {\n    const Wrapper = () => {\n      const schema = z.object({\n        name: z.string().min(1, \'이름을 입력해주세요.\')\n      });\n      type FormData = z.infer<typeof schema>;\n      const {\n        control\n      } = useForm<FormData>({\n        resolver: zodResolver(schema),\n        mode: \'onBlur\',\n        defaultValues: {\n          name: \'\'\n        }\n      });\n      return <RHFInputField control={control} name="name" label="이름 (기업 담당자)" placeholder="이름을 입력해주세요." type="text" />;\n    };\n    return <Wrapper />;\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: \'기본 텍스트 입력 필드입니다. 이름을 입력받습니다.\'\n      }\n    }\n  }\n}',
            ...NameField.parameters?.docs?.source,
          },
        },
      }),
        (EmailField.parameters = {
          ...EmailField.parameters,
          docs: {
            ...EmailField.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => {\n    const Wrapper = () => {\n      const schema = z.object({\n        email: z.string().email(\'유효한 이메일을 입력해주세요.\')\n      });\n      type FormData = z.infer<typeof schema>;\n      const {\n        control\n      } = useForm<FormData>({\n        resolver: zodResolver(schema),\n        mode: \'onBlur\',\n        defaultValues: {\n          email: \'\'\n        }\n      });\n      return <RHFInputField control={control} name="email" label="이메일" placeholder="이메일을 입력해주세요." type="email" />;\n    };\n    return <Wrapper />;\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: \'이메일 입력 필드입니다. Zod 스키마로 이메일 형식을 검증합니다.\'\n      }\n    }\n  }\n}',
              ...EmailField.parameters?.docs?.source,
            },
          },
        }),
        (PasswordField.parameters = {
          ...PasswordField.parameters,
          docs: {
            ...PasswordField.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => {\n    const Wrapper = () => {\n      const schema = z.object({\n        password: z.string().min(8, \'비밀번호는 최소 8자 이상이어야 합니다.\')\n      });\n      type FormData = z.infer<typeof schema>;\n      const {\n        control\n      } = useForm<FormData>({\n        resolver: zodResolver(schema),\n        mode: \'onBlur\',\n        defaultValues: {\n          password: \'\'\n        }\n      });\n      return <RHFInputField control={control} name="password" label="비밀번호" placeholder="비밀번호를 입력해주세요." type="password" />;\n    };\n    return <Wrapper />;\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: \'비밀번호 입력 필드입니다. 최소 8자 이상 입력해야 합니다.\'\n      }\n    }\n  }\n}',
              ...PasswordField.parameters?.docs?.source,
            },
          },
        }),
        (PasswordConfirmField.parameters = {
          ...PasswordConfirmField.parameters,
          docs: {
            ...PasswordConfirmField.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => {\n    const Wrapper = () => {\n      const schema = z.object({\n        password: z.string().min(8, \'비밀번호는 최소 8자 이상이어야 합니다.\'),\n        passwordConfirm: z.string().min(1, \'비밀번호 확인을 입력해주세요.\')\n      }).refine(data => data.password === data.passwordConfirm, {\n        message: \'비밀번호가 일치하지 않습니다.\',\n        path: [\'passwordConfirm\']\n      });\n      type FormData = z.infer<typeof schema>;\n      const {\n        control\n      } = useForm<FormData>({\n        resolver: zodResolver(schema),\n        mode: \'onBlur\',\n        defaultValues: {\n          password: \'\',\n          passwordConfirm: \'\'\n        }\n      });\n      return <div className="flex flex-col gap-20">\n          <RHFInputField control={control} name="password" label="비밀번호" placeholder="비밀번호를 입력해주세요." type="password" />\n          <RHFInputField control={control} name="passwordConfirm" label="비밀번호 확인" placeholder="비밀번호를 한 번 더 입력해주세요." type="password" />\n        </div>;\n    };\n    return <Wrapper />;\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: \'비밀번호와 비밀번호 확인 필드입니다. 두 비밀번호가 일치하는지 검증합니다.\'\n      }\n    }\n  }\n}',
              ...PasswordConfirmField.parameters?.docs?.source,
            },
          },
        }),
        (CompanyField.parameters = {
          ...CompanyField.parameters,
          docs: {
            ...CompanyField.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => {\n    const Wrapper = () => {\n      const schema = z.object({\n        company: z.string().min(1, \'회사명을 입력해주세요.\')\n      });\n      type FormData = z.infer<typeof schema>;\n      const {\n        control\n      } = useForm<FormData>({\n        resolver: zodResolver(schema),\n        mode: \'onBlur\',\n        defaultValues: {\n          company: \'\'\n        }\n      });\n      return <RHFInputField control={control} name="company" label="회사명" placeholder="회사명을 입력해주세요." type="text" />;\n    };\n    return <Wrapper />;\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: \'회사명 입력 필드입니다.\'\n      }\n    }\n  }\n}',
              ...CompanyField.parameters?.docs?.source,
            },
          },
        }),
        (BusinessNumberField.parameters = {
          ...BusinessNumberField.parameters,
          docs: {
            ...BusinessNumberField.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => {\n    const Wrapper = () => {\n      const schema = z.object({\n        businessNumber: z.string().regex(/^\\d{3}-\\d{2}-\\d{5}$/, \'사업자 번호는 123-45-67890 형식입니다.\')\n      });\n      type FormData = z.infer<typeof schema>;\n      const {\n        control\n      } = useForm<FormData>({\n        resolver: zodResolver(schema),\n        mode: \'onBlur\',\n        defaultValues: {\n          businessNumber: \'\'\n        }\n      });\n      return <RHFInputField control={control} name="businessNumber" label="사업자 번호" placeholder="사업자 번호를 입력해주세요." type="text" />;\n    };\n    return <Wrapper />;\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: \'사업자 번호 입력 필드입니다. 자동으로 123-45-67890 형식으로 포맷됩니다.\'\n      }\n    }\n  }\n}',
              ...BusinessNumberField.parameters?.docs?.source,
            },
          },
        }),
        (FullForm.parameters = {
          ...FullForm.parameters,
          docs: {
            ...FullForm.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => {\n    const Wrapper = () => {\n      const schema = z.object({\n        name: z.string().min(1, \'이름을 입력해주세요.\'),\n        email: z.string().email(\'유효한 이메일을 입력해주세요.\'),\n        password: z.string().min(8, \'비밀번호는 최소 8자 이상이어야 합니다.\'),\n        passwordConfirm: z.string().min(1, \'비밀번호 확인을 입력해주세요.\'),\n        company: z.string().min(1, \'회사명을 입력해주세요.\'),\n        businessNumber: z.string().regex(/^\\d{3}-\\d{2}-\\d{5}$/, \'사업자 번호는 123-45-67890 형식입니다.\')\n      }).refine(data => data.password === data.passwordConfirm, {\n        message: \'비밀번호가 일치하지 않습니다.\',\n        path: [\'passwordConfirm\']\n      });\n      type FormData = z.infer<typeof schema>;\n      const {\n        control,\n        handleSubmit\n      } = useForm<FormData>({\n        resolver: zodResolver(schema),\n        mode: \'onBlur\',\n        defaultValues: {\n          name: \'\',\n          email: \'\',\n          password: \'\',\n          passwordConfirm: \'\',\n          company: \'\',\n          businessNumber: \'\'\n        }\n      });\n      const onSubmit = (_data: FormData): void => {\n        // Storybook 데모용 submit\n      };\n\n      // ✅ JSX에 들어갈 "순수 void 반환" 핸들러\n      const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {\n        e.preventDefault();\n        handleSubmit(onSubmit)(e).catch(() => {\n          // Storybook 데모용이므로 에러 무시\n        });\n      };\n      return <form onSubmit={handleFormSubmit} className="flex flex-col gap-20 w-327">\n          <RHFInputField control={control} name="name" label="이름 (기업 담당자)" placeholder="이름을 입력해주세요." type="text" />\n          <RHFInputField control={control} name="email" label="이메일" placeholder="이메일을 입력해주세요." type="email" />\n          <RHFInputField control={control} name="password" label="비밀번호" placeholder="비밀번호를 입력해주세요." type="password" />\n          <RHFInputField control={control} name="passwordConfirm" label="비밀번호 확인" placeholder="비밀번호를 한 번 더 입력해주세요." type="password" />\n          <RHFInputField control={control} name="company" label="회사명" placeholder="회사명을 입력해주세요." type="text" />\n          <RHFInputField control={control} name="businessNumber" label="사업자 번호" placeholder="사업자 번호를 입력해주세요." type="text" />\n          <Button type="submit" variant="primary" className="w-full">\n            제출\n          </Button>\n        </form>;\n    };\n    return <Wrapper />;\n  }\n}',
              ...FullForm.parameters?.docs?.source,
            },
          },
        }));
    },
  },
]);
