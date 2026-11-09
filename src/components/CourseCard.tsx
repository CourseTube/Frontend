import Link from "next/link";
import type { Course } from "@/types";

export function CourseCard({ course, compact = false }: { course: Course; compact?: boolean }) {
  return (
    <Link href={`/courses/${course.id}`} className={`course-card ${compact ? "course-card-compact" : ""}`}>
      <div className="course-image-wrap" style={{ backgroundColor: course.accent }}>
        <div className="course-image" role="img" aria-label={course.title} style={{ backgroundImage: `url("${course.image}")` }} />
        <span className="course-category">{course.category}</span>
        <span className="image-arrow">↗</span>
      </div>
      <div className="course-card-body">
        <div className="course-card-meta"><span>✦ {course.rating.toFixed(1)} <span className="muted">({course.reviewCount})</span></span><span>{course.duration}</span></div>
        <h3>{course.title}</h3>
        <p className="course-card-subtitle">{course.subtitle}</p>
        <div className="course-card-footer">
          <div className="instructor"><span className="instructor-dot">{course.author.charAt(0)}</span><span>{course.author}</span></div>
          <strong>{course.price.toLocaleString("uk-UA")} ₴</strong>
        </div>
      </div>
    </Link>
  );
}
