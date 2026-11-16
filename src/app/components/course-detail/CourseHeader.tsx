import { GetCourseResponse } from "@/app/lib/api/types";
import "@/app/components/course-detail/course-header.css";
import { DifficultyInfo } from "@/app/lib/constants/difficulty";
import { CourseDifficultyBadge } from "../common/badges/DifficultyBadges";
import { MapPinned } from "lucide-react";

type CourseHeaderProps = Pick<GetCourseResponse, "title" | "address" | "introduce" | "mapLink"> & {
  difficultyInfo: DifficultyInfo,
};

export default async function CourseHeader({ title, address, difficultyInfo, introduce, mapLink } : CourseHeaderProps) {
  return (
    <div className="course-header">
      <div className="title-marker">⛰️</div>
      <div>
        <h1 className="title">{title}</h1>
        <p style={{ fontSize: "0.8rem"  }}>{introduce}</p>
        <hr />
      </div>
      <div className="address">
        <h2 className="addressName">{address}</h2>
        <a href={mapLink} target="_blank"><MapPinned color="var(--course-detail-address-color)" /></a>
      </div>
      <CourseDifficultyBadge difficulty={difficultyInfo} />
    </div>
  );
}