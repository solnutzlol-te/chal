import Navbar from "@/components/navbar";
import MemeGenerator from "@/components/meme-generator";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function MemePage() {
  return (
    <div className="min-h-screen bg-sky overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Decorative grass at top */}
      <div className="h-24" />

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto">

          {/* Meme Generator */}
          <MemeGenerator />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 mt-20 bg-pastel-green border-t-4 border-doodle-black">
        <div className="container mx-auto max-w-6xl text-center">
          <h3 className="text-3xl font-bold text-doodle-black mb-4 text-marker">
            CHALKIES NFT
          </h3>
          <p className="text-lg text-doodle-black font-semibold">
            Made with ❤️ and chalk • Share your memes with #ChalkiesNFT
          </p>
        </div>
      </footer>
    </div>
  );
}
