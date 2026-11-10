export function generateStaticParams() {
  return [{code: "ddd"}];
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  return (
    <div className="page">
      <h1>코스 코드: {code}</h1>
    </div>
  );
}
