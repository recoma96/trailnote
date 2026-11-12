import "@/app/components/course-detail/course-note.css";
import { GetCourseResponse } from "@/app/lib/api/types";

type CourseNoteProps = Pick<GetCourseResponse, "notes">;


export default async function CourseNote({ notes }: CourseNoteProps) {

  return (
    <div className="course-note">
      <div className="title">
        <h1 style={{ margin: "0" }}>🤔</h1>
        <h1 style={{ margin: "0" }}>알아두면 좋은 것들</h1>
      </div>
      <div className="contents">
        {notes.map((note, index) => (
          <section key={index}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </section>
        ))}
      </div>
    </div>
  );
}