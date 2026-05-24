import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';
import { Marquee } from '@/components/home/Marquee';

export const Footer = () => {
  return (
    <>
      <Marquee />
      <footer className="bg-black border-t border-brand-border pt-16 pb-7">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="block mb-4">
              <Image src="/logo.png" alt="Curry Express" width={400} height={140} className="h-28 w-auto object-contain" />
            </Link>
            <p className="font-serif text-base italic text-cream/90 mb-6 leading-relaxed max-w-sm">
              Where ancient spice routes meet the modern table — crafted for those who refuse to choose.
            </p>
            <form className="flex gap-2 max-w-sm" action="#">
              <input type="email" placeholder="Join our mailing list" className="flex-1 px-4 py-2.5 bg-surface border border-brand-border rounded-md font-sans text-[13px] text-brand-text outline-none focus:border-saffron transition-colors placeholder:text-muted" />
              <button type="submit" className="px-4 py-2.5 bg-saffron text-black border-none rounded-md text-xs font-bold tracking-[0.08em] uppercase cursor-pointer hover:bg-saffron-light transition-colors">Subscribe</button>
            </form>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-cream mb-5">Explore</h4>
            <ul className="flex flex-col gap-2.5 list-none">
              <li><Link href="/menu" className="text-[13px] text-brand-text-dim hover:text-saffron transition-colors">Full Menu</Link></li>
              <li><Link href="/#offers" className="text-[13px] text-brand-text-dim hover:text-saffron transition-colors">Offers & Deals</Link></li>
              <li><Link href="/#about" className="text-[13px] text-brand-text-dim hover:text-saffron transition-colors">Our Story</Link></li>
              <li><Link href="/#gallery" className="text-[13px] text-brand-text-dim hover:text-saffron transition-colors">Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-cream mb-5">Contact</h4>
            <ul className="flex flex-col gap-2.5 list-none">
              <li className="text-[13px] text-brand-text-dim">15190 Walden Rd<br/>Montgomery, TX 77356</li>
              <li><a href="tel:+13468631124" className="text-[13px] text-brand-text-dim hover:text-saffron transition-colors">+1 (346) 863-1124</a></li>
              <li className="text-[13px] text-brand-text-dim mt-2 text-saffron">Open Daily: 11:00 AM – 9:30 PM</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-cream mb-5">Follow Us</h4>
            <div className="flex gap-3">
              <a href="#" className="w-11 h-11 rounded-full bg-surface-2 border border-brand-border flex items-center justify-center text-lg transition-all hover:bg-saffron hover:border-saffron hover:-translate-y-1 hover:text-black text-brand-text-dim">
                <FaInstagram />
              </a>
              <a href="#" className="w-11 h-11 rounded-full bg-surface-2 border border-brand-border flex items-center justify-center text-lg transition-all hover:bg-saffron hover:border-saffron hover:-translate-y-1 hover:text-black text-brand-text-dim">
                <FaFacebookF />
              </a>
              <a href="#" className="w-11 h-11 rounded-full bg-surface-2 border border-brand-border flex items-center justify-center text-lg transition-all hover:bg-saffron hover:border-saffron hover:-translate-y-1 hover:text-black text-brand-text-dim">
                <FaTiktok />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-brand-border flex flex-wrap justify-between items-center gap-4">
          <p className="text-xs text-muted">© {new Date().getFullYear()} Curry Express. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="text-xs text-muted hover:text-saffron transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-muted hover:text-saffron transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
      </footer>
    </>
  );
};
