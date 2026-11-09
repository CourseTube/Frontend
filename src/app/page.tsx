"use client";

import Link from "next/link";
import { useApp } from "@/components/AppProvider";
import { CourseCard } from "@/components/CourseCard";

export default function Home() {
  const { courses } = useApp();
  return (
    <main>
      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> ПЛАТФОРМА ПРАКТИЧНОГО НАВЧАННЯ</div>
          <h1>Знання, що<br />змінюють <span>траєкторію.</span></h1>
          <p className="hero-description">Навчайтеся у тих, хто вже пройшов ваш шлях. Практичні курси для сміливих наступних кроків.</p>
          <div className="hero-actions"><Link href="/courses" className="button button-lime">Знайти свій курс <span>↗</span></Link><Link href="/author/create-course" className="text-link">Я хочу навчати <span>↗</span></Link></div>
          <div className="hero-proof"><div className="proof-avatars"><span>М</span><span>А</span><span>Д</span><span>+</span></div><div><strong>12 000+</strong><span>студентів вже з нами</span></div><span className="proof-divider" /><div><strong>4.9/5</strong><span>середня оцінка курсів</span></div></div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo"></div>
          <div className="hero-note"><span className="note-spark">✳</span><span>Навчайся.<br /><strong>Створюй.</strong><br />Зростай.</span></div>
          <div className="hero-floating-card"><span className="floating-icon">↗</span><span><strong>Твій наступний крок</strong><small>може початися сьогодні</small></span></div>
          <span className="hero-outline">LEARN / MAKE / GROW</span>
        </div>
      </section>

      <section className="path-section">
        <div className="section-heading"><div><span className="section-kicker">ДВА ШЛЯХИ. ОДНА СПІЛЬНОТА.</span><h2>Що привело тебе сюди?</h2></div><p>Ми створили простір, де кожен може бути і студентом, і автором власної історії.</p></div>
        <div className="path-grid">
          <Link href="/courses" className="path-card path-student"><span className="path-number">01 / НАВЧАЙСЯ</span><span className="path-icon">↘</span><div><h3>Шукаю курс</h3><p>Знайди навичку, яка відкриє нові можливості. Без зайвого шуму — тільки те, що працює.</p><span className="path-link">Переглянути каталог <b>↗</b></span></div></Link>
          <Link href="/author/create-course" className="path-card path-creator"><span className="path-number">02 / ДІЛИСЬ</span><span className="path-icon">↗</span><div><h3>Хочу запустити курс</h3><p>Твій досвід може змінити чийсь шлях. Створи курс та навчай свою спільноту.</p><span className="path-link">Стати автором <b>↗</b></span></div></Link>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-heading"><div><span className="section-kicker">ВИБІР СПІЛЬНОТИ</span><h2>Курси, з яких починають</h2></div><Link href="/courses" className="text-link">Усі курси <span>↗</span></Link></div>
        <div className="course-grid">{courses.slice(0, 4).map((course) => <CourseCard key={course.id} course={course} />)}</div>
      </section>

      <section className="manifesto-section"><span className="manifesto-mark">“</span><p>Найкраща інвестиція — це не ідеальний момент.<br /><strong>Це перший крок.</strong></p><Link href="/courses" className="button button-dark">Почати свій шлях <span>↗</span></Link></section>
    </main>
  );
}
