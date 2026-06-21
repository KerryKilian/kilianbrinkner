import { useTranslation } from "react-i18next";
import { getTimelineData } from "../data/Timeline";
import { TimelineEntry } from "./TimelineEntry";

export function VerticalTimeline() {
  const { i18n } = useTranslation();
  const reversed = [...getTimelineData(i18n.language)].reverse();

  return (
    <div className="vertical-timeline">
      {reversed.map((entry, index) => (
        <TimelineEntry
          key={entry.title}
          title={entry.title}
          cardTitle={entry.cardTitle}
          cardSubtitle={entry.cardSubtitle}
          cardDetailedText={entry.cardDetailedText}
          logo={entry.logo}
          isRecent={index === 0}
        />
      ))}
    </div>
  );
}
