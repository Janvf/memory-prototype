import { Phone, Newspaper, FileText, Circle } from "lucide-react";

const sourceConfig = {
  call: { icon: Phone, color: "text-primary" },
  news: { icon: Newspaper, color: "text-primary" },
  doc: { icon: FileText, color: "text-primary" },
  bvc: { icon: Circle, color: "text-blue-500" },
};

const sourceEmoji = {
  call: "\u{1F4DE}",
  news: "\u{1F4F0}",
  doc: "\u{1F4C1}",
  bvc: "\u{1F535}",
};

export default function SourceChip({ source }) {
  const config = sourceConfig[source.type] || sourceConfig.doc;
  const Icon = config.icon;
  const emoji = sourceEmoji[source.type] || "\u{1F4C4}";

  return (
    <div className="flex items-start gap-3 py-2">
      <span className="text-sm mt-0.5 shrink-0">{emoji}</span>
      <div className="min-w-0">
        <span className="text-[12px] font-mono text-secondary">
          {source.label}
        </span>
        {source.quote && (
          <span className="text-[12px] font-mono text-tag-text ml-1.5">
            — {source.quote}
          </span>
        )}
      </div>
    </div>
  );
}
