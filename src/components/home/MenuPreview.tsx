"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { fullMenuData } from '@/components/menu/MenuData';

type MenuItem = { name: string; img: string; desc: string; price: string; spice?: number; tags?: string[]; category: string; id: string; };

const getPreviewItems = () => {
  const items: MenuItem[] = [];
  
  const addItem = (category: string, nameSearch: string) => {
    const item = fullMenuData[category]?.find(i => i.name.toLowerCase().includes(nameSearch.toLowerCase()));
    if (item) {
      items.push({ ...item, category, id: item.name });
    }
  };

  addItem('nonVegEntree', 'Butter Chicken');
  addItem('dumBiryani', 'Chicken Biryani');
  addItem('indoChinese', 'Hakka Noodles');
  addItem('vegEntree', 'Dhal Makhani');
  addItem('goatCurry', 'Goat Curry');
  addItem('breads', 'Garlic Naan');

  return items;
};

const menuItems = getPreviewItems();

const categories = [
  { id: 'all', label: 'All' },
  { id: 'nonVegEntree', label: 'Curries' },
  { id: 'dumBiryani', label: 'Biryani' },
  { id: 'indoChinese', label: 'Indo-Chinese' },
  { id: 'vegEntree', label: 'Vegetarian' },
];

const tagConfig: Record<string, { label: string, classes: string }> = {
  bestseller: { label: 'BESTSELLER', classes: 'bg-[#ebb046] text-black' },
  chef: { label: 'CHEF SPECIAL', classes: 'bg-[#ebb046] text-black' },
  new: { label: 'NEW', classes: 'bg-[#222] text-white border border-white/10' },
  vegan: { label: 'VEGAN', classes: 'bg-green-700 text-white' },
  spicy: { label: 'SPICY', classes: 'bg-red-700 text-white' }
};

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
                className="bg-[#141414] rounded-[1.25rem] overflow-hidden border border-[#222] flex flex-col group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#ebb046]/30"
              >
                {/* Image Container */}
                <div className="relative h-[240px] overflow-hidden">
                  <Image 
                    src={item.img} 
                    alt={item.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  
                  {/* Tags */}
                  <div className="absolute top-0 left-0 flex z-10 overflow-hidden rounded-br-[1rem]">
                    {item.tags?.map((tag: string) => {
                      const conf = tagConfig[tag];
                      if(!conf) return null;
                      return (
                        <span key={tag} className={`px-3 py-1.5 text-[9px] font-bold tracking-[0.1em] uppercase ${conf.classes}`}>
                          {conf.label}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-serif text-[1.4rem] text-white leading-tight">{item.name}</h3>
                    <span className="font-sans text-[1.1rem] font-bold text-[#ebb046] shrink-0">{item.price}</span>
                  </div>
                  

                  
                  <p className="text-[13px] text-[#888] leading-[1.6] mb-6 line-clamp-2 flex-1">{item.desc}</p>
                  
                  <a 
                    href="https://www.doordash.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center text-[11px] py-3.5 bg-[#222] group-hover:bg-[#ebb046] text-[#ebb046] group-hover:text-black transition-colors duration-300 uppercase tracking-[0.15em] font-bold rounded-[0.5rem]"
                  >
                    ORDER NOW
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="text-center mt-12 flex flex-wrap justify-center gap-4">
          <Button variant="ghost" href="/menu">View Full Menu →</Button>
        </div>
      </div>
    </section>
  );
};
