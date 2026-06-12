import { useState } from "react";
import { BsList, BsX } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const close = () => setIsOpen(false);
  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "de" ? "en" : "de");
  };
  const active = (path: string) => {
    if (path === "/") return location.pathname === "/" ? "header__link--active" : "";
    return location.pathname === path || location.pathname.startsWith(path + "/")
      ? "header__link--active"
      : "";
  };

  return (
    <header className="header">
      <Link to="/" className="header__logo" onClick={close}>
        <span className="header__logo-prompt">&gt; </span>kilian.dev
      </Link>

      <button
        className="header__hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        {isOpen ? <BsX size={24} /> : <BsList size={24} />}
      </button>

      <nav className={`header__nav ${isOpen ? "header__nav--open" : ""}`}>
        <Link to="/" className={`header__link ${active("/")}`} onClick={close}>
          {t("nav.about")}
        </Link>
        <Link to="/projects" className={`header__link ${active("/projects")}`} onClick={close}>
          {t("nav.projects")}
        </Link>
        <Link to="/timeline" className={`header__link ${active("/timeline")}`} onClick={close}>
          {t("nav.timeline")}
        </Link>
        <button className="header__lang" onClick={toggleLang}>
          {i18n.language === "de" ? "EN" : "DE"}
        </button>
      </nav>
    </header>
  );
}
