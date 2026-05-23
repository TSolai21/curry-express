"use client";
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export const About = () => {
  return (
    <section id="about" className="py-[120px] bg-surface relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-saffron rounded-full flex flex-col items-center justify-center leading-none shadow-[0_8px_32px_rgba(244,160,21,0.5)] z-20">
                <span className="font-display text-[2rem] font-black text-black">10</span>
                <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-black/60">Years</span>
              </div>
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-brand-border z-10">
                <img src="https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=800&q=85" alt="Chef cooking" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
              </div>
              <div className="absolute -bottom-5 -right-5 w-[150px] aspect-square rounded-xl overflow-hidden border-[3px] border-surface shadow-[0_12px_40px_rgba(0,0,0,0.5)] z-20">
                <img src="https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=400&q=85" alt="Spices" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="section-label mb-4">Our Story</motion.div>
            <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="section-title mb-6">Where Two <em>Culinary Worlds</em> Meet</motion.h2>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-[15px] text-brand-text-dim leading-[1.75] mb-4.5">
              Curry Express was born from a simple belief: <em className="text-saffron not-italic font-medium">great food shouldn't be complicated.</em> We bring together the soulful depth of Indian spice traditions and the bold precision of Chinese culinary craft — under one roof, in every box.
            </motion.p>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-[15px] text-brand-text-dim leading-[1.75] mb-4.5">
              Every recipe is inspired by the streets of Mumbai and woks of Chengdu, refined for the American palate without losing a drop of authenticity. We source <em className="text-saffron not-italic font-medium">premium spices</em>, use <em className="text-saffron not-italic font-medium">fresh ingredients daily</em>, and pour heart into every plate.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="p-4.5 bg-surface-2 rounded-xl border border-brand-border transition-colors hover:border-saffron">
                <div className="text-[26px] mb-2">🌿</div>
                <div className="font-display text-base font-bold text-cream mb-1">Fresh Daily</div>
                <div className="text-xs text-brand-text-dim">Ingredients prepped every morning. No shortcuts.</div>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="p-4.5 bg-surface-2 rounded-xl border border-brand-border transition-colors hover:border-saffron">
                <div className="text-[26px] mb-2">🌶</div>
                <div className="font-display text-base font-bold text-cream mb-1">Authentic Spices</div>
                <div className="text-xs text-brand-text-dim">Sourced directly from South Asia.</div>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="p-4.5 bg-surface-2 rounded-xl border border-brand-border transition-colors hover:border-saffron">
                <div className="text-[26px] mb-2">🍳</div>
                <div className="font-display text-base font-bold text-cream mb-1">Expert Chefs</div>
                <div className="text-xs text-brand-text-dim">Culinary artisans with 15+ years of mastery.</div>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="p-4.5 bg-surface-2 rounded-xl border border-brand-border transition-colors hover:border-saffron">
                <div className="text-[26px] mb-2">⚡</div>
                <div className="font-display text-base font-bold text-cream mb-1">Fast & Premium</div>
                <div className="text-xs text-brand-text-dim">Fast-casual speed, fine dining flavors.</div>
              </motion.div>
            </div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <Button variant="ghost" href="#menu">Explore Our Menu →</Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
