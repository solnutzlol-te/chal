/**
 * Firebase Utility Functions
 * 
 * Helper funkcijas darbam ar Firebase Storage un Firestore.
 * 
 * Funkcionalitāte:
 * - Upload meme attēlu uz Firebase Storage
 * - User profile management (create, read, update)
 * - Quest system integration
 * - XP tracking and badge unlocking
 * 
 * Lietošana:
 * ```tsx
 * import { uploadMeme, getUserProfile, trackMemeCreation } from '@/lib/firebase-utils';
 * 
 * // Upload meme
 * await uploadMeme(canvasBlob, userId);
 * 
 * // Get user profile
 * const profile = await getUserProfile(userId);
 * 
 * // Track meme creation (auto XP + quest progress)
 * await trackMemeCreation(userId);
 * ```
 */

import { db, storage, isFirebaseConfigured } from './firebase-config';
import { 
  collection, 
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc, 
  query, 
  orderBy, 
  limit, 
  getDocs,
  where,
  type QuerySnapshot,
  type DocumentData 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL,
  type UploadResult 
} from 'firebase/storage';
import type { UserProfile, Quest, Achievement } from '@/types/user-profile';
import { computeLevel, checkAchievementUnlocked } from '@/lib/xp-utils';

/**
 * Upload meme attēlu uz Firebase Storage (bez Firestore metadata)
 * 
 * Process:
 * 1. Upload blob uz Storage ar unikālu nosaukumu
 * 2. Iegūt publisko download URL
 * 3. Return image URL
 * 
 * @param imageBlob - Canvas image blob (PNG formātā)
 * @param userId - User wallet address vai Firebase uid
 * @returns Promise ar image URL vai null, ja neizdevās
 */
export async function uploadMeme(imageBlob: Blob, userId: string): Promise<string | null> {
  // Check if Firebase is configured
  if (!isFirebaseConfigured() || !storage) {
    console.error('❌ Firebase not configured. Cannot upload meme.');
    return null;
  }

  try {
    console.log('📤 Starting meme upload...');

    // 1. Generate unique filename with timestamp
    const timestamp = Date.now();
    const filename = `${userId}-${timestamp}.png`;
    const storageRef = ref(storage, `memes/${filename}`);

    // 2. Upload blob to Storage
    console.log(`⬆️ Uploading to Storage: ${filename}`);
    const uploadResult: UploadResult = await uploadBytes(storageRef, imageBlob, {
      contentType: 'image/png',
    });
    console.log('✅ Upload to Storage successful');

    // 3. Get public download URL
    const imageUrl = await getDownloadURL(uploadResult.ref);
    console.log(`🔗 Download URL: ${imageUrl}`);

    return imageUrl;
  } catch (error) {
    console.error('❌ Failed to upload meme:', error);
    return null;
  }
}

/**
 * Izveidot jaunu lietotāju profilu Firestore
 * 
 * @param userId - User wallet address vai Firebase uid
 * @returns Promise ar UserProfile objektu vai null, ja neizdevās
 */
export async function createUserProfile(userId: string): Promise<UserProfile | null> {
  if (!isFirebaseConfigured() || !db) {
    console.error('❌ Firebase not configured. Cannot create user profile.');
    return null;
  }

  try {
    console.log(`👤 Creating user profile for: ${userId}`);

    const newProfile: UserProfile = {
      wallet: userId,
      xp: 0,
      level: 1,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      stats: {
        memesCreated: 0,
        tweetsShared: 0,
        gmUses: 0,
      },
      badges: {},
      questProgress: {},
    };

    // Create document with userId as ID
    await setDoc(doc(db, 'users', userId), newProfile);
    console.log('✅ User profile created successfully');

    return newProfile;
  } catch (error) {
    console.error('❌ Failed to create user profile:', error);
    return null;
  }
}

/**
 * Nolasīt lietotāja profilu no Firestore
 * 
 * @param userId - User wallet address vai Firebase uid
 * @returns Promise ar UserProfile objektu vai null, ja nav atrasts
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  if (!isFirebaseConfigured() || !db) {
    console.warn('⚠️ Firebase not configured. Cannot fetch user profile.');
    return null;
  }

  try {
    console.log(`🔍 Fetching user profile: ${userId}`);

    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log('❌ User profile not found. Creating new profile...');
      return await createUserProfile(userId);
    }

    const profile = docSnap.data() as UserProfile;
    console.log('✅ User profile fetched successfully');
    return profile;
  } catch (error) {
    console.error('❌ Failed to fetch user profile:', error);
    return null;
  }
}

/**
 * Atjaunināt lietotāja profilu Firestore
 * 
 * @param userId - User wallet address vai Firebase uid
 * @param updates - Partial user profile updates
 * @returns Promise ar true, ja izdevās, false, ja nē
 */
export async function updateUserProfile(
  userId: string, 
  updates: Partial<UserProfile>
): Promise<boolean> {
  if (!isFirebaseConfigured() || !db) {
    console.error('❌ Firebase not configured. Cannot update user profile.');
    return false;
  }

  try {
    console.log(`📝 Updating user profile: ${userId}`, updates);

    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, updates as Record<string, unknown>);
    
    console.log('✅ User profile updated successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to update user profile:', error);
    return false;
  }
}

/**
 * Nolasīt aktīvos questus no Firestore
 * 
 * @returns Promise ar Quest array vai tukšu array, ja neizdevās
 */
export async function getActiveQuests(): Promise<Quest[]> {
  if (!isFirebaseConfigured() || !db) {
    console.warn('⚠️ Firebase not configured. Cannot fetch quests.');
    return [];
  }

  try {
    console.log('🎯 Fetching active quests...');

    const questsQuery = query(
      collection(db, 'quests'),
      where('isActive', '==', true)
    );

    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(questsQuery);
    
    const quests: Quest[] = querySnapshot.docs.map((doc) => doc.data() as Quest);

    console.log(`✅ Fetched ${quests.length} active quests`);
    return quests;
  } catch (error) {
    console.error('❌ Failed to fetch quests:', error);
    return [];
  }
}

/**
 * Nolasīt visus achievement definīcijas no Firestore
 * 
 * @returns Promise ar Achievement array vai tukšu array, ja neizdevās
 */
export async function getAchievements(): Promise<Achievement[]> {
  if (!isFirebaseConfigured() || !db) {
    console.warn('⚠️ Firebase not configured. Cannot fetch achievements.');
    return [];
  }

  try {
    console.log('🏆 Fetching achievements...');

    const achievementsSnapshot: QuerySnapshot<DocumentData> = await getDocs(
      collection(db, 'achievements')
    );
    
    const achievements: Achievement[] = achievementsSnapshot.docs.map(
      (doc) => doc.data() as Achievement
    );

    console.log(`✅ Fetched ${achievements.length} achievements`);
    return achievements;
  } catch (error) {
    console.error('❌ Failed to fetch achievements:', error);
    return [];
  }
}

/**
 * Track meme creation event (auto XP + quest progress + badge check)
 * 
 * Kad lietotājs izveido meme, šī funkcija:
 * 1. Palielina stats.memesCreated
 * 2. Atjauno quest progress priekš "CREATE_MEME" action type
 * 3. Pievieno XP, ja quest completed
 * 4. Pārbauda vai unlock jaunus badges
 * 5. Pārrēķina level
 * 
 * @param userId - User wallet address vai Firebase uid
 * @returns Promise ar true, ja izdevās, false, ja nē
 */
export async function trackMemeCreation(userId: string): Promise<boolean> {
  if (!isFirebaseConfigured() || !db) {
    console.error('❌ Firebase not configured. Cannot track meme creation.');
    return false;
  }

  try {
    console.log(`🎨 Tracking meme creation for user: ${userId}`);

    // 1. Get current profile
    const profile = await getUserProfile(userId);
    if (!profile) {
      console.error('❌ Failed to get user profile');
      return false;
    }

    // 2. Increment memesCreated
    const newMemesCreated = profile.stats.memesCreated + 1;

    // 3. Get active quests
    const quests = await getActiveQuests();
    const memeQuests = quests.filter((q) => q.actionType === 'CREATE_MEME');

    // 4. Update quest progress and calculate XP rewards
    let xpEarned = 0;
    const updatedQuestProgress = { ...profile.questProgress };

    for (const quest of memeQuests) {
      const currentProgress = updatedQuestProgress[quest.id] || {
        count: 0,
        completed: false,
        lastUpdated: new Date().toISOString(),
      };

      // Increment count
      currentProgress.count += 1;
      currentProgress.lastUpdated = new Date().toISOString();

      // Check if quest completed
      if (!currentProgress.completed && currentProgress.count >= quest.target) {
        currentProgress.completed = true;
        xpEarned += quest.xpReward;
        console.log(`✅ Quest completed: ${quest.title} (+${quest.xpReward} XP)`);
      }

      updatedQuestProgress[quest.id] = currentProgress;
    }

    // 5. Update XP and level
    const newXP = profile.xp + xpEarned;
    const newLevel = computeLevel(newXP);

    // 6. Check for new badge unlocks
    const achievements = await getAchievements();
    const updatedBadges = { ...profile.badges };

    for (const achievement of achievements) {
      // Skip if already unlocked
      if (updatedBadges[achievement.id]) continue;

      // Check if conditions met
      const unlocked = checkAchievementUnlocked(achievement, {
        ...profile.stats,
        memesCreated: newMemesCreated,
      });

      if (unlocked) {
        updatedBadges[achievement.id] = true;
        console.log(`🏆 Badge unlocked: ${achievement.name}`);
      }
    }

    // 7. Update profile
    const success = await updateUserProfile(userId, {
      xp: newXP,
      level: newLevel,
      stats: {
        ...profile.stats,
        memesCreated: newMemesCreated,
      },
      badges: updatedBadges,
      questProgress: updatedQuestProgress,
      lastLoginAt: new Date().toISOString(),
    });

    if (success) {
      console.log(`✅ Meme creation tracked: +${xpEarned} XP, Level ${newLevel}`);
    }

    return success;
  } catch (error) {
    console.error('❌ Failed to track meme creation:', error);
    return false;
  }
}
