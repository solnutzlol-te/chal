/**
 * Profile Card Component - XP and Level Display
 * 
 * Parāda lietotāja profila galveno informāciju:
 * - Level badge ar vizuālu dizainu
 * - XP progress bar (uz nākamo level)
 * - Current XP / Total XP skaitļi
 * - Statistika (memes created, tweets shared, GM uses)
 * 
 * Izmanto Firestore data no user profile.
 * 
 * Lietošana:
 * ```tsx
 * <ProfileCard profile={userProfile} />
 * ```
 */

import { Star, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { UserProfile } from "@/types/user-profile";
import { computeXPForNextLevel, computeLevelProgress } from "@/lib/xp-utils";

interface ProfileCardProps {
  profile: UserProfile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const xpForNextLevel = computeXPForNextLevel(profile.level);
  const xpNeeded = Math.max(xpForNextLevel - profile.xp, 0);
  const levelProgress = computeLevelProgress(profile.xp, profile.level);

  return (
    <div className="space-y-4">
      {/* Level + XP Card */}
      <Card className="card-doodle bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full doodle-border flex items-center justify-center">
              <Star className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <h2 className="font-bold text-2xl text-doodle-black text-marker">
                Level {profile.level}
              </h2>
              <span className="text-sm text-gray-500">
                {profile.xp} XP
              </span>
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-2 doodle-border">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
            style={{ width: `${Math.min(levelProgress * 100, 100)}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 font-semibold">
          {xpNeeded > 0
            ? `${xpNeeded} XP needed to reach Level ${profile.level + 1}`
            : "Max level reached! 🎉"}
        </p>
      </Card>

      {/* Stats Card */}
      <Card className="card-doodle bg-white p-5 shadow-sm">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <div className="w-8 h-8 bg-pastel-blue rounded-full doodle-border flex items-center justify-center">
            <Award className="w-4 h-4 text-doodle-black" />
          </div>
          <span className="text-marker">Stats</span>
        </h3>
        <ul className="text-sm space-y-2">
          <li className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Memes created:</span>
            <span className="font-bold text-doodle-black text-lg">
              {profile.stats.memesCreated || 0}
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Tweets shared:</span>
            <span className="font-bold text-doodle-black text-lg">
              {profile.stats.tweetsShared || 0}
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">GM uses:</span>
            <span className="font-bold text-doodle-black text-lg">
              {profile.stats.gmUses || 0}
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
