"use client";

import { ArrowUpRight, Play, Quote, Wrench } from "lucide-react";

export default function MasonryNewsCard({ item, index, isVisible }) {
  const { contentType = "article", featured = false, excerpt } = item;

  // Base classes for all cards
  const baseClasses = `
    masonry-card group relative break-inside-avoid mb-4 rounded-xl overflow-hidden
    border border-border cursor-pointer
    ${isVisible ? "visible" : ""}
  `;

  // Staggered animation delay
  const animationDelay = `${index * 50}ms`;

  // Quote card variant
  if (contentType === "quote") {
    return (
      <div
        className={`${baseClasses} bg-neutral-900 text-white`}
        style={{ animationDelay }}
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-amber/20 flex items-center justify-center">
              <Quote size={14} className="text-amber" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
              {item.source}
            </span>
          </div>
          <p className="text-[17px] font-medium leading-relaxed text-white/90 mb-4">
            "{excerpt || item.title}"
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-neutral-700">
            <span className="text-[11px] font-mono text-neutral-500">
              {item.date}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-neutral-400">
                {item.sharedBy}
              </span>
              <ArrowUpRight
                size={14}
                className="text-amber opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tool card variant
  if (contentType === "tool") {
    return (
      <div
        className={`${baseClasses} bg-amber-50`}
        style={{ animationDelay }}
      >
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-amber/20 flex items-center justify-center">
              <Wrench size={14} className="text-amber-700" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
              Tool
            </span>
          </div>
          {item.image && (
            <div className="relative overflow-hidden rounded-lg mb-3">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <p className="text-[14px] font-medium text-chanel-black leading-snug mb-3">
            {item.title}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-amber-700">
              {item.source}
            </span>
            <ArrowUpRight
              size={14}
              className="text-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
    );
  }

  // Video card variant
  if (contentType === "video") {
    return (
      <div
        className={`${baseClasses} bg-surface`}
        style={{ animationDelay }}
      >
        {item.image && (
          <div className="relative overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                featured ? "h-64" : "h-44"
              }`}
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Play size={22} className="text-chanel-black ml-1" fill="currentColor" />
              </div>
            </div>
            {/* Arrow reveal on hover */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowUpRight size={14} className="text-chanel-black" />
            </div>
          </div>
        )}
        <div className="p-4">
          <span className="text-[11px] font-mono uppercase tracking-wider text-chanel-gray">
            {item.source} · {item.date}
          </span>
          <p className="text-[14px] font-medium text-chanel-black mt-2 leading-snug">
            {item.title}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[12px] text-chanel-gray">
              Shared by {item.sharedBy}
            </span>
            <span className="text-[11px] text-chanel-gray">
              · {item.upvotes} upvotes
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Default article card variant
  return (
    <div
      className={`${baseClasses} bg-surface`}
      style={{ animationDelay }}
    >
      {item.image && (
        <div className="relative overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              featured ? "h-56" : "h-40"
            }`}
          />
          {/* Arrow reveal on hover */}
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
            <ArrowUpRight size={14} className="text-chanel-black" />
          </div>
        </div>
      )}
      <div className="p-4">
        <span className="text-[11px] font-mono uppercase tracking-wider text-chanel-gray">
          {item.source} · {item.date}
        </span>
        <p className={`font-medium text-chanel-black mt-2 leading-snug ${
          featured ? "text-[16px]" : "text-[14px]"
        }`}>
          {item.title}
        </p>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-[12px] text-chanel-gray">
            Shared by {item.sharedBy}
          </span>
          <span className="text-[11px] text-chanel-gray">
            · {item.upvotes} upvotes
          </span>
        </div>
      </div>
    </div>
  );
}
