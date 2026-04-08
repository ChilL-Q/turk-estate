"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '../context/LanguageContext';

export default function Header() {
  const pathname = usePathname();
  const { t, locale, setLocale } = useTranslation();

  const handleLogin = () => alert("Redirecting to OAuth / Auth0 Auth screen...");

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-2xl font-bold tracking-tight text-brand-dark flex gap-1 items-center">
            Turk<span className="text-brand-blue">Estate</span>
          </Link>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600 items-center h-full">
            <Link href="/" className={`h-full flex items-center transition-colors ${pathname === '/' ? 'text-brand-blue font-bold border-b-[3px] border-brand-blue pt-[3px]' : 'hover:text-brand-blue'}`}>
              {t('nav.properties')}
            </Link>
            <Link href="/agencies" className={`h-full flex items-center transition-colors ${pathname === '/agencies' ? 'text-brand-blue font-bold border-b-[3px] border-brand-blue pt-[3px]' : 'hover:text-brand-blue'}`}>
              {t('nav.agencies')}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <select 
            value={locale} 
            onChange={(e) => setLocale(e.target.value)} 
            className="bg-slate-100 border border-slate-200 text-brand-dark font-medium rounded-lg px-3 py-1.5 text-xs outline-none cursor-pointer focus:ring-2 focus:ring-brand-blue/30 hover:bg-slate-200 transition"
          >
             <option value="en">🇬🇧 EN</option>
             <option value="ru">🇷🇺 RU</option>
             <option value="tr">🇹🇷 TR</option>
          </select>

          <button onClick={handleLogin} className="text-sm font-medium text-slate-600 hover:text-brand-dark hidden md:block transition">{t('nav.login')}</button>
          <Link href="/dashboard" className="text-sm font-medium bg-slate-100 text-slate-700 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-200 transition inline-block">
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
