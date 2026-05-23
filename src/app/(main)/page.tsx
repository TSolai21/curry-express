import { Hero } from '@/components/home/Hero';
import { Marquee } from '@/components/home/Marquee';
import { MenuPreview } from '@/components/home/MenuPreview';
import { Offers } from '@/components/home/Offers';
import { About } from '@/components/home/About';
import { Gallery } from '@/components/home/Gallery';
import { Reviews } from '@/components/home/Reviews';
import { Location } from '@/components/home/Location';
import { getReviews, getOffers } from '@/app/actions';

export default async function Home() {
  const reviews = await getReviews();
  const offers = await getOffers();
  return (
    <>
      <Hero />
      <Marquee />
      <MenuPreview />
      <Offers offers={offers} />
      <About />
      <Gallery />
      <Reviews reviews={reviews} />
      <Location />
    </>
  );
}
