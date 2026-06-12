import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projectsData } from "../data/Projects";
import { BADGE_CLASS } from "../utils/badgeClass";

function Project() {
  const { title } = useParams();
  const { t } = useTranslation();
  const data = projectsData.find((p) => p.title === title);

  useEffect(() => {
    document.title = title ?? t("projects.heading");
  }, [title, t]);

  if (!data) return null;

  const badgeClass = BADGE_CLASS[data.language] ?? "badge--default";

  return (
    <div className="page">
      <div className="breadcrumb">
        <Link to="/projects" className="breadcrumb__link">
          {t("project.breadcrumb")}
        </Link>
        <span className="breadcrumb__sep">/</span>
        <span className="breadcrumb__current">{data.title}</span>
      </div>

      <div className="project-detail">
        <span className={`project-card__badge ${badgeClass}`}>{data.language}</span>
        <h1 className="project-detail__title">{data.title}</h1>
        <p className="project-detail__short">{data.shortDescription}</p>

        <div className="project-detail__actions">
          {data.github && (
            <a
              href={data.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn--primary"
            >
              {t("project.github")}
            </a>
          )}
          {data.available && (
            <a
              href={data.available}
              target="_blank"
              rel="noreferrer"
              className="btn btn--secondary"
            >
              {t("project.website")}
            </a>
          )}
        </div>

        <p className="section-label">{t("project.descriptionLabel")}</p>
        <p className="project-detail__desc">{data.longDescription}</p>

        {data.images.length > 0 && (
          <>
            <p className="section-label">{t("project.screenshotsLabel")}</p>
            <div className="gallery">
              {data.images.map((img, index) => (
                <div
                  key={img.image}
                  className={`gallery__item ${index === 0 ? "gallery__item--wide" : ""}`}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/${img.image}`}
                    alt={img.description}
                    className="gallery__img"
                  />
                  <p className="gallery__caption">{img.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Project;
