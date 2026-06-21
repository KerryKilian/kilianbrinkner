import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BIRTH_DATE = new Date(2001, 8, 28); // 28.09.2001

function getAge(): number {
  const today = new Date();
  let age = today.getFullYear() - BIRTH_DATE.getFullYear();
  const m = today.getMonth() - BIRTH_DATE.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < BIRTH_DATE.getDate())) age--;
  return age;
}

export default function Start() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = "Kilian Aaron Brinkner";
  }, []);

  return (
    <div className="page page--home">
      <section className="hero">
        <div className="hero__layout">
          <div className="hero__inner">
            <p className="hero__comment">{t("home.comment")}</p>
            <h1 className="hero__name">
              Kilian Aaron<br />
              <span className="hero__name-accent">Brinkner</span>
            </h1>
            <p className="hero__subtitle">{t("home.subtitle")}</p>
            <div className="hero__tags">
              <span className="hero__tag hero__tag--highlight">Java</span>
              <span className="hero__tag hero__tag--highlight">Flutter</span>
              <span className="hero__tag hero__tag--highlight">React</span>
              <span className="hero__tag hero__tag--highlight">NextJS</span>
              <span className="hero__tag">Python</span>
              <span className="hero__tag">Django</span>
              <span className="hero__tag">Kotlin</span>
            </div>
            <div className="hero__cta">
              <Link to="/projects" className="btn btn--primary">
                {t("home.ctaProjects")}
              </Link>
              <Link to="/timeline" className="btn btn--secondary">
                {t("home.ctaTimeline")}
              </Link>
            </div>
          </div>
          <div className="hero__aside">
            <div className="about__photo">
              <div className="about__frame">
                <img
                  src={`${process.env.PUBLIC_URL}/images/Kilian/Kilian1.jpg`}
                  alt="Kilian Aaron Brinkner"
                  className="about__img"
                />
              </div>
              <div className="about__frame-accent" />
            </div>
            <div className="hero__aside-text">
              <p className="section-label">{t("home.aboutLabel")}</p>
              <h2 className="about__heading">{t("home.aboutHeading")}</h2>
              <p className="about__body">{t("home.aboutText", { age: getAge() })}</p>
            </div>
          </div>
        </div>
        <div className="hero__scroll">
          <span className="hero__scroll-line" />
          <span className="hero__scroll-text">{t("home.scroll")}</span>
        </div>
      </section>

      <section className="about">
        <div className="about__text">
          <p className="section-label">{t("home.aboutLabel")}</p>
          <h2 className="about__heading">{t("home.aboutHeading")}</h2>
          <p className="about__body">{t("home.aboutText", { age: getAge() })}</p>
        </div>
        <div className="about__photo">
          <div className="about__frame">
            <img
              src={`${process.env.PUBLIC_URL}/images/Kilian/Kilian1.jpg`}
              alt="Kilian Aaron Brinkner"
              className="about__img"
            />
          </div>
          <div className="about__frame-accent" />
        </div>
      </section>
    </div>
  );
}
