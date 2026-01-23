'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [1200],
  {
    './src/components/molecules/InputField/InputField.tsx'(
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
        _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/components/atoms/IconButton/IconButton.tsx'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _utils_formatBusinessNumber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './src/utils/formatBusinessNumber.ts'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        );
      const InputField = ({
          id,
          label,
          placeholder,
          type = 'text',
          value = '',
          onChange,
          onBlur,
          minLength = 8,
          maxLength = 30,
          compareWith,
          disabled,
        }) => {
          const [internal, setInternal] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(value),
            [visible, setVisible] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            [touched, setTouched] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            generatedId = (0, react__WEBPACK_IMPORTED_MODULE_1__.useId)(),
            inputId = id ?? generatedId;
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            setInternal(value);
          }, [value]);
          let isValid = !0;
          if ('businessNumber' !== type && internal.length > maxLength) isValid = !1;
          else if ('text' !== type || internal.trim()) {
            if ('email' === type) {
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(internal) || (isValid = !1);
            } else if ('password' === type && internal.length < minLength) isValid = !1;
            else if ('passwordConfirm' === type && internal !== compareWith) isValid = !1;
            else if ('businessNumber' === type) {
              /^\d{3}-\d{2}-\d{5}$/.test(internal) || (isValid = !1);
            }
          } else isValid = !1;
          let inputType = 'text';
          'password' === type || 'passwordConfirm' === type
            ? (inputType = visible ? 'text' : 'password')
            : 'email' === type && (inputType = 'email');
          const showToggle = 'password' === type || 'passwordConfirm' === type;
          let autoCompleteValue;
          return (
            'email' === type
              ? (autoCompleteValue = 'email')
              : ('password' !== type && 'passwordConfirm' !== type) ||
                (autoCompleteValue = 'current-password'),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
              className: 'flex flex-col w-full',
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('label', {
                  htmlFor: inputId,
                  className: 'text-12 text-gray-600 font-normal tracking--0.3 mb-1',
                  children: label,
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'flex items-center gap-1 h-40 w-full',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('input', {
                      id: inputId,
                      type: inputType,
                      placeholder,
                      value: internal,
                      onFocus: () => setTouched(!0),
                      onChange: (e) => {
                        let v = e.target.value;
                        ('businessNumber' === type &&
                          (v = (0, _utils_formatBusinessNumber__WEBPACK_IMPORTED_MODULE_4__.b)(v)),
                          setInternal(v),
                          onChange?.(v),
                          setTouched(!0));
                      },
                      onBlur,
                      'aria-invalid': !isValid,
                      maxLength: 'businessNumber' === type ? 12 : void 0,
                      disabled,
                      autoComplete: autoCompleteValue,
                      className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                        'flex-1 bg-transparent border-none outline-none',
                        'font-suit text-16 font-normal tracking-tight text-gray-950'
                      ),
                    }),
                    showToggle &&
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                        _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_2__.K,
                        {
                          variant: 'default',
                          size: 'sm',
                          onClick: () => setVisible((s) => !s),
                          className: 'cursor-pointer',
                          children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            next_image__WEBPACK_IMPORTED_MODULE_5__.A,
                            {
                              src: visible ? '/icons/eye.svg' : '/icons/eye-off.svg',
                              alt: visible ? '숨기기' : '보기',
                              width: 16,
                              height: 16,
                            }
                          ),
                        }
                      ),
                  ],
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                    'w-full border-b mb-4',
                    touched && !isValid ? 'border-error-500' : 'border-gray-600'
                  ),
                }),
              ],
            })
          );
        },
        __WEBPACK_DEFAULT_EXPORT__ = InputField;
      InputField.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'InputField',
        props: {
          id: { required: !1, tsType: { name: 'string' }, description: '' },
          label: { required: !0, tsType: { name: 'string' }, description: '' },
          placeholder: { required: !0, tsType: { name: 'string' }, description: '' },
          type: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'text' | 'email' | 'password' | 'passwordConfirm' | 'businessNumber'",
              elements: [
                { name: 'literal', value: "'text'" },
                { name: 'literal', value: "'email'" },
                { name: 'literal', value: "'password'" },
                { name: 'literal', value: "'passwordConfirm'" },
                { name: 'literal', value: "'businessNumber'" },
              ],
            },
            description: '',
            defaultValue: { value: "'text'", computed: !1 },
          },
          value: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "''", computed: !1 },
          },
          onChange: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(value: string) => void',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'value' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          onBlur: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          minLength: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '8', computed: !1 },
          },
          maxLength: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '30', computed: !1 },
          },
          compareWith: { required: !1, tsType: { name: 'string' }, description: '' },
          disabled: { required: !1, tsType: { name: 'boolean' }, description: '' },
        },
      };
    },
    './src/components/molecules/ProductModal/ProductModal.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, { default: () => __WEBPACK_DEFAULT_EXPORT__ }));
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
        _components_atoms_DropDown_DropDown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './src/components/atoms/DropDown/DropDown.tsx'
        ),
        _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          './src/components/atoms/Button/Button.tsx'
        ),
        _components_molecules_InputField_InputField__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__('./src/components/molecules/InputField/InputField.tsx'),
        _hooks_useToast__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__('./src/hooks/useToast.ts'),
        _constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__('./src/constants/index.ts'),
        _utils_validation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
          './src/utils/validation.ts'
        ),
        _utils_logger__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__('./src/utils/logger.ts'),
        _utils_api__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__('./src/utils/api.ts'),
        _features_products_constants_api__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
          './src/features/products/constants/api.ts'
        );
      const categories = _constants__WEBPACK_IMPORTED_MODULE_8__.w.map((s) => ({
          key: String(s.id),
          label: s.title,
        })),
        subCategoriesByCategory = _constants__WEBPACK_IMPORTED_MODULE_8__.w.reduce(
          (acc, section) => ({
            ...acc,
            [String(section.id)]: section.options.map((opt) => ({
              key: String(opt.value),
              label: opt.label,
            })),
          }),
          {}
        ),
        ProductModal = ({
          open,
          onClose,
          onSubmit,
          initialName,
          initialPrice,
          initialLink,
          initialImage,
          initialCategory,
          initialSubCategory,
        }) => {
          const [productName, setProductName] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(
              ''
            ),
            [price, setPrice] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            [link, setLink] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            [preview, setPreview] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
            [selectedCategory, setSelectedCategory] = (0,
            react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
            [selectedSubCategory, setSelectedSubCategory] = (0,
            react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
            [selectedFile, setSelectedFile] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(
              null
            ),
            [isSubmitting, setIsSubmitting] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            [touched, setTouched] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)({
              name: !1,
              price: !1,
              link: !1,
              category: !1,
              subCategory: !1,
            }),
            previewUrlRef = (0, react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null),
            prevCategoryRef = (0, react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null),
            [errors, setErrors] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)({
              name: '',
              price: '',
              link: '',
              category: '',
              subCategory: '',
              image: '',
            }),
            filteredSubCategories =
              (selectedCategory && subCategoriesByCategory[selectedCategory.key]) || [],
            { triggerToast } = (0, _hooks_useToast__WEBPACK_IMPORTED_MODULE_7__.d)(),
            validate = (0, react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
              const newErrors = {
                name: '',
                price: '',
                link: '',
                category: '',
                subCategory: '',
                image: '',
              };
              return (
                productName.trim() || (newErrors.name = '상품명을 입력해주세요.'),
                (0, _utils_validation__WEBPACK_IMPORTED_MODULE_9__.F8)(price) &&
                  (newErrors.price = '가격을 입력해주세요.'),
                link.trim()
                  ? link.trim().length < 1 || link.trim().length > 255
                    ? (newErrors.link = '제품 링크는 1자 이상 255자 이하여야 합니다.')
                    : (0, _utils_validation__WEBPACK_IMPORTED_MODULE_9__.AY)(link) ||
                      (newErrors.link = 'http:// 또는 https://로 시작하는 URL을 입력해주세요.')
                  : (newErrors.link = '제품 링크를 입력해주세요.'),
                selectedCategory || (newErrors.category = '대분류를 선택해주세요.'),
                selectedSubCategory || (newErrors.subCategory = '소분류를 선택해주세요.'),
                setErrors(newErrors),
                !Object.values(newErrors).some((msg) => '' !== msg)
              );
            }, [productName, price, link, selectedCategory, selectedSubCategory]);
          if (
            ((0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
              open &&
                (setProductName(initialName),
                setPrice((0, _utils_validation__WEBPACK_IMPORTED_MODULE_9__.$g)(initialPrice)),
                setLink(initialLink),
                setPreview(initialImage),
                setSelectedCategory(initialCategory),
                setSelectedSubCategory(initialSubCategory),
                (prevCategoryRef.current = initialCategory),
                setSelectedFile(null),
                setErrors({
                  name: '',
                  price: '',
                  link: '',
                  category: '',
                  subCategory: '',
                  image: '',
                }),
                setTouched({ name: !1, price: !1, link: !1, category: !1, subCategory: !1 }));
            }, [
              open,
              initialName,
              initialPrice,
              initialLink,
              initialImage,
              initialCategory,
              initialSubCategory,
            ]),
            (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
              (prevCategoryRef.current &&
                selectedCategory &&
                prevCategoryRef.current.key !== selectedCategory.key &&
                setSelectedSubCategory(null),
                (prevCategoryRef.current = selectedCategory));
            }, [selectedCategory]),
            (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
              if (open) {
                Object.values(touched).some((t) => t) && validate();
              }
            }, [
              open,
              productName,
              price,
              link,
              selectedCategory,
              selectedSubCategory,
              touched,
              validate,
            ]),
            (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
              !open &&
                previewUrlRef.current &&
                (URL.revokeObjectURL(previewUrlRef.current), (previewUrlRef.current = null));
            }, [open]),
            !open)
          )
            return null;
          const isValid =
            productName.trim() &&
            price.trim() &&
            link.trim() &&
            selectedCategory &&
            selectedSubCategory &&
            Object.values(errors).every((msg) => '' === msg);
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: 'fixed inset-0 z-modal flex items-center justify-center',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('button', {
                type: 'button',
                'aria-label': '모달 닫기 영역',
                className: 'absolute inset-0 bg-black/50',
                onClick: onClose,
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                role: 'dialog',
                'aria-modal': 'true',
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                  'relative bg-white rounded-12 flex flex-col gap-30 items-center',
                  'p-30 tablet:w-512'
                ),
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h2', {
                    className: 'text-18 font-bold',
                    children: '상품 등록',
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                    className: 'flex flex-col items-center gap-2',
                    children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                        'w-140 h-140 border rounded-8 flex items-center justify-center overflow-hidden cursor-pointer relative',
                        'border-gray-300'
                      ),
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('input', {
                          type: 'file',
                          accept: 'image/*',
                          className: 'absolute inset-0 opacity-0 cursor-pointer',
                          onChange: (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            if (file.size > 5242880)
                              return (
                                triggerToast('error', '이미지 크기는 5MB 이하여야 합니다.'),
                                void (e.target.value = '')
                              );
                            if (
                              ![
                                'image/jpeg',
                                'image/jpg',
                                'image/png',
                                'image/gif',
                                'image/webp',
                              ].includes(file.type)
                            )
                              return (
                                triggerToast('error', '지원되는 형식: JPEG, JPG, PNG, GIF, WEBP'),
                                void (e.target.value = '')
                              );
                            (setSelectedFile(file),
                              previewUrlRef.current && URL.revokeObjectURL(previewUrlRef.current));
                            const previewUrl = URL.createObjectURL(file);
                            ((previewUrlRef.current = previewUrl), setPreview(previewUrl));
                          },
                        }),
                        !preview || preview.includes('no-image') || preview.includes('upload.svg')
                          ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                              {
                                src: '/icons/upload.svg',
                                alt: 'upload',
                                width: 140,
                                height: 140,
                                className: 'object-contain pointer-events-none',
                              }
                            )
                          : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                              react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                              {
                                children: [
                                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                    next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                                    {
                                      src: preview,
                                      alt: 'preview',
                                      width: 140,
                                      height: 140,
                                      className: 'object-contain pointer-events-none',
                                      unoptimized: !0,
                                    }
                                  ),
                                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                    'button',
                                    {
                                      type: 'button',
                                      onClick: (e) => {
                                        (e.stopPropagation(),
                                          previewUrlRef.current &&
                                            (URL.revokeObjectURL(previewUrlRef.current),
                                            (previewUrlRef.current = null)),
                                          setPreview('/icons/upload.svg'),
                                          setSelectedFile(null));
                                      },
                                      className:
                                        'absolute top-0 right-0 w-24 h-24 flex items-center justify-center bg-white rounded-full z-50',
                                      'aria-label': '이미지 삭제',
                                      children: (0,
                                      react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                        next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                                        {
                                          src: '/icons/close-circle.svg',
                                          alt: '삭제',
                                          width: 24,
                                          height: 24,
                                          className: 'pointer-events-none',
                                        }
                                      ),
                                    }
                                  ),
                                ],
                              }
                            ),
                      ],
                    }),
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('form', {
                    className: 'w-full flex flex-col flex-1 gap-30',
                    onSubmit: (e) => {
                      (e.preventDefault(),
                        setTouched({
                          name: !0,
                          price: !0,
                          link: !0,
                          category: !0,
                          subCategory: !0,
                        }),
                        validate() &&
                          (async () => {
                            if (!validate()) throw new Error('유효성 검사 실패');
                            const body = {
                              categoryId: Number(
                                selectedSubCategory?.key ?? selectedCategory?.key ?? 0
                              ),
                              name: productName.trim(),
                              price: Number(price.replace(/,/g, '')),
                              link: link.trim(),
                            };
                            let requestBody;
                            const headers = {};
                            if (selectedFile) {
                              const formData = new FormData();
                              (formData.append('name', body.name),
                                formData.append('price', String(body.price)),
                                formData.append('link', body.link),
                                formData.append('categoryId', String(body.categoryId)),
                                formData.append('image', selectedFile),
                                (requestBody = formData));
                            } else
                              ((requestBody = JSON.stringify(body)),
                                (headers['Content-Type'] = 'application/json'));
                            setIsSubmitting(!0);
                            try {
                              const res = await (0, _utils_api__WEBPACK_IMPORTED_MODULE_11__.v$)(
                                  _features_products_constants_api__WEBPACK_IMPORTED_MODULE_12__.O
                                    .CREATE_PRODUCT,
                                  { method: 'POST', body: requestBody, headers }
                                ),
                                text = await res.text();
                              let result;
                              try {
                                result = JSON.parse(text);
                              } catch {
                                result = { success: !1, message: text };
                              }
                              if (!res.ok || !result.success) {
                                let errorMessage = '상품 등록에 실패했습니다.';
                                if (result.error)
                                  if ('object' == typeof result.error && null !== result.error) {
                                    const errorObj = result.error,
                                      fieldErrors = [];
                                    (Object.keys(errorObj).forEach((key) => {
                                      if ('code' !== key && 'message' !== key) {
                                        const fieldError = errorObj[key];
                                        if ('object' == typeof fieldError && null !== fieldError) {
                                          const fieldErrorObj = fieldError;
                                          fieldErrorObj.message &&
                                            fieldErrors.push(fieldErrorObj.message);
                                        } else
                                          'string' == typeof fieldError &&
                                            fieldErrors.push(fieldError);
                                      }
                                    }),
                                      fieldErrors.length > 0
                                        ? (errorMessage = fieldErrors.join(', '))
                                        : errorObj.message &&
                                          'string' == typeof errorObj.message &&
                                          (errorMessage = errorObj.message));
                                  } else
                                    'string' == typeof result.error &&
                                      (errorMessage = result.error);
                                else result.message && (errorMessage = result.message);
                                throw (
                                  _utils_logger__WEBPACK_IMPORTED_MODULE_10__.v.error(
                                    'Product registration failed',
                                    {
                                      hasError: !0,
                                      errorType: 'ApiError',
                                      status: res.status,
                                      statusText: res.statusText,
                                      responseText: text,
                                      requestBody: body,
                                      parsedErrorMessage: errorMessage,
                                    }
                                  ),
                                  triggerToast('error', errorMessage),
                                  new Error(errorMessage)
                                );
                              }
                              (triggerToast('success', '상품이 등록되었습니다.'),
                                onSubmit(),
                                onClose());
                            } catch (error) {
                              if (
                                (_utils_logger__WEBPACK_IMPORTED_MODULE_10__.v.error(
                                  'Product registration failed',
                                  {
                                    hasError: !0,
                                    errorType:
                                      error instanceof Error ? error.constructor.name : 'Unknown',
                                    errorMessage:
                                      error instanceof Error ? error.message : String(error),
                                    requestBody: body,
                                  }
                                ),
                                !(
                                  error instanceof Error && error.message.includes('이미지 업로드')
                                ))
                              ) {
                                const errorMessage =
                                  error instanceof Error && error.message
                                    ? error.message
                                    : '상품 등록 중 오류가 발생했습니다.';
                                triggerToast('error', errorMessage);
                              }
                            } finally {
                              setIsSubmitting(!1);
                            }
                          })()
                            .then(() => {
                              onSubmit();
                            })
                            .catch(() => {}));
                    },
                    children: [
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                        className: 'flex flex-col gap-2 mb-6 tablet:mb-8 desktop:mb-8',
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                            className: 'flex gap-20',
                            children: [
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                _components_atoms_DropDown_DropDown__WEBPACK_IMPORTED_MODULE_4__.A,
                                {
                                  items: categories,
                                  placeholder: '대분류',
                                  variant: 'medium',
                                  buttonClassName: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                                    touched.category && !selectedCategory && 'border-red-500'
                                  ),
                                  onSelect: (option) => {
                                    (setSelectedCategory(option),
                                      setTouched((prev) => ({ ...prev, category: !0 })));
                                  },
                                  selected: selectedCategory || void 0,
                                  inModal: !0,
                                }
                              ),
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                _components_atoms_DropDown_DropDown__WEBPACK_IMPORTED_MODULE_4__.A,
                                {
                                  items: filteredSubCategories,
                                  placeholder: '소분류',
                                  variant: 'medium',
                                  buttonClassName: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                                    touched.subCategory && !selectedSubCategory && 'border-red-500'
                                  ),
                                  onSelect: (option) => {
                                    (setSelectedSubCategory(option),
                                      setTouched((prev) => ({ ...prev, subCategory: !0 })));
                                  },
                                  selected: selectedSubCategory || void 0,
                                  inModal: !0,
                                }
                              ),
                            ],
                          }),
                          touched.category &&
                            errors.category &&
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                              className: 'text-red-500 text-12',
                              children: errors.category,
                            }),
                          touched.subCategory &&
                            errors.subCategory &&
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                              className: 'text-red-500 text-12',
                              children: errors.subCategory,
                            }),
                        ],
                      }),
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                        className: 'w-full flex flex-col gap-1',
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            _components_molecules_InputField_InputField__WEBPACK_IMPORTED_MODULE_6__.A,
                            {
                              label: '상품명',
                              placeholder: '상품명을 입력해주세요',
                              value: productName,
                              onChange: (value) => {
                                (setProductName(value),
                                  setTouched((prev) => ({ ...prev, name: !0 })));
                              },
                              onBlur: () => setTouched((prev) => ({ ...prev, name: !0 })),
                              minLength: 1,
                              maxLength: 20,
                            }
                          ),
                          touched.name &&
                            errors.name &&
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                              className: 'text-red-500 text-12',
                              children: errors.name,
                            }),
                        ],
                      }),
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                        className: 'w-full flex flex-col gap-1',
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            _components_molecules_InputField_InputField__WEBPACK_IMPORTED_MODULE_6__.A,
                            {
                              label: '가격',
                              placeholder: '가격을 입력해주세요',
                              value: price,
                              onChange: (v) => {
                                const numeric = v.replace(/[^0-9]/g, '');
                                (0, _utils_validation__WEBPACK_IMPORTED_MODULE_9__.mR)(numeric) &&
                                  (setPrice(
                                    numeric
                                      ? (0, _utils_validation__WEBPACK_IMPORTED_MODULE_9__.$g)(
                                          numeric
                                        )
                                      : ''
                                  ),
                                  setTouched((prev) => ({ ...prev, price: !0 })));
                              },
                              onBlur: () => setTouched((prev) => ({ ...prev, price: !0 })),
                              type: 'text',
                              minLength: 1,
                            }
                          ),
                          touched.price &&
                            errors.price &&
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                              className: 'text-red-500 text-12',
                              children: errors.price,
                            }),
                        ],
                      }),
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                        className: 'w-full flex flex-col gap-1',
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            _components_molecules_InputField_InputField__WEBPACK_IMPORTED_MODULE_6__.A,
                            {
                              label: '제품 링크',
                              placeholder: '제품 링크를 입력해주세요',
                              value: link,
                              onChange: (value) => {
                                (setLink(value), setTouched((prev) => ({ ...prev, link: !0 })));
                              },
                              onBlur: () => setTouched((prev) => ({ ...prev, link: !0 })),
                              type: 'text',
                              maxLength: 255,
                            }
                          ),
                          touched.link &&
                            errors.link &&
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                              className: 'text-red-500 text-12',
                              children: errors.link,
                            }),
                        ],
                      }),
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                        className: 'flex-1',
                      }),
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                        className:
                          'flex gap-20 justify-center tablet:justify-start desktop:justify-start pb-6',
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_5__.A,
                            {
                              variant: 'secondary',
                              onClick: onClose,
                              className:
                                'mobile:w-153 mobile:h-64 tablet:w-216 tablet:h-64 desktop:w-216 desktop:h-64 text-16 cursor-pointer',
                              children: '취소',
                            }
                          ),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_5__.A,
                            {
                              type: 'submit',
                              variant: 'primary',
                              inactive: !isValid || isSubmitting,
                              className:
                                'mobile:w-153 mobile:h-64 tablet:w-216 tablet:h-64 desktop:w-216 desktop:h-64 text-16 cursor-pointer',
                              children: isSubmitting ? '등록 중...' : '등록하기',
                            }
                          ),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = ProductModal;
      ProductModal.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'ProductModal',
        props: {
          open: { required: !0, tsType: { name: 'boolean' }, description: '' },
          onClose: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          onSubmit: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          initialName: { required: !0, tsType: { name: 'string' }, description: '' },
          initialPrice: { required: !0, tsType: { name: 'string' }, description: '' },
          initialLink: { required: !0, tsType: { name: 'string' }, description: '' },
          initialImage: {
            required: !0,
            tsType: {
              name: 'union',
              raw: 'string | null',
              elements: [{ name: 'string' }, { name: 'null' }],
            },
            description: '',
          },
          initialCategory: {
            required: !0,
            tsType: {
              name: 'union',
              raw: 'Option | null',
              elements: [{ name: 'Option' }, { name: 'null' }],
            },
            description: '',
          },
          initialSubCategory: {
            required: !0,
            tsType: {
              name: 'union',
              raw: 'Option | null',
              elements: [{ name: 'Option' }, { name: 'null' }],
            },
            description: '',
          },
        },
      };
    },
    './src/features/products/constants/api.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { O: () => PRODUCT_API_PATHS });
      const PRODUCT_API_PATHS = {
        GET_PRODUCTS: '/api/v1/product',
        GET_MY_PRODUCTS: '/api/v1/product/my',
        GET_PRODUCT_BY_ID: (productId) => `/api/v1/product/${productId}`,
        GET_MY_PRODUCT_BY_ID: (productId) => `/api/v1/product/my/${productId}`,
        CREATE_PRODUCT: '/api/v1/product',
        UPDATE_PRODUCT: (productId) => `/api/v1/product/${productId}`,
        DELETE_PRODUCT: (productId) => `/api/v1/product/${productId}`,
        UPLOAD_IMAGE: '/api/v1/upload/image',
        GET_IMAGE: (key) => `/api/v1/upload/image/${key}`,
        DELETE_IMAGE: (key) => `/api/v1/upload/image/${key}`,
      };
    },
    './src/utils/formatBusinessNumber.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { b: () => formatBusinessNumber });
      const formatBusinessNumber = (value) => {
        const numbers = value.replace(/[^\d]/g, '');
        return numbers.length <= 3
          ? numbers
          : numbers.length <= 5
            ? `${numbers.slice(0, 3)}-${numbers.slice(3)}`
            : `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5)}`;
      };
    },
    './src/utils/validation.ts'(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.d(__webpack_exports__, {
        $g: () => formatPrice,
        AY: () => isValidUrl,
        F8: () => isInvalidPrice,
        mR: () => isValidPriceInput,
      });
      const formatPrice = (value) =>
          value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        isInvalidPrice = (price) => {
          const numericPrice = price.replace(/[^0-9]/g, '');
          return !numericPrice || 0 === Number(numericPrice);
        },
        isValidUrl = (url) => /^https?:\/\/.+/.test(url),
        isValidPriceInput = (input) => {
          const numeric = input.replace(/[^0-9]/g, '');
          return '' === numeric || (numeric.length <= 7 && Number(numeric) <= 9999999);
        };
    },
  },
]);
