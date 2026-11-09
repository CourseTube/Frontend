"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/AppProvider";

export function Header() {
  const { user, signOut, purchasedCourses } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const links = [
    { href: "/courses", label: "Каталог курсів" },
    { href: "/about", label: "Про платформу" },
  ];

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="CourseTube — на головну">
          <span className="brand-mark">c<span>.</span></span>
          <span>course<span className="brand-light">tube</span></span>
        </Link>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Відкрити меню">
          {menuOpen ? "×" : "☰"}
        </button>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`}>
          {links.map((link) => (
            <Link
              key={link.href}
              className="nav-link"
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <Link className="nav-link" href="/courses?mine=1" onClick={() => setMenuOpen(false)}>
              Мої курси{purchasedCourses.length > 0 && <span className="nav-count">{purchasedCourses.length}</span>}
            </Link>
          )}
        </nav>
        <div className="header-actions">
          <Link className="author-link" href="/author/create-course">Для авторів <span>↗</span></Link>
          {user ? (
            <div className="user-menu">
              <span className="avatar">{user.name.charAt(0).toUpperCase()}</span>
              <span className="user-name">{user.name.split(" ")[0]}</span>
              <button className="signout-button" onClick={() => { signOut(); router.push("/"); }}>Вийти</button>
            </div>
          ) : (
            <Link className="button button-dark button-small" href="/login">Увійти <span>↗</span></Link>
          )}
        </div>
      </div>
    </header>
  );
}
