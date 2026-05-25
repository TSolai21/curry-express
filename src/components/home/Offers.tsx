"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

export const Offers = ({ offers = [] }: { offers?: any[] }) => {
  return (
    <section id="offers" className="py-[100px] bg-black">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex justify-between items-end mb-12 flex-wrap gap-6">
          <div>
            <div className="text-[#ebb046] text-[11px] font-bold tracking-[0.25em] uppercase mb-4">Special Offers</div>
            <h2 className="font-display text-[clamp(2.5rem,4vw,3.5rem)] text-white leading-[1.15]">Feast <em>More</em>, Spend <em>Less</em></h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {offers.map((offer) => {
            const isLarge = offer.colSpan === 2;

            if (isLarge) {
              return (
                <motion.div 
                  key={offer.id}
                  whileHover={{ y: -4 }}
                  className="lg:col-span-2 lg:row-span-2 min-h-[480px] bg-[#141414] rounded-[1.5rem] overflow-hidden relative border border-white/5 flex flex-col justify-end p-10 group"
                >
                  <div className="absolute inset-0">
                    <Image src={offer.image} alt={offer.title} fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" style={{ objectPosition: `${offer.image_pos_x ?? 50}% ${offer.image_pos_y ?? 50}%` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                  </div>
                  
                  <div className="relative z-10 w-full lg:w-[85%]">
                    <div className="flex items-center gap-0 mb-5">
                      {offer.badge && (
                        <span className={`px-3.5 py-1.5 text-[9px] font-bold tracking-[0.15em] uppercase ${
                          offer.badgeColor === 'crimson' 
                            ? 'bg-red-600 text-white' 
                            : offer.badgeColor === 'transparent' 
                              ? 'bg-transparent text-[#ebb046] border border-[#ebb046]' 
                              : 'bg-[#ebb046] text-black'
                        }`}>
                          {offer.badge}
                        </span>
                      )}
                      {offer.subtitle && (
                        <span className="bg-white/10 backdrop-blur-md text-white/90 px-3.5 py-1.5 text-[9px] font-bold tracking-[0.15em] uppercase">
                          {offer.subtitle}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-serif text-white text-[3rem] leading-[1.1] mb-3">
                      {offer.title}
                    </h3>
                    
                    <p className="text-white/60 text-[15px] mb-8 font-sans">
                      {offer.description}
                    </p>
                    
                    <div className="flex items-center gap-6 mt-2 flex-wrap">
                      <div className="flex items-baseline gap-3">
                        <span className="text-[#ebb046] text-[2.2rem] font-sans font-bold">{offer.price}</span>
                        <span className="text-white/30 text-[1.2rem] line-through font-sans">{offer.originalPrice}</span>
                      </div>
                      
                      <a href="https://www.doordash.com" target="_blank" rel="noopener noreferrer" className="bg-[#ebb046] text-black px-8 py-3.5 rounded-[0.5rem] text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-white transition-colors shrink-0">
                        ORDER ON DOORDASH
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            }

            // Small Card Layout
            return (
              <motion.div 
                key={offer.id}
                whileHover={{ y: -4 }}
                className="lg:col-span-1 min-h-[230px] bg-[#141414] rounded-[1.5rem] overflow-hidden flex flex-row border border-[#222] relative group"
              >
                {/* Left Content Area */}
                <div className="flex-1 p-7 pr-2 flex flex-col justify-center relative z-10 w-[55%]">
                  {offer.badge && (
                    <span className={`text-[9px] font-bold tracking-[0.2em] uppercase mb-4 ${
                      offer.badgeColor === 'crimson' 
                        ? 'text-red-500' 
                        : offer.badgeColor === 'transparent' 
                          ? 'text-white/60 border border-white/20 px-2 py-0.5 rounded w-max' 
                          : 'text-[#ebb046]'
                    }`}>
                      {offer.badge.replace(/[^a-zA-Z\s]/g, '').trim()}
                    </span>
                  )}
                  
                  <h3 className="font-serif text-white text-[1.4rem] leading-[1.2] mb-2">
                    {offer.title}
                  </h3>
                  
                  <p className="text-white/50 text-[12px] italic mb-6 leading-relaxed line-clamp-2">
                    {offer.description}
                  </p>
                  
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="text-[#ebb046] text-[1.3rem] font-sans font-bold">{offer.price}</span>
                    <span className="text-white/30 text-[0.9rem] line-through font-sans">{offer.originalPrice}</span>
                  </div>
                  
                  <a href="https://www.doordash.com" target="_blank" rel="noopener noreferrer" className="text-white text-[10px] font-bold tracking-[0.15em] uppercase inline-flex items-center gap-1.5 group/link w-max">
                    <span className="border-b border-white/30 pb-0.5 group-hover/link:border-[#ebb046] group-hover/link:text-[#ebb046] transition-colors">ORDER NOW</span>
                    <span className="group-hover/link:text-[#ebb046] transition-colors">&rarr;</span>
                  </a>
                </div>
                
                {/* Right Image Area */}
                <div className="w-[45%] shrink-0 relative h-full">
                  <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#141414] to-transparent z-10" />
                  <Image src={offer.image} alt={offer.title} fill sizes="(max-width: 1024px) 45vw, 33vw" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" style={{ objectPosition: `${offer.image_pos_x ?? 50}% ${offer.image_pos_y ?? 50}%` }} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
