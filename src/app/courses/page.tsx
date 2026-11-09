import { Suspense } from "react";
import { CatalogClient } from "@/components/CatalogClient";

export default function CoursesPage() {
  return <Suspense fallback={<main className="loading-page">Завантажуємо каталог…</main>}><CatalogClient /></Suspense>;
}
