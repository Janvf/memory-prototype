import ChallengeCard from "@/components/ChallengeCard";
import { challenges } from "@/data/data";
import { AlertTriangle } from "lucide-react";

export default function ChallengesPage() {
  // Count by severity
  const criticalCount = challenges.filter(c => c.severity === 'critical').length;
  const activeCount = challenges.filter(c => c.status === 'active-investigation' || c.status === 'in-progress').length;

  return (
    <div className="min-h-screen bg-neutral-50/50">
      <div className="p-6 md:p-8 max-w-[900px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <AlertTriangle size={20} className="text-amber-600" />
            </div>
            <div>
              <h1 className="text-[22px] font-semibold text-neutral-900">
                Challenges
              </h1>
              <p className="text-[13px] text-neutral-500">
                {challenges.length} tracked · {criticalCount > 0 ? `${criticalCount} critical · ` : ''}{activeCount} active
              </p>
            </div>
          </div>
        </div>

        {/* Challenge list */}
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>

        {/* Empty state (for when no challenges exist) */}
        {challenges.length === 0 && (
          <div className="py-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={24} className="text-neutral-400" />
            </div>
            <p className="text-[15px] font-medium text-neutral-700">
              No challenges identified yet
            </p>
            <p className="text-[13px] text-neutral-500 mt-1 max-w-sm mx-auto">
              Challenges will appear here as they are surfaced from client calls and project intelligence.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
