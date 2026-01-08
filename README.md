# 프로젝트명

> 프로젝트에 대한 간단한 한 줄 설명

## 📖 프로젝트 소개

프로젝트에 대한 상세한 설명을 작성합니다.

## 🛠 기술 스택

### Frontend

- Next.js
- TypeScript
- Tailwind CSS

### Backend

- Express
- TypeScript
- PostgreSQL

## 📦 설치 방법

### 요구사항

- Node.js 18.x 이상
- PostgreSQL 14 이상

### 설치

```bash
# 레포지토리 클론
git clone https://github.com/username/project.git

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
```

## 🔧 환경 변수 설정

`.env` 파일을 생성하고 다음 변수를 설정하세요:

```
# API 설정
NEXT_PUBLIC_API_URL=https://snock.tplinkdns.com:4000
NEXT_PUBLIC_API_TIMEOUT=10000

# Next.js 앱 URL (서버 사이드 이미지 업로드에 필요)
# 개발 환경: http://localhost:3000
# 프로덕션 환경: 실제 배포된 도메인 URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# JWT 토큰 검증을 위한 시크릿 키
# 프로덕션 환경에서는 반드시 강력한 랜덤 문자열로 설정하세요
# 예: openssl rand -base64 32
JWT_SECRET=your-secret-key-here

# Node 환경 설정
NODE_ENV=development
```

자세한 내용은 `.env.example` 파일을 참고하세요.

## 🚀 실행 방법

### 개발 모드

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### 프로덕션 모드

```bash
npm start
```

### 테스트

```bash
npm test
```

## 📚 API 문서

API 문서는 다음 경로에서 확인할 수 있습니다:

- Swagger UI: http://localhost:3000/api-docs

## 🤝 기여 방법

기여 방법은 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고하세요.

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 👥 팀원

- 홍길동 ([@github-id](https://github.com/github-id)) - Frontend
- 김철수 ([@github-id](https://github.com/github-id)) - Backend
