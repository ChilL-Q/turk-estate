"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '../context/LanguageContext';

export default function Header() {
  const pathname = usePathname();
  const { t, locale, setLocale } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setPastHero(y > 370); // past the dark hero section
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // White text only while the dark hero is scrolled behind the sticky header
  const darkHeroPages = ['/agencies'];
  const isDarkHero = darkHeroPages.includes(pathname) && scrolled && !pastHero;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/96 backdrop-blur-xl shadow-soft border-b border-slate-200'
          : 'bg-white/82 backdrop-blur-md border-b border-slate-200/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo + Nav */}
        <div className="flex items-center gap-10">
          <Link href="/" className={`text-2xl font-extrabold tracking-tight flex items-center transition-colors duration-300 ${
            isDarkHero ? 'text-white' : 'text-brand-dark'
          }`}>
            Turk<span className="text-brand-blue">Estate</span>
          </Link>

          <nav className={`hidden md:flex gap-8 text-sm font-medium items-center h-full transition-colors duration-300 ${
            isDarkHero ? 'text-slate-300' : 'text-slate-600'
          }`}>
            <Link href="/" className={`h-full flex items-center transition-colors relative ${
              pathname === '/' ? 'text-brand-blue font-bold' : isDarkHero ? 'hover:text-white' : 'hover:text-brand-blue'
            }`}>
              {t('nav.properties')}
              <span className={`absolute bottom-0 left-0 right-0 h-[2.5px] bg-brand-blue rounded-full transition-all duration-300 ${
                pathname === '/' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`} />
            </Link>
            <Link href="/agencies" className={`h-full flex items-center transition-colors relative ${
              pathname === '/agencies' ? 'text-brand-blue font-bold' : isDarkHero ? 'hover:text-white' : 'hover:text-brand-blue'
            }`}>
              {t('nav.agencies')}
              <span className={`absolute bottom-0 left-0 right-0 h-[2.5px] bg-brand-blue rounded-full transition-all duration-300 ${
                pathname === '/agencies' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`} />
            </Link>
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            className="bg-slate-100 border border-slate-200 text-brand-dark font-semibold rounded-lg
                       px-3 py-1.5 text-xs outline-none cursor-pointer hover:bg-slate-200 transition
                       focus:ring-2 focus:ring-brand-blue/30"
          >
            <option value="en">🇬🇧 EN</option>
            <option value="ru">🇷🇺 RU</option>
            <option value="tr">🇹🇷 TR</option>
          </select>

          <button className={`hidden md:block text-sm font-medium transition-colors duration-300 ${
            isDarkHero ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-brand-dark'
          }`}>
            {t('nav.login')}
          </button>

          <Link
            href="/dashboard"
            className="hidden md:flex text-sm font-semibold bg-slate-100 text-slate-700 px-4 py-2
                       rounded-xl border border-slate-200 hover:bg-slate-200 transition-all items-center gap-1.5"
          >
            {t('nav.pro_panel')}
          </Link>

          <Link href="/dashboard" className="primary-button py-2 px-4 text-sm hidden md:block">
            {t('nav.register_agency')}
          </Link>
        </div>
      </div>
    </header>
  );
}
