"use client";

import { useState } from "react";
import { growthFeed } from "@/data/data";
import { ArrowUp, ArrowUpRight } from "lucide-react";

export default function GrowthPage() {
  const [filter, setFilter] = useState("hot");

  const sorted = [...growthFeed].sort((a, b) =>
    filter === "top" ? b.upvotes - a.upvotes : 0
  );

  return (
    <div>
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <h1 className="text-[24px] font-medium text-primary">
            Growth
          </h1>
          <p className="text-[14px] text-secondary mt-0.5">
            External intelligence and knowledge across all accounts
          </p>
        </div>
        <div className="flex gap-1 bg-tag-bg rounded-md p-0.5">
          <button
            onClick={() => setFilter("hot")}
            className={`px-3 py-1 text-[12px] font-mono rounded transition-colors ${
              filter === "hot"
                ? "bg-surface text-primary shadow-card"
                : "text-secondary hover:text-primary"
            }`}
          >
            Hot
          </button>
          <button
            onClick={() => setFilter("top")}
            className={`px-3 py-1 text-[12px] font-mono rounded transition-colors ${
              filter === "top"
                ? "bg-surface text-primary shadow-card"
                : "text-secondary hover:text-primary"
            }`}
          >
            Top
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {sorted.map((item, i) => (
          <article
            key={i}
            className="bg-surface border border-border rounded-lg overflow-hidden flex hover:border-action/20 transition-colors"
          >
            {/* Thumbnail */}
            {item.image && (
              <div className="w-[140px] shrink-0">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 px-5 py-4 flex flex-col justify-between min-w-0">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-mono text-secondary">
                    {item.source}
                  </span>
                  <span className="text-[11px] text-tag-text">·</span>
                  <span className="text-[11px] font-mono text-tag-text">
                    {item.date}
                  </span>
                </div>
                <h3 className="text-[14px] font-medium text-primary leading-snug">
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-secondary">
                    <ArrowUp size={13} />
                    <span className="text-[12px] font-mono">
                      {item.upvotes}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-tag-text">
                    Shared by {item.sharedBy}
                  </span>
                </div>

                {item.relevantTo && item.relevantTo.length > 0 && (
                  <div className="flex gap-1">
                    {item.relevantTo.map((client) => (
                      <span
                        key={client}
                        className="text-[10px] font-mono bg-tag-bg text-tag-text px-1.5 py-0.5 rounded"
                      >
                        {client}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
