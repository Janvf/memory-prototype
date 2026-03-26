import NudgeCard from "@/components/NudgeCard";
import { nudgeCards } from "@/data/data";

export default function HomeFeed() {
  return (
    <div>
      <h1 className="text-[24px] font-medium text-primary mb-1">
        Today
      </h1>
      <p className="text-[14px] text-secondary mb-8">
        {nudgeCards.length} opportunities surfaced across your accounts
      </p>

      <div className="space-y-4">
        {nudgeCards.map((card) => (
          <NudgeCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
