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
  Lightbulb,
  Users,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";

export const severityConfig = {
  critical: {
    color: "bg-red-500",
    label: "CRITICAL",
    border: "border-l-red-500",
    dot: "bg-red-500"
  },
  high: {
    color: "bg-amber-500",
    label: "HIGH",
    border: "border-l-amber-500",
    dot: "bg-amber-500"
  },
  medium: {
    color: "bg-yellow-400",
    label: "MEDIUM",
    border: "border-l-yellow-400",
    dot: "bg-yellow-400"
  },
};

export const statusLabels = {
  unaddressed: { label: "Unaddressed", icon: XCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
  stalled: { label: "Stalled", icon: Clock, color: "text-neutral-500", bg: "bg-neutral-100", border: "border-neutral-200" },
  "active-investigation": { label: "Investigating", icon: Lightbulb, color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
  "decision-pending": { label: "Decision Pending", icon: Clock, color: "text-neutral-600", bg: "bg-neutral-100", border: "border-neutral-200" },
  "in-progress": { label: "In Progress", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
};

const insightTypeIcons = {
  diagnosis: AlertTriangle,
  "cross-client": Users,
  "strategic-question": HelpCircle,
};

export default function ChallengeCard({ challenge }) {
  const [expanded, setExpanded] = useState(false);
  const severity = severityConfig[challenge.severity] || severityConfig.medium;
  const status = statusLabels[challenge.status] || statusLabels.unaddressed;
  const StatusIcon = status.icon;

  // Use headline if available, otherwise truncate summary for preview
  const previewText = challenge.headline || (challenge.summary.length > 140
    ? challenge.summary.substring(0, 140).trim() + "…"
    : challenge.summary);

  return (
    <div className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 border-l-4 ${severity.border} ${expanded ? 'shadow-xl ring-1 ring-black/5' : 'shadow-sm hover:shadow-md'}`}>
      {/* Collapsed header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-5 text-left"
      >
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            {/* Top row: severity + status */}
            <div className="flex items-center gap-2 mb-2">
              {challenge.severity === 'critical' && (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-red-600 bg-red-50 px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  Critical
                </span>
              )}
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded flex items-center gap-1 ${status.bg} ${status.color}`}>
                <StatusIcon size={11} />
                {status.label}
              </span>
              {challenge.clientUpdated && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded flex items-center gap-1 bg-emerald-50 text-emerald-700">
                  <CheckCircle2 size={11} />
                  Updated
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-[17px] font-semibold text-neutral-900 leading-snug mb-2">
              {challenge.title}
            </h3>

            {/* Preview — only show when collapsed */}
            {!expanded && (
              <p className="text-[14px] text-neutral-600 leading-relaxed mb-3">
                {previewText}
              </p>
            )}

            {/* Metadata row */}
            <div className="flex items-center gap-3 text-[12px] text-neutral-500">
              <span className="flex items-center gap-1.5">
                <MessageSquare size={12} />
                {challenge.mentionCount}x since {challenge.firstMentioned}
              </span>
              {challenge.deadline && !expanded && (
                <span className="flex items-center gap-1.5 text-amber-600 font-medium">
                  <Clock size={12} />
                  {challenge.deadline}
                </span>
              )}
            </div>
          </div>

          {/* Expand indicator */}
          <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${expanded ? 'bg-neutral-900 rotate-0' : 'bg-neutral-100'}`}>
            {expanded ? (
              <ChevronDown size={18} className="text-white" />
            ) : (
              <ChevronRight size={18} className="text-neutral-400" />
            )}
          </div>
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-neutral-100">
          {/* Summary — structured version if available */}
          <div className="px-5 py-5 bg-neutral-50/70">
            {challenge.rootCauses ? (
              <div className="space-y-4">
                {/* Headline */}
                <div>
                  <p className="text-[15px] text-neutral-900 font-medium leading-relaxed">
                    {challenge.headline}
                  </p>
                  {challenge.deadline && (
                    <p className="text-[14px] text-amber-700 font-medium mt-1 flex items-center gap-1.5">
                      <Clock size={14} />
                      {challenge.deadline}
                    </p>
                  )}
                </div>

                {/* Root causes */}
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500 block mb-2">
                    Root Causes Identified
                  </span>
                  <div className="space-y-2">
                    {challenge.rootCauses.map((cause, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded bg-red-100 text-red-600 flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-[14px] text-neutral-700 leading-relaxed">
                          {cause}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-[15px] text-neutral-800 leading-relaxed">
                {challenge.summary}
              </p>
            )}
          </div>

          {/* Internal Insights — Bundl Intelligence */}
          {challenge.internalInsights && challenge.internalInsights.length > 0 && (
            <div className="px-5 py-5 border-t border-neutral-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-neutral-900 flex items-center justify-center">
                  <Lightbulb size={14} className="text-white" />
                </div>
                <span className="text-[13px] font-semibold text-neutral-900">
                  Bundl Intelligence
                </span>
              </div>
              <div className="space-y-3">
                {challenge.internalInsights.map((insight, i) => {
                  const InsightIcon = insightTypeIcons[insight.type] || Lightbulb;
                  const typeConfig = {
                    'cross-client': { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'text-blue-600' },
                    'strategic-question': { bg: 'bg-amber-50', text: 'text-amber-700', icon: 'text-amber-600' },
                    'diagnosis': { bg: 'bg-neutral-100', text: 'text-neutral-600', icon: 'text-neutral-500' }
                  };
                  const config = typeConfig[insight.type] || typeConfig.diagnosis;
                  return (
                    <div
                      key={i}
                      className="bg-white border border-neutral-200 rounded-xl p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${config.bg}`}>
                          <InsightIcon size={16} className={config.icon} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={`inline-block text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded mb-2 ${config.bg} ${config.text}`}>
                            {insight.type.replace('-', ' ')}
                          </span>
                          <p className="text-[14px] font-medium text-neutral-900 leading-snug">
                            {insight.insight}
                          </p>
                          <span className="text-[11px] text-neutral-500 block mt-1">
                            {insight.source}
                          </span>
                          <p className="text-[13px] text-neutral-600 mt-2 leading-relaxed">
                            {insight.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Call mentions timeline */}
          <div className="px-5 py-5 border-t border-neutral-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center">
                <Phone size={14} className="text-neutral-500" />
              </div>
              <span className="text-[13px] font-semibold text-neutral-900">
                Source Signals
              </span>
            </div>
            <div className="space-y-2">
              {challenge.callMentions.map((mention, i) => (
                <div key={i} className="flex items-start gap-3 py-2 pl-3 border-l-2 border-neutral-200 hover:border-neutral-400 transition-colors">
                  <div className="flex-1">
                    <span className="text-[11px] text-neutral-500">
                      {mention.date} · {mention.context}
                    </span>
                    <p className="text-[13px] text-neutral-700 mt-0.5 italic leading-relaxed">
                      {mention.quote}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* External solutions */}
          <div className="px-5 py-5 border-t border-neutral-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center">
                <Zap size={14} className="text-amber-600" />
              </div>
              <span className="text-[13px] font-semibold text-neutral-900">
                What Memory Found
              </span>
            </div>
            <div className="grid gap-3">
              {challenge.externalSolutions.map((solution, i) => (
                <div
                  key={i}
                  className="flex gap-4 bg-white rounded-xl p-4 border border-neutral-200 hover:border-neutral-300 transition-colors"
                >
                  {solution.image && (
                    <img
                      src={solution.image}
                      alt=""
                      className="w-24 h-16 rounded-lg object-cover shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded mb-1.5">
                      {solution.type}
                    </span>
                    <p className="text-[14px] font-medium text-neutral-900 leading-snug">
                      {solution.title}
                    </p>
                    <span className="text-[11px] text-neutral-500">
                      {solution.source}
                    </span>
                    {/* Key learning */}
                    <div className="mt-2.5 pt-2.5 border-t border-neutral-100">
                      <p className="text-[13px] text-neutral-700 leading-snug">
                        <span className="font-semibold text-amber-600">→</span>{" "}
                        {solution.relevance}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested approach */}
          {challenge.suggestedApproach && (
            <div className="mx-5 mb-5">
              <div className="bg-neutral-900 rounded-2xl px-5 py-5 mb-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-yellow-400 mb-3">
                  So What — What To Do Next
                </p>
                <h4 className="text-[18px] font-semibold text-white mb-2">
                  {challenge.suggestedApproach.title}
                </h4>
                <p className="text-[14px] text-gray-300 leading-relaxed">
                  {challenge.suggestedApproach.description}
                </p>
              </div>

              {/* Solutions grid */}
              {challenge.suggestedApproach.solutions && (
                <div className="space-y-3">
                  {challenge.suggestedApproach.solutions.map((solution, i) => (
                    <div
                      key={i}
                      className="bg-white border border-neutral-200 rounded-xl p-5 hover:border-neutral-300 transition-colors"
                    >
                      {/* Solution header */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-start gap-3">
                          <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-[13px] font-bold shrink-0">
                            {i + 1}
                          </span>
                          <h5 className="text-[15px] font-semibold text-neutral-900 leading-snug pt-0.5">
                            {solution.title}
                          </h5>
                        </div>
                        {/* Impact/Effort badges */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded ${
                            solution.impact === 'High' ? 'bg-emerald-100 text-emerald-700' : 'bg-neutral-100 text-neutral-600'
                          }`}>
                            {solution.impact} impact
                          </span>
                          <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded ${
                            solution.effort === 'Low' ? 'bg-blue-100 text-blue-700' : 'bg-neutral-100 text-neutral-600'
                          }`}>
                            {solution.effort} effort
                          </span>
                        </div>
                      </div>

                      {/* Insight - the "why" */}
                      <div className="mb-3 pl-10">
                        <p className="text-[13px] text-neutral-600 leading-relaxed">
                          {solution.insight}
                        </p>
                      </div>

                      {/* Action - the "how" */}
                      <div className="pl-10">
                        <div className="bg-neutral-50 border border-neutral-100 rounded-lg px-4 py-3">
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500 block mb-1">
                            How to execute
                          </span>
                          <p className="text-[13px] text-neutral-800 leading-relaxed">
                            {solution.action}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Fallback for old steps format */}
              {challenge.suggestedApproach.steps && !challenge.suggestedApproach.solutions && (
                <div className="bg-neutral-900 rounded-2xl px-5 py-5">
                  <div className="space-y-2">
                    {challenge.suggestedApproach.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-3 text-[13px] text-white/65">
                        <span className="font-semibold text-amber-400 shrink-0 w-5">
                          {i + 1}.
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Client update status */}
          {challenge.clientUpdated && challenge.lastClientUpdate && (
            <div className="mx-5 mb-5 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span className="text-[12px] font-semibold uppercase tracking-wide text-emerald-700">
                  Client Status
                </span>
              </div>
              <p className="text-[14px] text-emerald-800 mt-2">
                {challenge.lastClientUpdate}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
