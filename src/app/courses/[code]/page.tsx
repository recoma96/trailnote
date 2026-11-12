import CourseHeader from "@/app/components/course-detail/CourseHeader";
import CourseIntroduction from "@/app/components/course-detail/CourseIntroduction";
import CourseMainPicture from "@/app/components/course-detail/CourseMainPicture";
import CourseMap from "@/app/components/course-detail/CourseDetailMap";
import { getCourse, getCourseCodes } from "@/app/lib/api/courses";
import { getCourseDifficulty } from "@/app/lib/constants/difficulty";
import HikingGraph from "@/app/components/course-detail/HikingGraph";
import CourseDifficultyIntroduceHeader from "@/app/components/course-detail/CourseDifficultyIntroduceHeader";
import CourseDifficultyIntroduce from "@/app/components/course-detail/CourseDifficultyIntroduce";
import CourseNote from "@/app/components/course-detail/CourseNote";
import type { Metadata } from "next";

// generateStaticParams로 접속하면 404가 나오게 설정
export const dynamicParams = false;

export async function generateStaticParams() {
  const courseCodes = await getCourseCodes();
  return courseCodes.map((code) => ({code}));
}

// 브라우저 타이틀 및 OG
export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const course = await getCourse(code);
  const firstImage = course.mainPictures[0];

  return {
    title: course.title,
    description: course.introduce,
    openGraph: {
      title: course.title,
      description: course.introduce,
      images: firstImage
        ? [{
            url: firstImage.url,
            width: firstImage.width,
            height: firstImage.height,
            alt: firstImage.summary || course.title,
          }]
        : [],
    },
  };
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
        introduce={course.introduce}
      />
      <CourseMainPicture mainPictures={course.mainPictures} />
      <hr style={{ margin: "30px 0"  }} />
      <CourseIntroduction courseDescriptions={course.courseDescriptions} />
      <hr style={{ margin: "30px 0"  }} />
      <CourseDifficultyIntroduceHeader runningTime={course.runningTime} segments={course.segments} difficultyInfo={difficultyInfo} />
      <CourseMap segments={course.segments} isReturn={course.isReturn} locations={course.locations} />
      <HikingGraph segments={course.segments} />
      <CourseDifficultyIntroduce segments={course.segments} />
      <hr style={{ margin: "30px 0"  }} />
      <CourseNote notes={course.notes}  />
    </main>
  );
}
