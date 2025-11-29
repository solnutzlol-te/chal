import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    {
      label: "Home",
      icon: Home,
      action: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      color: "bg-pastel-pink",
      hoverColor: "hover:bg-pastel-pink-dark",
    },
        {
      label: "Memes",
      icon: Sparkles,
      action: () => window.location.href = '/meme-generator',
      color: "bg-pastel-purple",
      hoverColor: "hover:bg-pastel-purple-dark",
    },
    {
      label: "Stake",
      icon: Sparkles,
      action: () => scrollToSection(''),
      color: "bg-pastel-purple",
      hoverColor: "hover:bg-pastel-purple-dark",
    },
  ];

  return (
    <>
      {/* Desktop & Mobile Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-sky border-b-4 border-doodle-black shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 group"
            >
              <div className="w-14 h-14 rounded-full doodle-border-thick doodle-shadow-sm flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 overflow-hidden bg-white">
                <img 
                  src="/favicon.svg" 
                  alt="Chalkies Logo" 
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    // Fallback uz Sparkles ikonu, ja logo nav atrasts
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-doodle-black"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>';
                    }
                  }}
                />
              </div>
              <span className="text-2xl font-bold text-doodle-black text-marker hidden sm:block" style={{ textShadow: '1px 1px 0px rgba(255,255,255,0.5)' }}>
                CHALKIES
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={index}
                    onClick={item.action}
                    className={cn(
                      "text-xl px-8 py-5 transform transition-all duration-200 font-bold",
                      "doodle-border-thick doodle-shadow",
                      "hover:translate-x-1 hover:translate-y-1 hover:shadow-sm",
                      "active:translate-x-2 active:translate-y-2 active:shadow-none",
                      item.color,
                      item.hoverColor,
                      "text-doodle-black"
                    )}
                    style={{
                      textShadow: '0.5px 0.5px 0px rgba(255,255,255,0.5)',
                      fontFamily: "'Comic Neue', cursive",
                      fontWeight: 700
                    }}
                  >
                    <Icon className="w-7 h-7 mr-3 stroke-[2.5]" />
                    {item.label}
                  </Button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-14 h-14 bg-pastel-yellow rounded-xl doodle-border-thick doodle-shadow-sm flex items-center justify-center hover:bg-pastel-yellow-dark transition-all hover:translate-y-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-7 h-7 text-doodle-black stroke-[3]" />
              ) : (
                <Menu className="w-7 h-7 text-doodle-black stroke-[3]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-doodle-black bg-opacity-50 transition-opacity duration-300 md:hidden",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "fixed top-20 right-0 bottom-0 w-72 bg-sky border-l-4 border-doodle-black z-40 transform transition-transform duration-300 ease-out md:hidden overflow-y-auto",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-6 space-y-4">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.action}
                className={cn(
                  "w-full flex items-center gap-4 px-8 py-5 rounded-xl doodle-border-thick doodle-shadow-sm text-xl font-bold text-doodle-black transition-all duration-200",
                  item.color,
                  item.hoverColor,
                  "hover:translate-x-2"
                )}
                style={{
                  textShadow: '0.5px 0.5px 0px rgba(255,255,255,0.5)',
                  fontFamily: "'Comic Neue', cursive",
                  fontWeight: 700
                }}
              >
                <Icon className="w-8 h-8 stroke-[2.5]" />
                {item.label}
              </button>
            );
          })}

          {/* Decorative element */}
          <div className="pt-6 mt-6 border-t-3 border-doodle-black">
            <div className="text-center">
              <div className="inline-block bg-white px-4 py-2 doodle-border transform -rotate-2">
                <p className="text-sm font-bold text-doodle-black">🎨 Made with ❤️</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
