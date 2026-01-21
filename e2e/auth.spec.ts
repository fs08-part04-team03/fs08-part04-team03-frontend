import { test, expect } from '@playwright/test';

/**
 * 인증 관련 E2E 테스트
 * - 로그인 페이지 UI 테스트
 * - 실제 로그인 테스트
 */

// 테스트 계정 정보
// - CI/로컬에서 계정이 다를 수 있으므로 env로 주입 가능하게 한다.
// - 예) E2E_EMAIL="..." E2E_PASSWORD="..." npm run test:e2e
const TEST_EMAIL = process.env.E2E_EMAIL ?? 'test003@test001.com';
const TEST_PASSWORD = process.env.E2E_PASSWORD ?? '!Q2w3e4r';

function getLoginEmailInput(page: import('@playwright/test').Page) {
  // label 연결(접근성)을 기준으로 찾는다 (mobile/desktop 중복 렌더링에도 안전)
  return page.getByRole('textbox', { name: '이메일' }).first();
}

function getLoginPasswordInput(page: import('@playwright/test').Page) {
  return page.getByRole('textbox', { name: '비밀번호' }).first();
}

async function loginAndGetCompanyId(page: import('@playwright/test').Page): Promise<string> {
  await page.goto('/login');
  await getLoginEmailInput(page).fill(TEST_EMAIL);
  await getLoginPasswordInput(page).fill(TEST_PASSWORD);
  await page.getByRole('button', { name: '로그인' }).first().click();

  // 로그인 응답을 먼저 기다려서 "회사 선택 필요(409)" 케이스를 안정적으로 처리
  const companyDialog = page.getByRole('dialog', { name: '회사 선택' });
  const toast = page.getByRole('status');

  let loginStatus: number | null = null;
  try {
    const loginResponse = await page.waitForResponse(
      (res) =>
        res.request().method() === 'POST' &&
        // Next rewrite로 same-origin(/api/...) 요청이 발생하므로 path만 체크해도 충분
        res.url().includes('/api/v1/auth/login'),
      { timeout: 45_000 }
    );
    loginStatus = loginResponse.status();
  } catch {
    // 응답 자체가 없으면(네트워크 단절/서버 미기동/브라우저 레벨 실패)
    // 토스트가 떠 있으면 메시지로 안내하고, 아니면 URL 정보만 포함해 throw
    if (await toast.isVisible().catch(() => false)) {
      const message = (await toast.textContent())?.trim() || '(toast message not found)';
      throw new Error(`로그인 요청이 실패/중단되었습니다. url=${page.url()} toast=${message}`);
    }
    throw new Error(`로그인 응답을 받지 못했습니다. url=${page.url()}`);
  }

  if (loginStatus === 409) {
    // 회사 선택 모달이 열리고, 선택 후 "로그인"을 눌러야 리다이렉트됨
    await companyDialog.waitFor({ state: 'visible', timeout: 10_000 });
    await companyDialog.locator('button').first().click();
    await companyDialog
      .getByRole('button', { name: /로그인/ })
      .first()
      .click();
  } else if (loginStatus && loginStatus >= 400) {
    // 401/404/500 등: 보통 토스트로 안내되므로 토스트 텍스트를 포함해 에러로 만든다
    if (await toast.isVisible().catch(() => false)) {
      const message = (await toast.textContent())?.trim() || '(toast message not found)';
      throw new Error(`로그인 실패(status=${loginStatus}). url=${page.url()} toast=${message}`);
    }
    throw new Error(`로그인 실패(status=${loginStatus}). url=${page.url()}`);
  }

  await page.waitForURL(/\/products/, { timeout: 45_000 });

  const currentUrl = page.url();
  const match = currentUrl.match(/\/([^/]+)\/products/);
  const companyId = match?.[1];
  if (!companyId) {
    throw new Error(`companyId를 URL에서 찾지 못했습니다. url=${currentUrl}`);
  }
  return companyId;
}

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
      await expect(getLoginEmailInput(page)).toBeVisible();
    });

    test('비밀번호 입력 필드가 표시된다', async ({ page }) => {
      await expect(getLoginPasswordInput(page)).toBeVisible();
    });
  });

  test.describe('폼 상호작용', () => {
    test('빈 폼에서 로그인 버튼이 비활성화되어 있다', async ({ page }) => {
      const loginButton = page.getByRole('button', { name: '로그인' }).first();
      await expect(loginButton).toBeDisabled();
    });

    test('유효한 입력 후 로그인 버튼이 활성화된다', async ({ page }) => {
      await getLoginEmailInput(page).fill('test@example.com');
      await getLoginPasswordInput(page).fill('Password123!');

      const loginButton = page.getByRole('button', { name: '로그인' }).first();
      await expect(loginButton).toBeEnabled();
    });
  });

  test.describe('실제 로그인 테스트', () => {
    test('유효한 자격 증명으로 로그인 성공 후 리다이렉트된다', async ({ page }) => {
      await loginAndGetCompanyId(page);
      await expect(page).toHaveURL(/\/products/, { timeout: 30000 });
    });

    test('로그인 후 상품 목록 페이지가 표시된다', async ({ page }) => {
      await loginAndGetCompanyId(page);

      // 페이지가 로드되었는지 확인
      await expect(page.locator('body')).toBeVisible();
    });

    test('잘못된 비밀번호로 로그인 실패 시 로그인 페이지에 머무른다', async ({ page }) => {
      await getLoginEmailInput(page).fill(TEST_EMAIL);
      await getLoginPasswordInput(page).fill('wrongpassword');
      await page.getByRole('button', { name: '로그인' }).first().click();

      // 로그인 페이지에 머무름
      await page.waitForTimeout(3000);
      await expect(page).toHaveURL(/\/login/);
    });

    test('존재하지 않는 이메일로 로그인 실패', async ({ page }) => {
      await getLoginEmailInput(page).fill('nonexistent@test.com');
      await getLoginPasswordInput(page).fill('Password123!');
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
  let companyId: string;

  test.beforeEach(async ({ page }) => {
    companyId = await loginAndGetCompanyId(page);
  });

  test('로그인 후 상품 목록 페이지에 접근할 수 있다', async ({ page }) => {
    await expect(page).toHaveURL(/\/products/);
  });

  test('로그인 후 장바구니 페이지에 접근할 수 있다', async ({ page }) => {
    await page.goto(`/${companyId}/cart`);
    await expect(page).toHaveURL(`/${companyId}/cart`);
  });

  test('로그인 후 찜목록 페이지에 접근할 수 있다', async ({ page }) => {
    await page.goto(`/${companyId}/wishlist`);
    await expect(page).toHaveURL(`/${companyId}/wishlist`);
  });
});

test.describe('토큰 저장 방식 마이그레이션 (메모리 기반) QA', () => {
  test('로그인 후 새로고침해도 인증이 유지된다 (refresh로 복원)', async ({ page }) => {
    await loginAndGetCompanyId(page);

    // 새로고침(메모리 초기화) 후에도 refreshToken(cookie)로 복원되어 /login으로 가지 않아야 함
    await page.reload();
    await expect(page).toHaveURL(/\/products/, { timeout: 15000 });
    await expect(page).not.toHaveURL(/\/login/);

    // localStorage에 auth-storage가 남아있지 않아야 함
    const legacy = await page.evaluate(() => window.localStorage.getItem('auth-storage'));
    expect(legacy).toBeNull();
  });

  test('쿠키 삭제(로그아웃에 준하는 상태) 후 새로고침하면 로그인 페이지로 유도된다', async ({
    page,
  }) => {
    const companyId = await loginAndGetCompanyId(page);

    // refreshToken(httpOnly) 포함 모든 쿠키 제거 = 로그아웃 상태로 가정
    await page.context().clearCookies();

    // 보호 라우트에서 새로고침 → refresh 실패 → /login으로 이동해야 함
    await page.goto(`/${companyId}/products`);
    await page.reload();
    await expect(page).toHaveURL(/\/login/, { timeout: 15000 });
  });

  test('API 호출 중 401 발생 시 refresh로 복구된다 (상품 목록 API 1회 401 강제)', async ({
    page,
  }) => {
    const companyId = await loginAndGetCompanyId(page);

    // 초기 로그인 플로우에서 벗어나도록 다른 페이지로 이동
    await page.goto(`/${companyId}/cart`);

    let refreshCallCount = 0;
    const onRequest = (req: import('@playwright/test').Request) => {
      const url = req.url();
      if (url.includes('/api/auth/refresh') || url.includes('/api/v1/auth/refresh')) {
        refreshCallCount += 1;
      }
    };
    page.on('request', onRequest);

    // 상품 목록 API를 1회만 401로 강제
    let forced401 = false;
    await page.route('**/api/v1/product**', async (route) => {
      if (!forced401) {
        forced401 = true;
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Unauthorized (forced by e2e)' }),
        });
        return;
      }
      await route.continue();
    });

    // 상품 목록으로 이동 → 첫 요청 401 → refresh 호출 → 재시도 후 정상 렌더
    await page.goto(`/${companyId}/products`);
    await expect(page).toHaveURL(/\/products/, { timeout: 15000 });
    await expect(page).not.toHaveURL(/\/login/);
    await expect(page.locator('body')).toBeVisible();

    // 401을 처리하기 위해 refresh가 실제로 호출되었는지 확인
    await expect.poll(() => refreshCallCount, { timeout: 15000 }).toBeGreaterThan(0);
  });
});

test.describe('반응형 디자인', () => {
  test('모바일에서 로그인 폼이 표시된다', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/login');

    await expect(page.getByRole('heading', { name: '로그인' }).first()).toBeVisible();
    await expect(getLoginEmailInput(page)).toBeVisible();
  });

  test('데스크톱에서 로그인 폼이 표시된다', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/login');

    await expect(page.getByRole('heading', { name: '로그인' }).first()).toBeVisible();
    await expect(getLoginEmailInput(page)).toBeVisible();
  });
});
