import { test, expect } from '@playwright/test';

/**
 * 인증 관련 E2E 테스트
 * - 로그인 페이지 UI 테스트
 * - 실제 로그인 테스트
 */

// 테스트 계정 정보
const TEST_EMAIL = 'test003@test001.com';
const TEST_PASSWORD = '!Q2w3e4r';

test.describe('로그인 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test.describe('페이지 렌더링', () => {
    test('로그인 페이지가 렌더링된다', async ({ page }) => {
      await expect(page.getByRole('heading', { name: '로그인' }).first()).toBeVisible();
    });

    test('로그인 버튼이 표시된다', async ({ page }) => {
      await expect(page.getByRole('button', { name: '로그인' }).first()).toBeVisible();
    });

    test('이메일 입력 필드가 표시된다', async ({ page }) => {
      await expect(page.getByRole('textbox', { name: '이메일' }).first()).toBeVisible();
    });

    test('비밀번호 입력 필드가 표시된다', async ({ page }) => {
      await expect(page.getByRole('textbox', { name: '비밀번호' }).first()).toBeVisible();
    });
  });

  test.describe('폼 상호작용', () => {
    test('빈 폼에서 로그인 버튼이 비활성화되어 있다', async ({ page }) => {
      const loginButton = page.getByRole('button', { name: '로그인' }).first();
      await expect(loginButton).toBeDisabled();
    });

    test('유효한 입력 후 로그인 버튼이 활성화된다', async ({ page }) => {
      await page.getByRole('textbox', { name: '이메일' }).first().fill('test@example.com');
      await page.getByRole('textbox', { name: '비밀번호' }).first().fill('Password123!');

      const loginButton = page.getByRole('button', { name: '로그인' }).first();
      await expect(loginButton).toBeEnabled();
    });
  });

  test.describe('실제 로그인 테스트', () => {
    test('유효한 자격 증명으로 로그인 성공 후 리다이렉트된다', async ({ page }) => {
      // 이메일 입력
      await page.getByRole('textbox', { name: '이메일' }).first().fill(TEST_EMAIL);

      // 비밀번호 입력
      await page.getByRole('textbox', { name: '비밀번호' }).first().fill(TEST_PASSWORD);

      // 로그인 버튼 클릭
      await page.getByRole('button', { name: '로그인' }).first().click();

      // 로그인 성공 후 리다이렉트 확인 (products 페이지로 이동)
      await expect(page).toHaveURL(/\/products/, { timeout: 15000 });
    });

    test('로그인 후 상품 목록 페이지가 표시된다', async ({ page }) => {
      await page.getByRole('textbox', { name: '이메일' }).first().fill(TEST_EMAIL);
      await page.getByRole('textbox', { name: '비밀번호' }).first().fill(TEST_PASSWORD);
      await page.getByRole('button', { name: '로그인' }).first().click();

      // 상품 목록 페이지 로드 대기
      await page.waitForURL(/\/products/, { timeout: 15000 });

      // 페이지가 로드되었는지 확인
      await expect(page.locator('body')).toBeVisible();
    });

    test('잘못된 비밀번호로 로그인 실패 시 로그인 페이지에 머무른다', async ({ page }) => {
      await page.getByRole('textbox', { name: '이메일' }).first().fill(TEST_EMAIL);
      await page.getByRole('textbox', { name: '비밀번호' }).first().fill('wrongpassword');
      await page.getByRole('button', { name: '로그인' }).first().click();

      // 로그인 페이지에 머무름
      await page.waitForTimeout(3000);
      await expect(page).toHaveURL(/\/login/);
    });

    test('존재하지 않는 이메일로 로그인 실패', async ({ page }) => {
      await page.getByRole('textbox', { name: '이메일' }).first().fill('nonexistent@test.com');
      await page.getByRole('textbox', { name: '비밀번호' }).first().fill('Password123!');
      await page.getByRole('button', { name: '로그인' }).first().click();

      // 로그인 페이지에 머무름
      await page.waitForTimeout(3000);
      await expect(page).toHaveURL(/\/login/);
    });
  });

  test.describe('네비게이션', () => {
    test('회원가입 링크 클릭 시 회원가입 페이지로 이동한다', async ({ page }) => {
      await page.getByRole('link', { name: '회원가입' }).first().click();
      await expect(page).toHaveURL(/\/signup/);
    });
  });
});

test.describe('회원가입 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signup');
  });

  test('회원가입 페이지가 렌더링된다', async ({ page }) => {
    // 회원가입 폼 요소 확인
    await expect(page.getByRole('textbox', { name: '이름' }).first()).toBeVisible();
  });

  test('로그인 링크 클릭 시 로그인 페이지로 이동한다', async ({ page }) => {
    await page
      .getByRole('link', { name: /로그인/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe('로그인 후 페이지 접근', () => {
  test.beforeEach(async ({ page }) => {
    // 로그인 수행
    await page.goto('/login');
    await page.getByRole('textbox', { name: '이메일' }).first().fill(TEST_EMAIL);
    await page.getByRole('textbox', { name: '비밀번호' }).first().fill(TEST_PASSWORD);
    await page.getByRole('button', { name: '로그인' }).first().click();
    await page.waitForURL(/\/products/, { timeout: 15000 });
  });

  test('로그인 후 상품 목록 페이지에 접근할 수 있다', async ({ page }) => {
    await expect(page).toHaveURL(/\/products/);
  });

  test('로그인 후 장바구니 페이지에 접근할 수 있다', async ({ page }) => {
    // 현재 URL에서 companyId 추출
    const currentUrl = page.url();
    const match = currentUrl.match(/\/(\d+)\/products/);
    expect(match).not.toBeNull();
    const companyId = match![1];
    await page.goto(`/${companyId}/cart`);
    await expect(page).toHaveURL(`/${companyId}/cart`);
  });

  test('로그인 후 찜목록 페이지에 접근할 수 있다', async ({ page }) => {
    const currentUrl = page.url();
    const match = currentUrl.match(/\/(\d+)\/products/);
    expect(match).not.toBeNull();
    const companyId = match![1];
    await page.goto(`/${companyId}/wishlist`);
    await expect(page).toHaveURL(`/${companyId}/wishlist`);
  });
});

test.describe('반응형 디자인', () => {
  test('모바일에서 로그인 폼이 표시된다', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/login');

    await expect(page.getByRole('heading', { name: '로그인' }).first()).toBeVisible();
    await expect(page.getByRole('textbox', { name: '이메일' }).first()).toBeVisible();
  });

  test('데스크톱에서 로그인 폼이 표시된다', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/login');

    await expect(page.getByRole('heading', { name: '로그인' }).first()).toBeVisible();
    await expect(page.getByRole('textbox', { name: '이메일' }).first()).toBeVisible();
  });
});
