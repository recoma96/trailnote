import "@/app/components/course-detail/course-introduction.css";
import { GetCourseResponse } from "@/app/lib/api/types";

type CourseIntroductionProps = Pick<GetCourseResponse, "courseDescriptions">;


export default async function CourseIntroduction({ courseDescriptions } : CourseIntroductionProps) {
  return (
    <div className="course-introduction-layer">
      {courseDescriptions.map((description, index) => (
        <section key={index}>
          <h3>{description.title}</h3>
          <p>{description.content}</p>
        </section>
      ))}
    </div>
  );
}
