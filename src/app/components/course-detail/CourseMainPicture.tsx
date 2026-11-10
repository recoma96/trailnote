import "@/app/components/course-detail/course-main-picture.css";
import Image from "next/image";
import { GetCourseResponse } from "@/app/lib/api/types";


type CourseMainPictureProps = Pick<GetCourseResponse, "mainPictures">;


export default async function CourseMainPicture({ mainPictures } : CourseMainPictureProps) {
  return (
    <div className="course-main-pictures">
      {mainPictures.map((image, index) => (
        <figure className="picture-frame" key={index}>
          <Image
            src={image.url}
            alt={image.summary}
            width={4000}
            height={2252}
            className="picture-item"
          />
          <figcaption>{image.summary}</figcaption>
        </figure>
      ))}
    </div>
  );
}
