"use client";
import { useRef, useState, useEffect } from 'react';

interface Props {
  src: string;
  title?: string;
  price?: string;
  originalPrice?: string;
  badge?: string;
  badgeColor?: string;
  description?: string;
  initialX?: number;
  initialY?: number;
  colSpan?: number;
  onPositionChange?: (x: number, y: number) => void;
}

export const OfferImageCropper = ({
  src, title, price, originalPrice, badge, badgeColor = 'saffron', description,
  initialX = 50, initialY = 50, colSpan = 1, onPositionChange
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

  const imgStyle = { objectPosition: `${pos.x}% ${pos.y}%` };

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

      {/* Large Card Preview */}
      {colSpan === 2 && (
        <div>
          <p className="text-[10px] text-brand-text-dim uppercase tracking-widest mb-1.5 font-bold">Large Card Preview</p>
          <div
            onMouseDown={startDrag}
            className="relative h-[360px] w-full overflow-hidden rounded-xl border-2 border-saffron/40 hover:border-saffron/70 cursor-grab active:cursor-grabbing select-none transition-colors mb-4"
          >
            <img
              src={src}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none grayscale"
              style={imgStyle}
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />
            <div className="absolute bottom-8 left-8 pointer-events-none">
              {badge && (
                <span className={`px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase mr-1 ${
                  badgeColor === 'crimson' 
                    ? 'bg-red-600 text-white' 
                    : badgeColor === 'transparent' 
                      ? 'bg-transparent text-[#ebb046] border border-[#ebb046]' 
                      : 'bg-[#ebb046] text-black'
                }`}>
                  {badge}
                </span>
              )}
              <h3 className="font-serif text-white text-3xl leading-tight mt-3">{title || 'Offer Title'}</h3>
              <p className="text-white/60 text-sm mt-2 line-clamp-1 max-w-md">{description || 'Offer description...'}</p>
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-[#ebb046] text-2xl font-bold">{price || '$0.00'}</span>
                <span className="text-white/30 text-base line-through">{originalPrice || '$0.00'}</span>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-black/40 text-white/60 text-[11px] px-3 py-1 rounded-full backdrop-blur-sm opacity-60">drag to reposition</div>
            </div>
          </div>
        </div>
      )}

      {/* Small Card Preview */}
      {colSpan !== 2 && (
        <div>
          <p className="text-[10px] text-brand-text-dim uppercase tracking-widest mb-1.5 font-bold">Small Card Preview</p>
          <div
            onMouseDown={startDrag}
            className="relative h-[180px] w-full overflow-hidden rounded-xl border-2 border-saffron/40 hover:border-saffron/70 cursor-grab active:cursor-grabbing select-none transition-colors flex"
            style={{ background: '#141414' }}
          >
            {/* Content side */}
            <div className="flex-1 p-6 pr-4 flex flex-col justify-center relative z-10 pointer-events-none">
              {badge && (
                <span className={`text-[10px] font-bold tracking-widest uppercase mb-2 ${
                  badgeColor === 'crimson' 
                    ? 'text-red-500' 
                    : badgeColor === 'transparent' 
                      ? 'text-white/60 border border-white/20 px-2 py-0.5 rounded w-max' 
                      : 'text-[#ebb046]'
                }`}>
                  {badge}
                </span>
              )}
              <h3 className="font-serif text-white text-xl leading-tight mb-2">{title || 'Offer Title'}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-[#ebb046] text-lg font-bold">{price || '$0.00'}</span>
                <span className="text-white/30 text-sm line-through">{originalPrice || '$0.00'}</span>
              </div>
            </div>
            {/* Image side */}
            <div className="w-[45%] shrink-0 relative h-full">
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#141414] to-transparent z-10" />
              <img
                src={src}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-cover grayscale pointer-events-none"
                style={imgStyle}
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
