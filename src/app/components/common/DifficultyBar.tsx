'use-client';

import "@/app/components/common/difficulty-bar.css";
import { COURSE_DIFFICULTIES, DifficultyInfo } from "@/app/lib/constants/difficulty";

export function DifficultyBar({ currentDifficulty } : { currentDifficulty: DifficultyInfo }) {
  const difficultyArray = getDifficultyArray();
  
  return (
    <div className="difficulty-bar">
      <div className="bar">
        {difficultyArray.map((difficulty, index) => (
          <div
            key={index}
            className="item"
            style={{
              background: `linear-gradient(
                to bottom,
                ${difficulty.color},
                color-mix(in srgb, ${difficulty.color} 70%, #EEEEEE)
              )`,
            }}
          >
            {
              difficulty.code === currentDifficulty.code && (
                <span className="difficulty-here">HERE!</span>
              )
            }
            <p style={{ fontSize: "0.6rem" }}>{difficulty.code}</p>
            <p>{difficulty.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function getDifficultyArray(): DifficultyInfo[]  {
  return Object.entries(COURSE_DIFFICULTIES)
    .filter(([key]) => key !== "0")
    .map(([, value]) => value);
}
