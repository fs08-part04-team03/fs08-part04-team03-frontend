import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E 테스트 설정
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // 테스트 파일 디렉토리
  testDir: './e2e',

  // 모든 테스트가 독립적으로 실행되도록 설정
  fullyParallel: true,

  // CI 환경에서만 테스트 실패 시 재시도하지 않음
  forbidOnly: !!process.env.CI,

  // 재시도 횟수 (로컬에서는 0)
  retries: 0,

  // CI 환경에서는 단일 워커 사용
  workers: process.env.CI ? 1 : undefined,

  // HTML 리포터
  reporter: [['html', { open: 'never' }]],

  // 공통 설정
  use: {
    // 기본 URL
    baseURL: 'http://localhost:3000',

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

  // 테스트 전 개발 서버 시작
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});
