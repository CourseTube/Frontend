"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/components/AppProvider";
import type { Course, Lesson } from "@/types";

function QuizModal({ course, lesson, onClose }: { course: Course; lesson: Lesson; onClose: () => void }) {
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const score = lesson.quiz.reduce((total, question, index) => total + (answers[index] === question.answer ? 1 : 0), 0);
  const submit = () => {
    setSubmitted(true);
    localStorage.setItem(`coursetube:quiz:${course.id}:${lesson.id}`, JSON.stringify({ score, total: lesson.quiz.length }));
  };
  return <div className="modal-backdrop" role="presentation" onClick={onClose}><section className="quiz-modal" role="dialog" aria-modal="true" aria-labelledby="quiz-title" onClick={(event) => event.stopPropagation()}>
    <button className="modal-close" onClick={onClose} aria-label="Закрити">×</button><span className="section-kicker">ПЕРЕВІР СЕБЕ · {course.title}</span><h2 id="quiz-title">{lesson.title}</h2><p className="quiz-intro">Короткий тест допоможе закріпити матеріал уроку.</p>
    {lesson.quiz.map((item, index) => <fieldset className="quiz-question" key={item.question}><legend>{index + 1}. {item.question}</legend>{item.options.map((option, optionIndex) => <label className={`quiz-option ${submitted && optionIndex === item.answer ? "correct" : ""} ${submitted && answers[index] === optionIndex && optionIndex !== item.answer ? "incorrect" : ""}`} key={option}><input type="radio" name={`question-${index}`} checked={answers[index] === optionIndex} disabled={submitted} onChange={() => setAnswers((current) => { const next = [...current]; next[index] = optionIndex; return next; })} /><span>{option}</span></label>)}</fieldset>)}
    {submitted ? <div className="quiz-result"><strong>{score} з {lesson.quiz.length} правильних відповідей</strong><span>{score === lesson.quiz.length ? "Чудово! Матеріал засвоєно." : "Переглянь правильні відповіді та спробуй наступний урок."}</span></div> : <button className="button button-dark quiz-submit" onClick={submit} disabled={answers.length < lesson.quiz.length || answers.some((answer) => answer === undefined)}>Перевірити відповіді <span>↗</span></button>}
  </section></div>;
}

export function CourseDetailClient() {
  const params = useParams<{ id: string }>();
  const { courses, purchasedCourses, purchaseCourse, user } = useApp();
  const course = courses.find((item) => item.id === params.id);
  const [activeTab, setActiveTab] = useState("Про курс");
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [notice, setNotice] = useState("");
  const isPurchased = Boolean(course && purchasedCourses.includes(course.id));
  if (!course) return <main className="not-found"><span className="section-kicker">404 · КУРС НЕ ЗНАЙДЕНО</span><h1>Цей курс загубився.</h1><Link href="/courses" className="button button-dark">До каталогу <span>↗</span></Link></main>;

  const buyCourse = () => {
    purchaseCourse(course.id);
    setNotice("Курс додано до вашої бібліотеки. Приємного навчання!");
  };

  return <main className="course-detail-page">
    <div className="detail-breadcrumb"><Link href="/">Головна</Link><span>/</span><Link href="/courses">Курси</Link><span>/</span><span>{course.category}</span></div>
    <section className="course-detail-hero">
      <div className="course-detail-copy"><span className="course-category-detail">{course.category} <span>·</span> {course.level}</span><h1>{course.title}</h1><p className="detail-subtitle">{course.subtitle}</p><p className="detail-description">{course.description}</p>
        <div className="detail-author"><span className="author-avatar">{course.author.charAt(0)}</span><div><strong>{course.author}</strong><small>{course.authorRole}</small></div><span className="detail-rating">✦ {course.rating.toFixed(1)} <small>({course.reviewCount} відгуків)</small></span></div>
        <div className="detail-facts"><span>◷ {course.duration}</span><span>▤ {course.lessonCount} уроків</span><span>{course.certificate ? "✧ Сертифікат" : "◎ Практичний курс"}</span><span>◎ {course.language}</span></div>
        <div className="purchase-row"><div><strong>{course.price.toLocaleString("uk-UA")} ₴</strong><span>одноразова оплата · назавжди</span></div>{isPurchased ? <span className="purchased-badge">✓ Курс придбано</span> : <button className="button button-lime" onClick={buyCourse}>Придбати курс <span>↗</span></button>}</div>
        {notice && <p className="purchase-notice" role="status">{notice}</p>}
        {!user && !isPurchased && <p className="purchase-hint">Покупка збережеться на цьому пристрої. <Link href="/login">Увійди</Link>, щоб мати особисту бібліотеку.</p>}
      </div>
      <div className="detail-media"><div className="video-frame"><video controls poster={course.image} preload="none"><source src={course.trailerUrl || "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"} type="video/mp4" />Ваш браузер не підтримує відтворення відео.</video><span className="video-label">ТРЕЙЛЕР КУРСУ</span></div><div className="media-caption"><span><span className="live-dot" /> ПОЧНИ У ЗРУЧНИЙ ЧАС</span><span>Доступ одразу після оплати</span></div></div>
    </section>
    <section className="course-content-layout"><div className="course-tabs"><div className="tab-list" role="tablist">{["Про курс", "Програма", "Відгуки"].map((tab) => <button key={tab} role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? "tab active" : "tab"} onClick={() => setActiveTab(tab)}>{tab}{tab === "Програма" && <span className="tab-count">{course.lessons.length}</span>}</button>)}</div>
      {activeTab === "Про курс" && <div className="tab-panel"><span className="section-kicker">ПРО ЦЕЙ КУРС</span><h2>Навички, які можна застосувати вже сьогодні.</h2><p>{course.description}</p><h3>Після курсу ти зможеш</h3><ul className="outcomes-list">{course.tags.map((tag) => <li key={tag}><span>✓</span> Впевнено працювати з темою «{tag}»</li>)}</ul><div className="included-box"><strong>У курс входить</strong><span>◷ {course.duration} навчальних матеріалів</span><span>▤ {course.lessonCount} структурованих уроків</span><span>✧ {course.certificate ? "Сертифікат про завершення" : "Тести для закріплення знань"}</span><span>∞ Безстроковий доступ</span></div></div>}
      {activeTab === "Програма" && <div className="tab-panel"><span className="section-kicker">ПЛАН НАВЧАННЯ</span><h2>Крок за кроком до результату.</h2><div className="lesson-list">{course.lessons.map((lesson, index) => <div className="lesson-row" key={lesson.id}><span className="lesson-index">{String(index + 1).padStart(2, "0")}</span><div><strong>{lesson.title}</strong><span>{lesson.duration} · мінітест</span></div>{isPurchased || lesson.preview ? <button className="lesson-action" onClick={() => setActiveLesson(lesson)}>{lesson.preview && !isPurchased ? "Переглянути" : "Пройти урок"} <span>↗</span></button> : <span className="lesson-locked">🔒</span>}</div>)}</div></div>}
      {activeTab === "Відгуки" && <div className="tab-panel"><span className="section-kicker">ВІДГУКИ СТУДЕНТІВ</span><div className="reviews-summary"><strong>{course.rating.toFixed(1)}</strong><span><b>★★★★★</b><small>{course.reviewCount} відгуків про курс</small></span></div><div className="review-list">{course.reviews.map((review) => <article className="review-card" key={review.name}><div className="review-top"><span className="review-avatar">{review.name.charAt(0)}</span><div><strong>{review.name}</strong><small>{review.role}</small></div><span className="review-stars">{"★".repeat(review.rating)}</span></div><p>{review.text}</p></article>)}</div></div>}
    </div><aside className="detail-sidebar"><span className="section-kicker">СТВОРЕНО ДЛЯ ТЕБЕ</span><h3>Навчайся у власному темпі</h3><p>Переглядай уроки, повертайся до складного і закріплюй знання тестами.</p><div className="sidebar-facts"><span>✓ Доступ з будь-якого пристрою</span><span>✓ Практичні завдання</span><span>✓ Підтримка автора</span></div>{isPurchased ? <span className="purchased-badge full-width">Твій курс готовий до навчання</span> : <button className="button button-dark full-width" onClick={buyCourse}>Отримати доступ <span>↗</span></button>}</aside></section>
    {activeLesson && <QuizModal course={course} lesson={activeLesson} onClose={() => setActiveLesson(null)} />}
  </main>;
}
