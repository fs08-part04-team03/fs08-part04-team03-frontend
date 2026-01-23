'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [712],
  {
    './node_modules/@tanstack/react-query/build/modern/useMutation.js'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { n: () => useMutation });
      var react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        mutation = __webpack_require__(
          './node_modules/@tanstack/query-core/build/modern/mutation.js'
        ),
        notifyManager = __webpack_require__(
          './node_modules/@tanstack/query-core/build/modern/notifyManager.js'
        ),
        subscribable = __webpack_require__(
          './node_modules/@tanstack/query-core/build/modern/subscribable.js'
        ),
        utils = __webpack_require__('./node_modules/@tanstack/query-core/build/modern/utils.js'),
        MutationObserver = class extends subscribable.Q {
          #client;
          #currentResult = void 0;
          #currentMutation;
          #mutateOptions;
          constructor(client, options) {
            (super(),
              (this.#client = client),
              this.setOptions(options),
              this.bindMethods(),
              this.#updateResult());
          }
          bindMethods() {
            ((this.mutate = this.mutate.bind(this)), (this.reset = this.reset.bind(this)));
          }
          setOptions(options) {
            const prevOptions = this.options;
            ((this.options = this.#client.defaultMutationOptions(options)),
              (0, utils.f8)(this.options, prevOptions) ||
                this.#client
                  .getMutationCache()
                  .notify({
                    type: 'observerOptionsUpdated',
                    mutation: this.#currentMutation,
                    observer: this,
                  }),
              prevOptions?.mutationKey &&
              this.options.mutationKey &&
              (0, utils.EN)(prevOptions.mutationKey) !== (0, utils.EN)(this.options.mutationKey)
                ? this.reset()
                : 'pending' === this.#currentMutation?.state.status &&
                  this.#currentMutation.setOptions(this.options));
          }
          onUnsubscribe() {
            this.hasListeners() || this.#currentMutation?.removeObserver(this);
          }
          onMutationUpdate(action) {
            (this.#updateResult(), this.#notify(action));
          }
          getCurrentResult() {
            return this.#currentResult;
          }
          reset() {
            (this.#currentMutation?.removeObserver(this),
              (this.#currentMutation = void 0),
              this.#updateResult(),
              this.#notify());
          }
          mutate(variables, options) {
            return (
              (this.#mutateOptions = options),
              this.#currentMutation?.removeObserver(this),
              (this.#currentMutation = this.#client
                .getMutationCache()
                .build(this.#client, this.options)),
              this.#currentMutation.addObserver(this),
              this.#currentMutation.execute(variables)
            );
          }
          #updateResult() {
            const state = this.#currentMutation?.state ?? (0, mutation.$)();
            this.#currentResult = {
              ...state,
              isPending: 'pending' === state.status,
              isSuccess: 'success' === state.status,
              isError: 'error' === state.status,
              isIdle: 'idle' === state.status,
              mutate: this.mutate,
              reset: this.reset,
            };
          }
          #notify(action) {
            notifyManager.jG.batch(() => {
              if (this.#mutateOptions && this.hasListeners()) {
                const variables = this.#currentResult.variables,
                  onMutateResult = this.#currentResult.context,
                  context = {
                    client: this.#client,
                    meta: this.options.meta,
                    mutationKey: this.options.mutationKey,
                  };
                if ('success' === action?.type) {
                  try {
                    this.#mutateOptions.onSuccess?.(
                      action.data,
                      variables,
                      onMutateResult,
                      context
                    );
                  } catch (e) {
                    Promise.reject(e);
                  }
                  try {
                    this.#mutateOptions.onSettled?.(
                      action.data,
                      null,
                      variables,
                      onMutateResult,
                      context
                    );
                  } catch (e) {
                    Promise.reject(e);
                  }
                } else if ('error' === action?.type) {
                  try {
                    this.#mutateOptions.onError?.(action.error, variables, onMutateResult, context);
                  } catch (e) {
                    Promise.reject(e);
                  }
                  try {
                    this.#mutateOptions.onSettled?.(
                      void 0,
                      action.error,
                      variables,
                      onMutateResult,
                      context
                    );
                  } catch (e) {
                    Promise.reject(e);
                  }
                }
              }
              this.listeners.forEach((listener) => {
                listener(this.#currentResult);
              });
            });
          }
        },
        QueryClientProvider = __webpack_require__(
          './node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js'
        );
      function useMutation(options, queryClient) {
        const client = (0, QueryClientProvider.jE)(queryClient),
          [observer] = react.useState(() => new MutationObserver(client, options));
        react.useEffect(() => {
          observer.setOptions(options);
        }, [observer, options]);
        const result = react.useSyncExternalStore(
            react.useCallback(
              (onStoreChange) => observer.subscribe(notifyManager.jG.batchCalls(onStoreChange)),
              [observer]
            ),
            () => observer.getCurrentResult(),
            () => observer.getCurrentResult()
          ),
          mutate = react.useCallback(
            (variables, mutateOptions) => {
              observer.mutate(variables, mutateOptions).catch(utils.lQ);
            },
            [observer]
          );
        if (result.error && (0, utils.GU)(observer.options.throwOnError, [result.error]))
          throw result.error;
        return { ...result, mutate, mutateAsync: result.mutate };
      }
    },
    './node_modules/@tanstack/react-query/build/modern/useQuery.js'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { I: () => useQuery });
      var focusManager = __webpack_require__(
          './node_modules/@tanstack/query-core/build/modern/focusManager.js'
        ),
        notifyManager = __webpack_require__(
          './node_modules/@tanstack/query-core/build/modern/notifyManager.js'
        ),
        modern_query = __webpack_require__(
          './node_modules/@tanstack/query-core/build/modern/query.js'
        ),
        subscribable = __webpack_require__(
          './node_modules/@tanstack/query-core/build/modern/subscribable.js'
        ),
        thenable = __webpack_require__(
          './node_modules/@tanstack/query-core/build/modern/thenable.js'
        ),
        utils = __webpack_require__('./node_modules/@tanstack/query-core/build/modern/utils.js'),
        timeoutManager = __webpack_require__(
          './node_modules/@tanstack/query-core/build/modern/timeoutManager.js'
        ),
        QueryObserver = class extends subscribable.Q {
          constructor(client, options) {
            (super(),
              (this.options = options),
              (this.#client = client),
              (this.#selectError = null),
              (this.#currentThenable = (0, thenable.T)()),
              this.bindMethods(),
              this.setOptions(options));
          }
          #client;
          #currentQuery = void 0;
          #currentQueryInitialState = void 0;
          #currentResult = void 0;
          #currentResultState;
          #currentResultOptions;
          #currentThenable;
          #selectError;
          #selectFn;
          #selectResult;
          #lastQueryWithDefinedData;
          #staleTimeoutId;
          #refetchIntervalId;
          #currentRefetchInterval;
          #trackedProps = new Set();
          bindMethods() {
            this.refetch = this.refetch.bind(this);
          }
          onSubscribe() {
            1 === this.listeners.size &&
              (this.#currentQuery.addObserver(this),
              shouldFetchOnMount(this.#currentQuery, this.options)
                ? this.#executeFetch()
                : this.updateResult(),
              this.#updateTimers());
          }
          onUnsubscribe() {
            this.hasListeners() || this.destroy();
          }
          shouldFetchOnReconnect() {
            return shouldFetchOn(this.#currentQuery, this.options, this.options.refetchOnReconnect);
          }
          shouldFetchOnWindowFocus() {
            return shouldFetchOn(
              this.#currentQuery,
              this.options,
              this.options.refetchOnWindowFocus
            );
          }
          destroy() {
            ((this.listeners = new Set()),
              this.#clearStaleTimeout(),
              this.#clearRefetchInterval(),
              this.#currentQuery.removeObserver(this));
          }
          setOptions(options) {
            const prevOptions = this.options,
              prevQuery = this.#currentQuery;
            if (
              ((this.options = this.#client.defaultQueryOptions(options)),
              void 0 !== this.options.enabled &&
                'boolean' != typeof this.options.enabled &&
                'function' != typeof this.options.enabled &&
                'boolean' != typeof (0, utils.Eh)(this.options.enabled, this.#currentQuery))
            )
              throw new Error(
                'Expected enabled to be a boolean or a callback that returns a boolean'
              );
            (this.#updateQuery(),
              this.#currentQuery.setOptions(this.options),
              prevOptions._defaulted &&
                !(0, utils.f8)(this.options, prevOptions) &&
                this.#client
                  .getQueryCache()
                  .notify({
                    type: 'observerOptionsUpdated',
                    query: this.#currentQuery,
                    observer: this,
                  }));
            const mounted = this.hasListeners();
            (mounted &&
              shouldFetchOptionally(this.#currentQuery, prevQuery, this.options, prevOptions) &&
              this.#executeFetch(),
              this.updateResult(),
              !mounted ||
                (this.#currentQuery === prevQuery &&
                  (0, utils.Eh)(this.options.enabled, this.#currentQuery) ===
                    (0, utils.Eh)(prevOptions.enabled, this.#currentQuery) &&
                  (0, utils.d2)(this.options.staleTime, this.#currentQuery) ===
                    (0, utils.d2)(prevOptions.staleTime, this.#currentQuery)) ||
                this.#updateStaleTimeout());
            const nextRefetchInterval = this.#computeRefetchInterval();
            !mounted ||
              (this.#currentQuery === prevQuery &&
                (0, utils.Eh)(this.options.enabled, this.#currentQuery) ===
                  (0, utils.Eh)(prevOptions.enabled, this.#currentQuery) &&
                nextRefetchInterval === this.#currentRefetchInterval) ||
              this.#updateRefetchInterval(nextRefetchInterval);
          }
          getOptimisticResult(options) {
            const query = this.#client.getQueryCache().build(this.#client, options),
              result = this.createResult(query, options);
            return (
              (function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
                if (!(0, utils.f8)(observer.getCurrentResult(), optimisticResult)) return !0;
                return !1;
              })(this, result) &&
                ((this.#currentResult = result),
                (this.#currentResultOptions = this.options),
                (this.#currentResultState = this.#currentQuery.state)),
              result
            );
          }
          getCurrentResult() {
            return this.#currentResult;
          }
          trackResult(result, onPropTracked) {
            return new Proxy(result, {
              get: (target, key) => (
                this.trackProp(key),
                onPropTracked?.(key),
                'promise' === key &&
                  (this.trackProp('data'),
                  this.options.experimental_prefetchInRender ||
                    'pending' !== this.#currentThenable.status ||
                    this.#currentThenable.reject(
                      new Error('experimental_prefetchInRender feature flag is not enabled')
                    )),
                Reflect.get(target, key)
              ),
            });
          }
          trackProp(key) {
            this.#trackedProps.add(key);
          }
          getCurrentQuery() {
            return this.#currentQuery;
          }
          refetch({ ...options } = {}) {
            return this.fetch({ ...options });
          }
          fetchOptimistic(options) {
            const defaultedOptions = this.#client.defaultQueryOptions(options),
              query = this.#client.getQueryCache().build(this.#client, defaultedOptions);
            return query.fetch().then(() => this.createResult(query, defaultedOptions));
          }
          fetch(fetchOptions) {
            return this.#executeFetch({
              ...fetchOptions,
              cancelRefetch: fetchOptions.cancelRefetch ?? !0,
            }).then(() => (this.updateResult(), this.#currentResult));
          }
          #executeFetch(fetchOptions) {
            this.#updateQuery();
            let promise = this.#currentQuery.fetch(this.options, fetchOptions);
            return (fetchOptions?.throwOnError || (promise = promise.catch(utils.lQ)), promise);
          }
          #updateStaleTimeout() {
            this.#clearStaleTimeout();
            const staleTime = (0, utils.d2)(this.options.staleTime, this.#currentQuery);
            if (utils.S$ || this.#currentResult.isStale || !(0, utils.gn)(staleTime)) return;
            const timeout = (0, utils.j3)(this.#currentResult.dataUpdatedAt, staleTime) + 1;
            this.#staleTimeoutId = timeoutManager.zs.setTimeout(() => {
              this.#currentResult.isStale || this.updateResult();
            }, timeout);
          }
          #computeRefetchInterval() {
            return (
              ('function' == typeof this.options.refetchInterval
                ? this.options.refetchInterval(this.#currentQuery)
                : this.options.refetchInterval) ?? !1
            );
          }
          #updateRefetchInterval(nextInterval) {
            (this.#clearRefetchInterval(),
              (this.#currentRefetchInterval = nextInterval),
              !utils.S$ &&
                !1 !== (0, utils.Eh)(this.options.enabled, this.#currentQuery) &&
                (0, utils.gn)(this.#currentRefetchInterval) &&
                0 !== this.#currentRefetchInterval &&
                (this.#refetchIntervalId = timeoutManager.zs.setInterval(() => {
                  (this.options.refetchIntervalInBackground || focusManager.m.isFocused()) &&
                    this.#executeFetch();
                }, this.#currentRefetchInterval)));
          }
          #updateTimers() {
            (this.#updateStaleTimeout(),
              this.#updateRefetchInterval(this.#computeRefetchInterval()));
          }
          #clearStaleTimeout() {
            this.#staleTimeoutId &&
              (timeoutManager.zs.clearTimeout(this.#staleTimeoutId),
              (this.#staleTimeoutId = void 0));
          }
          #clearRefetchInterval() {
            this.#refetchIntervalId &&
              (timeoutManager.zs.clearInterval(this.#refetchIntervalId),
              (this.#refetchIntervalId = void 0));
          }
          createResult(query, options) {
            const prevQuery = this.#currentQuery,
              prevOptions = this.options,
              prevResult = this.#currentResult,
              prevResultState = this.#currentResultState,
              prevResultOptions = this.#currentResultOptions,
              queryInitialState =
                query !== prevQuery ? query.state : this.#currentQueryInitialState,
              { state } = query;
            let data,
              newState = { ...state },
              isPlaceholderData = !1;
            if (options._optimisticResults) {
              const mounted = this.hasListeners(),
                fetchOnMount = !mounted && shouldFetchOnMount(query, options),
                fetchOptionally =
                  mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
              ((fetchOnMount || fetchOptionally) &&
                (newState = { ...newState, ...(0, modern_query.k)(state.data, query.options) }),
                'isRestoring' === options._optimisticResults && (newState.fetchStatus = 'idle'));
            }
            let { error, errorUpdatedAt, status } = newState;
            data = newState.data;
            let skipSelect = !1;
            if (void 0 !== options.placeholderData && void 0 === data && 'pending' === status) {
              let placeholderData;
              (prevResult?.isPlaceholderData &&
              options.placeholderData === prevResultOptions?.placeholderData
                ? ((placeholderData = prevResult.data), (skipSelect = !0))
                : (placeholderData =
                    'function' == typeof options.placeholderData
                      ? options.placeholderData(
                          this.#lastQueryWithDefinedData?.state.data,
                          this.#lastQueryWithDefinedData
                        )
                      : options.placeholderData),
                void 0 !== placeholderData &&
                  ((status = 'success'),
                  (data = (0, utils.pl)(prevResult?.data, placeholderData, options)),
                  (isPlaceholderData = !0)));
            }
            if (options.select && void 0 !== data && !skipSelect)
              if (prevResult && data === prevResultState?.data && options.select === this.#selectFn)
                data = this.#selectResult;
              else
                try {
                  ((this.#selectFn = options.select),
                    (data = options.select(data)),
                    (data = (0, utils.pl)(prevResult?.data, data, options)),
                    (this.#selectResult = data),
                    (this.#selectError = null));
                } catch (selectError) {
                  this.#selectError = selectError;
                }
            this.#selectError &&
              ((error = this.#selectError),
              (data = this.#selectResult),
              (errorUpdatedAt = Date.now()),
              (status = 'error'));
            const isFetching = 'fetching' === newState.fetchStatus,
              isPending = 'pending' === status,
              isError = 'error' === status,
              isLoading = isPending && isFetching,
              hasData = void 0 !== data,
              nextResult = {
                status,
                fetchStatus: newState.fetchStatus,
                isPending,
                isSuccess: 'success' === status,
                isError,
                isInitialLoading: isLoading,
                isLoading,
                data,
                dataUpdatedAt: newState.dataUpdatedAt,
                error,
                errorUpdatedAt,
                failureCount: newState.fetchFailureCount,
                failureReason: newState.fetchFailureReason,
                errorUpdateCount: newState.errorUpdateCount,
                isFetched: newState.dataUpdateCount > 0 || newState.errorUpdateCount > 0,
                isFetchedAfterMount:
                  newState.dataUpdateCount > queryInitialState.dataUpdateCount ||
                  newState.errorUpdateCount > queryInitialState.errorUpdateCount,
                isFetching,
                isRefetching: isFetching && !isPending,
                isLoadingError: isError && !hasData,
                isPaused: 'paused' === newState.fetchStatus,
                isPlaceholderData,
                isRefetchError: isError && hasData,
                isStale: isStale(query, options),
                refetch: this.refetch,
                promise: this.#currentThenable,
                isEnabled: !1 !== (0, utils.Eh)(options.enabled, query),
              };
            if (this.options.experimental_prefetchInRender) {
              const finalizeThenableIfPossible = (thenable) => {
                  'error' === nextResult.status
                    ? thenable.reject(nextResult.error)
                    : void 0 !== nextResult.data && thenable.resolve(nextResult.data);
                },
                recreateThenable = () => {
                  const pending = (this.#currentThenable = nextResult.promise = (0, thenable.T)());
                  finalizeThenableIfPossible(pending);
                },
                prevThenable = this.#currentThenable;
              switch (prevThenable.status) {
                case 'pending':
                  query.queryHash === prevQuery.queryHash &&
                    finalizeThenableIfPossible(prevThenable);
                  break;
                case 'fulfilled':
                  ('error' !== nextResult.status && nextResult.data === prevThenable.value) ||
                    recreateThenable();
                  break;
                case 'rejected':
                  ('error' === nextResult.status && nextResult.error === prevThenable.reason) ||
                    recreateThenable();
              }
            }
            return nextResult;
          }
          updateResult() {
            const prevResult = this.#currentResult,
              nextResult = this.createResult(this.#currentQuery, this.options);
            if (
              ((this.#currentResultState = this.#currentQuery.state),
              (this.#currentResultOptions = this.options),
              void 0 !== this.#currentResultState.data &&
                (this.#lastQueryWithDefinedData = this.#currentQuery),
              (0, utils.f8)(nextResult, prevResult))
            )
              return;
            this.#currentResult = nextResult;
            this.#notify({
              listeners: (() => {
                if (!prevResult) return !0;
                const { notifyOnChangeProps } = this.options,
                  notifyOnChangePropsValue =
                    'function' == typeof notifyOnChangeProps
                      ? notifyOnChangeProps()
                      : notifyOnChangeProps;
                if (
                  'all' === notifyOnChangePropsValue ||
                  (!notifyOnChangePropsValue && !this.#trackedProps.size)
                )
                  return !0;
                const includedProps = new Set(notifyOnChangePropsValue ?? this.#trackedProps);
                return (
                  this.options.throwOnError && includedProps.add('error'),
                  Object.keys(this.#currentResult).some((key) => {
                    const typedKey = key;
                    return (
                      this.#currentResult[typedKey] !== prevResult[typedKey] &&
                      includedProps.has(typedKey)
                    );
                  })
                );
              })(),
            });
          }
          #updateQuery() {
            const query = this.#client.getQueryCache().build(this.#client, this.options);
            if (query === this.#currentQuery) return;
            const prevQuery = this.#currentQuery;
            ((this.#currentQuery = query),
              (this.#currentQueryInitialState = query.state),
              this.hasListeners() && (prevQuery?.removeObserver(this), query.addObserver(this)));
          }
          onQueryUpdate() {
            (this.updateResult(), this.hasListeners() && this.#updateTimers());
          }
          #notify(notifyOptions) {
            notifyManager.jG.batch(() => {
              (notifyOptions.listeners &&
                this.listeners.forEach((listener) => {
                  listener(this.#currentResult);
                }),
                this.#client
                  .getQueryCache()
                  .notify({ query: this.#currentQuery, type: 'observerResultsUpdated' }));
            });
          }
        };
      function shouldFetchOnMount(query, options) {
        return (
          (function shouldLoadOnMount(query, options) {
            return (
              !1 !== (0, utils.Eh)(options.enabled, query) &&
              void 0 === query.state.data &&
              !('error' === query.state.status && !1 === options.retryOnMount)
            );
          })(query, options) ||
          (void 0 !== query.state.data && shouldFetchOn(query, options, options.refetchOnMount))
        );
      }
      function shouldFetchOn(query, options, field) {
        if (
          !1 !== (0, utils.Eh)(options.enabled, query) &&
          'static' !== (0, utils.d2)(options.staleTime, query)
        ) {
          const value = 'function' == typeof field ? field(query) : field;
          return 'always' === value || (!1 !== value && isStale(query, options));
        }
        return !1;
      }
      function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
        return (
          (query !== prevQuery || !1 === (0, utils.Eh)(prevOptions.enabled, query)) &&
          (!options.suspense || 'error' !== query.state.status) &&
          isStale(query, options)
        );
      }
      function isStale(query, options) {
        return (
          !1 !== (0, utils.Eh)(options.enabled, query) &&
          query.isStaleByTime((0, utils.d2)(options.staleTime, query))
        );
      }
      var react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        QueryClientProvider = __webpack_require__(
          './node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js'
        );
      __webpack_require__('./node_modules/next/dist/compiled/react/jsx-runtime.js');
      function createValue() {
        let isReset = !1;
        return {
          clearReset: () => {
            isReset = !1;
          },
          reset: () => {
            isReset = !0;
          },
          isReset: () => isReset,
        };
      }
      var QueryErrorResetBoundaryContext = react.createContext(createValue()),
        IsRestoringContext = react.createContext(!1),
        fetchOptimistic =
          (IsRestoringContext.Provider,
          (defaultedOptions, observer, errorResetBoundary) =>
            observer.fetchOptimistic(defaultedOptions).catch(() => {
              errorResetBoundary.clearReset();
            }));
      function useBaseQuery(options, Observer, queryClient) {
        const isRestoring = react.useContext(IsRestoringContext),
          errorResetBoundary = react.useContext(QueryErrorResetBoundaryContext),
          client = (0, QueryClientProvider.jE)(queryClient),
          defaultedOptions = client.defaultQueryOptions(options);
        client.getDefaultOptions().queries?._experimental_beforeQuery?.(defaultedOptions);
        const query = client.getQueryCache().get(defaultedOptions.queryHash);
        ((defaultedOptions._optimisticResults = isRestoring ? 'isRestoring' : 'optimistic'),
          ((defaultedOptions) => {
            if (defaultedOptions.suspense) {
              const MIN_SUSPENSE_TIME_MS = 1e3,
                clamp = (value) =>
                  'static' === value
                    ? value
                    : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS),
                originalStaleTime = defaultedOptions.staleTime;
              ((defaultedOptions.staleTime =
                'function' == typeof originalStaleTime
                  ? (...args) => clamp(originalStaleTime(...args))
                  : clamp(originalStaleTime)),
                'number' == typeof defaultedOptions.gcTime &&
                  (defaultedOptions.gcTime = Math.max(
                    defaultedOptions.gcTime,
                    MIN_SUSPENSE_TIME_MS
                  )));
            }
          })(defaultedOptions),
          ((options, errorResetBoundary, query) => {
            const throwOnError =
              query?.state.error && 'function' == typeof options.throwOnError
                ? (0, utils.GU)(options.throwOnError, [query.state.error, query])
                : options.throwOnError;
            (options.suspense || options.experimental_prefetchInRender || throwOnError) &&
              (errorResetBoundary.isReset() || (options.retryOnMount = !1));
          })(defaultedOptions, errorResetBoundary, query),
          ((errorResetBoundary) => {
            react.useEffect(() => {
              errorResetBoundary.clearReset();
            }, [errorResetBoundary]);
          })(errorResetBoundary));
        const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash),
          [observer] = react.useState(() => new Observer(client, defaultedOptions)),
          result = observer.getOptimisticResult(defaultedOptions),
          shouldSubscribe = !isRestoring && !1 !== options.subscribed;
        if (
          (react.useSyncExternalStore(
            react.useCallback(
              (onStoreChange) => {
                const unsubscribe = shouldSubscribe
                  ? observer.subscribe(notifyManager.jG.batchCalls(onStoreChange))
                  : utils.lQ;
                return (observer.updateResult(), unsubscribe);
              },
              [observer, shouldSubscribe]
            ),
            () => observer.getCurrentResult(),
            () => observer.getCurrentResult()
          ),
          react.useEffect(() => {
            observer.setOptions(defaultedOptions);
          }, [defaultedOptions, observer]),
          ((defaultedOptions, result) => defaultedOptions?.suspense && result.isPending)(
            defaultedOptions,
            result
          ))
        )
          throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
        if (
          (({ result, errorResetBoundary, throwOnError, query, suspense }) =>
            result.isError &&
            !errorResetBoundary.isReset() &&
            !result.isFetching &&
            query &&
            ((suspense && void 0 === result.data) ||
              (0, utils.GU)(throwOnError, [result.error, query])))({
            result,
            errorResetBoundary,
            throwOnError: defaultedOptions.throwOnError,
            query,
            suspense: defaultedOptions.suspense,
          })
        )
          throw result.error;
        if (
          (client.getDefaultOptions().queries?._experimental_afterQuery?.(defaultedOptions, result),
          defaultedOptions.experimental_prefetchInRender &&
            !utils.S$ &&
            ((result, isRestoring) => result.isLoading && result.isFetching && !isRestoring)(
              result,
              isRestoring
            ))
        ) {
          const promise = isNewCacheEntry
            ? fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
            : query?.promise;
          promise?.catch(utils.lQ).finally(() => {
            observer.updateResult();
          });
        }
        return defaultedOptions.notifyOnChangeProps ? result : observer.trackResult(result);
      }
      function useQuery(options, queryClient) {
        return useBaseQuery(options, QueryObserver, queryClient);
      }
    },
    './node_modules/zustand/esm/react.mjs'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { v: () => create });
      var react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js');
      const createStoreImpl = (createState) => {
          let state;
          const listeners = new Set(),
            setState = (partial, replace) => {
              const nextState = 'function' == typeof partial ? partial(state) : partial;
              if (!Object.is(nextState, state)) {
                const previousState = state;
                ((state = (
                  null != replace ? replace : 'object' != typeof nextState || null === nextState
                )
                  ? nextState
                  : Object.assign({}, state, nextState)),
                  listeners.forEach((listener) => listener(state, previousState)));
              }
            },
            getState = () => state,
            api = {
              setState,
              getState,
              getInitialState: () => initialState,
              subscribe: (listener) => (listeners.add(listener), () => listeners.delete(listener)),
            },
            initialState = (state = createState(setState, getState, api));
          return api;
        },
        identity = (arg) => arg;
      const createImpl = (createState) => {
          const api = ((createState) =>
              createState ? createStoreImpl(createState) : createStoreImpl)(createState),
            useBoundStore = (selector) =>
              (function useStore(api, selector = identity) {
                const slice = react.useSyncExternalStore(
                  api.subscribe,
                  react.useCallback(() => selector(api.getState()), [api, selector]),
                  react.useCallback(() => selector(api.getInitialState()), [api, selector])
                );
                return (react.useDebugValue(slice), slice);
              })(api, selector);
          return (Object.assign(useBoundStore, api), useBoundStore);
        },
        create = (createState) => (createState ? createImpl(createState) : createImpl);
    },
  },
]);
