/**
 * XP System Utility Functions
 * 
 * Helper funkcijas priekš XP aprēķiniem un badge unlock loģikas.
 * 
 * Funkcijas:
 * - computeLevel(xp): XP -> Level aprēķins
 * - computeXPForNextLevel(level): Cik XP nepieciešams nākamajam level
 * - checkAchievementUnlocked(): Pārbauda, vai badge ir unlock
 */

import type { Achievement, UserStats } from '@/types/user-profile';

/**
 * Aprēķināt level no XP
 * 
 * Formula: level = floor(sqrt(xp) / 2)
 * 
 * Šī formula dod smooth, bet patīkamu progresiju:
 * - Level 1: 0 XP
 * - Level 2: 16 XP
 * - Level 3: 36 XP
 * - Level 5: 100 XP
 * - Level 10: 400 XP
 * - Level 20: 1600 XP
 * 
 * @param xp - Kopējais XP skaits
 * @returns Level skaitlis (1+)
 */
export function computeLevel(xp: number): number {
  if (xp < 0) return 1;
  return Math.max(1, Math.floor(Math.sqrt(xp) / 2));
}

/**
 * Aprēķināt, cik XP nepieciešams nākamajam level
 * 
 * Inverse formula no computeLevel:
 * xp = (level * 2)^2
 * 
 * @param currentLevel - Pašreizējais level
 * @returns XP skaits, kas nepieciešams nākamajam level
 */
export function computeXPForNextLevel(currentLevel: number): number {
  const nextLevel = currentLevel + 1;
  return Math.pow(nextLevel * 2, 2);
}

/**
 * Aprēķināt XP progress uz nākamo level (0.0 - 1.0)
 * 
 * @param xp - Pašreizējais XP
 * @param currentLevel - Pašreizējais level
 * @returns Progress procents (0.0 - 1.0)
 */
export function computeLevelProgress(xp: number, currentLevel: number): number {
  const currentLevelXP = Math.pow(currentLevel * 2, 2);
  const nextLevelXP = computeXPForNextLevel(currentLevel);
  const xpRange = nextLevelXP - currentLevelXP;
  const xpProgress = xp - currentLevelXP;

  return Math.min(1.0, Math.max(0.0, xpProgress / xpRange));
}

/**
 * Pārbaudīt, vai achievement ir unlock
 * 
 * @param achievement - Achievement definīcija no Firestore
 * @param stats - Lietotāja pašreizējā statistika
 * @returns true, ja achievement ir unlock, false, ja nav
 */
export function checkAchievementUnlocked(
  achievement: Achievement,
  stats: UserStats
): boolean {
  const { condition } = achievement;

  switch (condition.type) {
    case 'memes_created':
      return stats.memesCreated >= condition.threshold;
    
    case 'tweets_shared':
      return stats.tweetsShared >= condition.threshold;
    
    // Var pievienot citus condition types pēc vajadzības
    default:
      console.warn(`⚠️ Unknown achievement condition type: ${condition.type}`);
      return false;
  }
}
