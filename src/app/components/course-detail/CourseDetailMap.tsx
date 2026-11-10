'use client';

import "@/app/components/course-detail/course-detail-map.css";
import { GetCourseResponse } from "@/app/lib/api/types";
import { changeDifficultyColorCss2Hex, getSegemntDifficulty } from "@/app/lib/constants/difficulty";
import { isMobile } from "@/app/lib/utils";
import Script from "next/script";
import { useRef } from "react";

type CourseDetailMapProps = Pick<GetCourseResponse, "segments" | "isReturn">;

export default function CourseDetailMap({ segments, isReturn } : CourseDetailMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  const initMap = () =>  {
    if (!mapRef.current || !window.naver?.maps) return;

    const start = segments[0]?.startPoint;

    const maps = window.naver.maps;

    const naverMap = new maps.Map(mapRef.current, {
      center: new maps.LatLng(start.lat, start.lng),
      zoom: isMobile() ? 13 : 14,
    });

    segments.forEach((segment, index) => {
      // 코스에 대해 마커 및 폴리라인 생성
      const difficultyInfo = getSegemntDifficulty(segment.difficultyLevel);
      const mainColorCss = changeDifficultyColorCss2Hex(difficultyInfo);
      const anchorPoint = isMobile() ? new window.naver.maps.Point(8, 8) : new window.naver.maps.Point(10, 10);
      
      new window.naver.maps.Marker({
        map: naverMap,
        position: new window.naver.maps.LatLng(segment.startPoint.lat, segment.startPoint.lng),
        icon: {
          content: `<div class="course-marker" style="background-color: ${mainColorCss}">${index+1}</div>`,
          anchor: anchorPoint,
        }
      });
      
      // 마지막 마커 표시 (단, 원점회귀일 경우 표시하지 않는다)
      if (index + 1 === segments.length && !isReturn) {
        new window.naver.maps.Marker({
          map: naverMap,
          position: new window.naver.maps.LatLng(segment.endPoint.lat, segment.endPoint.lng),
          icon: {
            content: `<div class="course-marker" style="background-color: ${mainColorCss}">${index+1}</div>`
          }
        });
      }

      new window.naver.maps.Polyline({
        map: naverMap,
        strokeColor: mainColorCss,
        strokeWeight: isMobile() ? 4 : 6,
        path: segment.trackPoints.map((trackPoint) => new window.naver.maps.LatLng(trackPoint.lat, trackPoint.lng)),
      })
    });
  }

  return (
    <div>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        strategy="afterInteractive"
        onReady={initMap}
      />
      <div ref={mapRef} className="course-detail-map" />
    </div>
  );
}