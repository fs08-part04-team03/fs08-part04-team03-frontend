# 스낵 프로젝트 프론트엔드

> 회사 단위 간식 구매 및 예산 관리 시스템

## 프로젝트 소개

스낵 프로젝트는 회사에서 간식을 효율적으로 구매하고 예산을 관리할 수 있도록 돕는 웹 애플리케이션입니다. 여러 플랫폼에서 구매한 간식 내역을 한 곳에서 통합 관리하고, 기수별 지출을 똑똑하게 관리할 수 있습니다.

### 주요 기능

- **상품 관리**: 다양한 카테고리(스낵, 음료, 생수, 간편식 등)의 상품 등록 및 조회
- **장바구니**: 상품을 장바구니에 담아 일괄 구매 요청
- **구매 요청 시스템**: 사용자별 구매 요청 작성 및 관리자 승인 프로세스
- **구매 내역 관리**: 구매 내역 확인 및 관리 (관리자/최고관리자)
- **위시리스트**: 자주 구매하는 상품을 찜 목록에 저장
- **사용자 관리**: 역할 기반 접근 제어 (USER, MANAGER, ADMIN)
- **예산 관리**: 회사별 예산 설정 및 관리 (최고관리자)
- **대시보드**: 구매 통계 및 현황 한눈에 확인
- **챗봇**: 실시간 문의 및 도움말 제공

## 프로젝트 목표 및 설계 의도

이 프로젝트는 단순한 상품 구매 서비스가 아니라,
**회사 단위의 예산 통제와 구매 승인 프로세스를 디지털화**하는 것을 목표로 합니다.

이를 위해 다음과 같은 설계 원칙을 따랐습니다:

- **회사 단위 데이터 격리**: 모든 주요 라우트와 API는 `companyId` 기준으로 동작
- **역할 기반 책임 분리**: USER / MANAGER / ADMIN 권한을 명확히 구분
- **서버 상태와 클라이언트 상태 분리**: React Query와 Zustand의 역할 분담
- **확장 가능한 구조**: 기능 단위(features) 모듈화로 유지보수성 확보
- **Props Drilling 최소화**: 타입 그룹화 및 통합 훅 패턴 적용

## 기술 스택

### Frontend

- **Framework**: Next.js 16.0.10 (App Router)
- **Language**: TypeScript 5.9.3
- **UI Library**: React 19.2.1
- **Styling**: Tailwind CSS 4.1.17, PostCSS
- **상태 관리**: Zustand 5.0.8 (클라이언트), TanStack React Query 5.90.10 (서버)
- **폼 관리**: React Hook Form 7.66.1, Zod 4.1.12
- **차트**: Recharts 3.6.0
- **챗봇**: react-chatbot-kit 2.2.2

### Development Tools

- **Component Development**: Storybook 10.0.8
- **Code Quality**: ESLint (Airbnb config), Prettier
- **Git Hooks**: Husky, Lint-staged, Commitlint
- **Type Checking**: TypeScript strict mode

## 설치 방법

### 요구사항

- Node.js 18.0.0 이상
- npm 9.0.0 이상

### 설치

```bash
# 레포지토리 클론
git clone https://github.com/fs08-part04-team03/fs08-part04-team03-frontend.git

# 프로젝트 디렉토리로 이동
cd fs08-part04-team03-frontend

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local 파일을 열어 실제 값으로 수정
```

## 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```env
# API 설정
NEXT_PUBLIC_API_URL=https://snock.tplinkdns.com:4000
NEXT_PUBLIC_API_TIMEOUT=10000

# Next.js 앱 URL
# 개발 환경: http://localhost:3000
# 프로덕션 환경: 실제 배포된 도메인 URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# JWT 토큰 검증을 위한 시크릿 키
# 프로덕션 환경에서는 반드시 강력한 랜덤 문자열로 설정하세요
JWT_SECRET=your-secret-key-here

# 이미지 호스트 설정
IMAGE_HOST=snock.tplinkdns.com
IMAGE_PORT=4000
BACKEND_HOST=snock.tplinkdns.com
BACKEND_API_URL=https://snock.tplinkdns.com:4000

# Node 환경 설정
NODE_ENV=development
```

자세한 내용은 `.env.example` 파일을 참고하세요.

## 실행 방법

### 개발 모드

```bash
npm run dev
```

개발 서버는 `http://localhost:3000`에서 실행됩니다.

### 빌드

```bash
npm run build
```

빌드된 파일은 `.next/` 디렉토리에 생성됩니다.

### 프로덕션 모드

```bash
npm run build
npm start
```

### Storybook

```bash
# Storybook 개발 서버 실행
npm run storybook

# Storybook 빌드
npm run build-storybook
```

Storybook은 `http://localhost:6006`에서 실행됩니다.

### 코드 품질

```bash
# ESLint 실행
npm run lint

# ESLint 자동 수정
npm run lint:fix

# Prettier 포맷팅
npm run format

# 타입 체크
npm run type-check
```

## 주요 페이지

### 인증 (Auth)

- `/login` - 로그인
- `/signup` - 회원가입
- `/invite` - 초대장을 통한 회원가입

### 상품 (Products)

- `/[companyId]/products` - 상품 목록
- `/[companyId]/products/[productId]` - 상품 상세
- `/[companyId]/products/my` - 내 상품 등록 내역

### 장바구니 및 구매

- `/[companyId]/cart` - 장바구니
- `/[companyId]/purchase-request` - 구매 요청 작성
- `/[companyId]/my/purchase-requests` - 내 구매 요청 내역
- `/[companyId]/my/purchase-requests/[requestId]` - 구매 요청 상세

### 관리자 (Manager/Admin)

- `/[companyId]/requests` - 구매 요청 관리 (MANAGER 이상)
- `/[companyId]/purchase-history` - 구매 내역 확인 (MANAGER 이상)
- `/[companyId]/admin` - 관리자 대시보드 (ADMIN 전용)
- `/[companyId]/admin/users` - 사용자 관리 (ADMIN 전용)
- `/[companyId]/admin/budget` - 예산 관리 (ADMIN 전용)

### 기타

- `/[companyId]/wishlist` - 위시리스트
- `/[companyId]/my/profile` - 프로필 설정

## 프로젝트 구조

```
src/
├── app/                      # Next.js App Router
│   ├── (auth)/              # 인증 관련 페이지
│   │   ├── login/
│   │   ├── signup/
│   │   └── invite/
│   ├── [companyId]/         # 회사별 스코프 페이지
│   │   ├── admin/           # 관리자 페이지
│   │   ├── cart/            # 장바구니
│   │   ├── products/        # 상품 관리
│   │   ├── purchase-request/# 구매 요청
│   │   ├── purchase-history/# 구매 내역
│   │   ├── requests/        # 구매 요청 관리 (관리자)
│   │   ├── wishlist/        # 위시리스트
│   │   └── my/              # 마이페이지
│   └── api/                 # API 라우트
│
├── components/              # 재사용 가능한 컴포넌트
│   ├── atoms/              # 원자 컴포넌트 (Button, Input, Label 등)
│   ├── molecules/          # 분자 컴포넌트 (SearchBar, Modal 등)
│   ├── organisms/          # 유기체 컴포넌트 (GNB, SideBar 등)
│   ├── auth/               # 인증 관련 컴포넌트
│   ├── chatbot/            # 챗봇 컴포넌트
│   └── guards/             # 라우트 가드 컴포넌트
│
├── features/                # 기능별 모듈
│   ├── admin/              # 관리자 기능 (예산, 사용자 관리)
│   ├── auth/               # 인증 기능
│   ├── cart/               # 장바구니 기능
│   ├── dashboard/          # 대시보드
│   ├── landing/            # 랜딩 페이지
│   ├── products/           # 상품 관리
│   ├── profile/            # 프로필 관리
│   ├── purchase/           # 구매 요청 관리
│   ├── purchase-history/   # 구매 내역
│   └── wishlist/           # 위시리스트
│
├── constants/               # 상수 정의
├── hooks/                   # 커스텀 훅
├── lib/                     # 라이브러리 설정
│   ├── context/            # React Context
│   ├── query/              # React Query 설정
│   └── store/              # Zustand 스토어
├── shared/                  # 공유 Provider
└── utils/                   # 유틸리티 함수
```

## 보안 기능

### 인증 및 권한

- **JWT 기반 인증**: Access Token (localStorage) + Refresh Token (httpOnly Cookie)
- **자동 토큰 갱신**: Access Token 만료 전 자동 갱신 (4분 간격)
- **역할 기반 접근 제어**: USER, MANAGER, ADMIN 역할별 페이지 접근 제어
- **AuthGuard**: 클라이언트 사이드 인증 및 권한 검사 컴포넌트
- **RoleGuard**: 역할 기반 라우트 보호 컴포넌트

### 라우트 권한

```typescript
// 최고관리자 (ADMIN) 전용
'/[companyId]/admin';
'/[companyId]/admin/users';
'/[companyId]/admin/budget';

// 관리자 (MANAGER) 이상
'/[companyId]/requests';
'/[companyId]/purchase-history';

// 일반 사용자 (USER) 이상
'/[companyId]/products';
'/[companyId]/cart';
'/[companyId]/purchase-request';
```

### 데이터 보안

- **회사별 데이터 격리**: companyId 기반 데이터 접근 제어
- **교차 회사 접근 차단**: 다른 회사의 데이터 접근 차단

## 상태 관리 설계

### React Query (서버 상태)

- **역할**: API 데이터 캐싱 및 동기화
- **관리 대상**: 구매 내역, 상품 목록, 예산 정보 등 서버 소스 데이터
- **캐시 전략**: 5분 staleTime, 10분 gcTime
- **자동 재시도 비활성화**: TOO_MANY_REQUESTS 방지
- **Window Focus 갱신 비활성화**: 불필요한 API 호출 방지

### Zustand (클라이언트 상태)

- **역할**: 인증 정보, 사용자 정보, UI 상태 관리
- **설계 원칙**: 전역 접근이 필요한 상태만 저장하여 최소화
- **영구 저장**: localStorage를 통한 상태 유지 (accessToken, user)
- **서버 데이터와 분리**: 역할 분리로 상태 혼합 방지

## 기술적 문제 해결

### 문제 1: 로그아웃 후 다른 계정 로그인 시 이전 사용자 데이터 노출

- **원인**: React Query 캐시가 사용자 전환 시 유지됨
- **해결**:
  - 로그아웃 시 `queryClient.clear()` 호출로 모든 캐시 초기화
  - `clearAuth()` 호출로 Zustand 상태 및 localStorage 완전 제거
- **결과**: 사용자 간 데이터 오염 문제 해결

```typescript
// 로그아웃 처리 (auth.queries.ts)
onSuccess: () => {
  queryClient.clear();
  clearAuth();
};
```

### 문제 2: Props Drilling으로 인한 컴포넌트 복잡도 증가

- **원인**: 깊은 컴포넌트 트리에서 props를 여러 단계로 전달
- **해결**:
  - 관련 Props를 그룹화한 타입 정의 (`product-list.types.ts` 등)
  - 통합 훅 패턴 적용 (`useProductListState`, `usePurchaseHistoryState` 등)
  - Section 컴포넌트에서 상태와 핸들러를 한 번에 관리
- **결과**: 컴포넌트 간 결합도 감소 및 유지보수성 향상

```typescript
// 통합 훅 예시 (useProductListState.ts)
export const useProductListState = () => {
  // 상태, 핸들러, 쿼리를 하나의 훅에서 관리
  return { listProps, paginationProps, handlers };
};
```

## 반응형 디자인

- **Mobile First**: 모바일 우선 설계
- **Breakpoints**:
  - Mobile: 기본 (< 744px)
  - Tablet: 744px 이상
  - Desktop: 1024px 이상

## 커밋 규칙

프로젝트는 Conventional Commits 규칙을 따릅니다:

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅, 세미콜론 누락 등
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가 또는 수정
- `chore`: 빌드 프로세스 또는 보조 도구 변경

```bash
# 예시
git commit -m "feat: add product detail page"
git commit -m "fix: resolve cart item count issue"
```

## 배포

### 환경 변수 체크리스트

프로덕션 배포 전 다음 환경 변수를 확인하세요:

- [ ] `NODE_ENV=production`
- [ ] `NEXT_PUBLIC_API_URL` (프로덕션 API 서버 URL)
- [ ] `NEXT_PUBLIC_APP_URL` (프로덕션 도메인)
- [ ] `JWT_SECRET` (강력한 시크릿 키)
- [ ] `BACKEND_API_URL` (백엔드 API URL)

### 빌드 및 실행

```bash
# 프로덕션 빌드
npm run build

# 서버 실행
npm start
```

### 빌드 최적화

- **이미지 최적화**: Next.js Image 컴포넌트를 통한 AVIF/WebP 변환
- **코드 분할**: 자동 코드 스플리팅 및 동적 import
- **번들 최적화**: React Query, Recharts, Zod 패키지 최적화
- **소스맵 비활성화**: 프로덕션 빌드에서 소스맵 제거
- **콘솔 제거**: 프로덕션에서 console.log 제거 (error, warn 제외)

## 기여 방법

1. 이 레포지토리를 Fork 합니다
2. 새로운 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'feat: add amazing feature'`)
4. 브랜치에 Push 합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 팀원

Team 03 - Frontend Development Team
