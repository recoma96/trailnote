import { getBaseUrl } from ".";
import type { GetCourseResponse } from "./types";


export async function getCourseCodes(): Promise<string[]> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/courses/codes.json`;
  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`서버 요청에 실패했습니다. (HTTP ${response.status}).`);
  }

  return response.json() as Promise<string[]>;
}

export async function getCourse(code: string): Promise<GetCourseResponse> {
  const baseUrl = getBaseUrl();
  const trimedCode = code.trim();

  if (!trimedCode) {
    throw new Error("코스 코드를 입력해 주세요.");
  }

  const url = `${baseUrl}/courses/${encodeURIComponent(trimedCode)}.json`; // 외부로 들어온 code를 utf-8로 변형
  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`서버 요청에 실패했습니다. (HTTP ${response.status}).`);
  }

  // This type describes the response; it does not perform runtime validation.
  return response.json() as Promise<GetCourseResponse>;
}
