"use client";
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

export const Hero = () => {
  const sliderContent = (
    <Swiper
      effect={'cards'}
      grabCursor={true}
      modules={[EffectCards, Autoplay]}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      loop={true}
      className="w-[280px] h-[380px] sm:w-[340px] sm:h-[460px]"
    >
      <SwiperSlide>
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <img src="https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=600&q=85" alt="Butter Chicken" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/90 to-transparent font-display text-lg font-bold text-cream">Butter Chicken</div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600&q=85" alt="Biryani Royale" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/90 to-transparent font-display text-lg font-bold text-cream">Biryani Royale</div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <img src="https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=600&q=85" alt="Hakka Noodles" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/90 to-transparent font-display text-lg font-bold text-cream">Hakka Noodles</div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <img src="https://images.pexels.com/photos/2089712/pexels-photo-2089712.jpeg?auto=compress&cs=tinysrgb&w=600&q=85" alt="Paneer Tikka" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/90 to-transparent font-display text-lg font-bold text-cream">Paneer Tikka</div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <img src="https://images.pexels.com/photos/10580198/pexels-photo-10580198.jpeg?auto=compress&cs=tinysrgb&w=600&q=85" alt="Chilli Chicken" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/90 to-transparent font-display text-lg font-bold text-cream">Chilli Chicken</div>
        </div>
      </SwiperSlide>
      {/* Duplicated slides to satisfy Swiper's loop requirement for cards effect */}
      <SwiperSlide>
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <img src="https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=600&q=85" alt="Butter Chicken" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/90 to-transparent font-display text-lg font-bold text-cream">Butter Chicken</div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600&q=85" alt="Biryani Royale" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/90 to-transparent font-display text-lg font-bold text-cream">Biryani Royale</div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <img src="https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=600&q=85" alt="Hakka Noodles" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/90 to-transparent font-display text-lg font-bold text-cream">Hakka Noodles</div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <img src="https://images.pexels.com/photos/2089712/pexels-photo-2089712.jpeg?auto=compress&cs=tinysrgb&w=600&q=85" alt="Paneer Tikka" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/90 to-transparent font-display text-lg font-bold text-cream">Paneer Tikka</div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <img src="https://images.pexels.com/photos/10580198/pexels-photo-10580198.jpeg?auto=compress&cs=tinysrgb&w=600&q=85" alt="Chilli Chicken" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/90 to-transparent font-display text-lg font-bold text-cream">Chilli Chicken</div>
        </div>
      </SwiperSlide>
    </Swiper>
  );

  return (
    <section id="hero" className="min-h-screen relative flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80')] bg-cover bg-center animate-ken-burns" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/35" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 pt-[80px] pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
        >


          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-[clamp(2.8rem,5.5vw,5rem)] font-black leading-[1.05] text-cream mb-5 lg:mb-10"
          >
            Bold Indian Flavors.<br />
            <span className="block text-saffron italic">Express Chinese Cravings.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex lg:hidden relative items-center justify-center w-full mb-10"
          >
            {sliderContent}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-xl font-light text-cream/70 mb-10 italic"
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
            className="flex flex-wrap gap-8 mt-12 pt-10 border-t border-saffron/20 justify-center lg:justify-start"
          >
            <div><div className="font-display text-3xl font-bold text-cream leading-none">4.9<span className="text-saffron">★</span></div><div className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted mt-1">Rating</div></div>
            <div><div className="font-display text-3xl font-bold text-cream leading-none">2k<span className="text-saffron">+</span></div><div className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted mt-1">Reviews</div></div>
            <div><div className="font-display text-3xl font-bold text-cream leading-none">30<span className="text-saffron">+</span></div><div className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted mt-1">Dishes</div></div>
            <div><div className="font-display text-3xl font-bold text-cream leading-none">15<span className="text-saffron">min</span></div><div className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted mt-1">Avg. Delivery</div></div>
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
    </section>
  );
};
