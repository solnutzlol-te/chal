import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Sparkles, 
  Rocket, 
  Users, 
  Zap, 
  Heart,
  Star,
  Cloud,
  Plus,
  Minus
} from "lucide-react";

export default function Index() {
  const [mintQuantity, setMintQuantity] = useState(1);
  const maxMint = 10;
  const totalSupply = 1999;
  const minted = 75;
  const price = 0; // Free mint

  const incrementQuantity = () => {
    if (mintQuantity < maxMint) {
      setMintQuantity(mintQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (mintQuantity > 1) {
      setMintQuantity(mintQuantity - 1);
    }
  };

  const nftGallery = [
    { id: 1, name: "Flame Chalky", image: "nft-1.png", rarity: "Legendary" },
    { id: 2, name: "Silly Chalky", image: "nft-5.png", rarity: "Legendary" },
    { id: 3, name: "Positive Chalky", image: "/nft-3.png", rarity: "Common" },
    { id: 4, name: "Sad Chalky", image: "/nft-4.png", rarity: "Common" },
    { id: 5, name: "Friendly Chalky", image: "/nft-2.png", rarity: "Epic" },
    { id: 6, name: "Cowboy Chalky", image: "/nft-6.png", rarity: "Rare" },
  ];

  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Launch & Mint",
      description: "FREE mint for everyone!",
      icon: Rocket,
      status: "current",
    },
    {
      phase: "Phase 2",
      title: "Community Building",
      description: "Discord, Twitter, and exclusive holder events",
      icon: Users,
      status: "upcoming",
    },
    {
      phase: "Phase 3",
      title: "Utility Drop",
      description: "Staking, rewards, and special perks",
      icon: Zap,
      status: "upcoming",
    },
    {
      phase: "Phase 4",
      title: "Metaverse Integration",
      description: "3D avatars and virtual world access",
      icon: Sparkles,
      status: "future",
    },
  ];

  const faqs = [
    {
      question: "How much does it cost to mint?",
      answer: "Absolutely FREE! This is a 100% free mint for Chalkies NFT. You only pay gas fees.",
    },
    {
      question: "How many can I mint?",
      answer: "There is no limit.",
    },
    {
      question: "What blockchain is this on?",
      answer: "Our NFTs are minted on Monad blockchain.",
    },
    {
      question: "What utility do these NFTs have?",
      answer: "Holders get access to exclusive Discord channels, future airdrops, staking rewards, and metaverse integration!",
    },
    {
      question: "When is the mint date?",
      answer: "Minting is LIVE NOW! Don't miss out on this opportunity!",
    },
  ];

  return (
    <div className="min-h-screen bg-sky overflow-hidden">
      {/* Decorative clouds */}
      <div className="fixed top-10 left-10 w-32 h-16 cloud-shape opacity-80 animate-float" style={{ animationDelay: '0s' }} />
      <div className="fixed top-20 right-20 w-40 h-20 cloud-shape opacity-70 animate-float" style={{ animationDelay: '1s' }} />
      <div className="fixed top-40 left-1/3 w-28 h-14 cloud-shape opacity-60 animate-float" style={{ animationDelay: '2s' }} />

      {/* Bunting decoration */}
      <div className="fixed top-0 left-0 right-0 z-50 h-20 overflow-hidden pointer-events-none">
        <div className="flex justify-around items-start pt-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[35px] border-doodle-black"
              style={{
                borderTopColor: [
                  'hsl(350, 100%, 85%)',
                  'hsl(120, 50%, 85%)',
                  'hsl(55, 100%, 85%)',
                  'hsl(280, 60%, 85%)',
                  'hsl(25, 100%, 85%)',
                ][i % 5],
              }}
            />
          ))}
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-doodle-black" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-block animate-bounce-slow mb-6">
              <div className="relative">
                {/* Main character blob */}
                <div className="w-48 h-48 mx-auto bg-pastel-purple doodle-border-thick doodle-shadow relative">
                  <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-white rounded-full border-4 border-doodle-black">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-doodle-black rounded-full" />
                  </div>
                  <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-white rounded-full border-4 border-doodle-black">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-doodle-black rounded-full" />
                  </div>
                  <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-doodle-black rounded-full" />
                  {/* Antenna */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-doodle-black" />
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-pastel-pink rounded-full border-3 border-doodle-black" />
                </div>
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold text-doodle-black mb-6 text-marker">
              CHALKIES NFT
            </h1>
            <div className="inline-block bg-white doodle-border-thick doodle-shadow px-8 py-4 mb-8 transform -rotate-2">
              <p className="text-2xl md:text-3xl font-bold text-doodle-black">
                MINT 100% FREE! 🎉
              </p>
            </div>
            <p className="text-xl md:text-2xl text-doodle-black max-w-2xl mx-auto mb-10 font-bold">
              Join the cutest chalk art community on the blockchain! 
              Collect, trade, and have fun with your unique Chalkies friends! 
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                className="btn-doodle bg-pastel-pink hover:bg-pastel-pink-dark text-doodle-black text-2xl"
                onClick={() => document.getElementById('mint-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Sparkles className="mr-2" /> Mint Now
              </Button>
              <a href="https://twitter.com/ChalkiesMON" target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-doodle bg-white hover:bg-pastel-yellow text-doodle-black text-2xl"
              >
                <Heart className="mr-2" /> Follow on X
              </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 text-center">
              {[
                { label: "Total Supply", value: totalSupply.toLocaleString() },
                { label: "Minted", value: minted.toLocaleString() },
                { label: "Price", value: "FREE" },
              ].map((stat, i) => (
                <div key={i} className="bg-white doodle-border doodle-shadow-sm px-8 py-4 transform rotate-1 hover:rotate-0 transition-transform">
                  <div className="text-3xl font-bold text-doodle-black">{stat.value}</div>
                  <div className="text-lg text-doodle-black font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative grass at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-pastel-green border-t-4 border-doodle-black overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 w-1 bg-pastel-green-dark grass-stroke"
              style={{
                left: `${i * 3.33}%`,
                height: `${Math.random() * 30 + 20}px`,
                borderLeft: '2px solid hsl(120, 50%, 65%)',
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Mint Section */}
      <section id="mint-section" className="py-20 px-4 bg-pastel-yellow-light border-y-4 border-doodle-black relative">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-doodle-black mb-12 text-marker">
            Mint Your Chalkies!
          </h2>

          <Card className="card-doodle bg-white max-w-4xl mx-auto p-8">
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-pastel-purple mb-2">100% FREE</div>
              <div className="text-xl text-doodle-black font-semibold">+ gas fees only</div>
            </div>

            {/* Mint Widget with doodle border */}
            <div className="relative mb-6">
              <div className="absolute -inset-2 bg-pastel-yellow doodle-border-thick doodle-shadow pointer-events-none" />
              <div className="relative bg-white doodle-border-thick overflow-hidden">
                <iframe 
                  id='iframe-widget' 
                  src='https://0x877f53ec1a6257e78b3b656e7612cc19df05615f_143.nfts2.me/?widget=classic&hideBanner=true' 
                  style={{ height: '515px', width: '100%', border: 'none', display: 'block' }}
                  title="Chalkies NFT Mint Widget"
                />
              </div>
            </div>

            <p className="text-center text-lg text-doodle-black font-bold">
              🎨 Connect your wallet above to mint your Chalkies! 🎨
            </p>
          </Card>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-doodle-black mb-4 text-marker">
            Meet the Chalkies!
          </h2>
          <p className="text-xl text-center text-doodle-black mb-12 font-semibold">
            Each one is unique and adorable! 🎨
          </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nftGallery.map((nft) => (
              <Card 
                key={nft.id} 
                className="card-doodle bg-white cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                {/* NFT Image */}
                <div className="w-full h-64 doodle-border mb-4 relative overflow-hidden bg-sky-light">
                  <img 
                    src={nft.image} 
                    alt={nft.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback: ja attēls nav atrasts, parāda placeholder
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23B8E6F5"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%23333"%3ENFT %23' + nft.id + '%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-white px-3 py-1 doodle-border text-sm font-bold">
                    #{nft.id}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-doodle-black mb-2">{nft.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="inline-block bg-pastel-yellow px-3 py-1 doodle-border text-sm font-bold">
                    {nft.rarity}
                  </span>
                  <Star className="text-pastel-yellow w-6 h-6 fill-current" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 px-4 bg-pastel-pink-light border-y-4 border-doodle-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-doodle-black mb-4 text-marker">
            Our Roadmap
          </h2>
          <p className="text-xl text-center text-doodle-black mb-12 font-semibold">
            The journey ahead for our Chalkies family! 🚀
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roadmapItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card 
                  key={index}
                  className={`card-doodle ${
                    item.status === 'current' ? 'bg-pastel-yellow' : 'bg-white'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-full ${
                      item.status === 'current' ? 'bg-pastel-purple' : 'bg-pastel-green'
                    } doodle-border flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-8 h-8 text-doodle-black" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-doodle-black-light mb-1">
                        {item.phase}
                      </div>
                      <h3 className="text-2xl font-bold text-doodle-black mb-2">
                        {item.title}
                      </h3>
                      <p className="text-lg text-doodle-black font-semibold">
                        {item.description}
                      </p>
                      {item.status === 'current' && (
                        <div className="mt-3 inline-block bg-white px-3 py-1 doodle-border text-sm font-bold animate-pulse">
                          IN PROGRESS
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-doodle-black mb-4 text-marker">
            FAQ
          </h2>
          <p className="text-xl text-center text-doodle-black mb-12 font-semibold">
            Got questions? We've got answers! 
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="card-doodle bg-white"
              >
                <AccordionTrigger className="text-xl font-bold text-doodle-black px-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-lg text-doodle-black px-6 pb-6 font-semibold">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-pastel-green border-t-4 border-doodle-black">
        <div className="container mx-auto max-w-6xl text-center">
          <h3 className="text-4xl font-bold text-doodle-black mb-6 text-marker">
            CHALKIES NFT
          </h3>
          <p className="text-lg text-doodle-black mb-8 font-semibold">
            Join our community and spread the chalk art love! 🎨💜
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a href="https://twitter.com/ChalkiesMON" target="_blank" rel="noopener noreferrer">
  <Button className="btn-doodle bg-pastel-purple hover:bg-pastel-purple-dark text-doodle-black">
    Twitter
  </Button>
</a>
          <a href="https://magiceden.io/collections/monad/0x877f53Ec1a6257e78B3b656e7612cc19df05615F" target="_blank" rel="noopener noreferrer">
            <Button className="btn-doodle bg-pastel-pink hover:bg-pastel-pink-dark text-doodle-black">
              MagicEden
            </Button>
          </a>
            <a href="https://opensea.io/collection/chalkies-147212371" target="_blank" rel="noopener noreferrer">
            <Button className="btn-doodle bg-pastel-yellow hover:bg-pastel-yellow-dark text-doodle-black">
              OpenSea
            </Button>
            </a>
          </div>
          <p className="text-sm text-doodle-black-light font-semibold">
            © 2025 Chalkies NFT. All rights reserved. Made with ❤️ and chalk.
          </p>
        </div>
      </footer>
    </div>
  );
}
