import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { VerticalTimeline } from "../components/VerticalTimeline";

export default function Timeline() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("timeline.heading");
  }, [t]);

  return (
    <div className="page">
      <div className="page-header">
        <p className="section-label">{t("timeline.label")}</p>
        <h1 className="page-header__title">{t("timeline.heading")}</h1>
        <p className="page-header__subtitle">{t("timeline.subtitle")}</p>
      </div>
      <VerticalTimeline />
    </div>
  );
}
