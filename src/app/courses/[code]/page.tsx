import CourseHeader from "@/app/components/course-detail/CourseHeader";
import CourseIntroduction from "@/app/components/course-detail/CourseIntroduction";
import CourseMainPicture from "@/app/components/course-detail/CourseMainPicture";
import CourseMap from "@/app/components/course-detail/CourseDetailMap";
import { getCourse, getCourseCodes } from "@/app/lib/api/courses";
import { getCourseDifficulty } from "@/app/lib/constants/difficulty";
import HikingGraph from "@/app/components/course-detail/HikingGraph";
import CourseDifficultyIntroduceHeader from "@/app/components/course-detail/CourseDifficultyIntroduceHeader";
import CourseDifficultyIntroduce from "@/app/components/course-detail/CourseDifficultyIntroduce";

// generateStaticParams로 접속하면 404가 나오게 설정
export const dynamicParams = false;

export async function generateStaticParams() {
  const courseCodes = await getCourseCodes();
  return courseCodes.map((code) => ({code}));
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const course = await getCourse(code);
  const difficultyInfo = getCourseDifficulty(course.courseLevel);

  return (
    <main className="page">
      <CourseHeader
        title={course.title}
        address={course.address}
        difficultyInfo={difficultyInfo}
      />
      <CourseMainPicture mainPictures={course.mainPictures} />
      <hr style={{ margin: "30px 0"  }} />
      <CourseIntroduction courseDescriptions={course.courseDescriptions} />
      <hr style={{ margin: "30px 0"  }} />
      <CourseDifficultyIntroduceHeader runningTime={course.runningTime} segments={course.segments} difficultyInfo={difficultyInfo} />
      <CourseMap segments={course.segments} isReturn={course.isReturn} locations={course.locations} />
      <HikingGraph segments={course.segments} />
      <CourseDifficultyIntroduce segments={course.segments} />
    </main>
  );
}
