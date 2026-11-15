'use client';

import Script from 'next/script';


declare global {
  interface Window {
    Kakao: any;
  }
}

export default function KakaoScript() {
  const handleKakaoinit = () => {
    // SDK가 로드되었고, 아직 초기화 되지 않았을 때 발생
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
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
