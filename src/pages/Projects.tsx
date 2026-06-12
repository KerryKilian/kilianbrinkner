import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ProjectCard from "../components/ProjectCard";
import { projectsData } from "../data/Projects";

export default function Projects() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("projects.heading");
  }, [t]);

  return (
    <div className="page">
      <div className="page-header">
        <p className="section-label">{t("projects.label")}</p>
        <h1 className="page-header__title">{t("projects.heading")}</h1>
        <p className="page-header__subtitle">
          {t("projects.subtitle", { count: projectsData.length })}
        </p>
      </div>
      <div className="cards-grid">
        {projectsData.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            shortDescription={project.shortDescription}
            longDescription={project.longDescription}
            language={project.language}
            github={project.github}
            available={project.available}
            images={project.images}
          />
        ))}
      </div>
    </div>
  );
}
