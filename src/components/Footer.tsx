import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <Link className="brand footer-brand" href="/">
          <span className="brand-mark">c<span>.</span></span><span>course<span className="brand-light">tube</span></span>
        </Link>
        <p>Навички, що працюють<br />на ваше майбутнє.</p>
        <div className="footer-links">
          <Link href="/courses">Каталог</Link><Link href="/about">Про нас</Link><Link href="/author/create-course">Створити курс</Link>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2025 CourseTube. Створено для тих, хто зростає.</span><span>Зроблено з турботою в Україні <span className="heart">♥</span></span></div>
    </footer>
  );
}
