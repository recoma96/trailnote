import "@/app/components/course-detail/course-difficulty-introduce.css";
import { GetCourseResponse } from "@/app/lib/api/types";
import { getSegemntDifficulty } from "@/app/lib/constants/difficulty";
import { setTimeNumber2KoreanTimeFormat } from "@/app/lib/utils";
import { ScrolledImageSlider } from "../common/ImageSlider";

type CourseDifficultyIntroduceProps = Pick<GetCourseResponse, "segments">

export default function CourseDifficultyIntroduce({ segments }: CourseDifficultyIntroduceProps) {
  return (
    <div className="course-difficulty-introduce">
      {segments.map((segment, index) => {

        const difficulty =  getSegemntDifficulty(segment.difficultyLevel);

        return (
          <div key={index} className="item">
            <div className="title-layer">
              <div
                className="marker"
                style={{
                  border: `4px solid ${difficulty.color}`,
                  color: `${difficulty.color}`
                }}
              >
                {index + 1}
              </div>
              <p>
                <strong>{segment.title}</strong>
                &nbsp;&nbsp;<strong style={{ color: difficulty.color  }}>[{difficulty.label}]</strong>
                &nbsp;&nbsp;(약: {setTimeNumber2KoreanTimeFormat(segment.runningTime)})
              </p>
            </div>
            <p>{segment.content}</p>
            <ScrolledImageSlider
              topic={segment.title}
              height={"300px"}
              mobileHeight={"200px"}
              images={segment.images.map((image) => ({
                src: image.url,
                alt: image.summary,
                width: image.width,
                height: image.height,
                content: image.summary,

                mobile_width: "200px",
                tablet_width: "400px",
              }))}
            />
          </div>
        );
      })}
    </div>
  );
}

