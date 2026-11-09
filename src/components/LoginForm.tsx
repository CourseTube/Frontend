"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/AppProvider";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useApp();
  const router = useRouter();

  const completeSignIn = (address: string) => {
    const nameFromEmail = address.split("@")[0].replace(/[._-]/g, " ").replace(/\b\p{L}/gu, (letter) => letter.toLocaleUpperCase("uk"));
    signIn({ name: nameFromEmail || "Студент", email: address });
    router.push("/courses");
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.includes("@") || password.length < 6) {
      setError("Введи коректну електронну пошту та пароль від 6 символів.");
      return;
    }
    setError("");
    completeSignIn(email);
  };

  return <main className="login-page"><section className="login-aside"><span className="section-kicker">COURSETUBE / ТВОЄ НАВЧАННЯ</span><div><span className="login-quote-mark">“</span><h1>Зростання починається з цікавості.</h1><p>Збережи свої курси в одному місці та продовжуй саме там, де зупинився.</p></div><span className="login-aside-foot">ЗНАННЯ, ЩО ПРАЦЮЮТЬ НА ТЕБЕ ↗</span></section><section className="login-form-wrap"><div className="login-form-inner"><span className="section-kicker">РАДІ ЗНОВУ БАЧИТИ</span><h2>Увійди до<br /><span>свого простору.</span></h2><p className="login-lead">Увійди, щоб побачити свою бібліотеку курсів.</p><form className="login-form" onSubmit={submit}><label>Email<input type="email" placeholder="name@example.com" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label>Пароль<input type="password" placeholder="Не менше 6 символів" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} required /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-dark full-width" type="submit">Увійти <span>↗</span></button></form><div className="login-divider"><span />або продовжити з<span /></div><div className="oauth-buttons"><button onClick={() => completeSignIn(email || "google.student@example.com")}><b>G</b> Google</button><button onClick={() => completeSignIn(email || "apple.student@example.com")}><b>●</b> Apple</button></div><p className="login-legal">Це демо-автентифікація: акаунт зберігається лише в цьому браузері. <Link href="/about">Дізнатись більше</Link></p></div></section></main>;
}
