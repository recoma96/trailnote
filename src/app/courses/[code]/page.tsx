import { getCourse, getCourseCodes } from "@/app/lib/api/courses";

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

  return (
    <div className="page">
      <h1>코스명 {course.title}</h1>
    </div>
  );
}
