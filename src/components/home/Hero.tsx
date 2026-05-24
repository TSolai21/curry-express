"use client";
import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { FaChevronDown } from 'react-icons/fa';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { fullMenuData } from '@/components/menu/MenuData';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

import { useRef } from 'react';
import { useInView } from 'framer-motion';

const Counter = ({ from, to, duration = 2, decimals = 0 }: { from: number, to: number, duration?: number, decimals?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => {
    if (decimals > 0) return latest.toFixed(decimals);
    return Math.round(latest).toString();
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, { duration, ease: "easeOut", delay: 0.1 });
      return controls.stop;
    }
  }, [count, to, duration, isInView]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

export const Hero = () => {
  const allItems = Object.values(fullMenuData).flat();

  const sliderContent = (
    <Swiper
      effect={'cards'}
      grabCursor={true}
      modules={[EffectCards, Autoplay]}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      loop={true}
      className="w-[280px] h-[380px] sm:w-[340px] sm:h-[460px]"
    >
      {allItems.map((item, idx) => (
        <SwiperSlide key={idx}>
          <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-surface">
            <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/95 via-black/80 to-transparent font-serif text-2xl font-bold text-cream leading-tight">
              {item.name.replace(/ \(.*\)/, '')}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return (
    <section id="hero" className="min-h-screen relative flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80')] bg-cover bg-center animate-ken-burns" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/35" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 pt-[100px] pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
        >


          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[1.05] text-cream mb-4 lg:mb-6"
          >
            Bold Indian Flavors.<br />
            <span className="block text-saffron italic">Express Chinese Cravings.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex lg:hidden relative items-center justify-center w-full mb-6"
          >
            {sliderContent}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-lg lg:text-xl font-light text-cream/70 mb-8 italic"
          >
            Where ancient spice routes meet the modern table — crafted for those who refuse to choose.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <Button href="https://www.doordash.com">Order on DoorDash</Button>
            <Button variant="ghost" href="#menu">Explore Menu</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-8 mt-8 pt-8 border-t border-saffron/20 justify-center lg:justify-start"
          >
            <div><div className="font-display text-3xl font-bold text-cream leading-none"><Counter from={0} to={4.9} decimals={1} duration={4} /><span className="text-saffron">★</span></div><div className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted mt-1">Rating</div></div>
            <div><div className="font-display text-3xl font-bold text-cream leading-none"><Counter from={0} to={2} duration={4.5} />k<span className="text-saffron">+</span></div><div className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted mt-1">Reviews</div></div>
            <div><div className="font-display text-3xl font-bold text-cream leading-none"><Counter from={0} to={allItems.length} duration={5} /><span className="text-saffron">+</span></div><div className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted mt-1">Dishes</div></div>
            <div><div className="font-display text-3xl font-bold text-cream leading-none"><Counter from={0} to={15} duration={4.5} /><span className="text-saffron">min</span></div><div className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted mt-1">Avg. Delivery</div></div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="hidden lg:flex relative items-center justify-center w-full lg:-translate-y-12"
        >
          {sliderContent}
        </motion.div>
      </div>

      <motion.a 
        href="#menu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ 
          opacity: { delay: 1.5, duration: 1 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
        className="absolute bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full border border-saffron/30 text-saffron hover:bg-saffron hover:text-black transition-all"
        aria-label="Scroll down to menu"
      >
        <FaChevronDown />
      </motion.a>
    </section>
  );
};
