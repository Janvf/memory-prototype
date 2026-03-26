"use client";

import { useState } from "react";
import NudgeCard from "./NudgeCard";
import ChallengeCard from "./ChallengeCard";
import {
  nudgeCards,
  openQuestions,
  callHistory,
  externalNews,
  challenges,
} from "@/data/data";
import {
  HelpCircle,
  Phone,
  FileText,
  ArrowUpRight,
} from "lucide-react";

const tabs = [
  "Overview",
  "Challenges",
  "Call History",
  "Open Questions",
  "External News",
  "Documents",
];

export default function ClientTabs() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-0 border-b border-border mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-[13px] transition-colors relative whitespace-nowrap ${
              activeTab === tab
                ? "text-primary font-medium"
                : "text-secondary hover:text-primary"
            }`}
          >
            {tab}
            {tab === "Challenges" && (
              <span className="ml-1.5 text-[10px] font-mono bg-amber/10 text-amber px-1.5 py-0.5 rounded-full">
                {challenges.length}
              </span>
            )}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-t" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "Overview" && (
        <div>
          <NudgeCard card={nudgeCards[0]} />
        </div>
      )}

      {activeTab === "Challenges" && (
        <div>
          <p className="text-[13px] text-secondary mb-4">
            Recurring challenges identified from calls and project intelligence. Click to see external solutions and suggested approaches.
          </p>
          <div className="space-y-3">
            {challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </div>
      )}

      {activeTab === "Call History" && (
        <div className="space-y-0">
          {callHistory.map((call, i) => (
            <div
              key={i}
              className="flex items-start gap-4 py-4 border-b border-border last:border-0"
            >
              <Phone
                size={14}
                className="text-secondary mt-1 shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-baseline gap-3">
                  <span className="text-[12px] font-mono text-secondary shrink-0">
                    {call.date}
                  </span>
                  <span className="text-[14px] font-medium text-primary">
                    {call.title}
                  </span>
                </div>
                <p className="text-[13px] text-secondary mt-0.5">
                  {call.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Open Questions" && (
        <div className="space-y-0">
          {openQuestions.map((question, i) => (
            <div
              key={i}
              className="flex items-start gap-3 py-3.5 border-b border-border last:border-0"
            >
              <HelpCircle
                size={14}
                className="text-amber mt-0.5 shrink-0"
              />
              <p className="text-[14px] text-primary leading-relaxed">
                {question}
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "External News" && (
        <div className="space-y-3">
          {externalNews.map((article, i) => (
            <div
              key={i}
              className="bg-surface border border-border rounded-lg px-5 py-4 flex items-start justify-between gap-4"
            >
              <div>
                <span className="text-[11px] font-mono text-secondary">
                  {article.source} · {article.date}
                </span>
                <p className="text-[14px] font-medium text-primary mt-1">
                  {article.headline}
                </p>
              </div>
              <ArrowUpRight
                size={14}
                className="text-tag-text shrink-0 mt-1"
              />
            </div>
          ))}
        </div>
      )}

      {activeTab === "Documents" && (
        <div className="py-12 text-center">
          <FileText size={24} className="text-tag-text mx-auto mb-3" />
          <p className="text-[13px] text-tag-text">
            No documents yet
          </p>
        </div>
      )}
    </div>
  );
}
