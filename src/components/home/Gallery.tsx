"use client";
import { motion } from 'framer-motion';

const images = [
  { src: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=600&q=80', title: 'Tandoori Chicken' },
  { src: 'https://images.pexels.com/photos/10580198/pexels-photo-10580198.jpeg?auto=compress&cs=tinysrgb&w=600&q=80', title: 'Chilli Chicken' },
  { src: 'https://images.pexels.com/photos/10106456/pexels-photo-10106456.jpeg?auto=compress&cs=tinysrgb&w=600&q=80', title: 'Naan Bread' },
  { src: 'https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg?auto=compress&cs=tinysrgb&w=600&q=80', title: 'Spices' },
  { src: 'https://images.pexels.com/photos/2089712/pexels-photo-2089712.jpeg?auto=compress&cs=tinysrgb&w=600&q=80', title: 'Samosas' },
  { src: 'https://images.pexels.com/photos/941865/pexels-photo-941865.jpeg?auto=compress&cs=tinysrgb&w=600&q=80', title: 'Curry' }
];

export const Gallery = () => {
  return (
    <section id="gallery" className="py-[100px] bg-black">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12">
          <div className="section-label justify-center mb-4">Food Gallery</div>
          <h2 className="section-title">Feast Your <em>Eyes First</em></h2>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="columns-2 md:columns-3 lg:columns-4 gap-3.5 space-y-3.5"
        >
          {images.map((img, i) => (
            <motion.div 
              key={i}
              variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
              className="break-inside-avoid rounded-xl overflow-hidden relative cursor-pointer border border-white/5 group"
            >
              <div className="relative overflow-hidden">
                <img src={img.src} alt={img.title} className="w-full block object-cover transition-transform duration-600 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/85 opacity-0 transition-opacity duration-400 flex items-end p-4.5 group-hover:opacity-100">
                  <div className="font-display text-base font-bold text-cream">{img.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
