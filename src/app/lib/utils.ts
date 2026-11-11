import type { CourseTrackPoint } from "@/app/lib/api/types";

export type ElevationProfilePoint = {
  distanceKm: number;
  elevation: number;
};

/** 시작 거리(km)부터 지표면 거리를 누적하고, 좌표 순서와 해발고도(m)를 유지합니다. */
export function toElevationProfile(
  points: readonly CourseTrackPoint[],
  startDistanceKm: number = 0,
): ElevationProfilePoint[] {
  const earthRadiusKm = 6371;
  const toRadians = Math.PI / 180;
  let distanceKm = startDistanceKm;

  return points.map((point, index) => {
    if (index > 0) {
      const previous = points[index - 1];
      const latitudeDelta = (point.lat - previous.lat) * toRadians;
      const longitudeDelta = (point.lng - previous.lng) * toRadians;
      const a = Math.sin(latitudeDelta / 2) ** 2
        + Math.cos(previous.lat * toRadians)
        * Math.cos(point.lat * toRadians)
        * Math.sin(longitudeDelta / 2) ** 2;

      // 부동소수점 오차로 제곱근의 입력이 음수가 되는 것을 방지합니다.
      const clampedA = Math.min(1, Math.max(0, a));
      distanceKm += 2 * earthRadiusKm
        * Math.atan2(Math.sqrt(clampedA), Math.sqrt(1 - clampedA));
    }

    return { distanceKm, elevation: point.ele };
  });
}

export function isMobile():  boolean {
  return window.matchMedia("(max-width: 768px)").matches;
}
