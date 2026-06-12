import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BADGE_CLASS } from "../utils/badgeClass";

type Image = {
  image: string;
  description: string;
};

interface Props {
  title: string;
  shortDescription: string;
  longDescription: string;
  language: string;
  github?: string;
  available?: string;
  images: Image[];
}

export default function ProjectCard({ title, shortDescription, language, images }: Props) {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [cardRef, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) setIsVisible(true);
  }, [inView]);

  const badgeClass = BADGE_CLASS[language] ?? "badge--default";

  return (
    <Link
      to={`/projects/${title}`}
      ref={cardRef}
      className={`project-card ${isVisible ? "project-card--visible" : ""}`}
    >
      <div className="project-card__thumb">
        {images[0] && (
          <img
            src={`${process.env.PUBLIC_URL}/${images[0].image}`}
            alt={title}
            className="project-card__thumb-img"
          />
        )}
      </div>
      <div className="project-card__body">
        <span className={`project-card__badge ${badgeClass}`}>{language}</span>
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc">{shortDescription}</p>
      </div>
      <div className="project-card__footer">
        <span className="project-card__cta">{t("projects.viewProject")}</span>
        <span className="project-card__arrow">→</span>
      </div>
    </Link>
  );
}
