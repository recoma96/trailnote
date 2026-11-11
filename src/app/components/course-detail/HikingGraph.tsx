'use client';

import "@/app/components/course-detail/hiking-graph.css";
import { GetCourseResponse } from "@/app/lib/api/types";
import { getSegemntDifficulty } from "@/app/lib/constants/difficulty";
import { ElevationProfilePoint, toElevationProfile } from "@/app/lib/utils";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceDot } from "recharts";


type HikingGraphProps = Pick<GetCourseResponse, "segments">;

type GraphPoint = {
  distanceKm: number;
  [key: `segment${number}`]: number | null;
};

export default function HikingGraph({ segments } : HikingGraphProps) {
  let lastDistanceKm = 0;
  const graphDatas: GraphPoint[] = [];
  const rawGraphDatas: ElevationProfilePoint[][] = [];
  const segmentKeys = segments.map((_, index) => `segment${index}` as const);

  // 위경도 -> 구간별 고도를 가진 공통 차트 데이터로 변환
  for (const [segmentIndex, segment] of segments.entries()) {
    const _grapPoints = toElevationProfile(segment.trackPoints, lastDistanceKm);
    rawGraphDatas.push(_grapPoints);

    // 포인트가 너무 많으면 그래프 노이즈가 심하기 때문에 20~25개로 줄인다.
    const graphDataPivok = Math.max(1, Math.floor(_grapPoints.length / 20));
    const graphPoints = _grapPoints.filter((_, index) => (index % graphDataPivok === 0 || index === _grapPoints.length - 1));

    lastDistanceKm = graphPoints.at(-1)?.distanceKm ?? lastDistanceKm;

    // 그래프에 마우스를 올릴 시, 여러 구간에서 이벤트가 발생하는 것을 방지하기 위함.
    for (const point of graphPoints) {
      const graphPoint: GraphPoint = { distanceKm: point.distanceKm };
      for (const key of segmentKeys) {
        graphPoint[key] = null;
      }
      graphPoint[segmentKeys[segmentIndex]] = point.elevation;
      graphDatas.push(graphPoint);
    }
  }

  const distanceTicks = Array.from(
    { length: Math.floor(lastDistanceKm) + 1},
    (_, index) => index,
  );

  return (
    <div className="hiking-graph">
      <AreaChart data={graphDatas} width="100%" height="100%" className="chart">
        <CartesianGrid
          vertical={false}
          strokeOpacity={0.6}
          strokeDasharray="4 2"
        />
        <XAxis
          type="number"
          dataKey="distanceKm"
          unit="km"
          domain={[0, lastDistanceKm]}
          ticks={distanceTicks}
          fontSize={"0.8rem"}
        />
        <YAxis
          type="number"
          width="auto"
          unit="m"
          fontSize={"0.8rem"}
        />

        <Tooltip
          content={({ active, payload, label }) => {
            const item = payload?.find((entry) => entry.value !== null);
            if (!(active && item)) return null;
            
            const dataKey = item.dataKey;
            
            // 세그먼트 추출
            if (typeof dataKey !== "string") {
              return null;
            }
            const segmentIndex = Number(dataKey.slice("segment".length));
            const segment = segments[segmentIndex];
            if (!segment) {
              return null;
            }
            
            // 난이도에 따라 툴팁 타이틀 배경색을 다르게
            const difficultyColor = getSegemntDifficulty(segment.difficultyLevel).color;
            
            return (
              <div className="tooltip">
                <p className="segment-name" style={{ background: difficultyColor }}>{segment.startPoint.name} ⭢ {segment.endPoint.name}</p>
                <p>거리: {Number(label).toFixed(2)}km</p>
                <p>고도: {Number(item.value).toFixed(0)}m</p>
              </div>
            );
          }}
        />
        
        {/* 그래프 선  */}
        {segmentKeys.map((dataKey, index) => {
          return (
            <Area
              dataKey={dataKey}
              connectNulls={false}
              type="linear"
              stroke={getSegemntDifficulty(segments[index].difficultyLevel).color}
              strokeWidth={3}
              fill={getSegemntDifficulty(segments[index].difficultyLevel).color}
              fillOpacity={0.2}
              key={index}
              gradientTransform=""
            />
          );
        })}

        {/* 각 그래프 점  */}
        {rawGraphDatas.map((point, index) => {
          const color = getSegemntDifficulty(segments[index].difficultyLevel).color;
          return (
            <ReferenceDot
              key={index}
              x={point[0].distanceKm}
              y={point[0].elevation}
              r={7}
              fill="white"
              stroke={color}
              strokeWidth={2}
              label={{
                value: index + 1,
                position: "center",
                fill: `${color}`,
                fontSize: 10,
                fontWeight: 700,
              }}
            />
          );
        })}
      </AreaChart>
    </div>
  );
}
