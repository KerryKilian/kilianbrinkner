import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getProjectsData } from "../data/Projects";
import { BADGE_CLASS } from "../utils/badgeClass";

interface LightboxState {
  src: string;
  caption: string;
  rect: DOMRect;
}

const ANIM_DURATION = 380;

function Project() {
  const { title } = useParams();
  const { t, i18n } = useTranslation();
  const data = getProjectsData(i18n.language).find((p) => p.title === title);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const lightboxImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    document.title = title ?? t("projects.heading");
  }, [title, t]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeLightbox(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, isClosing]);

  // Open: morph from thumbnail to center
  useEffect(() => {
    if (!lightbox || isClosing || !lightboxImgRef.current) return;
    const img = lightboxImgRef.current;
    const { rect } = lightbox;

    const finalRect = img.getBoundingClientRect();
    const fw = finalRect.width;
    const fh = finalRect.height;

    // Clip to center square (matching the 1:1 thumbnail crop)
    const clipX = fw > fh ? `${((fw - fh) / (2 * fw)) * 100}%` : "0%";
    const clipY = fh > fw ? `${((fh - fw) / (2 * fh)) * 100}%` : "0%";
    const squareClip = `inset(${clipY} ${clipX})`;

    // Scale based on visible square size, not full image width
    const squareSize = Math.min(fw, fh);
    const scale = rect.width / squareSize;

    const dx = (rect.left + rect.width / 2) - (finalRect.left + fw / 2);
    const dy = (rect.top + rect.height / 2) - (finalRect.top + fh / 2);

    img.style.transition = "none";
    img.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    img.style.clipPath = squareClip;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        img.style.transition = `transform ${ANIM_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1), clip-path ${ANIM_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        img.style.transform = "";
        img.style.clipPath = "inset(0%)";
      });
    });
  }, [lightbox]);

  const closeLightbox = () => {
    if (!lightbox || isClosing || !lightboxImgRef.current) return;

    const img = lightboxImgRef.current;
    const { rect } = lightbox;

    const finalRect = img.getBoundingClientRect();
    const fw = finalRect.width;
    const fh = finalRect.height;

    const clipX = fw > fh ? `${((fw - fh) / (2 * fw)) * 100}%` : "0%";
    const clipY = fh > fw ? `${((fh - fw) / (2 * fh)) * 100}%` : "0%";
    const squareClip = `inset(${clipY} ${clipX})`;

    const squareSize = Math.min(fw, fh);
    const scale = rect.width / squareSize;

    const dx = (rect.left + rect.width / 2) - (finalRect.left + fw / 2);
    const dy = (rect.top + rect.height / 2) - (finalRect.top + fh / 2);

    setIsClosing(true);

    img.style.transition = `transform ${ANIM_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1), clip-path ${ANIM_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    img.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    img.style.clipPath = squareClip;

    setTimeout(() => {
      setLightbox(null);
      setIsClosing(false);
    }, ANIM_DURATION);
  };

  const openLightbox = (e: React.MouseEvent, src: string, caption: string) => {
    const imgEl = (e.currentTarget as HTMLElement).querySelector("img");
    const rect = imgEl?.getBoundingClientRect();
    if (rect) setLightbox({ src, caption, rect });
  };

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
            <a href={data.github} target="_blank" rel="noreferrer" className="btn btn--primary">
              {t("project.github")}
            </a>
          )}
          {data.available && (
            <a href={data.available} target="_blank" rel="noreferrer" className="btn btn--secondary">
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
              {data.images.map((img) => (
                <div
                  key={img.image}
                  className="gallery__item"
                  onClick={(e) =>
                    openLightbox(e, `${process.env.PUBLIC_URL}/${img.image}`, img.description)
                  }
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

      {lightbox && (
        <div
          className={`lightbox${isClosing ? " lightbox--closing" : ""}`}
          onClick={closeLightbox}
        >
          <button className="lightbox__close" onClick={closeLightbox}>✕</button>
          <div className="lightbox__inner" onClick={(e) => e.stopPropagation()}>
            <img
              ref={lightboxImgRef}
              src={lightbox.src}
              alt={lightbox.caption}
              className="lightbox__img"
            />
            {lightbox.caption && (
              <p className="lightbox__caption">{lightbox.caption}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Project;
