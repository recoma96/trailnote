import "@/app/components/common/badges/difficulty-badges.css";
import { DifficultyInfo } from "@/app/lib/constants/difficulty";



export async function CourseDifficultyBadge({ difficulty }: {difficulty: DifficultyInfo}) {
  const stars = "★".repeat(difficulty.level) + "☆".repeat(7 -difficulty.level);
  
  return (
    <div
      className="course-difficulty-badge"
      style={{
        marginTop: "14px",
        borderColor: difficulty.color,
        color: difficulty.color,
      }}
    >
      <span
        className="course-difficulty-badge-level"
        style={{ background: difficulty.color }}
      >
        Lv.{difficulty.level}
      </span>
      <span
        className="course-difficulty-badge-code"
        style={{ background: difficulty.color }}
      >
        {difficulty.code}
      </span>
      <span className="course-difficulty-badge-stars">
        {stars}
      </span>
    </div>
  );
}