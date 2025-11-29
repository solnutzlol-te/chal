/**
 * Profile Page - XP Gamification Dashboard
 * 
 * Galvenā profila lapa, kas parāda:
 * - Level + XP progress
 * - Badges/Achievements grid
 * - Active quests list
 * - User stats (memes, tweets, GM)
 * 
 * Izmanto Firestore real-time updates ar onSnapshot.
 * 
 * Route: /profile/:userId (vai /profile bez ID - tad lieto "anonymous")
 */

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { onSnapshot, doc } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase-config";
import { getActiveQuests, getAchievements, getUserProfile } from "@/lib/firebase-utils";
import ProfileCard from "@/components/profile-card";
import BadgesGrid from "@/components/badges-grid";
import QuestsList from "@/components/quests-list";
import { Button } from "@/components/ui/button";
import { Home, Sparkles } from "lucide-react";
import type { UserProfile, Quest, Achievement } from "@/types/user-profile";

export default function ProfilePage() {
  // Get userId from URL params (default to "anonymous" if not provided)
  const { userId = "anonymous" } = useParams<{ userId?: string }>();
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check Firebase configuration
  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setError('Firebase not configured. Please add Firebase environment variables.');
      setLoading(false);
      return;
    }
    setError(null);
  }, []);

  // Subscribe to user profile (real-time updates)
  useEffect(() => {
    if (!isFirebaseConfigured() || !db) return;

    const loadProfile = async () => {
      try {
        // Try to get or create profile
        const userProfile = await getUserProfile(userId);
        if (userProfile) {
          setProfile(userProfile);
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();

    // Set up real-time listener
    const userRef = doc(db, 'users', userId);
    const unsubscribe = onSnapshot(
      userRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setProfile(snapshot.data() as UserProfile);
          setLoading(false);
        }
      },
      (err) => {
        console.error('Profile snapshot error:', err);
        setError('Failed to sync profile data.');
      }
    );

    return () => unsubscribe();
  }, [userId]);

  // Load quests (one-time)
  useEffect(() => {
    if (!isFirebaseConfigured()) return;

    const loadQuests = async () => {
      try {
        const activeQuests = await getActiveQuests();
        setQuests(activeQuests);
      } catch (err) {
        console.error('Failed to load quests:', err);
      }
    };

    loadQuests();
  }, []);

  // Load achievements (one-time)
  useEffect(() => {
    if (!isFirebaseConfigured()) return;

    const loadAchievements = async () => {
      try {
        const allAchievements = await getAchievements();
        setAchievements(allAchievements);
      } catch (err) {
        console.error('Failed to load achievements:', err);
      }
    };

    loadAchievements();
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-sky overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-pastel-purple rounded-full doodle-border animate-bounce mx-auto mb-4 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-doodle-black" />
          </div>
          <p className="text-xl font-bold text-doodle-black text-marker">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-sky overflow-hidden flex items-center justify-center p-4">
        <div className="card-doodle bg-white p-8 max-w-md text-center">
          <p className="text-lg font-bold text-red-600 mb-4">❌ {error}</p>
          <p className="text-sm text-gray-600 mb-6">
            Please check FIREBASE_SETUP.md for configuration instructions.
          </p>
          <Link to="/">
            <Button className="btn-doodle bg-pastel-yellow hover:bg-pastel-yellow-dark">
              <Home className="mr-2 w-5 h-5" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // No Profile State (shouldn't happen - getUserProfile creates default profile)
  if (!profile) {
    return (
      <div className="min-h-screen bg-sky overflow-hidden flex items-center justify-center p-4">
        <div className="card-doodle bg-white p-8 max-w-md text-center">
          <p className="text-lg font-bold text-gray-600 mb-4">🤷 Profile not found</p>
          <Link to="/">
            <Button className="btn-doodle bg-pastel-yellow hover:bg-pastel-yellow-dark">
              <Home className="mr-2 w-5 h-5" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Main Profile View
  return (
    <div className="min-h-screen bg-sky overflow-hidden">
      {/* Top spacing */}
      <div className="h-8" />

      {/* Header */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Back Button */}
          <div className="mb-6">
            <Link to="/">
              <Button className="btn-doodle bg-white hover:bg-pastel-yellow text-doodle-black shadow-lg">
                <Home className="mr-2 w-5 h-5" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-doodle-black mb-4 text-marker">
              Player Profile 🎮
            </h1>
            <div className="inline-block bg-white doodle-border-thick doodle-shadow px-6 py-3 transform -rotate-1">
              <p className="text-lg font-bold text-doodle-black">
                Level {profile.level} • {profile.xp} XP • {Object.keys(profile.badges).length} Badges
              </p>
            </div>
          </div>

          {/* Profile Grid - 3 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Profile Card (Level + XP + Stats) */}
            <div className="lg:col-span-1">
              <ProfileCard profile={profile} />
            </div>

            {/* Middle: Badges Grid */}
            <div className="lg:col-span-1">
              <BadgesGrid 
                badges={profile.badges} 
                achievements={achievements} 
              />
            </div>

            {/* Right: Quests List */}
            <div className="lg:col-span-1">
              <QuestsList 
                quests={quests} 
                questProgress={profile.questProgress} 
              />
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-pastel-pink doodle-border-thick doodle-shadow px-8 py-4 transform rotate-1">
              <p className="text-xl font-bold text-doodle-black mb-3">
                Keep creating memes to earn XP! 🚀
              </p>
              <Link to="/meme-generator">
                <Button className="btn-doodle bg-pastel-purple hover:bg-pastel-purple-dark text-doodle-black text-lg">
                  <Sparkles className="mr-2 w-5 h-5" />
                  Go to Meme Generator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 mt-20 bg-pastel-green border-t-4 border-doodle-black">
        <div className="container mx-auto max-w-6xl text-center">
          <h3 className="text-3xl font-bold text-doodle-black mb-4 text-marker">
            CHALKIES NFT
          </h3>
          <p className="text-lg text-doodle-black font-semibold">
            Made with ❤️ and chalk • Share your progress with #ChalkiesNFT
          </p>
        </div>
      </footer>
    </div>
  );
}
