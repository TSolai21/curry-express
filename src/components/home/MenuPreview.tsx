"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

const menuItems = [
  { id: 1, name: 'Butter Chicken', category: 'nonVegEntree', price: '$14.99', desc: 'Juicy chicken simmered in a creamy tomato-based gravy enriched with butter and mild spices.', img: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=600&q=85', tags: ['Bestseller'] },
  { id: 2, name: 'Chicken Biryani', category: 'dumBiryani', price: '$14.99', desc: 'Marinated chicken, fragrant basmati rice, and a blend of spices — slow-cooked to perfection.', img: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600&q=85', tags: ["Chef's Pick"] },
  { id: 3, name: 'Hakka Noodles', category: 'indoChinese', price: '$12.99', desc: 'Stir-fried noodles tossed with fresh vegetables, sauces, and your choice of protein in classic Indo-Chinese style.', img: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=600&q=85', tags: ['Bestseller'] },
  { id: 4, name: 'Dhal Makhani', category: 'vegEntree', price: '$12.99', desc: 'A rich and creamy lentil dish made with black lentils, butter, and cream, slow-cooked with spices.', img: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600&q=85', tags: ['Vegan'] },
  { id: 5, name: 'Goat Curry', category: 'goatCurry', price: '$16.99', desc: 'Tender goat meat blended with coastal spices, curry leaves, and aromatic herbs.', img: 'https://images.pexels.com/photos/10580198/pexels-photo-10580198.jpeg?auto=compress&cs=tinysrgb&w=600&q=85', tags: ['Spicy'] },
  { id: 6, name: 'Garlic Naan', category: 'breads', price: '$3.00', desc: 'Tandoor-baked naan topped with fresh garlic and butter for a flavorful twist.', img: 'https://images.pexels.com/photos/10106456/pexels-photo-10106456.jpeg?auto=compress&cs=tinysrgb&w=600&q=85', tags: [] },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'nonVegEntree', label: 'Curries' },
  { id: 'dumBiryani', label: 'Biryani' },
  { id: 'indoChinese', label: 'Indo-Chinese' },
  { id: 'vegEntree', label: 'Vegetarian' },
];

export const MenuPreview = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredItems = activeTab === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeTab);

  return (
    <section id="menu" className="py-[100px] bg-charcoal relative overflow-hidden before:content-[''] before:absolute before:top-0 before:inset-x-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-saffron before:to-transparent">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14">
          <div className="section-label justify-center mb-4">Our Menu</div>
          <h2 className="section-title mb-3.5">Crafted to <em>Crave</em></h2>
          <p className="font-serif text-[1.15rem] italic text-cream/90">Each dish is a chapter — rooted in tradition, finished with fire.</p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 mb-12 scrollbar-none justify-start md:justify-center flex-nowrap md:flex-wrap">
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`shrink-0 px-5 py-2.5 rounded-full text-xs font-semibold tracking-[0.06em] uppercase cursor-pointer border transition-all duration-300 ${
                activeTab === cat.id 
                  ? 'bg-saffron text-black border-saffron' 
                  : 'bg-transparent text-brand-text-dim border-brand-border hover:border-saffron hover:text-saffron'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id} 
                className="bg-surface rounded-xl overflow-hidden border border-white/5 transition-all duration-400 cursor-pointer hover:border-brand-border hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(244,160,21,0.06)] group"
              >
                <div className="relative h-[210px] overflow-hidden bg-surface-2">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/65" />
                  <div className="absolute top-3.5 left-3.5 flex gap-1.5 flex-wrap">
                    {item.tags.map(tag => (
                      <span key={tag} className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-[0.08em] uppercase ${
                        tag === 'Bestseller' ? 'bg-saffron text-black' :
                        tag === 'Spicy' ? 'bg-crimson text-white' :
                        tag === 'Vegan' ? 'bg-green-600 text-white' :
                        'bg-gold text-black'
                      }`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-[1.2rem] font-bold text-cream mb-1">{item.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-saffron text-[13px] leading-none">★</span>
                    <span className="text-cream text-[12px] font-bold leading-none mt-0.5">4.9</span>
                    <span className="text-brand-text-dim text-[11px] leading-none mt-0.5">(120+)</span>
                  </div>
                  <p className="text-[13px] text-brand-text-dim leading-[1.55] mb-4">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[1.4rem] font-bold text-saffron">{item.price}</span>
                    <a href="https://www.doordash.com" target="_blank" rel="noopener" className="px-4 py-2 rounded-full bg-saffron/10 border border-solid border-saffron/25 flex items-center justify-center text-[11px] font-bold tracking-[0.1em] uppercase cursor-pointer transition-all duration-300 hover:bg-saffron hover:border-saffron hover:text-black text-saffron no-underline">
                      Order Now
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="text-center mt-12 flex flex-wrap justify-center gap-4">
          <Button variant="ghost" href="/menu">View Full Menu →</Button>
          <Button variant="outline" href="https://www.doordash.com">Order on DoorDash →</Button>
        </div>
      </div>
    </section>
  );
};
