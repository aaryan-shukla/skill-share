"use client";

import { useParams } from "next/navigation";

export default function ViewCourse() {
  const params = useParams();
  const id = params?.id;

  return (
    <div>
      <h1>Viewing Course</h1>
      {id ? <p>Course ID: {id}</p> : <p>Loading...</p>}
    </div>
  );
}
