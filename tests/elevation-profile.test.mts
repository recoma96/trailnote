import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { toElevationProfile } from "../src/app/lib/utils.ts";
import type { GetCourseResponse } from "../src/app/lib/api/types.ts";

const course: GetCourseResponse = JSON.parse(readFileSync(
  new URL("./fixtures/juwangsan-joobong.json", import.meta.url),
  "utf8",
));

describe("toElevationProfile", () => {
  it("빈 배열을 전달하면 빈 프로파일을 반환한다", () => {
    assert.deepEqual(toElevationProfile([]), []);
    assert.deepEqual(toElevationProfile([], 1), []);
  });

  it("시작 거리가 1km이면 첫 점부터 1km 기준으로 거리를 누적한다", () => {
    const profile = toElevationProfile([
      { lat: 0, lng: 0, ele: 10 },
      { lat: 0, lng: 1, ele: 20 },
      { lat: 0, lng: 2, ele: 30 },
    ], 1);
    assert.equal(profile[0].distanceKm, 1);
    assert.ok(Math.abs(profile[1].distanceKm - 112.194926645) < 1e-8);
    assert.ok(Math.abs(profile[2].distanceKm - 223.389853289) < 1e-8);
    assert.deepEqual(profile.map((point) => point.elevation), [10, 20, 30]);
  });

  it("점이 하나여도 소수점 시작 거리를 그대로 유지한다", () => {
    assert.deepEqual(toElevationProfile([{ lat: 36, lng: 129, ele: 722 }], 1.25), [
      { distanceKm: 1.25, elevation: 722 },
    ]);
  });

  it("점이 하나이면 거리는 0km이고 고도는 유지된다", () => {
    assert.deepEqual(toElevationProfile([{ lat: 36, lng: 129, ele: 722 }]), [
      { distanceKm: 0, elevation: 722 },
    ]);
  });

  it("고도만 달라지면 지표면 거리는 증가하지 않는다", () => {
    assert.deepEqual(toElevationProfile([
      { lat: 36, lng: 129, ele: 100 },
      { lat: 36, lng: 129, ele: 200 },
    ]), [
      { distanceKm: 0, elevation: 100 },
      { distanceKm: 0, elevation: 200 },
    ]);
  });

  it("적도 위의 거리를 반올림 없이 소수점 km로 누적한다", () => {
    // 반지름 6371km인 구에서 적도 경도 1도의 거리는 약 111.194926645km이다.
    const profile = toElevationProfile([
      { lat: 0, lng: 0, ele: 10 },
      { lat: 0, lng: 1, ele: 20 },
      { lat: 0, lng: 2, ele: 30 },
    ]);
    assert.ok(Math.abs(profile[1].distanceKm - 111.194926645) < 1e-8);
    assert.ok(Math.abs(profile[2].distanceKm - 222.389853289) < 1e-8);
    assert.deepEqual(profile.map((point) => point.elevation), [10, 20, 30]);
  });

  it("고위도에서 경도 간 거리가 짧아지는 것을 반영한다", () => {
    const profile = toElevationProfile([
      { lat: 60, lng: 0, ele: 0 },
      { lat: 60, lng: 1, ele: 0 },
    ]);
    assert.ok(Math.abs(profile[1].distanceKm - 55.596934071) < 1e-8);
  });

  it("날짜 변경선을 지날 때 짧은 쪽 거리를 계산한다", () => {
    const profile = toElevationProfile([
      { lat: 0, lng: 179.5, ele: 0 },
      { lat: 0, lng: -179.5, ele: 0 },
    ]);
    assert.ok(Math.abs(profile[1].distanceKm - 111.194926645) < 1e-8);
  });

  it("입력 좌표를 변경하지 않는다", () => {
    const points = Object.freeze([
      Object.freeze({ lat: 36, lng: 129, ele: 100 }),
      Object.freeze({ lat: 36.01, lng: 129.01, ele: 200 }),
    ]);
    const original = structuredClone(points);
    toElevationProfile(points);
    assert.deepEqual(points, original);
  });
});

describe("주왕산 코스 JSON 데이터 검증", () => {
  it("5개 구간과 825개 좌표가 모두 포함되어 있다", () => {
    assert.equal(course.segments.length, 5);
    assert.equal(course.segments.flatMap((segment) => segment.trackPoints).length, 825);
  });

  for (const segment of course.segments) {
    it(`${segment.title}: 기록 거리와의 오차가 0.1km 이하이다`, () => {
      assert.ok(segment.trackPoints.length > 1);
      assert.ok(Number.isFinite(segment.distance) && segment.distance > 0);
      const profile = toElevationProfile(segment.trackPoints);
      const lastPoint = profile.at(-1);
      assert.ok(lastPoint, "계산된 프로파일에 마지막 점이 있어야 한다");
      const actualKm = lastPoint.distanceKm;
      const differenceKm = Math.abs(actualKm - segment.distance);

      assert.ok(
        differenceKm <= 0.1,
        `${segment.title}: 기록 ${segment.distance}km, 계산 ${actualKm}km, 오차 ${differenceKm}km (허용 오차: 0.1km)`,
      );
    });
  }

  it("모든 점의 고도를 유지하고 구간 경계를 넘어 거리를 누적한다", () => {
    const points = course.segments.flatMap((segment) => segment.trackPoints);
    const profile = toElevationProfile(points);
    assert.equal(profile.length, points.length);
    assert.equal(profile[0].distanceKm, 0);
    assert.deepEqual(profile.map((point) => point.elevation), points.map((point) => point.ele));
    for (let index = 1; index < profile.length; index++) {
      assert.ok(Number.isFinite(profile[index].distanceKm));
      assert.ok(profile[index].distanceKm >= profile[index - 1].distanceKm);
    }
  });
});
