"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

const images = [
  { src: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=600&q=80', title: 'Tandoori Chicken' },
  { src: 'https://images.pexels.com/photos/10580198/pexels-photo-10580198.jpeg?auto=compress&cs=tinysrgb&w=600&q=80', title: 'Chilli Chicken' },
  { src: 'https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg?auto=compress&cs=tinysrgb&w=600&q=80', title: 'Spices' },
  { src: 'https://images.pexels.com/photos/2089712/pexels-photo-2089712.jpeg?auto=compress&cs=tinysrgb&w=600&q=80', title: 'Samosas' },
  { src: 'https://images.pexels.com/photos/941865/pexels-photo-941865.jpeg?auto=compress&cs=tinysrgb&w=600&q=80', title: 'Curry' },
  { src: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=600&q=80', title: 'Chicken Biryani' },
  { src: 'https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=600&q=80', title: 'Hakka Noodles' },
  { src: 'https://images.pexels.com/photos/764925/pexels-photo-764925.jpeg?auto=compress&cs=tinysrgb&w=600&q=80', title: 'Dim Sum' },
  { src: 'https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=600&q=80', title: 'Fried Rice' },
  { src: 'https://images.pexels.com/photos/3926123/pexels-photo-3926123.jpeg?auto=compress&cs=tinysrgb&w=600&q=80', title: 'Paneer Tikka' },
  { src: 'https://images.pexels.com/photos/3758133/pexels-photo-3758133.jpeg?auto=compress&cs=tinysrgb&w=600&q=80', title: 'Spring Rolls' },
  { src: 'https://images.pexels.com/photos/941865/pexels-photo-941865.jpeg?auto=compress&cs=tinysrgb&w=600&q=80', title: 'Curry' },
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
                <Image 
                  src={img.src} 
                  alt={img.title} 
                  width={600} 
                  height={400}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="w-full h-auto block object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/85 opacity-0 transition-opacity duration-400 flex items-end p-4.5 group-hover:opacity-100">
                  <div className="font-serif text-[1.4rem] font-bold text-cream">{img.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
