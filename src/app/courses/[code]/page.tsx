import CourseHeader from "@/app/components/course-detail/CourseHeader";
import CourseMainPicture from "@/app/components/course-detail/CourseMainPicture";
import { getCourse, getCourseCodes } from "@/app/lib/api/courses";
import { getCourseDifficulty } from "@/app/lib/constants/difficulty";

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
    </main>
  );
}
