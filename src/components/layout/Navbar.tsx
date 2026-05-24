"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();
  const isMenuPage = pathname === '/menu';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuPage) {
      setActiveSection('menu');
      return;
    }

    // Scroll spy for home page sections
    const sections = document.querySelectorAll('section[id]');
    
    // If no sections found or we are just at the top, clear active section
    if (window.scrollY < 100) {
      setActiveSection('');
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    sections.forEach((section) => observer.observe(section));

    // Listen for scroll specifically to clear top
    const handleScrollClear = () => {
      if (window.scrollY < 100 && !isMenuPage) {
        setActiveSection('');
      }
    };
    window.addEventListener('scroll', handleScrollClear);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener('scroll', handleScrollClear);
    };
  }, [isMenuPage]);

  const getLinkClass = (section: string) => {
    const isActive = activeSection === section;
    return {
      link: `text-xs font-medium tracking-[0.08em] uppercase transition-colors relative group ${isActive ? 'text-saffron' : 'text-brand-text-dim hover:text-saffron'}`,
      span: `absolute -bottom-1 left-0 h-px bg-saffron transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`
    };
  };

  const getMobileLinkClass = (section: string) => {
    const isActive = activeSection === section;
    return `block py-3.5 text-base font-medium border-b border-brand-border transition-colors ${isActive ? 'text-saffron' : 'text-brand-text-dim hover:text-saffron'}`;
  };

  return (
    <>
      <div className={`fixed inset-0 bg-black/75 z-[1999] transition-opacity ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileMenuOpen(false)} />
      
      <div className={`fixed top-0 right-0 w-[280px] h-screen bg-surface z-[2000] pt-20 px-8 pb-8 transition-transform duration-400 ease-out border-l border-brand-border flex flex-col gap-2 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button className="absolute top-5 right-5 bg-transparent border-none text-brand-text text-2xl cursor-pointer" onClick={() => setMobileMenuOpen(false)}>✕</button>
        <Link href="/menu" onClick={() => setMobileMenuOpen(false)} className={getMobileLinkClass('menu')}>Full Menu</Link>
        <Link href="/#offers" onClick={() => setMobileMenuOpen(false)} className={getMobileLinkClass('offers')}>Offers</Link>
        <Link href="/#about" onClick={() => setMobileMenuOpen(false)} className={getMobileLinkClass('about')}>Our Story</Link>
        <Link href="/#gallery" onClick={() => setMobileMenuOpen(false)} className={getMobileLinkClass('gallery')}>Gallery</Link>
        <Link href="/#reviews" onClick={() => setMobileMenuOpen(false)} className={getMobileLinkClass('reviews')}>Reviews</Link>
        <Link href="/#contact" onClick={() => setMobileMenuOpen(false)} className={getMobileLinkClass('contact')}>Contact Us</Link>
        <a href="https://www.doordash.com" target="_blank" rel="noopener" className="mt-6 bg-saffron text-black py-4 rounded-lg text-center font-bold">Order on DoorDash</a>
      </div>

      <nav className={`${isMenuPage ? 'absolute' : 'fixed'} top-0 left-0 right-0 z-[1000] transition-all duration-500 ${!isMenuPage && scrolled ? 'bg-black/40 backdrop-blur-xl py-2 border-b border-brand-border' : 'py-3'}`}>
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Curry Express" width={200} height={60} className="h-12 md:h-14 w-auto object-contain" priority />
          </Link>
          
          <ul className="hidden md:flex items-center gap-8 list-none">
            <li><Link href="/menu" className={getLinkClass('menu').link}>Full Menu<span className={getLinkClass('menu').span}></span></Link></li>
            <li><Link href="/#offers" className={getLinkClass('offers').link}>Offers<span className={getLinkClass('offers').span}></span></Link></li>
            <li><Link href="/#about" className={getLinkClass('about').link}>Our Story<span className={getLinkClass('about').span}></span></Link></li>
            <li><Link href="/#gallery" className={getLinkClass('gallery').link}>Gallery<span className={getLinkClass('gallery').span}></span></Link></li>
            <li><Link href="/#reviews" className={getLinkClass('reviews').link}>Reviews<span className={getLinkClass('reviews').span}></span></Link></li>
            <li><Link href="/#contact" className={getLinkClass('contact').link}>Contact Us<span className={getLinkClass('contact').span}></span></Link></li>
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
