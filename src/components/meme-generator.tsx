/**
 * Chalkies Meme Generator Component - V6.5
 *
 * FIX:
 * - Peles koordinātas pārveidotas uz CANVAS koordinātēm (ņem vērā CSS scale)
 * - Scale handle hitbox palielināts un precīzi sakrīt ar zilo kvadrātu
 */

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Download,
  Share2,
  ImageIcon,
  Type,
  Upload,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Popular Meme Templates (Top 6 most popular)
const defaultTemplates = [
  {
    id: 1,
    src: "https://i.imgflip.com/30b1gx.jpg",
    name: "Drake Hotline Bling",
  },
  {
    id: 2,
    src: "https://i.imgflip.com/26am.jpg",
    name: "Surprised Pikachu",
  },
  {
    id: 3,
    src: "https://i.imgflip.com/1bij.jpg",
    name: "Success Kid",
  },
  {
    id: 4,
    src: "https://i.imgflip.com/4t0m5.jpg",
    name: "Woman Yelling at Cat",
  },
  {
    id: 5,
    src: "https://i.imgflip.com/1g8my4.jpg",
    name: "Distracted Boyfriend",
  },
  {
    id: 6,
    src: "https://i.imgflip.com/2/345v97.jpg",
    name: "Bernie Sanders",
  },
];

// Additional 20 popular templates (hidden by default)
const moreTemplates = [
  { id: 8, src: "https://i.imgflip.com/2fm6x.jpg", name: "Mocking SpongeBob" },
  { id: 9, src: "https://i.imgflip.com/1otk96.jpg", name: "Trump Signing" },
  {
    id: 10,
    src: "https://i.imgflip.com/3lmzyx.jpg",
    name: "Bernie I Am Once Again",
  },
  {
    id: 11,
    src: "https://i.imgflip.com/23ls.jpg",
    name: "Third World Skeptical Kid",
  },
  { id: 12, src: "https://i.imgflip.com/92.jpg", name: "Bad Luck Brian" },
  { id: 13, src: "https://i.imgflip.com/1ihzfe.jpg", name: "Expanding Brain" },
  {
    id: 14,
    src: "https://i.imgflip.com/9ehk.jpg",
    name: "Overly Attached Girlfriend",
  },
  { id: 16, src: "https://i.imgflip.com/9vct.jpg", name: "Y U No" },
  {
    id: 17,
    src: "https://i.imgflip.com/1ur9b0.jpg",
    name: "Spider-Man Pointing",
  },
  {
    id: 18,
    src: "https://i.imgflip.com/1c1uej.jpg",
    name: "Leonardo DiCaprio Cheers",
  },
  { id: 20, src: "https://i.imgflip.com/4/2cp1.jpg", name: "Matrix Morpheus" },
  {
    id: 22,
    src: "https://i.imgflip.com/2kbn1e.jpg",
    name: "They're The Same Picture",
  },
  {
    id: 25,
    src: "https://i.imgflip.com/1b42wl.jpg",
    name: "American Chopper Argument",
  },
  {
    id: 26,
    src: "https://i.imgflip.com/24y43o.jpg",
    name: "Batman Slapping Robin",
  },
];

interface TextPosition {
  x: number; // 0–1
  y: number; // 0–1
}

interface TextTransform {
  scale: number; // 0.3–3
  rotation: number; // grādi
}

interface AlignmentGuides {
  showHorizontalCenter: boolean;
  showVerticalAlignment: boolean;
  showSymmetricSpacing: boolean;
}

type DragMode = "move" | "rotate" | "scale" | null;

export default function MemeGenerator() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showMoreTemplates, setShowMoreTemplates] = useState(false);

  const [topTextPos, setTopTextPos] = useState<TextPosition>({
    x: 0.5,
    y: 0.08,
  });
  const [bottomTextPos, setBottomTextPos] = useState<TextPosition>({
    x: 0.5,
    y: 0.92,
  });

  const [topTextTransform, setTopTextTransform] = useState<TextTransform>({
    scale: 1,
    rotation: 0,
  });
  const [bottomTextTransform, setBottomTextTransform] =
    useState<TextTransform>({
      scale: 1,
      rotation: 0,
    });

  const [selectedText, setSelectedText] = useState<"top" | "bottom" | null>(
    null
  );
  const [dragMode, setDragMode] = useState<DragMode>(null);
  const [dragStart, setDragStart] = useState<{
    x: number;
    y: number;
    initialRotation?: number;
    initialScale?: number;
  } | null>(null);

  const [alignmentGuides, setAlignmentGuides] = useState<AlignmentGuides>({
    showHorizontalCenter: false,
    showVerticalAlignment: false,
    showSymmetricSpacing: false,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getTextMetrics = (text: string, transform: TextTransform) => {
    const baseFontSize = 60;
    const fontSize = baseFontSize * transform.scale;
    const width = text.length * fontSize * 0.6;
    const height = fontSize * 1.2;
    return { width, height, fontSize };
  };

  useEffect(() => {
    if (!topText || !bottomText) {
      setAlignmentGuides({
        showHorizontalCenter: false,
        showVerticalAlignment: false,
        showSymmetricSpacing: false,
      });
      return;
    }

    const tolerance = 0.02;

    const bothCentered =
      Math.abs(topTextPos.x - 0.5) < tolerance &&
      Math.abs(bottomTextPos.x - 0.5) < tolerance;

    const verticallyAligned =
      Math.abs(topTextPos.x - bottomTextPos.x) < tolerance;

    const topDistanceFromTop = topTextPos.y;
    const bottomDistanceFromBottom = 1 - bottomTextPos.y;
    const symmetricSpacing =
      Math.abs(topDistanceFromTop - bottomDistanceFromBottom) < tolerance;

    setAlignmentGuides({
      showHorizontalCenter: bothCentered,
      showVerticalAlignment: verticallyAligned && !bothCentered,
      showSymmetricSpacing: symmetricSpacing,
    });
  }, [topTextPos, bottomTextPos, topText, bottomText]);

  const allTemplates = showMoreTemplates
    ? [...defaultTemplates, ...moreTemplates]
    : defaultTemplates;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file!");
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setImageLoaded(false);
  };

  const handleResetPositions = () => {
    setTopTextPos({ x: 0.5, y: 0.08 });
    setBottomTextPos({ x: 0.5, y: 0.92 });
    setTopTextTransform({ scale: 1, rotation: 0 });
    setBottomTextTransform({ scale: 1, rotation: 0 });
    setSelectedText(null);
    console.log("🔄 Reset all positions and transforms");
  };

  const getDistance = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const getAngle = (x1: number, y1: number, x2: number, y2: number) =>
    (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

  /**
   * Hit detection lokālajās koordinātēs (canvas-space, nevis CSS-space)
   */
  const checkHandleHit = (
    mouseX: number,
    mouseY: number,
    text: string,
    position: TextPosition,
    transform: TextTransform,
    canvasWidth: number,
    canvasHeight: number
  ): { type: "rotate" | "scale" | "move" | null } => {
    const textX = canvasWidth * position.x;
    const textY = canvasHeight * position.y;
    const metrics = getTextMetrics(text, transform);

    const halfWidth = metrics.width / 2;
    const halfHeight = metrics.height / 2;
    const handleDistance = metrics.height * 0.8;
    const rotateHandleRadius = 24;
    const scaleHandleSize = 32; // lielāks hitbox

    // Global -> local
    const rad = (transform.rotation * Math.PI) / 180;
    const cos = Math.cos(-rad);
    const sin = Math.sin(-rad);

    const dx = mouseX - textX;
    const dy = mouseY - textY;

    const localX = dx * cos - dy * sin;
    const localY = dx * sin + dy * cos;

    console.log(
      `👀 Local coords: (${localX.toFixed(1)}, ${localY.toFixed(
        1
      )}) rotation=${transform.rotation.toFixed(1)}`
    );

    // 🟢 ROTATE handle
    const distToRotate = getDistance(localX, localY, 0, -handleDistance);
    if (distToRotate < rotateHandleRadius) {
      console.log("✅ HIT ROTATE HANDLE (local)!");
      return { type: "rotate" };
    }

    // 🔵 SCALE handle (kvadrāts ap top-right)
    const scaleCenterX = halfWidth;
    const scaleCenterY = -halfHeight;
    const withinScaleX =
      Math.abs(localX - scaleCenterX) < scaleHandleSize / 2;
    const withinScaleY =
      Math.abs(localY - scaleCenterY) < scaleHandleSize / 2;

    if (withinScaleX && withinScaleY) {
      console.log("✅ HIT SCALE HANDLE (local)!");
      return { type: "scale" };
    }

    // ✋ Teksta ķermenis (move)
    const insideBody =
      Math.abs(localX) <= halfWidth && Math.abs(localY) <= halfHeight;
    if (insideBody) {
      console.log("✅ HIT TEXT BODY (move mode)");
      return { type: "move" };
    }

    return { type: null };
  };

  /**
   * Helper: konvertē peles event uz canvas koordinātēm (ņem vērā CSS scale)
   */
  const getMouseInCanvasSpace = (
    e: React.MouseEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    return { x, y };
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { x: mouseX, y: mouseY } = getMouseInCanvasSpace(e, canvas);
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    console.log(
      `\n🖱️ MOUSE DOWN (canvas-space) at (${mouseX.toFixed(
        0
      )}, ${mouseY.toFixed(0)})`
    );

    if (topText) {
      console.log("🔍 Checking TOP text...");
      const topHit = checkHandleHit(
        mouseX,
        mouseY,
        topText,
        topTextPos,
        topTextTransform,
        canvasWidth,
        canvasHeight
      );
      if (topHit.type) {
        setSelectedText("top");
        setDragMode(topHit.type);
        setDragStart({
          x: mouseX,
          y: mouseY,
          initialRotation: topTextTransform.rotation,
          initialScale: topTextTransform.scale,
        });
        console.log(
          `📌 TOP drag start: mode=${topHit.type}, rot=${topTextTransform.rotation}, scale=${topTextTransform.scale}`
        );
        return;
      }
    }

    if (bottomText) {
      console.log("🔍 Checking BOTTOM text...");
      const bottomHit = checkHandleHit(
        mouseX,
        mouseY,
        bottomText,
        bottomTextPos,
        bottomTextTransform,
        canvasWidth,
        canvasHeight
      );
      if (bottomHit.type) {
        setSelectedText("bottom");
        setDragMode(bottomHit.type);
        setDragStart({
          x: mouseX,
          y: mouseY,
          initialRotation: bottomTextTransform.rotation,
          initialScale: bottomTextTransform.scale,
        });
        console.log(
          `📌 BOTTOM drag start: mode=${bottomHit.type}, rot=${bottomTextTransform.rotation}, scale=${bottomTextTransform.scale}`
        );
        return;
      }
    }

    console.log("❌ No handle hit → deselect");
    setSelectedText(null);
    setDragMode(null);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !dragMode || !dragStart || !selectedText) return;

    const { x: mouseX, y: mouseY } = getMouseInCanvasSpace(e, canvas);
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    console.log(
      `🖱️ MOUSE MOVE (canvas-space): mode=${dragMode}, mouse=(${mouseX.toFixed(
        0
      )}, ${mouseY.toFixed(0)})`
    );

    const isTop = selectedText === "top";
    const currentPos = isTop ? topTextPos : bottomTextPos;
    const currentTransform = isTop ? topTextTransform : bottomTextTransform;
    const setPos = isTop ? setTopTextPos : setBottomTextPos;
    const setTransform = isTop ? setTopTextTransform : setBottomTextTransform;

    if (dragMode === "move") {
      const deltaX = (mouseX - dragStart.x) / canvasWidth;
      const deltaY = (mouseY - dragStart.y) / canvasHeight;
      const newX = Math.max(0.1, Math.min(0.9, currentPos.x + deltaX));
      const newY = Math.max(0.05, Math.min(0.95, currentPos.y + deltaY));
      setPos({ x: newX, y: newY });
      setDragStart({ ...dragStart, x: mouseX, y: mouseY });
      console.log(`📍 Move → (${newX.toFixed(2)}, ${newY.toFixed(2)})`);
    } else if (dragMode === "rotate") {
      const textX = canvasWidth * currentPos.x;
      const textY = canvasHeight * currentPos.y;
      const angle = getAngle(textX, textY, mouseX, mouseY);
      const newRotation = angle - 90;
      setTransform({ ...currentTransform, rotation: newRotation });
      console.log(`🔄 Rotate → ${newRotation.toFixed(1)}°`);
    } else if (dragMode === "scale") {
      const textX = canvasWidth * currentPos.x;
      const textY = canvasHeight * currentPos.y;
      const initialDist = getDistance(textX, textY, dragStart.x, dragStart.y);
      const currentDist = getDistance(textX, textY, mouseX, mouseY);

      console.log(
        `📏 Scale distances: initial=${initialDist.toFixed(
          1
        )}, current=${currentDist.toFixed(1)}`
      );

      if (initialDist > 0 && dragStart.initialScale !== undefined) {
        const scaleFactor = currentDist / initialDist;
        const baseScale = dragStart.initialScale;
        const newScale = Math.max(0.3, Math.min(3, baseScale * scaleFactor));
        setTransform({ ...currentTransform, scale: newScale });
        console.log(
          `📏 Scale → ${newScale.toFixed(2)}x (base=${baseScale.toFixed(2)})`
        );
      }
    }
  };

  const handleCanvasMouseUp = () => {
    console.log(`🖱️ MOUSE UP → reset drag (mode=${dragMode})`);
    setDragMode(null);
    setDragStart(null);
  };

  const getCursorStyle = () => {
    if (dragMode === "move") return "cursor-grabbing";
    if (dragMode === "rotate") return "cursor-grab";
    if (dragMode === "scale") return "cursor-nwse-resize";
    return "cursor-pointer";
  };

  useEffect(() => {
    if (!selectedImage || !imageLoaded || !canvasRef.current || !imageRef.current)
      return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imageRef.current;

    canvas.width = 800;
    canvas.height = 800;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

    if (topText && bottomText && selectedText) {
      ctx.save();
      ctx.strokeStyle = "rgba(255, 0, 255, 0.8)";
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);

      if (alignmentGuides.showHorizontalCenter) {
        const centerX = canvas.width * 0.5;
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, canvas.height);
        ctx.stroke();
      }

      if (alignmentGuides.showVerticalAlignment) {
        const alignX = canvas.width * topTextPos.x;
        ctx.beginPath();
        ctx.moveTo(alignX, 0);
        ctx.lineTo(alignX, canvas.height);
        ctx.stroke();
      }

      if (alignmentGuides.showSymmetricSpacing) {
        const topY = canvas.height * topTextPos.y;
        const bottomY = canvas.height * bottomTextPos.y;

        ctx.strokeStyle = "rgba(0, 255, 0, 0.8)";
        ctx.beginPath();
        ctx.moveTo(0, topY);
        ctx.lineTo(canvas.width, topY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, bottomY);
        ctx.lineTo(canvas.width, bottomY);
        ctx.stroke();
      }

      ctx.restore();
    }

    const drawTextWithTransform = (
      text: string,
      position: TextPosition,
      transform: TextTransform,
      isSelected: boolean
    ) => {
      const textX = canvas.width * position.x;
      const textY = canvas.height * position.y;
      const metrics = getTextMetrics(text, transform);
      const rad = (transform.rotation * Math.PI) / 180;

      ctx.save();
      ctx.translate(textX, textY);
      ctx.rotate(rad);

      const halfWidth = metrics.width / 2;
      const halfHeight = metrics.height / 2;

      if (isSelected) {
        ctx.save();
        ctx.strokeStyle = "rgba(59, 130, 246, 0.8)";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(-halfWidth, -halfHeight, metrics.width, metrics.height);

        // 🔵 SCALE handle (lokālais top-right)
        ctx.fillStyle = "rgba(59, 130, 246, 0.9)";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.setLineDash([]);
        const handleSize = 32;
        const scaleX = halfWidth - handleSize / 2;
        const scaleY = -halfHeight - handleSize / 2;
        ctx.fillRect(scaleX, scaleY, handleSize, handleSize);
        ctx.strokeRect(scaleX, scaleY, handleSize, handleSize);

        // 🟢 ROTATE handle (lokāls 0, -handleDistance)
        const handleDistance = metrics.height * 0.8;
        const radius = 12;
        ctx.beginPath();
        ctx.fillStyle = "rgba(34, 197, 94, 0.9)";
        ctx.strokeStyle = "white";
        ctx.arc(0, -handleDistance, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Līnija no teksta uz handle
        ctx.strokeStyle = "rgba(34, 197, 94, 0.6)";
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(0, -handleDistance + radius);
        ctx.lineTo(0, -halfHeight);
        ctx.stroke();

        ctx.restore();
      }

      const baseFontSize = 60;
      const scaledFontSize = baseFontSize * transform.scale;

      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 8 * transform.scale;
      ctx.font = `bold ${scaledFontSize}px "Impact", "Arial Black", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.strokeText(text.toUpperCase(), 0, 0);
      ctx.fillText(text.toUpperCase(), 0, 0);

      ctx.restore();
    };

    if (topText) {
      drawTextWithTransform(
        topText,
        topTextPos,
        topTextTransform,
        selectedText === "top"
      );
    }
    if (bottomText) {
      drawTextWithTransform(
        bottomText,
        bottomTextPos,
        bottomTextTransform,
        selectedText === "bottom"
      );
    }
  }, [
    selectedImage,
    imageLoaded,
    topText,
    bottomText,
    topTextPos,
    bottomTextPos,
    topTextTransform,
    bottomTextTransform,
    selectedText,
    alignmentGuides,
  ]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = `chalkies-meme-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleShare = () => {
    const text = encodeURIComponent(
      `Check out my Chalkies meme! 🎨😂 #ChalkiesNFT #NFTMeme #CryptoMemes`
    );
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-doodle-black mb-4 text-marker">
          Meme Generator 😂
        </h1>
        <div className="inline-block bg-white doodle-border-thick doodle-shadow px-6 py-3 transform -rotate-1">
          <p className="text-xl font-bold text-doodle-black">
            Create hilarious memes • Direct Canvas Controls • Custom Templates 🎨
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="card-doodle bg-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-pastel-purple rounded-full doodle-border flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-doodle-black" />
              </div>
              <h3 className="text-2xl font-bold text-doodle-black">
                Choose Image
              </h3>
            </div>

            <div className="mb-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="btn-doodle bg-pastel-orange hover:bg-pastel-orange-dark text-doodle-black w-full"
              >
                <Upload className="mr-2 w-5 h-5" />
                Upload Your Own Image
              </Button>
            </div>

            <div className="text-center mb-3">
              <span className="text-sm font-bold text-doodle-black opacity-60">
                OR CHOOSE A TEMPLATE:
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {allTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    setSelectedImage(template.src);
                    setImageLoaded(false);
                  }}
                  className={cn(
                    "aspect-square rounded-lg doodle-border transition-all hover:scale-105",
                    selectedImage === template.src
                      ? "ring-4 ring-pastel-yellow doodle-shadow"
                      : "opacity-70 hover:opacity-100"
                  )}
                  title={template.name}
                >
                  <img
                    src={template.src}
                    alt={template.name}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23B8E6F5"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%23333"%3EMEME%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </button>
              ))}
            </div>

            <div className="mt-4">
              <Button
                onClick={() => setShowMoreTemplates(!showMoreTemplates)}
                variant="outline"
                className="btn-doodle bg-white hover:bg-pastel-yellow text-doodle-black w-full"
              >
                {showMoreTemplates ? (
                  <>
                    <ChevronUp className="mr-2 w-4 h-4" />
                    Show Less Templates
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-2 w-4 h-4" />
                    Show More Templates
                  </>
                )}
              </Button>
            </div>
          </Card>

          <Card className="card-doodle bg-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-pastel-pink rounded-full doodle-border flex items-center justify-center">
                <Type className="w-5 h-5 text-doodle-black" />
              </div>
              <h3 className="text-2xl font-bold text-doodle-black">
                Add Your Text
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-lg font-bold text-doodle-black mb-2">
                  Top Text
                </label>
                <Input
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  placeholder="WHEN YOU..."
                  className="doodle-border text-lg font-bold uppercase"
                  maxLength={50}
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-doodle-black mb-2">
                  Bottom Text
                </label>
                <Input
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  placeholder="...MINT A CHALKY"
                  className="doodle-border text-lg font-bold uppercase"
                  maxLength={50}
                />
              </div>

              {(topText || bottomText) && (
                <Button
                  onClick={handleResetPositions}
                  variant="outline"
                  className="btn-doodle bg-white hover:bg-gray-100 text-doodle-black w-full"
                >
                  <RotateCcw className="mr-2 w-4 h-4" />
                  Reset All (Position + Size + Rotation)
                </Button>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="card-doodle bg-white">
            <h3 className="text-2xl font-bold text-doodle-black mb-2 text-center">
              Preview
            </h3>
            <p className="text-sm font-bold text-doodle-black opacity-60 text-center mb-4">
              💡 Click text • Drag 🟢 to rotate • Drag 🔵 to scale • Move
              anywhere! ✨
            </p>

            <div
              ref={containerRef}
              className="relative aspect-square bg-sky-light rounded-lg doodle-border overflow-hidden"
            >
              {selectedImage ? (
                <>
                  <img
                    ref={imageRef}
                    src={selectedImage}
                    alt="Selected template"
                    className="hidden"
                    onLoad={() => setImageLoaded(true)}
                    crossOrigin="anonymous"
                  />

                  <canvas
                    ref={canvasRef}
                    className={cn(
                      "w-full h-full object-contain",
                      getCursorStyle()
                    )}
                    onMouseDown={handleCanvasMouseDown}
                    onMouseMove={handleCanvasMouseMove}
                    onMouseUp={handleCanvasMouseUp}
                    onMouseLeave={handleCanvasMouseUp}
                  />
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <ImageIcon className="w-16 h-16 text-doodle-black opacity-30 mb-4" />
                  <p className="text-xl font-bold text-doodle-black opacity-50">
                    Select a template or upload your own! 👆
                  </p>
                </div>
              )}
            </div>

{selectedText && (
  alignmentGuides.showHorizontalCenter ||
  alignmentGuides.showVerticalAlignment ||
  alignmentGuides.showSymmetricSpacing
) && (
  <div className="mt-4 p-3 bg-pastel-purple-light rounded-lg doodle-border">
    <p className="text-sm font-bold text-doodle-black text-center">
      ✨ Perfect Alignment Detected! ✨
    </p>
  </div>
)}

          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleDownload}
              disabled={!selectedImage}
              className="btn-doodle bg-pastel-green hover:bg-pastel-green-dark text-doodle-black text-lg h-14"
            >
              <Download className="mr-2 w-5 h-5" />
              Download
            </Button>

            <Button
              onClick={handleShare}
              disabled={!selectedImage}
              className="btn-doodle bg-pastel-purple hover:bg-pastel-purple-dark text-doodle-black text-lg h-14"
            >
              <Share2 className="mr-2 w-5 h-5" />
              Share
            </Button>
          </div>

          <Card className="card-doodle bg-pastel-yellow-light">
            <h4 className="text-lg font-bold text-doodle-black mb-2">
              💡 Canvas Master Tips:
            </h4>
            <ul className="text-sm font-semibold text-doodle-black space-y-1">
              <li>• 🟢 Drag GREEN circle to rotate text! 🔄</li>
              <li>• 🔵 Drag BLUE square to scale text! 📏</li>
              <li>• 👆 Click text body to move anywhere! 🖱️</li>
              <li>• 🖼️ 20+ templates + upload your own!</li>
              <li>• 🐦 Share on Twitter with #ChalkiesNFT!</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
