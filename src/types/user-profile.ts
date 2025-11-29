export interface UserProfile {
  wallet: string;                       // Lietotāja wallet adrese vai Firebase uid
  xp: number;                           // Kopējais XP skaits
  level: number;                        // Aprēķinātais level (no XP)
  createdAt: string;                    // ISO 8601 timestamp
  lastLoginAt: string;                  // ISO 8601 timestamp
  
  stats: UserStats;                     // Lietotāja statistika
  badges: Record<string, boolean>;      // Iegūtie badge (badgeId -> true)
  questProgress: Record<string, QuestProgress>; // Aktīvo questu progress
}

/**
 * Lietotāja statistika
 * 
 * Glabā visus skaitāmus notikumus, kas var trigger quests/badges
 */
export interface UserStats {
  memesCreated: number;   // Izveidoto memes skaits
  tweetsShared: number;   // Twitter share skaits
  gmUses: number;         // "GM" pogas lietošanas reizes
}

/**
 * Quest progress tracking objekts
 * 
 * Glabā lietotāja progresu konkrētam questam
 */
export interface QuestProgress {
  count: number;          // Pašreizējais progress (piemēram, 3/5 memes)
  completed: boolean;     // Vai quest ir pabeigts
  lastUpdated: string;    // ISO 8601 timestamp
}

/**
 * Quest definīcija
 * 
 * Firestore kolekcija: `quests`
 * Document ID: quest ID (piemēram, "daily_create_meme")
 */
export interface Quest {
  id: string;             // Unikāls quest ID
  title: string;          // Quest nosaukums (UI)
  description: string;    // Quest apraksts (UI)
  type: 'daily' | 'weekly' | 'one_time'; // Quest tips
  actionType: string;     // Action, kas triggerē progress (CREATE_MEME, TWEET, GM, utt.)
  target: number;         // Cik reizes jāizdara action (5 memes, 10 tweets, utt.)
  xpReward: number;       // XP reward par quest completion
  isActive: boolean;      // Vai quest ir aktīvs (var disable bez dzēšanas)
}

/**
 * Achievement (Badge) definīcija
 * 
 * Firestore kolekcija: `achievements`
 * Document ID: achievement ID (piemēram, "first_meme")
 */
export interface Achievement {
  id: string;             // Unikāls achievement ID
  name: string;           // Achievement nosaukums (UI)
  description: string;    // Achievement apraksts (UI)
  iconUrl: string;        // Badge ikona (attēls)
  condition: AchievementCondition; // Unlock nosacījums
}

/**
 * Achievement unlock nosacījums
 * 
 * Definē, kad badge tiek unlock
 */
export interface AchievementCondition {
  type: 'memes_created' | 'tweets_shared' | 'xp_reached' | 'holder_count'; // Condition tips
  threshold: number;      // Threshold vērtība (10 memes, 500 XP, utt.)
}
