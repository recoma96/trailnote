# Trailnote

Next.js App Router 기반 앱입니다. TypeScript, 일반 CSS, ESLint를 사용합니다.

## 개발 환경

- Node.js 20.9 이상 (초기 설정 확인 버전: 26.13.0)
- npm (초기 설정 확인 버전: 11.20.0)
- Next.js 16.4.5 / React 19.3.0

## 환경 변수

| 이름 | 필수 | 설명 |
| --- | --- | --- |
| `DATA_API_BASE_URL` | O | 코스 데이터(JSON)가 있는 S3 주소. 끝에 `/`를 붙이지 않습니다. |
| `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` | O | Naver Map API 클라이언트 ID |

코스 페이지는 SSG로 생성되므로, 프로덕션에서는 이 값이 **빌드할 때** 사용됩니다. 값이 없으면 빌드가 실패합니다.
개발 서버(`npm run dev`)에서는 코스 페이지에 접속할 때마다 사용되므로 로컬 개발에도 필요합니다.
요청하는 경로는 아래 두 가지입니다.

- `{DATA_API_BASE_URL}/courses/codes.json`: 빌드할 코스 코드 목록
- `{DATA_API_BASE_URL}/courses/{code}.json`: 코스 상세 정보

환경별 설정 위치는 다음과 같습니다.

- **로컬**: 프로젝트 루트에 `.env.local` 파일을 만들고 값을 넣습니다. `.env*` 파일은 git에 올라가지 않습니다.

  ```bash
  DATA_API_BASE_URL=https://example-bucket.s3.ap-northeast-2.amazonaws.com
  ```

- **GitHub Actions**: 저장소 Settings → Secrets and variables → Actions → **Variables**에 같은 이름으로 등록합니다.
- **Vercel**: 프로젝트 Settings → Environment Variables에 같은 이름으로 등록합니다.

## 실행

저장소를 처음 받은 경우 의존성을 설치합니다.

```bash
npm ci
```

개발 서버를 실행합니다.

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.
`src/app/page.tsx`를 수정하면 변경 사항이 자동 반영됩니다.

## 검증 및 프로덕션 실행

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

빌드 과정에서도 TypeScript 타입을 검사합니다. `src/app/layout.tsx`는 `next/font/google`로
Gowun Batang 폰트를 가져오므로 최초 개발 실행과 빌드 시 Google Fonts에 접근할 수 있어야 합니다.

## CI

`main` 브랜치 대상 PR과 `main` push 시 GitHub Actions(`.github/workflows/CI.yaml`)가 실행됩니다.

- **코드 검사**: `npm run lint`, `npm run typecheck` (PR, `main` push)
- **빌드 검증**: `npm run build`로 S3 데이터를 가져와 SSG 빌드가 성공하는지 확인 (PR에서만)

변경된 파일이 모두 Markdown(`*.md`)이면 CI를 실행하지 않습니다.

## 주요 파일

- `src/app/page.tsx`: 홈 페이지
- `src/app/layout.tsx`: 공통 레이아웃과 메타데이터
- `src/app/globals.css`: 전역 스타일
- `src/app/courses/[code]/page.tsx`: 코스 상세 페이지 (SSG)
- `src/app/difficulty/page.tsx`: 난이도 소개 페이지
- `src/app/lib/api/`: S3 데이터 요청 함수(`index.ts`, `courses.ts`)와 응답 타입(`types.ts`)
- `src/app/components/`: 공통 컴포넌트
- `public/`: 정적 파일
- `.github/workflows/CI.yaml`: CI 설정
- `next.config.ts`: Next.js 설정
- `eslint.config.mjs`: ESLint 설정
- `tsconfig.json`: TypeScript 설정 (`@/*`는 `src/*` 경로)

추가 설정은 [Next.js 공식 문서](https://nextjs.org/docs)를 참고하세요.
