'use client';

import Script from 'next/script';


// Kakao Developers 메시지 템플릿 빌더로 만든 템플릿으로 공유
interface KakaoCustomSettings {
  templateId: number;
  templateArgs?: Record<string, string>; // 템플릿의 ${key} 자리에 들어갈 값
}

// 사용 중인 Kakao SDK 기능만 정의
interface KakaoSDK {
  init(appKey: string): void;
  isInitialized(): boolean;
  Share: {
    sendCustom(settings: KakaoCustomSettings): void;
  };
}

declare global {
  interface Window {
    Kakao?: KakaoSDK; // SDK를 비동기로 불러오므로 아직 없을 수 있음
  }
}

export default function KakaoScript() {
  const handleKakaoinit = () => {
    const appKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
    if (!appKey) {
      console.error("NEXT_PUBLIC_KAKAO_JS_KEY가 설정되지 않았습니다.");
      return;
    }

    // SDK가 로드되었고, 아직 초기화 되지 않았을 때 발생
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(appKey);
    }
  }

  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.8.5/kakao.min.js"
      integrity="sha384-v6JKY3z4FUkWq21oZDHZe74YvuPk/WUrVLrDHTBojHXClOSa3iXy7sCXPY1jkFbj"
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onLoad={handleKakaoinit}
    />
  );
}
