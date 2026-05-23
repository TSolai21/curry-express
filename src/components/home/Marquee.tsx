export const Marquee = () => {
  return (
    <div className="py-4 bg-saffron overflow-hidden">
      <div className="flex gap-16 w-max animate-scroll-left">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-16 items-center">
            <div className="flex items-center gap-4 font-sans text-xs font-bold tracking-[0.25em] uppercase text-black whitespace-nowrap"><span>Tandoori Specials</span><span className="w-1.5 h-1.5 rounded-full bg-black/30" /></div>
            <div className="flex items-center gap-4 font-sans text-xs font-bold tracking-[0.25em] uppercase text-black whitespace-nowrap"><span>Butter Chicken</span><span className="w-1.5 h-1.5 rounded-full bg-black/30" /></div>
            <div className="flex items-center gap-4 font-sans text-xs font-bold tracking-[0.25em] uppercase text-black whitespace-nowrap"><span>Hakka Noodles</span><span className="w-1.5 h-1.5 rounded-full bg-black/30" /></div>
            <div className="flex items-center gap-4 font-sans text-xs font-bold tracking-[0.25em] uppercase text-black whitespace-nowrap"><span>Biryani Royale</span><span className="w-1.5 h-1.5 rounded-full bg-black/30" /></div>
            <div className="flex items-center gap-4 font-sans text-xs font-bold tracking-[0.25em] uppercase text-black whitespace-nowrap"><span>Dal Makhani</span><span className="w-1.5 h-1.5 rounded-full bg-black/30" /></div>
            <div className="flex items-center gap-4 font-sans text-xs font-bold tracking-[0.25em] uppercase text-black whitespace-nowrap"><span>Manchurian Gravy</span><span className="w-1.5 h-1.5 rounded-full bg-black/30" /></div>
            <div className="flex items-center gap-4 font-sans text-xs font-bold tracking-[0.25em] uppercase text-black whitespace-nowrap"><span>Order via DoorDash</span><span className="w-1.5 h-1.5 rounded-full bg-black/30" /></div>
          </div>
        ))}
      </div>
    </div>
  );
};
