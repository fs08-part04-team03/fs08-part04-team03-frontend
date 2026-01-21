import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E 테스트 설정
 * @see https://playwright.dev/docs/test-configuration
 *
 * EMFILE 에러 방지:
 * - 로컬 개발 시: 별도 터미널에서 'npm run dev'를 먼저 실행하세요
 * - CI 환경에서는 자동으로 서버가 시작됩니다
 */

const config = defineConfig({
  // 테스트 파일 디렉토리
  testDir: './e2e',

  // 모든 테스트가 독립적으로 실행되도록 설정
  fullyParallel: true,

  // CI 환경에서 test.only() 사용 시 빌드 실패
  forbidOnly: !!process.env.CI,

  // 재시도 횟수 (로컬 및 CI 모두 비활성화)
  retries: 0,

  // CI 환경에서는 단일 워커 사용
  workers: process.env.CI ? 1 : undefined,

  // 리포터
  // - 로컬에서 "아무 출력이 없다"는 혼란을 줄이기 위해 line + html 병행
  reporter: [['line'], ['html', { open: 'never' }]],

  // 공통 설정
  use: {
    // 기본 URL
    // localhost는 환경에 따라 IPv6(::1)로 해석되어 dev server 준비 대기에서 타임아웃될 수 있어
    // IPv4 loopback을 명시합니다.
    baseURL: 'http://127.0.0.1:3000',

    // 실패 시 트레이스 수집
    trace: 'on-first-retry',

    // 실패 시 스크린샷
    screenshot: 'only-on-failure',

    // 비디오 녹화 (필요시)
    video: 'retain-on-failure',
  },

  // 브라우저/디바이스 설정
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});

// CI 환경에서만 webServer 설정 추가
if (process.env.CI) {
  config.webServer = {
    command: 'npm run dev -- --hostname 127.0.0.1 --port 3000',
    // Playwright는 webServer 준비 여부를 url로 폴링합니다.
    // 현재 앱은 루트(/)가 404일 수 있으므로, 200이 보장되는 경로로 체크합니다.
    url: 'http://127.0.0.1:3000/login',
    reuseExistingServer: false,
    timeout: 120 * 1000,
  };
}

export default config;
