import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  title: string;
  cardTitle: string;
  cardSubtitle: string;
  cardDetailedText: string;
  logo: string;
  isRecent: boolean;
}

export function TimelineEntry({
  title,
  cardTitle,
  cardSubtitle,
  cardDetailedText,
  logo,
  isRecent,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) setIsVisible(true);
  }, [inView]);

  return (
    <div
      ref={ref}
      className={`timeline-entry ${isVisible ? "timeline-entry--visible" : ""}`}
    >
      <div
        className={`timeline-entry__dot ${
          isRecent ? "timeline-entry__dot--recent" : ""
        }`}
      />
      <div className="timeline-entry__date">{title}</div>
      <div
        className={`timeline-entry__card ${
          isRecent ? "timeline-entry__card--recent" : ""
        }`}
      >
        <div className="timeline-entry__header">
          <div className="timeline-entry__logo">
            <img
              src={logo}
              alt={cardSubtitle}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div>
            <div className="timeline-entry__title">{cardTitle}</div>
            <div className="timeline-entry__subtitle">{cardSubtitle}</div>
          </div>
        </div>
        <p className="timeline-entry__text">{cardDetailedText}</p>
      </div>
    </div>
  );
}
