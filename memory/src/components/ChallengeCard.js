"use client";

import { useState } from "react";
import {
  Phone,
  ChevronRight,
  ChevronDown,
  Zap,
  MessageSquare,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

export const severityColors = {
  critical: "bg-red-500",
  high: "bg-amber-500",
  medium: "bg-yellow-400",
};

export const statusLabels = {
  unaddressed: { label: "Unaddressed", icon: XCircle, color: "text-red-500" },
  stalled: { label: "Stalled", icon: Clock, color: "text-amber-500" },
  "decision-pending": { label: "Decision Pending", icon: Clock, color: "text-amber-500" },
  "in-progress": { label: "In Progress", icon: CheckCircle2, color: "text-green-500" },
};

export default function ChallengeCard({ challenge }) {
  const [expanded, setExpanded] = useState(false);
  const severity = severityColors[challenge.severity] || "bg-gray-400";
  const status = statusLabels[challenge.status] || statusLabels.unaddressed;
  const StatusIcon = status.icon;

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Collapsed header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-4 text-left flex items-start gap-3 hover:bg-background/50 transition-colors"
      >
        <span className={`w-2 h-2 rounded-full ${severity} mt-2 shrink-0`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-[15px] font-medium text-primary">
              {challenge.title}
            </h3>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[11px] font-mono text-secondary flex items-center gap-1">
              <MessageSquare size={10} />
              Mentioned {challenge.mentionCount}x since {challenge.firstMentioned}
            </span>
            <span className={`text-[11px] font-mono flex items-center gap-1 ${status.color}`}>
              <StatusIcon size={10} />
              {status.label}
            </span>
            {challenge.clientUpdated && (
              <span className="text-[11px] font-mono text-green-600 flex items-center gap-1">
                <CheckCircle2 size={10} />
                Client updated
              </span>
            )}
          </div>
        </div>
        {expanded ? (
          <ChevronDown size={16} className="text-secondary mt-1.5 shrink-0" />
        ) : (
          <ChevronRight size={16} className="text-secondary mt-1.5 shrink-0" />
        )}
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-border">
          {/* Summary */}
          <div className="px-5 py-4">
            <p className="text-[13px] text-primary/80 leading-relaxed">
              {challenge.summary}
            </p>
          </div>

          {/* Call mentions timeline */}
          <div className="px-5 pb-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-tag-text">
              Call History
            </span>
            <div className="mt-2 space-y-2">
              {challenge.callMentions.map((mention, i) => (
                <div key={i} className="flex items-start gap-3 text-[13px]">
                  <Phone size={12} className="text-secondary mt-0.5 shrink-0" />
                  <div>
                    <span className="font-mono text-[11px] text-secondary">
                      {mention.date} · {mention.context}
                    </span>
                    <p className="text-primary/70 mt-0.5 italic">
                      {mention.quote}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* External solutions — the flip view Thomas asked for */}
          <div className="px-5 pb-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-tag-text">
              What Memory Found
            </span>
            <div className="mt-2 grid gap-2">
              {challenge.externalSolutions.map((solution, i) => (
                <div
                  key={i}
                  className="flex gap-3 bg-background rounded-lg p-3 border border-border/50"
                >
                  {solution.image && (
                    <img
                      src={solution.image}
                      alt=""
                      className="w-[80px] h-[56px] rounded object-cover shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-tag-text bg-tag-bg px-1.5 py-0.5 rounded">
                        {solution.type}
                      </span>
                    </div>
                    <p className="text-[13px] font-medium text-primary leading-snug">
                      {solution.title}
                    </p>
                    <span className="text-[11px] font-mono text-secondary">
                      {solution.source}
                    </span>
                    <p className="text-[12px] text-primary/60 mt-1">
                      {solution.relevance}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested approach */}
          {challenge.suggestedApproach && (
            <div className="mx-5 mb-5 bg-action/[0.03] border border-action/10 rounded-lg px-4 py-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={12} className="text-amber" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber">
                  Suggested Approach
                </span>
              </div>
              <h4 className="text-[14px] font-medium text-primary mb-1">
                {challenge.suggestedApproach.title}
              </h4>
              <p className="text-[13px] text-primary/70 leading-relaxed mb-3">
                {challenge.suggestedApproach.description}
              </p>
              <div className="space-y-1.5">
                {challenge.suggestedApproach.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2 text-[12px] text-primary/60">
                    <span className="font-mono text-amber shrink-0 mt-0.5">
                      {i + 1}.
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Client update status */}
          {challenge.clientUpdated && challenge.lastClientUpdate && (
            <div className="mx-5 mb-5 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={12} className="text-green-600" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-green-700">
                  Client Status
                </span>
              </div>
              <p className="text-[13px] text-green-800 mt-1">
                {challenge.lastClientUpdate}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
