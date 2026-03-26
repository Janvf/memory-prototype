import { ArrowRight, Zap, ArrowUpRight } from "lucide-react";
import SourceChip from "./SourceChip";

const priorityColors = {
  high: "bg-priority-high",
  strong: "bg-priority-strong",
  watch: "bg-priority-watch",
};

export default function NudgeCard({ card }) {
  const dotColor = priorityColors[card.priority] || "bg-secondary";
  const action = typeof card.action === "string" ? { tactical: card.action } : card.action;

  return (
    <article className="bg-surface border border-border rounded-lg shadow-card overflow-hidden">
      {/* Image */}
      {card.image && (
        <div className="relative h-[180px] overflow-hidden">
          <img
            src={card.image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${dotColor}`} />
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/80">
                {card.crossClient ? `Cross-Client · ${card.crossClient} → ${card.client}` : `Opportunity · ${card.client}`} · {card.priorityLabel}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="px-6 pt-5 pb-0">
        {/* No-image fallback header */}
        {!card.image && (
          <div className="flex items-center gap-2 mb-3">
            <span className={`w-2 h-2 rounded-full ${dotColor}`} />
            <span className="text-[11px] font-mono uppercase tracking-wider text-secondary">
              {card.crossClient ? `Cross-Client · ${card.crossClient} → ${card.client}` : `Opportunity · ${card.client}`} · {card.priorityLabel}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-[20px] font-medium text-primary leading-snug mb-2">
          {card.title}
        </h3>

        {/* Headline — the "why now" */}
        {card.headline && (
          <p className="text-[13px] font-mono text-secondary mb-4">
            {card.headline}
          </p>
        )}

        {/* Summary */}
        <div className="text-[14px] text-primary/85 leading-relaxed space-y-3">
          {card.summary.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Sources */}
      <div className="px-6 mt-5">
        <div className="border-t border-border pt-4">
          <span className="text-[11px] font-mono uppercase tracking-wider text-tag-text">
            Sources
          </span>
          <div className="mt-2 space-y-0">
            {card.sources.map((source, i) => (
              <SourceChip key={i} source={source} />
            ))}
          </div>
        </div>
      </div>

      {/* Strategic Action */}
      {action.strategic && (
        <div className="mx-6 mt-3 bg-action/[0.03] border border-action/10 rounded-lg px-4 py-3.5">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={12} className="text-amber" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber">
              Strategic Move
            </span>
          </div>
          <p className="text-[13px] text-primary leading-relaxed">
            {action.strategic}
          </p>
        </div>
      )}

      {/* Tactical Next Step */}
      <div className="mx-6 mb-5 mt-2 bg-tag-bg rounded-lg px-4 py-3">
        <div className="flex items-center gap-2 mb-1.5">
          <ArrowRight size={12} className="text-secondary" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-secondary">
            Next Step
          </span>
        </div>
        <p className="text-[13px] text-primary/80 leading-relaxed">
          {action.tactical}
        </p>
      </div>
    </article>
  );
}
