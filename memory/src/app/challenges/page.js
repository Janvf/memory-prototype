import ChallengeCard from "@/components/ChallengeCard";
import { challenges } from "@/data/data";
import { AlertTriangle } from "lucide-react";

export default function ChallengesPage() {
  return (
    <div className="p-8 max-w-[900px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center">
            <AlertTriangle size={20} className="text-amber" />
          </div>
          <h1 className="text-[24px] font-semibold text-primary">
            Challenges
          </h1>
        </div>
        <p className="text-[14px] text-secondary leading-relaxed max-w-[600px]">
          Recurring challenges across clients, surfaced from calls and project intelligence.
          Click any challenge to see external solutions and suggested approaches.
        </p>
      </div>

      {/* Challenge list */}
      <div className="space-y-3">
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>

      {/* Empty state (for when no challenges exist) */}
      {challenges.length === 0 && (
        <div className="py-16 text-center">
          <AlertTriangle size={32} className="text-tag-text mx-auto mb-4" />
          <p className="text-[14px] text-secondary">
            No challenges identified yet
          </p>
          <p className="text-[13px] text-tag-text mt-1">
            Challenges will appear here as they are surfaced from client calls and project intelligence.
          </p>
        </div>
      )}
    </div>
  );
}
