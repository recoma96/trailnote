import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: false, // 렌더링 성능 향상을 위해 컴포넌트 캐싱 활성화 여부 (SSG 체계에서는 필요 없음)
  partialPrefetching: false, // 링크를 클릭하기 전에 이동할 페이지의 일부를 미리 가져오는 기능

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d3tddtbs9n2h5i.cloudfront.net",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
