import { test, expect } from '@playwright/test';

/**
 * 네비게이션 E2E 테스트
 * - 페이지 이동 테스트
 * - 접근성 테스트
 */

test.describe('페이지 네비게이션', () => {
  test.describe('인증 페이지 라우팅', () => {
    test('로그인 페이지에 접근할 수 있다', async ({ page }) => {
      await page.goto('/login');
      await expect(page).toHaveURL(/\/login/);
      await expect(page.getByRole('heading', { name: '로그인' }).first()).toBeVisible();
    });

    test('회원가입 페이지에 접근할 수 있다', async ({ page }) => {
      await page.goto('/signup');
      await expect(page).toHaveURL(/\/signup/);
    });

    test('로그인 <-> 회원가입 페이지 간 이동이 가능하다', async ({ page }) => {
      // 로그인 -> 회원가입
      await page.goto('/login');
      await page.getByRole('link', { name: '회원가입' }).first().click();
      await expect(page).toHaveURL(/\/signup/);

      // 회원가입 -> 로그인
      await page
        .getByRole('link', { name: /로그인/i })
        .first()
        .click();
      await expect(page).toHaveURL(/\/login/);
    });
  });

  test.describe('URL 구조', () => {
    test('루트 경로가 정상 동작한다', async ({ page }) => {
      const response = await page.goto('/');
      expect(response?.ok()).toBeTruthy();
    });
  });

  test.describe('페이지 로딩 성능', () => {
    test('로그인 페이지가 5초 내에 로드된다', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/login');
      await page.waitForLoadState('domcontentloaded');
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(5000);
    });
  });
});

test.describe('접근성', () => {
  test.describe('로그인 페이지 접근성', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/login');
    });

    test('키보드로 폼 필드 간 이동이 가능하다', async ({ page }) => {
      const emailInput = page.getByRole('textbox', { name: '이메일' }).first();
      const passwordInput = page.getByRole('textbox', { name: '비밀번호' }).first();

      // 이메일 필드에 포커스
      await emailInput.focus();
      await expect(emailInput).toBeFocused();

      // Tab으로 비밀번호 필드로 이동
      await page.keyboard.press('Tab');
      await expect(passwordInput).toBeFocused();
    });

    test('폼 필드가 label과 연결되어 있다', async ({ page }) => {
      // 이메일 필드가 label과 연결됨
      await expect(page.getByRole('textbox', { name: '이메일' }).first()).toBeVisible();
      // 비밀번호 필드가 label과 연결됨
      await expect(page.getByRole('textbox', { name: '비밀번호' }).first()).toBeVisible();
    });

    test('로그인 버튼이 클릭 가능하다', async ({ page }) => {
      const loginButton = page.getByRole('button', { name: '로그인' }).first();
      await expect(loginButton).toBeVisible();
      await expect(loginButton).toHaveRole('button');
    });
  });
});

test.describe('브라우저 히스토리', () => {
  test('뒤로 가기가 정상 동작한다', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('link', { name: '회원가입' }).first().click();
    await expect(page).toHaveURL(/\/signup/);

    await page.goBack();
    await expect(page).toHaveURL(/\/login/);
  });

  test('앞으로 가기가 정상 동작한다', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('link', { name: '회원가입' }).first().click();
    await expect(page).toHaveURL(/\/signup/);

    await page.goBack();
    await expect(page).toHaveURL(/\/login/);

    await page.goForward();
    await expect(page).toHaveURL(/\/signup/);
  });
});
