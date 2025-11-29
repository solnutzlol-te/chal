/**
 * Badges Grid Component - Achievement Display
 * 
 * Parāda lietotāja iegūtos un locked badge kā grid.
 * 
 * Funkcionalitāte:
 * - Grid layout (3 kolonnas)
 * - Unlocked badges: krāsaini ar zaļu border
 * - Locked badges: pelēki ar opacity
 * - Hover tooltip ar badge nosaukumu un description
 * - Empty state, ja nav badge
 * 
 * Lietošana:
 * ```tsx
 * <BadgesGrid badges={profile.badges} achievements={allAchievements} />
 * ```
 */

import { BadgeCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Achievement } from "@/types/user-profile";
import { cn } from "@/lib/utils";

interface BadgesGridProps {
  badges: Record<string, boolean>;
  achievements: Achievement[];
}

export default function BadgesGrid({ badges, achievements }: BadgesGridProps) {
  const hasAnyBadge = Object.keys(badges).length > 0;

  return (
    <Card className="card-doodle bg-white p-5 shadow-sm">
      <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
        <div className="w-8 h-8 bg-pastel-green rounded-full doodle-border flex items-center justify-center">
          <BadgeCheck className="w-4 h-4 text-doodle-black" />
        </div>
        <span className="text-marker">Achievements</span>
      </h3>

      {/* Empty State */}
      {!hasAnyBadge && achievements.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500 font-semibold">
            No badges yet. Go make some memes! 😈
          </p>
        </div>
      )}

      {/* Badges Grid */}
      <div className="grid grid-cols-3 gap-3">
        {achievements.map((achievement) => {
          const isUnlocked = badges[achievement.id] === true;
          
          return (
            <div
              key={achievement.id}
              className={cn(
                "flex flex-col items-center justify-center rounded-xl border p-3 transition-all cursor-pointer group",
                isUnlocked
                  ? "bg-green-50 border-green-300 hover:scale-105"
                  : "bg-gray-50 opacity-50 hover:opacity-70"
              )}
              title={`${achievement.name}: ${achievement.description}`}
            >
              {/* Badge Icon (kan būt attēls vai placeholder) */}
              <div 
                className={cn(
                  "w-12 h-12 rounded-full mb-2 flex items-center justify-center transition-transform group-hover:rotate-12",
                  isUnlocked
                    ? "bg-gradient-to-br from-purple-500 to-pink-500"
                    : "bg-gray-300"
                )}
              >
                {achievement.iconUrl ? (
                  <img
                    src={achievement.iconUrl}
                    alt={achievement.name}
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      // Fallback uz emoji, ja attēls nav pieejams
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = '🏆';
                        parent.style.fontSize = '24px';
                      }
                    }}
                  />
                ) : (
                  <span className="text-2xl">{isUnlocked ? '🏆' : '🔒'}</span>
                )}
              </div>
              
              {/* Badge Name */}
              <span className="text-[10px] font-bold uppercase text-center leading-tight">
                {achievement.name}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
