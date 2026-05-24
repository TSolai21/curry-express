"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';



export const Reviews = ({ reviews = [] }: { reviews?: any[] }) => {
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
            <div key={i} className="shrink-0 w-[340px] bg-surface rounded-xl overflow-hidden border border-white/5 transition-colors hover:border-brand-border flex flex-col">
              {/* Top image banner */}
              {review.image ? (
                <div className="relative h-[160px] w-full overflow-hidden">
                  <Image src={review.image} alt={review.author} fill sizes="340px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/70" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <div className="text-sm font-bold text-white">{review.author}</div>
                    <div className="text-[10px] text-white/70">via {review.source}</div>
                  </div>
                </div>
              ) : (
                <div className="h-[60px] w-full bg-gradient-to-r from-surface-2 to-surface flex items-center px-5 gap-3 border-b border-brand-border">
                  <div className="w-9 h-9 rounded-full bg-saffron/20 border border-saffron/30 flex items-center justify-center font-bold text-saffron text-sm shrink-0">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-cream leading-none">{review.author}</div>
                    <div className="text-[10px] text-muted mt-0.5">via {review.source}</div>
                  </div>
                </div>
              )}
              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">

                <p className="font-serif text-[1.02rem] italic text-cream/90 leading-[1.65]">
                  <span className="text-saffron text-[2.2rem] leading-none align-[-0.5em] mr-1">"</span>
                  {review.text}
                </p>
                {/* Show author footer only when image is present (already shown above) */}
                {!review.image && (
                  <div className="mt-4 text-xs text-muted">⭐ Verified customer</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
