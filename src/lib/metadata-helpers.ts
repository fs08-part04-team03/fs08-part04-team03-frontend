/**
 * 서버 컴포넌트에서 메타데이터(title/description)를 만들 때 사용하는 헬퍼들입니다.
 *
 * accessToken은 클라이언트(localStorage)에서만 관리하므로,
 * 서버 단계에서 인증이 필요한 회사/사용자 정보를 조회하지 않습니다.
 */
export function fetchCompanyForMetadata(): Promise<{ name: string }> {
  return Promise.resolve({ name: 'SNACK' });
}

export function fetchUserForMetadata(): Promise<{ name: string } | null> {
  return Promise.resolve(null);
}
