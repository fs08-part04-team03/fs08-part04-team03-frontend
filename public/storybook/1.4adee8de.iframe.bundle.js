'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [1],
  {
    './src/components/atoms/DropDown/DropDown.tsx'(
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
        react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/next/dist/compiled/react-dom/index.js'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const DropDown = ({
          items,
          placeholder = '선택',
          variant,
          disabled = !1,
          buttonClassName = '',
          dropdownClassName = '',
          optionClassName = '',
          onSelect,
          selected: externalSelected,
          inModal = !1,
        }) => {
          const [open, setOpen] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            [mounted, setMounted] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            [selected, setSelected] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(
              externalSelected ?? null
            ),
            buttonRef = (0, react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null),
            dropdownRef = (0, react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null),
            [position, setPosition] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)({
              top: 0,
              left: 0,
              width: 0,
            });
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            setMounted(!0);
          }, []);
          const handleSelect = (item) => {
            (setSelected(item),
              setOpen(!1),
              queueMicrotask(() => {
                onSelect?.(item);
              }));
          };
          ((0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            setSelected(externalSelected ?? null);
          }, [externalSelected]),
            (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
              if (!open || !buttonRef.current) return;
              const rect = buttonRef.current.getBoundingClientRect();
              setPosition({
                top: rect.bottom + window.scrollY + 4,
                left: rect.left + window.scrollX,
                width: rect.width,
              });
            }, [open]),
            (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
              if (!open) return;
              const handleClickOutside = (e) => {
                  !dropdownRef.current ||
                    dropdownRef.current.contains(e.target) ||
                    buttonRef.current?.contains(e.target) ||
                    setOpen(!1);
                },
                handleEscape = (e) => {
                  'Escape' === e.key && setOpen(!1);
                };
              return (
                document.addEventListener('mousedown', handleClickOutside),
                document.addEventListener('keydown', handleEscape),
                () => {
                  (document.removeEventListener('mousedown', handleClickOutside),
                    document.removeEventListener('keydown', handleEscape));
                }
              );
            }, [open]));
          const appliedVariant = variant ?? 'small',
            textColorClasses = {
              small: 'text-gray-950',
              medium: 'text-gray-500',
              large: 'text-gray-950',
            },
            fontClasses = 'font-sans font-normal text-13 tracking--0.4',
            optionHeightClasses = { small: 'h-44', medium: 'h-56', large: 'h-44' },
            zIndexClass = inModal ? 'z-[var(--z-modaldropdown)]' : 'z-[var(--z-dropdown)]';
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            {
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('button', {
                  ref: buttonRef,
                  type: 'button',
                  onClick: () => !disabled && setOpen((prev) => !prev),
                  disabled,
                  'aria-haspopup': 'listbox',
                  'aria-expanded': open,
                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                    'border border-gray-300 rounded-8 bg-white flex items-center justify-between px-12',
                    {
                      small: 'w-110 h-44',
                      medium: 'mobile:w-153 tablet:w-216 desktop:w-216 h-56',
                      large: 'mobile:w-327 tablet:w-480 desktop:w-480 h-44',
                    }[appliedVariant],
                    disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
                    buttonClassName
                  ),
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                        fontClasses,
                        textColorClasses[appliedVariant]
                      ),
                      children: selected ? selected.label : placeholder,
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      next_image__WEBPACK_IMPORTED_MODULE_3__.A,
                      {
                        src: '/icons/arrow-down.svg',
                        alt: '',
                        'aria-hidden': !0,
                        width: 12,
                        height: 12,
                        className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                          'w-12 h-12 transition-transform duration-200',
                          open && 'rotate-180'
                        ),
                      }
                    ),
                  ],
                }),
                mounted &&
                  open &&
                  (0, react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)(
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('ul', {
                      ref: dropdownRef,
                      role: 'listbox',
                      'aria-label': placeholder,
                      style: {
                        position: 'absolute',
                        top: position.top,
                        left: position.left,
                        width: position.width,
                      },
                      className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                        zIndexClass,
                        'bg-white border border-gray-300 shadow-lg rounded-8 max-h-200 overflow-y-auto scrollbar-none',
                        dropdownClassName
                      ),
                      children: items.map((item) =>
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          'li',
                          {
                            role: 'option',
                            'aria-selected': selected?.key === item.key,
                            tabIndex: 0,
                            onClick: () => handleSelect(item),
                            onKeyDown: (e) => {
                              ('Enter' !== e.key && ' ' !== e.key) ||
                                (e.preventDefault(), handleSelect(item));
                            },
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                              'flex items-center px-12 cursor-pointer hover:bg-gray-100',
                              fontClasses,
                              textColorClasses[appliedVariant],
                              optionHeightClasses[appliedVariant],
                              selected?.key === item.key && 'bg-gray-50',
                              optionClassName
                            ),
                            children: item.label,
                          },
                          item.key
                        )
                      ),
                    }),
                    document.body
                  ),
              ],
            }
          );
        },
        __WEBPACK_DEFAULT_EXPORT__ = DropDown;
      DropDown.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'DropDown',
        props: {
          items: {
            required: !0,
            tsType: { name: 'Array', elements: [{ name: 'Option' }], raw: 'Option[]' },
            description: '',
          },
          placeholder: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'선택'", computed: !1 },
          },
          variant: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'small' | 'medium' | 'large'",
              elements: [
                { name: 'literal', value: "'small'" },
                { name: 'literal', value: "'medium'" },
                { name: 'literal', value: "'large'" },
              ],
            },
            description: '',
          },
          disabled: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
          buttonClassName: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "''", computed: !1 },
          },
          dropdownClassName: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "''", computed: !1 },
          },
          optionClassName: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "''", computed: !1 },
          },
          onSelect: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(item: Option) => void',
              signature: {
                arguments: [{ type: { name: 'Option' }, name: 'item' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          selected: { required: !1, tsType: { name: 'Option' }, description: '' },
          inModal: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
        },
      };
    },
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
    './src/components/molecules/ProductEditModal/ProductEditModal.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => ProductEditModal_ProductEditModal });
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        next_image = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        clsx = __webpack_require__('./node_modules/clsx/dist/clsx.mjs'),
        DropDown = __webpack_require__('./src/components/atoms/DropDown/DropDown.tsx'),
        Button = __webpack_require__('./src/components/atoms/Button/Button.tsx'),
        InputField = __webpack_require__('./src/components/molecules/InputField/InputField.tsx'),
        categories_constants = __webpack_require__(
          './src/constants/categories/categories.constants.ts'
        ),
        validation = __webpack_require__('./src/utils/validation.ts'),
        utils_logger = __webpack_require__('./src/utils/logger.ts'),
        api = __webpack_require__('./src/utils/api.ts'),
        authStore = __webpack_require__('./src/lib/store/authStore.ts'),
        constants_api =
          (__webpack_require__('./src/constants/categories/categories.utils.ts'),
          __webpack_require__('./src/features/products/constants/api.ts'));
      async function uploadProductImage(file, folder = 'products', skipAuth = !1) {
        const formData = new FormData();
        formData.append('image', file);
        const { accessToken } = authStore.n.getState(),
          uploadUrl = `${constants_api.O.UPLOAD_IMAGE}?folder=${encodeURIComponent(folder)}`;
        let response;
        if (
          ((response =
            skipAuth || !accessToken
              ? await fetch(`${(0, api.e9)()}${uploadUrl}`, {
                  method: 'POST',
                  body: formData,
                  credentials: 'include',
                })
              : await (0, api.v$)(uploadUrl, { method: 'POST', body: formData }, accessToken)),
          !response.ok)
        ) {
          const errorText = await response.text();
          let errorMessage = '이미지 업로드에 실패했습니다.';
          try {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.error?.message || errorJson.message || errorMessage;
          } catch {}
          throw new Error(errorMessage);
        }
        const result = await response.json();
        if (!result.success || !result.data)
          throw new Error('이미지 업로드 응답 형식이 올바르지 않습니다.');
        return result.data.key;
      }
      var useToast = __webpack_require__('./src/hooks/useToast.ts');
      const categories = [
          { key: '1', label: '스낵' },
          { key: '2', label: '음료' },
          { key: '3', label: '생수' },
          { key: '4', label: '간편식' },
          { key: '5', label: '신선식' },
          { key: '6', label: '원두커피' },
          { key: '7', label: '비품' },
        ],
        subCategoriesByCategory = {
          1: [
            { key: 'snack-snack', label: '과자' },
            { key: 'snack-cookie', label: '쿠키' },
            { key: 'snack-biscuit', label: '비스켓류' },
            { key: 'snack-chocolate', label: '초콜릿류' },
            { key: 'snack-candy', label: '캔디류' },
            { key: 'snack-jelly', label: '젤리류' },
            { key: 'snack-cereal-bar', label: '시리얼바' },
            { key: 'snack-nuts', label: '견과류' },
          ],
          2: [
            { key: 'drink-soda', label: '탄산음료' },
            { key: 'drink-fruit', label: '과즙음료' },
            { key: 'drink-energy', label: '에너지음료' },
            { key: 'drink-ion', label: '이온음료' },
            { key: 'drink-health', label: '건강음료' },
            { key: 'drink-tea', label: '차류' },
          ],
          3: [
            { key: 'water-water', label: '생수' },
            { key: 'water-sparkling', label: '스파클링' },
          ],
          4: [
            { key: 'simple-cup-ramen', label: '컵라면' },
            { key: 'simple-sausage', label: '소시지' },
            { key: 'simple-egg', label: '계란' },
            { key: 'simple-cup-rice', label: '컵밥류' },
            { key: 'simple-cereal', label: '시리얼' },
          ],
          5: [
            { key: 'fresh-fruit', label: '과일' },
            { key: 'fresh-salad', label: '샐러드' },
            { key: 'fresh-bread', label: '빵' },
            { key: 'fresh-sandwich', label: '샌드위치' },
            { key: 'fresh-yogurt', label: '요거트류' },
            { key: 'fresh-dairy', label: '유제품' },
          ],
          6: [
            { key: 'coffee-drip', label: '드립커피' },
            { key: 'coffee-beans', label: '원두' },
            { key: 'coffee-capsule', label: '캡슐커피' },
          ],
          7: [
            { key: 'supplies-disposable', label: '일회용품' },
            { key: 'supplies-office', label: '사무용품' },
            { key: 'supplies-cleaning', label: '청소용품' },
            { key: 'supplies-hygiene', label: '위생용품' },
          ],
        },
        ProductEditModal = ({
          open,
          onClose,
          onSubmit,
          initialName,
          initialPrice,
          initialLink,
          initialImage,
          initialImageKey,
          initialCategory,
          initialSubCategory,
        }) => {
          const [productName, setProductName] = (0, react.useState)(''),
            [price, setPrice] = (0, react.useState)(''),
            [link, setLink] = (0, react.useState)(''),
            [preview, setPreview] = (0, react.useState)(null),
            [selectedCategory, setSelectedCategory] = (0, react.useState)(null),
            [selectedSubCategory, setSelectedSubCategory] = (0, react.useState)(null),
            [_selectedFile, setSelectedFile] = (0, react.useState)(null),
            [uploadedImageKey, setUploadedImageKey] = (0, react.useState)(null),
            [uploadedImageFile, setUploadedImageFile] = (0, react.useState)(null),
            [isUploading, setIsUploading] = (0, react.useState)(!1),
            [currentImageKey, setCurrentImageKey] = (0, react.useState)(initialImageKey || null),
            [touched, setTouched] = (0, react.useState)({
              name: !1,
              price: !1,
              link: !1,
              category: !1,
              subCategory: !1,
            }),
            previewUrlRef = (0, react.useRef)(null),
            [errors, setErrors] = (0, react.useState)({
              name: '',
              price: '',
              link: '',
              category: '',
              subCategory: '',
              image: '',
            }),
            filteredSubCategories =
              (selectedCategory && subCategoriesByCategory[selectedCategory.key]) || [],
            { triggerToast } = (0, useToast.d)();
          ((0, react.useEffect)(
            () => () => {
              previewUrlRef.current &&
                (URL.revokeObjectURL(previewUrlRef.current), (previewUrlRef.current = null));
            },
            []
          ),
            (0, react.useEffect)(() => {
              open
                ? (setProductName(initialName),
                  setPrice((0, validation.$g)(initialPrice)),
                  setLink(initialLink),
                  setPreview(initialImage),
                  setSelectedCategory(initialCategory),
                  setSelectedSubCategory(initialSubCategory),
                  setSelectedFile(null),
                  setUploadedImageKey(null),
                  setUploadedImageFile(null),
                  setCurrentImageKey(initialImageKey || null),
                  setErrors({
                    name: '',
                    price: '',
                    link: '',
                    category: '',
                    subCategory: '',
                    image: '',
                  }),
                  setTouched({ name: !1, price: !1, link: !1, category: !1, subCategory: !1 }))
                : previewUrlRef.current &&
                  (URL.revokeObjectURL(previewUrlRef.current), (previewUrlRef.current = null));
            }, [
              open,
              initialName,
              initialPrice,
              initialLink,
              initialImage,
              initialImageKey,
              initialCategory,
              initialSubCategory,
            ]));
          const validate = (0, react.useCallback)(() => {
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
              (0, validation.F8)(price) && (newErrors.price = '가격을 입력해주세요.'),
              link.trim()
                ? (0, validation.AY)(link) ||
                  (newErrors.link = 'http:// 또는 https://로 시작하는 URL을 입력해주세요.')
                : (newErrors.link = '제품 링크를 입력해주세요.'),
              selectedCategory || (newErrors.category = '대분류를 선택해주세요.'),
              selectedSubCategory || (newErrors.subCategory = '소분류를 선택해주세요.'),
              setErrors(newErrors),
              !Object.values(newErrors).some((msg) => '' !== msg)
            );
          }, [productName, price, link, selectedCategory, selectedSubCategory]);
          if (
            ((0, react.useEffect)(() => {
              const handleEsc = (e) => open && 'Escape' === e.key && onClose();
              return (
                open && document.addEventListener('keydown', handleEsc),
                () => document.removeEventListener('keydown', handleEsc)
              );
            }, [open, onClose]),
            (0, react.useEffect)(() => {
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
            !open)
          )
            return null;
          const handleSubmit = async (e) => {
              if (
                (e.preventDefault(),
                setTouched({ name: !0, price: !0, link: !0, category: !0, subCategory: !0 }),
                !validate())
              )
                return;
              const categoryId = ((key) => {
                if (!key) return 0;
                const childCategory = categories_constants.A.find((cat) => cat.key === key);
                if (childCategory) return childCategory.id;
                const parentCategory = categories_constants._.find(
                  (cat) => cat.key === key || String(cat.id) === key
                );
                return parentCategory ? parentCategory.id : 0;
              })(selectedSubCategory?.key ?? selectedCategory?.key);
              if (!categoryId)
                return void setErrors((prev) => ({
                  ...prev,
                  category: '카테고리를 선택해주세요.',
                }));
              const formData = {
                name: productName.trim(),
                price: Number(price.replace(/,/g, '')),
                link: link.trim(),
                categoryId,
              };
              try {
                (uploadedImageKey && uploadedImageFile
                  ? ((formData.image = uploadedImageKey),
                    utils_logger.v.info('[ProductEditModal] handleSubmit: 새 이미지 키 사용', {
                      imageKey: uploadedImageKey,
                    }))
                  : preview &&
                      preview === initialImage &&
                      currentImageKey &&
                      !initialImage?.includes('no-image') &&
                      !initialImage?.includes('upload.svg')
                    ? ((formData.image = currentImageKey),
                      utils_logger.v.info('[ProductEditModal] handleSubmit: 기존 이미지 키 유지', {
                        imageKey: currentImageKey,
                      }))
                    : utils_logger.v.info(
                        '[ProductEditModal] handleSubmit: 이미지 없음 (이미 삭제됨)'
                      ),
                  await onSubmit(
                    formData,
                    uploadedImageFile ? { imageFile: uploadedImageFile } : void 0
                  ),
                  onClose());
              } catch (error) {
                throw (
                  utils_logger.v.error('[ProductEditModal] Product edit submission failed', {
                    hasError: !0,
                    errorType: error instanceof Error ? error.constructor.name : 'Unknown',
                  }),
                  error
                );
              }
            },
            isValid =
              productName.trim() &&
              price.trim() &&
              link.trim() &&
              selectedCategory &&
              selectedSubCategory &&
              Object.values(errors).every((msg) => '' === msg);
          return (0, jsx_runtime.jsxs)('div', {
            className: 'fixed inset-0 z-modal flex items-center justify-center',
            children: [
              (0, jsx_runtime.jsx)('button', {
                type: 'button',
                'aria-label': '모달 닫기',
                className: 'absolute inset-0 bg-black/50',
                onClick: onClose,
              }),
              (0, jsx_runtime.jsxs)('div', {
                role: 'dialog',
                'aria-modal': 'true',
                'aria-labelledby': 'modal-title',
                className: (0, clsx.A)(
                  'relative bg-white rounded-12 z-modal flex flex-col gap-30 items-center',
                  'mobile:pt-2 mobile:pr-24 mobile:pb-24 mobile:pl-24',
                  'tablet:w-512 tablet:h-auto tablet:p-30',
                  'desktop:w-512 desktop:h-auto desktop:p-30'
                ),
                children: [
                  (0, jsx_runtime.jsx)('h2', {
                    id: 'modal-title',
                    className: 'text-center text-18 font-bold',
                    children: '상품 수정',
                  }),
                  (0, jsx_runtime.jsxs)('div', {
                    className: 'flex flex-col items-center gap-2',
                    children: [
                      (0, jsx_runtime.jsxs)('div', {
                        className: (0, clsx.A)(
                          'w-140 h-140 border rounded-8 flex items-center justify-center overflow-hidden cursor-pointer relative',
                          'border-gray-300'
                        ),
                        children: [
                          (0, jsx_runtime.jsx)('input', {
                            type: 'file',
                            accept: 'image/*',
                            'aria-label': '상품 이미지 업로드',
                            className: 'absolute inset-0 opacity-0 cursor-pointer z-10',
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
                                setIsUploading(!0),
                                uploadProductImage(file, 'products')
                                  .then(async (imageKey) => {
                                    const { url: signedUrl } = await (async function getImageUrl(
                                      key,
                                      download = !1
                                    ) {
                                      const encodedKey = encodeURIComponent(key);
                                      let urlPath = constants_api.O.GET_IMAGE(encodedKey);
                                      download && (urlPath += '?download=true');
                                      const response = await (0, api.v$)(urlPath, {
                                        method: 'GET',
                                      });
                                      if (!response.ok) {
                                        if (404 === response.status)
                                          throw new Error('이미지를 찾을 수 없습니다.');
                                        throw new Error('이미지 URL 조회에 실패했습니다.');
                                      }
                                      const result = await response.json();
                                      if (!result.success || !result.data)
                                        throw new Error(
                                          '이미지 URL 조회 응답 형식이 올바르지 않습니다.'
                                        );
                                      return result.data;
                                    })(imageKey);
                                    (previewUrlRef.current &&
                                      URL.revokeObjectURL(previewUrlRef.current),
                                      setPreview(signedUrl),
                                      setUploadedImageKey(imageKey),
                                      setUploadedImageFile(file),
                                      setCurrentImageKey(imageKey));
                                  })
                                  .catch((error) => {
                                    const message =
                                      error instanceof Error
                                        ? error.message
                                        : '이미지 업로드에 실패했습니다.';
                                    (triggerToast('error', message),
                                      setSelectedFile(null),
                                      setPreview(null),
                                      setUploadedImageKey(null),
                                      setUploadedImageFile(null));
                                  })
                                  .finally(() => {
                                    setIsUploading(!1);
                                  }));
                            },
                          }),
                          !preview || preview.includes('no-image') || preview.includes('upload.svg')
                            ? (0, jsx_runtime.jsx)(next_image.A, {
                                src: '/icons/upload.svg',
                                alt: 'upload',
                                width: 140,
                                height: 140,
                                className: 'object-contain pointer-events-none',
                              })
                            : (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                                children: [
                                  (0, jsx_runtime.jsx)(next_image.A, {
                                    src: preview,
                                    alt: 'preview',
                                    width: 140,
                                    height: 140,
                                    className: 'object-contain pointer-events-none',
                                    unoptimized: !0,
                                  }),
                                  (0, jsx_runtime.jsx)('button', {
                                    type: 'button',
                                    onClick: (e) => {
                                      (e.stopPropagation(),
                                        (async () => {
                                          const imageKeyToDelete = currentImageKey;
                                          if (
                                            (previewUrlRef.current &&
                                              (URL.revokeObjectURL(previewUrlRef.current),
                                              (previewUrlRef.current = null)),
                                            setPreview('/icons/upload.svg'),
                                            setSelectedFile(null),
                                            setUploadedImageKey(null),
                                            setUploadedImageFile(null),
                                            setCurrentImageKey(null),
                                            imageKeyToDelete)
                                          )
                                            try {
                                              (utils_logger.v.info(
                                                '[ProductEditModal] 이미지 삭제 버튼 클릭, 즉시 삭제 시작',
                                                { imageKey: imageKeyToDelete }
                                              ),
                                                await (async function deleteImage(key) {
                                                  if (
                                                    !(function isValidImageKey(key) {
                                                      if (
                                                        !key ||
                                                        'string' != typeof key ||
                                                        0 === key.trim().length
                                                      )
                                                        return !1;
                                                      if (
                                                        key.startsWith('http://') ||
                                                        key.startsWith('https://')
                                                      )
                                                        return !1;
                                                      const hasValidExtension =
                                                        /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(key);
                                                      return key.includes('/') || hasValidExtension;
                                                    })(key)
                                                  )
                                                    return;
                                                  const encodedKey = encodeURIComponent(key),
                                                    response = await (0, api.v$)(
                                                      constants_api.O.DELETE_IMAGE(encodedKey),
                                                      { method: 'DELETE' }
                                                    );
                                                  if (!response.ok) {
                                                    if (403 === response.status)
                                                      throw new Error(
                                                        '이미지 삭제 권한이 없습니다.'
                                                      );
                                                    if (401 === response.status)
                                                      throw new Error(
                                                        '인증이 필요합니다. 다시 로그인해주세요.'
                                                      );
                                                    if (400 === response.status) return;
                                                    if (404 === response.status) return;
                                                    if (500 === response.status)
                                                      throw new Error(
                                                        '이미지 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.'
                                                      );
                                                    throw new Error('이미지 삭제에 실패했습니다.');
                                                  }
                                                  const result = await response.json();
                                                  if (!result.success)
                                                    throw new Error(
                                                      result.message ||
                                                        '이미지 삭제에 실패했습니다.'
                                                    );
                                                })(imageKeyToDelete),
                                                utils_logger.v.info(
                                                  '[ProductEditModal] 이미지 삭제 성공 (X 버튼 클릭)',
                                                  { imageKey: imageKeyToDelete }
                                                ),
                                                triggerToast(
                                                  'success',
                                                  '이미지가 삭제되었습니다.'
                                                ));
                                            } catch (deleteError) {
                                              (utils_logger.v.error(
                                                '[ProductEditModal] 이미지 삭제 실패 (X 버튼 클릭)',
                                                {
                                                  hasError: !0,
                                                  errorType:
                                                    deleteError instanceof Error
                                                      ? deleteError.constructor.name
                                                      : 'Unknown',
                                                  errorMessage:
                                                    deleteError instanceof Error
                                                      ? deleteError.message
                                                      : String(deleteError),
                                                  imageKey: imageKeyToDelete,
                                                }
                                              ),
                                                triggerToast(
                                                  'error',
                                                  '이미지 삭제에 실패했습니다.'
                                                ));
                                            }
                                        })().catch(() => {}));
                                    },
                                    className:
                                      'absolute top-0 right-0 w-24 h-24 flex items-center justify-center bg-white rounded-full z-50',
                                    'aria-label': '이미지 삭제',
                                    children: (0, jsx_runtime.jsx)(next_image.A, {
                                      src: '/icons/close-circle.svg',
                                      alt: '삭제',
                                      width: 24,
                                      height: 24,
                                      className: 'pointer-events-none',
                                    }),
                                  }),
                                ],
                              }),
                        ],
                      }),
                      errors.image &&
                        (0, jsx_runtime.jsx)('span', {
                          className: 'text-red-500 text-12',
                          children: errors.image,
                        }),
                    ],
                  }),
                  (0, jsx_runtime.jsxs)('form', {
                    className: 'w-full flex flex-col flex-1 gap-20',
                    onSubmit: (e) => {
                      handleSubmit(e).catch((error) => {
                        utils_logger.v.error('ProductEditModal submit error', {
                          hasError: !0,
                          errorType: error instanceof Error ? error.constructor.name : 'Unknown',
                        });
                      });
                    },
                    children: [
                      (0, jsx_runtime.jsxs)('div', {
                        className: 'flex flex-col gap-2 mb-6 tablet:mb-8 desktop:mb-8',
                        children: [
                          (0, jsx_runtime.jsxs)('div', {
                            className: 'flex gap-20',
                            children: [
                              (0, jsx_runtime.jsx)(DropDown.A, {
                                items: categories,
                                placeholder: '대분류',
                                variant: 'medium',
                                buttonClassName: (0, clsx.A)(
                                  touched.category && !selectedCategory && 'border-red-500'
                                ),
                                onSelect: (v) => {
                                  (setSelectedCategory(v),
                                    setSelectedSubCategory(null),
                                    setTouched((prev) => ({ ...prev, category: !0 })));
                                },
                                selected: selectedCategory || void 0,
                                inModal: !0,
                              }),
                              (0, jsx_runtime.jsx)(DropDown.A, {
                                items: filteredSubCategories,
                                placeholder: '소분류',
                                variant: 'medium',
                                buttonClassName: (0, clsx.A)(
                                  touched.subCategory && !selectedSubCategory && 'border-red-500'
                                ),
                                onSelect: (option) => {
                                  (setSelectedSubCategory(option),
                                    setTouched((prev) => ({ ...prev, subCategory: !0 })));
                                },
                                selected: selectedSubCategory || void 0,
                                inModal: !0,
                              }),
                            ],
                          }),
                          touched.category &&
                            errors.category &&
                            (0, jsx_runtime.jsx)('span', {
                              className: 'text-red-500 text-12',
                              children: errors.category,
                            }),
                          touched.subCategory &&
                            errors.subCategory &&
                            (0, jsx_runtime.jsx)('span', {
                              className: 'text-red-500 text-12',
                              children: errors.subCategory,
                            }),
                        ],
                      }),
                      (0, jsx_runtime.jsxs)('div', {
                        className: 'flex flex-col w-full gap-1',
                        children: [
                          (0, jsx_runtime.jsx)(InputField.A, {
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
                          }),
                          touched.name &&
                            errors.name &&
                            (0, jsx_runtime.jsx)('span', {
                              className: 'text-red-500 text-12',
                              children: errors.name,
                            }),
                        ],
                      }),
                      (0, jsx_runtime.jsxs)('div', {
                        className: 'flex flex-col w-full gap-1',
                        children: [
                          (0, jsx_runtime.jsx)(InputField.A, {
                            label: '가격',
                            placeholder: '가격을 입력해주세요',
                            value: price,
                            onChange: (v) => {
                              const numeric = v.replace(/[^0-9]/g, '');
                              (0, validation.mR)(numeric) &&
                                (setPrice(numeric ? (0, validation.$g)(numeric) : ''),
                                setTouched((prev) => ({ ...prev, price: !0 })));
                            },
                            onBlur: () => setTouched((prev) => ({ ...prev, price: !0 })),
                            type: 'text',
                            minLength: 1,
                            maxLength: 20,
                          }),
                          touched.price &&
                            errors.price &&
                            (0, jsx_runtime.jsx)('span', {
                              className: 'text-red-500 text-12',
                              children: errors.price,
                            }),
                        ],
                      }),
                      (0, jsx_runtime.jsxs)('div', {
                        className: 'flex flex-col w-full gap-1',
                        children: [
                          (0, jsx_runtime.jsx)(InputField.A, {
                            label: '제품 링크',
                            placeholder: '제품 링크를 입력해주세요',
                            value: link,
                            onChange: (value) => {
                              (setLink(value), setTouched((prev) => ({ ...prev, link: !0 })));
                            },
                            onBlur: () => setTouched((prev) => ({ ...prev, link: !0 })),
                            type: 'text',
                            maxLength: 50,
                          }),
                          touched.link &&
                            errors.link &&
                            (0, jsx_runtime.jsx)('span', {
                              className: 'text-red-500 text-12',
                              children: errors.link,
                            }),
                        ],
                      }),
                      (0, jsx_runtime.jsx)('div', { className: 'flex-1' }),
                      (0, jsx_runtime.jsxs)('div', {
                        className:
                          'flex gap-20 justify-center tablet:justify-start desktop:justify-start pb-6',
                        children: [
                          (0, jsx_runtime.jsx)(Button.A, {
                            variant: 'secondary',
                            onClick: onClose,
                            className:
                              'mobile:w-153 mobile:h-64 tablet:w-216 tablet:h-64 desktop:w-216 desktop:h-64 text-16 cursor-pointer',
                            children: '취소',
                          }),
                          (0, jsx_runtime.jsx)(Button.A, {
                            type: 'submit',
                            variant: 'primary',
                            inactive: !isValid,
                            className:
                              'mobile:w-153 mobile:h-64 tablet:w-216 tablet:h-64 desktop:w-216 desktop:h-64 text-16 cursor-pointer',
                            children: isUploading ? '이미지 업로드 중...' : '수정하기',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          });
        },
        ProductEditModal_ProductEditModal = ProductEditModal;
      ProductEditModal.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'ProductEditModal',
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
              raw: '(data: ProductEditFormData, options?: { imageFile: File }) => void | Promise<void>',
              signature: {
                arguments: [
                  { type: { name: 'ProductEditFormData' }, name: 'data' },
                  {
                    type: {
                      name: 'signature',
                      type: 'object',
                      raw: '{ imageFile: File }',
                      signature: {
                        properties: [{ key: 'imageFile', value: { name: 'File', required: !0 } }],
                      },
                    },
                    name: 'options',
                  },
                ],
                return: {
                  name: 'union',
                  raw: 'void | Promise<void>',
                  elements: [
                    { name: 'void' },
                    { name: 'Promise', elements: [{ name: 'void' }], raw: 'Promise<void>' },
                  ],
                },
              },
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
          initialImageKey: {
            required: !1,
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
    './src/hooks/useToast.ts'(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.d(__webpack_exports__, { d: () => useToast });
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        './node_modules/next/dist/compiled/react/index.js'
      );
      const useToast = (autoCloseDuration = 3e3) => {
        const [showToast, setShowToast] = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),
          [toastVariant, setToastVariant] = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(
            'success'
          ),
          [toastMessage, setToastMessage] = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
        (0, react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
          if (!showToast) return;
          const timer = setTimeout(() => {
            setShowToast(!1);
          }, autoCloseDuration);
          return () => {
            clearTimeout(timer);
          };
        }, [showToast, autoCloseDuration]);
        const triggerToast = (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
            (variant, message) => {
              (setToastVariant(variant), setToastMessage(message), setShowToast(!0));
            },
            []
          ),
          closeToast = (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
            setShowToast(!1);
          }, []);
        return { showToast, toastVariant, toastMessage, triggerToast, closeToast };
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
