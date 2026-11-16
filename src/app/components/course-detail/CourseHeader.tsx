import { GetCourseResponse } from "@/app/lib/api/types";
import "@/app/components/course-detail/course-header.css";
import { DifficultyInfo } from "@/app/lib/constants/difficulty";
import { CourseDifficultyBadge } from "../common/badges/DifficultyBadges";
import { MapPinned, ExternalLink } from "lucide-react";

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
        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="map-link"
          aria-label="네이버 지도에서 위치 보기 (새 탭에서 열림)"
        >
          <MapPinned size={16} aria-hidden />
          <span>지도</span>
          <ExternalLink size={12} aria-hidden />
        </a>
      </div>
      <CourseDifficultyBadge difficulty={difficultyInfo} />
    </div>
  );
}