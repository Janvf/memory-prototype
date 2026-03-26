import { ArrowUp } from "lucide-react";

export default function GrowthCard({ item }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-border last:border-0">
      <div className="min-w-0">
        <p className="text-[14px] text-primary leading-snug">
          {item.title}
        </p>
        <span className="text-[11px] font-mono text-secondary mt-1 inline-block">
          Shared by {item.sharedBy}
        </span>
      </div>
      <div className="flex items-center gap-1 shrink-0 text-secondary">
        <ArrowUp size={13} />
        <span className="text-[12px] font-mono">{item.upvotes}</span>
      </div>
    </div>
  );
}
