"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isMenuPage = pathname === '/menu';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`fixed inset-0 bg-black/75 z-[1999] transition-opacity ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileMenuOpen(false)} />
      
      <div className={`fixed top-0 right-0 w-[280px] h-screen bg-surface z-[2000] pt-20 px-8 pb-8 transition-transform duration-400 ease-out border-l border-brand-border flex flex-col gap-2 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button className="absolute top-5 right-5 bg-transparent border-none text-brand-text text-2xl cursor-pointer" onClick={() => setMobileMenuOpen(false)}>✕</button>
        <Link href="/menu" onClick={() => setMobileMenuOpen(false)} className="block py-3.5 text-base font-medium text-brand-text-dim border-b border-brand-border hover:text-saffron transition-colors">Full Menu</Link>
        <Link href="/#offers" onClick={() => setMobileMenuOpen(false)} className="block py-3.5 text-base font-medium text-brand-text-dim border-b border-brand-border hover:text-saffron transition-colors">Offers</Link>
        <Link href="/#about" onClick={() => setMobileMenuOpen(false)} className="block py-3.5 text-base font-medium text-brand-text-dim border-b border-brand-border hover:text-saffron transition-colors">Our Story</Link>
        <Link href="/#gallery" onClick={() => setMobileMenuOpen(false)} className="block py-3.5 text-base font-medium text-brand-text-dim border-b border-brand-border hover:text-saffron transition-colors">Gallery</Link>
        <Link href="/#reviews" onClick={() => setMobileMenuOpen(false)} className="block py-3.5 text-base font-medium text-brand-text-dim border-b border-brand-border hover:text-saffron transition-colors">Reviews</Link>
        <Link href="/#contact" onClick={() => setMobileMenuOpen(false)} className="block py-3.5 text-base font-medium text-brand-text-dim border-b border-brand-border hover:text-saffron transition-colors">Contact Us</Link>
        <a href="https://www.doordash.com" target="_blank" rel="noopener" className="mt-6 bg-saffron text-black py-4 rounded-lg text-center font-bold">Order on DoorDash</a>
      </div>

      <nav className={`${isMenuPage ? 'absolute' : 'fixed'} top-0 left-0 right-0 z-[1000] transition-all duration-500 ${!isMenuPage && scrolled ? 'bg-black/95 backdrop-blur-md py-3 border-b border-brand-border' : 'py-5'}`}>
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Curry Express" width={300} height={100} className="h-20 w-auto object-contain" priority />
          </Link>
          
          <ul className="hidden md:flex items-center gap-8 list-none">
            <li><Link href="/menu" className="text-xs font-medium tracking-[0.08em] uppercase text-brand-text-dim hover:text-saffron transition-colors relative group">Full Menu<span className="absolute -bottom-1 left-0 w-0 h-px bg-saffron transition-all group-hover:w-full"></span></Link></li>
            <li><Link href="/#offers" className="text-xs font-medium tracking-[0.08em] uppercase text-brand-text-dim hover:text-saffron transition-colors relative group">Offers<span className="absolute -bottom-1 left-0 w-0 h-px bg-saffron transition-all group-hover:w-full"></span></Link></li>
            <li><Link href="/#about" className="text-xs font-medium tracking-[0.08em] uppercase text-brand-text-dim hover:text-saffron transition-colors relative group">Our Story<span className="absolute -bottom-1 left-0 w-0 h-px bg-saffron transition-all group-hover:w-full"></span></Link></li>
            <li><Link href="/#gallery" className="text-xs font-medium tracking-[0.08em] uppercase text-brand-text-dim hover:text-saffron transition-colors relative group">Gallery<span className="absolute -bottom-1 left-0 w-0 h-px bg-saffron transition-all group-hover:w-full"></span></Link></li>
            <li><Link href="/#reviews" className="text-xs font-medium tracking-[0.08em] uppercase text-brand-text-dim hover:text-saffron transition-colors relative group">Reviews<span className="absolute -bottom-1 left-0 w-0 h-px bg-saffron transition-all group-hover:w-full"></span></Link></li>
            <li><Link href="/#contact" className="text-xs font-medium tracking-[0.08em] uppercase text-brand-text-dim hover:text-saffron transition-colors relative group">Contact Us<span className="absolute -bottom-1 left-0 w-0 h-px bg-saffron transition-all group-hover:w-full"></span></Link></li>
            <li><a href="https://www.doordash.com" target="_blank" rel="noopener" className="bg-saffron text-black px-5 py-2.5 rounded font-bold text-xs tracking-[0.08em] uppercase hover:bg-saffron-light transition-colors">Order Now →</a></li>
          </ul>

          <button className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-none p-1" onClick={() => setMobileMenuOpen(true)}>
            <span className="block w-6 h-0.5 bg-cream rounded-sm transition-all" />
            <span className="block w-6 h-0.5 bg-cream rounded-sm transition-all" />
            <span className="block w-6 h-0.5 bg-cream rounded-sm transition-all" />
          </button>
        </div>
      </nav>
    </>
  );
};
