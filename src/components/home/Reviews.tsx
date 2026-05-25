"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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

const getRelativeTimeString = (dateString: string | null): string => {
  if (!dateString) return 'recently';
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
  if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
};

export const Reviews = ({ reviews = [] }: { reviews?: any[] }) => {
  const [selectedReview, setSelectedReview] = useState<any | null>(null);

  return (
    <section id="reviews" className="py-[100px] bg-charcoal relative overflow-hidden before:content-[''] before:absolute before:top-0 before:inset-x-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-saffron before:to-transparent">
      <div className="max-w-[1280px] mx-auto px-6 mb-14">
        <div className="text-center">
          <div className="section-label justify-center mb-4">Customer Love</div>
          <h2 className="section-title">What People Are <em>Saying</em></h2>
        </div>
      </div>

      <div 
        className="overflow-hidden hover:[&>div]:[animation-play-state:paused]"
        style={{ WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)', maskImage: 'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)' }}
      >
        <div className="flex gap-6 w-max animate-scroll-left-slow px-6">
          {[...reviews, ...reviews].map((review, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedReview(review)}
              className="shrink-0 w-[340px] bg-surface rounded-xl overflow-hidden border border-white/5 cursor-pointer flex flex-col group shadow-lg"
            >
              {/* Top image banner */}
              {review.image ? (
                <div className="relative h-[160px] w-full overflow-hidden">
                  <Image src={review.image} alt={review.author} fill sizes="340px" className="object-cover" style={{ objectPosition: `${review.image_pos_x ?? 50}% ${review.image_pos_y ?? 50}%` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2 flex-wrap">
                    <div className="text-sm font-bold text-white">{review.author}</div>
                    <span className="text-[9px] text-white/40">•</span>
                    <div className="text-[10px] text-white/70">via {review.source}</div>
                    <span className="text-[9px] text-white/40">•</span>
                    <div className="text-[10px] text-white/70">
                      {getRelativeTimeString(review.created_at)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[60px] w-full bg-gradient-to-r from-surface-2 to-surface flex items-center px-5 gap-3 border-b border-brand-border">
                  <div className="w-9 h-9 rounded-full bg-saffron/20 border border-saffron/30 flex items-center justify-center font-bold text-saffron text-sm shrink-0">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-cream leading-none">{review.author}</div>
                    <div className="flex items-center gap-1.5 mt-1 text-[10px] text-muted">
                      <span>via {review.source}</span>
                      <span>•</span>
                      <span>
                        {getRelativeTimeString(review.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} filled={star <= (review.rating || 5)} className="w-4.5 h-4.5" />
                    ))}
                  </div>
                  <div className="flex items-start gap-1">
                    <span className="text-saffron font-serif text-[4rem] leading-[0.8] select-none shrink-0 mt-0.5">“</span>
                    <p className="font-serif text-[1.02rem] italic text-cream/90 leading-[1.65] flex-1">
                      {review.text}
                    </p>
                  </div>
                </div>
                {/* Show author footer only when image is present (already shown above) */}
                {!review.image && (
                  <div className="mt-4 text-xs text-muted">⭐ Verified customer</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Detail Modal - Google Review Design */}
      {selectedReview && (
        <div 
          className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setSelectedReview(null)}
        >
          <div 
            className="bg-surface w-full max-w-xl rounded-2xl border border-brand-border/50 p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              type="button" 
              onClick={() => setSelectedReview(null)} 
              className="absolute top-4 right-4 text-brand-text-dim hover:text-white text-xl leading-none transition-colors cursor-pointer"
            >
              ✕
            </button>

            {/* Google Review Header */}
            <div className="flex flex-col gap-1.5">
              {/* Author & Source Details */}
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-cream text-base leading-tight truncate">{selectedReview.author}</h3>
                  <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded shrink-0 flex items-center gap-0.5">
                    ✓ Verified
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <div className="flex gap-0.5 shrink-0">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} filled={star <= (selectedReview.rating || 5)} className="w-3.5 h-3.5" />
                    ))}
                  </div>
                  <span className="text-[10px] text-brand-text-dim">•</span>
                  <span className="text-xs text-saffron shrink-0">via {selectedReview.source}</span>
                  <span className="text-[10px] text-brand-text-dim">•</span>
                  <span className="text-xs text-brand-text-dim shrink-0">
                    {getRelativeTimeString(selectedReview.created_at)}
                  </span>
                </div>
              </div>
            </div>

            {/* Review Body */}
            <div className="mt-5">
              <p className="text-sm text-cream/90 leading-relaxed font-sans whitespace-pre-wrap">
                {selectedReview.text}
              </p>
            </div>

            {/* Review Photo Attachment */}
            {selectedReview.image && (
              <div className="mt-5 rounded-xl overflow-hidden border border-brand-border/30 bg-black relative max-h-[360px] aspect-[4/3] flex items-center justify-center">
                <img 
                  src={selectedReview.image} 
                  alt="Customer Uploaded Photo" 
                  className="w-full h-full object-contain" 
                />
              </div>
            )}

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-brand-border/20 flex items-center justify-end text-[11px] text-brand-text-dim">
              <span className="text-saffron font-serif font-semibold italic">Curry Express</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
