/**
 * Quests List Component - Active Quests Display
 * 
 * Parāda lietotāja aktīvos questus ar progress bar.
 * 
 * Funkcionalitāte:
 * - Quest cards ar progress visualization
 * - Completed quests: zaļš background
 * - In-progress quests: normāls background
 * - Progress bar (count / target)
 * - XP reward display
 * - Scrollable list (max height)
 * 
 * Lietošana:
 * ```tsx
 * <QuestsList quests={activeQuests} questProgress={profile.questProgress} />
 * ```
 */

import { Sparkles, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Quest, QuestProgress } from "@/types/user-profile";
import { cn } from "@/lib/utils";

interface QuestsListProps {
  quests: Quest[];
  questProgress: Record<string, QuestProgress>;
}

export default function QuestsList({ quests, questProgress }: QuestsListProps) {
  return (
    <Card className="card-doodle bg-white p-5 shadow-sm">
      <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
        <div className="w-8 h-8 bg-pastel-yellow rounded-full doodle-border flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-doodle-black" />
        </div>
        <span className="text-marker">Active Quests</span>
      </h3>

      {/* Empty State */}
      {quests.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500 font-semibold">
            No active quests right now. Check back later! 🎮
          </p>
        </div>
      )}

      {/* Quests List */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {quests.map((quest) => {
          const progress = questProgress?.[quest.id];
          const count = progress?.count || 0;
          const completed = progress?.completed || false;
          const ratio = Math.min(count / quest.target, 1);

          return (
            <div
              key={quest.id}
              className={cn(
                "rounded-xl border p-3 transition-all",
                completed 
                  ? "bg-green-50 border-green-300" 
                  : "bg-gray-50 border-gray-300 hover:bg-gray-100"
              )}
            >
              {/* Quest Header */}
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-doodle-black">
                      {quest.title}
                    </span>
                    {completed && (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600">
                    {quest.description}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-purple-600">
                    +{quest.xpReward} XP
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase font-semibold">
                    {quest.type}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-white rounded-full overflow-hidden mb-1 border border-doodle-black">
                <div
                  className={cn(
                    "h-full transition-all duration-500",
                    completed ? "bg-green-500" : "bg-gradient-to-r from-blue-500 to-purple-500"
                  )}
                  style={{ width: `${ratio * 100}%` }}
                />
              </div>

              {/* Progress Text */}
              <div className="flex justify-between text-[11px] text-gray-500 font-semibold">
                <span>
                  {count}/{quest.target} completed
                </span>
                {completed && (
                  <span className="text-green-600 font-bold">✅ Done!</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
