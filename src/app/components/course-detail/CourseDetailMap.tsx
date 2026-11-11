'use client';

import "@/app/components/course-detail/course-detail-map.css";
import { CourseLocation, GetCourseResponse } from "@/app/lib/api/types";
import { changeDifficultyColorCss2Hex, getSegemntDifficulty } from "@/app/lib/constants/difficulty";
import { LOCATION_MARKER_ICONS } from "@/app/lib/constants/map";
import { isMobile } from "@/app/lib/utils";
import Script from "next/script";
import { useRef, useState } from "react";
import LocationBottomSheet from "./LocationBottomSheet";

type CourseDetailMapProps = Pick<GetCourseResponse, "segments" | "isReturn" | "locations">;

export default function CourseDetailMap({ segments, isReturn, locations } : CourseDetailMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<CourseLocation | null>(null);

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
      const courseLocationAnchorPoint = isMobile() ? new window.naver.maps.Point(-12, 8) : new window.naver.maps.Point(-14, 10);
      const startPointLatLng = new window.naver.maps.LatLng(segment.startPoint.lat, segment.startPoint.lng);
      
      new window.naver.maps.Marker({
        map: naverMap,
        position: startPointLatLng,
        icon: {
          content: `<div class="course-marker" style="background-color: ${mainColorCss}">${index+1}</div>`,
          anchor: anchorPoint,
        }
      });
      // 하단의 텍스트도 추가한다.
      new window.naver.maps.Marker({
        map: naverMap,
        position: startPointLatLng,
        icon: {
          content: `<span class="course-marker-text">${segment.startPoint.name}</span>`,
          anchor: courseLocationAnchorPoint,
        }
      });
      
      // 마지막 마커 표시 (단, 원점회귀일 경우 표시하지 않는다)
      if (index + 1 === segments.length && !isReturn) {
        const endPointLatLng = new window.naver.maps.LatLng(segment.endPoint.lat, segment.endPoint.lng);

        new window.naver.maps.Marker({
          map: naverMap,
          position: endPointLatLng,
          icon: {
            content: `<div class="course-marker" style="background-color: ${mainColorCss}">${index+1}</div>`
          }
        });
        new window.naver.maps.Marker({
          map: naverMap,
          position: endPointLatLng,
          icon: {
            content: `<span class="course-marker-text">${segment.endPoint.name}</span>`,
            anchor: courseLocationAnchorPoint,
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


    // 명소 관련 정보도 마커로 표시
    locations.forEach((location) => {
      const latLng = new window.naver.maps.LatLng(location.lat, location.lng);
      const markerWidth = isMobile() ? 30 : 40;
      const markerHeight = markerWidth * 1.2;
      const iconUrl = Object.hasOwn(LOCATION_MARKER_ICONS, location.type)
        ? LOCATION_MARKER_ICONS[location.type]
        : "/markers/default.svg";

      const marker = new window.naver.maps.Marker({
        map: naverMap,
        position: latLng,
        title: location.name,
        icon: {
          url: iconUrl,
          size: new maps.Size(markerWidth, markerHeight),
          scaledSize: new maps.Size(markerWidth, markerHeight),
          anchor: new maps.Point(markerWidth / 2, markerHeight * 46 / 48),
        },
      });

      // 클릭 시 해당 명소에 대한 모달이 하단에서 올라올라오게 리스너 설정
      window.naver.maps.Event.addListener(marker, "click", () => {
        // 클릭한 명소의 위치로 맵을 이동
        naverMap.panTo(new window.naver.maps.LatLng(location.lat, location.lng));
        // 모달 활성화
        setSelectedLocation(location);
      });
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
      <LocationBottomSheet
        location={selectedLocation}
        onClose={() => setSelectedLocation(null)}
      />
    </div>
  );
}
