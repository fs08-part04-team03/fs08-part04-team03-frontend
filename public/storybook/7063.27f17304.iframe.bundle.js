'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [7063],
  {
    './node_modules/@hookform/resolvers/zod/dist/zod.mjs'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { u: () => a });
      var index_esm = __webpack_require__('./node_modules/react-hook-form/dist/index.esm.mjs');
      const r = (t, r, o) => {
          if (t && 'reportValidity' in t) {
            const s = (0, index_esm.Jt)(o, r);
            (t.setCustomValidity((s && s.message) || ''), t.reportValidity());
          }
        },
        resolvers_o = (e, t) => {
          for (const o in t.fields) {
            const s = t.fields[o];
            s && s.ref && 'reportValidity' in s.ref
              ? r(s.ref, o, e)
              : s && s.refs && s.refs.forEach((t) => r(t, o, e));
          }
        },
        resolvers_s = (r, s) => {
          s.shouldUseNativeValidation && resolvers_o(r, s);
          const n = {};
          for (const o in r) {
            const f = (0, index_esm.Jt)(s.fields, o),
              c = Object.assign(r[o] || {}, { ref: f && f.ref });
            if (i(s.names || Object.keys(r), o)) {
              const r = Object.assign({}, (0, index_esm.Jt)(n, o));
              ((0, index_esm.hZ)(r, 'root', c), (0, index_esm.hZ)(n, o, r));
            } else (0, index_esm.hZ)(n, o, c);
          }
          return n;
        },
        i = (e, t) => {
          const r = n(t);
          return e.some((e) => n(e).match(`^${r}\\.\\d+`));
        };
      function n(e) {
        return e.replace(/\]|\[/g, '');
      }
      var core = __webpack_require__('./node_modules/zod/v4/core/index.js');
      function t(r, e) {
        try {
          var o = r();
        } catch (r) {
          return e(r);
        }
        return o && o.then ? o.then(void 0, e) : o;
      }
      function s(r, e) {
        for (var n = {}; r.length; ) {
          var t = r[0],
            s = t.code,
            i = t.message,
            a = t.path.join('.');
          if (!n[a])
            if ('unionErrors' in t) {
              var u = t.unionErrors[0].errors[0];
              n[a] = { message: u.message, type: u.code };
            } else n[a] = { message: i, type: s };
          if (
            ('unionErrors' in t &&
              t.unionErrors.forEach(function (e) {
                return e.errors.forEach(function (e) {
                  return r.push(e);
                });
              }),
            e)
          ) {
            var c = n[a].types,
              f = c && c[t.code];
            n[a] = (0, index_esm.Gb)(a, e, n, s, f ? [].concat(f, t.message) : t.message);
          }
          r.shift();
        }
        return n;
      }
      function zod_i(r, e) {
        for (var n = {}; r.length; ) {
          var t = r[0],
            s = t.code,
            i = t.message,
            a = t.path.join('.');
          if (!n[a])
            if ('invalid_union' === t.code && t.errors.length > 0) {
              var u = t.errors[0][0];
              n[a] = { message: u.message, type: u.code };
            } else n[a] = { message: i, type: s };
          if (
            ('invalid_union' === t.code &&
              t.errors.forEach(function (e) {
                return e.forEach(function (e) {
                  return r.push(e);
                });
              }),
            e)
          ) {
            var c = n[a].types,
              f = c && c[t.code];
            n[a] = (0, index_esm.Gb)(a, e, n, s, f ? [].concat(f, t.message) : t.message);
          }
          r.shift();
        }
        return n;
      }
      function a(o, a, u) {
        if (
          (void 0 === u && (u = {}),
          (function (r) {
            return '_def' in r && 'object' == typeof r._def && 'typeName' in r._def;
          })(o))
        )
          return function (n, i, c) {
            try {
              return Promise.resolve(
                t(
                  function () {
                    return Promise.resolve(
                      o['sync' === u.mode ? 'parse' : 'parseAsync'](n, a)
                    ).then(function (e) {
                      return (
                        c.shouldUseNativeValidation && resolvers_o({}, c),
                        { errors: {}, values: u.raw ? Object.assign({}, n) : e }
                      );
                    });
                  },
                  function (r) {
                    if (
                      (function (r) {
                        return Array.isArray(null == r ? void 0 : r.issues);
                      })(r)
                    )
                      return {
                        values: {},
                        errors: resolvers_s(
                          s(r.errors, !c.shouldUseNativeValidation && 'all' === c.criteriaMode),
                          c
                        ),
                      };
                    throw r;
                  }
                )
              );
            } catch (r) {
              return Promise.reject(r);
            }
          };
        if (
          (function (r) {
            return '_zod' in r && 'object' == typeof r._zod;
          })(o)
        )
          return function (s, c, f) {
            try {
              return Promise.resolve(
                t(
                  function () {
                    return Promise.resolve(('sync' === u.mode ? core.qgA : core.EJS)(o, s, a)).then(
                      function (e) {
                        return (
                          f.shouldUseNativeValidation && resolvers_o({}, f),
                          { errors: {}, values: u.raw ? Object.assign({}, s) : e }
                        );
                      }
                    );
                  },
                  function (r) {
                    if (
                      (function (r) {
                        return r instanceof core.a$H;
                      })(r)
                    )
                      return {
                        values: {},
                        errors: resolvers_s(
                          zod_i(r.issues, !f.shouldUseNativeValidation && 'all' === f.criteriaMode),
                          f
                        ),
                      };
                    throw r;
                  }
                )
              );
            } catch (r) {
              return Promise.reject(r);
            }
          };
        throw new Error('Invalid input: not a Zod schema');
      }
    },
    './node_modules/react-hook-form/dist/index.esm.mjs'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        Gb: () => appendErrors,
        Jt: () => get,
        hZ: () => set,
        mN: () => useForm,
        xI: () => Controller,
      });
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        isCheckBoxInput = (element) => 'checkbox' === element.type,
        isDateObject = (value) => value instanceof Date,
        isNullOrUndefined = (value) => null == value;
      const isObjectType = (value) => 'object' == typeof value;
      var isObject = (value) =>
          !isNullOrUndefined(value) &&
          !Array.isArray(value) &&
          isObjectType(value) &&
          !isDateObject(value),
        getEventValue = (event) =>
          isObject(event) && event.target
            ? isCheckBoxInput(event.target)
              ? event.target.checked
              : event.target.value
            : event,
        isNameInFieldArray = (names, name) =>
          names.has(((name) => name.substring(0, name.search(/\.\d+(\.|$)/)) || name)(name)),
        isWeb =
          'undefined' != typeof window &&
          void 0 !== window.HTMLElement &&
          'undefined' != typeof document;
      function cloneObject(data) {
        if (data instanceof Date) return new Date(data);
        const isFileListInstance = 'undefined' != typeof FileList && data instanceof FileList;
        if (isWeb && (data instanceof Blob || isFileListInstance)) return data;
        const isArray = Array.isArray(data);
        if (
          !(
            isArray ||
            (isObject(data) &&
              ((tempObject) => {
                const prototypeCopy = tempObject.constructor && tempObject.constructor.prototype;
                return isObject(prototypeCopy) && prototypeCopy.hasOwnProperty('isPrototypeOf');
              })(data))
          )
        )
          return data;
        const copy = isArray ? [] : Object.create(Object.getPrototypeOf(data));
        for (const key in data)
          Object.prototype.hasOwnProperty.call(data, key) && (copy[key] = cloneObject(data[key]));
        return copy;
      }
      var isKey = (value) => /^\w*$/.test(value),
        isUndefined = (val) => void 0 === val,
        compact = (value) => (Array.isArray(value) ? value.filter(Boolean) : []),
        stringToPath = (input) => compact(input.replace(/["|']|\]/g, '').split(/\.|\[/)),
        get = (object, path, defaultValue) => {
          if (!path || !isObject(object)) return defaultValue;
          const result = (isKey(path) ? [path] : stringToPath(path)).reduce(
            (result, key) => (isNullOrUndefined(result) ? result : result[key]),
            object
          );
          return isUndefined(result) || result === object
            ? isUndefined(object[path])
              ? defaultValue
              : object[path]
            : result;
        },
        isBoolean = (value) => 'boolean' == typeof value,
        isFunction = (value) => 'function' == typeof value,
        set = (object, path, value) => {
          let index = -1;
          const tempPath = isKey(path) ? [path] : stringToPath(path),
            length = tempPath.length,
            lastIndex = length - 1;
          for (; ++index < length; ) {
            const key = tempPath[index];
            let newValue = value;
            if (index !== lastIndex) {
              const objValue = object[key];
              newValue =
                isObject(objValue) || Array.isArray(objValue)
                  ? objValue
                  : isNaN(+tempPath[index + 1])
                    ? {}
                    : [];
            }
            if ('__proto__' === key || 'constructor' === key || 'prototype' === key) return;
            ((object[key] = newValue), (object = object[key]));
          }
        };
      const EVENTS_BLUR = 'blur',
        EVENTS_FOCUS_OUT = 'focusout',
        EVENTS_CHANGE = 'change',
        VALIDATION_MODE_onBlur = 'onBlur',
        VALIDATION_MODE_onChange = 'onChange',
        VALIDATION_MODE_onSubmit = 'onSubmit',
        VALIDATION_MODE_onTouched = 'onTouched',
        VALIDATION_MODE_all = 'all',
        INPUT_VALIDATION_RULES_max = 'max',
        INPUT_VALIDATION_RULES_min = 'min',
        INPUT_VALIDATION_RULES_maxLength = 'maxLength',
        INPUT_VALIDATION_RULES_minLength = 'minLength',
        INPUT_VALIDATION_RULES_pattern = 'pattern',
        INPUT_VALIDATION_RULES_required = 'required',
        INPUT_VALIDATION_RULES_validate = 'validate',
        HookFormContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
      HookFormContext.displayName = 'HookFormContext';
      const useFormContext = () => react__WEBPACK_IMPORTED_MODULE_0__.useContext(HookFormContext);
      var getProxyFormState = (formState, control, localProxyFormState, isRoot = !0) => {
        const result = { defaultValues: control._defaultValues };
        for (const key in formState)
          Object.defineProperty(result, key, {
            get: () => {
              const _key = key;
              return (
                control._proxyFormState[_key] !== VALIDATION_MODE_all &&
                  (control._proxyFormState[_key] = !isRoot || VALIDATION_MODE_all),
                localProxyFormState && (localProxyFormState[_key] = !0),
                formState[_key]
              );
            },
          });
        return result;
      };
      const useIsomorphicLayoutEffect =
        'undefined' != typeof window
          ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect
          : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;
      function useFormState(props) {
        const methods = useFormContext(),
          { control = methods.control, disabled, name, exact } = props || {},
          [formState, updateFormState] = react__WEBPACK_IMPORTED_MODULE_0__.useState(
            control._formState
          ),
          _localProxyFormState = react__WEBPACK_IMPORTED_MODULE_0__.useRef({
            isDirty: !1,
            isLoading: !1,
            dirtyFields: !1,
            touchedFields: !1,
            validatingFields: !1,
            isValidating: !1,
            isValid: !1,
            errors: !1,
          });
        return (
          useIsomorphicLayoutEffect(
            () =>
              control._subscribe({
                name,
                formState: _localProxyFormState.current,
                exact,
                callback: (formState) => {
                  !disabled && updateFormState({ ...control._formState, ...formState });
                },
              }),
            [name, disabled, exact]
          ),
          react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
            _localProxyFormState.current.isValid && control._setValid(!0);
          }, [control]),
          react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
            () => getProxyFormState(formState, control, _localProxyFormState.current, !1),
            [formState, control]
          )
        );
      }
      var isString = (value) => 'string' == typeof value,
        generateWatchOutput = (names, _names, formValues, isGlobal, defaultValue) =>
          isString(names)
            ? (isGlobal && _names.watch.add(names), get(formValues, names, defaultValue))
            : Array.isArray(names)
              ? names.map(
                  (fieldName) => (
                    isGlobal && _names.watch.add(fieldName),
                    get(formValues, fieldName)
                  )
                )
              : (isGlobal && (_names.watchAll = !0), formValues),
        isPrimitive = (value) => isNullOrUndefined(value) || !isObjectType(value);
      function deepEqual(object1, object2, _internal_visited = new WeakSet()) {
        if (isPrimitive(object1) || isPrimitive(object2)) return Object.is(object1, object2);
        if (isDateObject(object1) && isDateObject(object2))
          return object1.getTime() === object2.getTime();
        const keys1 = Object.keys(object1),
          keys2 = Object.keys(object2);
        if (keys1.length !== keys2.length) return !1;
        if (_internal_visited.has(object1) || _internal_visited.has(object2)) return !0;
        (_internal_visited.add(object1), _internal_visited.add(object2));
        for (const key of keys1) {
          const val1 = object1[key];
          if (!keys2.includes(key)) return !1;
          if ('ref' !== key) {
            const val2 = object2[key];
            if (
              (isDateObject(val1) && isDateObject(val2)) ||
              (isObject(val1) && isObject(val2)) ||
              (Array.isArray(val1) && Array.isArray(val2))
                ? !deepEqual(val1, val2, _internal_visited)
                : !Object.is(val1, val2)
            )
              return !1;
          }
        }
        return !0;
      }
      function useWatch(props) {
        const methods = useFormContext(),
          { control = methods.control, name, defaultValue, disabled, exact, compute } = props || {},
          _defaultValue = react__WEBPACK_IMPORTED_MODULE_0__.useRef(defaultValue),
          _compute = react__WEBPACK_IMPORTED_MODULE_0__.useRef(compute),
          _computeFormValues = react__WEBPACK_IMPORTED_MODULE_0__.useRef(void 0),
          _prevControl = react__WEBPACK_IMPORTED_MODULE_0__.useRef(control),
          _prevName = react__WEBPACK_IMPORTED_MODULE_0__.useRef(name);
        _compute.current = compute;
        const [value, updateValue] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => {
            const defaultValue = control._getWatch(name, _defaultValue.current);
            return _compute.current ? _compute.current(defaultValue) : defaultValue;
          }),
          getCurrentOutput = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
            (values) => {
              const formValues = generateWatchOutput(
                name,
                control._names,
                values || control._formValues,
                !1,
                _defaultValue.current
              );
              return _compute.current ? _compute.current(formValues) : formValues;
            },
            [control._formValues, control._names, name]
          ),
          refreshValue = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
            (values) => {
              if (!disabled) {
                const formValues = generateWatchOutput(
                  name,
                  control._names,
                  values || control._formValues,
                  !1,
                  _defaultValue.current
                );
                if (_compute.current) {
                  const computedFormValues = _compute.current(formValues);
                  deepEqual(computedFormValues, _computeFormValues.current) ||
                    (updateValue(computedFormValues),
                    (_computeFormValues.current = computedFormValues));
                } else updateValue(formValues);
              }
            },
            [control._formValues, control._names, disabled, name]
          );
        (useIsomorphicLayoutEffect(
          () => (
            (_prevControl.current === control && deepEqual(_prevName.current, name)) ||
              ((_prevControl.current = control), (_prevName.current = name), refreshValue()),
            control._subscribe({
              name,
              formState: { values: !0 },
              exact,
              callback: (formState) => {
                refreshValue(formState.values);
              },
            })
          ),
          [control, exact, name, refreshValue]
        ),
          react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => control._removeUnmounted()));
        const controlChanged = _prevControl.current !== control,
          prevName = _prevName.current,
          computedOutput = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
            if (disabled) return null;
            const nameChanged = !controlChanged && !deepEqual(prevName, name);
            return controlChanged || nameChanged ? getCurrentOutput() : null;
          }, [disabled, controlChanged, name, prevName, getCurrentOutput]);
        return null !== computedOutput ? computedOutput : value;
      }
      const Controller = (props) =>
        props.render(
          (function useController(props) {
            const methods = useFormContext(),
              {
                name,
                disabled,
                control = methods.control,
                shouldUnregister,
                defaultValue,
                exact = !0,
              } = props,
              isArrayField = isNameInFieldArray(control._names.array, name),
              defaultValueMemo = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
                () =>
                  get(control._formValues, name, get(control._defaultValues, name, defaultValue)),
                [control, name, defaultValue]
              ),
              value = useWatch({ control, name, defaultValue: defaultValueMemo, exact }),
              formState = useFormState({ control, name, exact }),
              _props = react__WEBPACK_IMPORTED_MODULE_0__.useRef(props),
              _previousNameRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(void 0),
              _registerProps = react__WEBPACK_IMPORTED_MODULE_0__.useRef(
                control.register(name, {
                  ...props.rules,
                  value,
                  ...(isBoolean(props.disabled) ? { disabled: props.disabled } : {}),
                })
              );
            _props.current = props;
            const fieldState = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
                () =>
                  Object.defineProperties(
                    {},
                    {
                      invalid: { enumerable: !0, get: () => !!get(formState.errors, name) },
                      isDirty: { enumerable: !0, get: () => !!get(formState.dirtyFields, name) },
                      isTouched: {
                        enumerable: !0,
                        get: () => !!get(formState.touchedFields, name),
                      },
                      isValidating: {
                        enumerable: !0,
                        get: () => !!get(formState.validatingFields, name),
                      },
                      error: { enumerable: !0, get: () => get(formState.errors, name) },
                    }
                  ),
                [formState, name]
              ),
              onChange = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
                (event) =>
                  _registerProps.current.onChange({
                    target: { value: getEventValue(event), name },
                    type: EVENTS_CHANGE,
                  }),
                [name]
              ),
              onBlur = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
                () =>
                  _registerProps.current.onBlur({
                    target: { value: get(control._formValues, name), name },
                    type: EVENTS_BLUR,
                  }),
                [name, control._formValues]
              ),
              ref = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
                (elm) => {
                  const field = get(control._fields, name);
                  field &&
                    field._f &&
                    elm &&
                    (field._f.ref = {
                      focus: () => isFunction(elm.focus) && elm.focus(),
                      select: () => isFunction(elm.select) && elm.select(),
                      setCustomValidity: (message) =>
                        isFunction(elm.setCustomValidity) && elm.setCustomValidity(message),
                      reportValidity: () => isFunction(elm.reportValidity) && elm.reportValidity(),
                    });
                },
                [control._fields, name]
              ),
              field = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
                () => ({
                  name,
                  value,
                  ...(isBoolean(disabled) || formState.disabled
                    ? { disabled: formState.disabled || disabled }
                    : {}),
                  onChange,
                  onBlur,
                  ref,
                }),
                [name, disabled, formState.disabled, onChange, onBlur, ref, value]
              );
            return (
              react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
                const _shouldUnregisterField =
                    control._options.shouldUnregister || shouldUnregister,
                  previousName = _previousNameRef.current;
                (previousName &&
                  previousName !== name &&
                  !isArrayField &&
                  control.unregister(previousName),
                  control.register(name, {
                    ..._props.current.rules,
                    ...(isBoolean(_props.current.disabled)
                      ? { disabled: _props.current.disabled }
                      : {}),
                  }));
                const updateMounted = (name, value) => {
                  const field = get(control._fields, name);
                  field && field._f && (field._f.mount = value);
                };
                if ((updateMounted(name, !0), _shouldUnregisterField)) {
                  const value = cloneObject(
                    get(control._options.defaultValues, name, _props.current.defaultValue)
                  );
                  (set(control._defaultValues, name, value),
                    isUndefined(get(control._formValues, name)) &&
                      set(control._formValues, name, value));
                }
                return (
                  !isArrayField && control.register(name),
                  (_previousNameRef.current = name),
                  () => {
                    (
                      isArrayField
                        ? _shouldUnregisterField && !control._state.action
                        : _shouldUnregisterField
                    )
                      ? control.unregister(name)
                      : updateMounted(name, !1);
                  }
                );
              }, [name, control, isArrayField, shouldUnregister]),
              react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
                control._setDisabledField({ disabled, name });
              }, [disabled, name, control]),
              react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
                () => ({ field, formState, fieldState }),
                [field, formState, fieldState]
              )
            );
          })(props)
        );
      var appendErrors = (name, validateAllFieldCriteria, errors, type, message) =>
          validateAllFieldCriteria
            ? {
                ...errors[name],
                types: {
                  ...(errors[name] && errors[name].types ? errors[name].types : {}),
                  [type]: message || !0,
                },
              }
            : {},
        convertToArrayPayload = (value) => (Array.isArray(value) ? value : [value]),
        createSubject = () => {
          let _observers = [];
          return {
            get observers() {
              return _observers;
            },
            next: (value) => {
              for (const observer of _observers) observer.next && observer.next(value);
            },
            subscribe: (observer) => (
              _observers.push(observer),
              {
                unsubscribe: () => {
                  _observers = _observers.filter((o) => o !== observer);
                },
              }
            ),
            unsubscribe: () => {
              _observers = [];
            },
          };
        };
      function extractFormValues(fieldsState, formValues) {
        const values = {};
        for (const key in fieldsState)
          if (fieldsState.hasOwnProperty(key)) {
            const fieldState = fieldsState[key],
              fieldValue = formValues[key];
            if (fieldState && isObject(fieldState) && fieldValue) {
              const nestedFieldsState = extractFormValues(fieldState, fieldValue);
              isObject(nestedFieldsState) && (values[key] = nestedFieldsState);
            } else fieldsState[key] && (values[key] = fieldValue);
          }
        return values;
      }
      var isEmptyObject = (value) => isObject(value) && !Object.keys(value).length,
        isFileInput = (element) => 'file' === element.type,
        isHTMLElement = (value) => {
          if (!isWeb) return !1;
          const owner = value ? value.ownerDocument : 0;
          return (
            value instanceof
            (owner && owner.defaultView ? owner.defaultView.HTMLElement : HTMLElement)
          );
        },
        isMultipleSelect = (element) => 'select-multiple' === element.type,
        isRadioInput = (element) => 'radio' === element.type,
        live = (ref) => isHTMLElement(ref) && ref.isConnected;
      function unset(object, path) {
        const paths = Array.isArray(path) ? path : isKey(path) ? [path] : stringToPath(path),
          childObject =
            1 === paths.length
              ? object
              : (function baseGet(object, updatePath) {
                  const length = updatePath.slice(0, -1).length;
                  let index = 0;
                  for (; index < length; )
                    object = isUndefined(object) ? index++ : object[updatePath[index++]];
                  return object;
                })(object, paths),
          index = paths.length - 1,
          key = paths[index];
        return (
          childObject && delete childObject[key],
          0 !== index &&
            ((isObject(childObject) && isEmptyObject(childObject)) ||
              (Array.isArray(childObject) &&
                (function isEmptyArray(obj) {
                  for (const key in obj)
                    if (obj.hasOwnProperty(key) && !isUndefined(obj[key])) return !1;
                  return !0;
                })(childObject))) &&
            unset(object, paths.slice(0, -1)),
          object
        );
      }
      function isTraversable(value) {
        return (
          Array.isArray(value) ||
          (isObject(value) &&
            !((data) => {
              for (const key in data) if (isFunction(data[key])) return !0;
              return !1;
            })(value))
        );
      }
      function markFieldsDirty(data, fields = {}) {
        for (const key in data) {
          const value = data[key];
          isTraversable(value)
            ? ((fields[key] = Array.isArray(value) ? [] : {}), markFieldsDirty(value, fields[key]))
            : isUndefined(value) || (fields[key] = !0);
        }
        return fields;
      }
      function getDirtyFields(data, formValues, dirtyFieldsFromValues) {
        dirtyFieldsFromValues || (dirtyFieldsFromValues = markFieldsDirty(formValues));
        for (const key in data) {
          const value = data[key];
          if (isTraversable(value))
            isUndefined(formValues) || isPrimitive(dirtyFieldsFromValues[key])
              ? (dirtyFieldsFromValues[key] = markFieldsDirty(
                  value,
                  Array.isArray(value) ? [] : {}
                ))
              : getDirtyFields(
                  value,
                  isNullOrUndefined(formValues) ? {} : formValues[key],
                  dirtyFieldsFromValues[key]
                );
          else {
            const formValue = formValues[key];
            dirtyFieldsFromValues[key] = !deepEqual(value, formValue);
          }
        }
        return dirtyFieldsFromValues;
      }
      const defaultResult = { value: !1, isValid: !1 },
        validResult = { value: !0, isValid: !0 };
      var getCheckboxValue = (options) => {
          if (Array.isArray(options)) {
            if (options.length > 1) {
              const values = options
                .filter((option) => option && option.checked && !option.disabled)
                .map((option) => option.value);
              return { value: values, isValid: !!values.length };
            }
            return options[0].checked && !options[0].disabled
              ? options[0].attributes && !isUndefined(options[0].attributes.value)
                ? isUndefined(options[0].value) || '' === options[0].value
                  ? validResult
                  : { value: options[0].value, isValid: !0 }
                : validResult
              : defaultResult;
          }
          return defaultResult;
        },
        getFieldValueAs = (value, { valueAsNumber, valueAsDate, setValueAs }) =>
          isUndefined(value)
            ? value
            : valueAsNumber
              ? '' === value
                ? NaN
                : value
                  ? +value
                  : value
              : valueAsDate && isString(value)
                ? new Date(value)
                : setValueAs
                  ? setValueAs(value)
                  : value;
      const defaultReturn = { isValid: !1, value: null };
      var getRadioValue = (options) =>
        Array.isArray(options)
          ? options.reduce(
              (previous, option) =>
                option && option.checked && !option.disabled
                  ? { isValid: !0, value: option.value }
                  : previous,
              defaultReturn
            )
          : defaultReturn;
      function getFieldValue(_f) {
        const ref = _f.ref;
        return isFileInput(ref)
          ? ref.files
          : isRadioInput(ref)
            ? getRadioValue(_f.refs).value
            : isMultipleSelect(ref)
              ? [...ref.selectedOptions].map(({ value }) => value)
              : isCheckBoxInput(ref)
                ? getCheckboxValue(_f.refs).value
                : getFieldValueAs(isUndefined(ref.value) ? _f.ref.value : ref.value, _f);
      }
      var isRegex = (value) => value instanceof RegExp,
        getRuleValue = (rule) =>
          isUndefined(rule)
            ? rule
            : isRegex(rule)
              ? rule.source
              : isObject(rule)
                ? isRegex(rule.value)
                  ? rule.value.source
                  : rule.value
                : rule,
        getValidationModes = (mode) => ({
          isOnSubmit: !mode || mode === VALIDATION_MODE_onSubmit,
          isOnBlur: mode === VALIDATION_MODE_onBlur,
          isOnChange: mode === VALIDATION_MODE_onChange,
          isOnAll: mode === VALIDATION_MODE_all,
          isOnTouch: mode === VALIDATION_MODE_onTouched,
        });
      var hasPromiseValidation = (fieldReference) =>
          !!fieldReference &&
          !!fieldReference.validate &&
          !!(
            (isFunction(fieldReference.validate) &&
              'AsyncFunction' === fieldReference.validate.constructor.name) ||
            (isObject(fieldReference.validate) &&
              Object.values(fieldReference.validate).find(
                (validateFunction) => 'AsyncFunction' === validateFunction.constructor.name
              ))
          ),
        isWatched = (name, _names, isBlurEvent) =>
          !isBlurEvent &&
          (_names.watchAll ||
            _names.watch.has(name) ||
            [..._names.watch].some(
              (watchName) =>
                name.startsWith(watchName) && /^\.\w+/.test(name.slice(watchName.length))
            ));
      const iterateFieldsByAction = (fields, action, fieldsNames, abortEarly) => {
        for (const key of fieldsNames || Object.keys(fields)) {
          const field = get(fields, key);
          if (field) {
            const { _f, ...currentField } = field;
            if (_f) {
              if (_f.refs && _f.refs[0] && action(_f.refs[0], key) && !abortEarly) return !0;
              if (_f.ref && action(_f.ref, _f.name) && !abortEarly) return !0;
              if (iterateFieldsByAction(currentField, action)) break;
            } else if (isObject(currentField) && iterateFieldsByAction(currentField, action)) break;
          }
        }
      };
      function schemaErrorLookup(errors, _fields, name) {
        const error = get(errors, name);
        if (error || isKey(name)) return { error, name };
        const names = name.split('.');
        for (; names.length; ) {
          const fieldName = names.join('.'),
            field = get(_fields, fieldName),
            foundError = get(errors, fieldName);
          if (field && !Array.isArray(field) && name !== fieldName) return { name };
          if (foundError && foundError.type) return { name: fieldName, error: foundError };
          if (foundError && foundError.root && foundError.root.type)
            return { name: `${fieldName}.root`, error: foundError.root };
          names.pop();
        }
        return { name };
      }
      var updateFieldArrayRootError = (errors, error, name) => {
        const fieldArrayErrors = convertToArrayPayload(get(errors, name));
        return (
          set(fieldArrayErrors, 'root', error[name]),
          set(errors, name, fieldArrayErrors),
          errors
        );
      };
      function getValidateError(result, ref, type = 'validate') {
        if (
          isString(result) ||
          (Array.isArray(result) && result.every(isString)) ||
          (isBoolean(result) && !result)
        )
          return { type, message: isString(result) ? result : '', ref };
      }
      var getValueAndMessage = (validationData) =>
          isObject(validationData) && !isRegex(validationData)
            ? validationData
            : { value: validationData, message: '' },
        validateField = async (
          field,
          disabledFieldNames,
          formValues,
          validateAllFieldCriteria,
          shouldUseNativeValidation,
          isFieldArray
        ) => {
          const {
              ref,
              refs,
              required,
              maxLength,
              minLength,
              min,
              max,
              pattern,
              validate,
              name,
              valueAsNumber,
              mount,
            } = field._f,
            inputValue = get(formValues, name);
          if (!mount || disabledFieldNames.has(name)) return {};
          const inputRef = refs ? refs[0] : ref,
            setCustomValidity = (message) => {
              shouldUseNativeValidation &&
                inputRef.reportValidity &&
                (inputRef.setCustomValidity(isBoolean(message) ? '' : message || ''),
                inputRef.reportValidity());
            },
            error = {},
            isRadio = isRadioInput(ref),
            isCheckBox = isCheckBoxInput(ref),
            isRadioOrCheckbox = isRadio || isCheckBox,
            isEmpty =
              ((valueAsNumber || isFileInput(ref)) &&
                isUndefined(ref.value) &&
                isUndefined(inputValue)) ||
              (isHTMLElement(ref) && '' === ref.value) ||
              '' === inputValue ||
              (Array.isArray(inputValue) && !inputValue.length),
            appendErrorsCurry = appendErrors.bind(null, name, validateAllFieldCriteria, error),
            getMinMaxMessage = (
              exceedMax,
              maxLengthMessage,
              minLengthMessage,
              maxType = INPUT_VALIDATION_RULES_maxLength,
              minType = INPUT_VALIDATION_RULES_minLength
            ) => {
              const message = exceedMax ? maxLengthMessage : minLengthMessage;
              error[name] = {
                type: exceedMax ? maxType : minType,
                message,
                ref,
                ...appendErrorsCurry(exceedMax ? maxType : minType, message),
              };
            };
          if (
            isFieldArray
              ? !Array.isArray(inputValue) || !inputValue.length
              : required &&
                ((!isRadioOrCheckbox && (isEmpty || isNullOrUndefined(inputValue))) ||
                  (isBoolean(inputValue) && !inputValue) ||
                  (isCheckBox && !getCheckboxValue(refs).isValid) ||
                  (isRadio && !getRadioValue(refs).isValid))
          ) {
            const { value, message } = isString(required)
              ? { value: !!required, message: required }
              : getValueAndMessage(required);
            if (
              value &&
              ((error[name] = {
                type: INPUT_VALIDATION_RULES_required,
                message,
                ref: inputRef,
                ...appendErrorsCurry(INPUT_VALIDATION_RULES_required, message),
              }),
              !validateAllFieldCriteria)
            )
              return (setCustomValidity(message), error);
          }
          if (!(isEmpty || (isNullOrUndefined(min) && isNullOrUndefined(max)))) {
            let exceedMax, exceedMin;
            const maxOutput = getValueAndMessage(max),
              minOutput = getValueAndMessage(min);
            if (isNullOrUndefined(inputValue) || isNaN(inputValue)) {
              const valueDate = ref.valueAsDate || new Date(inputValue),
                convertTimeToDate = (time) => new Date(new Date().toDateString() + ' ' + time),
                isTime = 'time' == ref.type,
                isWeek = 'week' == ref.type;
              (isString(maxOutput.value) &&
                inputValue &&
                (exceedMax = isTime
                  ? convertTimeToDate(inputValue) > convertTimeToDate(maxOutput.value)
                  : isWeek
                    ? inputValue > maxOutput.value
                    : valueDate > new Date(maxOutput.value)),
                isString(minOutput.value) &&
                  inputValue &&
                  (exceedMin = isTime
                    ? convertTimeToDate(inputValue) < convertTimeToDate(minOutput.value)
                    : isWeek
                      ? inputValue < minOutput.value
                      : valueDate < new Date(minOutput.value)));
            } else {
              const valueNumber = ref.valueAsNumber || (inputValue ? +inputValue : inputValue);
              (isNullOrUndefined(maxOutput.value) || (exceedMax = valueNumber > maxOutput.value),
                isNullOrUndefined(minOutput.value) || (exceedMin = valueNumber < minOutput.value));
            }
            if (
              (exceedMax || exceedMin) &&
              (getMinMaxMessage(
                !!exceedMax,
                maxOutput.message,
                minOutput.message,
                INPUT_VALIDATION_RULES_max,
                INPUT_VALIDATION_RULES_min
              ),
              !validateAllFieldCriteria)
            )
              return (setCustomValidity(error[name].message), error);
          }
          if (
            (maxLength || minLength) &&
            !isEmpty &&
            (isString(inputValue) || (isFieldArray && Array.isArray(inputValue)))
          ) {
            const maxLengthOutput = getValueAndMessage(maxLength),
              minLengthOutput = getValueAndMessage(minLength),
              exceedMax =
                !isNullOrUndefined(maxLengthOutput.value) &&
                inputValue.length > +maxLengthOutput.value,
              exceedMin =
                !isNullOrUndefined(minLengthOutput.value) &&
                inputValue.length < +minLengthOutput.value;
            if (
              (exceedMax || exceedMin) &&
              (getMinMaxMessage(exceedMax, maxLengthOutput.message, minLengthOutput.message),
              !validateAllFieldCriteria)
            )
              return (setCustomValidity(error[name].message), error);
          }
          if (pattern && !isEmpty && isString(inputValue)) {
            const { value: patternValue, message } = getValueAndMessage(pattern);
            if (
              isRegex(patternValue) &&
              !inputValue.match(patternValue) &&
              ((error[name] = {
                type: INPUT_VALIDATION_RULES_pattern,
                message,
                ref,
                ...appendErrorsCurry(INPUT_VALIDATION_RULES_pattern, message),
              }),
              !validateAllFieldCriteria)
            )
              return (setCustomValidity(message), error);
          }
          if (validate)
            if (isFunction(validate)) {
              const validateError = getValidateError(
                await validate(inputValue, formValues),
                inputRef
              );
              if (
                validateError &&
                ((error[name] = {
                  ...validateError,
                  ...appendErrorsCurry(INPUT_VALIDATION_RULES_validate, validateError.message),
                }),
                !validateAllFieldCriteria)
              )
                return (setCustomValidity(validateError.message), error);
            } else if (isObject(validate)) {
              let validationResult = {};
              for (const key in validate) {
                if (!isEmptyObject(validationResult) && !validateAllFieldCriteria) break;
                const validateError = getValidateError(
                  await validate[key](inputValue, formValues),
                  inputRef,
                  key
                );
                validateError &&
                  ((validationResult = {
                    ...validateError,
                    ...appendErrorsCurry(key, validateError.message),
                  }),
                  setCustomValidity(validateError.message),
                  validateAllFieldCriteria && (error[name] = validationResult));
              }
              if (
                !isEmptyObject(validationResult) &&
                ((error[name] = { ref: inputRef, ...validationResult }), !validateAllFieldCriteria)
              )
                return error;
            }
          return (setCustomValidity(!0), error);
        };
      const defaultOptions = {
        mode: VALIDATION_MODE_onSubmit,
        reValidateMode: VALIDATION_MODE_onChange,
        shouldFocusError: !0,
      };
      function createFormControl(props = {}) {
        let delayErrorCallback,
          _options = { ...defaultOptions, ...props },
          _formState = {
            submitCount: 0,
            isDirty: !1,
            isReady: !1,
            isLoading: isFunction(_options.defaultValues),
            isValidating: !1,
            isSubmitted: !1,
            isSubmitting: !1,
            isSubmitSuccessful: !1,
            isValid: !1,
            touchedFields: {},
            dirtyFields: {},
            validatingFields: {},
            errors: _options.errors || {},
            disabled: _options.disabled || !1,
          },
          _fields = {},
          _defaultValues =
            ((isObject(_options.defaultValues) || isObject(_options.values)) &&
              cloneObject(_options.defaultValues || _options.values)) ||
            {},
          _formValues = _options.shouldUnregister ? {} : cloneObject(_defaultValues),
          _state = { action: !1, mount: !1, watch: !1, keepIsValid: !1 },
          _names = {
            mount: new Set(),
            disabled: new Set(),
            unMount: new Set(),
            array: new Set(),
            watch: new Set(),
          },
          timer = 0;
        const defaultProxyFormState = {
            isDirty: !1,
            dirtyFields: !1,
            validatingFields: !1,
            touchedFields: !1,
            isValidating: !1,
            isValid: !1,
            errors: !1,
          },
          _proxyFormState = { ...defaultProxyFormState };
        let _proxySubscribeFormState = { ..._proxyFormState };
        const _subjects = { array: createSubject(), state: createSubject() },
          shouldDisplayAllAssociatedErrors = _options.criteriaMode === VALIDATION_MODE_all,
          _setValid = async (shouldUpdateValid) => {
            if (
              !_state.keepIsValid &&
              !_options.disabled &&
              (_proxyFormState.isValid || _proxySubscribeFormState.isValid || shouldUpdateValid)
            ) {
              let isValid;
              (_options.resolver
                ? ((isValid = isEmptyObject((await _runSchema()).errors)), _updateIsValidating())
                : (isValid = await executeBuiltInValidation(_fields, !0)),
                isValid !== _formState.isValid && _subjects.state.next({ isValid }));
            }
          },
          _updateIsValidating = (names, isValidating) => {
            !_options.disabled &&
              (_proxyFormState.isValidating ||
                _proxyFormState.validatingFields ||
                _proxySubscribeFormState.isValidating ||
                _proxySubscribeFormState.validatingFields) &&
              ((names || Array.from(_names.mount)).forEach((name) => {
                name &&
                  (isValidating
                    ? set(_formState.validatingFields, name, isValidating)
                    : unset(_formState.validatingFields, name));
              }),
              _subjects.state.next({
                validatingFields: _formState.validatingFields,
                isValidating: !isEmptyObject(_formState.validatingFields),
              }));
          },
          updateValidAndValue = (name, shouldSkipSetValueAs, value, ref) => {
            const field = get(_fields, name);
            if (field) {
              const defaultValue = get(
                _formValues,
                name,
                isUndefined(value) ? get(_defaultValues, name) : value
              );
              (isUndefined(defaultValue) || (ref && ref.defaultChecked) || shouldSkipSetValueAs
                ? set(
                    _formValues,
                    name,
                    shouldSkipSetValueAs ? defaultValue : getFieldValue(field._f)
                  )
                : setFieldValue(name, defaultValue),
                _state.mount && !_state.action && _setValid());
            }
          },
          updateTouchAndDirty = (name, fieldValue, isBlurEvent, shouldDirty, shouldRender) => {
            let shouldUpdateField = !1,
              isPreviousDirty = !1;
            const output = { name };
            if (!_options.disabled) {
              if (!isBlurEvent || shouldDirty) {
                (_proxyFormState.isDirty || _proxySubscribeFormState.isDirty) &&
                  ((isPreviousDirty = _formState.isDirty),
                  (_formState.isDirty = output.isDirty = _getDirty()),
                  (shouldUpdateField = isPreviousDirty !== output.isDirty));
                const isCurrentFieldPristine = deepEqual(get(_defaultValues, name), fieldValue);
                ((isPreviousDirty = !!get(_formState.dirtyFields, name)),
                  isCurrentFieldPristine
                    ? unset(_formState.dirtyFields, name)
                    : set(_formState.dirtyFields, name, !0),
                  (output.dirtyFields = _formState.dirtyFields),
                  (shouldUpdateField =
                    shouldUpdateField ||
                    ((_proxyFormState.dirtyFields || _proxySubscribeFormState.dirtyFields) &&
                      isPreviousDirty !== !isCurrentFieldPristine)));
              }
              if (isBlurEvent) {
                const isPreviousFieldTouched = get(_formState.touchedFields, name);
                isPreviousFieldTouched ||
                  (set(_formState.touchedFields, name, isBlurEvent),
                  (output.touchedFields = _formState.touchedFields),
                  (shouldUpdateField =
                    shouldUpdateField ||
                    ((_proxyFormState.touchedFields || _proxySubscribeFormState.touchedFields) &&
                      isPreviousFieldTouched !== isBlurEvent)));
              }
              shouldUpdateField && shouldRender && _subjects.state.next(output);
            }
            return shouldUpdateField ? output : {};
          },
          shouldRenderByError = (name, isValid, error, fieldState) => {
            const previousFieldError = get(_formState.errors, name),
              shouldUpdateValid =
                (_proxyFormState.isValid || _proxySubscribeFormState.isValid) &&
                isBoolean(isValid) &&
                _formState.isValid !== isValid;
            var callback;
            if (
              (_options.delayError && error
                ? ((callback = () =>
                    ((name, error) => {
                      (set(_formState.errors, name, error),
                        _subjects.state.next({ errors: _formState.errors }));
                    })(name, error)),
                  (delayErrorCallback = (wait) => {
                    (clearTimeout(timer), (timer = setTimeout(callback, wait)));
                  }),
                  delayErrorCallback(_options.delayError))
                : (clearTimeout(timer),
                  (delayErrorCallback = null),
                  error ? set(_formState.errors, name, error) : unset(_formState.errors, name)),
              (error ? !deepEqual(previousFieldError, error) : previousFieldError) ||
                !isEmptyObject(fieldState) ||
                shouldUpdateValid)
            ) {
              const updatedFormState = {
                ...fieldState,
                ...(shouldUpdateValid && isBoolean(isValid) ? { isValid } : {}),
                errors: _formState.errors,
                name,
              };
              ((_formState = { ..._formState, ...updatedFormState }),
                _subjects.state.next(updatedFormState));
            }
          },
          _runSchema = async (name) => {
            _updateIsValidating(name, !0);
            const result = await _options.resolver(
              _formValues,
              _options.context,
              ((fieldsNames, _fields, criteriaMode, shouldUseNativeValidation) => {
                const fields = {};
                for (const name of fieldsNames) {
                  const field = get(_fields, name);
                  field && set(fields, name, field._f);
                }
                return { criteriaMode, names: [...fieldsNames], fields, shouldUseNativeValidation };
              })(
                name || _names.mount,
                _fields,
                _options.criteriaMode,
                _options.shouldUseNativeValidation
              )
            );
            return result;
          },
          executeBuiltInValidation = async (
            fields,
            shouldOnlyCheckValid,
            context = { valid: !0 }
          ) => {
            for (const name in fields) {
              const field = fields[name];
              if (field) {
                const { _f, ...fieldValue } = field;
                if (_f) {
                  const isFieldArrayRoot = _names.array.has(_f.name),
                    isPromiseFunction = field._f && hasPromiseValidation(field._f);
                  isPromiseFunction &&
                    _proxyFormState.validatingFields &&
                    _updateIsValidating([_f.name], !0);
                  const fieldError = await validateField(
                    field,
                    _names.disabled,
                    _formValues,
                    shouldDisplayAllAssociatedErrors,
                    _options.shouldUseNativeValidation && !shouldOnlyCheckValid,
                    isFieldArrayRoot
                  );
                  if (
                    (isPromiseFunction &&
                      _proxyFormState.validatingFields &&
                      _updateIsValidating([_f.name]),
                    fieldError[_f.name] && ((context.valid = !1), shouldOnlyCheckValid))
                  )
                    break;
                  !shouldOnlyCheckValid &&
                    (get(fieldError, _f.name)
                      ? isFieldArrayRoot
                        ? updateFieldArrayRootError(_formState.errors, fieldError, _f.name)
                        : set(_formState.errors, _f.name, fieldError[_f.name])
                      : unset(_formState.errors, _f.name));
                }
                !isEmptyObject(fieldValue) &&
                  (await executeBuiltInValidation(fieldValue, shouldOnlyCheckValid, context));
              }
            }
            return context.valid;
          },
          _getDirty = (name, data) =>
            !_options.disabled &&
            (name && data && set(_formValues, name, data), !deepEqual(getValues(), _defaultValues)),
          _getWatch = (names, defaultValue, isGlobal) =>
            generateWatchOutput(
              names,
              _names,
              {
                ...(_state.mount
                  ? _formValues
                  : isUndefined(defaultValue)
                    ? _defaultValues
                    : isString(names)
                      ? { [names]: defaultValue }
                      : defaultValue),
              },
              isGlobal,
              defaultValue
            ),
          setFieldValue = (name, value, options = {}) => {
            const field = get(_fields, name);
            let fieldValue = value;
            if (field) {
              const fieldReference = field._f;
              fieldReference &&
                (!fieldReference.disabled &&
                  set(_formValues, name, getFieldValueAs(value, fieldReference)),
                (fieldValue =
                  isHTMLElement(fieldReference.ref) && isNullOrUndefined(value) ? '' : value),
                isMultipleSelect(fieldReference.ref)
                  ? [...fieldReference.ref.options].forEach(
                      (optionRef) => (optionRef.selected = fieldValue.includes(optionRef.value))
                    )
                  : fieldReference.refs
                    ? isCheckBoxInput(fieldReference.ref)
                      ? fieldReference.refs.forEach((checkboxRef) => {
                          (checkboxRef.defaultChecked && checkboxRef.disabled) ||
                            (Array.isArray(fieldValue)
                              ? (checkboxRef.checked = !!fieldValue.find(
                                  (data) => data === checkboxRef.value
                                ))
                              : (checkboxRef.checked =
                                  fieldValue === checkboxRef.value || !!fieldValue));
                        })
                      : fieldReference.refs.forEach(
                          (radioRef) => (radioRef.checked = radioRef.value === fieldValue)
                        )
                    : isFileInput(fieldReference.ref)
                      ? (fieldReference.ref.value = '')
                      : ((fieldReference.ref.value = fieldValue),
                        fieldReference.ref.type ||
                          _subjects.state.next({ name, values: cloneObject(_formValues) })));
            }
            ((options.shouldDirty || options.shouldTouch) &&
              updateTouchAndDirty(name, fieldValue, options.shouldTouch, options.shouldDirty, !0),
              options.shouldValidate && trigger(name));
          },
          setValues = (name, value, options) => {
            for (const fieldKey in value) {
              if (!value.hasOwnProperty(fieldKey)) return;
              const fieldValue = value[fieldKey],
                fieldName = name + '.' + fieldKey,
                field = get(_fields, fieldName);
              (_names.array.has(name) || isObject(fieldValue) || (field && !field._f)) &&
              !isDateObject(fieldValue)
                ? setValues(fieldName, fieldValue, options)
                : setFieldValue(fieldName, fieldValue, options);
            }
          },
          setValue = (name, value, options = {}) => {
            const field = get(_fields, name),
              isFieldArray = _names.array.has(name),
              cloneValue = cloneObject(value);
            (set(_formValues, name, cloneValue),
              isFieldArray
                ? (_subjects.array.next({ name, values: cloneObject(_formValues) }),
                  (_proxyFormState.isDirty ||
                    _proxyFormState.dirtyFields ||
                    _proxySubscribeFormState.isDirty ||
                    _proxySubscribeFormState.dirtyFields) &&
                    options.shouldDirty &&
                    _subjects.state.next({
                      name,
                      dirtyFields: getDirtyFields(_defaultValues, _formValues),
                      isDirty: _getDirty(name, cloneValue),
                    }))
                : !field || field._f || isNullOrUndefined(cloneValue)
                  ? setFieldValue(name, cloneValue, options)
                  : setValues(name, cloneValue, options),
              isWatched(name, _names) && _subjects.state.next({ ..._formState, name }),
              _subjects.state.next({
                name: _state.mount ? name : void 0,
                values: cloneObject(_formValues),
              }));
          },
          onChange = async (event) => {
            _state.mount = !0;
            const target = event.target;
            let name = target.name,
              isFieldValueUpdated = !0;
            const field = get(_fields, name),
              _updateIsFieldValueUpdated = (fieldValue) => {
                isFieldValueUpdated =
                  Number.isNaN(fieldValue) ||
                  (isDateObject(fieldValue) && isNaN(fieldValue.getTime())) ||
                  deepEqual(fieldValue, get(_formValues, name, fieldValue));
              },
              validationModeBeforeSubmit = getValidationModes(_options.mode),
              validationModeAfterSubmit = getValidationModes(_options.reValidateMode);
            if (field) {
              let error, isValid;
              const fieldValue = target.type ? getFieldValue(field._f) : getEventValue(event),
                isBlurEvent = event.type === EVENTS_BLUR || event.type === EVENTS_FOCUS_OUT,
                shouldSkipValidation =
                  !(
                    ((options = field._f).mount &&
                      (options.required ||
                        options.min ||
                        options.max ||
                        options.maxLength ||
                        options.minLength ||
                        options.pattern ||
                        options.validate)) ||
                    _options.resolver ||
                    get(_formState.errors, name) ||
                    field._f.deps
                  ) ||
                  ((isBlurEvent, isTouched, isSubmitted, reValidateMode, mode) =>
                    !mode.isOnAll &&
                    (!isSubmitted && mode.isOnTouch
                      ? !(isTouched || isBlurEvent)
                      : (isSubmitted ? reValidateMode.isOnBlur : mode.isOnBlur)
                        ? !isBlurEvent
                        : !(isSubmitted ? reValidateMode.isOnChange : mode.isOnChange) ||
                          isBlurEvent))(
                    isBlurEvent,
                    get(_formState.touchedFields, name),
                    _formState.isSubmitted,
                    validationModeAfterSubmit,
                    validationModeBeforeSubmit
                  ),
                watched = isWatched(name, _names, isBlurEvent);
              (set(_formValues, name, fieldValue),
                isBlurEvent
                  ? (target && target.readOnly) ||
                    (field._f.onBlur && field._f.onBlur(event),
                    delayErrorCallback && delayErrorCallback(0))
                  : field._f.onChange && field._f.onChange(event));
              const fieldState = updateTouchAndDirty(name, fieldValue, isBlurEvent),
                shouldRender = !isEmptyObject(fieldState) || watched;
              if (
                (!isBlurEvent &&
                  _subjects.state.next({
                    name,
                    type: event.type,
                    values: cloneObject(_formValues),
                  }),
                shouldSkipValidation)
              )
                return (
                  (_proxyFormState.isValid || _proxySubscribeFormState.isValid) &&
                    ('onBlur' === _options.mode
                      ? isBlurEvent && _setValid()
                      : isBlurEvent || _setValid()),
                  shouldRender && _subjects.state.next({ name, ...(watched ? {} : fieldState) })
                );
              if (
                (!isBlurEvent && watched && _subjects.state.next({ ..._formState }),
                _options.resolver)
              ) {
                const { errors } = await _runSchema([name]);
                if (
                  (_updateIsValidating([name]),
                  _updateIsFieldValueUpdated(fieldValue),
                  isFieldValueUpdated)
                ) {
                  const previousErrorLookupResult = schemaErrorLookup(
                      _formState.errors,
                      _fields,
                      name
                    ),
                    errorLookupResult = schemaErrorLookup(
                      errors,
                      _fields,
                      previousErrorLookupResult.name || name
                    );
                  ((error = errorLookupResult.error),
                    (name = errorLookupResult.name),
                    (isValid = isEmptyObject(errors)));
                }
              } else
                (_updateIsValidating([name], !0),
                  (error = (
                    await validateField(
                      field,
                      _names.disabled,
                      _formValues,
                      shouldDisplayAllAssociatedErrors,
                      _options.shouldUseNativeValidation
                    )
                  )[name]),
                  _updateIsValidating([name]),
                  _updateIsFieldValueUpdated(fieldValue),
                  isFieldValueUpdated &&
                    (error
                      ? (isValid = !1)
                      : (_proxyFormState.isValid || _proxySubscribeFormState.isValid) &&
                        (isValid = await executeBuiltInValidation(_fields, !0))));
              isFieldValueUpdated &&
                (field._f.deps &&
                  (!Array.isArray(field._f.deps) || field._f.deps.length > 0) &&
                  trigger(field._f.deps),
                shouldRenderByError(name, isValid, error, fieldState));
            }
            var options;
          },
          _focusInput = (ref, key) => {
            if (get(_formState.errors, key) && ref.focus) return (ref.focus(), 1);
          },
          trigger = async (name, options = {}) => {
            let isValid, validationResult;
            const fieldNames = convertToArrayPayload(name);
            if (_options.resolver) {
              const errors = await (async (names) => {
                const { errors } = await _runSchema(names);
                if ((_updateIsValidating(names), names))
                  for (const name of names) {
                    const error = get(errors, name);
                    error ? set(_formState.errors, name, error) : unset(_formState.errors, name);
                  }
                else _formState.errors = errors;
                return errors;
              })(isUndefined(name) ? name : fieldNames);
              ((isValid = isEmptyObject(errors)),
                (validationResult = name
                  ? !fieldNames.some((name) => get(errors, name))
                  : isValid));
            } else
              name
                ? ((validationResult = (
                    await Promise.all(
                      fieldNames.map(async (fieldName) => {
                        const field = get(_fields, fieldName);
                        return await executeBuiltInValidation(
                          field && field._f ? { [fieldName]: field } : field
                        );
                      })
                    )
                  ).every(Boolean)),
                  (validationResult || _formState.isValid) && _setValid())
                : (validationResult = isValid = await executeBuiltInValidation(_fields));
            return (
              _subjects.state.next({
                ...(!isString(name) ||
                ((_proxyFormState.isValid || _proxySubscribeFormState.isValid) &&
                  isValid !== _formState.isValid)
                  ? {}
                  : { name }),
                ...(_options.resolver || !name ? { isValid } : {}),
                errors: _formState.errors,
              }),
              options.shouldFocus &&
                !validationResult &&
                iterateFieldsByAction(_fields, _focusInput, name ? fieldNames : _names.mount),
              validationResult
            );
          },
          getValues = (fieldNames, config) => {
            let values = { ...(_state.mount ? _formValues : _defaultValues) };
            return (
              config &&
                (values = extractFormValues(
                  config.dirtyFields ? _formState.dirtyFields : _formState.touchedFields,
                  values
                )),
              isUndefined(fieldNames)
                ? values
                : isString(fieldNames)
                  ? get(values, fieldNames)
                  : fieldNames.map((name) => get(values, name))
            );
          },
          getFieldState = (name, formState) => ({
            invalid: !!get((formState || _formState).errors, name),
            isDirty: !!get((formState || _formState).dirtyFields, name),
            error: get((formState || _formState).errors, name),
            isValidating: !!get(_formState.validatingFields, name),
            isTouched: !!get((formState || _formState).touchedFields, name),
          }),
          setError = (name, error, options) => {
            const ref = (get(_fields, name, { _f: {} })._f || {}).ref,
              currentError = get(_formState.errors, name) || {},
              { ref: currentRef, message, type, ...restOfErrorTree } = currentError;
            (set(_formState.errors, name, { ...restOfErrorTree, ...error, ref }),
              _subjects.state.next({ name, errors: _formState.errors, isValid: !1 }),
              options && options.shouldFocus && ref && ref.focus && ref.focus());
          },
          _subscribe = (props) =>
            _subjects.state.subscribe({
              next: (formState) => {
                var name, signalName, exact;
                ((name = props.name),
                  (signalName = formState.name),
                  (exact = props.exact),
                  (name &&
                    signalName &&
                    name !== signalName &&
                    !convertToArrayPayload(name).some(
                      (currentName) =>
                        currentName &&
                        (exact
                          ? currentName === signalName
                          : currentName.startsWith(signalName) ||
                            signalName.startsWith(currentName))
                    )) ||
                    !((formStateData, _proxyFormState, updateFormState, isRoot) => {
                      updateFormState(formStateData);
                      const { name, ...formState } = formStateData;
                      return (
                        isEmptyObject(formState) ||
                        Object.keys(formState).length >= Object.keys(_proxyFormState).length ||
                        Object.keys(formState).find(
                          (key) => _proxyFormState[key] === (!isRoot || VALIDATION_MODE_all)
                        )
                      );
                    })(
                      formState,
                      props.formState || _proxyFormState,
                      _setFormState,
                      props.reRenderRoot
                    ) ||
                    props.callback({
                      values: { ..._formValues },
                      ..._formState,
                      ...formState,
                      defaultValues: _defaultValues,
                    }));
              },
            }).unsubscribe,
          unregister = (name, options = {}) => {
            for (const fieldName of name ? convertToArrayPayload(name) : _names.mount)
              (_names.mount.delete(fieldName),
                _names.array.delete(fieldName),
                options.keepValue || (unset(_fields, fieldName), unset(_formValues, fieldName)),
                !options.keepError && unset(_formState.errors, fieldName),
                !options.keepDirty && unset(_formState.dirtyFields, fieldName),
                !options.keepTouched && unset(_formState.touchedFields, fieldName),
                !options.keepIsValidating && unset(_formState.validatingFields, fieldName),
                !_options.shouldUnregister &&
                  !options.keepDefaultValue &&
                  unset(_defaultValues, fieldName));
            (_subjects.state.next({ values: cloneObject(_formValues) }),
              _subjects.state.next({
                ..._formState,
                ...(options.keepDirty ? { isDirty: _getDirty() } : {}),
              }),
              !options.keepIsValid && _setValid());
          },
          _setDisabledField = ({ disabled, name }) => {
            ((isBoolean(disabled) && _state.mount) || disabled || _names.disabled.has(name)) &&
              (disabled ? _names.disabled.add(name) : _names.disabled.delete(name));
          },
          register = (name, options = {}) => {
            let field = get(_fields, name);
            const disabledIsDefined = isBoolean(options.disabled) || isBoolean(_options.disabled);
            return (
              set(_fields, name, {
                ...(field || {}),
                _f: {
                  ...(field && field._f ? field._f : { ref: { name } }),
                  name,
                  mount: !0,
                  ...options,
                },
              }),
              _names.mount.add(name),
              field
                ? _setDisabledField({
                    disabled: isBoolean(options.disabled) ? options.disabled : _options.disabled,
                    name,
                  })
                : updateValidAndValue(name, !0, options.value),
              {
                ...(disabledIsDefined ? { disabled: options.disabled || _options.disabled } : {}),
                ...(_options.progressive
                  ? {
                      required: !!options.required,
                      min: getRuleValue(options.min),
                      max: getRuleValue(options.max),
                      minLength: getRuleValue(options.minLength),
                      maxLength: getRuleValue(options.maxLength),
                      pattern: getRuleValue(options.pattern),
                    }
                  : {}),
                name,
                onChange,
                onBlur: onChange,
                ref: (ref) => {
                  if (ref) {
                    (register(name, options), (field = get(_fields, name)));
                    const fieldRef =
                        (isUndefined(ref.value) &&
                          ref.querySelectorAll &&
                          ref.querySelectorAll('input,select,textarea')[0]) ||
                        ref,
                      radioOrCheckbox = ((ref) => isRadioInput(ref) || isCheckBoxInput(ref))(
                        fieldRef
                      ),
                      refs = field._f.refs || [];
                    if (
                      radioOrCheckbox
                        ? refs.find((option) => option === fieldRef)
                        : fieldRef === field._f.ref
                    )
                      return;
                    (set(_fields, name, {
                      _f: {
                        ...field._f,
                        ...(radioOrCheckbox
                          ? {
                              refs: [
                                ...refs.filter(live),
                                fieldRef,
                                ...(Array.isArray(get(_defaultValues, name)) ? [{}] : []),
                              ],
                              ref: { type: fieldRef.type, name },
                            }
                          : { ref: fieldRef }),
                      },
                    }),
                      updateValidAndValue(name, !1, void 0, fieldRef));
                  } else
                    ((field = get(_fields, name, {})),
                      field._f && (field._f.mount = !1),
                      (_options.shouldUnregister || options.shouldUnregister) &&
                        (!isNameInFieldArray(_names.array, name) || !_state.action) &&
                        _names.unMount.add(name));
                },
              }
            );
          },
          _focusError = () =>
            _options.shouldFocusError && iterateFieldsByAction(_fields, _focusInput, _names.mount),
          handleSubmit = (onValid, onInvalid) => async (e) => {
            let onValidError;
            e && (e.preventDefault && e.preventDefault(), e.persist && e.persist());
            let fieldValues = cloneObject(_formValues);
            if ((_subjects.state.next({ isSubmitting: !0 }), _options.resolver)) {
              const { errors, values } = await _runSchema();
              (_updateIsValidating(),
                (_formState.errors = errors),
                (fieldValues = cloneObject(values)));
            } else await executeBuiltInValidation(_fields);
            if (_names.disabled.size) for (const name of _names.disabled) unset(fieldValues, name);
            if ((unset(_formState.errors, 'root'), isEmptyObject(_formState.errors))) {
              _subjects.state.next({ errors: {} });
              try {
                await onValid(fieldValues, e);
              } catch (error) {
                onValidError = error;
              }
            } else
              (onInvalid && (await onInvalid({ ..._formState.errors }, e)),
                _focusError(),
                setTimeout(_focusError));
            if (
              (_subjects.state.next({
                isSubmitted: !0,
                isSubmitting: !1,
                isSubmitSuccessful: isEmptyObject(_formState.errors) && !onValidError,
                submitCount: _formState.submitCount + 1,
                errors: _formState.errors,
              }),
              onValidError)
            )
              throw onValidError;
          },
          _reset = (formValues, keepStateOptions = {}) => {
            const updatedValues = formValues ? cloneObject(formValues) : _defaultValues,
              cloneUpdatedValues = cloneObject(updatedValues),
              isEmptyResetValues = isEmptyObject(formValues),
              values = isEmptyResetValues ? _defaultValues : cloneUpdatedValues;
            if (
              (keepStateOptions.keepDefaultValues || (_defaultValues = updatedValues),
              !keepStateOptions.keepValues)
            ) {
              if (keepStateOptions.keepDirtyValues) {
                const fieldsToCheck = new Set([
                  ..._names.mount,
                  ...Object.keys(getDirtyFields(_defaultValues, _formValues)),
                ]);
                for (const fieldName of Array.from(fieldsToCheck))
                  get(_formState.dirtyFields, fieldName)
                    ? set(values, fieldName, get(_formValues, fieldName))
                    : setValue(fieldName, get(values, fieldName));
              } else {
                if (isWeb && isUndefined(formValues))
                  for (const name of _names.mount) {
                    const field = get(_fields, name);
                    if (field && field._f) {
                      const fieldReference = Array.isArray(field._f.refs)
                        ? field._f.refs[0]
                        : field._f.ref;
                      if (isHTMLElement(fieldReference)) {
                        const form = fieldReference.closest('form');
                        if (form) {
                          form.reset();
                          break;
                        }
                      }
                    }
                  }
                if (keepStateOptions.keepFieldsRef)
                  for (const fieldName of _names.mount) setValue(fieldName, get(values, fieldName));
                else _fields = {};
              }
              ((_formValues = _options.shouldUnregister
                ? keepStateOptions.keepDefaultValues
                  ? cloneObject(_defaultValues)
                  : {}
                : cloneObject(values)),
                _subjects.array.next({ values: { ...values } }),
                _subjects.state.next({ values: { ...values } }));
            }
            ((_names = {
              mount: keepStateOptions.keepDirtyValues ? _names.mount : new Set(),
              unMount: new Set(),
              array: new Set(),
              disabled: new Set(),
              watch: new Set(),
              watchAll: !1,
              focus: '',
            }),
              (_state.mount =
                !_proxyFormState.isValid ||
                !!keepStateOptions.keepIsValid ||
                !!keepStateOptions.keepDirtyValues ||
                (!_options.shouldUnregister && !isEmptyObject(values))),
              (_state.watch = !!_options.shouldUnregister),
              (_state.keepIsValid = !!keepStateOptions.keepIsValid),
              (_state.action = !1),
              keepStateOptions.keepErrors || (_formState.errors = {}),
              _subjects.state.next({
                submitCount: keepStateOptions.keepSubmitCount ? _formState.submitCount : 0,
                isDirty:
                  !isEmptyResetValues &&
                  (keepStateOptions.keepDirty
                    ? _formState.isDirty
                    : !(
                        !keepStateOptions.keepDefaultValues || deepEqual(formValues, _defaultValues)
                      )),
                isSubmitted: !!keepStateOptions.keepIsSubmitted && _formState.isSubmitted,
                dirtyFields: isEmptyResetValues
                  ? {}
                  : keepStateOptions.keepDirtyValues
                    ? keepStateOptions.keepDefaultValues && _formValues
                      ? getDirtyFields(_defaultValues, _formValues)
                      : _formState.dirtyFields
                    : keepStateOptions.keepDefaultValues && formValues
                      ? getDirtyFields(_defaultValues, formValues)
                      : keepStateOptions.keepDirty
                        ? _formState.dirtyFields
                        : {},
                touchedFields: keepStateOptions.keepTouched ? _formState.touchedFields : {},
                errors: keepStateOptions.keepErrors ? _formState.errors : {},
                isSubmitSuccessful:
                  !!keepStateOptions.keepIsSubmitSuccessful && _formState.isSubmitSuccessful,
                isSubmitting: !1,
                defaultValues: _defaultValues,
              }));
          },
          reset = (formValues, keepStateOptions) =>
            _reset(isFunction(formValues) ? formValues(_formValues) : formValues, {
              ..._options.resetOptions,
              ...keepStateOptions,
            }),
          _setFormState = (updatedFormState) => {
            _formState = { ..._formState, ...updatedFormState };
          },
          methods = {
            control: {
              register,
              unregister,
              getFieldState,
              handleSubmit,
              setError,
              _subscribe,
              _runSchema,
              _updateIsValidating,
              _focusError,
              _getWatch,
              _getDirty,
              _setValid,
              _setFieldArray: (
                name,
                values = [],
                method,
                args,
                shouldSetValues = !0,
                shouldUpdateFieldsAndState = !0
              ) => {
                if (args && method && !_options.disabled) {
                  if (
                    ((_state.action = !0),
                    shouldUpdateFieldsAndState && Array.isArray(get(_fields, name)))
                  ) {
                    const fieldValues = method(get(_fields, name), args.argA, args.argB);
                    shouldSetValues && set(_fields, name, fieldValues);
                  }
                  if (shouldUpdateFieldsAndState && Array.isArray(get(_formState.errors, name))) {
                    const errors = method(get(_formState.errors, name), args.argA, args.argB);
                    (shouldSetValues && set(_formState.errors, name, errors),
                      ((ref, name) => {
                        !compact(get(ref, name)).length && unset(ref, name);
                      })(_formState.errors, name));
                  }
                  if (
                    (_proxyFormState.touchedFields || _proxySubscribeFormState.touchedFields) &&
                    shouldUpdateFieldsAndState &&
                    Array.isArray(get(_formState.touchedFields, name))
                  ) {
                    const touchedFields = method(
                      get(_formState.touchedFields, name),
                      args.argA,
                      args.argB
                    );
                    shouldSetValues && set(_formState.touchedFields, name, touchedFields);
                  }
                  ((_proxyFormState.dirtyFields || _proxySubscribeFormState.dirtyFields) &&
                    (_formState.dirtyFields = getDirtyFields(_defaultValues, _formValues)),
                    _subjects.state.next({
                      name,
                      isDirty: _getDirty(name, values),
                      dirtyFields: _formState.dirtyFields,
                      errors: _formState.errors,
                      isValid: _formState.isValid,
                    }));
                } else set(_formValues, name, values);
              },
              _setDisabledField,
              _setErrors: (errors) => {
                ((_formState.errors = errors),
                  _subjects.state.next({ errors: _formState.errors, isValid: !1 }));
              },
              _getFieldArray: (name) =>
                compact(
                  get(
                    _state.mount ? _formValues : _defaultValues,
                    name,
                    _options.shouldUnregister ? get(_defaultValues, name, []) : []
                  )
                ),
              _reset,
              _resetDefaultValues: () =>
                isFunction(_options.defaultValues) &&
                _options.defaultValues().then((values) => {
                  (reset(values, _options.resetOptions), _subjects.state.next({ isLoading: !1 }));
                }),
              _removeUnmounted: () => {
                for (const name of _names.unMount) {
                  const field = get(_fields, name);
                  field &&
                    (field._f.refs
                      ? field._f.refs.every((ref) => !live(ref))
                      : !live(field._f.ref)) &&
                    unregister(name);
                }
                _names.unMount = new Set();
              },
              _disableForm: (disabled) => {
                isBoolean(disabled) &&
                  (_subjects.state.next({ disabled }),
                  iterateFieldsByAction(
                    _fields,
                    (ref, name) => {
                      const currentField = get(_fields, name);
                      currentField &&
                        ((ref.disabled = currentField._f.disabled || disabled),
                        Array.isArray(currentField._f.refs) &&
                          currentField._f.refs.forEach((inputRef) => {
                            inputRef.disabled = currentField._f.disabled || disabled;
                          }));
                    },
                    0,
                    !1
                  ));
              },
              _subjects,
              _proxyFormState,
              get _fields() {
                return _fields;
              },
              get _formValues() {
                return _formValues;
              },
              get _state() {
                return _state;
              },
              set _state(value) {
                _state = value;
              },
              get _defaultValues() {
                return _defaultValues;
              },
              get _names() {
                return _names;
              },
              set _names(value) {
                _names = value;
              },
              get _formState() {
                return _formState;
              },
              get _options() {
                return _options;
              },
              set _options(value) {
                _options = { ..._options, ...value };
              },
            },
            subscribe: (props) => (
              (_state.mount = !0),
              (_proxySubscribeFormState = { ..._proxySubscribeFormState, ...props.formState }),
              _subscribe({ ...props, formState: { ...defaultProxyFormState, ...props.formState } })
            ),
            trigger,
            register,
            handleSubmit,
            watch: (name, defaultValue) =>
              isFunction(name)
                ? _subjects.state.subscribe({
                    next: (payload) =>
                      'values' in payload && name(_getWatch(void 0, defaultValue), payload),
                  })
                : _getWatch(name, defaultValue, !0),
            setValue,
            getValues,
            reset,
            resetField: (name, options = {}) => {
              get(_fields, name) &&
                (isUndefined(options.defaultValue)
                  ? setValue(name, cloneObject(get(_defaultValues, name)))
                  : (setValue(name, options.defaultValue),
                    set(_defaultValues, name, cloneObject(options.defaultValue))),
                options.keepTouched || unset(_formState.touchedFields, name),
                options.keepDirty ||
                  (unset(_formState.dirtyFields, name),
                  (_formState.isDirty = options.defaultValue
                    ? _getDirty(name, cloneObject(get(_defaultValues, name)))
                    : _getDirty())),
                options.keepError ||
                  (unset(_formState.errors, name), _proxyFormState.isValid && _setValid()),
                _subjects.state.next({ ..._formState }));
            },
            clearErrors: (name) => {
              (name &&
                convertToArrayPayload(name).forEach((inputName) =>
                  unset(_formState.errors, inputName)
                ),
                _subjects.state.next({ errors: name ? _formState.errors : {} }));
            },
            unregister,
            setError,
            setFocus: (name, options = {}) => {
              const field = get(_fields, name),
                fieldReference = field && field._f;
              if (fieldReference) {
                const fieldRef = fieldReference.refs ? fieldReference.refs[0] : fieldReference.ref;
                fieldRef.focus &&
                  setTimeout(() => {
                    (fieldRef.focus(),
                      options.shouldSelect && isFunction(fieldRef.select) && fieldRef.select());
                  });
              }
            },
            getFieldState,
          };
        return { ...methods, formControl: methods };
      }
      function useForm(props = {}) {
        const _formControl = react__WEBPACK_IMPORTED_MODULE_0__.useRef(void 0),
          _values = react__WEBPACK_IMPORTED_MODULE_0__.useRef(void 0),
          [formState, updateFormState] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
            isDirty: !1,
            isValidating: !1,
            isLoading: isFunction(props.defaultValues),
            isSubmitted: !1,
            isSubmitting: !1,
            isSubmitSuccessful: !1,
            isValid: !1,
            submitCount: 0,
            dirtyFields: {},
            touchedFields: {},
            validatingFields: {},
            errors: props.errors || {},
            disabled: props.disabled || !1,
            isReady: !1,
            defaultValues: isFunction(props.defaultValues) ? void 0 : props.defaultValues,
          });
        if (!_formControl.current)
          if (props.formControl)
            ((_formControl.current = { ...props.formControl, formState }),
              props.defaultValues &&
                !isFunction(props.defaultValues) &&
                props.formControl.reset(props.defaultValues, props.resetOptions));
          else {
            const { formControl, ...rest } = createFormControl(props);
            _formControl.current = { ...rest, formState };
          }
        const control = _formControl.current.control;
        return (
          (control._options = props),
          useIsomorphicLayoutEffect(() => {
            const sub = control._subscribe({
              formState: control._proxyFormState,
              callback: () => updateFormState({ ...control._formState }),
              reRenderRoot: !0,
            });
            return (
              updateFormState((data) => ({ ...data, isReady: !0 })),
              (control._formState.isReady = !0),
              sub
            );
          }, [control]),
          react__WEBPACK_IMPORTED_MODULE_0__.useEffect(
            () => control._disableForm(props.disabled),
            [control, props.disabled]
          ),
          react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
            (props.mode && (control._options.mode = props.mode),
              props.reValidateMode && (control._options.reValidateMode = props.reValidateMode));
          }, [control, props.mode, props.reValidateMode]),
          react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
            props.errors && (control._setErrors(props.errors), control._focusError());
          }, [control, props.errors]),
          react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
            props.shouldUnregister && control._subjects.state.next({ values: control._getWatch() });
          }, [control, props.shouldUnregister]),
          react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
            if (control._proxyFormState.isDirty) {
              const isDirty = control._getDirty();
              isDirty !== formState.isDirty && control._subjects.state.next({ isDirty });
            }
          }, [control, formState.isDirty]),
          react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
            var _a;
            props.values && !deepEqual(props.values, _values.current)
              ? (control._reset(props.values, {
                  keepFieldsRef: !0,
                  ...control._options.resetOptions,
                }),
                (null === (_a = control._options.resetOptions) || void 0 === _a
                  ? void 0
                  : _a.keepIsValid) || control._setValid(),
                (_values.current = props.values),
                updateFormState((state) => ({ ...state })))
              : control._resetDefaultValues();
          }, [control, props.values]),
          react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
            (control._state.mount || (control._setValid(), (control._state.mount = !0)),
              control._state.watch &&
                ((control._state.watch = !1),
                control._subjects.state.next({ ...control._formState })),
              control._removeUnmounted());
          }),
          (_formControl.current.formState = getProxyFormState(formState, control)),
          _formControl.current
        );
      }
    },
    './node_modules/zod/v4/classic/external.js'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        k5n: () => _enum,
        Ikc: () => object,
        YjP: () => string,
      });
      var checks_namespaceObject = {};
      (__webpack_require__.r(checks_namespaceObject),
        __webpack_require__.d(checks_namespaceObject, {
          endsWith: () => v4_core.ERr,
          gt: () => v4_core.TxR,
          gte: () => v4_core.qmM,
          includes: () => v4_core.dRF,
          length: () => v4_core.YAm,
          lowercase: () => v4_core.hH9,
          lt: () => v4_core.AuJ,
          lte: () => v4_core.Zm2,
          maxLength: () => v4_core.Ebs,
          maxSize: () => v4_core.vL7,
          mime: () => v4_core.GZZ,
          minLength: () => v4_core.m9B,
          minSize: () => v4_core.Ndf,
          multipleOf: () => v4_core.HiR,
          negative: () => v4_core.bRU,
          nonnegative: () => v4_core.UIm,
          nonpositive: () => v4_core.ejI,
          normalize: () => v4_core.loG,
          overwrite: () => v4_core.bS9,
          positive: () => v4_core.NCA,
          property: () => v4_core.Jfo,
          regex: () => v4_core.Fkv,
          size: () => v4_core.d$Q,
          slugify: () => v4_core.TLt,
          startsWith: () => v4_core.$S2,
          toLowerCase: () => v4_core.Ilv,
          toUpperCase: () => v4_core.xYx,
          trim: () => v4_core.WN0,
          uppercase: () => v4_core.qFb,
        }));
      var iso_namespaceObject = {};
      (__webpack_require__.r(iso_namespaceObject),
        __webpack_require__.d(iso_namespaceObject, {
          ZodISODate: () => ZodISODate,
          ZodISODateTime: () => ZodISODateTime,
          ZodISODuration: () => ZodISODuration,
          ZodISOTime: () => ZodISOTime,
          date: () => date,
          datetime: () => datetime,
          duration: () => duration,
          time: () => time,
        }));
      var schemas_namespaceObject = {};
      (__webpack_require__.r(schemas_namespaceObject),
        __webpack_require__.d(schemas_namespaceObject, {
          ZodAny: () => ZodAny,
          ZodArray: () => ZodArray,
          ZodBase64: () => ZodBase64,
          ZodBase64URL: () => ZodBase64URL,
          ZodBigInt: () => ZodBigInt,
          ZodBigIntFormat: () => ZodBigIntFormat,
          ZodBoolean: () => ZodBoolean,
          ZodCIDRv4: () => ZodCIDRv4,
          ZodCIDRv6: () => ZodCIDRv6,
          ZodCUID: () => ZodCUID,
          ZodCUID2: () => ZodCUID2,
          ZodCatch: () => ZodCatch,
          ZodCodec: () => ZodCodec,
          ZodCustom: () => ZodCustom,
          ZodCustomStringFormat: () => ZodCustomStringFormat,
          ZodDate: () => ZodDate,
          ZodDefault: () => ZodDefault,
          ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
          ZodE164: () => ZodE164,
          ZodEmail: () => ZodEmail,
          ZodEmoji: () => ZodEmoji,
          ZodEnum: () => ZodEnum,
          ZodFile: () => ZodFile,
          ZodFunction: () => ZodFunction,
          ZodGUID: () => ZodGUID,
          ZodIPv4: () => ZodIPv4,
          ZodIPv6: () => ZodIPv6,
          ZodIntersection: () => ZodIntersection,
          ZodJWT: () => ZodJWT,
          ZodKSUID: () => ZodKSUID,
          ZodLazy: () => ZodLazy,
          ZodLiteral: () => ZodLiteral,
          ZodMAC: () => ZodMAC,
          ZodMap: () => ZodMap,
          ZodNaN: () => ZodNaN,
          ZodNanoID: () => ZodNanoID,
          ZodNever: () => ZodNever,
          ZodNonOptional: () => ZodNonOptional,
          ZodNull: () => ZodNull,
          ZodNullable: () => ZodNullable,
          ZodNumber: () => ZodNumber,
          ZodNumberFormat: () => ZodNumberFormat,
          ZodObject: () => ZodObject,
          ZodOptional: () => ZodOptional,
          ZodPipe: () => ZodPipe,
          ZodPrefault: () => ZodPrefault,
          ZodPromise: () => ZodPromise,
          ZodReadonly: () => ZodReadonly,
          ZodRecord: () => ZodRecord,
          ZodSet: () => ZodSet,
          ZodString: () => ZodString,
          ZodStringFormat: () => ZodStringFormat,
          ZodSuccess: () => ZodSuccess,
          ZodSymbol: () => ZodSymbol,
          ZodTemplateLiteral: () => ZodTemplateLiteral,
          ZodTransform: () => ZodTransform,
          ZodTuple: () => ZodTuple,
          ZodType: () => ZodType,
          ZodULID: () => ZodULID,
          ZodURL: () => ZodURL,
          ZodUUID: () => ZodUUID,
          ZodUndefined: () => ZodUndefined,
          ZodUnion: () => ZodUnion,
          ZodUnknown: () => ZodUnknown,
          ZodVoid: () => ZodVoid,
          ZodXID: () => ZodXID,
          ZodXor: () => ZodXor,
          _ZodString: () => _ZodString,
          _default: () => _default,
          _function: () => _function,
          any: () => any,
          array: () => array,
          base64: () => base64,
          base64url: () => base64url,
          bigint: () => bigint,
          boolean: () => schemas_boolean,
          catch: () => _catch,
          check: () => check,
          cidrv4: () => cidrv4,
          cidrv6: () => cidrv6,
          codec: () => codec,
          cuid: () => cuid,
          cuid2: () => cuid2,
          custom: () => custom,
          date: () => schemas_date,
          describe: () => describe,
          discriminatedUnion: () => discriminatedUnion,
          e164: () => e164,
          email: () => email,
          emoji: () => emoji,
          enum: () => _enum,
          file: () => file,
          float32: () => float32,
          float64: () => float64,
          function: () => _function,
          guid: () => guid,
          hash: () => hash,
          hex: () => hex,
          hostname: () => hostname,
          httpUrl: () => httpUrl,
          instanceof: () => _instanceof,
          int: () => schemas_int,
          int32: () => int32,
          int64: () => int64,
          intersection: () => intersection,
          ipv4: () => ipv4,
          ipv6: () => ipv6,
          json: () => json,
          jwt: () => jwt,
          keyof: () => keyof,
          ksuid: () => ksuid,
          lazy: () => lazy,
          literal: () => literal,
          looseObject: () => looseObject,
          looseRecord: () => looseRecord,
          mac: () => mac,
          map: () => map,
          meta: () => meta,
          nan: () => nan,
          nanoid: () => nanoid,
          nativeEnum: () => nativeEnum,
          never: () => never,
          nonoptional: () => nonoptional,
          null: () => _null,
          nullable: () => nullable,
          nullish: () => nullish,
          number: () => number,
          object: () => object,
          optional: () => optional,
          partialRecord: () => partialRecord,
          pipe: () => pipe,
          prefault: () => prefault,
          preprocess: () => preprocess,
          promise: () => promise,
          readonly: () => readonly,
          record: () => record,
          refine: () => refine,
          set: () => set,
          strictObject: () => strictObject,
          string: () => string,
          stringFormat: () => stringFormat,
          stringbool: () => stringbool,
          success: () => success,
          superRefine: () => superRefine,
          symbol: () => symbol,
          templateLiteral: () => templateLiteral,
          transform: () => transform,
          tuple: () => tuple,
          uint32: () => uint32,
          uint64: () => uint64,
          ulid: () => ulid,
          undefined: () => _undefined,
          union: () => union,
          unknown: () => unknown,
          url: () => url,
          uuid: () => uuid,
          uuidv4: () => uuidv4,
          uuidv6: () => uuidv6,
          uuidv7: () => uuidv7,
          void: () => _void,
          xid: () => xid,
          xor: () => xor,
        }));
      var v4_core = __webpack_require__('./node_modules/zod/v4/core/index.js'),
        json_schema_processors = __webpack_require__(
          './node_modules/zod/v4/core/json-schema-processors.js'
        ),
        to_json_schema = __webpack_require__('./node_modules/zod/v4/core/to-json-schema.js');
      const ZodISODateTime = v4_core.xIx('ZodISODateTime', (inst, def) => {
        (v4_core.KoL.init(inst, def), ZodStringFormat.init(inst, def));
      });
      function datetime(params) {
        return v4_core.G1$(ZodISODateTime, params);
      }
      const ZodISODate = v4_core.xIx('ZodISODate', (inst, def) => {
        (v4_core.v1L.init(inst, def), ZodStringFormat.init(inst, def));
      });
      function date(params) {
        return v4_core.dbS(ZodISODate, params);
      }
      const ZodISOTime = v4_core.xIx('ZodISOTime', (inst, def) => {
        (v4_core.Ax8.init(inst, def), ZodStringFormat.init(inst, def));
      });
      function time(params) {
        return v4_core.KnZ(ZodISOTime, params);
      }
      const ZodISODuration = v4_core.xIx('ZodISODuration', (inst, def) => {
        (v4_core.$Nv.init(inst, def), ZodStringFormat.init(inst, def));
      });
      function duration(params) {
        return v4_core.f25(ZodISODuration, params);
      }
      var util = __webpack_require__('./node_modules/zod/v4/core/util.js');
      const initializer = (inst, issues) => {
          (v4_core.a$H.init(inst, issues),
            (inst.name = 'ZodError'),
            Object.defineProperties(inst, {
              format: { value: (mapper) => v4_core.Wk_(inst, mapper) },
              flatten: { value: (mapper) => v4_core.JMU(inst, mapper) },
              addIssue: {
                value: (issue) => {
                  (inst.issues.push(issue),
                    (inst.message = JSON.stringify(inst.issues, util.jsonStringifyReplacer, 2)));
                },
              },
              addIssues: {
                value: (issues) => {
                  (inst.issues.push(...issues),
                    (inst.message = JSON.stringify(inst.issues, util.jsonStringifyReplacer, 2)));
                },
              },
              isEmpty: { get: () => 0 === inst.issues.length },
            }));
        },
        ZodRealError =
          (v4_core.xIx('ZodError', initializer),
          v4_core.xIx('ZodError', initializer, { Parent: Error })),
        parse = v4_core.Tjm(ZodRealError),
        parseAsync = v4_core.Rb(ZodRealError),
        safeParse = v4_core.Ody(ZodRealError),
        safeParseAsync = v4_core.wGr(ZodRealError),
        encode = v4_core.MvX(ZodRealError),
        decode = v4_core.e2D(ZodRealError),
        encodeAsync = v4_core.GWO(ZodRealError),
        decodeAsync = v4_core.or4(ZodRealError),
        safeEncode = v4_core.rhe(ZodRealError),
        safeDecode = v4_core.VSu(ZodRealError),
        safeEncodeAsync = v4_core.v_W(ZodRealError),
        safeDecodeAsync = v4_core.R3(ZodRealError),
        ZodType = v4_core.xIx(
          'ZodType',
          (inst, def) => (
            v4_core.W4S.init(inst, def),
            Object.assign(inst['~standard'], {
              jsonSchema: {
                input: (0, to_json_schema.uE)(inst, 'input'),
                output: (0, to_json_schema.uE)(inst, 'output'),
              },
            }),
            (inst.toJSONSchema = (0, to_json_schema.OA)(inst, {})),
            (inst.def = def),
            (inst.type = def.type),
            Object.defineProperty(inst, '_def', { value: def }),
            (inst.check = (...checks) =>
              inst.clone(
                v4_core.ZSL.mergeDefs(def, {
                  checks: [
                    ...(def.checks ?? []),
                    ...checks.map((ch) =>
                      'function' == typeof ch
                        ? { _zod: { check: ch, def: { check: 'custom' }, onattach: [] } }
                        : ch
                    ),
                  ],
                })
              )),
            (inst.clone = (def, params) => v4_core.o8B(inst, def, params)),
            (inst.brand = () => inst),
            (inst.register = (reg, meta) => (reg.add(inst, meta), inst)),
            (inst.parse = (data, params) => parse(inst, data, params, { callee: inst.parse })),
            (inst.safeParse = (data, params) => safeParse(inst, data, params)),
            (inst.parseAsync = async (data, params) =>
              parseAsync(inst, data, params, { callee: inst.parseAsync })),
            (inst.safeParseAsync = async (data, params) => safeParseAsync(inst, data, params)),
            (inst.spa = inst.safeParseAsync),
            (inst.encode = (data, params) => encode(inst, data, params)),
            (inst.decode = (data, params) => decode(inst, data, params)),
            (inst.encodeAsync = async (data, params) => encodeAsync(inst, data, params)),
            (inst.decodeAsync = async (data, params) => decodeAsync(inst, data, params)),
            (inst.safeEncode = (data, params) => safeEncode(inst, data, params)),
            (inst.safeDecode = (data, params) => safeDecode(inst, data, params)),
            (inst.safeEncodeAsync = async (data, params) => safeEncodeAsync(inst, data, params)),
            (inst.safeDecodeAsync = async (data, params) => safeDecodeAsync(inst, data, params)),
            (inst.refine = (check, params) => inst.check(refine(check, params))),
            (inst.superRefine = (refinement) => inst.check(superRefine(refinement))),
            (inst.overwrite = (fn) => inst.check(v4_core.bS9(fn))),
            (inst.optional = () => optional(inst)),
            (inst.nullable = () => nullable(inst)),
            (inst.nullish = () => optional(nullable(inst))),
            (inst.nonoptional = (params) => nonoptional(inst, params)),
            (inst.array = () => array(inst)),
            (inst.or = (arg) => union([inst, arg])),
            (inst.and = (arg) => intersection(inst, arg)),
            (inst.transform = (tx) => pipe(inst, transform(tx))),
            (inst.default = (def) => _default(inst, def)),
            (inst.prefault = (def) => prefault(inst, def)),
            (inst.catch = (params) => _catch(inst, params)),
            (inst.pipe = (target) => pipe(inst, target)),
            (inst.readonly = () => readonly(inst)),
            (inst.describe = (description) => {
              const cl = inst.clone();
              return (v4_core.fd.add(cl, { description }), cl);
            }),
            Object.defineProperty(inst, 'description', {
              get: () => v4_core.fd.get(inst)?.description,
              configurable: !0,
            }),
            (inst.meta = (...args) => {
              if (0 === args.length) return v4_core.fd.get(inst);
              const cl = inst.clone();
              return (v4_core.fd.add(cl, args[0]), cl);
            }),
            (inst.isOptional = () => inst.safeParse(void 0).success),
            (inst.isNullable = () => inst.safeParse(null).success),
            inst
          )
        ),
        _ZodString = v4_core.xIx('_ZodString', (inst, def) => {
          (v4_core.$vM.init(inst, def),
            ZodType.init(inst, def),
            (inst._zod.processJSONSchema = (ctx, json, params) =>
              json_schema_processors.SW(inst, ctx, json, params)));
          const bag = inst._zod.bag;
          ((inst.format = bag.format ?? null),
            (inst.minLength = bag.minimum ?? null),
            (inst.maxLength = bag.maximum ?? null),
            (inst.regex = (...args) => inst.check(v4_core.Fkv(...args))),
            (inst.includes = (...args) => inst.check(v4_core.dRF(...args))),
            (inst.startsWith = (...args) => inst.check(v4_core.$S2(...args))),
            (inst.endsWith = (...args) => inst.check(v4_core.ERr(...args))),
            (inst.min = (...args) => inst.check(v4_core.m9B(...args))),
            (inst.max = (...args) => inst.check(v4_core.Ebs(...args))),
            (inst.length = (...args) => inst.check(v4_core.YAm(...args))),
            (inst.nonempty = (...args) => inst.check(v4_core.m9B(1, ...args))),
            (inst.lowercase = (params) => inst.check(v4_core.hH9(params))),
            (inst.uppercase = (params) => inst.check(v4_core.qFb(params))),
            (inst.trim = () => inst.check(v4_core.WN0())),
            (inst.normalize = (...args) => inst.check(v4_core.loG(...args))),
            (inst.toLowerCase = () => inst.check(v4_core.Ilv())),
            (inst.toUpperCase = () => inst.check(v4_core.xYx())),
            (inst.slugify = () => inst.check(v4_core.TLt())));
        }),
        ZodString = v4_core.xIx('ZodString', (inst, def) => {
          (v4_core.$vM.init(inst, def),
            _ZodString.init(inst, def),
            (inst.email = (params) => inst.check(v4_core.Mue(ZodEmail, params))),
            (inst.url = (params) => inst.check(v4_core.Fnx(ZodURL, params))),
            (inst.jwt = (params) => inst.check(v4_core.rkn(ZodJWT, params))),
            (inst.emoji = (params) => inst.check(v4_core.aCo(ZodEmoji, params))),
            (inst.guid = (params) => inst.check(v4_core.tB6(ZodGUID, params))),
            (inst.uuid = (params) => inst.check(v4_core.Bem(ZodUUID, params))),
            (inst.uuidv4 = (params) => inst.check(v4_core.nA(ZodUUID, params))),
            (inst.uuidv6 = (params) => inst.check(v4_core.pYI(ZodUUID, params))),
            (inst.uuidv7 = (params) => inst.check(v4_core.wAW(ZodUUID, params))),
            (inst.nanoid = (params) => inst.check(v4_core.Dl9(ZodNanoID, params))),
            (inst.guid = (params) => inst.check(v4_core.tB6(ZodGUID, params))),
            (inst.cuid = (params) => inst.check(v4_core.fsu(ZodCUID, params))),
            (inst.cuid2 = (params) => inst.check(v4_core.BjO(ZodCUID2, params))),
            (inst.ulid = (params) => inst.check(v4_core.CtB(ZodULID, params))),
            (inst.base64 = (params) => inst.check(v4_core.rty(ZodBase64, params))),
            (inst.base64url = (params) => inst.check(v4_core.cUp(ZodBase64URL, params))),
            (inst.xid = (params) => inst.check(v4_core.Pwh(ZodXID, params))),
            (inst.ksuid = (params) => inst.check(v4_core._zn(ZodKSUID, params))),
            (inst.ipv4 = (params) => inst.check(v4_core.NyF(ZodIPv4, params))),
            (inst.ipv6 = (params) => inst.check(v4_core.$O6(ZodIPv6, params))),
            (inst.cidrv4 = (params) => inst.check(v4_core.UyX(ZodCIDRv4, params))),
            (inst.cidrv6 = (params) => inst.check(v4_core.gPm(ZodCIDRv6, params))),
            (inst.e164 = (params) => inst.check(v4_core.KBX(ZodE164, params))),
            (inst.datetime = (params) => inst.check(datetime(params))),
            (inst.date = (params) => inst.check(date(params))),
            (inst.time = (params) => inst.check(time(params))),
            (inst.duration = (params) => inst.check(duration(params))));
        });
      function string(params) {
        return v4_core.Rle(ZodString, params);
      }
      const ZodStringFormat = v4_core.xIx('ZodStringFormat', (inst, def) => {
          (v4_core.EYA.init(inst, def), _ZodString.init(inst, def));
        }),
        ZodEmail = v4_core.xIx('ZodEmail', (inst, def) => {
          (v4_core.qGO.init(inst, def), ZodStringFormat.init(inst, def));
        });
      function email(params) {
        return v4_core.Mue(ZodEmail, params);
      }
      const ZodGUID = v4_core.xIx('ZodGUID', (inst, def) => {
        (v4_core.Zc9.init(inst, def), ZodStringFormat.init(inst, def));
      });
      function guid(params) {
        return v4_core.tB6(ZodGUID, params);
      }
      const ZodUUID = v4_core.xIx('ZodUUID', (inst, def) => {
        (v4_core.Znh.init(inst, def), ZodStringFormat.init(inst, def));
      });
      function uuid(params) {
        return v4_core.Bem(ZodUUID, params);
      }
      function uuidv4(params) {
        return v4_core.nA(ZodUUID, params);
      }
      function uuidv6(params) {
        return v4_core.pYI(ZodUUID, params);
      }
      function uuidv7(params) {
        return v4_core.wAW(ZodUUID, params);
      }
      const ZodURL = v4_core.xIx('ZodURL', (inst, def) => {
        (v4_core.VYh.init(inst, def), ZodStringFormat.init(inst, def));
      });
      function url(params) {
        return v4_core.Fnx(ZodURL, params);
      }
      function httpUrl(params) {
        return v4_core.Fnx(ZodURL, {
          protocol: /^https?$/,
          hostname: v4_core.A$I.domain,
          ...v4_core.ZSL.normalizeParams(params),
        });
      }
      const ZodEmoji = v4_core.xIx('ZodEmoji', (inst, def) => {
        (v4_core.cG4.init(inst, def), ZodStringFormat.init(inst, def));
      });
      function emoji(params) {
        return v4_core.aCo(ZodEmoji, params);
      }
      const ZodNanoID = v4_core.xIx('ZodNanoID', (inst, def) => {
        (v4_core.Pyd.init(inst, def), ZodStringFormat.init(inst, def));
      });
      function nanoid(params) {
        return v4_core.Dl9(ZodNanoID, params);
      }
      const ZodCUID = v4_core.xIx('ZodCUID', (inst, def) => {
        (v4_core.bl8.init(inst, def), ZodStringFormat.init(inst, def));
      });
      function cuid(params) {
        return v4_core.fsu(ZodCUID, params);
      }
      const ZodCUID2 = v4_core.xIx('ZodCUID2', (inst, def) => {
        (v4_core.Zu1.init(inst, def), ZodStringFormat.init(inst, def));
      });
      function cuid2(params) {
        return v4_core.BjO(ZodCUID2, params);
      }
      const ZodULID = v4_core.xIx('ZodULID', (inst, def) => {
        (v4_core.g5t.init(inst, def), ZodStringFormat.init(inst, def));
      });
      function ulid(params) {
        return v4_core.CtB(ZodULID, params);
      }
      const ZodXID = v4_core.xIx('ZodXID', (inst, def) => {
        (v4_core.TFq.init(inst, def), ZodStringFormat.init(inst, def));
      });
      function xid(params) {
        return v4_core.Pwh(ZodXID, params);
      }
      const ZodKSUID = v4_core.xIx('ZodKSUID', (inst, def) => {
        (v4_core.GYt.init(inst, def), ZodStringFormat.init(inst, def));
      });
      function ksuid(params) {
        return v4_core._zn(ZodKSUID, params);
      }
      const ZodIPv4 = v4_core.xIx('ZodIPv4', (inst, def) => {
        (v4_core.Lc$.init(inst, def), ZodStringFormat.init(inst, def));
      });
      function ipv4(params) {
        return v4_core.NyF(ZodIPv4, params);
      }
      const ZodMAC = v4_core.xIx('ZodMAC', (inst, def) => {
        (v4_core.rOG.init(inst, def), ZodStringFormat.init(inst, def));
      });
      function mac(params) {
        return v4_core.R8V(ZodMAC, params);
      }
      const ZodIPv6 = v4_core.xIx('ZodIPv6', (inst, def) => {
        (v4_core.ZyE.init(inst, def), ZodStringFormat.init(inst, def));
      });
      function ipv6(params) {
        return v4_core.$O6(ZodIPv6, params);
      }
      const ZodCIDRv4 = v4_core.xIx('ZodCIDRv4', (inst, def) => {
        (v4_core.CI7.init(inst, def), ZodStringFormat.init(inst, def));
      });
      function cidrv4(params) {
        return v4_core.UyX(ZodCIDRv4, params);
      }
      const ZodCIDRv6 = v4_core.xIx('ZodCIDRv6', (inst, def) => {
        (v4_core.CnV.init(inst, def), ZodStringFormat.init(inst, def));
      });
      function cidrv6(params) {
        return v4_core.gPm(ZodCIDRv6, params);
      }
      const ZodBase64 = v4_core.xIx('ZodBase64', (inst, def) => {
        (v4_core.Dqv.init(inst, def), ZodStringFormat.init(inst, def));
      });
      function base64(params) {
        return v4_core.rty(ZodBase64, params);
      }
      const ZodBase64URL = v4_core.xIx('ZodBase64URL', (inst, def) => {
        (v4_core.CQL.init(inst, def), ZodStringFormat.init(inst, def));
      });
      function base64url(params) {
        return v4_core.cUp(ZodBase64URL, params);
      }
      const ZodE164 = v4_core.xIx('ZodE164', (inst, def) => {
        (v4_core.Oyg.init(inst, def), ZodStringFormat.init(inst, def));
      });
      function e164(params) {
        return v4_core.KBX(ZodE164, params);
      }
      const ZodJWT = v4_core.xIx('ZodJWT', (inst, def) => {
        (v4_core.h80.init(inst, def), ZodStringFormat.init(inst, def));
      });
      function jwt(params) {
        return v4_core.rkn(ZodJWT, params);
      }
      const ZodCustomStringFormat = v4_core.xIx('ZodCustomStringFormat', (inst, def) => {
        (v4_core.ZQQ.init(inst, def), ZodStringFormat.init(inst, def));
      });
      function stringFormat(format, fnOrRegex, _params = {}) {
        return v4_core.Af7(ZodCustomStringFormat, format, fnOrRegex, _params);
      }
      function hostname(_params) {
        return v4_core.Af7(ZodCustomStringFormat, 'hostname', v4_core.A$I.hostname, _params);
      }
      function hex(_params) {
        return v4_core.Af7(ZodCustomStringFormat, 'hex', v4_core.A$I.hex, _params);
      }
      function hash(alg, params) {
        const format = `${alg}_${params?.enc ?? 'hex'}`,
          regex = v4_core.A$I[format];
        if (!regex) throw new Error(`Unrecognized hash format: ${format}`);
        return v4_core.Af7(ZodCustomStringFormat, format, regex, params);
      }
      const ZodNumber = v4_core.xIx('ZodNumber', (inst, def) => {
        (v4_core.vzu.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.Wg(inst, ctx, json, params)),
          (inst.gt = (value, params) => inst.check(v4_core.TxR(value, params))),
          (inst.gte = (value, params) => inst.check(v4_core.qmM(value, params))),
          (inst.min = (value, params) => inst.check(v4_core.qmM(value, params))),
          (inst.lt = (value, params) => inst.check(v4_core.AuJ(value, params))),
          (inst.lte = (value, params) => inst.check(v4_core.Zm2(value, params))),
          (inst.max = (value, params) => inst.check(v4_core.Zm2(value, params))),
          (inst.int = (params) => inst.check(schemas_int(params))),
          (inst.safe = (params) => inst.check(schemas_int(params))),
          (inst.positive = (params) => inst.check(v4_core.TxR(0, params))),
          (inst.nonnegative = (params) => inst.check(v4_core.qmM(0, params))),
          (inst.negative = (params) => inst.check(v4_core.AuJ(0, params))),
          (inst.nonpositive = (params) => inst.check(v4_core.Zm2(0, params))),
          (inst.multipleOf = (value, params) => inst.check(v4_core.HiR(value, params))),
          (inst.step = (value, params) => inst.check(v4_core.HiR(value, params))),
          (inst.finite = () => inst));
        const bag = inst._zod.bag;
        ((inst.minValue =
          Math.max(
            bag.minimum ?? Number.NEGATIVE_INFINITY,
            bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY
          ) ?? null),
          (inst.maxValue =
            Math.min(
              bag.maximum ?? Number.POSITIVE_INFINITY,
              bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY
            ) ?? null),
          (inst.isInt =
            (bag.format ?? '').includes('int') || Number.isSafeInteger(bag.multipleOf ?? 0.5)),
          (inst.isFinite = !0),
          (inst.format = bag.format ?? null));
      });
      function number(params) {
        return v4_core.F7R(ZodNumber, params);
      }
      const ZodNumberFormat = v4_core.xIx('ZodNumberFormat', (inst, def) => {
        (v4_core.Iab.init(inst, def), ZodNumber.init(inst, def));
      });
      function schemas_int(params) {
        return v4_core.LKT(ZodNumberFormat, params);
      }
      function float32(params) {
        return v4_core.HLV(ZodNumberFormat, params);
      }
      function float64(params) {
        return v4_core.g6z(ZodNumberFormat, params);
      }
      function int32(params) {
        return v4_core.swT(ZodNumberFormat, params);
      }
      function uint32(params) {
        return v4_core.Pay(ZodNumberFormat, params);
      }
      const ZodBoolean = v4_core.xIx('ZodBoolean', (inst, def) => {
        (v4_core.sFi.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.dO(inst, ctx, json, params)));
      });
      function schemas_boolean(params) {
        return v4_core._Le(ZodBoolean, params);
      }
      const ZodBigInt = v4_core.xIx('ZodBigInt', (inst, def) => {
        (v4_core.BNI.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.Y8(inst, ctx, json, params)),
          (inst.gte = (value, params) => inst.check(v4_core.qmM(value, params))),
          (inst.min = (value, params) => inst.check(v4_core.qmM(value, params))),
          (inst.gt = (value, params) => inst.check(v4_core.TxR(value, params))),
          (inst.gte = (value, params) => inst.check(v4_core.qmM(value, params))),
          (inst.min = (value, params) => inst.check(v4_core.qmM(value, params))),
          (inst.lt = (value, params) => inst.check(v4_core.AuJ(value, params))),
          (inst.lte = (value, params) => inst.check(v4_core.Zm2(value, params))),
          (inst.max = (value, params) => inst.check(v4_core.Zm2(value, params))),
          (inst.positive = (params) => inst.check(v4_core.TxR(BigInt(0), params))),
          (inst.negative = (params) => inst.check(v4_core.AuJ(BigInt(0), params))),
          (inst.nonpositive = (params) => inst.check(v4_core.Zm2(BigInt(0), params))),
          (inst.nonnegative = (params) => inst.check(v4_core.qmM(BigInt(0), params))),
          (inst.multipleOf = (value, params) => inst.check(v4_core.HiR(value, params))));
        const bag = inst._zod.bag;
        ((inst.minValue = bag.minimum ?? null),
          (inst.maxValue = bag.maximum ?? null),
          (inst.format = bag.format ?? null));
      });
      function bigint(params) {
        return v4_core.z$y(ZodBigInt, params);
      }
      const ZodBigIntFormat = v4_core.xIx('ZodBigIntFormat', (inst, def) => {
        (v4_core.ITd.init(inst, def), ZodBigInt.init(inst, def));
      });
      function int64(params) {
        return v4_core.Jg2(ZodBigIntFormat, params);
      }
      function uint64(params) {
        return v4_core.ii$(ZodBigIntFormat, params);
      }
      const ZodSymbol = v4_core.xIx('ZodSymbol', (inst, def) => {
        (v4_core.U5g.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.fg(inst, ctx, json, params)));
      });
      function symbol(params) {
        return v4_core.W7i(ZodSymbol, params);
      }
      const ZodUndefined = v4_core.xIx('ZodUndefined', (inst, def) => {
        (v4_core.Mvl.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.BU(inst, ctx, json, params)));
      });
      function _undefined(params) {
        return v4_core.E4e(ZodUndefined, params);
      }
      const ZodNull = v4_core.xIx('ZodNull', (inst, def) => {
        (v4_core.x89.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.In(inst, ctx, json, params)));
      });
      function _null(params) {
        return v4_core.jwX(ZodNull, params);
      }
      const ZodAny = v4_core.xIx('ZodAny', (inst, def) => {
        (v4_core.Gb0.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.NX(inst, ctx, json, params)));
      });
      function any() {
        return v4_core.KA8(ZodAny);
      }
      const ZodUnknown = v4_core.xIx('ZodUnknown', (inst, def) => {
        (v4_core.GPR.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.NV(inst, ctx, json, params)));
      });
      function unknown() {
        return v4_core.emL(ZodUnknown);
      }
      const ZodNever = v4_core.xIx('ZodNever', (inst, def) => {
        (v4_core.Umr.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.RH(inst, ctx, json, params)));
      });
      function never(params) {
        return v4_core.G8g(ZodNever, params);
      }
      const ZodVoid = v4_core.xIx('ZodVoid', (inst, def) => {
        (v4_core.WHP.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.vn(inst, ctx, json, params)));
      });
      function _void(params) {
        return v4_core.OCf(ZodVoid, params);
      }
      const ZodDate = v4_core.xIx('ZodDate', (inst, def) => {
        (v4_core.o5y.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.Fl(inst, ctx, json, params)),
          (inst.min = (value, params) => inst.check(v4_core.qmM(value, params))),
          (inst.max = (value, params) => inst.check(v4_core.Zm2(value, params))));
        const c = inst._zod.bag;
        ((inst.minDate = c.minimum ? new Date(c.minimum) : null),
          (inst.maxDate = c.maximum ? new Date(c.maximum) : null));
      });
      function schemas_date(params) {
        return v4_core.YY6(ZodDate, params);
      }
      const ZodArray = v4_core.xIx('ZodArray', (inst, def) => {
        (v4_core.$ps.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.cY(inst, ctx, json, params)),
          (inst.element = def.element),
          (inst.min = (minLength, params) => inst.check(v4_core.m9B(minLength, params))),
          (inst.nonempty = (params) => inst.check(v4_core.m9B(1, params))),
          (inst.max = (maxLength, params) => inst.check(v4_core.Ebs(maxLength, params))),
          (inst.length = (len, params) => inst.check(v4_core.YAm(len, params))),
          (inst.unwrap = () => inst.element));
      });
      function array(element, params) {
        return v4_core.dZg(ZodArray, element, params);
      }
      function keyof(schema) {
        const shape = schema._zod.def.shape;
        return _enum(Object.keys(shape));
      }
      const ZodObject = v4_core.xIx('ZodObject', (inst, def) => {
        (v4_core.waU.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.Ec(inst, ctx, json, params)),
          v4_core.ZSL.defineLazy(inst, 'shape', () => def.shape),
          (inst.keyof = () => _enum(Object.keys(inst._zod.def.shape))),
          (inst.catchall = (catchall) => inst.clone({ ...inst._zod.def, catchall })),
          (inst.passthrough = () => inst.clone({ ...inst._zod.def, catchall: unknown() })),
          (inst.loose = () => inst.clone({ ...inst._zod.def, catchall: unknown() })),
          (inst.strict = () => inst.clone({ ...inst._zod.def, catchall: never() })),
          (inst.strip = () => inst.clone({ ...inst._zod.def, catchall: void 0 })),
          (inst.extend = (incoming) => v4_core.ZSL.extend(inst, incoming)),
          (inst.safeExtend = (incoming) => v4_core.ZSL.safeExtend(inst, incoming)),
          (inst.merge = (other) => v4_core.ZSL.merge(inst, other)),
          (inst.pick = (mask) => v4_core.ZSL.pick(inst, mask)),
          (inst.omit = (mask) => v4_core.ZSL.omit(inst, mask)),
          (inst.partial = (...args) => v4_core.ZSL.partial(ZodOptional, inst, args[0])),
          (inst.required = (...args) => v4_core.ZSL.required(ZodNonOptional, inst, args[0])));
      });
      function object(shape, params) {
        const def = { type: 'object', shape: shape ?? {}, ...v4_core.ZSL.normalizeParams(params) };
        return new ZodObject(def);
      }
      function strictObject(shape, params) {
        return new ZodObject({
          type: 'object',
          shape,
          catchall: never(),
          ...v4_core.ZSL.normalizeParams(params),
        });
      }
      function looseObject(shape, params) {
        return new ZodObject({
          type: 'object',
          shape,
          catchall: unknown(),
          ...v4_core.ZSL.normalizeParams(params),
        });
      }
      const ZodUnion = v4_core.xIx('ZodUnion', (inst, def) => {
        (v4_core.L8w.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.iC(inst, ctx, json, params)),
          (inst.options = def.options));
      });
      function union(options, params) {
        return new ZodUnion({ type: 'union', options, ...v4_core.ZSL.normalizeParams(params) });
      }
      const ZodXor = v4_core.xIx('ZodXor', (inst, def) => {
        (ZodUnion.init(inst, def),
          v4_core.pm8.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.iC(inst, ctx, json, params)),
          (inst.options = def.options));
      });
      function xor(options, params) {
        return new ZodXor({
          type: 'union',
          options,
          inclusive: !1,
          ...v4_core.ZSL.normalizeParams(params),
        });
      }
      const ZodDiscriminatedUnion = v4_core.xIx('ZodDiscriminatedUnion', (inst, def) => {
        (ZodUnion.init(inst, def), v4_core.P0p.init(inst, def));
      });
      function discriminatedUnion(discriminator, options, params) {
        return new ZodDiscriminatedUnion({
          type: 'union',
          options,
          discriminator,
          ...v4_core.ZSL.normalizeParams(params),
        });
      }
      const ZodIntersection = v4_core.xIx('ZodIntersection', (inst, def) => {
        (v4_core.LJA.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.i_(inst, ctx, json, params)));
      });
      function intersection(left, right) {
        return new ZodIntersection({ type: 'intersection', left, right });
      }
      const ZodTuple = v4_core.xIx('ZodTuple', (inst, def) => {
        (v4_core.G3x.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.CN(inst, ctx, json, params)),
          (inst.rest = (rest) => inst.clone({ ...inst._zod.def, rest })));
      });
      function tuple(items, _paramsOrRest, _params) {
        const hasRest = _paramsOrRest instanceof v4_core.W4S,
          params = hasRest ? _params : _paramsOrRest;
        return new ZodTuple({
          type: 'tuple',
          items,
          rest: hasRest ? _paramsOrRest : null,
          ...v4_core.ZSL.normalizeParams(params),
        });
      }
      const ZodRecord = v4_core.xIx('ZodRecord', (inst, def) => {
        (v4_core.hax.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.GC(inst, ctx, json, params)),
          (inst.keyType = def.keyType),
          (inst.valueType = def.valueType));
      });
      function record(keyType, valueType, params) {
        return new ZodRecord({
          type: 'record',
          keyType,
          valueType,
          ...v4_core.ZSL.normalizeParams(params),
        });
      }
      function partialRecord(keyType, valueType, params) {
        const k = v4_core.o8B(keyType);
        return (
          (k._zod.values = void 0),
          new ZodRecord({
            type: 'record',
            keyType: k,
            valueType,
            ...v4_core.ZSL.normalizeParams(params),
          })
        );
      }
      function looseRecord(keyType, valueType, params) {
        return new ZodRecord({
          type: 'record',
          keyType,
          valueType,
          mode: 'loose',
          ...v4_core.ZSL.normalizeParams(params),
        });
      }
      const ZodMap = v4_core.xIx('ZodMap', (inst, def) => {
        (v4_core.eb8.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.jq(inst, ctx, json, params)),
          (inst.keyType = def.keyType),
          (inst.valueType = def.valueType));
      });
      function map(keyType, valueType, params) {
        return new ZodMap({
          type: 'map',
          keyType,
          valueType,
          ...v4_core.ZSL.normalizeParams(params),
        });
      }
      const ZodSet = v4_core.xIx('ZodSet', (inst, def) => {
        (v4_core.Oie.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.zH(inst, ctx, json, params)),
          (inst.min = (...args) => inst.check(v4_core.Ndf(...args))),
          (inst.nonempty = (params) => inst.check(v4_core.Ndf(1, params))),
          (inst.max = (...args) => inst.check(v4_core.vL7(...args))),
          (inst.size = (...args) => inst.check(v4_core.d$Q(...args))));
      });
      function set(valueType, params) {
        return new ZodSet({ type: 'set', valueType, ...v4_core.ZSL.normalizeParams(params) });
      }
      const ZodEnum = v4_core.xIx('ZodEnum', (inst, def) => {
        (v4_core.VOE.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.C0(inst, ctx, json, params)),
          (inst.enum = def.entries),
          (inst.options = Object.values(def.entries)));
        const keys = new Set(Object.keys(def.entries));
        ((inst.extract = (values, params) => {
          const newEntries = {};
          for (const value of values) {
            if (!keys.has(value)) throw new Error(`Key ${value} not found in enum`);
            newEntries[value] = def.entries[value];
          }
          return new ZodEnum({
            ...def,
            checks: [],
            ...v4_core.ZSL.normalizeParams(params),
            entries: newEntries,
          });
        }),
          (inst.exclude = (values, params) => {
            const newEntries = { ...def.entries };
            for (const value of values) {
              if (!keys.has(value)) throw new Error(`Key ${value} not found in enum`);
              delete newEntries[value];
            }
            return new ZodEnum({
              ...def,
              checks: [],
              ...v4_core.ZSL.normalizeParams(params),
              entries: newEntries,
            });
          }));
      });
      function _enum(values, params) {
        const entries = Array.isArray(values)
          ? Object.fromEntries(values.map((v) => [v, v]))
          : values;
        return new ZodEnum({ type: 'enum', entries, ...v4_core.ZSL.normalizeParams(params) });
      }
      function nativeEnum(entries, params) {
        return new ZodEnum({ type: 'enum', entries, ...v4_core.ZSL.normalizeParams(params) });
      }
      const ZodLiteral = v4_core.xIx('ZodLiteral', (inst, def) => {
        (v4_core.nuC.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.Yv(inst, ctx, json, params)),
          (inst.values = new Set(def.values)),
          Object.defineProperty(inst, 'value', {
            get() {
              if (def.values.length > 1)
                throw new Error(
                  'This schema contains multiple valid literal values. Use `.values` instead.'
                );
              return def.values[0];
            },
          }));
      });
      function literal(value, params) {
        return new ZodLiteral({
          type: 'literal',
          values: Array.isArray(value) ? value : [value],
          ...v4_core.ZSL.normalizeParams(params),
        });
      }
      const ZodFile = v4_core.xIx('ZodFile', (inst, def) => {
        (v4_core.CTp.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.H1(inst, ctx, json, params)),
          (inst.min = (size, params) => inst.check(v4_core.Ndf(size, params))),
          (inst.max = (size, params) => inst.check(v4_core.vL7(size, params))),
          (inst.mime = (types, params) =>
            inst.check(v4_core.GZZ(Array.isArray(types) ? types : [types], params))));
      });
      function file(params) {
        return v4_core.K2(ZodFile, params);
      }
      const ZodTransform = v4_core.xIx('ZodTransform', (inst, def) => {
        (v4_core.Wc_.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.xi(inst, ctx, json, params)),
          (inst._zod.parse = (payload, _ctx) => {
            if ('backward' === _ctx.direction) throw new v4_core.cV1(inst.constructor.name);
            payload.addIssue = (issue) => {
              if ('string' == typeof issue)
                payload.issues.push(v4_core.ZSL.issue(issue, payload.value, def));
              else {
                const _issue = issue;
                (_issue.fatal && (_issue.continue = !1),
                  _issue.code ?? (_issue.code = 'custom'),
                  _issue.input ?? (_issue.input = payload.value),
                  _issue.inst ?? (_issue.inst = inst),
                  payload.issues.push(v4_core.ZSL.issue(_issue)));
              }
            };
            const output = def.transform(payload.value, payload);
            return output instanceof Promise
              ? output.then((output) => ((payload.value = output), payload))
              : ((payload.value = output), payload);
          }));
      });
      function transform(fn) {
        return new ZodTransform({ type: 'transform', transform: fn });
      }
      const ZodOptional = v4_core.xIx('ZodOptional', (inst, def) => {
        (v4_core.igI.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.$k(inst, ctx, json, params)),
          (inst.unwrap = () => inst._zod.def.innerType));
      });
      function optional(innerType) {
        return new ZodOptional({ type: 'optional', innerType });
      }
      const ZodNullable = v4_core.xIx('ZodNullable', (inst, def) => {
        (v4_core.ZQr.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.yq(inst, ctx, json, params)),
          (inst.unwrap = () => inst._zod.def.innerType));
      });
      function nullable(innerType) {
        return new ZodNullable({ type: 'nullable', innerType });
      }
      function nullish(innerType) {
        return optional(nullable(innerType));
      }
      const ZodDefault = v4_core.xIx('ZodDefault', (inst, def) => {
        (v4_core.rvF.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.mh(inst, ctx, json, params)),
          (inst.unwrap = () => inst._zod.def.innerType),
          (inst.removeDefault = inst.unwrap));
      });
      function _default(innerType, defaultValue) {
        return new ZodDefault({
          type: 'default',
          innerType,
          get defaultValue() {
            return 'function' == typeof defaultValue
              ? defaultValue()
              : v4_core.ZSL.shallowClone(defaultValue);
          },
        });
      }
      const ZodPrefault = v4_core.xIx('ZodPrefault', (inst, def) => {
        (v4_core.VFw.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.A(inst, ctx, json, params)),
          (inst.unwrap = () => inst._zod.def.innerType));
      });
      function prefault(innerType, defaultValue) {
        return new ZodPrefault({
          type: 'prefault',
          innerType,
          get defaultValue() {
            return 'function' == typeof defaultValue
              ? defaultValue()
              : v4_core.ZSL.shallowClone(defaultValue);
          },
        });
      }
      const ZodNonOptional = v4_core.xIx('ZodNonOptional', (inst, def) => {
        (v4_core.N$X.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.cR(inst, ctx, json, params)),
          (inst.unwrap = () => inst._zod.def.innerType));
      });
      function nonoptional(innerType, params) {
        return new ZodNonOptional({
          type: 'nonoptional',
          innerType,
          ...v4_core.ZSL.normalizeParams(params),
        });
      }
      const ZodSuccess = v4_core.xIx('ZodSuccess', (inst, def) => {
        (v4_core.Dws.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.aw(inst, ctx, json, params)),
          (inst.unwrap = () => inst._zod.def.innerType));
      });
      function success(innerType) {
        return new ZodSuccess({ type: 'success', innerType });
      }
      const ZodCatch = v4_core.xIx('ZodCatch', (inst, def) => {
        (v4_core.t$E.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.Q9(inst, ctx, json, params)),
          (inst.unwrap = () => inst._zod.def.innerType),
          (inst.removeCatch = inst.unwrap));
      });
      function _catch(innerType, catchValue) {
        return new ZodCatch({
          type: 'catch',
          innerType,
          catchValue: 'function' == typeof catchValue ? catchValue : () => catchValue,
        });
      }
      const ZodNaN = v4_core.xIx('ZodNaN', (inst, def) => {
        (v4_core.zPy.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.Kj(inst, ctx, json, params)));
      });
      function nan(params) {
        return v4_core.L4d(ZodNaN, params);
      }
      const ZodPipe = v4_core.xIx('ZodPipe', (inst, def) => {
        (v4_core._mk.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.fs(inst, ctx, json, params)),
          (inst.in = def.in),
          (inst.out = def.out));
      });
      function pipe(in_, out) {
        return new ZodPipe({ type: 'pipe', in: in_, out });
      }
      const ZodCodec = v4_core.xIx('ZodCodec', (inst, def) => {
        (ZodPipe.init(inst, def), v4_core.YYK.init(inst, def));
      });
      function codec(in_, out, params) {
        return new ZodCodec({
          type: 'pipe',
          in: in_,
          out,
          transform: params.decode,
          reverseTransform: params.encode,
        });
      }
      const ZodReadonly = v4_core.xIx('ZodReadonly', (inst, def) => {
        (v4_core.Sbs.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.$X(inst, ctx, json, params)),
          (inst.unwrap = () => inst._zod.def.innerType));
      });
      function readonly(innerType) {
        return new ZodReadonly({ type: 'readonly', innerType });
      }
      const ZodTemplateLiteral = v4_core.xIx('ZodTemplateLiteral', (inst, def) => {
        (v4_core.da_.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.Cv(inst, ctx, json, params)));
      });
      function templateLiteral(parts, params) {
        return new ZodTemplateLiteral({
          type: 'template_literal',
          parts,
          ...v4_core.ZSL.normalizeParams(params),
        });
      }
      const ZodLazy = v4_core.xIx('ZodLazy', (inst, def) => {
        (v4_core.kU.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.Tr(inst, ctx, json, params)),
          (inst.unwrap = () => inst._zod.def.getter()));
      });
      function lazy(getter) {
        return new ZodLazy({ type: 'lazy', getter });
      }
      const ZodPromise = v4_core.xIx('ZodPromise', (inst, def) => {
        (v4_core.hAA.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.CX(inst, ctx, json, params)),
          (inst.unwrap = () => inst._zod.def.innerType));
      });
      function promise(innerType) {
        return new ZodPromise({ type: 'promise', innerType });
      }
      const ZodFunction = v4_core.xIx('ZodFunction', (inst, def) => {
        (v4_core._AQ.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.bq(inst, ctx, json, params)));
      });
      function _function(params) {
        return new ZodFunction({
          type: 'function',
          input: Array.isArray(params?.input)
            ? tuple(params?.input)
            : (params?.input ?? array(unknown())),
          output: params?.output ?? unknown(),
        });
      }
      const ZodCustom = v4_core.xIx('ZodCustom', (inst, def) => {
        (v4_core.b03.init(inst, def),
          ZodType.init(inst, def),
          (inst._zod.processJSONSchema = (ctx, json, params) =>
            json_schema_processors.A6(inst, ctx, json, params)));
      });
      function check(fn) {
        const ch = new v4_core.QPK({ check: 'custom' });
        return ((ch._zod.check = fn), ch);
      }
      function custom(fn, _params) {
        return v4_core.FOv(ZodCustom, fn ?? (() => !0), _params);
      }
      function refine(fn, _params = {}) {
        return v4_core.fUZ(ZodCustom, fn, _params);
      }
      function superRefine(fn) {
        return v4_core.MBo(fn);
      }
      const describe = v4_core.q0y,
        meta = v4_core.mIj;
      function _instanceof(cls, params = { error: `Input not instance of ${cls.name}` }) {
        const inst = new ZodCustom({
          type: 'custom',
          check: 'custom',
          fn: (data) => data instanceof cls,
          abort: !0,
          ...v4_core.ZSL.normalizeParams(params),
        });
        return ((inst._zod.bag.Class = cls), inst);
      }
      const stringbool = (...args) =>
        v4_core.fIQ({ Codec: ZodCodec, Boolean: ZodBoolean, String: ZodString }, ...args);
      function json(params) {
        const jsonSchema = lazy(() =>
          union([
            string(params),
            number(),
            schemas_boolean(),
            _null(),
            array(jsonSchema),
            record(string(), jsonSchema),
          ])
        );
        return jsonSchema;
      }
      function preprocess(fn, schema) {
        return pipe(transform(fn), schema);
      }
      var ZodFirstPartyTypeKind;
      ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {});
      var en = __webpack_require__('./node_modules/zod/v4/locales/en.js');
      __webpack_require__('./node_modules/zod/v4/locales/index.js');
      (0, v4_core.$WB)((0, en.A)());
    },
    './node_modules/zod/v4/core/index.js'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        Gb0: () => $ZodAny,
        $ps: () => $ZodArray,
        Dqv: () => $ZodBase64,
        CQL: () => $ZodBase64URL,
        BNI: () => $ZodBigInt,
        ITd: () => $ZodBigIntFormat,
        sFi: () => $ZodBoolean,
        CI7: () => $ZodCIDRv4,
        CnV: () => $ZodCIDRv6,
        bl8: () => $ZodCUID,
        Zu1: () => $ZodCUID2,
        t$E: () => $ZodCatch,
        QPK: () => $ZodCheck,
        YYK: () => $ZodCodec,
        b03: () => $ZodCustom,
        ZQQ: () => $ZodCustomStringFormat,
        o5y: () => $ZodDate,
        rvF: () => $ZodDefault,
        P0p: () => $ZodDiscriminatedUnion,
        Oyg: () => $ZodE164,
        qGO: () => $ZodEmail,
        cG4: () => $ZodEmoji,
        cV1: () => $ZodEncodeError,
        VOE: () => $ZodEnum,
        a$H: () => $ZodError,
        CTp: () => $ZodFile,
        _AQ: () => $ZodFunction,
        Zc9: () => $ZodGUID,
        Lc$: () => $ZodIPv4,
        ZyE: () => $ZodIPv6,
        v1L: () => $ZodISODate,
        KoL: () => $ZodISODateTime,
        $Nv: () => $ZodISODuration,
        Ax8: () => $ZodISOTime,
        LJA: () => $ZodIntersection,
        h80: () => $ZodJWT,
        GYt: () => $ZodKSUID,
        kU: () => $ZodLazy,
        nuC: () => $ZodLiteral,
        rOG: () => $ZodMAC,
        eb8: () => $ZodMap,
        zPy: () => $ZodNaN,
        Pyd: () => $ZodNanoID,
        Umr: () => $ZodNever,
        N$X: () => $ZodNonOptional,
        x89: () => $ZodNull,
        ZQr: () => $ZodNullable,
        vzu: () => $ZodNumber,
        Iab: () => $ZodNumberFormat,
        waU: () => $ZodObjectJIT,
        igI: () => $ZodOptional,
        _mk: () => $ZodPipe,
        VFw: () => $ZodPrefault,
        hAA: () => $ZodPromise,
        Sbs: () => $ZodReadonly,
        hax: () => $ZodRecord,
        Oie: () => $ZodSet,
        $vM: () => $ZodString,
        EYA: () => $ZodStringFormat,
        Dws: () => $ZodSuccess,
        U5g: () => $ZodSymbol,
        da_: () => $ZodTemplateLiteral,
        Wc_: () => $ZodTransform,
        G3x: () => $ZodTuple,
        W4S: () => $ZodType,
        g5t: () => $ZodULID,
        VYh: () => $ZodURL,
        Znh: () => $ZodUUID,
        Mvl: () => $ZodUndefined,
        L8w: () => $ZodUnion,
        GPR: () => $ZodUnknown,
        WHP: () => $ZodVoid,
        TFq: () => $ZodXID,
        pm8: () => $ZodXor,
        xIx: () => $constructor,
        KA8: () => _any,
        dZg: () => _array,
        rty: () => _base64,
        cUp: () => _base64url,
        z$y: () => _bigint,
        _Le: () => _boolean,
        UyX: () => _cidrv4,
        gPm: () => _cidrv6,
        fsu: () => _cuid,
        BjO: () => _cuid2,
        FOv: () => _custom,
        YY6: () => _date,
        e2D: () => _decode,
        or4: () => _decodeAsync,
        KBX: () => _e164,
        Mue: () => _email,
        aCo: () => api_emoji,
        MvX: () => _encode,
        GWO: () => _encodeAsync,
        ERr: () => _endsWith,
        K2: () => _file,
        HLV: () => _float32,
        g6z: () => _float64,
        TxR: () => _gt,
        qmM: () => _gte,
        tB6: () => _guid,
        dRF: () => _includes,
        LKT: () => _int,
        swT: () => _int32,
        Jg2: () => _int64,
        NyF: () => _ipv4,
        $O6: () => _ipv6,
        dbS: () => _isoDate,
        G1$: () => _isoDateTime,
        f25: () => _isoDuration,
        KnZ: () => _isoTime,
        rkn: () => _jwt,
        _zn: () => _ksuid,
        YAm: () => _length,
        hH9: () => _lowercase,
        AuJ: () => _lt,
        Zm2: () => _lte,
        R8V: () => _mac,
        Ebs: () => _maxLength,
        vL7: () => _maxSize,
        GZZ: () => _mime,
        m9B: () => _minLength,
        Ndf: () => _minSize,
        HiR: () => _multipleOf,
        L4d: () => _nan,
        Dl9: () => _nanoid,
        bRU: () => _negative,
        G8g: () => _never,
        UIm: () => _nonnegative,
        ejI: () => _nonpositive,
        loG: () => _normalize,
        jwX: () => api_null,
        F7R: () => _number,
        bS9: () => _overwrite,
        Tjm: () => _parse,
        Rb: () => _parseAsync,
        NCA: () => _positive,
        Jfo: () => _property,
        fUZ: () => _refine,
        Fkv: () => _regex,
        VSu: () => _safeDecode,
        R3: () => _safeDecodeAsync,
        rhe: () => _safeEncode,
        v_W: () => _safeEncodeAsync,
        Ody: () => _safeParse,
        wGr: () => _safeParseAsync,
        d$Q: () => _size,
        TLt: () => _slugify,
        $S2: () => _startsWith,
        Rle: () => _string,
        Af7: () => _stringFormat,
        fIQ: () => _stringbool,
        MBo: () => _superRefine,
        W7i: () => _symbol,
        Ilv: () => _toLowerCase,
        xYx: () => _toUpperCase,
        WN0: () => _trim,
        Pay: () => _uint32,
        ii$: () => _uint64,
        CtB: () => _ulid,
        E4e: () => api_undefined,
        emL: () => _unknown,
        qFb: () => _uppercase,
        Fnx: () => _url,
        Bem: () => _uuid,
        nA: () => _uuidv4,
        pYI: () => _uuidv6,
        wAW: () => _uuidv7,
        OCf: () => _void,
        Pwh: () => _xid,
        o8B: () => core_util.clone,
        $WB: () => config,
        q0y: () => describe,
        JMU: () => flattenError,
        Wk_: () => formatError,
        fd: () => registries.fd,
        mIj: () => meta,
        qgA: () => parse,
        EJS: () => parseAsync,
        A$I: () => regexes_namespaceObject,
        ZSL: () => core_util,
      });
      var regexes_namespaceObject = {};
      (__webpack_require__.r(regexes_namespaceObject),
        __webpack_require__.d(regexes_namespaceObject, {
          base64: () => base64,
          base64url: () => base64url,
          bigint: () => bigint,
          boolean: () => regexes_boolean,
          browserEmail: () => browserEmail,
          cidrv4: () => cidrv4,
          cidrv6: () => cidrv6,
          cuid: () => cuid,
          cuid2: () => cuid2,
          date: () => date,
          datetime: () => datetime,
          domain: () => domain,
          duration: () => duration,
          e164: () => e164,
          email: () => email,
          emoji: () => emoji,
          extendedDuration: () => extendedDuration,
          guid: () => guid,
          hex: () => hex,
          hostname: () => hostname,
          html5Email: () => html5Email,
          idnEmail: () => idnEmail,
          integer: () => integer,
          ipv4: () => ipv4,
          ipv6: () => ipv6,
          ksuid: () => ksuid,
          lowercase: () => lowercase,
          mac: () => mac,
          md5_base64: () => md5_base64,
          md5_base64url: () => md5_base64url,
          md5_hex: () => md5_hex,
          nanoid: () => nanoid,
          null: () => _null,
          number: () => number,
          rfc5322Email: () => rfc5322Email,
          sha1_base64: () => sha1_base64,
          sha1_base64url: () => sha1_base64url,
          sha1_hex: () => sha1_hex,
          sha256_base64: () => sha256_base64,
          sha256_base64url: () => sha256_base64url,
          sha256_hex: () => sha256_hex,
          sha384_base64: () => sha384_base64,
          sha384_base64url: () => sha384_base64url,
          sha384_hex: () => sha384_hex,
          sha512_base64: () => sha512_base64,
          sha512_base64url: () => sha512_base64url,
          sha512_hex: () => sha512_hex,
          string: () => string,
          time: () => time,
          ulid: () => ulid,
          undefined: () => _undefined,
          unicodeEmail: () => unicodeEmail,
          uppercase: () => uppercase,
          uuid: () => uuid,
          uuid4: () => uuid4,
          uuid6: () => uuid6,
          uuid7: () => uuid7,
          xid: () => xid,
        }));
      Object.freeze({ status: 'aborted' });
      function $constructor(name, initializer, params) {
        function init(inst, def) {
          if (
            (inst._zod ||
              Object.defineProperty(inst, '_zod', {
                value: { def, constr: _, traits: new Set() },
                enumerable: !1,
              }),
            inst._zod.traits.has(name))
          )
            return;
          (inst._zod.traits.add(name), initializer(inst, def));
          const proto = _.prototype,
            keys = Object.keys(proto);
          for (let i = 0; i < keys.length; i++) {
            const k = keys[i];
            k in inst || (inst[k] = proto[k].bind(inst));
          }
        }
        const Parent = params?.Parent ?? Object;
        class Definition extends Parent {}
        function _(def) {
          var _a;
          const inst = params?.Parent ? new Definition() : this;
          (init(inst, def), (_a = inst._zod).deferred ?? (_a.deferred = []));
          for (const fn of inst._zod.deferred) fn();
          return inst;
        }
        return (
          Object.defineProperty(Definition, 'name', { value: name }),
          Object.defineProperty(_, 'init', { value: init }),
          Object.defineProperty(_, Symbol.hasInstance, {
            value: (inst) =>
              !!(params?.Parent && inst instanceof params.Parent) || inst?._zod?.traits?.has(name),
          }),
          Object.defineProperty(_, 'name', { value: name }),
          _
        );
      }
      Symbol('zod_brand');
      class $ZodAsyncError extends Error {
        constructor() {
          super('Encountered Promise during synchronous parse. Use .parseAsync() instead.');
        }
      }
      class $ZodEncodeError extends Error {
        constructor(name) {
          (super(`Encountered unidirectional transform during encode: ${name}`),
            (this.name = 'ZodEncodeError'));
        }
      }
      const globalConfig = {};
      function config(newConfig) {
        return (newConfig && Object.assign(globalConfig, newConfig), globalConfig);
      }
      var core_util = __webpack_require__('./node_modules/zod/v4/core/util.js');
      const initializer = (inst, def) => {
          ((inst.name = '$ZodError'),
            Object.defineProperty(inst, '_zod', { value: inst._zod, enumerable: !1 }),
            Object.defineProperty(inst, 'issues', { value: def, enumerable: !1 }),
            (inst.message = JSON.stringify(def, core_util.jsonStringifyReplacer, 2)),
            Object.defineProperty(inst, 'toString', { value: () => inst.message, enumerable: !1 }));
        },
        $ZodError = $constructor('$ZodError', initializer),
        $ZodRealError = $constructor('$ZodError', initializer, { Parent: Error });
      function flattenError(error, mapper = (issue) => issue.message) {
        const fieldErrors = {},
          formErrors = [];
        for (const sub of error.issues)
          sub.path.length > 0
            ? ((fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || []),
              fieldErrors[sub.path[0]].push(mapper(sub)))
            : formErrors.push(mapper(sub));
        return { formErrors, fieldErrors };
      }
      function formatError(error, mapper = (issue) => issue.message) {
        const fieldErrors = { _errors: [] },
          processError = (error) => {
            for (const issue of error.issues)
              if ('invalid_union' === issue.code && issue.errors.length)
                issue.errors.map((issues) => processError({ issues }));
              else if ('invalid_key' === issue.code) processError({ issues: issue.issues });
              else if ('invalid_element' === issue.code) processError({ issues: issue.issues });
              else if (0 === issue.path.length) fieldErrors._errors.push(mapper(issue));
              else {
                let curr = fieldErrors,
                  i = 0;
                for (; i < issue.path.length; ) {
                  const el = issue.path[i];
                  (i === issue.path.length - 1
                    ? ((curr[el] = curr[el] || { _errors: [] }),
                      curr[el]._errors.push(mapper(issue)))
                    : (curr[el] = curr[el] || { _errors: [] }),
                    (curr = curr[el]),
                    i++);
                }
              }
          };
        return (processError(error), fieldErrors);
      }
      const _parse = (_Err) => (schema, value, _ctx, _params) => {
          const ctx = _ctx ? Object.assign(_ctx, { async: !1 }) : { async: !1 },
            result = schema._zod.run({ value, issues: [] }, ctx);
          if (result instanceof Promise) throw new $ZodAsyncError();
          if (result.issues.length) {
            const e = new (_params?.Err ?? _Err)(
              result.issues.map((iss) => core_util.finalizeIssue(iss, ctx, config()))
            );
            throw (core_util.captureStackTrace(e, _params?.callee), e);
          }
          return result.value;
        },
        parse = _parse($ZodRealError),
        _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
          const ctx = _ctx ? Object.assign(_ctx, { async: !0 }) : { async: !0 };
          let result = schema._zod.run({ value, issues: [] }, ctx);
          if ((result instanceof Promise && (result = await result), result.issues.length)) {
            const e = new (params?.Err ?? _Err)(
              result.issues.map((iss) => core_util.finalizeIssue(iss, ctx, config()))
            );
            throw (core_util.captureStackTrace(e, params?.callee), e);
          }
          return result.value;
        },
        parseAsync = _parseAsync($ZodRealError),
        _safeParse = (_Err) => (schema, value, _ctx) => {
          const ctx = _ctx ? { ..._ctx, async: !1 } : { async: !1 },
            result = schema._zod.run({ value, issues: [] }, ctx);
          if (result instanceof Promise) throw new $ZodAsyncError();
          return result.issues.length
            ? {
                success: !1,
                error: new (_Err ?? $ZodError)(
                  result.issues.map((iss) => core_util.finalizeIssue(iss, ctx, config()))
                ),
              }
            : { success: !0, data: result.value };
        },
        safeParse = _safeParse($ZodRealError),
        _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
          const ctx = _ctx ? Object.assign(_ctx, { async: !0 }) : { async: !0 };
          let result = schema._zod.run({ value, issues: [] }, ctx);
          return (
            result instanceof Promise && (result = await result),
            result.issues.length
              ? {
                  success: !1,
                  error: new _Err(
                    result.issues.map((iss) => core_util.finalizeIssue(iss, ctx, config()))
                  ),
                }
              : { success: !0, data: result.value }
          );
        },
        safeParseAsync = _safeParseAsync($ZodRealError),
        _encode = (_Err) => (schema, value, _ctx) => {
          const ctx = _ctx
            ? Object.assign(_ctx, { direction: 'backward' })
            : { direction: 'backward' };
          return _parse(_Err)(schema, value, ctx);
        },
        _decode = (_Err) => (schema, value, _ctx) => _parse(_Err)(schema, value, _ctx),
        _encodeAsync = (_Err) => async (schema, value, _ctx) => {
          const ctx = _ctx
            ? Object.assign(_ctx, { direction: 'backward' })
            : { direction: 'backward' };
          return _parseAsync(_Err)(schema, value, ctx);
        },
        _decodeAsync = (_Err) => async (schema, value, _ctx) =>
          _parseAsync(_Err)(schema, value, _ctx),
        _safeEncode = (_Err) => (schema, value, _ctx) => {
          const ctx = _ctx
            ? Object.assign(_ctx, { direction: 'backward' })
            : { direction: 'backward' };
          return _safeParse(_Err)(schema, value, ctx);
        },
        _safeDecode = (_Err) => (schema, value, _ctx) => _safeParse(_Err)(schema, value, _ctx),
        _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
          const ctx = _ctx
            ? Object.assign(_ctx, { direction: 'backward' })
            : { direction: 'backward' };
          return _safeParseAsync(_Err)(schema, value, ctx);
        },
        _safeDecodeAsync = (_Err) => async (schema, value, _ctx) =>
          _safeParseAsync(_Err)(schema, value, _ctx),
        cuid = /^[cC][^\s-]{8,}$/,
        cuid2 = /^[0-9a-z]+$/,
        ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
        xid = /^[0-9a-vA-V]{20}$/,
        ksuid = /^[A-Za-z0-9]{27}$/,
        nanoid = /^[a-zA-Z0-9_-]{21}$/,
        duration =
          /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
        extendedDuration =
          /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
        guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
        uuid = (version) =>
          version
            ? new RegExp(
                `^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`
              )
            : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
        uuid4 = uuid(4),
        uuid6 = uuid(6),
        uuid7 = uuid(7),
        email =
          /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
        html5Email =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        rfc5322Email =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        unicodeEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u,
        idnEmail = unicodeEmail,
        browserEmail =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      function emoji() {
        return new RegExp('^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$', 'u');
      }
      const ipv4 =
          /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
        ipv6 =
          /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
        mac = (delimiter) => {
          const escapedDelim = core_util.escapeRegex(delimiter ?? ':');
          return new RegExp(
            `^(?:[0-9A-F]{2}${escapedDelim}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${escapedDelim}){5}[0-9a-f]{2}$`
          );
        },
        cidrv4 =
          /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
        cidrv6 =
          /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
        base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
        base64url = /^[A-Za-z0-9_-]*$/,
        hostname =
          /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/,
        domain = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
        e164 = /^\+(?:[0-9]){6,14}[0-9]$/,
        dateSource =
          '(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))',
        date = new RegExp(`^${dateSource}$`);
      function timeSource(args) {
        const hhmm = '(?:[01]\\d|2[0-3]):[0-5]\\d';
        return 'number' == typeof args.precision
          ? -1 === args.precision
            ? `${hhmm}`
            : 0 === args.precision
              ? `${hhmm}:[0-5]\\d`
              : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}`
          : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
      }
      function time(args) {
        return new RegExp(`^${timeSource(args)}$`);
      }
      function datetime(args) {
        const time = timeSource({ precision: args.precision }),
          opts = ['Z'];
        (args.local && opts.push(''),
          args.offset && opts.push('([+-](?:[01]\\d|2[0-3]):[0-5]\\d)'));
        const timeRegex = `${time}(?:${opts.join('|')})`;
        return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
      }
      const string = (params) =>
          new RegExp(
            `^${params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ''}}` : '[\\s\\S]*'}$`
          ),
        bigint = /^-?\d+n?$/,
        integer = /^-?\d+$/,
        number = /^-?\d+(?:\.\d+)?/,
        regexes_boolean = /^(?:true|false)$/i,
        _null = /^null$/i,
        _undefined = /^undefined$/i,
        lowercase = /^[^A-Z]*$/,
        uppercase = /^[^a-z]*$/,
        hex = /^[0-9a-fA-F]*$/;
      function fixedBase64(bodyLength, padding) {
        return new RegExp(`^[A-Za-z0-9+/]{${bodyLength}}${padding}$`);
      }
      function fixedBase64url(length) {
        return new RegExp(`^[A-Za-z0-9_-]{${length}}$`);
      }
      const md5_hex = /^[0-9a-fA-F]{32}$/,
        md5_base64 = fixedBase64(22, '=='),
        md5_base64url = fixedBase64url(22),
        sha1_hex = /^[0-9a-fA-F]{40}$/,
        sha1_base64 = fixedBase64(27, '='),
        sha1_base64url = fixedBase64url(27),
        sha256_hex = /^[0-9a-fA-F]{64}$/,
        sha256_base64 = fixedBase64(43, '='),
        sha256_base64url = fixedBase64url(43),
        sha384_hex = /^[0-9a-fA-F]{96}$/,
        sha384_base64 = fixedBase64(64, ''),
        sha384_base64url = fixedBase64url(64),
        sha512_hex = /^[0-9a-fA-F]{128}$/,
        sha512_base64 = fixedBase64(86, '=='),
        sha512_base64url = fixedBase64url(86),
        $ZodCheck = $constructor('$ZodCheck', (inst, def) => {
          var _a;
          (inst._zod ?? (inst._zod = {}),
            (inst._zod.def = def),
            (_a = inst._zod).onattach ?? (_a.onattach = []));
        }),
        numericOriginMap = { number: 'number', bigint: 'bigint', object: 'date' },
        $ZodCheckLessThan = $constructor('$ZodCheckLessThan', (inst, def) => {
          $ZodCheck.init(inst, def);
          const origin = numericOriginMap[typeof def.value];
          (inst._zod.onattach.push((inst) => {
            const bag = inst._zod.bag,
              curr =
                (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
            def.value < curr &&
              (def.inclusive ? (bag.maximum = def.value) : (bag.exclusiveMaximum = def.value));
          }),
            (inst._zod.check = (payload) => {
              (def.inclusive ? payload.value <= def.value : payload.value < def.value) ||
                payload.issues.push({
                  origin,
                  code: 'too_big',
                  maximum: def.value,
                  input: payload.value,
                  inclusive: def.inclusive,
                  inst,
                  continue: !def.abort,
                });
            }));
        }),
        $ZodCheckGreaterThan = $constructor('$ZodCheckGreaterThan', (inst, def) => {
          $ZodCheck.init(inst, def);
          const origin = numericOriginMap[typeof def.value];
          (inst._zod.onattach.push((inst) => {
            const bag = inst._zod.bag,
              curr =
                (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
            def.value > curr &&
              (def.inclusive ? (bag.minimum = def.value) : (bag.exclusiveMinimum = def.value));
          }),
            (inst._zod.check = (payload) => {
              (def.inclusive ? payload.value >= def.value : payload.value > def.value) ||
                payload.issues.push({
                  origin,
                  code: 'too_small',
                  minimum: def.value,
                  input: payload.value,
                  inclusive: def.inclusive,
                  inst,
                  continue: !def.abort,
                });
            }));
        }),
        $ZodCheckMultipleOf = $constructor('$ZodCheckMultipleOf', (inst, def) => {
          ($ZodCheck.init(inst, def),
            inst._zod.onattach.push((inst) => {
              var _a;
              (_a = inst._zod.bag).multipleOf ?? (_a.multipleOf = def.value);
            }),
            (inst._zod.check = (payload) => {
              if (typeof payload.value != typeof def.value)
                throw new Error('Cannot mix number and bigint in multiple_of check.');
              ('bigint' == typeof payload.value
                ? payload.value % def.value === BigInt(0)
                : 0 === core_util.floatSafeRemainder(payload.value, def.value)) ||
                payload.issues.push({
                  origin: typeof payload.value,
                  code: 'not_multiple_of',
                  divisor: def.value,
                  input: payload.value,
                  inst,
                  continue: !def.abort,
                });
            }));
        }),
        $ZodCheckNumberFormat = $constructor('$ZodCheckNumberFormat', (inst, def) => {
          ($ZodCheck.init(inst, def), (def.format = def.format || 'float64'));
          const isInt = def.format?.includes('int'),
            origin = isInt ? 'int' : 'number',
            [minimum, maximum] = core_util.NUMBER_FORMAT_RANGES[def.format];
          (inst._zod.onattach.push((inst) => {
            const bag = inst._zod.bag;
            ((bag.format = def.format),
              (bag.minimum = minimum),
              (bag.maximum = maximum),
              isInt && (bag.pattern = integer));
          }),
            (inst._zod.check = (payload) => {
              const input = payload.value;
              if (isInt) {
                if (!Number.isInteger(input))
                  return void payload.issues.push({
                    expected: origin,
                    format: def.format,
                    code: 'invalid_type',
                    continue: !1,
                    input,
                    inst,
                  });
                if (!Number.isSafeInteger(input))
                  return void (input > 0
                    ? payload.issues.push({
                        input,
                        code: 'too_big',
                        maximum: Number.MAX_SAFE_INTEGER,
                        note: 'Integers must be within the safe integer range.',
                        inst,
                        origin,
                        continue: !def.abort,
                      })
                    : payload.issues.push({
                        input,
                        code: 'too_small',
                        minimum: Number.MIN_SAFE_INTEGER,
                        note: 'Integers must be within the safe integer range.',
                        inst,
                        origin,
                        continue: !def.abort,
                      }));
              }
              (input < minimum &&
                payload.issues.push({
                  origin: 'number',
                  input,
                  code: 'too_small',
                  minimum,
                  inclusive: !0,
                  inst,
                  continue: !def.abort,
                }),
                input > maximum &&
                  payload.issues.push({ origin: 'number', input, code: 'too_big', maximum, inst }));
            }));
        }),
        $ZodCheckBigIntFormat = $constructor('$ZodCheckBigIntFormat', (inst, def) => {
          $ZodCheck.init(inst, def);
          const [minimum, maximum] = core_util.BIGINT_FORMAT_RANGES[def.format];
          (inst._zod.onattach.push((inst) => {
            const bag = inst._zod.bag;
            ((bag.format = def.format), (bag.minimum = minimum), (bag.maximum = maximum));
          }),
            (inst._zod.check = (payload) => {
              const input = payload.value;
              (input < minimum &&
                payload.issues.push({
                  origin: 'bigint',
                  input,
                  code: 'too_small',
                  minimum,
                  inclusive: !0,
                  inst,
                  continue: !def.abort,
                }),
                input > maximum &&
                  payload.issues.push({ origin: 'bigint', input, code: 'too_big', maximum, inst }));
            }));
        }),
        $ZodCheckMaxSize = $constructor('$ZodCheckMaxSize', (inst, def) => {
          var _a;
          ($ZodCheck.init(inst, def),
            (_a = inst._zod.def).when ??
              (_a.when = (payload) => {
                const val = payload.value;
                return !core_util.nullish(val) && void 0 !== val.size;
              }),
            inst._zod.onattach.push((inst) => {
              const curr = inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
              def.maximum < curr && (inst._zod.bag.maximum = def.maximum);
            }),
            (inst._zod.check = (payload) => {
              const input = payload.value;
              input.size <= def.maximum ||
                payload.issues.push({
                  origin: core_util.getSizableOrigin(input),
                  code: 'too_big',
                  maximum: def.maximum,
                  inclusive: !0,
                  input,
                  inst,
                  continue: !def.abort,
                });
            }));
        }),
        $ZodCheckMinSize = $constructor('$ZodCheckMinSize', (inst, def) => {
          var _a;
          ($ZodCheck.init(inst, def),
            (_a = inst._zod.def).when ??
              (_a.when = (payload) => {
                const val = payload.value;
                return !core_util.nullish(val) && void 0 !== val.size;
              }),
            inst._zod.onattach.push((inst) => {
              const curr = inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
              def.minimum > curr && (inst._zod.bag.minimum = def.minimum);
            }),
            (inst._zod.check = (payload) => {
              const input = payload.value;
              input.size >= def.minimum ||
                payload.issues.push({
                  origin: core_util.getSizableOrigin(input),
                  code: 'too_small',
                  minimum: def.minimum,
                  inclusive: !0,
                  input,
                  inst,
                  continue: !def.abort,
                });
            }));
        }),
        $ZodCheckSizeEquals = $constructor('$ZodCheckSizeEquals', (inst, def) => {
          var _a;
          ($ZodCheck.init(inst, def),
            (_a = inst._zod.def).when ??
              (_a.when = (payload) => {
                const val = payload.value;
                return !core_util.nullish(val) && void 0 !== val.size;
              }),
            inst._zod.onattach.push((inst) => {
              const bag = inst._zod.bag;
              ((bag.minimum = def.size), (bag.maximum = def.size), (bag.size = def.size));
            }),
            (inst._zod.check = (payload) => {
              const input = payload.value,
                size = input.size;
              if (size === def.size) return;
              const tooBig = size > def.size;
              payload.issues.push({
                origin: core_util.getSizableOrigin(input),
                ...(tooBig
                  ? { code: 'too_big', maximum: def.size }
                  : { code: 'too_small', minimum: def.size }),
                inclusive: !0,
                exact: !0,
                input: payload.value,
                inst,
                continue: !def.abort,
              });
            }));
        }),
        $ZodCheckMaxLength = $constructor('$ZodCheckMaxLength', (inst, def) => {
          var _a;
          ($ZodCheck.init(inst, def),
            (_a = inst._zod.def).when ??
              (_a.when = (payload) => {
                const val = payload.value;
                return !core_util.nullish(val) && void 0 !== val.length;
              }),
            inst._zod.onattach.push((inst) => {
              const curr = inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
              def.maximum < curr && (inst._zod.bag.maximum = def.maximum);
            }),
            (inst._zod.check = (payload) => {
              const input = payload.value;
              if (input.length <= def.maximum) return;
              const origin = core_util.getLengthableOrigin(input);
              payload.issues.push({
                origin,
                code: 'too_big',
                maximum: def.maximum,
                inclusive: !0,
                input,
                inst,
                continue: !def.abort,
              });
            }));
        }),
        $ZodCheckMinLength = $constructor('$ZodCheckMinLength', (inst, def) => {
          var _a;
          ($ZodCheck.init(inst, def),
            (_a = inst._zod.def).when ??
              (_a.when = (payload) => {
                const val = payload.value;
                return !core_util.nullish(val) && void 0 !== val.length;
              }),
            inst._zod.onattach.push((inst) => {
              const curr = inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
              def.minimum > curr && (inst._zod.bag.minimum = def.minimum);
            }),
            (inst._zod.check = (payload) => {
              const input = payload.value;
              if (input.length >= def.minimum) return;
              const origin = core_util.getLengthableOrigin(input);
              payload.issues.push({
                origin,
                code: 'too_small',
                minimum: def.minimum,
                inclusive: !0,
                input,
                inst,
                continue: !def.abort,
              });
            }));
        }),
        $ZodCheckLengthEquals = $constructor('$ZodCheckLengthEquals', (inst, def) => {
          var _a;
          ($ZodCheck.init(inst, def),
            (_a = inst._zod.def).when ??
              (_a.when = (payload) => {
                const val = payload.value;
                return !core_util.nullish(val) && void 0 !== val.length;
              }),
            inst._zod.onattach.push((inst) => {
              const bag = inst._zod.bag;
              ((bag.minimum = def.length), (bag.maximum = def.length), (bag.length = def.length));
            }),
            (inst._zod.check = (payload) => {
              const input = payload.value,
                length = input.length;
              if (length === def.length) return;
              const origin = core_util.getLengthableOrigin(input),
                tooBig = length > def.length;
              payload.issues.push({
                origin,
                ...(tooBig
                  ? { code: 'too_big', maximum: def.length }
                  : { code: 'too_small', minimum: def.length }),
                inclusive: !0,
                exact: !0,
                input: payload.value,
                inst,
                continue: !def.abort,
              });
            }));
        }),
        $ZodCheckStringFormat = $constructor('$ZodCheckStringFormat', (inst, def) => {
          var _a, _b;
          ($ZodCheck.init(inst, def),
            inst._zod.onattach.push((inst) => {
              const bag = inst._zod.bag;
              ((bag.format = def.format),
                def.pattern &&
                  (bag.patterns ?? (bag.patterns = new Set()), bag.patterns.add(def.pattern)));
            }),
            def.pattern
              ? ((_a = inst._zod).check ??
                (_a.check = (payload) => {
                  ((def.pattern.lastIndex = 0),
                    def.pattern.test(payload.value) ||
                      payload.issues.push({
                        origin: 'string',
                        code: 'invalid_format',
                        format: def.format,
                        input: payload.value,
                        ...(def.pattern ? { pattern: def.pattern.toString() } : {}),
                        inst,
                        continue: !def.abort,
                      }));
                }))
              : ((_b = inst._zod).check ?? (_b.check = () => {})));
        }),
        $ZodCheckRegex = $constructor('$ZodCheckRegex', (inst, def) => {
          ($ZodCheckStringFormat.init(inst, def),
            (inst._zod.check = (payload) => {
              ((def.pattern.lastIndex = 0),
                def.pattern.test(payload.value) ||
                  payload.issues.push({
                    origin: 'string',
                    code: 'invalid_format',
                    format: 'regex',
                    input: payload.value,
                    pattern: def.pattern.toString(),
                    inst,
                    continue: !def.abort,
                  }));
            }));
        }),
        $ZodCheckLowerCase = $constructor('$ZodCheckLowerCase', (inst, def) => {
          (def.pattern ?? (def.pattern = lowercase), $ZodCheckStringFormat.init(inst, def));
        }),
        $ZodCheckUpperCase = $constructor('$ZodCheckUpperCase', (inst, def) => {
          (def.pattern ?? (def.pattern = uppercase), $ZodCheckStringFormat.init(inst, def));
        }),
        $ZodCheckIncludes = $constructor('$ZodCheckIncludes', (inst, def) => {
          $ZodCheck.init(inst, def);
          const escapedRegex = core_util.escapeRegex(def.includes),
            pattern = new RegExp(
              'number' == typeof def.position ? `^.{${def.position}}${escapedRegex}` : escapedRegex
            );
          ((def.pattern = pattern),
            inst._zod.onattach.push((inst) => {
              const bag = inst._zod.bag;
              (bag.patterns ?? (bag.patterns = new Set()), bag.patterns.add(pattern));
            }),
            (inst._zod.check = (payload) => {
              payload.value.includes(def.includes, def.position) ||
                payload.issues.push({
                  origin: 'string',
                  code: 'invalid_format',
                  format: 'includes',
                  includes: def.includes,
                  input: payload.value,
                  inst,
                  continue: !def.abort,
                });
            }));
        }),
        $ZodCheckStartsWith = $constructor('$ZodCheckStartsWith', (inst, def) => {
          $ZodCheck.init(inst, def);
          const pattern = new RegExp(`^${core_util.escapeRegex(def.prefix)}.*`);
          (def.pattern ?? (def.pattern = pattern),
            inst._zod.onattach.push((inst) => {
              const bag = inst._zod.bag;
              (bag.patterns ?? (bag.patterns = new Set()), bag.patterns.add(pattern));
            }),
            (inst._zod.check = (payload) => {
              payload.value.startsWith(def.prefix) ||
                payload.issues.push({
                  origin: 'string',
                  code: 'invalid_format',
                  format: 'starts_with',
                  prefix: def.prefix,
                  input: payload.value,
                  inst,
                  continue: !def.abort,
                });
            }));
        }),
        $ZodCheckEndsWith = $constructor('$ZodCheckEndsWith', (inst, def) => {
          $ZodCheck.init(inst, def);
          const pattern = new RegExp(`.*${core_util.escapeRegex(def.suffix)}$`);
          (def.pattern ?? (def.pattern = pattern),
            inst._zod.onattach.push((inst) => {
              const bag = inst._zod.bag;
              (bag.patterns ?? (bag.patterns = new Set()), bag.patterns.add(pattern));
            }),
            (inst._zod.check = (payload) => {
              payload.value.endsWith(def.suffix) ||
                payload.issues.push({
                  origin: 'string',
                  code: 'invalid_format',
                  format: 'ends_with',
                  suffix: def.suffix,
                  input: payload.value,
                  inst,
                  continue: !def.abort,
                });
            }));
        });
      function handleCheckPropertyResult(result, payload, property) {
        result.issues.length &&
          payload.issues.push(...core_util.prefixIssues(property, result.issues));
      }
      const $ZodCheckProperty = $constructor('$ZodCheckProperty', (inst, def) => {
          ($ZodCheck.init(inst, def),
            (inst._zod.check = (payload) => {
              const result = def.schema._zod.run(
                { value: payload.value[def.property], issues: [] },
                {}
              );
              if (result instanceof Promise)
                return result.then((result) =>
                  handleCheckPropertyResult(result, payload, def.property)
                );
              handleCheckPropertyResult(result, payload, def.property);
            }));
        }),
        $ZodCheckMimeType = $constructor('$ZodCheckMimeType', (inst, def) => {
          $ZodCheck.init(inst, def);
          const mimeSet = new Set(def.mime);
          (inst._zod.onattach.push((inst) => {
            inst._zod.bag.mime = def.mime;
          }),
            (inst._zod.check = (payload) => {
              mimeSet.has(payload.value.type) ||
                payload.issues.push({
                  code: 'invalid_value',
                  values: def.mime,
                  input: payload.value.type,
                  inst,
                  continue: !def.abort,
                });
            }));
        }),
        $ZodCheckOverwrite = $constructor('$ZodCheckOverwrite', (inst, def) => {
          ($ZodCheck.init(inst, def),
            (inst._zod.check = (payload) => {
              payload.value = def.tx(payload.value);
            }));
        });
      class Doc {
        constructor(args = []) {
          ((this.content = []), (this.indent = 0), this && (this.args = args));
        }
        indented(fn) {
          ((this.indent += 1), fn(this), (this.indent -= 1));
        }
        write(arg) {
          if ('function' == typeof arg)
            return (arg(this, { execution: 'sync' }), void arg(this, { execution: 'async' }));
          const lines = arg.split('\n').filter((x) => x),
            minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length)),
            dedented = lines
              .map((x) => x.slice(minIndent))
              .map((x) => ' '.repeat(2 * this.indent) + x);
          for (const line of dedented) this.content.push(line);
        }
        compile() {
          const F = Function,
            args = this?.args;
          return new F(...args, [...(this?.content ?? ['']).map((x) => `  ${x}`)].join('\n'));
        }
      }
      const version = { major: 4, minor: 2, patch: 1 },
        $ZodType = $constructor('$ZodType', (inst, def) => {
          var _a;
          (inst ?? (inst = {}),
            (inst._zod.def = def),
            (inst._zod.bag = inst._zod.bag || {}),
            (inst._zod.version = version));
          const checks = [...(inst._zod.def.checks ?? [])];
          inst._zod.traits.has('$ZodCheck') && checks.unshift(inst);
          for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
          if (0 === checks.length)
            ((_a = inst._zod).deferred ?? (_a.deferred = []),
              inst._zod.deferred?.push(() => {
                inst._zod.run = inst._zod.parse;
              }));
          else {
            const runChecks = (payload, checks, ctx) => {
                let asyncResult,
                  isAborted = core_util.aborted(payload);
                for (const ch of checks) {
                  if (ch._zod.def.when) {
                    if (!ch._zod.def.when(payload)) continue;
                  } else if (isAborted) continue;
                  const currLen = payload.issues.length,
                    _ = ch._zod.check(payload);
                  if (_ instanceof Promise && !1 === ctx?.async) throw new $ZodAsyncError();
                  if (asyncResult || _ instanceof Promise)
                    asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
                      await _;
                      payload.issues.length !== currLen &&
                        (isAborted || (isAborted = core_util.aborted(payload, currLen)));
                    });
                  else {
                    if (payload.issues.length === currLen) continue;
                    isAborted || (isAborted = core_util.aborted(payload, currLen));
                  }
                }
                return asyncResult ? asyncResult.then(() => payload) : payload;
              },
              handleCanaryResult = (canary, payload, ctx) => {
                if (core_util.aborted(canary)) return ((canary.aborted = !0), canary);
                const checkResult = runChecks(payload, checks, ctx);
                if (checkResult instanceof Promise) {
                  if (!1 === ctx.async) throw new $ZodAsyncError();
                  return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
                }
                return inst._zod.parse(checkResult, ctx);
              };
            inst._zod.run = (payload, ctx) => {
              if (ctx.skipChecks) return inst._zod.parse(payload, ctx);
              if ('backward' === ctx.direction) {
                const canary = inst._zod.parse(
                  { value: payload.value, issues: [] },
                  { ...ctx, skipChecks: !0 }
                );
                return canary instanceof Promise
                  ? canary.then((canary) => handleCanaryResult(canary, payload, ctx))
                  : handleCanaryResult(canary, payload, ctx);
              }
              const result = inst._zod.parse(payload, ctx);
              if (result instanceof Promise) {
                if (!1 === ctx.async) throw new $ZodAsyncError();
                return result.then((result) => runChecks(result, checks, ctx));
              }
              return runChecks(result, checks, ctx);
            };
          }
          inst['~standard'] = {
            validate: (value) => {
              try {
                const r = safeParse(inst, value);
                return r.success ? { value: r.data } : { issues: r.error?.issues };
              } catch (_) {
                return safeParseAsync(inst, value).then((r) =>
                  r.success ? { value: r.data } : { issues: r.error?.issues }
                );
              }
            },
            vendor: 'zod',
            version: 1,
          };
        }),
        $ZodString = $constructor('$ZodString', (inst, def) => {
          ($ZodType.init(inst, def),
            (inst._zod.pattern =
              [...(inst?._zod.bag?.patterns ?? [])].pop() ?? string(inst._zod.bag)),
            (inst._zod.parse = (payload, _) => {
              if (def.coerce)
                try {
                  payload.value = String(payload.value);
                } catch (_) {}
              return (
                'string' == typeof payload.value ||
                  payload.issues.push({
                    expected: 'string',
                    code: 'invalid_type',
                    input: payload.value,
                    inst,
                  }),
                payload
              );
            }));
        }),
        $ZodStringFormat = $constructor('$ZodStringFormat', (inst, def) => {
          ($ZodCheckStringFormat.init(inst, def), $ZodString.init(inst, def));
        }),
        $ZodGUID = $constructor('$ZodGUID', (inst, def) => {
          (def.pattern ?? (def.pattern = guid), $ZodStringFormat.init(inst, def));
        }),
        $ZodUUID = $constructor('$ZodUUID', (inst, def) => {
          if (def.version) {
            const v = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[def.version];
            if (void 0 === v) throw new Error(`Invalid UUID version: "${def.version}"`);
            def.pattern ?? (def.pattern = uuid(v));
          } else def.pattern ?? (def.pattern = uuid());
          $ZodStringFormat.init(inst, def);
        }),
        $ZodEmail = $constructor('$ZodEmail', (inst, def) => {
          (def.pattern ?? (def.pattern = email), $ZodStringFormat.init(inst, def));
        }),
        $ZodURL = $constructor('$ZodURL', (inst, def) => {
          ($ZodStringFormat.init(inst, def),
            (inst._zod.check = (payload) => {
              try {
                const trimmed = payload.value.trim(),
                  url = new URL(trimmed);
                return (
                  def.hostname &&
                    ((def.hostname.lastIndex = 0),
                    def.hostname.test(url.hostname) ||
                      payload.issues.push({
                        code: 'invalid_format',
                        format: 'url',
                        note: 'Invalid hostname',
                        pattern: def.hostname.source,
                        input: payload.value,
                        inst,
                        continue: !def.abort,
                      })),
                  def.protocol &&
                    ((def.protocol.lastIndex = 0),
                    def.protocol.test(
                      url.protocol.endsWith(':') ? url.protocol.slice(0, -1) : url.protocol
                    ) ||
                      payload.issues.push({
                        code: 'invalid_format',
                        format: 'url',
                        note: 'Invalid protocol',
                        pattern: def.protocol.source,
                        input: payload.value,
                        inst,
                        continue: !def.abort,
                      })),
                  void (def.normalize ? (payload.value = url.href) : (payload.value = trimmed))
                );
              } catch (_) {
                payload.issues.push({
                  code: 'invalid_format',
                  format: 'url',
                  input: payload.value,
                  inst,
                  continue: !def.abort,
                });
              }
            }));
        }),
        $ZodEmoji = $constructor('$ZodEmoji', (inst, def) => {
          (def.pattern ?? (def.pattern = emoji()), $ZodStringFormat.init(inst, def));
        }),
        $ZodNanoID = $constructor('$ZodNanoID', (inst, def) => {
          (def.pattern ?? (def.pattern = nanoid), $ZodStringFormat.init(inst, def));
        }),
        $ZodCUID = $constructor('$ZodCUID', (inst, def) => {
          (def.pattern ?? (def.pattern = cuid), $ZodStringFormat.init(inst, def));
        }),
        $ZodCUID2 = $constructor('$ZodCUID2', (inst, def) => {
          (def.pattern ?? (def.pattern = cuid2), $ZodStringFormat.init(inst, def));
        }),
        $ZodULID = $constructor('$ZodULID', (inst, def) => {
          (def.pattern ?? (def.pattern = ulid), $ZodStringFormat.init(inst, def));
        }),
        $ZodXID = $constructor('$ZodXID', (inst, def) => {
          (def.pattern ?? (def.pattern = xid), $ZodStringFormat.init(inst, def));
        }),
        $ZodKSUID = $constructor('$ZodKSUID', (inst, def) => {
          (def.pattern ?? (def.pattern = ksuid), $ZodStringFormat.init(inst, def));
        }),
        $ZodISODateTime = $constructor('$ZodISODateTime', (inst, def) => {
          (def.pattern ?? (def.pattern = datetime(def)), $ZodStringFormat.init(inst, def));
        }),
        $ZodISODate = $constructor('$ZodISODate', (inst, def) => {
          (def.pattern ?? (def.pattern = date), $ZodStringFormat.init(inst, def));
        }),
        $ZodISOTime = $constructor('$ZodISOTime', (inst, def) => {
          (def.pattern ?? (def.pattern = time(def)), $ZodStringFormat.init(inst, def));
        }),
        $ZodISODuration = $constructor('$ZodISODuration', (inst, def) => {
          (def.pattern ?? (def.pattern = duration), $ZodStringFormat.init(inst, def));
        }),
        $ZodIPv4 = $constructor('$ZodIPv4', (inst, def) => {
          (def.pattern ?? (def.pattern = ipv4),
            $ZodStringFormat.init(inst, def),
            (inst._zod.bag.format = 'ipv4'));
        }),
        $ZodIPv6 = $constructor('$ZodIPv6', (inst, def) => {
          (def.pattern ?? (def.pattern = ipv6),
            $ZodStringFormat.init(inst, def),
            (inst._zod.bag.format = 'ipv6'),
            (inst._zod.check = (payload) => {
              try {
                new URL(`http://[${payload.value}]`);
              } catch {
                payload.issues.push({
                  code: 'invalid_format',
                  format: 'ipv6',
                  input: payload.value,
                  inst,
                  continue: !def.abort,
                });
              }
            }));
        }),
        $ZodMAC = $constructor('$ZodMAC', (inst, def) => {
          (def.pattern ?? (def.pattern = mac(def.delimiter)),
            $ZodStringFormat.init(inst, def),
            (inst._zod.bag.format = 'mac'));
        }),
        $ZodCIDRv4 = $constructor('$ZodCIDRv4', (inst, def) => {
          (def.pattern ?? (def.pattern = cidrv4), $ZodStringFormat.init(inst, def));
        }),
        $ZodCIDRv6 = $constructor('$ZodCIDRv6', (inst, def) => {
          (def.pattern ?? (def.pattern = cidrv6),
            $ZodStringFormat.init(inst, def),
            (inst._zod.check = (payload) => {
              const parts = payload.value.split('/');
              try {
                if (2 !== parts.length) throw new Error();
                const [address, prefix] = parts;
                if (!prefix) throw new Error();
                const prefixNum = Number(prefix);
                if (`${prefixNum}` !== prefix) throw new Error();
                if (prefixNum < 0 || prefixNum > 128) throw new Error();
                new URL(`http://[${address}]`);
              } catch {
                payload.issues.push({
                  code: 'invalid_format',
                  format: 'cidrv6',
                  input: payload.value,
                  inst,
                  continue: !def.abort,
                });
              }
            }));
        });
      function isValidBase64(data) {
        if ('' === data) return !0;
        if (data.length % 4 != 0) return !1;
        try {
          return (atob(data), !0);
        } catch {
          return !1;
        }
      }
      const $ZodBase64 = $constructor('$ZodBase64', (inst, def) => {
        (def.pattern ?? (def.pattern = base64),
          $ZodStringFormat.init(inst, def),
          (inst._zod.bag.contentEncoding = 'base64'),
          (inst._zod.check = (payload) => {
            isValidBase64(payload.value) ||
              payload.issues.push({
                code: 'invalid_format',
                format: 'base64',
                input: payload.value,
                inst,
                continue: !def.abort,
              });
          }));
      });
      const $ZodBase64URL = $constructor('$ZodBase64URL', (inst, def) => {
          (def.pattern ?? (def.pattern = base64url),
            $ZodStringFormat.init(inst, def),
            (inst._zod.bag.contentEncoding = 'base64url'),
            (inst._zod.check = (payload) => {
              (function isValidBase64URL(data) {
                if (!base64url.test(data)) return !1;
                const base64 = data.replace(/[-_]/g, (c) => ('-' === c ? '+' : '/'));
                return isValidBase64(base64.padEnd(4 * Math.ceil(base64.length / 4), '='));
              })(payload.value) ||
                payload.issues.push({
                  code: 'invalid_format',
                  format: 'base64url',
                  input: payload.value,
                  inst,
                  continue: !def.abort,
                });
            }));
        }),
        $ZodE164 = $constructor('$ZodE164', (inst, def) => {
          (def.pattern ?? (def.pattern = e164), $ZodStringFormat.init(inst, def));
        });
      const $ZodJWT = $constructor('$ZodJWT', (inst, def) => {
          ($ZodStringFormat.init(inst, def),
            (inst._zod.check = (payload) => {
              (function isValidJWT(token, algorithm = null) {
                try {
                  const tokensParts = token.split('.');
                  if (3 !== tokensParts.length) return !1;
                  const [header] = tokensParts;
                  if (!header) return !1;
                  const parsedHeader = JSON.parse(atob(header));
                  return !(
                    ('typ' in parsedHeader && 'JWT' !== parsedHeader?.typ) ||
                    !parsedHeader.alg ||
                    (algorithm && (!('alg' in parsedHeader) || parsedHeader.alg !== algorithm))
                  );
                } catch {
                  return !1;
                }
              })(payload.value, def.alg) ||
                payload.issues.push({
                  code: 'invalid_format',
                  format: 'jwt',
                  input: payload.value,
                  inst,
                  continue: !def.abort,
                });
            }));
        }),
        $ZodCustomStringFormat = $constructor('$ZodCustomStringFormat', (inst, def) => {
          ($ZodStringFormat.init(inst, def),
            (inst._zod.check = (payload) => {
              def.fn(payload.value) ||
                payload.issues.push({
                  code: 'invalid_format',
                  format: def.format,
                  input: payload.value,
                  inst,
                  continue: !def.abort,
                });
            }));
        }),
        $ZodNumber = $constructor('$ZodNumber', (inst, def) => {
          ($ZodType.init(inst, def),
            (inst._zod.pattern = inst._zod.bag.pattern ?? number),
            (inst._zod.parse = (payload, _ctx) => {
              if (def.coerce)
                try {
                  payload.value = Number(payload.value);
                } catch (_) {}
              const input = payload.value;
              if ('number' == typeof input && !Number.isNaN(input) && Number.isFinite(input))
                return payload;
              const received =
                'number' == typeof input
                  ? Number.isNaN(input)
                    ? 'NaN'
                    : Number.isFinite(input)
                      ? void 0
                      : 'Infinity'
                  : void 0;
              return (
                payload.issues.push({
                  expected: 'number',
                  code: 'invalid_type',
                  input,
                  inst,
                  ...(received ? { received } : {}),
                }),
                payload
              );
            }));
        }),
        $ZodNumberFormat = $constructor('$ZodNumberFormat', (inst, def) => {
          ($ZodCheckNumberFormat.init(inst, def), $ZodNumber.init(inst, def));
        }),
        $ZodBoolean = $constructor('$ZodBoolean', (inst, def) => {
          ($ZodType.init(inst, def),
            (inst._zod.pattern = regexes_boolean),
            (inst._zod.parse = (payload, _ctx) => {
              if (def.coerce)
                try {
                  payload.value = Boolean(payload.value);
                } catch (_) {}
              const input = payload.value;
              return (
                'boolean' == typeof input ||
                  payload.issues.push({ expected: 'boolean', code: 'invalid_type', input, inst }),
                payload
              );
            }));
        }),
        $ZodBigInt = $constructor('$ZodBigInt', (inst, def) => {
          ($ZodType.init(inst, def),
            (inst._zod.pattern = bigint),
            (inst._zod.parse = (payload, _ctx) => {
              if (def.coerce)
                try {
                  payload.value = BigInt(payload.value);
                } catch (_) {}
              return (
                'bigint' == typeof payload.value ||
                  payload.issues.push({
                    expected: 'bigint',
                    code: 'invalid_type',
                    input: payload.value,
                    inst,
                  }),
                payload
              );
            }));
        }),
        $ZodBigIntFormat = $constructor('$ZodBigIntFormat', (inst, def) => {
          ($ZodCheckBigIntFormat.init(inst, def), $ZodBigInt.init(inst, def));
        }),
        $ZodSymbol = $constructor('$ZodSymbol', (inst, def) => {
          ($ZodType.init(inst, def),
            (inst._zod.parse = (payload, _ctx) => {
              const input = payload.value;
              return (
                'symbol' == typeof input ||
                  payload.issues.push({ expected: 'symbol', code: 'invalid_type', input, inst }),
                payload
              );
            }));
        }),
        $ZodUndefined = $constructor('$ZodUndefined', (inst, def) => {
          ($ZodType.init(inst, def),
            (inst._zod.pattern = _undefined),
            (inst._zod.values = new Set([void 0])),
            (inst._zod.optin = 'optional'),
            (inst._zod.optout = 'optional'),
            (inst._zod.parse = (payload, _ctx) => {
              const input = payload.value;
              return (
                void 0 === input ||
                  payload.issues.push({ expected: 'undefined', code: 'invalid_type', input, inst }),
                payload
              );
            }));
        }),
        $ZodNull = $constructor('$ZodNull', (inst, def) => {
          ($ZodType.init(inst, def),
            (inst._zod.pattern = _null),
            (inst._zod.values = new Set([null])),
            (inst._zod.parse = (payload, _ctx) => {
              const input = payload.value;
              return (
                null === input ||
                  payload.issues.push({ expected: 'null', code: 'invalid_type', input, inst }),
                payload
              );
            }));
        }),
        $ZodAny = $constructor('$ZodAny', (inst, def) => {
          ($ZodType.init(inst, def), (inst._zod.parse = (payload) => payload));
        }),
        $ZodUnknown = $constructor('$ZodUnknown', (inst, def) => {
          ($ZodType.init(inst, def), (inst._zod.parse = (payload) => payload));
        }),
        $ZodNever = $constructor('$ZodNever', (inst, def) => {
          ($ZodType.init(inst, def),
            (inst._zod.parse = (payload, _ctx) => (
              payload.issues.push({
                expected: 'never',
                code: 'invalid_type',
                input: payload.value,
                inst,
              }),
              payload
            )));
        }),
        $ZodVoid = $constructor('$ZodVoid', (inst, def) => {
          ($ZodType.init(inst, def),
            (inst._zod.parse = (payload, _ctx) => {
              const input = payload.value;
              return (
                void 0 === input ||
                  payload.issues.push({ expected: 'void', code: 'invalid_type', input, inst }),
                payload
              );
            }));
        }),
        $ZodDate = $constructor('$ZodDate', (inst, def) => {
          ($ZodType.init(inst, def),
            (inst._zod.parse = (payload, _ctx) => {
              if (def.coerce)
                try {
                  payload.value = new Date(payload.value);
                } catch (_err) {}
              const input = payload.value,
                isDate = input instanceof Date;
              return (
                (isDate && !Number.isNaN(input.getTime())) ||
                  payload.issues.push({
                    expected: 'date',
                    code: 'invalid_type',
                    input,
                    ...(isDate ? { received: 'Invalid Date' } : {}),
                    inst,
                  }),
                payload
              );
            }));
        });
      function handleArrayResult(result, final, index) {
        (result.issues.length && final.issues.push(...core_util.prefixIssues(index, result.issues)),
          (final.value[index] = result.value));
      }
      const $ZodArray = $constructor('$ZodArray', (inst, def) => {
        ($ZodType.init(inst, def),
          (inst._zod.parse = (payload, ctx) => {
            const input = payload.value;
            if (!Array.isArray(input))
              return (
                payload.issues.push({ expected: 'array', code: 'invalid_type', input, inst }),
                payload
              );
            payload.value = Array(input.length);
            const proms = [];
            for (let i = 0; i < input.length; i++) {
              const item = input[i],
                result = def.element._zod.run({ value: item, issues: [] }, ctx);
              result instanceof Promise
                ? proms.push(result.then((result) => handleArrayResult(result, payload, i)))
                : handleArrayResult(result, payload, i);
            }
            return proms.length ? Promise.all(proms).then(() => payload) : payload;
          }));
      });
      function handlePropertyResult(result, final, key, input) {
        (result.issues.length && final.issues.push(...core_util.prefixIssues(key, result.issues)),
          void 0 === result.value
            ? key in input && (final.value[key] = void 0)
            : (final.value[key] = result.value));
      }
      function normalizeDef(def) {
        const keys = Object.keys(def.shape);
        for (const k of keys)
          if (!def.shape?.[k]?._zod?.traits?.has('$ZodType'))
            throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
        const okeys = core_util.optionalKeys(def.shape);
        return {
          ...def,
          keys,
          keySet: new Set(keys),
          numKeys: keys.length,
          optionalKeys: new Set(okeys),
        };
      }
      function handleCatchall(proms, input, payload, ctx, def, inst) {
        const unrecognized = [],
          keySet = def.keySet,
          _catchall = def.catchall._zod,
          t = _catchall.def.type;
        for (const key in input) {
          if (keySet.has(key)) continue;
          if ('never' === t) {
            unrecognized.push(key);
            continue;
          }
          const r = _catchall.run({ value: input[key], issues: [] }, ctx);
          r instanceof Promise
            ? proms.push(r.then((r) => handlePropertyResult(r, payload, key, input)))
            : handlePropertyResult(r, payload, key, input);
        }
        return (
          unrecognized.length &&
            payload.issues.push({ code: 'unrecognized_keys', keys: unrecognized, input, inst }),
          proms.length ? Promise.all(proms).then(() => payload) : payload
        );
      }
      const $ZodObject = $constructor('$ZodObject', (inst, def) => {
          $ZodType.init(inst, def);
          const desc = Object.getOwnPropertyDescriptor(def, 'shape');
          if (!desc?.get) {
            const sh = def.shape;
            Object.defineProperty(def, 'shape', {
              get: () => {
                const newSh = { ...sh };
                return (Object.defineProperty(def, 'shape', { value: newSh }), newSh);
              },
            });
          }
          const _normalized = core_util.cached(() => normalizeDef(def));
          core_util.defineLazy(inst._zod, 'propValues', () => {
            const shape = def.shape,
              propValues = {};
            for (const key in shape) {
              const field = shape[key]._zod;
              if (field.values) {
                propValues[key] ?? (propValues[key] = new Set());
                for (const v of field.values) propValues[key].add(v);
              }
            }
            return propValues;
          });
          const isObject = core_util.isObject,
            catchall = def.catchall;
          let value;
          inst._zod.parse = (payload, ctx) => {
            value ?? (value = _normalized.value);
            const input = payload.value;
            if (!isObject(input))
              return (
                payload.issues.push({ expected: 'object', code: 'invalid_type', input, inst }),
                payload
              );
            payload.value = {};
            const proms = [],
              shape = value.shape;
            for (const key of value.keys) {
              const r = shape[key]._zod.run({ value: input[key], issues: [] }, ctx);
              r instanceof Promise
                ? proms.push(r.then((r) => handlePropertyResult(r, payload, key, input)))
                : handlePropertyResult(r, payload, key, input);
            }
            return catchall
              ? handleCatchall(proms, input, payload, ctx, _normalized.value, inst)
              : proms.length
                ? Promise.all(proms).then(() => payload)
                : payload;
          };
        }),
        $ZodObjectJIT = $constructor('$ZodObjectJIT', (inst, def) => {
          $ZodObject.init(inst, def);
          const superParse = inst._zod.parse,
            _normalized = core_util.cached(() => normalizeDef(def));
          let fastpass;
          const isObject = core_util.isObject,
            jit = !globalConfig.jitless,
            allowsEval = core_util.allowsEval,
            fastEnabled = jit && allowsEval.value,
            catchall = def.catchall;
          let value;
          inst._zod.parse = (payload, ctx) => {
            value ?? (value = _normalized.value);
            const input = payload.value;
            return isObject(input)
              ? jit && fastEnabled && !1 === ctx?.async && !0 !== ctx.jitless
                ? (fastpass ||
                    (fastpass = ((shape) => {
                      const doc = new Doc(['shape', 'payload', 'ctx']),
                        normalized = _normalized.value,
                        parseStr = (key) => {
                          const k = core_util.esc(key);
                          return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
                        };
                      doc.write('const input = payload.value;');
                      const ids = Object.create(null);
                      let counter = 0;
                      for (const key of normalized.keys) ids[key] = 'key_' + counter++;
                      doc.write('const newResult = {};');
                      for (const key of normalized.keys) {
                        const id = ids[key],
                          k = core_util.esc(key);
                        (doc.write(`const ${id} = ${parseStr(key)};`),
                          doc.write(
                            `\n        if (${id}.issues.length) {\n          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({\n            ...iss,\n            path: iss.path ? [${k}, ...iss.path] : [${k}]\n          })));\n        }\n        \n        \n        if (${id}.value === undefined) {\n          if (${k} in input) {\n            newResult[${k}] = undefined;\n          }\n        } else {\n          newResult[${k}] = ${id}.value;\n        }\n        \n      `
                          ));
                      }
                      (doc.write('payload.value = newResult;'), doc.write('return payload;'));
                      const fn = doc.compile();
                      return (payload, ctx) => fn(shape, payload, ctx);
                    })(def.shape)),
                  (payload = fastpass(payload, ctx)),
                  catchall ? handleCatchall([], input, payload, ctx, value, inst) : payload)
                : superParse(payload, ctx)
              : (payload.issues.push({ expected: 'object', code: 'invalid_type', input, inst }),
                payload);
          };
        });
      function handleUnionResults(results, final, inst, ctx) {
        for (const result of results)
          if (0 === result.issues.length) return ((final.value = result.value), final);
        const nonaborted = results.filter((r) => !core_util.aborted(r));
        return 1 === nonaborted.length
          ? ((final.value = nonaborted[0].value), nonaborted[0])
          : (final.issues.push({
              code: 'invalid_union',
              input: final.value,
              inst,
              errors: results.map((result) =>
                result.issues.map((iss) => core_util.finalizeIssue(iss, ctx, config()))
              ),
            }),
            final);
      }
      const $ZodUnion = $constructor('$ZodUnion', (inst, def) => {
        ($ZodType.init(inst, def),
          core_util.defineLazy(inst._zod, 'optin', () =>
            def.options.some((o) => 'optional' === o._zod.optin) ? 'optional' : void 0
          ),
          core_util.defineLazy(inst._zod, 'optout', () =>
            def.options.some((o) => 'optional' === o._zod.optout) ? 'optional' : void 0
          ),
          core_util.defineLazy(inst._zod, 'values', () => {
            if (def.options.every((o) => o._zod.values))
              return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
          }),
          core_util.defineLazy(inst._zod, 'pattern', () => {
            if (def.options.every((o) => o._zod.pattern)) {
              const patterns = def.options.map((o) => o._zod.pattern);
              return new RegExp(
                `^(${patterns.map((p) => core_util.cleanRegex(p.source)).join('|')})$`
              );
            }
          }));
        const single = 1 === def.options.length,
          first = def.options[0]._zod.run;
        inst._zod.parse = (payload, ctx) => {
          if (single) return first(payload, ctx);
          let async = !1;
          const results = [];
          for (const option of def.options) {
            const result = option._zod.run({ value: payload.value, issues: [] }, ctx);
            if (result instanceof Promise) (results.push(result), (async = !0));
            else {
              if (0 === result.issues.length) return result;
              results.push(result);
            }
          }
          return async
            ? Promise.all(results).then((results) =>
                handleUnionResults(results, payload, inst, ctx)
              )
            : handleUnionResults(results, payload, inst, ctx);
        };
      });
      function handleExclusiveUnionResults(results, final, inst, ctx) {
        const successes = results.filter((r) => 0 === r.issues.length);
        return 1 === successes.length
          ? ((final.value = successes[0].value), final)
          : (0 === successes.length
              ? final.issues.push({
                  code: 'invalid_union',
                  input: final.value,
                  inst,
                  errors: results.map((result) =>
                    result.issues.map((iss) => core_util.finalizeIssue(iss, ctx, config()))
                  ),
                })
              : final.issues.push({
                  code: 'invalid_union',
                  input: final.value,
                  inst,
                  errors: [],
                  inclusive: !1,
                }),
            final);
      }
      const $ZodXor = $constructor('$ZodXor', (inst, def) => {
          ($ZodUnion.init(inst, def), (def.inclusive = !1));
          const single = 1 === def.options.length,
            first = def.options[0]._zod.run;
          inst._zod.parse = (payload, ctx) => {
            if (single) return first(payload, ctx);
            let async = !1;
            const results = [];
            for (const option of def.options) {
              const result = option._zod.run({ value: payload.value, issues: [] }, ctx);
              result instanceof Promise
                ? (results.push(result), (async = !0))
                : results.push(result);
            }
            return async
              ? Promise.all(results).then((results) =>
                  handleExclusiveUnionResults(results, payload, inst, ctx)
                )
              : handleExclusiveUnionResults(results, payload, inst, ctx);
          };
        }),
        $ZodDiscriminatedUnion = $constructor('$ZodDiscriminatedUnion', (inst, def) => {
          ((def.inclusive = !1), $ZodUnion.init(inst, def));
          const _super = inst._zod.parse;
          core_util.defineLazy(inst._zod, 'propValues', () => {
            const propValues = {};
            for (const option of def.options) {
              const pv = option._zod.propValues;
              if (!pv || 0 === Object.keys(pv).length)
                throw new Error(
                  `Invalid discriminated union option at index "${def.options.indexOf(option)}"`
                );
              for (const [k, v] of Object.entries(pv)) {
                propValues[k] || (propValues[k] = new Set());
                for (const val of v) propValues[k].add(val);
              }
            }
            return propValues;
          });
          const disc = core_util.cached(() => {
            const opts = def.options,
              map = new Map();
            for (const o of opts) {
              const values = o._zod.propValues?.[def.discriminator];
              if (!values || 0 === values.size)
                throw new Error(
                  `Invalid discriminated union option at index "${def.options.indexOf(o)}"`
                );
              for (const v of values) {
                if (map.has(v)) throw new Error(`Duplicate discriminator value "${String(v)}"`);
                map.set(v, o);
              }
            }
            return map;
          });
          inst._zod.parse = (payload, ctx) => {
            const input = payload.value;
            if (!core_util.isObject(input))
              return (
                payload.issues.push({ code: 'invalid_type', expected: 'object', input, inst }),
                payload
              );
            const opt = disc.value.get(input?.[def.discriminator]);
            return opt
              ? opt._zod.run(payload, ctx)
              : def.unionFallback
                ? _super(payload, ctx)
                : (payload.issues.push({
                    code: 'invalid_union',
                    errors: [],
                    note: 'No matching discriminator',
                    discriminator: def.discriminator,
                    input,
                    path: [def.discriminator],
                    inst,
                  }),
                  payload);
          };
        }),
        $ZodIntersection = $constructor('$ZodIntersection', (inst, def) => {
          ($ZodType.init(inst, def),
            (inst._zod.parse = (payload, ctx) => {
              const input = payload.value,
                left = def.left._zod.run({ value: input, issues: [] }, ctx),
                right = def.right._zod.run({ value: input, issues: [] }, ctx);
              return left instanceof Promise || right instanceof Promise
                ? Promise.all([left, right]).then(([left, right]) =>
                    handleIntersectionResults(payload, left, right)
                  )
                : handleIntersectionResults(payload, left, right);
            }));
        });
      function mergeValues(a, b) {
        if (a === b) return { valid: !0, data: a };
        if (a instanceof Date && b instanceof Date && +a === +b) return { valid: !0, data: a };
        if (core_util.isPlainObject(a) && core_util.isPlainObject(b)) {
          const bKeys = Object.keys(b),
            sharedKeys = Object.keys(a).filter((key) => -1 !== bKeys.indexOf(key)),
            newObj = { ...a, ...b };
          for (const key of sharedKeys) {
            const sharedValue = mergeValues(a[key], b[key]);
            if (!sharedValue.valid)
              return { valid: !1, mergeErrorPath: [key, ...sharedValue.mergeErrorPath] };
            newObj[key] = sharedValue.data;
          }
          return { valid: !0, data: newObj };
        }
        if (Array.isArray(a) && Array.isArray(b)) {
          if (a.length !== b.length) return { valid: !1, mergeErrorPath: [] };
          const newArray = [];
          for (let index = 0; index < a.length; index++) {
            const sharedValue = mergeValues(a[index], b[index]);
            if (!sharedValue.valid)
              return { valid: !1, mergeErrorPath: [index, ...sharedValue.mergeErrorPath] };
            newArray.push(sharedValue.data);
          }
          return { valid: !0, data: newArray };
        }
        return { valid: !1, mergeErrorPath: [] };
      }
      function handleIntersectionResults(result, left, right) {
        if (
          (left.issues.length && result.issues.push(...left.issues),
          right.issues.length && result.issues.push(...right.issues),
          core_util.aborted(result))
        )
          return result;
        const merged = mergeValues(left.value, right.value);
        if (!merged.valid)
          throw new Error(
            `Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`
          );
        return ((result.value = merged.data), result);
      }
      const $ZodTuple = $constructor('$ZodTuple', (inst, def) => {
        $ZodType.init(inst, def);
        const items = def.items;
        inst._zod.parse = (payload, ctx) => {
          const input = payload.value;
          if (!Array.isArray(input))
            return (
              payload.issues.push({ input, inst, expected: 'tuple', code: 'invalid_type' }),
              payload
            );
          payload.value = [];
          const proms = [],
            reversedIndex = [...items]
              .reverse()
              .findIndex((item) => 'optional' !== item._zod.optin),
            optStart = -1 === reversedIndex ? 0 : items.length - reversedIndex;
          if (!def.rest) {
            const tooBig = input.length > items.length,
              tooSmall = input.length < optStart - 1;
            if (tooBig || tooSmall)
              return (
                payload.issues.push({
                  ...(tooBig
                    ? { code: 'too_big', maximum: items.length }
                    : { code: 'too_small', minimum: items.length }),
                  input,
                  inst,
                  origin: 'array',
                }),
                payload
              );
          }
          let i = -1;
          for (const item of items) {
            if ((i++, i >= input.length && i >= optStart)) continue;
            const result = item._zod.run({ value: input[i], issues: [] }, ctx);
            result instanceof Promise
              ? proms.push(result.then((result) => handleTupleResult(result, payload, i)))
              : handleTupleResult(result, payload, i);
          }
          if (def.rest) {
            const rest = input.slice(items.length);
            for (const el of rest) {
              i++;
              const result = def.rest._zod.run({ value: el, issues: [] }, ctx);
              result instanceof Promise
                ? proms.push(result.then((result) => handleTupleResult(result, payload, i)))
                : handleTupleResult(result, payload, i);
            }
          }
          return proms.length ? Promise.all(proms).then(() => payload) : payload;
        };
      });
      function handleTupleResult(result, final, index) {
        (result.issues.length && final.issues.push(...core_util.prefixIssues(index, result.issues)),
          (final.value[index] = result.value));
      }
      const $ZodRecord = $constructor('$ZodRecord', (inst, def) => {
          ($ZodType.init(inst, def),
            (inst._zod.parse = (payload, ctx) => {
              const input = payload.value;
              if (!core_util.isPlainObject(input))
                return (
                  payload.issues.push({ expected: 'record', code: 'invalid_type', input, inst }),
                  payload
                );
              const proms = [],
                values = def.keyType._zod.values;
              if (values) {
                payload.value = {};
                const recordKeys = new Set();
                for (const key of values)
                  if ('string' == typeof key || 'number' == typeof key || 'symbol' == typeof key) {
                    recordKeys.add('number' == typeof key ? key.toString() : key);
                    const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
                    result instanceof Promise
                      ? proms.push(
                          result.then((result) => {
                            (result.issues.length &&
                              payload.issues.push(...core_util.prefixIssues(key, result.issues)),
                              (payload.value[key] = result.value));
                          })
                        )
                      : (result.issues.length &&
                          payload.issues.push(...core_util.prefixIssues(key, result.issues)),
                        (payload.value[key] = result.value));
                  }
                let unrecognized;
                for (const key in input)
                  recordKeys.has(key) ||
                    ((unrecognized = unrecognized ?? []), unrecognized.push(key));
                unrecognized &&
                  unrecognized.length > 0 &&
                  payload.issues.push({
                    code: 'unrecognized_keys',
                    input,
                    inst,
                    keys: unrecognized,
                  });
              } else {
                payload.value = {};
                for (const key of Reflect.ownKeys(input)) {
                  if ('__proto__' === key) continue;
                  const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
                  if (keyResult instanceof Promise)
                    throw new Error('Async schemas not supported in object keys currently');
                  if (keyResult.issues.length) {
                    'loose' === def.mode
                      ? (payload.value[key] = input[key])
                      : payload.issues.push({
                          code: 'invalid_key',
                          origin: 'record',
                          issues: keyResult.issues.map((iss) =>
                            core_util.finalizeIssue(iss, ctx, config())
                          ),
                          input: key,
                          path: [key],
                          inst,
                        });
                    continue;
                  }
                  const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
                  result instanceof Promise
                    ? proms.push(
                        result.then((result) => {
                          (result.issues.length &&
                            payload.issues.push(...core_util.prefixIssues(key, result.issues)),
                            (payload.value[keyResult.value] = result.value));
                        })
                      )
                    : (result.issues.length &&
                        payload.issues.push(...core_util.prefixIssues(key, result.issues)),
                      (payload.value[keyResult.value] = result.value));
                }
              }
              return proms.length ? Promise.all(proms).then(() => payload) : payload;
            }));
        }),
        $ZodMap = $constructor('$ZodMap', (inst, def) => {
          ($ZodType.init(inst, def),
            (inst._zod.parse = (payload, ctx) => {
              const input = payload.value;
              if (!(input instanceof Map))
                return (
                  payload.issues.push({ expected: 'map', code: 'invalid_type', input, inst }),
                  payload
                );
              const proms = [];
              payload.value = new Map();
              for (const [key, value] of input) {
                const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx),
                  valueResult = def.valueType._zod.run({ value, issues: [] }, ctx);
                keyResult instanceof Promise || valueResult instanceof Promise
                  ? proms.push(
                      Promise.all([keyResult, valueResult]).then(([keyResult, valueResult]) => {
                        handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
                      })
                    )
                  : handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
              }
              return proms.length ? Promise.all(proms).then(() => payload) : payload;
            }));
        });
      function handleMapResult(keyResult, valueResult, final, key, input, inst, ctx) {
        (keyResult.issues.length &&
          (core_util.propertyKeyTypes.has(typeof key)
            ? final.issues.push(...core_util.prefixIssues(key, keyResult.issues))
            : final.issues.push({
                code: 'invalid_key',
                origin: 'map',
                input,
                inst,
                issues: keyResult.issues.map((iss) => core_util.finalizeIssue(iss, ctx, config())),
              })),
          valueResult.issues.length &&
            (core_util.propertyKeyTypes.has(typeof key)
              ? final.issues.push(...core_util.prefixIssues(key, valueResult.issues))
              : final.issues.push({
                  origin: 'map',
                  code: 'invalid_element',
                  input,
                  inst,
                  key,
                  issues: valueResult.issues.map((iss) =>
                    core_util.finalizeIssue(iss, ctx, config())
                  ),
                })),
          final.value.set(keyResult.value, valueResult.value));
      }
      const $ZodSet = $constructor('$ZodSet', (inst, def) => {
        ($ZodType.init(inst, def),
          (inst._zod.parse = (payload, ctx) => {
            const input = payload.value;
            if (!(input instanceof Set))
              return (
                payload.issues.push({ input, inst, expected: 'set', code: 'invalid_type' }),
                payload
              );
            const proms = [];
            payload.value = new Set();
            for (const item of input) {
              const result = def.valueType._zod.run({ value: item, issues: [] }, ctx);
              result instanceof Promise
                ? proms.push(result.then((result) => handleSetResult(result, payload)))
                : handleSetResult(result, payload);
            }
            return proms.length ? Promise.all(proms).then(() => payload) : payload;
          }));
      });
      function handleSetResult(result, final) {
        (result.issues.length && final.issues.push(...result.issues),
          final.value.add(result.value));
      }
      const $ZodEnum = $constructor('$ZodEnum', (inst, def) => {
          $ZodType.init(inst, def);
          const values = core_util.getEnumValues(def.entries),
            valuesSet = new Set(values);
          ((inst._zod.values = valuesSet),
            (inst._zod.pattern = new RegExp(
              `^(${values
                .filter((k) => core_util.propertyKeyTypes.has(typeof k))
                .map((o) => ('string' == typeof o ? core_util.escapeRegex(o) : o.toString()))
                .join('|')})$`
            )),
            (inst._zod.parse = (payload, _ctx) => {
              const input = payload.value;
              return (
                valuesSet.has(input) ||
                  payload.issues.push({ code: 'invalid_value', values, input, inst }),
                payload
              );
            }));
        }),
        $ZodLiteral = $constructor('$ZodLiteral', (inst, def) => {
          if (($ZodType.init(inst, def), 0 === def.values.length))
            throw new Error('Cannot create literal schema with no valid values');
          const values = new Set(def.values);
          ((inst._zod.values = values),
            (inst._zod.pattern = new RegExp(
              `^(${def.values.map((o) => ('string' == typeof o ? core_util.escapeRegex(o) : o ? core_util.escapeRegex(o.toString()) : String(o))).join('|')})$`
            )),
            (inst._zod.parse = (payload, _ctx) => {
              const input = payload.value;
              return (
                values.has(input) ||
                  payload.issues.push({ code: 'invalid_value', values: def.values, input, inst }),
                payload
              );
            }));
        }),
        $ZodFile = $constructor('$ZodFile', (inst, def) => {
          ($ZodType.init(inst, def),
            (inst._zod.parse = (payload, _ctx) => {
              const input = payload.value;
              return (
                input instanceof File ||
                  payload.issues.push({ expected: 'file', code: 'invalid_type', input, inst }),
                payload
              );
            }));
        }),
        $ZodTransform = $constructor('$ZodTransform', (inst, def) => {
          ($ZodType.init(inst, def),
            (inst._zod.parse = (payload, ctx) => {
              if ('backward' === ctx.direction) throw new $ZodEncodeError(inst.constructor.name);
              const _out = def.transform(payload.value, payload);
              if (ctx.async) {
                return (_out instanceof Promise ? _out : Promise.resolve(_out)).then(
                  (output) => ((payload.value = output), payload)
                );
              }
              if (_out instanceof Promise) throw new $ZodAsyncError();
              return ((payload.value = _out), payload);
            }));
        });
      function handleOptionalResult(result, input) {
        return result.issues.length && void 0 === input ? { issues: [], value: void 0 } : result;
      }
      const $ZodOptional = $constructor('$ZodOptional', (inst, def) => {
          ($ZodType.init(inst, def),
            (inst._zod.optin = 'optional'),
            (inst._zod.optout = 'optional'),
            core_util.defineLazy(inst._zod, 'values', () =>
              def.innerType._zod.values ? new Set([...def.innerType._zod.values, void 0]) : void 0
            ),
            core_util.defineLazy(inst._zod, 'pattern', () => {
              const pattern = def.innerType._zod.pattern;
              return pattern ? new RegExp(`^(${core_util.cleanRegex(pattern.source)})?$`) : void 0;
            }),
            (inst._zod.parse = (payload, ctx) => {
              if ('optional' === def.innerType._zod.optin) {
                const result = def.innerType._zod.run(payload, ctx);
                return result instanceof Promise
                  ? result.then((r) => handleOptionalResult(r, payload.value))
                  : handleOptionalResult(result, payload.value);
              }
              return void 0 === payload.value ? payload : def.innerType._zod.run(payload, ctx);
            }));
        }),
        $ZodNullable = $constructor('$ZodNullable', (inst, def) => {
          ($ZodType.init(inst, def),
            core_util.defineLazy(inst._zod, 'optin', () => def.innerType._zod.optin),
            core_util.defineLazy(inst._zod, 'optout', () => def.innerType._zod.optout),
            core_util.defineLazy(inst._zod, 'pattern', () => {
              const pattern = def.innerType._zod.pattern;
              return pattern
                ? new RegExp(`^(${core_util.cleanRegex(pattern.source)}|null)$`)
                : void 0;
            }),
            core_util.defineLazy(inst._zod, 'values', () =>
              def.innerType._zod.values ? new Set([...def.innerType._zod.values, null]) : void 0
            ),
            (inst._zod.parse = (payload, ctx) =>
              null === payload.value ? payload : def.innerType._zod.run(payload, ctx)));
        }),
        $ZodDefault = $constructor('$ZodDefault', (inst, def) => {
          ($ZodType.init(inst, def),
            (inst._zod.optin = 'optional'),
            core_util.defineLazy(inst._zod, 'values', () => def.innerType._zod.values),
            (inst._zod.parse = (payload, ctx) => {
              if ('backward' === ctx.direction) return def.innerType._zod.run(payload, ctx);
              if (void 0 === payload.value) return ((payload.value = def.defaultValue), payload);
              const result = def.innerType._zod.run(payload, ctx);
              return result instanceof Promise
                ? result.then((result) => handleDefaultResult(result, def))
                : handleDefaultResult(result, def);
            }));
        });
      function handleDefaultResult(payload, def) {
        return (void 0 === payload.value && (payload.value = def.defaultValue), payload);
      }
      const $ZodPrefault = $constructor('$ZodPrefault', (inst, def) => {
          ($ZodType.init(inst, def),
            (inst._zod.optin = 'optional'),
            core_util.defineLazy(inst._zod, 'values', () => def.innerType._zod.values),
            (inst._zod.parse = (payload, ctx) => (
              'backward' === ctx.direction ||
                (void 0 === payload.value && (payload.value = def.defaultValue)),
              def.innerType._zod.run(payload, ctx)
            )));
        }),
        $ZodNonOptional = $constructor('$ZodNonOptional', (inst, def) => {
          ($ZodType.init(inst, def),
            core_util.defineLazy(inst._zod, 'values', () => {
              const v = def.innerType._zod.values;
              return v ? new Set([...v].filter((x) => void 0 !== x)) : void 0;
            }),
            (inst._zod.parse = (payload, ctx) => {
              const result = def.innerType._zod.run(payload, ctx);
              return result instanceof Promise
                ? result.then((result) => handleNonOptionalResult(result, inst))
                : handleNonOptionalResult(result, inst);
            }));
        });
      function handleNonOptionalResult(payload, inst) {
        return (
          payload.issues.length ||
            void 0 !== payload.value ||
            payload.issues.push({
              code: 'invalid_type',
              expected: 'nonoptional',
              input: payload.value,
              inst,
            }),
          payload
        );
      }
      const $ZodSuccess = $constructor('$ZodSuccess', (inst, def) => {
          ($ZodType.init(inst, def),
            (inst._zod.parse = (payload, ctx) => {
              if ('backward' === ctx.direction) throw new $ZodEncodeError('ZodSuccess');
              const result = def.innerType._zod.run(payload, ctx);
              return result instanceof Promise
                ? result.then((result) => ((payload.value = 0 === result.issues.length), payload))
                : ((payload.value = 0 === result.issues.length), payload);
            }));
        }),
        $ZodCatch = $constructor('$ZodCatch', (inst, def) => {
          ($ZodType.init(inst, def),
            core_util.defineLazy(inst._zod, 'optin', () => def.innerType._zod.optin),
            core_util.defineLazy(inst._zod, 'optout', () => def.innerType._zod.optout),
            core_util.defineLazy(inst._zod, 'values', () => def.innerType._zod.values),
            (inst._zod.parse = (payload, ctx) => {
              if ('backward' === ctx.direction) return def.innerType._zod.run(payload, ctx);
              const result = def.innerType._zod.run(payload, ctx);
              return result instanceof Promise
                ? result.then(
                    (result) => (
                      (payload.value = result.value),
                      result.issues.length &&
                        ((payload.value = def.catchValue({
                          ...payload,
                          error: {
                            issues: result.issues.map((iss) =>
                              core_util.finalizeIssue(iss, ctx, config())
                            ),
                          },
                          input: payload.value,
                        })),
                        (payload.issues = [])),
                      payload
                    )
                  )
                : ((payload.value = result.value),
                  result.issues.length &&
                    ((payload.value = def.catchValue({
                      ...payload,
                      error: {
                        issues: result.issues.map((iss) =>
                          core_util.finalizeIssue(iss, ctx, config())
                        ),
                      },
                      input: payload.value,
                    })),
                    (payload.issues = [])),
                  payload);
            }));
        }),
        $ZodNaN = $constructor('$ZodNaN', (inst, def) => {
          ($ZodType.init(inst, def),
            (inst._zod.parse = (payload, _ctx) => (
              ('number' == typeof payload.value && Number.isNaN(payload.value)) ||
                payload.issues.push({
                  input: payload.value,
                  inst,
                  expected: 'nan',
                  code: 'invalid_type',
                }),
              payload
            )));
        }),
        $ZodPipe = $constructor('$ZodPipe', (inst, def) => {
          ($ZodType.init(inst, def),
            core_util.defineLazy(inst._zod, 'values', () => def.in._zod.values),
            core_util.defineLazy(inst._zod, 'optin', () => def.in._zod.optin),
            core_util.defineLazy(inst._zod, 'optout', () => def.out._zod.optout),
            core_util.defineLazy(inst._zod, 'propValues', () => def.in._zod.propValues),
            (inst._zod.parse = (payload, ctx) => {
              if ('backward' === ctx.direction) {
                const right = def.out._zod.run(payload, ctx);
                return right instanceof Promise
                  ? right.then((right) => handlePipeResult(right, def.in, ctx))
                  : handlePipeResult(right, def.in, ctx);
              }
              const left = def.in._zod.run(payload, ctx);
              return left instanceof Promise
                ? left.then((left) => handlePipeResult(left, def.out, ctx))
                : handlePipeResult(left, def.out, ctx);
            }));
        });
      function handlePipeResult(left, next, ctx) {
        return left.issues.length
          ? ((left.aborted = !0), left)
          : next._zod.run({ value: left.value, issues: left.issues }, ctx);
      }
      const $ZodCodec = $constructor('$ZodCodec', (inst, def) => {
        ($ZodType.init(inst, def),
          core_util.defineLazy(inst._zod, 'values', () => def.in._zod.values),
          core_util.defineLazy(inst._zod, 'optin', () => def.in._zod.optin),
          core_util.defineLazy(inst._zod, 'optout', () => def.out._zod.optout),
          core_util.defineLazy(inst._zod, 'propValues', () => def.in._zod.propValues),
          (inst._zod.parse = (payload, ctx) => {
            if ('forward' === (ctx.direction || 'forward')) {
              const left = def.in._zod.run(payload, ctx);
              return left instanceof Promise
                ? left.then((left) => handleCodecAResult(left, def, ctx))
                : handleCodecAResult(left, def, ctx);
            }
            {
              const right = def.out._zod.run(payload, ctx);
              return right instanceof Promise
                ? right.then((right) => handleCodecAResult(right, def, ctx))
                : handleCodecAResult(right, def, ctx);
            }
          }));
      });
      function handleCodecAResult(result, def, ctx) {
        if (result.issues.length) return ((result.aborted = !0), result);
        if ('forward' === (ctx.direction || 'forward')) {
          const transformed = def.transform(result.value, result);
          return transformed instanceof Promise
            ? transformed.then((value) => handleCodecTxResult(result, value, def.out, ctx))
            : handleCodecTxResult(result, transformed, def.out, ctx);
        }
        {
          const transformed = def.reverseTransform(result.value, result);
          return transformed instanceof Promise
            ? transformed.then((value) => handleCodecTxResult(result, value, def.in, ctx))
            : handleCodecTxResult(result, transformed, def.in, ctx);
        }
      }
      function handleCodecTxResult(left, value, nextSchema, ctx) {
        return left.issues.length
          ? ((left.aborted = !0), left)
          : nextSchema._zod.run({ value, issues: left.issues }, ctx);
      }
      const $ZodReadonly = $constructor('$ZodReadonly', (inst, def) => {
        ($ZodType.init(inst, def),
          core_util.defineLazy(inst._zod, 'propValues', () => def.innerType._zod.propValues),
          core_util.defineLazy(inst._zod, 'values', () => def.innerType._zod.values),
          core_util.defineLazy(inst._zod, 'optin', () => def.innerType?._zod?.optin),
          core_util.defineLazy(inst._zod, 'optout', () => def.innerType?._zod?.optout),
          (inst._zod.parse = (payload, ctx) => {
            if ('backward' === ctx.direction) return def.innerType._zod.run(payload, ctx);
            const result = def.innerType._zod.run(payload, ctx);
            return result instanceof Promise
              ? result.then(handleReadonlyResult)
              : handleReadonlyResult(result);
          }));
      });
      function handleReadonlyResult(payload) {
        return ((payload.value = Object.freeze(payload.value)), payload);
      }
      const $ZodTemplateLiteral = $constructor('$ZodTemplateLiteral', (inst, def) => {
          $ZodType.init(inst, def);
          const regexParts = [];
          for (const part of def.parts)
            if ('object' == typeof part && null !== part) {
              if (!part._zod.pattern)
                throw new Error(
                  `Invalid template literal part, no pattern found: ${[...part._zod.traits].shift()}`
                );
              const source =
                part._zod.pattern instanceof RegExp ? part._zod.pattern.source : part._zod.pattern;
              if (!source) throw new Error(`Invalid template literal part: ${part._zod.traits}`);
              const start = source.startsWith('^') ? 1 : 0,
                end = source.endsWith('$') ? source.length - 1 : source.length;
              regexParts.push(source.slice(start, end));
            } else {
              if (null !== part && !core_util.primitiveTypes.has(typeof part))
                throw new Error(`Invalid template literal part: ${part}`);
              regexParts.push(core_util.escapeRegex(`${part}`));
            }
          ((inst._zod.pattern = new RegExp(`^${regexParts.join('')}$`)),
            (inst._zod.parse = (payload, _ctx) =>
              'string' != typeof payload.value
                ? (payload.issues.push({
                    input: payload.value,
                    inst,
                    expected: 'template_literal',
                    code: 'invalid_type',
                  }),
                  payload)
                : ((inst._zod.pattern.lastIndex = 0),
                  inst._zod.pattern.test(payload.value) ||
                    payload.issues.push({
                      input: payload.value,
                      inst,
                      code: 'invalid_format',
                      format: def.format ?? 'template_literal',
                      pattern: inst._zod.pattern.source,
                    }),
                  payload)));
        }),
        $ZodFunction = $constructor(
          '$ZodFunction',
          (inst, def) => (
            $ZodType.init(inst, def),
            (inst._def = def),
            (inst._zod.def = def),
            (inst.implement = (func) => {
              if ('function' != typeof func)
                throw new Error('implement() must be called with a function');
              return function (...args) {
                const parsedArgs = inst._def.input ? parse(inst._def.input, args) : args,
                  result = Reflect.apply(func, this, parsedArgs);
                return inst._def.output ? parse(inst._def.output, result) : result;
              };
            }),
            (inst.implementAsync = (func) => {
              if ('function' != typeof func)
                throw new Error('implementAsync() must be called with a function');
              return async function (...args) {
                const parsedArgs = inst._def.input ? await parseAsync(inst._def.input, args) : args,
                  result = await Reflect.apply(func, this, parsedArgs);
                return inst._def.output ? await parseAsync(inst._def.output, result) : result;
              };
            }),
            (inst._zod.parse = (payload, _ctx) => {
              if ('function' != typeof payload.value)
                return (
                  payload.issues.push({
                    code: 'invalid_type',
                    expected: 'function',
                    input: payload.value,
                    inst,
                  }),
                  payload
                );
              const hasPromiseOutput =
                inst._def.output && 'promise' === inst._def.output._zod.def.type;
              return (
                (payload.value = hasPromiseOutput
                  ? inst.implementAsync(payload.value)
                  : inst.implement(payload.value)),
                payload
              );
            }),
            (inst.input = (...args) => {
              const F = inst.constructor;
              return Array.isArray(args[0])
                ? new F({
                    type: 'function',
                    input: new $ZodTuple({ type: 'tuple', items: args[0], rest: args[1] }),
                    output: inst._def.output,
                  })
                : new F({ type: 'function', input: args[0], output: inst._def.output });
            }),
            (inst.output = (output) =>
              new (0, inst.constructor)({ type: 'function', input: inst._def.input, output })),
            inst
          )
        ),
        $ZodPromise = $constructor('$ZodPromise', (inst, def) => {
          ($ZodType.init(inst, def),
            (inst._zod.parse = (payload, ctx) =>
              Promise.resolve(payload.value).then((inner) =>
                def.innerType._zod.run({ value: inner, issues: [] }, ctx)
              )));
        }),
        $ZodLazy = $constructor('$ZodLazy', (inst, def) => {
          ($ZodType.init(inst, def),
            core_util.defineLazy(inst._zod, 'innerType', () => def.getter()),
            core_util.defineLazy(inst._zod, 'pattern', () => inst._zod.innerType?._zod?.pattern),
            core_util.defineLazy(
              inst._zod,
              'propValues',
              () => inst._zod.innerType?._zod?.propValues
            ),
            core_util.defineLazy(
              inst._zod,
              'optin',
              () => inst._zod.innerType?._zod?.optin ?? void 0
            ),
            core_util.defineLazy(
              inst._zod,
              'optout',
              () => inst._zod.innerType?._zod?.optout ?? void 0
            ),
            (inst._zod.parse = (payload, ctx) => inst._zod.innerType._zod.run(payload, ctx)));
        }),
        $ZodCustom = $constructor('$ZodCustom', (inst, def) => {
          ($ZodCheck.init(inst, def),
            $ZodType.init(inst, def),
            (inst._zod.parse = (payload, _) => payload),
            (inst._zod.check = (payload) => {
              const input = payload.value,
                r = def.fn(input);
              if (r instanceof Promise)
                return r.then((r) => handleRefineResult(r, payload, input, inst));
              handleRefineResult(r, payload, input, inst);
            }));
        });
      function handleRefineResult(result, payload, input, inst) {
        if (!result) {
          const _iss = {
            code: 'custom',
            input,
            inst,
            path: [...(inst._zod.def.path ?? [])],
            continue: !inst._zod.def.abort,
          };
          (inst._zod.def.params && (_iss.params = inst._zod.def.params),
            payload.issues.push(core_util.issue(_iss)));
        }
      }
      __webpack_require__('./node_modules/zod/v4/locales/index.js');
      var registries = __webpack_require__('./node_modules/zod/v4/core/registries.js');
      function _string(Class, params) {
        return new Class({ type: 'string', ...core_util.normalizeParams(params) });
      }
      function _email(Class, params) {
        return new Class({
          type: 'string',
          format: 'email',
          check: 'string_format',
          abort: !1,
          ...core_util.normalizeParams(params),
        });
      }
      function _guid(Class, params) {
        return new Class({
          type: 'string',
          format: 'guid',
          check: 'string_format',
          abort: !1,
          ...core_util.normalizeParams(params),
        });
      }
      function _uuid(Class, params) {
        return new Class({
          type: 'string',
          format: 'uuid',
          check: 'string_format',
          abort: !1,
          ...core_util.normalizeParams(params),
        });
      }
      function _uuidv4(Class, params) {
        return new Class({
          type: 'string',
          format: 'uuid',
          check: 'string_format',
          abort: !1,
          version: 'v4',
          ...core_util.normalizeParams(params),
        });
      }
      function _uuidv6(Class, params) {
        return new Class({
          type: 'string',
          format: 'uuid',
          check: 'string_format',
          abort: !1,
          version: 'v6',
          ...core_util.normalizeParams(params),
        });
      }
      function _uuidv7(Class, params) {
        return new Class({
          type: 'string',
          format: 'uuid',
          check: 'string_format',
          abort: !1,
          version: 'v7',
          ...core_util.normalizeParams(params),
        });
      }
      function _url(Class, params) {
        return new Class({
          type: 'string',
          format: 'url',
          check: 'string_format',
          abort: !1,
          ...core_util.normalizeParams(params),
        });
      }
      function api_emoji(Class, params) {
        return new Class({
          type: 'string',
          format: 'emoji',
          check: 'string_format',
          abort: !1,
          ...core_util.normalizeParams(params),
        });
      }
      function _nanoid(Class, params) {
        return new Class({
          type: 'string',
          format: 'nanoid',
          check: 'string_format',
          abort: !1,
          ...core_util.normalizeParams(params),
        });
      }
      function _cuid(Class, params) {
        return new Class({
          type: 'string',
          format: 'cuid',
          check: 'string_format',
          abort: !1,
          ...core_util.normalizeParams(params),
        });
      }
      function _cuid2(Class, params) {
        return new Class({
          type: 'string',
          format: 'cuid2',
          check: 'string_format',
          abort: !1,
          ...core_util.normalizeParams(params),
        });
      }
      function _ulid(Class, params) {
        return new Class({
          type: 'string',
          format: 'ulid',
          check: 'string_format',
          abort: !1,
          ...core_util.normalizeParams(params),
        });
      }
      function _xid(Class, params) {
        return new Class({
          type: 'string',
          format: 'xid',
          check: 'string_format',
          abort: !1,
          ...core_util.normalizeParams(params),
        });
      }
      function _ksuid(Class, params) {
        return new Class({
          type: 'string',
          format: 'ksuid',
          check: 'string_format',
          abort: !1,
          ...core_util.normalizeParams(params),
        });
      }
      function _ipv4(Class, params) {
        return new Class({
          type: 'string',
          format: 'ipv4',
          check: 'string_format',
          abort: !1,
          ...core_util.normalizeParams(params),
        });
      }
      function _ipv6(Class, params) {
        return new Class({
          type: 'string',
          format: 'ipv6',
          check: 'string_format',
          abort: !1,
          ...core_util.normalizeParams(params),
        });
      }
      function _mac(Class, params) {
        return new Class({
          type: 'string',
          format: 'mac',
          check: 'string_format',
          abort: !1,
          ...core_util.normalizeParams(params),
        });
      }
      function _cidrv4(Class, params) {
        return new Class({
          type: 'string',
          format: 'cidrv4',
          check: 'string_format',
          abort: !1,
          ...core_util.normalizeParams(params),
        });
      }
      function _cidrv6(Class, params) {
        return new Class({
          type: 'string',
          format: 'cidrv6',
          check: 'string_format',
          abort: !1,
          ...core_util.normalizeParams(params),
        });
      }
      function _base64(Class, params) {
        return new Class({
          type: 'string',
          format: 'base64',
          check: 'string_format',
          abort: !1,
          ...core_util.normalizeParams(params),
        });
      }
      function _base64url(Class, params) {
        return new Class({
          type: 'string',
          format: 'base64url',
          check: 'string_format',
          abort: !1,
          ...core_util.normalizeParams(params),
        });
      }
      function _e164(Class, params) {
        return new Class({
          type: 'string',
          format: 'e164',
          check: 'string_format',
          abort: !1,
          ...core_util.normalizeParams(params),
        });
      }
      function _jwt(Class, params) {
        return new Class({
          type: 'string',
          format: 'jwt',
          check: 'string_format',
          abort: !1,
          ...core_util.normalizeParams(params),
        });
      }
      function _isoDateTime(Class, params) {
        return new Class({
          type: 'string',
          format: 'datetime',
          check: 'string_format',
          offset: !1,
          local: !1,
          precision: null,
          ...core_util.normalizeParams(params),
        });
      }
      function _isoDate(Class, params) {
        return new Class({
          type: 'string',
          format: 'date',
          check: 'string_format',
          ...core_util.normalizeParams(params),
        });
      }
      function _isoTime(Class, params) {
        return new Class({
          type: 'string',
          format: 'time',
          check: 'string_format',
          precision: null,
          ...core_util.normalizeParams(params),
        });
      }
      function _isoDuration(Class, params) {
        return new Class({
          type: 'string',
          format: 'duration',
          check: 'string_format',
          ...core_util.normalizeParams(params),
        });
      }
      function _number(Class, params) {
        return new Class({ type: 'number', checks: [], ...core_util.normalizeParams(params) });
      }
      function _int(Class, params) {
        return new Class({
          type: 'number',
          check: 'number_format',
          abort: !1,
          format: 'safeint',
          ...core_util.normalizeParams(params),
        });
      }
      function _float32(Class, params) {
        return new Class({
          type: 'number',
          check: 'number_format',
          abort: !1,
          format: 'float32',
          ...core_util.normalizeParams(params),
        });
      }
      function _float64(Class, params) {
        return new Class({
          type: 'number',
          check: 'number_format',
          abort: !1,
          format: 'float64',
          ...core_util.normalizeParams(params),
        });
      }
      function _int32(Class, params) {
        return new Class({
          type: 'number',
          check: 'number_format',
          abort: !1,
          format: 'int32',
          ...core_util.normalizeParams(params),
        });
      }
      function _uint32(Class, params) {
        return new Class({
          type: 'number',
          check: 'number_format',
          abort: !1,
          format: 'uint32',
          ...core_util.normalizeParams(params),
        });
      }
      function _boolean(Class, params) {
        return new Class({ type: 'boolean', ...core_util.normalizeParams(params) });
      }
      function _bigint(Class, params) {
        return new Class({ type: 'bigint', ...core_util.normalizeParams(params) });
      }
      function _int64(Class, params) {
        return new Class({
          type: 'bigint',
          check: 'bigint_format',
          abort: !1,
          format: 'int64',
          ...core_util.normalizeParams(params),
        });
      }
      function _uint64(Class, params) {
        return new Class({
          type: 'bigint',
          check: 'bigint_format',
          abort: !1,
          format: 'uint64',
          ...core_util.normalizeParams(params),
        });
      }
      function _symbol(Class, params) {
        return new Class({ type: 'symbol', ...core_util.normalizeParams(params) });
      }
      function api_undefined(Class, params) {
        return new Class({ type: 'undefined', ...core_util.normalizeParams(params) });
      }
      function api_null(Class, params) {
        return new Class({ type: 'null', ...core_util.normalizeParams(params) });
      }
      function _any(Class) {
        return new Class({ type: 'any' });
      }
      function _unknown(Class) {
        return new Class({ type: 'unknown' });
      }
      function _never(Class, params) {
        return new Class({ type: 'never', ...core_util.normalizeParams(params) });
      }
      function _void(Class, params) {
        return new Class({ type: 'void', ...core_util.normalizeParams(params) });
      }
      function _date(Class, params) {
        return new Class({ type: 'date', ...core_util.normalizeParams(params) });
      }
      function _nan(Class, params) {
        return new Class({ type: 'nan', ...core_util.normalizeParams(params) });
      }
      function _lt(value, params) {
        return new $ZodCheckLessThan({
          check: 'less_than',
          ...core_util.normalizeParams(params),
          value,
          inclusive: !1,
        });
      }
      function _lte(value, params) {
        return new $ZodCheckLessThan({
          check: 'less_than',
          ...core_util.normalizeParams(params),
          value,
          inclusive: !0,
        });
      }
      function _gt(value, params) {
        return new $ZodCheckGreaterThan({
          check: 'greater_than',
          ...core_util.normalizeParams(params),
          value,
          inclusive: !1,
        });
      }
      function _gte(value, params) {
        return new $ZodCheckGreaterThan({
          check: 'greater_than',
          ...core_util.normalizeParams(params),
          value,
          inclusive: !0,
        });
      }
      function _positive(params) {
        return _gt(0, params);
      }
      function _negative(params) {
        return _lt(0, params);
      }
      function _nonpositive(params) {
        return _lte(0, params);
      }
      function _nonnegative(params) {
        return _gte(0, params);
      }
      function _multipleOf(value, params) {
        return new $ZodCheckMultipleOf({
          check: 'multiple_of',
          ...core_util.normalizeParams(params),
          value,
        });
      }
      function _maxSize(maximum, params) {
        return new $ZodCheckMaxSize({
          check: 'max_size',
          ...core_util.normalizeParams(params),
          maximum,
        });
      }
      function _minSize(minimum, params) {
        return new $ZodCheckMinSize({
          check: 'min_size',
          ...core_util.normalizeParams(params),
          minimum,
        });
      }
      function _size(size, params) {
        return new $ZodCheckSizeEquals({
          check: 'size_equals',
          ...core_util.normalizeParams(params),
          size,
        });
      }
      function _maxLength(maximum, params) {
        return new $ZodCheckMaxLength({
          check: 'max_length',
          ...core_util.normalizeParams(params),
          maximum,
        });
      }
      function _minLength(minimum, params) {
        return new $ZodCheckMinLength({
          check: 'min_length',
          ...core_util.normalizeParams(params),
          minimum,
        });
      }
      function _length(length, params) {
        return new $ZodCheckLengthEquals({
          check: 'length_equals',
          ...core_util.normalizeParams(params),
          length,
        });
      }
      function _regex(pattern, params) {
        return new $ZodCheckRegex({
          check: 'string_format',
          format: 'regex',
          ...core_util.normalizeParams(params),
          pattern,
        });
      }
      function _lowercase(params) {
        return new $ZodCheckLowerCase({
          check: 'string_format',
          format: 'lowercase',
          ...core_util.normalizeParams(params),
        });
      }
      function _uppercase(params) {
        return new $ZodCheckUpperCase({
          check: 'string_format',
          format: 'uppercase',
          ...core_util.normalizeParams(params),
        });
      }
      function _includes(includes, params) {
        return new $ZodCheckIncludes({
          check: 'string_format',
          format: 'includes',
          ...core_util.normalizeParams(params),
          includes,
        });
      }
      function _startsWith(prefix, params) {
        return new $ZodCheckStartsWith({
          check: 'string_format',
          format: 'starts_with',
          ...core_util.normalizeParams(params),
          prefix,
        });
      }
      function _endsWith(suffix, params) {
        return new $ZodCheckEndsWith({
          check: 'string_format',
          format: 'ends_with',
          ...core_util.normalizeParams(params),
          suffix,
        });
      }
      function _property(property, schema, params) {
        return new $ZodCheckProperty({
          check: 'property',
          property,
          schema,
          ...core_util.normalizeParams(params),
        });
      }
      function _mime(types, params) {
        return new $ZodCheckMimeType({
          check: 'mime_type',
          mime: types,
          ...core_util.normalizeParams(params),
        });
      }
      function _overwrite(tx) {
        return new $ZodCheckOverwrite({ check: 'overwrite', tx });
      }
      function _normalize(form) {
        return _overwrite((input) => input.normalize(form));
      }
      function _trim() {
        return _overwrite((input) => input.trim());
      }
      function _toLowerCase() {
        return _overwrite((input) => input.toLowerCase());
      }
      function _toUpperCase() {
        return _overwrite((input) => input.toUpperCase());
      }
      function _slugify() {
        return _overwrite((input) => core_util.slugify(input));
      }
      function _array(Class, element, params) {
        return new Class({ type: 'array', element, ...core_util.normalizeParams(params) });
      }
      function _file(Class, params) {
        return new Class({ type: 'file', ...core_util.normalizeParams(params) });
      }
      function _custom(Class, fn, _params) {
        const norm = core_util.normalizeParams(_params);
        norm.abort ?? (norm.abort = !0);
        return new Class({ type: 'custom', check: 'custom', fn, ...norm });
      }
      function _refine(Class, fn, _params) {
        return new Class({
          type: 'custom',
          check: 'custom',
          fn,
          ...core_util.normalizeParams(_params),
        });
      }
      function _superRefine(fn) {
        const ch = (function _check(fn, params) {
          const ch = new $ZodCheck({ check: 'custom', ...core_util.normalizeParams(params) });
          return ((ch._zod.check = fn), ch);
        })(
          (payload) => (
            (payload.addIssue = (issue) => {
              if ('string' == typeof issue)
                payload.issues.push(core_util.issue(issue, payload.value, ch._zod.def));
              else {
                const _issue = issue;
                (_issue.fatal && (_issue.continue = !1),
                  _issue.code ?? (_issue.code = 'custom'),
                  _issue.input ?? (_issue.input = payload.value),
                  _issue.inst ?? (_issue.inst = ch),
                  _issue.continue ?? (_issue.continue = !ch._zod.def.abort),
                  payload.issues.push(core_util.issue(_issue)));
              }
            }),
            fn(payload.value, payload)
          )
        );
        return ch;
      }
      function describe(description) {
        const ch = new $ZodCheck({ check: 'describe' });
        return (
          (ch._zod.onattach = [
            (inst) => {
              const existing = registries.fd.get(inst) ?? {};
              registries.fd.add(inst, { ...existing, description });
            },
          ]),
          (ch._zod.check = () => {}),
          ch
        );
      }
      function meta(metadata) {
        const ch = new $ZodCheck({ check: 'meta' });
        return (
          (ch._zod.onattach = [
            (inst) => {
              const existing = registries.fd.get(inst) ?? {};
              registries.fd.add(inst, { ...existing, ...metadata });
            },
          ]),
          (ch._zod.check = () => {}),
          ch
        );
      }
      function _stringbool(Classes, _params) {
        const params = core_util.normalizeParams(_params);
        let truthyArray = params.truthy ?? ['true', '1', 'yes', 'on', 'y', 'enabled'],
          falsyArray = params.falsy ?? ['false', '0', 'no', 'off', 'n', 'disabled'];
        'sensitive' !== params.case &&
          ((truthyArray = truthyArray.map((v) => ('string' == typeof v ? v.toLowerCase() : v))),
          (falsyArray = falsyArray.map((v) => ('string' == typeof v ? v.toLowerCase() : v))));
        const truthySet = new Set(truthyArray),
          falsySet = new Set(falsyArray),
          _Codec = Classes.Codec ?? $ZodCodec,
          _Boolean = Classes.Boolean ?? $ZodBoolean,
          codec = new _Codec({
            type: 'pipe',
            in: new (Classes.String ?? $ZodString)({ type: 'string', error: params.error }),
            out: new _Boolean({ type: 'boolean', error: params.error }),
            transform: (input, payload) => {
              let data = input;
              return (
                'sensitive' !== params.case && (data = data.toLowerCase()),
                !!truthySet.has(data) ||
                  (!falsySet.has(data) &&
                    (payload.issues.push({
                      code: 'invalid_value',
                      expected: 'stringbool',
                      values: [...truthySet, ...falsySet],
                      input: payload.value,
                      inst: codec,
                      continue: !1,
                    }),
                    {}))
              );
            },
            reverseTransform: (input, _payload) =>
              !0 === input ? truthyArray[0] || 'true' : falsyArray[0] || 'false',
            error: params.error,
          });
        return codec;
      }
      function _stringFormat(Class, format, fnOrRegex, _params = {}) {
        const params = core_util.normalizeParams(_params),
          def = {
            ...core_util.normalizeParams(_params),
            check: 'string_format',
            type: 'string',
            format,
            fn: 'function' == typeof fnOrRegex ? fnOrRegex : (val) => fnOrRegex.test(val),
            ...params,
          };
        fnOrRegex instanceof RegExp && (def.pattern = fnOrRegex);
        return new Class(def);
      }
      (__webpack_require__('./node_modules/zod/v4/core/to-json-schema.js'),
        __webpack_require__('./node_modules/zod/v4/core/json-schema-processors.js'));
    },
    './node_modules/zod/v4/core/json-schema-processors.js'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        $X: () => readonlyProcessor,
        $k: () => optionalProcessor,
        A: () => prefaultProcessor,
        A6: () => customProcessor,
        BU: () => undefinedProcessor,
        C0: () => enumProcessor,
        CN: () => tupleProcessor,
        CX: () => promiseProcessor,
        Cv: () => templateLiteralProcessor,
        Ec: () => objectProcessor,
        Fl: () => dateProcessor,
        GC: () => recordProcessor,
        H1: () => fileProcessor,
        In: () => nullProcessor,
        Kj: () => nanProcessor,
        NV: () => unknownProcessor,
        NX: () => anyProcessor,
        Q9: () => catchProcessor,
        RH: () => neverProcessor,
        SW: () => stringProcessor,
        Tr: () => lazyProcessor,
        Wg: () => numberProcessor,
        Y8: () => bigintProcessor,
        Yv: () => literalProcessor,
        aw: () => successProcessor,
        bq: () => functionProcessor,
        cR: () => nonoptionalProcessor,
        cY: () => arrayProcessor,
        dO: () => booleanProcessor,
        fg: () => symbolProcessor,
        fs: () => pipeProcessor,
        iC: () => unionProcessor,
        i_: () => intersectionProcessor,
        jq: () => mapProcessor,
        mh: () => defaultProcessor,
        vn: () => voidProcessor,
        xi: () => transformProcessor,
        yq: () => nullableProcessor,
        zH: () => setProcessor,
      });
      var _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/zod/v4/core/to-json-schema.js'
        ),
        _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/zod/v4/core/util.js'
        );
      const formatMap = {
          guid: 'uuid',
          url: 'uri',
          datetime: 'date-time',
          json_string: 'json-string',
          regex: '',
        },
        stringProcessor = (schema, ctx, _json, _params) => {
          const json = _json;
          json.type = 'string';
          const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
          if (
            ('number' == typeof minimum && (json.minLength = minimum),
            'number' == typeof maximum && (json.maxLength = maximum),
            format &&
              ((json.format = formatMap[format] ?? format),
              '' === json.format && delete json.format),
            contentEncoding && (json.contentEncoding = contentEncoding),
            patterns && patterns.size > 0)
          ) {
            const regexes = [...patterns];
            1 === regexes.length
              ? (json.pattern = regexes[0].source)
              : regexes.length > 1 &&
                (json.allOf = [
                  ...regexes.map((regex) => ({
                    ...('draft-07' === ctx.target ||
                    'draft-04' === ctx.target ||
                    'openapi-3.0' === ctx.target
                      ? { type: 'string' }
                      : {}),
                    pattern: regex.source,
                  })),
                ]);
          }
        },
        numberProcessor = (schema, ctx, _json, _params) => {
          const json = _json,
            { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } =
              schema._zod.bag;
          ('string' == typeof format && format.includes('int')
            ? (json.type = 'integer')
            : (json.type = 'number'),
            'number' == typeof exclusiveMinimum &&
              ('draft-04' === ctx.target || 'openapi-3.0' === ctx.target
                ? ((json.minimum = exclusiveMinimum), (json.exclusiveMinimum = !0))
                : (json.exclusiveMinimum = exclusiveMinimum)),
            'number' == typeof minimum &&
              ((json.minimum = minimum),
              'number' == typeof exclusiveMinimum &&
                'draft-04' !== ctx.target &&
                (exclusiveMinimum >= minimum ? delete json.minimum : delete json.exclusiveMinimum)),
            'number' == typeof exclusiveMaximum &&
              ('draft-04' === ctx.target || 'openapi-3.0' === ctx.target
                ? ((json.maximum = exclusiveMaximum), (json.exclusiveMaximum = !0))
                : (json.exclusiveMaximum = exclusiveMaximum)),
            'number' == typeof maximum &&
              ((json.maximum = maximum),
              'number' == typeof exclusiveMaximum &&
                'draft-04' !== ctx.target &&
                (exclusiveMaximum <= maximum ? delete json.maximum : delete json.exclusiveMaximum)),
            'number' == typeof multipleOf && (json.multipleOf = multipleOf));
        },
        booleanProcessor = (_schema, _ctx, json, _params) => {
          json.type = 'boolean';
        },
        bigintProcessor = (_schema, ctx, _json, _params) => {
          if ('throw' === ctx.unrepresentable)
            throw new Error('BigInt cannot be represented in JSON Schema');
        },
        symbolProcessor = (_schema, ctx, _json, _params) => {
          if ('throw' === ctx.unrepresentable)
            throw new Error('Symbols cannot be represented in JSON Schema');
        },
        nullProcessor = (_schema, ctx, json, _params) => {
          'openapi-3.0' === ctx.target
            ? ((json.type = 'string'), (json.nullable = !0), (json.enum = [null]))
            : (json.type = 'null');
        },
        undefinedProcessor = (_schema, ctx, _json, _params) => {
          if ('throw' === ctx.unrepresentable)
            throw new Error('Undefined cannot be represented in JSON Schema');
        },
        voidProcessor = (_schema, ctx, _json, _params) => {
          if ('throw' === ctx.unrepresentable)
            throw new Error('Void cannot be represented in JSON Schema');
        },
        neverProcessor = (_schema, _ctx, json, _params) => {
          json.not = {};
        },
        anyProcessor = (_schema, _ctx, _json, _params) => {},
        unknownProcessor = (_schema, _ctx, _json, _params) => {},
        dateProcessor = (_schema, ctx, _json, _params) => {
          if ('throw' === ctx.unrepresentable)
            throw new Error('Date cannot be represented in JSON Schema');
        },
        enumProcessor = (schema, _ctx, json, _params) => {
          const def = schema._zod.def,
            values = (0, _util_js__WEBPACK_IMPORTED_MODULE_1__.getEnumValues)(def.entries);
          (values.every((v) => 'number' == typeof v) && (json.type = 'number'),
            values.every((v) => 'string' == typeof v) && (json.type = 'string'),
            (json.enum = values));
        },
        literalProcessor = (schema, ctx, json, _params) => {
          const def = schema._zod.def,
            vals = [];
          for (const val of def.values)
            if (void 0 === val) {
              if ('throw' === ctx.unrepresentable)
                throw new Error('Literal `undefined` cannot be represented in JSON Schema');
            } else if ('bigint' == typeof val) {
              if ('throw' === ctx.unrepresentable)
                throw new Error('BigInt literals cannot be represented in JSON Schema');
              vals.push(Number(val));
            } else vals.push(val);
          if (0 === vals.length);
          else if (1 === vals.length) {
            const val = vals[0];
            ((json.type = null === val ? 'null' : typeof val),
              'draft-04' === ctx.target || 'openapi-3.0' === ctx.target
                ? (json.enum = [val])
                : (json.const = val));
          } else
            (vals.every((v) => 'number' == typeof v) && (json.type = 'number'),
              vals.every((v) => 'string' == typeof v) && (json.type = 'string'),
              vals.every((v) => 'boolean' == typeof v) && (json.type = 'boolean'),
              vals.every((v) => null === v) && (json.type = 'null'),
              (json.enum = vals));
        },
        nanProcessor = (_schema, ctx, _json, _params) => {
          if ('throw' === ctx.unrepresentable)
            throw new Error('NaN cannot be represented in JSON Schema');
        },
        templateLiteralProcessor = (schema, _ctx, json, _params) => {
          const _json = json,
            pattern = schema._zod.pattern;
          if (!pattern) throw new Error('Pattern not found in template literal');
          ((_json.type = 'string'), (_json.pattern = pattern.source));
        },
        fileProcessor = (schema, _ctx, json, _params) => {
          const _json = json,
            file = { type: 'string', format: 'binary', contentEncoding: 'binary' },
            { minimum, maximum, mime } = schema._zod.bag;
          (void 0 !== minimum && (file.minLength = minimum),
            void 0 !== maximum && (file.maxLength = maximum),
            mime
              ? 1 === mime.length
                ? ((file.contentMediaType = mime[0]), Object.assign(_json, file))
                : (_json.anyOf = mime.map((m) => ({ ...file, contentMediaType: m })))
              : Object.assign(_json, file));
        },
        successProcessor = (_schema, _ctx, json, _params) => {
          json.type = 'boolean';
        },
        customProcessor = (_schema, ctx, _json, _params) => {
          if ('throw' === ctx.unrepresentable)
            throw new Error('Custom types cannot be represented in JSON Schema');
        },
        functionProcessor = (_schema, ctx, _json, _params) => {
          if ('throw' === ctx.unrepresentable)
            throw new Error('Function types cannot be represented in JSON Schema');
        },
        transformProcessor = (_schema, ctx, _json, _params) => {
          if ('throw' === ctx.unrepresentable)
            throw new Error('Transforms cannot be represented in JSON Schema');
        },
        mapProcessor = (_schema, ctx, _json, _params) => {
          if ('throw' === ctx.unrepresentable)
            throw new Error('Map cannot be represented in JSON Schema');
        },
        setProcessor = (_schema, ctx, _json, _params) => {
          if ('throw' === ctx.unrepresentable)
            throw new Error('Set cannot be represented in JSON Schema');
        },
        arrayProcessor = (schema, ctx, _json, params) => {
          const json = _json,
            def = schema._zod.def,
            { minimum, maximum } = schema._zod.bag;
          ('number' == typeof minimum && (json.minItems = minimum),
            'number' == typeof maximum && (json.maxItems = maximum),
            (json.type = 'array'),
            (json.items = (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.eh)(
              def.element,
              ctx,
              { ...params, path: [...params.path, 'items'] }
            )));
        },
        objectProcessor = (schema, ctx, _json, params) => {
          const json = _json,
            def = schema._zod.def;
          ((json.type = 'object'), (json.properties = {}));
          const shape = def.shape;
          for (const key in shape)
            json.properties[key] = (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.eh)(
              shape[key],
              ctx,
              { ...params, path: [...params.path, 'properties', key] }
            );
          const allKeys = new Set(Object.keys(shape)),
            requiredKeys = new Set(
              [...allKeys].filter((key) => {
                const v = def.shape[key]._zod;
                return 'input' === ctx.io ? void 0 === v.optin : void 0 === v.optout;
              })
            );
          (requiredKeys.size > 0 && (json.required = Array.from(requiredKeys)),
            'never' === def.catchall?._zod.def.type
              ? (json.additionalProperties = !1)
              : def.catchall
                ? def.catchall &&
                  (json.additionalProperties = (0,
                  _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.eh)(def.catchall, ctx, {
                    ...params,
                    path: [...params.path, 'additionalProperties'],
                  }))
                : 'output' === ctx.io && (json.additionalProperties = !1));
        },
        unionProcessor = (schema, ctx, json, params) => {
          const def = schema._zod.def,
            isExclusive = !1 === def.inclusive,
            options = def.options.map((x, i) =>
              (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.eh)(x, ctx, {
                ...params,
                path: [...params.path, isExclusive ? 'oneOf' : 'anyOf', i],
              })
            );
          isExclusive ? (json.oneOf = options) : (json.anyOf = options);
        },
        intersectionProcessor = (schema, ctx, json, params) => {
          const def = schema._zod.def,
            a = (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.eh)(def.left, ctx, {
              ...params,
              path: [...params.path, 'allOf', 0],
            }),
            b = (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.eh)(def.right, ctx, {
              ...params,
              path: [...params.path, 'allOf', 1],
            }),
            isSimpleIntersection = (val) => 'allOf' in val && 1 === Object.keys(val).length,
            allOf = [
              ...(isSimpleIntersection(a) ? a.allOf : [a]),
              ...(isSimpleIntersection(b) ? b.allOf : [b]),
            ];
          json.allOf = allOf;
        },
        tupleProcessor = (schema, ctx, _json, params) => {
          const json = _json,
            def = schema._zod.def;
          json.type = 'array';
          const prefixPath = 'draft-2020-12' === ctx.target ? 'prefixItems' : 'items',
            restPath =
              'draft-2020-12' === ctx.target || 'openapi-3.0' === ctx.target
                ? 'items'
                : 'additionalItems',
            prefixItems = def.items.map((x, i) =>
              (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.eh)(x, ctx, {
                ...params,
                path: [...params.path, prefixPath, i],
              })
            ),
            rest = def.rest
              ? (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.eh)(def.rest, ctx, {
                  ...params,
                  path: [
                    ...params.path,
                    restPath,
                    ...('openapi-3.0' === ctx.target ? [def.items.length] : []),
                  ],
                })
              : null;
          'draft-2020-12' === ctx.target
            ? ((json.prefixItems = prefixItems), rest && (json.items = rest))
            : 'openapi-3.0' === ctx.target
              ? ((json.items = { anyOf: prefixItems }),
                rest && json.items.anyOf.push(rest),
                (json.minItems = prefixItems.length),
                rest || (json.maxItems = prefixItems.length))
              : ((json.items = prefixItems), rest && (json.additionalItems = rest));
          const { minimum, maximum } = schema._zod.bag;
          ('number' == typeof minimum && (json.minItems = minimum),
            'number' == typeof maximum && (json.maxItems = maximum));
        },
        recordProcessor = (schema, ctx, _json, params) => {
          const json = _json,
            def = schema._zod.def;
          ((json.type = 'object'),
            ('draft-07' !== ctx.target && 'draft-2020-12' !== ctx.target) ||
              (json.propertyNames = (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.eh)(
                def.keyType,
                ctx,
                { ...params, path: [...params.path, 'propertyNames'] }
              )),
            (json.additionalProperties = (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.eh)(
              def.valueType,
              ctx,
              { ...params, path: [...params.path, 'additionalProperties'] }
            )));
        },
        nullableProcessor = (schema, ctx, json, params) => {
          const def = schema._zod.def,
            inner = (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.eh)(
              def.innerType,
              ctx,
              params
            ),
            seen = ctx.seen.get(schema);
          'openapi-3.0' === ctx.target
            ? ((seen.ref = def.innerType), (json.nullable = !0))
            : (json.anyOf = [inner, { type: 'null' }]);
        },
        nonoptionalProcessor = (schema, ctx, _json, params) => {
          const def = schema._zod.def;
          (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.eh)(def.innerType, ctx, params);
          ctx.seen.get(schema).ref = def.innerType;
        },
        defaultProcessor = (schema, ctx, json, params) => {
          const def = schema._zod.def;
          (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.eh)(def.innerType, ctx, params);
          ((ctx.seen.get(schema).ref = def.innerType),
            (json.default = JSON.parse(JSON.stringify(def.defaultValue))));
        },
        prefaultProcessor = (schema, ctx, json, params) => {
          const def = schema._zod.def;
          (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.eh)(def.innerType, ctx, params);
          ((ctx.seen.get(schema).ref = def.innerType),
            'input' === ctx.io && (json._prefault = JSON.parse(JSON.stringify(def.defaultValue))));
        },
        catchProcessor = (schema, ctx, json, params) => {
          const def = schema._zod.def;
          (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.eh)(def.innerType, ctx, params);
          let catchValue;
          ctx.seen.get(schema).ref = def.innerType;
          try {
            catchValue = def.catchValue(void 0);
          } catch {
            throw new Error('Dynamic catch values are not supported in JSON Schema');
          }
          json.default = catchValue;
        },
        pipeProcessor = (schema, ctx, _json, params) => {
          const def = schema._zod.def,
            innerType =
              'input' === ctx.io
                ? 'transform' === def.in._zod.def.type
                  ? def.out
                  : def.in
                : def.out;
          (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.eh)(innerType, ctx, params);
          ctx.seen.get(schema).ref = innerType;
        },
        readonlyProcessor = (schema, ctx, json, params) => {
          const def = schema._zod.def;
          (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.eh)(def.innerType, ctx, params);
          ((ctx.seen.get(schema).ref = def.innerType), (json.readOnly = !0));
        },
        promiseProcessor = (schema, ctx, _json, params) => {
          const def = schema._zod.def;
          (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.eh)(def.innerType, ctx, params);
          ctx.seen.get(schema).ref = def.innerType;
        },
        optionalProcessor = (schema, ctx, _json, params) => {
          const def = schema._zod.def;
          (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.eh)(def.innerType, ctx, params);
          ctx.seen.get(schema).ref = def.innerType;
        },
        lazyProcessor = (schema, ctx, _json, params) => {
          const innerType = schema._zod.innerType;
          (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.eh)(innerType, ctx, params);
          ctx.seen.get(schema).ref = innerType;
        };
    },
    './node_modules/zod/v4/core/registries.js'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      var _a;
      __webpack_require__.d(__webpack_exports__, { fd: () => globalRegistry });
      (Symbol('ZodOutput'), Symbol('ZodInput'));
      class $ZodRegistry {
        constructor() {
          ((this._map = new WeakMap()), (this._idmap = new Map()));
        }
        add(schema, ..._meta) {
          const meta = _meta[0];
          if ((this._map.set(schema, meta), meta && 'object' == typeof meta && 'id' in meta)) {
            if (this._idmap.has(meta.id))
              throw new Error(`ID ${meta.id} already exists in the registry`);
            this._idmap.set(meta.id, schema);
          }
          return this;
        }
        clear() {
          return ((this._map = new WeakMap()), (this._idmap = new Map()), this);
        }
        remove(schema) {
          const meta = this._map.get(schema);
          return (
            meta && 'object' == typeof meta && 'id' in meta && this._idmap.delete(meta.id),
            this._map.delete(schema),
            this
          );
        }
        get(schema) {
          const p = schema._zod.parent;
          if (p) {
            const pm = { ...(this.get(p) ?? {}) };
            delete pm.id;
            const f = { ...pm, ...this._map.get(schema) };
            return Object.keys(f).length ? f : void 0;
          }
          return this._map.get(schema);
        }
        has(schema) {
          return this._map.has(schema);
        }
      }
      (_a = globalThis).__zod_globalRegistry ??
        (_a.__zod_globalRegistry = (function registry() {
          return new $ZodRegistry();
        })());
      const globalRegistry = globalThis.__zod_globalRegistry;
    },
    './node_modules/zod/v4/core/to-json-schema.js'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        OA: () => createToJSONSchemaMethod,
        eh: () => process,
        uE: () => createStandardJSONSchemaMethod,
      });
      var _registries_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        './node_modules/zod/v4/core/registries.js'
      );
      function initializeContext(params) {
        let target = params?.target ?? 'draft-2020-12';
        return (
          'draft-4' === target && (target = 'draft-04'),
          'draft-7' === target && (target = 'draft-07'),
          {
            processors: params.processors ?? {},
            metadataRegistry: params?.metadata ?? _registries_js__WEBPACK_IMPORTED_MODULE_0__.fd,
            target,
            unrepresentable: params?.unrepresentable ?? 'throw',
            override: params?.override ?? (() => {}),
            io: params?.io ?? 'output',
            counter: 0,
            seen: new Map(),
            cycles: params?.cycles ?? 'ref',
            reused: params?.reused ?? 'inline',
            external: params?.external ?? void 0,
          }
        );
      }
      function process(schema, ctx, _params = { path: [], schemaPath: [] }) {
        var _a;
        const def = schema._zod.def,
          seen = ctx.seen.get(schema);
        if (seen) {
          seen.count++;
          return (_params.schemaPath.includes(schema) && (seen.cycle = _params.path), seen.schema);
        }
        const result = { schema: {}, count: 1, cycle: void 0, path: _params.path };
        ctx.seen.set(schema, result);
        const overrideSchema = schema._zod.toJSONSchema?.();
        if (overrideSchema) result.schema = overrideSchema;
        else {
          const params = {
              ..._params,
              schemaPath: [..._params.schemaPath, schema],
              path: _params.path,
            },
            parent = schema._zod.parent;
          if (parent)
            ((result.ref = parent),
              process(parent, ctx, params),
              (ctx.seen.get(parent).isParent = !0));
          else if (schema._zod.processJSONSchema)
            schema._zod.processJSONSchema(ctx, result.schema, params);
          else {
            const _json = result.schema,
              processor = ctx.processors[def.type];
            if (!processor)
              throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
            processor(schema, ctx, _json, params);
          }
        }
        const meta = ctx.metadataRegistry.get(schema);
        (meta && Object.assign(result.schema, meta),
          'input' === ctx.io &&
            isTransforming(schema) &&
            (delete result.schema.examples, delete result.schema.default),
          'input' === ctx.io &&
            result.schema._prefault &&
            ((_a = result.schema).default ?? (_a.default = result.schema._prefault)),
          delete result.schema._prefault);
        return ctx.seen.get(schema).schema;
      }
      function extractDefs(ctx, schema) {
        const root = ctx.seen.get(schema);
        if (!root) throw new Error('Unprocessed schema. This is a bug in Zod.');
        const extractToDef = (entry) => {
          if (entry[1].schema.$ref) return;
          const seen = entry[1],
            { ref, defId } = ((entry) => {
              const defsSegment = 'draft-2020-12' === ctx.target ? '$defs' : 'definitions';
              if (ctx.external) {
                const externalId = ctx.external.registry.get(entry[0])?.id,
                  uriGenerator = ctx.external.uri ?? ((id) => id);
                if (externalId) return { ref: uriGenerator(externalId) };
                const id = entry[1].defId ?? entry[1].schema.id ?? 'schema' + ctx.counter++;
                return (
                  (entry[1].defId = id),
                  { defId: id, ref: `${uriGenerator('__shared')}#/${defsSegment}/${id}` }
                );
              }
              if (entry[1] === root) return { ref: '#' };
              const defUriPrefix = `#/${defsSegment}/`,
                defId = entry[1].schema.id ?? '__schema' + ctx.counter++;
              return { defId, ref: defUriPrefix + defId };
            })(entry);
          ((seen.def = { ...seen.schema }), defId && (seen.defId = defId));
          const schema = seen.schema;
          for (const key in schema) delete schema[key];
          schema.$ref = ref;
        };
        if ('throw' === ctx.cycles)
          for (const entry of ctx.seen.entries()) {
            const seen = entry[1];
            if (seen.cycle)
              throw new Error(
                `Cycle detected: #/${seen.cycle?.join('/')}/<root>\n\nSet the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`
              );
          }
        for (const entry of ctx.seen.entries()) {
          const seen = entry[1];
          if (schema === entry[0]) {
            extractToDef(entry);
            continue;
          }
          if (ctx.external) {
            const ext = ctx.external.registry.get(entry[0])?.id;
            if (schema !== entry[0] && ext) {
              extractToDef(entry);
              continue;
            }
          }
          const id = ctx.metadataRegistry.get(entry[0])?.id;
          id
            ? extractToDef(entry)
            : (seen.cycle || (seen.count > 1 && 'ref' === ctx.reused)) && extractToDef(entry);
        }
      }
      function finalize(ctx, schema) {
        const root = ctx.seen.get(schema);
        if (!root) throw new Error('Unprocessed schema. This is a bug in Zod.');
        const flattenRef = (zodSchema) => {
          const seen = ctx.seen.get(zodSchema),
            schema = seen.def ?? seen.schema,
            _cached = { ...schema };
          if (null === seen.ref) return;
          const ref = seen.ref;
          if (((seen.ref = null), ref)) {
            flattenRef(ref);
            const refSchema = ctx.seen.get(ref).schema;
            !refSchema.$ref ||
            ('draft-07' !== ctx.target && 'draft-04' !== ctx.target && 'openapi-3.0' !== ctx.target)
              ? (Object.assign(schema, refSchema), Object.assign(schema, _cached))
              : ((schema.allOf = schema.allOf ?? []), schema.allOf.push(refSchema));
          }
          seen.isParent || ctx.override({ zodSchema, jsonSchema: schema, path: seen.path ?? [] });
        };
        for (const entry of [...ctx.seen.entries()].reverse()) flattenRef(entry[0]);
        const result = {};
        if (
          ('draft-2020-12' === ctx.target
            ? (result.$schema = 'https://json-schema.org/draft/2020-12/schema')
            : 'draft-07' === ctx.target
              ? (result.$schema = 'http://json-schema.org/draft-07/schema#')
              : 'draft-04' === ctx.target
                ? (result.$schema = 'http://json-schema.org/draft-04/schema#')
                : ctx.target,
          ctx.external?.uri)
        ) {
          const id = ctx.external.registry.get(schema)?.id;
          if (!id) throw new Error('Schema is missing an `id` property');
          result.$id = ctx.external.uri(id);
        }
        Object.assign(result, root.def ?? root.schema);
        const defs = ctx.external?.defs ?? {};
        for (const entry of ctx.seen.entries()) {
          const seen = entry[1];
          seen.def && seen.defId && (defs[seen.defId] = seen.def);
        }
        ctx.external ||
          (Object.keys(defs).length > 0 &&
            ('draft-2020-12' === ctx.target ? (result.$defs = defs) : (result.definitions = defs)));
        try {
          const finalized = JSON.parse(JSON.stringify(result));
          return (
            Object.defineProperty(finalized, '~standard', {
              value: {
                ...schema['~standard'],
                jsonSchema: {
                  input: createStandardJSONSchemaMethod(schema, 'input'),
                  output: createStandardJSONSchemaMethod(schema, 'output'),
                },
              },
              enumerable: !1,
              writable: !1,
            }),
            finalized
          );
        } catch (_err) {
          throw new Error('Error converting schema to JSON.');
        }
      }
      function isTransforming(_schema, _ctx) {
        const ctx = _ctx ?? { seen: new Set() };
        if (ctx.seen.has(_schema)) return !1;
        ctx.seen.add(_schema);
        const def = _schema._zod.def;
        if ('transform' === def.type) return !0;
        if ('array' === def.type) return isTransforming(def.element, ctx);
        if ('set' === def.type) return isTransforming(def.valueType, ctx);
        if ('lazy' === def.type) return isTransforming(def.getter(), ctx);
        if (
          'promise' === def.type ||
          'optional' === def.type ||
          'nonoptional' === def.type ||
          'nullable' === def.type ||
          'readonly' === def.type ||
          'default' === def.type ||
          'prefault' === def.type
        )
          return isTransforming(def.innerType, ctx);
        if ('intersection' === def.type)
          return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
        if ('record' === def.type || 'map' === def.type)
          return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
        if ('pipe' === def.type) return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
        if ('object' === def.type) {
          for (const key in def.shape) if (isTransforming(def.shape[key], ctx)) return !0;
          return !1;
        }
        if ('union' === def.type) {
          for (const option of def.options) if (isTransforming(option, ctx)) return !0;
          return !1;
        }
        if ('tuple' === def.type) {
          for (const item of def.items) if (isTransforming(item, ctx)) return !0;
          return !(!def.rest || !isTransforming(def.rest, ctx));
        }
        return !1;
      }
      const createToJSONSchemaMethod =
          (schema, processors = {}) =>
          (params) => {
            const ctx = initializeContext({ ...params, processors });
            return (process(schema, ctx), extractDefs(ctx, schema), finalize(ctx, schema));
          },
        createStandardJSONSchemaMethod = (schema, io) => (params) => {
          const { libraryOptions, target } = params ?? {},
            ctx = initializeContext({ ...(libraryOptions ?? {}), target, io, processors: {} });
          return (process(schema, ctx), extractDefs(ctx, schema), finalize(ctx, schema));
        };
    },
    './node_modules/zod/v4/core/util.js'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      function assertEqual(val) {
        return val;
      }
      function assertNotEqual(val) {
        return val;
      }
      function assertIs(_arg) {}
      function assertNever(_x) {
        throw new Error('Unexpected value in exhaustive check');
      }
      function assert(_) {}
      function getEnumValues(entries) {
        const numericValues = Object.values(entries).filter((v) => 'number' == typeof v);
        return Object.entries(entries)
          .filter(([k, _]) => -1 === numericValues.indexOf(+k))
          .map(([_, v]) => v);
      }
      function joinValues(array, separator = '|') {
        return array.map((val) => stringifyPrimitive(val)).join(separator);
      }
      function jsonStringifyReplacer(_, value) {
        return 'bigint' == typeof value ? value.toString() : value;
      }
      function cached(getter) {
        return {
          get value() {
            {
              const value = getter();
              return (Object.defineProperty(this, 'value', { value }), value);
            }
          },
        };
      }
      function nullish(input) {
        return null == input;
      }
      function cleanRegex(source) {
        const start = source.startsWith('^') ? 1 : 0,
          end = source.endsWith('$') ? source.length - 1 : source.length;
        return source.slice(start, end);
      }
      function floatSafeRemainder(val, step) {
        const valDecCount = (val.toString().split('.')[1] || '').length,
          stepString = step.toString();
        let stepDecCount = (stepString.split('.')[1] || '').length;
        if (0 === stepDecCount && /\d?e-\d?/.test(stepString)) {
          const match = stepString.match(/\d?e-(\d?)/);
          match?.[1] && (stepDecCount = Number.parseInt(match[1]));
        }
        const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
        return (
          (Number.parseInt(val.toFixed(decCount).replace('.', '')) %
            Number.parseInt(step.toFixed(decCount).replace('.', ''))) /
          10 ** decCount
        );
      }
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          BIGINT_FORMAT_RANGES: () => BIGINT_FORMAT_RANGES,
          Class: () => Class,
          NUMBER_FORMAT_RANGES: () => NUMBER_FORMAT_RANGES,
          aborted: () => aborted,
          allowsEval: () => allowsEval,
          assert: () => assert,
          assertEqual: () => assertEqual,
          assertIs: () => assertIs,
          assertNever: () => assertNever,
          assertNotEqual: () => assertNotEqual,
          assignProp: () => assignProp,
          base64ToUint8Array: () => base64ToUint8Array,
          base64urlToUint8Array: () => base64urlToUint8Array,
          cached: () => cached,
          captureStackTrace: () => captureStackTrace,
          cleanEnum: () => cleanEnum,
          cleanRegex: () => cleanRegex,
          clone: () => clone,
          cloneDef: () => cloneDef,
          createTransparentProxy: () => createTransparentProxy,
          defineLazy: () => defineLazy,
          esc: () => esc,
          escapeRegex: () => escapeRegex,
          extend: () => extend,
          finalizeIssue: () => finalizeIssue,
          floatSafeRemainder: () => floatSafeRemainder,
          getElementAtPath: () => getElementAtPath,
          getEnumValues: () => getEnumValues,
          getLengthableOrigin: () => getLengthableOrigin,
          getParsedType: () => getParsedType,
          getSizableOrigin: () => getSizableOrigin,
          hexToUint8Array: () => hexToUint8Array,
          isObject: () => isObject,
          isPlainObject: () => isPlainObject,
          issue: () => issue,
          joinValues: () => joinValues,
          jsonStringifyReplacer: () => jsonStringifyReplacer,
          merge: () => merge,
          mergeDefs: () => mergeDefs,
          normalizeParams: () => normalizeParams,
          nullish: () => nullish,
          numKeys: () => numKeys,
          objectClone: () => objectClone,
          omit: () => omit,
          optionalKeys: () => optionalKeys,
          partial: () => partial,
          pick: () => pick,
          prefixIssues: () => prefixIssues,
          primitiveTypes: () => primitiveTypes,
          promiseAllObject: () => promiseAllObject,
          propertyKeyTypes: () => propertyKeyTypes,
          randomString: () => randomString,
          required: () => required,
          safeExtend: () => safeExtend,
          shallowClone: () => shallowClone,
          slugify: () => slugify,
          stringifyPrimitive: () => stringifyPrimitive,
          uint8ArrayToBase64: () => uint8ArrayToBase64,
          uint8ArrayToBase64url: () => uint8ArrayToBase64url,
          uint8ArrayToHex: () => uint8ArrayToHex,
          unwrapMessage: () => unwrapMessage,
        }));
      const EVALUATING = Symbol('evaluating');
      function defineLazy(object, key, getter) {
        let value;
        Object.defineProperty(object, key, {
          get() {
            if (value !== EVALUATING)
              return (void 0 === value && ((value = EVALUATING), (value = getter())), value);
          },
          set(v) {
            Object.defineProperty(object, key, { value: v });
          },
          configurable: !0,
        });
      }
      function objectClone(obj) {
        return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
      }
      function assignProp(target, prop, value) {
        Object.defineProperty(target, prop, {
          value,
          writable: !0,
          enumerable: !0,
          configurable: !0,
        });
      }
      function mergeDefs(...defs) {
        const mergedDescriptors = {};
        for (const def of defs) {
          const descriptors = Object.getOwnPropertyDescriptors(def);
          Object.assign(mergedDescriptors, descriptors);
        }
        return Object.defineProperties({}, mergedDescriptors);
      }
      function cloneDef(schema) {
        return mergeDefs(schema._zod.def);
      }
      function getElementAtPath(obj, path) {
        return path ? path.reduce((acc, key) => acc?.[key], obj) : obj;
      }
      function promiseAllObject(promisesObj) {
        const keys = Object.keys(promisesObj),
          promises = keys.map((key) => promisesObj[key]);
        return Promise.all(promises).then((results) => {
          const resolvedObj = {};
          for (let i = 0; i < keys.length; i++) resolvedObj[keys[i]] = results[i];
          return resolvedObj;
        });
      }
      function randomString(length = 10) {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        let str = '';
        for (let i = 0; i < length; i++) str += chars[Math.floor(26 * Math.random())];
        return str;
      }
      function esc(str) {
        return JSON.stringify(str);
      }
      function slugify(input) {
        return input
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }
      const captureStackTrace =
        'captureStackTrace' in Error ? Error.captureStackTrace : (..._args) => {};
      function isObject(data) {
        return 'object' == typeof data && null !== data && !Array.isArray(data);
      }
      const allowsEval = cached(() => {
        if ('undefined' != typeof navigator && navigator?.userAgent?.includes('Cloudflare'))
          return !1;
        try {
          return (new Function(''), !0);
        } catch (_) {
          return !1;
        }
      });
      function isPlainObject(o) {
        if (!1 === isObject(o)) return !1;
        const ctor = o.constructor;
        if (void 0 === ctor) return !0;
        if ('function' != typeof ctor) return !0;
        const prot = ctor.prototype;
        return (
          !1 !== isObject(prot) &&
          !1 !== Object.prototype.hasOwnProperty.call(prot, 'isPrototypeOf')
        );
      }
      function shallowClone(o) {
        return isPlainObject(o) ? { ...o } : Array.isArray(o) ? [...o] : o;
      }
      function numKeys(data) {
        let keyCount = 0;
        for (const key in data) Object.prototype.hasOwnProperty.call(data, key) && keyCount++;
        return keyCount;
      }
      const getParsedType = (data) => {
          const t = typeof data;
          switch (t) {
            case 'undefined':
              return 'undefined';
            case 'string':
              return 'string';
            case 'number':
              return Number.isNaN(data) ? 'nan' : 'number';
            case 'boolean':
              return 'boolean';
            case 'function':
              return 'function';
            case 'bigint':
              return 'bigint';
            case 'symbol':
              return 'symbol';
            case 'object':
              return Array.isArray(data)
                ? 'array'
                : null === data
                  ? 'null'
                  : data.then &&
                      'function' == typeof data.then &&
                      data.catch &&
                      'function' == typeof data.catch
                    ? 'promise'
                    : 'undefined' != typeof Map && data instanceof Map
                      ? 'map'
                      : 'undefined' != typeof Set && data instanceof Set
                        ? 'set'
                        : 'undefined' != typeof Date && data instanceof Date
                          ? 'date'
                          : 'undefined' != typeof File && data instanceof File
                            ? 'file'
                            : 'object';
            default:
              throw new Error(`Unknown data type: ${t}`);
          }
        },
        propertyKeyTypes = new Set(['string', 'number', 'symbol']),
        primitiveTypes = new Set(['string', 'number', 'bigint', 'boolean', 'symbol', 'undefined']);
      function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }
      function clone(inst, def, params) {
        const cl = new inst._zod.constr(def ?? inst._zod.def);
        return ((def && !params?.parent) || (cl._zod.parent = inst), cl);
      }
      function normalizeParams(_params) {
        const params = _params;
        if (!params) return {};
        if ('string' == typeof params) return { error: () => params };
        if (void 0 !== params?.message) {
          if (void 0 !== params?.error)
            throw new Error('Cannot specify both `message` and `error` params');
          params.error = params.message;
        }
        return (
          delete params.message,
          'string' == typeof params.error ? { ...params, error: () => params.error } : params
        );
      }
      function createTransparentProxy(getter) {
        let target;
        return new Proxy(
          {},
          {
            get: (_, prop, receiver) => (
              target ?? (target = getter()),
              Reflect.get(target, prop, receiver)
            ),
            set: (_, prop, value, receiver) => (
              target ?? (target = getter()),
              Reflect.set(target, prop, value, receiver)
            ),
            has: (_, prop) => (target ?? (target = getter()), Reflect.has(target, prop)),
            deleteProperty: (_, prop) => (
              target ?? (target = getter()),
              Reflect.deleteProperty(target, prop)
            ),
            ownKeys: (_) => (target ?? (target = getter()), Reflect.ownKeys(target)),
            getOwnPropertyDescriptor: (_, prop) => (
              target ?? (target = getter()),
              Reflect.getOwnPropertyDescriptor(target, prop)
            ),
            defineProperty: (_, prop, descriptor) => (
              target ?? (target = getter()),
              Reflect.defineProperty(target, prop, descriptor)
            ),
          }
        );
      }
      function stringifyPrimitive(value) {
        return 'bigint' == typeof value
          ? value.toString() + 'n'
          : 'string' == typeof value
            ? `"${value}"`
            : `${value}`;
      }
      function optionalKeys(shape) {
        return Object.keys(shape).filter(
          (k) => 'optional' === shape[k]._zod.optin && 'optional' === shape[k]._zod.optout
        );
      }
      const NUMBER_FORMAT_RANGES = {
          safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
          int32: [-2147483648, 2147483647],
          uint32: [0, 4294967295],
          float32: [-34028234663852886e22, 34028234663852886e22],
          float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
        },
        BIGINT_FORMAT_RANGES = {
          int64: [BigInt('-9223372036854775808'), BigInt('9223372036854775807')],
          uint64: [BigInt(0), BigInt('18446744073709551615')],
        };
      function pick(schema, mask) {
        const currDef = schema._zod.def;
        return clone(
          schema,
          mergeDefs(schema._zod.def, {
            get shape() {
              const newShape = {};
              for (const key in mask) {
                if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
                mask[key] && (newShape[key] = currDef.shape[key]);
              }
              return (assignProp(this, 'shape', newShape), newShape);
            },
            checks: [],
          })
        );
      }
      function omit(schema, mask) {
        const currDef = schema._zod.def,
          def = mergeDefs(schema._zod.def, {
            get shape() {
              const newShape = { ...schema._zod.def.shape };
              for (const key in mask) {
                if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
                mask[key] && delete newShape[key];
              }
              return (assignProp(this, 'shape', newShape), newShape);
            },
            checks: [],
          });
        return clone(schema, def);
      }
      function extend(schema, shape) {
        if (!isPlainObject(shape))
          throw new Error('Invalid input to extend: expected a plain object');
        const checks = schema._zod.def.checks;
        if (checks && checks.length > 0)
          throw new Error(
            'Object schemas containing refinements cannot be extended. Use `.safeExtend()` instead.'
          );
        const def = mergeDefs(schema._zod.def, {
          get shape() {
            const _shape = { ...schema._zod.def.shape, ...shape };
            return (assignProp(this, 'shape', _shape), _shape);
          },
          checks: [],
        });
        return clone(schema, def);
      }
      function safeExtend(schema, shape) {
        if (!isPlainObject(shape))
          throw new Error('Invalid input to safeExtend: expected a plain object');
        const def = {
          ...schema._zod.def,
          get shape() {
            const _shape = { ...schema._zod.def.shape, ...shape };
            return (assignProp(this, 'shape', _shape), _shape);
          },
          checks: schema._zod.def.checks,
        };
        return clone(schema, def);
      }
      function merge(a, b) {
        const def = mergeDefs(a._zod.def, {
          get shape() {
            const _shape = { ...a._zod.def.shape, ...b._zod.def.shape };
            return (assignProp(this, 'shape', _shape), _shape);
          },
          get catchall() {
            return b._zod.def.catchall;
          },
          checks: [],
        });
        return clone(a, def);
      }
      function partial(Class, schema, mask) {
        const def = mergeDefs(schema._zod.def, {
          get shape() {
            const oldShape = schema._zod.def.shape,
              shape = { ...oldShape };
            if (mask)
              for (const key in mask) {
                if (!(key in oldShape)) throw new Error(`Unrecognized key: "${key}"`);
                mask[key] &&
                  (shape[key] = Class
                    ? new Class({ type: 'optional', innerType: oldShape[key] })
                    : oldShape[key]);
              }
            else
              for (const key in oldShape)
                shape[key] = Class
                  ? new Class({ type: 'optional', innerType: oldShape[key] })
                  : oldShape[key];
            return (assignProp(this, 'shape', shape), shape);
          },
          checks: [],
        });
        return clone(schema, def);
      }
      function required(Class, schema, mask) {
        const def = mergeDefs(schema._zod.def, {
          get shape() {
            const oldShape = schema._zod.def.shape,
              shape = { ...oldShape };
            if (mask)
              for (const key in mask) {
                if (!(key in shape)) throw new Error(`Unrecognized key: "${key}"`);
                mask[key] &&
                  (shape[key] = new Class({ type: 'nonoptional', innerType: oldShape[key] }));
              }
            else
              for (const key in oldShape)
                shape[key] = new Class({ type: 'nonoptional', innerType: oldShape[key] });
            return (assignProp(this, 'shape', shape), shape);
          },
          checks: [],
        });
        return clone(schema, def);
      }
      function aborted(x, startIndex = 0) {
        if (!0 === x.aborted) return !0;
        for (let i = startIndex; i < x.issues.length; i++)
          if (!0 !== x.issues[i]?.continue) return !0;
        return !1;
      }
      function prefixIssues(path, issues) {
        return issues.map((iss) => {
          var _a;
          return ((_a = iss).path ?? (_a.path = []), iss.path.unshift(path), iss);
        });
      }
      function unwrapMessage(message) {
        return 'string' == typeof message ? message : message?.message;
      }
      function finalizeIssue(iss, ctx, config) {
        const full = { ...iss, path: iss.path ?? [] };
        if (!iss.message) {
          const message =
            unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ??
            unwrapMessage(ctx?.error?.(iss)) ??
            unwrapMessage(config.customError?.(iss)) ??
            unwrapMessage(config.localeError?.(iss)) ??
            'Invalid input';
          full.message = message;
        }
        return (
          delete full.inst,
          delete full.continue,
          ctx?.reportInput || delete full.input,
          full
        );
      }
      function getSizableOrigin(input) {
        return input instanceof Set
          ? 'set'
          : input instanceof Map
            ? 'map'
            : input instanceof File
              ? 'file'
              : 'unknown';
      }
      function getLengthableOrigin(input) {
        return Array.isArray(input) ? 'array' : 'string' == typeof input ? 'string' : 'unknown';
      }
      function issue(...args) {
        const [iss, input, inst] = args;
        return 'string' == typeof iss ? { message: iss, code: 'custom', input, inst } : { ...iss };
      }
      function cleanEnum(obj) {
        return Object.entries(obj)
          .filter(([k, _]) => Number.isNaN(Number.parseInt(k, 10)))
          .map((el) => el[1]);
      }
      function base64ToUint8Array(base64) {
        const binaryString = atob(base64),
          bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
        return bytes;
      }
      function uint8ArrayToBase64(bytes) {
        let binaryString = '';
        for (let i = 0; i < bytes.length; i++) binaryString += String.fromCharCode(bytes[i]);
        return btoa(binaryString);
      }
      function base64urlToUint8Array(base64url) {
        const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
        return base64ToUint8Array(base64 + '='.repeat((4 - (base64.length % 4)) % 4));
      }
      function uint8ArrayToBase64url(bytes) {
        return uint8ArrayToBase64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      }
      function hexToUint8Array(hex) {
        const cleanHex = hex.replace(/^0x/, '');
        if (cleanHex.length % 2 != 0) throw new Error('Invalid hex string length');
        const bytes = new Uint8Array(cleanHex.length / 2);
        for (let i = 0; i < cleanHex.length; i += 2)
          bytes[i / 2] = Number.parseInt(cleanHex.slice(i, i + 2), 16);
        return bytes;
      }
      function uint8ArrayToHex(bytes) {
        return Array.from(bytes)
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');
      }
      class Class {
        constructor(..._args) {}
      }
    },
    './node_modules/zod/v4/locales/en.js'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        './node_modules/zod/v4/core/util.js'
      );
      const error = () => {
        const Sizable = {
          string: { unit: 'characters', verb: 'to have' },
          file: { unit: 'bytes', verb: 'to have' },
          array: { unit: 'items', verb: 'to have' },
          set: { unit: 'items', verb: 'to have' },
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const Nouns = {
          regex: 'input',
          email: 'email address',
          url: 'URL',
          emoji: 'emoji',
          uuid: 'UUID',
          uuidv4: 'UUIDv4',
          uuidv6: 'UUIDv6',
          nanoid: 'nanoid',
          guid: 'GUID',
          cuid: 'cuid',
          cuid2: 'cuid2',
          ulid: 'ULID',
          xid: 'XID',
          ksuid: 'KSUID',
          datetime: 'ISO datetime',
          date: 'ISO date',
          time: 'ISO time',
          duration: 'ISO duration',
          ipv4: 'IPv4 address',
          ipv6: 'IPv6 address',
          mac: 'MAC address',
          cidrv4: 'IPv4 range',
          cidrv6: 'IPv6 range',
          base64: 'base64-encoded string',
          base64url: 'base64url-encoded string',
          json_string: 'JSON string',
          e164: 'E.164 number',
          jwt: 'JWT',
          template_literal: 'input',
        };
        return (issue) => {
          switch (issue.code) {
            case 'invalid_type':
              return `Invalid input: expected ${issue.expected}, received ${((data) => {
                const t = typeof data;
                switch (t) {
                  case 'number':
                    return Number.isNaN(data) ? 'NaN' : 'number';
                  case 'object':
                    if (Array.isArray(data)) return 'array';
                    if (null === data) return 'null';
                    if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor)
                      return data.constructor.name;
                }
                return t;
              })(issue.input)}`;
            case 'invalid_value':
              return 1 === issue.values.length
                ? `Invalid input: expected ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`
                : `Invalid option: expected one of ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, '|')}`;
            case 'too_big': {
              const adj = issue.inclusive ? '<=' : '<',
                sizing = getSizing(issue.origin);
              return sizing
                ? `Too big: expected ${issue.origin ?? 'value'} to have ${adj}${issue.maximum.toString()} ${sizing.unit ?? 'elements'}`
                : `Too big: expected ${issue.origin ?? 'value'} to be ${adj}${issue.maximum.toString()}`;
            }
            case 'too_small': {
              const adj = issue.inclusive ? '>=' : '>',
                sizing = getSizing(issue.origin);
              return sizing
                ? `Too small: expected ${issue.origin} to have ${adj}${issue.minimum.toString()} ${sizing.unit}`
                : `Too small: expected ${issue.origin} to be ${adj}${issue.minimum.toString()}`;
            }
            case 'invalid_format': {
              const _issue = issue;
              return 'starts_with' === _issue.format
                ? `Invalid string: must start with "${_issue.prefix}"`
                : 'ends_with' === _issue.format
                  ? `Invalid string: must end with "${_issue.suffix}"`
                  : 'includes' === _issue.format
                    ? `Invalid string: must include "${_issue.includes}"`
                    : 'regex' === _issue.format
                      ? `Invalid string: must match pattern ${_issue.pattern}`
                      : `Invalid ${Nouns[_issue.format] ?? issue.format}`;
            }
            case 'not_multiple_of':
              return `Invalid number: must be a multiple of ${issue.divisor}`;
            case 'unrecognized_keys':
              return `Unrecognized key${issue.keys.length > 1 ? 's' : ''}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ', ')}`;
            case 'invalid_key':
              return `Invalid key in ${issue.origin}`;
            case 'invalid_union':
            default:
              return 'Invalid input';
            case 'invalid_element':
              return `Invalid value in ${issue.origin}`;
          }
        };
      };
      function __WEBPACK_DEFAULT_EXPORT__() {
        return { localeError: error() };
      }
    },
    './node_modules/zod/v4/locales/index.js'(
      __unused_webpack_module,
      __unused_webpack___webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__('./node_modules/zod/v4/core/util.js');
      __webpack_require__('./node_modules/zod/v4/locales/en.js');
    },
  },
]);
