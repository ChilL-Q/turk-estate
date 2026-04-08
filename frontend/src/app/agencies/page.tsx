"use client";
import React from 'react';
import Header from '../../components/Header';
import { useTranslation } from '../../context/LanguageContext';

export default function AgenciesPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 font-[family-name:var(--font-geist-sans)] selection:bg-brand-blue/20">
      
      <Header />

      {/* Hero */}
      <section className="bg-brand-dark text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">{t('agencies.hero_title')}</h1>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl leading-relaxed">
            {t('agencies.hero_desc')}
          </p>

          <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
            <input 
              type="text" 
              placeholder={t('agencies.search_placeholder')}
              className="px-6 py-4 w-full md:w-2/3 rounded-xl text-brand-dark font-medium outline-none focus:ring-4 focus:ring-brand-blue/50 shadow-lg"
            />
            <button className="primary-button md:w-1/3 py-4 text-lg shadow-lg hover:shadow-xl flex justify-center items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              {t('agencies.search_btn')}
            </button>
          </div>
        </div>
      </section>

      {/* Directory Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 hidden lg:block">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm sticky top-24">
            <h3 className="font-bold text-brand-dark mb-4 border-b border-slate-100 pb-3 text-lg">{t('agencies.filter_by')}</h3>
            
            <div>
              <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-3">{t('agencies.specialization')}</h4>
              <div className="flex flex-col gap-3 text-sm text-slate-700 font-medium">
                <label className="flex items-center gap-2 cursor-pointer hover:text-brand-blue transition">
                  <input type="checkbox" className="rounded text-brand-blue focus:ring-brand-blue w-4 h-4" /> {t('agencies.spec_luxury')}
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-brand-blue transition">
                  <input type="checkbox" className="rounded text-brand-blue focus:ring-brand-blue w-4 h-4" /> {t('agencies.spec_citizenship')}
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-brand-blue transition">
                  <input type="checkbox" className="rounded text-brand-blue focus:ring-brand-blue w-4 h-4" /> {t('agencies.spec_commercial')}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* List of Realtors */}
        <div className="lg:col-span-3 flex flex-col gap-5">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-extrabold text-brand-dark">{t('agencies.verified_count')}</h2>
            <select className="bg-white border border-slate-200 text-sm font-semibold text-brand-dark rounded-lg py-2 px-3 outline-none cursor-pointer shadow-sm">
              <option>{t('agencies.sort_listings')}</option>
              <option>{t('agencies.sort_rating')}</option>
            </select>
          </div>

          <h3 className="text-2xl font-bold text-brand-dark mt-4 mb-4">{t('agencies.type_agency')}</h3>
          {/* Agency Card 1 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-soft hover:border-slate-300 transition cursor-pointer flex flex-col sm:flex-row gap-6 group">
            <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center font-extrabold text-brand-blue/30 text-3xl shrink-0 group-hover:border-brand-blue/30 transition">
              EB
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start gap-4 mb-2">
                <div>
                  <h3 className="text-xl font-bold text-brand-dark flex items-center gap-2">
                    Elite Brokers Turkey
                    <svg className="w-5 h-5 text-brand-blue" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  </h3>
                  <div className="text-sm text-slate-500 font-medium mt-0.5">Анталья, Аланья • {t('agencies.type_agency')}</div>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded text-[10px] font-extrabold tracking-widest uppercase border border-emerald-100">
                  TTYB ✓ 
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-2">
                Специализируемся на элитных средиземноморских виллах и высокодоходной инвестиционной недвижимости. Мы предлагаем полное юридическое сопровождение по программе получения гражданства Турции за инвестиции.
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-semibold border-t border-slate-100 pt-4">
                <div className="text-brand-dark flex items-center gap-1.5 border-r border-slate-200 pr-4">342 <span className="text-slate-400 font-medium">{t('card.active_listings')}</span></div>
                <div className="text-brand-dark flex items-center gap-1.5 border-r border-slate-200 pr-4">15 <span className="text-slate-400 font-medium">{t('card.agents')}</span></div>
                <div className="text-amber-500 flex items-center gap-1">★ 4.9 <span className="text-slate-400 font-medium">(120 {t('card.reviews')})</span></div>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-brand-dark mt-6 mb-4">{t('agencies.type_dev')}</h3>
          {/* Agency Card 2 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-soft hover:border-slate-300 transition cursor-pointer flex flex-col sm:flex-row gap-6 group">
            <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center font-extrabold text-brand-blue/30 text-3xl shrink-0 group-hover:border-brand-blue/30 transition">
              TR
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start gap-4 mb-2">
                <div>
                  <h3 className="text-xl font-bold text-brand-dark flex items-center gap-2">
                    TrustRealty Istanbul
                    <svg className="w-5 h-5 text-brand-blue" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  </h3>
                  <div className="text-sm text-slate-500 font-medium mt-0.5">Стамбул, Кадыкёй • {t('agencies.type_dev')}</div>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded text-[10px] font-extrabold tracking-widest uppercase border border-emerald-100">
                  TTYB ✓ 
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-2">
                Ведущий застройщик и брокер Стамбула. Мы связываем глобальных B2B-партнеров и состоятельных частных лиц с эксклюзивными квартирами Kat Mülkiyeti в центре города.
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-semibold border-t border-slate-100 pt-4">
                <div className="text-brand-dark flex items-center gap-1.5 border-r border-slate-200 pr-4">1,240 <span className="text-slate-400 font-medium">{t('card.active_listings')}</span></div>
                <div className="text-brand-dark flex items-center gap-1.5 border-r border-slate-200 pr-4">85 <span className="text-slate-400 font-medium">{t('card.agents')}</span></div>
                <div className="text-amber-500 flex items-center gap-1">★ 4.8 <span className="text-slate-400 font-medium">(450 {t('card.reviews')})</span></div>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-brand-dark mt-6 mb-4">{t('agencies.type_broker')}</h3>
          {/* Agency Card 3 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-soft hover:border-slate-300 transition cursor-pointer flex flex-col sm:flex-row gap-6 group">
            <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center font-extrabold text-brand-blue/30 text-3xl shrink-0 group-hover:border-brand-blue/30 transition">
              IR
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start gap-4 mb-2">
                <div>
                  <h3 className="text-xl font-bold text-brand-dark flex items-center gap-2">
                    Independent Realtor
                    <svg className="w-5 h-5 text-brand-blue" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  </h3>
                  <div className="text-sm text-slate-500 font-medium mt-0.5">Измир, Чешме • {t('agencies.type_broker')}</div>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded text-[10px] font-extrabold tracking-widest uppercase border border-emerald-100">
                  TTYB ✓ 
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-2">
                Эксклюзивные объекты на Эгейском побережье. Индивидуальный подход к подбору недвижимости для жизни и инвестиций от частного эксперта с 10-летним стажем.
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-semibold border-t border-slate-100 pt-4">
                <div className="text-brand-dark flex items-center gap-1.5 border-r border-slate-200 pr-4">42 <span className="text-slate-400 font-medium">{t('card.active_listings')}</span></div>
                <div className="text-brand-dark flex items-center gap-1.5 border-r border-slate-200 pr-4">1 <span className="text-slate-400 font-medium">{t('card.agents')}</span></div>
                <div className="text-amber-500 flex items-center gap-1">★ 5.0 <span className="text-slate-400 font-medium">(84 {t('card.reviews')})</span></div>
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
