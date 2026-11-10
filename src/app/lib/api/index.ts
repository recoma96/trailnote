

export function  getBaseUrl(): string {
  const baseUrl = process.env.DATA_API_BASE_URL?.trim();
  if (!baseUrl) {
    throw new Error("서버 URL이 설정되지 않았습니다. 환경 변수를 확인하세요.");
  }
  return baseUrl;
}
