"use client";
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export const Offers = ({ offers = [] }: { offers?: any[] }) => {
  return (
    <section id="offers" className="py-[100px] bg-black">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex justify-between items-end mb-12 flex-wrap gap-6">
          <div>
            <div className="section-label mb-4">Special Offers</div>
            <h2 className="section-title">Feast <em>More</em>, Spend <em>Less</em></h2>
          </div>
          <Button variant="outline" href="https://www.doordash.com">Claim on DoorDash</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {offers.map((offer) => {
            const isLarge = offer.colSpan === 2;
            const sizeClass = isLarge ? 'lg:col-span-2 lg:row-span-2 min-h-[480px]' : 'min-h-[220px]';
            const titleClass = isLarge ? 'text-[2.5rem]' : 'text-[1.8rem]';
            const priceClass = isLarge ? 'text-3xl md:text-5xl' : 'text-[1.8rem]';
            
            let badgeClass = 'bg-white/10 text-white border border-white/25';
            if (offer.badgeColor === 'saffron') badgeClass = 'bg-saffron text-black';
            if (offer.badgeColor === 'crimson') badgeClass = 'bg-crimson text-white';

            return (
              <motion.div 
                key={offer.id}
                whileHover={{ y: -4 }}
                className={`${sizeClass} rounded-xl overflow-hidden relative cursor-pointer border border-transparent hover:border-brand-border group`}
              >
                <div className="absolute inset-0">
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/55" />
                </div>
                <div className="relative z-10 p-9 h-full flex flex-col justify-end">
                  {offer.badge && (
                    <span className={`inline-block px-3.5 py-1.5 ${badgeClass} text-[11px] font-extrabold tracking-[0.15em] uppercase rounded-full mb-3.5 self-start`}>
                      {offer.badge}
                    </span>
                  )}
                  {offer.subtitle && (
                    <div className="flex items-center gap-2 text-xs text-saffron font-medium mb-3.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse-glow" /> {offer.subtitle}
                    </div>
                  )}
                  <h3 className={`font-display ${titleClass} font-bold text-cream leading-[1.2] mb-2.5`}>{offer.title}</h3>
                  <p className="text-[13px] text-cream/70 mb-5 leading-[1.6]">{offer.description}</p>
                  <div className="flex items-baseline gap-2.5 mb-6">
                    <span className={`font-display ${priceClass} font-bold text-saffron`}>{offer.price}</span>
                    <span className="text-base text-muted line-through">{offer.originalPrice}</span>
                  </div>
                  <Button href="https://www.doordash.com" className={isLarge ? "w-full justify-center" : "!text-[11px] !py-2.5 !px-5"}>
                    {isLarge ? 'Order on DoorDash' : 'Order Now →'}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
