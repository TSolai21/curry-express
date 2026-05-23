"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Select, { StylesConfig } from 'react-select';
import { Button } from '@/components/ui/Button';
import { fullMenuData, categories, categoryLabels } from './MenuData';

const customSelectStyles: StylesConfig<any, false> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#161614', // surface
    borderColor: state.isFocused ? '#f4a015' : 'rgba(244,160,21,0.15)', // border
    borderRadius: '9999px',
    padding: '6px 16px',
    minHeight: '56px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#f4a015'
    },
    cursor: 'pointer'
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#161614', // surface
    border: '1px solid rgba(244,160,21,0.15)', // border
    borderRadius: '24px',
    overflow: 'hidden',
    zIndex: 50,
    marginTop: '8px'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? '#f4a015' // saffron
      : state.isFocused 
        ? 'rgba(244,160,21,0.1)' 
        : 'transparent',
    color: state.isSelected ? '#000' : '#f5edd6', // cream
    cursor: 'pointer',
    padding: '12px 24px',
    fontSize: '16px',
    '&:active': {
      backgroundColor: '#f4a015',
      color: '#000'
    }
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#f5edd6', // cream
    fontSize: '16px'
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#a09880', // text-dim
    fontSize: '16px'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? '#f4a015' : '#a09880',
    padding: '8px',
    '&:hover': {
      color: '#f4a015'
    }
  })
};

const categoryOptions = categories.map(cat => ({ value: cat.id, label: cat.label }));

export const FullMenu = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
    bestseller: { label: '🔥 Bestseller', classes: 'bg-saffron text-black' },
    chef: { label: '👨‍🍳 Chef Special', classes: 'bg-gold text-black' },
    new: { label: '✨ New', classes: 'bg-white/15 text-white border border-white/20' }
  };

  return (
    <>
      <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-md py-4 border-b border-brand-border">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
            <div className="w-full md:w-[400px] lg:w-[500px] relative">
              <input 
                type="text" 
                placeholder="Search menu..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface border border-brand-border rounded-full py-4 px-8 text-base text-cream placeholder-brand-text-dim focus:outline-none focus:border-saffron transition-colors shadow-lg"
              />
            </div>
            <div className="w-full md:w-[280px]">
              <Select 
                options={categoryOptions}
                value={categoryOptions.find((o: any) => o.value === activeTab)}
                onChange={(option: any) => {
                  setActiveTab(option.value);
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                styles={customSelectStyles}
                isSearchable={false}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="py-[60px] pb-[100px] bg-black min-h-screen">
        <div className="max-w-[1280px] mx-auto px-6">
          
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
                  <div className="text-center mb-12">
                    <div className="section-label justify-center mb-4">{categoryLabels[catKey]}</div>
                    <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold text-cream leading-[1.1]">{categoryLabels[catKey]}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {items.map((item: any, i: number) => (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                        key={item.name} 
                        className="bg-surface rounded-xl overflow-hidden border border-white/5 transition-all duration-400 flex flex-col group hover:border-brand-border hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(244,160,21,0.06)]"
                      >
                        <div className="relative h-[240px] overflow-hidden bg-surface-2">
                          <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/65" />
                          <div className="absolute top-3.5 left-3.5 flex gap-1.5 flex-wrap">
                            {item.tags?.map((tag: string) => {
                              const conf = tagConfig[tag];
                              if(!conf) return null;
                              return (
                                <span key={tag} className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.08em] uppercase ${conf.classes}`}>
                                  {conf.label}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <h3 className="font-display text-[1.3rem] font-bold text-cream mb-1">{item.name}</h3>
                          <div className="flex items-center gap-1 mb-2.5">
                            <span className="text-saffron text-[13px] leading-none">★</span>
                            <span className="text-cream text-[12px] font-bold leading-none mt-0.5">4.9</span>
                            <span className="text-brand-text-dim text-[11px] leading-none mt-0.5">(120+)</span>
                          </div>
                          <p className="text-[13px] text-brand-text-dim leading-[1.6] mb-4 flex-1">{item.desc}</p>
                          <div className="flex items-center justify-between gap-3 pt-4 border-t border-brand-border mb-4">
                            <div>
                              <div className="font-display text-[1.5rem] font-bold text-saffron">{item.price}</div>
                            </div>
                          </div>
                          <Button href="https://www.doordash.com" className="w-full justify-center !text-xs !py-3">Order Now</Button>
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
              <strong className="text-saffron font-semibold">Customization:</strong> Request adjustments to ingredients or portion sizes on DoorDash or call (408) 555-1234.
            </p>
          </div>

        </div>
      </section>
    </>
  );
};
