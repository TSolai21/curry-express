"use client";
import { useRef, useState, useEffect } from 'react';

const StarIcon = ({ filled, className = "w-4 h-4" }: { filled: boolean; className?: string }) => (
  <svg 
    className={`${className} transition-all duration-200 ${filled ? 'text-saffron fill-saffron' : 'text-brand-text-dim/20 fill-transparent'}`} 
    stroke="currentColor" 
    strokeWidth="2"
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M11.48 3.499c.196-.612 1.056-.612 1.252 0l1.834 5.727a.75.75 0 00.713.518h6.019c.643 0 .909.824.39 1.218l-4.87 3.717a.75.75 0 00-.272.838l1.834 5.727c.196.612-.505 1.123-1.018.75l-4.87-3.718a.75.75 0 00-.877 0l-4.87 3.718c-.513.75-1.214.238-1.018-.75l1.834-5.727a.75.75 0 00-.272-.838l-4.87-3.717c-.519-.394-.253-1.218.39-1.218h6.019a.75.75 0 00.713-.518l1.834-5.727z" 
    />
  </svg>
);

interface Props {
  src: string;
  author?: string;
  source?: string;
  text?: string;
  rating?: number;
  initialX?: number;
  initialY?: number;
  onPositionChange?: (x: number, y: number) => void;
}

export const ReviewImageCropper = ({
  src, author, source, text, rating = 5, initialX = 50, initialY = 50, onPositionChange
}: Props) => {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const dragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      lastMouse.current = { x: e.clientX, y: e.clientY };
      setPos(prev => {
        const nx = Math.min(100, Math.max(0, prev.x - dx * 0.25));
        const ny = Math.min(100, Math.max(0, prev.y - dy * 0.25));
        onPositionChange?.(nx, ny);
        return { x: nx, y: ny };
      });
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [onPositionChange]);

  const startDrag = (e: React.MouseEvent) => {
    dragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    e.preventDefault();
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-saffron flex items-center gap-1.5 font-bold">
          ✦ Live Preview — drag to reposition
        </p>
        <span className="text-[10px] text-brand-text-dim bg-surface-2 px-2 py-0.5 rounded-full font-mono">
          {Math.round(pos.x)}% · {Math.round(pos.y)}%
        </span>
      </div>

      <div className="w-[340px] mx-auto bg-surface rounded-xl overflow-hidden border border-brand-border flex flex-col shadow-2xl">
        <div
          onMouseDown={startDrag}
          className="relative h-[160px] w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        >
          <img
            src={src}
            alt="Preview"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ objectPosition: `${pos.x}% ${pos.y}%` }}
            draggable={false}
          />
          {/* Gradient overlay matching actual card */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
          {/* Author overlay matching actual card */}
          <div className="absolute bottom-3 left-4 flex items-center gap-2 pointer-events-none">
            <div className="text-sm font-bold text-white">{author || 'Customer Name'}</div>
            <div className="text-[10px] text-white/70">via {source || 'Source'}</div>
          </div>
          {/* Drag hint */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/40 text-white/60 text-[11px] px-3 py-1 rounded-full backdrop-blur-sm opacity-60">
              drag to reposition
            </div>
          </div>
        </div>
        {/* Text body matching live review style */}
        <div className="p-6 flex-1 flex flex-col justify-between bg-surface border-t border-brand-border/40">
          <div>
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} filled={star <= rating} className="w-4.5 h-4.5" />
              ))}
            </div>
            <div className="flex items-start gap-1">
              <span className="text-saffron font-serif text-[4rem] leading-[0.8] select-none shrink-0 mt-0.5">“</span>
              <p className="font-serif text-[1.02rem] italic text-cream/90 leading-[1.65] flex-1 line-clamp-4">
                {text || 'Review text goes here...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
