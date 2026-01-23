'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [2691],
  {
    './src/components/molecules/CustomModal/CustomModal.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Approved: () => Approved,
          Cancel: () => Cancel,
          Delete: () => Delete,
          Rejected: () => Rejected,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Molecules/Modal/CustomModal',
          component: __webpack_require__('./src/components/molecules/CustomModal/CustomModal.tsx')
            .A,
          tags: ['autodocs'],
        },
        Delete = {
          args: {
            open: !0,
            type: 'delete',
            productName: '샘플 상품',
            cancelCount: 3,
            onClose: () => {},
            onConfirm: () => {},
          },
        },
        Cancel = {
          args: {
            open: !0,
            type: 'cancel',
            productName: '샘플 상품',
            cancelCount: 3,
            onClose: () => {},
            onConfirm: () => {},
          },
        },
        Approved = {
          args: {
            open: !0,
            type: 'approved',
            onClose: () => {},
            onHome: () => {},
            onOrder: () => {},
          },
        },
        Rejected = {
          args: {
            open: !0,
            type: 'rejected',
            onClose: () => {},
            onHome: () => {},
            onOrder: () => {},
          },
        },
        __namedExportsOrder = ['Delete', 'Cancel', 'Approved', 'Rejected'];
      ((Delete.parameters = {
        ...Delete.parameters,
        docs: {
          ...Delete.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    open: true,\n    type: 'delete',\n    productName: '샘플 상품',\n    cancelCount: 3,\n    onClose: () => {},\n    onConfirm: () => {}\n  }\n}",
            ...Delete.parameters?.docs?.source,
          },
        },
      }),
        (Cancel.parameters = {
          ...Cancel.parameters,
          docs: {
            ...Cancel.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    open: true,\n    type: 'cancel',\n    productName: '샘플 상품',\n    cancelCount: 3,\n    onClose: () => {},\n    onConfirm: () => {}\n  }\n}",
              ...Cancel.parameters?.docs?.source,
            },
          },
        }),
        (Approved.parameters = {
          ...Approved.parameters,
          docs: {
            ...Approved.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    open: true,\n    type: 'approved',\n    onClose: () => {},\n    onHome: () => {},\n    onOrder: () => {}\n  }\n}",
              ...Approved.parameters?.docs?.source,
            },
          },
        }),
        (Rejected.parameters = {
          ...Rejected.parameters,
          docs: {
            ...Rejected.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    open: true,\n    type: 'rejected',\n    onClose: () => {},\n    onHome: () => {},\n    onOrder: () => {}\n  }\n}",
              ...Rejected.parameters?.docs?.source,
            },
          },
        }));
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
