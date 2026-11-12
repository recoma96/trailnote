'use-client';

import "@/app/components/course-detail/course-difficulty-introduce-header.css";
import { GetCourseResponse } from "@/app/lib/api/types";
import { DifficultyInfo } from "@/app/lib/constants/difficulty";
import { setTimeNumber2KoreanTimeFormat } from "@/app/lib/utils";
import { Timer, Ruler } from "lucide-react";
import { DifficultyBar } from "../common/DifficultyBar";


type CourseDifficultyIntroduceHeader = Pick<GetCourseResponse, "runningTime" | "segments"> & {
  difficultyInfo: DifficultyInfo
};

export default function CourseDifficultyIntroduceHeader({ runningTime, segments, difficultyInfo } : CourseDifficultyIntroduceHeader) {
  const allDistance = segments.reduce((acc, segment) => acc + segment.runningTime, 0);
  
  const allDistanceKm = Math.floor(allDistance / 10) / 10; 
  
  return (
    <div className="course-introduce-main-layer">
        <div style={{fontSize: "2rem"}}>🌱</div>
        <h1 style={{margin: 0}}>코스 소개</h1>
        <div className="metadata">
          <div className="text-area">
            <div className="item distance">
              <Ruler size={20} />
              <p>거리: {allDistanceKm}</p>
            </div>
            <div className="item runningTime">
              <Timer size={20} />
              <p>소요시간: {setTimeNumber2KoreanTimeFormat(runningTime)}</p>
            </div>
          </div>
        </div>
        <DifficultyBar currentDifficulty={difficultyInfo}  />
      </div>
  )
}