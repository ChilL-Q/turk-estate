"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '../context/LanguageContext';
import Header from '../components/Header';

export default function Home() {
  const [activeTab, setActiveTab] = useState('buy');
  const [searchLoading, setSearchLoading] = useState(false);
  const { t, locale, setLocale } = useTranslation();

  const handleSearch = () => {
    setSearchLoading(true);
    setTimeout(() => {
      setSearchLoading(false);
      alert("Elasticsearch Query executed! Routing to search results page...");
    }, 600);
  };

  const handleLogin = () => alert("Redirecting to OAuth / Auth0 Auth screen...");
  
  return (
    <div className="min-h-screen bg-slate-50 font-[family-name:var(--font-geist-sans)] selection:bg-brand-blue/20">
      
      <Header />

      {/* Hero Search Section */}
      <section className="relative w-full pt-16 pb-20 px-4 flex flex-col items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-[450px] bg-gradient-to-b from-brand-blue/5 via-brand-blue/[0.02] to-transparent"></div>
        </div>

        <div className="z-10 w-full max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center text-brand-dark mb-8 tracking-tight">
            {t('home.hero_title')}
          </h2>

          <div className="glass-panel p-2 flex flex-col gap-2">
            
            <div className="flex px-4 pt-3 pb-1 gap-6 border-b border-slate-200 text-sm">
              <button onClick={() => setActiveTab('buy')} className={`font-semibold pb-2 shrink-0 border-b-2 transition ${activeTab === 'buy' ? 'text-brand-dark border-brand-blue' : 'text-slate-500 border-transparent hover:text-brand-dark'}`}>{t('home.buy')}</button>
              <button onClick={() => setActiveTab('rent')} className={`font-semibold pb-2 shrink-0 border-b-2 transition ${activeTab === 'rent' ? 'text-brand-dark border-brand-blue' : 'text-slate-500 border-transparent hover:text-brand-dark'}`}>{t('home.rent')}</button>
              <button onClick={() => setActiveTab('inv')} className={`font-semibold pb-2 shrink-0 border-b-2 transition ${activeTab === 'inv' ? 'text-brand-dark border-brand-blue' : 'text-slate-500 border-transparent hover:text-brand-dark'}`}>{t('home.investments')}</button>
            </div>

            <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-3 items-end">
              <div className="lg:col-span-3 flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-slate-500 ml-1 uppercase tracking-wider">{t('home.prop_type')}</label>
                <div onClick={() => alert("Dropdown: Filter")} className="h-12 bg-white border border-slate-200 rounded-lg flex items-center px-4 cursor-pointer hover:border-brand-blue transition shadow-sm">
                  <span className="text-brand-dark font-medium">Apartment, Villa</span>
                </div>
              </div>

              <div className="lg:col-span-2 flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-slate-500 ml-1 uppercase tracking-wider">{t('home.rooms')}</label>
                <div onClick={() => alert("Dropdown")} className="h-12 bg-white border border-slate-200 rounded-lg flex items-center px-4 cursor-pointer hover:border-brand-blue transition shadow-sm">
                  <span className="text-brand-dark font-medium">1+1, 2+1</span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-slate-500 ml-1 uppercase tracking-wider">{t('home.location')}</label>
                <div className="h-12 bg-white border border-slate-200 rounded-lg flex items-center px-4 relative group hover:border-brand-blue transition shadow-sm">
                  <input 
                    type="text" 
                    placeholder="e.g. Antalya, Muratpaşa..."
                    className="bg-transparent outline-none text-brand-dark font-medium w-full placeholder-slate-400"
                  />
                </div>
              </div>

              <div className="lg:col-span-3">
                <button onClick={handleSearch} className="primary-button w-full h-12 flex items-center justify-center text-lg gap-2 shadow-md">
                  {searchLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  )}
                  {searchLoading ? "Loading..." : t('home.search')}
                </button>
              </div>

            </div>

            <div className="px-4 pb-3 flex flex-wrap gap-5 text-[13px] text-slate-600 items-center">
              <label className="flex items-center gap-2 cursor-pointer hover:text-brand-dark transition">
                <input type="checkbox" className="rounded border-slate-300 text-brand-blue focus:ring-brand-blue" defaultChecked />
                {t('home.iskan')}
              </label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-brand-dark transition">
                <input type="checkbox" className="rounded border-slate-300 text-brand-blue focus:ring-brand-blue" />
                {t('home.citizenship')}
              </label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-brand-dark transition">
                <input type="checkbox" className="rounded border-slate-300 text-brand-blue focus:ring-brand-blue" />
                {t('home.kat')}
              </label>
              
              <div onClick={() => alert("Opening Advanced Filters Modal...")} className="ml-auto text-brand-blue hover:text-blue-800 font-medium cursor-pointer transition">
                {t('home.adv_filters')}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Grid of Listings */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-brand-dark tracking-tight">{t('home.premium_offers')}</h3>
          <button className="text-sm font-medium text-brand-blue flex items-center gap-1 hover:text-blue-800 transition">
            {t('home.view_all')} 
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <Link href="/property/123" className="bg-white border border-slate-200 rounded-xl overflow-hidden group cursor-pointer hover:shadow-soft hover:border-slate-300 transition duration-300 flex flex-col">
            <div className="w-full h-52 bg-slate-100 relative overflow-hidden">
              <div className="absolute top-2 left-2 bg-brand-blue text-white text-xs font-bold px-2 py-1 rounded shadow-sm z-10">TOP</div>
              <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-md text-brand-dark border border-white/50 text-[11px] font-semibold px-2 py-1 rounded-full z-10">12 Photos</div>
              <div className="w-full h-full bg-slate-200 group-hover:scale-105 transition duration-700"></div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="text-brand-dark font-bold text-xl mb-1 mt-1">$ 450,000</div>
              <div className="text-slate-800 font-medium mb-1 line-clamp-1 border-b border-transparent group-hover:border-slate-300 transition self-start">3+1 Luxury Apartment</div>
              <div className="text-slate-500 text-sm mb-4 line-clamp-1 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Istanbul, Kadıköy, Caddebostan
              </div>
              
              <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-slate-500">{t('home.listed_by')} <span className="font-semibold text-brand-dark">RealtyTR</span></span>
                <span className="bg-slate-50 text-slate-500 px-2 py-0.5 rounded border border-slate-200 font-medium">TTYB ✓</span>
              </div>
            </div>
          </Link>

        </div>
      </section>

    </div>
  );
}
