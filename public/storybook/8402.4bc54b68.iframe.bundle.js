'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [8402],
  {
    './src/components/atoms/IconButton/IconButton.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { K: () => IconButton });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const variantClass = {
          default: 'bg-transparent text-gray-900 hover:bg-gray-100 active:bg-gray-200',
          outline: 'border border-gray-200 text-gray-900 hover:bg-gray-50 active:bg-gray-100',
          filled: 'bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700',
        },
        sizeClass = { sm: 'w-20 h-20 text-xs', md: 'w-32 h-32 text-sm', lg: 'w-36 h-36 text-base' },
        IconButton = (0, react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(
          ({ variant = 'default', size = 'md', className, children, ...props }, ref) =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('button', {
              ref,
              type: 'button',
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                'inline-flex items-center justify-center rounded-full cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:opacity-40 disabled:cursor-not-allowed',
                variantClass[variant],
                sizeClass[size],
                className
              ),
              ...props,
              children,
            })
        );
      ((IconButton.displayName = 'IconButton'),
        (IconButton.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'IconButton',
          props: {
            variant: {
              required: !1,
              tsType: {
                name: 'union',
                raw: "'default' | 'filled' | 'outline'",
                elements: [
                  { name: 'literal', value: "'default'" },
                  { name: 'literal', value: "'filled'" },
                  { name: 'literal', value: "'outline'" },
                ],
              },
              description: '',
              defaultValue: { value: "'default'", computed: !1 },
            },
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
            children: { required: !0, tsType: { name: 'ReactNode' }, description: '' },
          },
        }));
    },
    './src/lib/store/authStore.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { n: () => useAuthStore });
      var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/zustand/esm/react.mjs'
        ),
        _utils_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__('./src/utils/logger.ts');
      const useAuthStore = (0, zustand__WEBPACK_IMPORTED_MODULE_0__.v)()((set) => ({
        user: null,
        accessToken: null,
        isLoading: !1,
        isInitialized: !1,
        setAuth: ({ user, accessToken }) => {
          (_utils_logger__WEBPACK_IMPORTED_MODULE_1__.v.info('[AuthStore] setAuth 호출:', {
            hasUser: !!user,
            hasAccessToken: !!accessToken,
          }),
            set({ user, accessToken }));
        },
        setUser: (user) => set({ user }),
        startLoading: () => set({ isLoading: !0 }),
        finishLoading: () => set({ isLoading: !1 }),
        clearAuth: () => {
          (_utils_logger__WEBPACK_IMPORTED_MODULE_1__.v.info(
            '[AuthStore] clearAuth - 메모리에서 인증 정보 제거'
          ),
            set({ user: null, accessToken: null }));
        },
        setInitialized: () => {
          (_utils_logger__WEBPACK_IMPORTED_MODULE_1__.v.info(
            '[AuthStore] setInitialized - 앱 초기화 완료'
          ),
            set({ isInitialized: !0 }));
        },
      }));
    },
    './src/utils/api.ts'(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.d(__webpack_exports__, {
        e9: () => getApiUrl,
        v$: () => fetchWithAuth,
        yn: () => tryRefreshToken,
      });
      var _features_auth_utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './src/features/auth/utils/constants.ts'
        ),
        _lib_store_authStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './src/lib/store/authStore.ts'
        ),
        _utils_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__('./src/utils/logger.ts');
      Error;
      function getApiUrl() {
        return (
          { NODE_ENV: 'production', NODE_PATH: [], STORYBOOK: 'true', PUBLIC_URL: '.' }
            .NEXT_PUBLIC_API_URL || _features_auth_utils_constants__WEBPACK_IMPORTED_MODULE_0__.rK
        );
      }
      function getApiTimeout() {
        const envTimeout = {
          NODE_ENV: 'production',
          NODE_PATH: [],
          STORYBOOK: 'true',
          PUBLIC_URL: '.',
        }.NEXT_PUBLIC_API_TIMEOUT;
        return envTimeout
          ? Number.parseInt(envTimeout, 10)
          : _features_auth_utils_constants__WEBPACK_IMPORTED_MODULE_0__.cS;
      }
      function joinUrl(base, path) {
        return base ? `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}` : path;
      }
      async function tryRefreshToken() {
        const timeout = getApiTimeout(),
          controller = new AbortController(),
          timeoutId = setTimeout(() => controller.abort(), timeout);
        try {
          const isBrowserEnv = !0,
            backendOrigin = isBrowserEnv
              ? ''
              : { NODE_ENV: 'production', NODE_PATH: [], STORYBOOK: 'true', PUBLIC_URL: '.' }
                  .BACKEND_ORIGIN ||
                { NODE_ENV: 'production', NODE_PATH: [], STORYBOOK: 'true', PUBLIC_URL: '.' }
                  .BACKEND_API_URL ||
                getApiUrl(),
            refreshUrl = joinUrl(
              backendOrigin,
              isBrowserEnv
                ? '/api/auth/refresh'
                : _features_auth_utils_constants__WEBPACK_IMPORTED_MODULE_0__.h1.REFRESH
            );
          let response,
            cookieDebugInfo = {};
          if (isBrowserEnv) {
            const allCookies = document.cookie,
              cookieNames = allCookies
                .split(';')
                .map((c) => c.trim().split('=')[0])
                .filter(Boolean);
            cookieDebugInfo = {
              hasCookies: allCookies.length > 0,
              cookieCount: cookieNames.length,
              visibleCookieNames: cookieNames.filter(
                (name) => name && !name.toLowerCase().includes('token')
              ),
              note: 'refreshToken은 HttpOnly이므로 여기에 표시되지 않지만, credentials: include로 자동 전송됨',
            };
          }
          _utils_logger__WEBPACK_IMPORTED_MODULE_2__.v.info('[Token Refresh] 토큰 갱신 요청 시작', {
            refreshUrl,
            isBrowserEnv,
            backendOrigin,
            hasCredentials: !0,
            cookieDebugInfo,
            crossOrigin: isBrowserEnv && window.location.origin !== backendOrigin,
            currentOrigin: isBrowserEnv ? window.location.origin : 'server',
            note: '브라우저/서버 모두 refreshToken(httpOnly 쿠키) 기반으로 refresh 요청',
          });
          try {
            response = await fetch(refreshUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({}),
              credentials: 'include',
              signal: controller.signal,
            });
          } catch (error) {
            if (error instanceof Error && 'AbortError' === error.name)
              throw new Error('토큰 갱신 요청 시간이 초과되었습니다.');
            throw error;
          } finally {
            clearTimeout(timeoutId);
          }
          if (
            (_utils_logger__WEBPACK_IMPORTED_MODULE_2__.v.info(
              '[Token Refresh] 토큰 갱신 응답 받음',
              { status: response.status, statusText: response.statusText, ok: response.ok }
            ),
            401 === response.status)
          )
            return null;
          if (403 === response.status)
            throw new Error('토큰 갱신이 거부되었습니다. 잠시 후 다시 시도해주세요.');
          if (response.ok) {
            0;
            const result = await response.json(),
              accessToken = result.data?.accessToken || result.accessToken;
            if (accessToken) {
              const { setAuth, user: existingUser } =
                _lib_store_authStore__WEBPACK_IMPORTED_MODULE_1__.n.getState();
              if (result.data?.user) {
                const normalizeRole = (role) => {
                  const upperRole = role.toUpperCase();
                  return 'MANAGER' === upperRole
                    ? 'manager'
                    : 'ADMIN' === upperRole
                      ? 'admin'
                      : 'user';
                };
                return (
                  setAuth({
                    user: {
                      id: result.data.user.id,
                      email: result.data.user.email,
                      name: result.data.user.name,
                      role: normalizeRole(result.data.user.role),
                      companyId: result.data.user.companyId,
                      image: result.data.user.profileImage,
                    },
                    accessToken,
                  }),
                  _utils_logger__WEBPACK_IMPORTED_MODULE_2__.v.info(
                    '[Token Refresh] 토큰 갱신 성공 (user 정보 포함)'
                  ),
                  accessToken
                );
              }
              if (existingUser)
                return (
                  setAuth({ user: existingUser, accessToken }),
                  _utils_logger__WEBPACK_IMPORTED_MODULE_2__.v.info(
                    '[Token Refresh] 토큰 갱신 성공 (기존 user 정보 사용)'
                  ),
                  accessToken
                );
              const { user: currentUser } =
                _lib_store_authStore__WEBPACK_IMPORTED_MODULE_1__.n.getState();
              return currentUser
                ? (_utils_logger__WEBPACK_IMPORTED_MODULE_2__.v.warn(
                    '[Token Refresh] 토큰 갱신 성공했지만 백엔드 응답에 user 정보가 없음. 기존 user 정보 유지.'
                  ),
                  setAuth({ user: currentUser, accessToken }),
                  accessToken)
                : (_utils_logger__WEBPACK_IMPORTED_MODULE_2__.v.warn(
                    '[Token Refresh] 토큰 갱신 성공했지만 user 정보가 없음 (백엔드 응답에 user 포함 여부 확인 필요)'
                  ),
                  setAuth({ user: null, accessToken }),
                  accessToken);
            }
            throw (
              _utils_logger__WEBPACK_IMPORTED_MODULE_2__.v.warn(
                '[Token Refresh] 응답 형식이 올바르지 않음',
                { success: result.success, hasAccessToken: !!result.data?.accessToken }
              ),
              new Error('토큰 갱신 응답 형식이 올바르지 않습니다.')
            );
          }
          {
            let errorText = '',
              errorJson = null;
            try {
              if (((errorText = await response.text()), errorText.trim().startsWith('{')))
                try {
                  errorJson = JSON.parse(errorText);
                } catch {}
            } catch {
              errorText = 'Failed to read error response';
            }
            throw (
              _utils_logger__WEBPACK_IMPORTED_MODULE_2__.v.error('[Token Refresh] 토큰 갱신 실패', {
                status: response.status,
                statusText: response.statusText,
                errorText: errorText.substring(0, 300),
                errorJson,
              }),
              new Error('토큰 갱신에 실패했습니다.')
            );
          }
        } catch (error) {
          throw (
            _utils_logger__WEBPACK_IMPORTED_MODULE_2__.v.warn(
              '[Token Refresh] 토큰 갱신 중 예외 발생',
              {
                hasError: !0,
                errorType: error instanceof Error ? error.constructor.name : 'Unknown',
                errorMessage: error instanceof Error ? error.message : String(error),
              }
            ),
            error
          );
        }
      }
      async function fetchWithAuth(url, options, accessToken) {
        const timeout = getApiTimeout(),
          requestOptions = options || {};
        let token =
          accessToken || _lib_store_authStore__WEBPACK_IMPORTED_MODULE_1__.n.getState().accessToken;
        if (!token) {
          token =
            (await tryRefreshToken()) ||
            _lib_store_authStore__WEBPACK_IMPORTED_MODULE_1__.n.getState().accessToken;
        }
        if (!token) throw new Error('인증 토큰이 없습니다. 로그인이 필요합니다.');
        const controller = new AbortController(),
          timeoutId = setTimeout(() => controller.abort(), timeout),
          finalUrl =
            url.startsWith('http://') || url.startsWith('https://') ? url : joinUrl('', url),
          isFormData = requestOptions.body instanceof FormData,
          defaultHeaders = {
            ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
            ...requestOptions.headers,
            Authorization: `Bearer ${token}`,
          };
        try {
          const response = await fetch(finalUrl, {
            ...requestOptions,
            headers: defaultHeaders,
            credentials: 'include',
            signal: controller.signal,
          });
          if (
            (clearTimeout(timeoutId),
            429 === response.status &&
              _utils_logger__WEBPACK_IMPORTED_MODULE_2__.v.warn('Rate limit exceeded (429)', {
                method: requestOptions.method || 'GET',
                status: response.status,
              }),
            401 === response.status)
          ) {
            const refreshResult = await (async function handle401Error() {
              _utils_logger__WEBPACK_IMPORTED_MODULE_2__.v.info(
                '[401 Error Handler] 토큰 갱신 시도 시작'
              );
              try {
                return (await tryRefreshToken())
                  ? (_utils_logger__WEBPACK_IMPORTED_MODULE_2__.v.info(
                      '[401 Error Handler] 토큰 갱신 성공'
                    ),
                    'refreshed')
                  : (_utils_logger__WEBPACK_IMPORTED_MODULE_2__.v.warn(
                      '[401 Error Handler] 토큰 갱신 실패 - refresh token 만료/없음'
                    ),
                    'expired');
              } catch (error) {
                return (
                  _utils_logger__WEBPACK_IMPORTED_MODULE_2__.v.warn(
                    '[401 Error Handler] 토큰 갱신 실패(일시 장애) - 자동 로그아웃 방지',
                    {
                      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
                      errorMessage: error instanceof Error ? error.message : String(error),
                    }
                  ),
                  'failed'
                );
              }
            })();
            if ('expired' === refreshResult)
              throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
            if ('failed' === refreshResult)
              throw new Error('인증 갱신에 실패했습니다. 네트워크 상태를 확인해주세요.');
            const newToken =
              _lib_store_authStore__WEBPACK_IMPORTED_MODULE_1__.n.getState().accessToken;
            if (newToken && newToken !== token) {
              const retryController = new AbortController(),
                retryTimeoutId = setTimeout(() => retryController.abort(), timeout);
              try {
                const retryHeaders = {
                    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
                    ...requestOptions.headers,
                    Authorization: `Bearer ${newToken}`,
                  },
                  retryResponse = await fetch(finalUrl, {
                    ...requestOptions,
                    headers: retryHeaders,
                    credentials: 'include',
                    signal: retryController.signal,
                  });
                if ((clearTimeout(retryTimeoutId), 401 === retryResponse.status))
                  throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
                return retryResponse;
              } catch (retryError) {
                throw (clearTimeout(retryTimeoutId), retryError);
              }
            }
            throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
          }
          return response;
        } catch (error) {
          if ((clearTimeout(timeoutId), error instanceof Error && 'AbortError' === error.name))
            throw new Error('요청 시간이 초과되었습니다.');
          throw error;
        }
      }
    },
    './src/utils/logger.ts'(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.d(__webpack_exports__, { v: () => logger });
      __webpack_require__('./node_modules/console-browserify/index.js');
      const logger = {
        error: (message, ...args) => {
          false;
        },
        warn: (message, ...args) => {
          false;
        },
        info: (message, ...args) => {
          false;
        },
      };
    },
  },
]);
