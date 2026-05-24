"use client";
import { motion } from 'framer-motion';

export const About = () => {
  return (
    <section id="about" className="py-[120px] bg-black relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Image / Illustration Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Top Left Golden Ring */}
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full border-[12px] border-saffron/10 z-0" />
            
            {/* Bottom Right Golden Pill */}
            <div className="absolute -bottom-10 right-0 lg:-right-8 w-40 h-32 bg-[#ebb046] rounded-3xl z-0 flex items-end justify-center pb-5 pl-2 shadow-lg">
               <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-black">10 Years Of Heritage</span>
            </div>

            {/* Main Dark Container */}
            <div className="relative w-full aspect-[4/3.5] rounded-[2rem] overflow-hidden z-10 flex items-end justify-center shadow-2xl group cursor-pointer border border-white/5">
              <img 
                src="/chef_illustration_colored.png" 
                alt="Master Chef Illustration" 
                className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" 
              />
            </div>
          </motion.div>

          {/* Right: Text Side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="lg:pl-8"
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-[#ebb046] text-[11px] font-bold tracking-[0.25em] uppercase mb-6">
              Our Story
            </motion.div>
            
            <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="font-display text-[clamp(2.5rem,4vw,3.5rem)] text-white leading-[1.15] mb-8">
              A Culinary<br/>
              <em className="text-[#ebb046] italic font-serif">Odyssey</em>
            </motion.h2>
            
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-[16px] text-white/70 leading-[1.8] mb-6">
              Curry Express was born from a simple belief: <strong className="text-white font-semibold">great food shouldn't be complicated.</strong>
            </motion.p>
            
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-[16px] text-white/70 leading-[1.8] mb-12">
              We bring together the soulful depth of Indian spice traditions and the bold precision of Chinese culinary craft — under one roof, in every box.
            </motion.p>
            
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex items-center gap-4">
              <div className="w-16 h-px bg-[#ebb046]/40"></div>
              <div className="font-serif italic text-white/90 text-[14px]">
                Master Chefs from Mumbai & Beijing
              </div>
            </motion.div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
};
