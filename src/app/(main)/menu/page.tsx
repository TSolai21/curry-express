import { FullMenu } from '@/components/menu/FullMenu';

export const metadata = {
  title: 'Full Menu | Curry Express',
  description: 'Explore our wide variety of Indian and Chinese cuisine.',
};

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-black">
      <div className="relative pt-40 pb-20 text-center border-b border-brand-border overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-surface" />
        
        <div className="relative z-10 max-w-[1280px] mx-auto px-6">
          <div className="section-label justify-center mb-4">Our Menu</div>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-cream leading-[1.1] mb-6">
            Explore The <em>Flavors</em>
          </h1>
          <p className="text-brand-text-dim max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            From the fiery curries of the south to the wok-tossed noodles of the east, discover a world of authentic Indian and Chinese cuisine.
          </p>
        </div>
      </div>
      <FullMenu />
    </main>
  );
}
