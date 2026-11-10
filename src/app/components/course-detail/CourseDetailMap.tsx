'use client';

import "@/app/components/course-detail/course-detail-map.css";
import { GetCourseResponse } from "@/app/lib/api/types";
import Script from "next/script";
import { useRef } from "react";

type CourseDetailMapProps = Pick<GetCourseResponse, "segments">;

export default function CourseDetailMap({ segments } : CourseDetailMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  const initMap = () =>  {
    if (!mapRef.current || !window.naver?.maps) return;

    const start = segments[0]?.startPoint;

    const maps = window.naver.maps;

    new maps.Map(mapRef.current, {
      center: new maps.LatLng(start.lat, start.lng),
      zoom: 13,
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