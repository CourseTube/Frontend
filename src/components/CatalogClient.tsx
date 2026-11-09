"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CourseCard } from "@/components/CourseCard";
import { useApp } from "@/components/AppProvider";
import { categories } from "@/lib/mock-data";

export function CatalogClient() {
  const { courses, purchasedCourses, user } = useApp();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Усі курси");
  const [priceRange, setPriceRange] = useState("any");
  const [certificateOnly, setCertificateOnly] = useState(false);
  const myCoursesOnly = searchParams.get("mine") === "1" && Boolean(user);
  const filtered = useMemo(() => courses.filter((course) => {
    const text = `${course.title} ${course.subtitle} ${course.author} ${course.category} ${course.tags.join(" ")}`.toLocaleLowerCase("uk");
    const matchesQuery = text.includes(query.toLocaleLowerCase("uk"));
    const matchesCategory = category === "Усі курси" || course.category === category;
    const matchesPrice = priceRange === "any" || (priceRange === "low" && course.price <= 700) || (priceRange === "mid" && course.price > 700 && course.price <= 1000) || (priceRange === "high" && course.price > 1000);
    return matchesQuery && matchesCategory && matchesPrice && (!certificateOnly || course.certificate) && (!myCoursesOnly || purchasedCourses.includes(course.id));
  }), [courses, query, category, priceRange, certificateOnly, myCoursesOnly, purchasedCourses]);

  return (
    <main className="catalog-page">
      <div className="catalog-intro"><div><span className="section-kicker">ТВОЯ НАСТУПНА НАВИЧКА — ТУТ</span><h1>{myCoursesOnly ? "Мої курси" : <>Знайди, що тебе <span>запалює.</span></>}</h1><p>Навчання від людей, які щодня створюють і змінюють індустрії.</p></div><span className="catalog-counter"><strong>0{courses.length}</strong><small>курсів<br />і можливостей</small></span></div>
      <div className="catalog-toolbar">
        <label className="search-field"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Пошук за назвою, автором чи темою..." /><kbd>⌘ K</kbd></label>
        <span className="results-count">{filtered.length} курсів знайдено</span>
      </div>
      <div className="catalog-layout">
        <aside className="filter-sidebar">
          <div className="filter-heading"><h2>Фільтри</h2><button onClick={() => { setCategory("Усі курси"); setPriceRange("any"); setCertificateOnly(false); setQuery(""); }}>Скинути</button></div>
          <div className="filter-group"><h3>Категорія</h3>{categories.map((item) => <button key={item} className={`filter-category ${category === item ? "selected" : ""}`} onClick={() => setCategory(item)}><span>{item}</span>{category === item && <span>↗</span>}</button>)}</div>
          <div className="filter-group"><h3>Ціна</h3>{[["any", "Будь-яка ціна"], ["low", "До 700 ₴"], ["mid", "700–1 000 ₴"], ["high", "Понад 1 000 ₴"]].map(([value, label]) => <label className="radio-option" key={value}><input type="radio" name="price" value={value} checked={priceRange === value} onChange={() => setPriceRange(value)} /><span>{label}</span></label>)}</div>
          <div className="filter-group"><label className="check-option"><input type="checkbox" checked={certificateOnly} onChange={(event) => setCertificateOnly(event.target.checked)} /><span>З сертифікатом</span></label></div>
        </aside>
        <section className="catalog-results" aria-live="polite">
          {filtered.length ? <div className="course-grid">{filtered.map((course) => <CourseCard key={course.id} course={course} />)}</div> : <div className="empty-state"><span>⌕</span><h2>Нічого не знайшлося</h2><p>Спробуй змінити запит або прибрати частину фільтрів.</p><button className="button button-dark" onClick={() => { setCategory("Усі курси"); setPriceRange("any"); setCertificateOnly(false); setQuery(""); }}>Скинути фільтри</button></div>}
        </section>
      </div>
    </main>
  );
}
