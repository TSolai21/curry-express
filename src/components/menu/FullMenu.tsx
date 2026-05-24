"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { fullMenuData, categories, categoryLabels } from './MenuData';

export const FullMenu = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const getFilteredData = () => {
    let dataToFilter = fullMenuData;
    if (activeTab !== 'all') {
      dataToFilter = { [activeTab]: fullMenuData[activeTab] };
    }

    const result: Record<string, any[]> = {};
    const query = searchQuery.toLowerCase();

    for (const [cat, items] of Object.entries(dataToFilter)) {
      const filteredItems = items.filter((item: any) => {
        return item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query);
      });

      if (filteredItems.length > 0) {
        result[cat] = filteredItems;
      }
    }
    return result;
  };

  const filteredData = getFilteredData();

  const tagConfig: Record<string, { label: string, classes: string }> = {
    bestseller: { label: 'BESTSELLER', classes: 'bg-[#ebb046] text-black' },
    chef: { label: 'CHEF SPECIAL', classes: 'bg-[#ebb046] text-black' },
    new: { label: 'NEW', classes: 'bg-[#222] text-white border border-white/10' },
    vegan: { label: 'VEGAN', classes: 'bg-green-700 text-white' },
    spicy: { label: 'SPICY', classes: 'bg-red-700 text-white' }
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <>
      <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-md py-4 border-b border-brand-border">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center justify-between w-full">
            <div className="w-full max-w-[500px] relative">
              <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search menu..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface border border-brand-border rounded-full py-4 pl-14 pr-8 text-base text-cream placeholder-brand-text-dim focus:outline-none focus:border-saffron transition-colors shadow-lg"
              />
            </div>
            
            <button 
              onClick={() => setIsFilterOpen(true)}
              className={`w-12 h-12 flex items-center justify-center transition-colors rounded-full border shadow-lg ml-4 shrink-0 ${activeTab !== 'all' ? 'bg-[#ebb046] border-[#ebb046] text-black' : 'bg-surface border-brand-border text-brand-text-dim hover:text-saffron hover:border-saffron'}`}
              aria-label="Open Filter"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>

          <AnimatePresence>
            {activeTab !== 'all' && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#ebb046]/10 border border-[#ebb046]/30 text-[#ebb046] rounded-full text-[12px] font-bold tracking-[0.1em] uppercase shadow-sm">
                  <span>{categoryLabels[activeTab]}</span>
                  <button 
                    onClick={() => handleTabClick('all')} 
                    className="hover:text-white transition-colors rounded-full p-0.5 hover:bg-[#ebb046]/20"
                    aria-label="Clear category"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[2000]"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[320px] max-w-full bg-[#161614] border-l border-brand-border z-[2010] p-6 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-border mt-2">
                <h3 className="font-display text-2xl text-cream font-bold">Categories</h3>
                <button onClick={() => setIsFilterOpen(false)} className="text-brand-text-dim hover:text-saffron">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col gap-2 overflow-y-auto scrollbar-hide pb-10">
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => { handleTabClick(cat.id); setIsFilterOpen(false); }}
                    className={`px-5 py-3.5 rounded-xl text-[13px] uppercase font-bold tracking-wider transition-all text-left ${activeTab === cat.id ? 'bg-saffron text-black' : 'bg-[#222] border border-white/5 text-brand-text hover:bg-white/10 hover:text-white'}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <section className="py-[60px] pb-[100px] bg-black min-h-screen">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {Object.keys(filteredData).length === 0 && (
                  <div className="text-center py-20">
                    <p className="text-brand-text-dim text-[1.1rem]">No dishes found matching your filters.</p>
                    <button 
                      onClick={() => { setSearchQuery(''); setActiveTab('all'); }} 
                      className="mt-4 text-saffron underline text-sm font-semibold tracking-wider hover:text-white transition-colors"
                    >
                      CLEAR FILTERS
                    </button>
                  </div>
                )}
                
                {Object.entries(filteredData).map(([catKey, items]) => (
                  <div key={catKey} className="mb-20 last:mb-0">
                    <div className="mb-8">
                      <h2 className="font-display text-[2.5rem] font-bold text-cream leading-[1.1] border-b border-white/10 pb-4">{categoryLabels[catKey]}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                      {items.map((item: any, i: number) => (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                          key={item.name} 
                          className="bg-[#141414] rounded-[1.25rem] overflow-hidden border border-[#222] flex flex-col group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#ebb046]/30"
                        >
                          {/* Image Container */}
                          <div className="relative h-[220px] overflow-hidden">
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
                          <div className="p-5 flex flex-col flex-1">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <h3 className="font-serif text-[1.3rem] text-white leading-tight">{item.name}</h3>
                              <span className="font-sans text-[1.1rem] font-bold text-[#ebb046] shrink-0">{item.price}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex gap-0.5 text-[#ebb046] text-[11px]">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                              </div>
                              <span className="text-[#888] text-[11px] font-medium mt-0.5">4.9 (120+)</span>
                            </div>
                            
                            <p className="text-[13px] text-[#888] leading-[1.6] mb-5 line-clamp-2 flex-1">{item.desc}</p>
                            
                            <a 
                              href="https://www.doordash.com" 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full flex items-center justify-center text-[11px] py-3 bg-[#222] group-hover:bg-[#ebb046] text-[#ebb046] group-hover:text-black transition-colors duration-300 uppercase tracking-[0.15em] font-bold rounded-[0.5rem]"
                            >
                              ORDER NOW
                            </a>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            <div className="mt-16 bg-surface border border-brand-border rounded-xl p-6 lg:p-8">
              <h3 className="font-display text-[1.1rem] font-bold text-cream mb-3">Important Information</h3>
              <p className="text-[13px] text-brand-text-dim leading-[1.7]">
                <strong className="text-saffron font-semibold">Allergens:</strong> All dishes contain traces of nuts, sesame, and soy. Please inform us of allergies when ordering.<br/>
                <strong className="text-saffron font-semibold">Customization:</strong> Request adjustments to ingredients or portion sizes on DoorDash or call (346) 863-1124.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};
