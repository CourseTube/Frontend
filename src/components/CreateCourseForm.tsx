"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/AppProvider";
import { categories } from "@/lib/mock-data";
import type { Course, QuizQuestion } from "@/types";

const generatedQuiz: QuizQuestion[] = [
  { question: "Який перший крок допомагає перетворити знання на результат?", options: ["Визначити конкретну ціль", "Одразу купити новий інструмент", "Пропустити планування"], answer: 0 },
  { question: "Як найкраще перевірити, що навичку засвоєно?", options: ["Застосувати її на практиці", "Перечитати назву уроку", "Відкласти вправу на потім"], answer: 0 },
];

export function CreateCourseForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("790");
  const [category, setCategory] = useState("Дизайн");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [quizReady, setQuizReady] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const { addCourse } = useApp();
  const router = useRouter();

  const handleTrailer = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      setError("Будь ласка, обери відеофайл.");
      return;
    }
    setError("");
    if (trailerUrl) URL.revokeObjectURL(trailerUrl);
    setTrailerUrl(URL.createObjectURL(file));
  };

  const generateQuiz = () => {
    setGenerating(true);
    setQuizReady(false);
    window.setTimeout(() => { setQuizReady(true); setGenerating(false); }, 1400);
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !description.trim() || Number(price) < 0) {
      setError("Заповни назву, опис і вкажи коректну ціну.");
      return;
    }
    const course: Course = {
      id: `author-${Date.now()}`,
      title: title.trim(),
      subtitle: description.trim().slice(0, 100),
      description: description.trim(),
      category,
      author: "Ви",
      authorRole: "Автор CourseTube",
      price: Number(price),
      rating: 5,
      reviewCount: 0,
      duration: "Новий курс",
      lessonCount: 1,
      certificate: true,
      language: "Українська",
      level: "Для всіх рівнів",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=85",
      accent: "#d8f36a",
      tags: [category, "Практика"],
      trailerUrl: trailerUrl || undefined,
      lessons: [{ id: "lesson-1", title: "Перший урок", duration: "10 хв", preview: true, quiz: generatedQuiz }],
      reviews: [],
    };
    addCourse(course);
    router.push(`/courses/${course.id}`);
  };

  return <main className="create-page"><div className="create-heading"><span className="section-kicker">COURSETUBE FOR CREATORS</span><h1>Твій досвід.<br /><span>Чиясь нова можливість.</span></h1><p>Збери знання в курс і поділися тим, що вмієш найкраще.</p></div><div className="create-layout"><aside className="create-aside"><span className="create-aside-icon">✳</span><span className="section-kicker">ТВОРИ СВОЄ</span><h2>Твій курс.<br />Твої правила.</h2><p>Без коду, складних налаштувань і довгої підготовки сайту. Зосередься на знаннях — усе інше вже готове.</p><div className="creator-benefits"><span>✓ Публікація за кілька хвилин</span><span>✓ Тести для кращого навчання</span><span>✓ Студенти у твоєму темпі</span></div></aside><form className="course-form" onSubmit={submit}><div className="form-step"><span>01</span><div><h2>Основи курсу</h2><p>Розкажи, чому навчаться твої студенти.</p></div></div><label className="form-field">Назва курсу<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Наприклад, Основи предметної фотографії" required maxLength={90} /></label><label className="form-field">Короткий опис<textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Яку проблему вирішує твій курс і що зможуть робити студенти?" required rows={4} maxLength={700} /><span className="field-hint">{description.length}/700</span></label><div className="form-two-col"><label className="form-field">Категорія<select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.filter((item) => item !== "Усі курси").map((item) => <option key={item}>{item}</option>)}</select></label><label className="form-field">Ціна курсу<input type="number" min="0" max="100000" step="10" value={price} onChange={(event) => setPrice(event.target.value)} required /><span className="field-hint">гривень, одноразово</span></label></div>
    <div className="form-step second-step"><span>02</span><div><h2>Додай трейлер</h2><p>Коротке відео знайомить студентів із курсом.</p></div></div><label className="upload-area"><input type="file" accept="video/*" onChange={(event) => handleTrailer(event.target.files?.[0])} /><span className="upload-icon">↑</span><strong>{trailerUrl ? "Трейлер додано" : "Завантажити відео трейлера"}</strong><small>MP4, WebM або інший відеоформат</small></label>{trailerUrl && <video className="trailer-preview" controls src={trailerUrl} />}
    <div className="form-step second-step"><span>03</span><div><h2>Підготуй тест</h2><p>Мінітест допоможе закріпити матеріал уроків.</p></div></div><div className="ai-quiz-box"><div className="ai-icon">✦</div><div className="ai-quiz-copy"><strong>AI-помічник для тестів</strong><span>{quizReady ? "Готово! Додали 2 тестові запитання до курсу." : "Згенеруй приклад тесту на основі опису курсу."}</span>{quizReady && <ul>{generatedQuiz.map((item) => <li key={item.question}>{item.question}</li>)}</ul>}</div><button type="button" className="button button-outline" onClick={generateQuiz} disabled={generating}>{generating ? <><span className="spinner" /> Генеруємо...</> : quizReady ? "Згенерувати ще раз" : "Згенерувати тест"}</button></div>
    {error && <p className="form-error" role="alert">{error}</p>}<div className="form-submit-row"><span>Твій курс буде доступний у каталозі на цьому пристрої.</span><button className="button button-dark" type="submit">Опублікувати курс <span>↗</span></button></div></form></div></main>;
}
