'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [8096],
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
    './src/features/dashboard/components/DashboardCardOrg/DashboardCardOrg.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          CustomStyle: () => CustomStyle,
          Default: () => Default,
          DefaultWithExpense: () => DefaultWithExpense,
          DefaultWithYearlyBar: () => DefaultWithYearlyBar,
          LargeWithSnackRanking: () => LargeWithSnackRanking,
          MediumChangedUsersEmpty: () => MediumChangedUsersEmpty,
          MediumNewUsersEmpty: () => MediumNewUsersEmpty,
          MediumWithChangedUsers: () => MediumWithChangedUsers,
          MediumWithNewUsers: () => MediumWithNewUsers,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Features/Dashboard/Organisms/DashboardCardOrg',
          component: __webpack_require__(
            './src/features/dashboard/components/DashboardCardOrg/DashboardCardOrg.tsx'
          ).A,
          tags: ['autodocs'],
          parameters: {
            layout: 'centered',
            docs: {
              description: {
                component:
                  '\nDashboard 화면에서 사용되는 **카드형 Organism 컴포넌트**입니다.\n\n공통된 배경색과 border-radius를 유지하면서  \n**카드 높이와 내부 정렬 방식에 따라 3가지 variant**를 제공합니다.\n\n---\n\n## 역할 (Responsibility)\n\n- Dashboard 카드의 **공통 레이아웃 및 스타일 제공**\n- variant 기반 카드 크기 / 정렬 제어\n- default 카드 내부 콘텐츠 타입 분기 (요약 / 차트)\n- medium 카드 내부 리스트 타입 분기\n  - 신규 회원\n  - 탈퇴 / 권한 변경\n- large 카드에서 **이번 달 요청한 간식 순위 시각화**\n  - 도넛 차트\n  - 요청 수 기반 랭킹 리스트\n- 디자인 토큰 기반 배경색 적용  \n  (`--gray-primary-50`)\n\n> ⚠️ 이 컴포넌트는  \n> - API 연동  \n> - 데이터 포맷팅  \n> - 비즈니스 로직  \n> 을 포함하지 않는 **순수 UI Organism**입니다.\n        ',
              },
            },
          },
        },
        Default = { args: { variant: 'default' } },
        DefaultWithExpense = {
          name: 'Default / 지출 요약',
          args: {
            variant: 'default',
            defaultType: 'summary',
            monthlyExpense: 32e4,
            yearlyExpense: 458e4,
            showProgressBar: !0,
            progressValue: 65,
            currentBudget: 12e5,
            lastBudget: 9e5,
          },
        },
        DefaultWithYearlyBar = {
          name: 'Default / 월별 지출 그래프',
          args: {
            variant: 'default',
            defaultType: 'yearlyBar',
            monthlyExpensesByYear: [
              12e4, 18e4, 9e4, 22e4, 16e4, 14e4, 2e5, 17e4, 15e4, 19e4, 21e4, 25e4,
            ],
          },
        },
        MediumWithNewUsers = {
          name: 'Medium / 이번 달 신규 회원',
          args: {
            variant: 'medium',
            monthlyNewUsers: [
              {
                id: 'U001',
                name: '김민수',
                email: 'minsu@test.com',
                role: 'user',
                createdAt: '2025-01-03',
              },
              {
                id: 'U002',
                name: '이관리',
                email: 'manager@test.com',
                role: 'manager',
                createdAt: '2025-01-05',
              },
              {
                id: 'U003',
                name: '박관리자',
                email: 'admin@test.com',
                role: 'admin',
                createdAt: '2025-01-08',
              },
            ],
          },
        },
        MediumNewUsersEmpty = {
          name: 'Medium / 신규 회원 없음',
          args: { variant: 'medium', monthlyNewUsers: [] },
        },
        MediumWithChangedUsers = {
          name: 'Medium / 탈퇴 · 권한 변경',
          args: {
            variant: 'medium',
            monthlyChangedUsers: [
              {
                id: 'C001',
                name: '정미',
                email: 'withdraw@test.com',
                changeType: 'withdraw',
                changedAt: '2025-01-10',
              },
              {
                id: 'C002',
                name: '캄보디안',
                email: 'role@test.com',
                changeType: 'roleChange',
                beforeRole: 'user',
                afterRole: 'manager',
                changedAt: '2025-01-12',
              },
            ],
          },
        },
        MediumChangedUsersEmpty = {
          name: 'Medium / 탈퇴 · 권한 변경 없음',
          args: { variant: 'medium', monthlyChangedUsers: [] },
        },
        LargeWithSnackRanking = {
          name: 'Large / 이번 달 요청한 간식 순위',
          args: {
            variant: 'large',
            largeChartData: [
              { label: '초콜릿류', value: 48, color: '#2563EB' },
              { label: '과자', value: 36, color: '#16A34A' },
              { label: '젤리류', value: 22, color: '#F97316' },
              { label: '쿠키', value: 15, color: '#8B5CF6' },
              { label: '견과류', value: 9, color: '#6B7280' },
            ],
          },
        },
        CustomStyle = {
          args: {
            variant: 'default',
            defaultType: 'summary',
            monthlyExpense: 5e5,
            yearlyExpense: 62e5,
            showProgressBar: !0,
            progressValue: 80,
            currentBudget: 8e5,
            lastBudget: 1e6,
            className: 'ring-1 ring-gray-300',
          },
        },
        __namedExportsOrder = [
          'Default',
          'DefaultWithExpense',
          'DefaultWithYearlyBar',
          'MediumWithNewUsers',
          'MediumNewUsersEmpty',
          'MediumWithChangedUsers',
          'MediumChangedUsersEmpty',
          'LargeWithSnackRanking',
          'CustomStyle',
        ];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource: "{\n  args: {\n    variant: 'default'\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
          description: {
            story: '=====================\nDefault\n======================',
            ...Default.parameters?.docs?.description,
          },
        },
      }),
        (DefaultWithExpense.parameters = {
          ...DefaultWithExpense.parameters,
          docs: {
            ...DefaultWithExpense.parameters?.docs,
            source: {
              originalSource:
                "{\n  name: 'Default / 지출 요약',\n  args: {\n    variant: 'default',\n    defaultType: 'summary',\n    monthlyExpense: 320000,\n    yearlyExpense: 4580000,\n    showProgressBar: true,\n    progressValue: 65,\n    currentBudget: 1200000,\n    lastBudget: 900000\n  }\n}",
              ...DefaultWithExpense.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nDefault / 지출 요약\n======================',
              ...DefaultWithExpense.parameters?.docs?.description,
            },
          },
        }),
        (DefaultWithYearlyBar.parameters = {
          ...DefaultWithYearlyBar.parameters,
          docs: {
            ...DefaultWithYearlyBar.parameters?.docs,
            source: {
              originalSource:
                "{\n  name: 'Default / 월별 지출 그래프',\n  args: {\n    variant: 'default',\n    defaultType: 'yearlyBar',\n    monthlyExpensesByYear: [120000, 180000, 90000, 220000, 160000, 140000, 200000, 170000, 150000, 190000, 210000, 250000]\n  }\n}",
              ...DefaultWithYearlyBar.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nDefault / 월별 지출 그래프\n======================',
              ...DefaultWithYearlyBar.parameters?.docs?.description,
            },
          },
        }),
        (MediumWithNewUsers.parameters = {
          ...MediumWithNewUsers.parameters,
          docs: {
            ...MediumWithNewUsers.parameters?.docs,
            source: {
              originalSource:
                "{\n  name: 'Medium / 이번 달 신규 회원',\n  args: {\n    variant: 'medium',\n    monthlyNewUsers: [{\n      id: 'U001',\n      name: '김민수',\n      email: 'minsu@test.com',\n      role: 'user',\n      createdAt: '2025-01-03'\n    }, {\n      id: 'U002',\n      name: '이관리',\n      email: 'manager@test.com',\n      role: 'manager',\n      createdAt: '2025-01-05'\n    }, {\n      id: 'U003',\n      name: '박관리자',\n      email: 'admin@test.com',\n      role: 'admin',\n      createdAt: '2025-01-08'\n    }]\n  }\n}",
              ...MediumWithNewUsers.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nMedium / 신규 회원 리스트\n======================',
              ...MediumWithNewUsers.parameters?.docs?.description,
            },
          },
        }),
        (MediumNewUsersEmpty.parameters = {
          ...MediumNewUsersEmpty.parameters,
          docs: {
            ...MediumNewUsersEmpty.parameters?.docs,
            source: {
              originalSource:
                "{\n  name: 'Medium / 신규 회원 없음',\n  args: {\n    variant: 'medium',\n    monthlyNewUsers: []\n  }\n}",
              ...MediumNewUsersEmpty.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nMedium / 신규 회원 Empty\n======================',
              ...MediumNewUsersEmpty.parameters?.docs?.description,
            },
          },
        }),
        (MediumWithChangedUsers.parameters = {
          ...MediumWithChangedUsers.parameters,
          docs: {
            ...MediumWithChangedUsers.parameters?.docs,
            source: {
              originalSource:
                "{\n  name: 'Medium / 탈퇴 · 권한 변경',\n  args: {\n    variant: 'medium',\n    monthlyChangedUsers: [{\n      id: 'C001',\n      name: '정미',\n      email: 'withdraw@test.com',\n      changeType: 'withdraw',\n      changedAt: '2025-01-10'\n    }, {\n      id: 'C002',\n      name: '캄보디안',\n      email: 'role@test.com',\n      changeType: 'roleChange',\n      beforeRole: 'user',\n      afterRole: 'manager',\n      changedAt: '2025-01-12'\n    }]\n  }\n}",
              ...MediumWithChangedUsers.parameters?.docs?.source,
            },
            description: {
              story:
                '=====================\nMedium / 탈퇴 · 권한 변경 리스트\n======================',
              ...MediumWithChangedUsers.parameters?.docs?.description,
            },
          },
        }),
        (MediumChangedUsersEmpty.parameters = {
          ...MediumChangedUsersEmpty.parameters,
          docs: {
            ...MediumChangedUsersEmpty.parameters?.docs,
            source: {
              originalSource:
                "{\n  name: 'Medium / 탈퇴 · 권한 변경 없음',\n  args: {\n    variant: 'medium',\n    monthlyChangedUsers: []\n  }\n}",
              ...MediumChangedUsersEmpty.parameters?.docs?.source,
            },
            description: {
              story:
                '=====================\nMedium / 탈퇴 · 권한 변경 Empty\n======================',
              ...MediumChangedUsersEmpty.parameters?.docs?.description,
            },
          },
        }),
        (LargeWithSnackRanking.parameters = {
          ...LargeWithSnackRanking.parameters,
          docs: {
            ...LargeWithSnackRanking.parameters?.docs,
            source: {
              originalSource:
                "{\n  name: 'Large / 이번 달 요청한 간식 순위',\n  args: {\n    variant: 'large',\n    largeChartData: [{\n      label: '초콜릿류',\n      value: 48,\n      color: '#2563EB'\n    }, {\n      label: '과자',\n      value: 36,\n      color: '#16A34A'\n    }, {\n      label: '젤리류',\n      value: 22,\n      color: '#F97316'\n    }, {\n      label: '쿠키',\n      value: 15,\n      color: '#8B5CF6'\n    }, {\n      label: '견과류',\n      value: 9,\n      color: '#6B7280'\n    }]\n  }\n}",
              ...LargeWithSnackRanking.parameters?.docs?.source,
            },
            description: {
              story:
                '=====================\nLarge / 이번 달 요청한 간식 순위\n======================',
              ...LargeWithSnackRanking.parameters?.docs?.description,
            },
          },
        }),
        (CustomStyle.parameters = {
          ...CustomStyle.parameters,
          docs: {
            ...CustomStyle.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    variant: 'default',\n    defaultType: 'summary',\n    monthlyExpense: 500000,\n    yearlyExpense: 6200000,\n    showProgressBar: true,\n    progressValue: 80,\n    currentBudget: 800000,\n    lastBudget: 1000000,\n    className: 'ring-1 ring-gray-300'\n  }\n}",
              ...CustomStyle.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nCustom Style Override\n======================',
              ...CustomStyle.parameters?.docs?.description,
            },
          },
        }));
    },
  },
]);
