import { Suspense } from "react";
import { CourseDetailClient } from "@/components/CourseDetailClient";

export default function CoursePage() {
  return <Suspense fallback={<main className="loading-page">Завантажуємо курс…</main>}><CourseDetailClient /></Suspense>;
}
