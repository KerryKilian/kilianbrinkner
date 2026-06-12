import { timelineData } from "../data/Timeline";
import { TimelineEntry } from "./TimelineEntry";

export function VerticalTimeline() {
  const reversed = [...timelineData].reverse();

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
