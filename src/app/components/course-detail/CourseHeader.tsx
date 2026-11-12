import { GetCourseResponse } from "@/app/lib/api/types";
import "@/app/components/course-detail/course-header.css";
import { DifficultyInfo } from "@/app/lib/constants/difficulty";
import { CourseDifficultyBadge } from "../common/badges/DifficultyBadges";

type CourseHeaderProps = Pick<GetCourseResponse, "title" | "address" | "introduce"> & {
  difficultyInfo: DifficultyInfo,
};

export default async function CourseHeader({ title, address, difficultyInfo, introduce } : CourseHeaderProps) {
  return (
    <div className="main-layer">
      <div className="title-marker">⛰️</div>
      <div>
        <h1 className="title">{title}</h1>
        <p style={{ fontSize: "0.8rem"  }}>{introduce}</p>
        <hr />
      </div>
      <h2 className="address">{address}</h2>
      <CourseDifficultyBadge difficulty={difficultyInfo} />
    </div>
  );
}