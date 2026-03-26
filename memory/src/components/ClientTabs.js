"use client";

import { useState } from "react";
import NudgeCard from "./NudgeCard";
import ChallengeCard from "./ChallengeCard";
import MasonryGrid from "./MasonryGrid";
import {
  nudgeCards,
  openQuestions,
  callHistory,
  growthFeed,
  challenges,
} from "@/data/data";
import {
  HelpCircle,
  Phone,
  FileText,
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
      {/* Premium Tab bar */}
      <div className="flex gap-0 border-b border-border mb-10 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-underline px-4 py-4 text-[13px] transition-colors whitespace-nowrap ${
              activeTab === tab
                ? "text-chanel-black font-medium active"
                : "text-chanel-gray hover:text-chanel-black"
            }`}
          >
            {tab}
            {tab === "Challenges" && (
              <span className="ml-2 text-[10px] font-mono border border-chanel-gray/30 text-chanel-gray px-2 py-0.5 rounded-full">
                {challenges.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content with slide-up animation */}
      {activeTab === "Overview" && (
        <div className="animate-slide-up space-y-6">
          {nudgeCards.slice(0, 4).map((card) => (
            <NudgeCard key={card.id} card={card} />
          ))}
        </div>
      )}

      {activeTab === "Challenges" && (
        <div className="animate-slide-up">
          <p className="text-[14px] text-chanel-gray mb-6 leading-relaxed">
            Recurring challenges identified from calls and project intelligence. Click to see external solutions and suggested approaches.
          </p>
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="hover-lift rounded-xl">
                <ChallengeCard challenge={challenge} />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "Call History" && (
        <div className="space-y-0 animate-slide-up">
          {callHistory.map((call, i) => (
            <div
              key={i}
              className="flex items-start gap-4 py-5 border-b border-border last:border-0 hover-editorial rounded-lg -mx-3 px-3"
            >
              <div className="w-8 h-8 rounded-full bg-chanel-light flex items-center justify-center shrink-0">
                <Phone size={14} className="text-chanel-gray" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-chanel-gray shrink-0">
                    {call.date}
                  </span>
                </div>
                <span className="text-[15px] font-medium text-chanel-black block mt-1">
                  {call.title}
                </span>
                <p className="text-[13px] text-chanel-gray mt-1 leading-relaxed">
                  {call.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Open Questions" && (
        <div className="space-y-0 animate-slide-up">
          {openQuestions.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 py-5 border-b border-border last:border-0 hover-editorial rounded-lg -mx-3 px-3"
            >
              <div className="w-8 h-8 rounded-full bg-amber/10 flex items-center justify-center shrink-0 mt-0.5">
                <HelpCircle size={14} className="text-amber" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] text-chanel-black leading-relaxed font-medium">
                  {item.question}
                </p>
                <div className="flex items-center gap-2 mt-2 text-[12px] text-chanel-gray">
                  <span className="font-medium">{item.askedBy}</span>
                  <span>·</span>
                  <span className="font-mono">{item.context}</span>
                </div>
                <p className="text-[13px] text-chanel-gray mt-2 leading-relaxed">
                  {item.strategicImplication}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "External News" && (
        <div className="animate-slide-up">
          <MasonryGrid
            items={growthFeed.filter(
              (item) =>
                item.relevantTo.includes("CHANEL") ||
                item.relevantTo.length === 0
            )}
          />
        </div>
      )}

      {activeTab === "Documents" && (
        <div className="py-16 text-center animate-slide-up">
          <div className="w-12 h-12 rounded-full bg-chanel-light flex items-center justify-center mx-auto mb-4">
            <FileText size={20} className="text-chanel-gray" />
          </div>
          <p className="text-[14px] text-chanel-gray">
            No documents yet
          </p>
        </div>
      )}
    </div>
  );
}
