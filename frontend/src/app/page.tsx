"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../context/LanguageContext';
import Image from 'next/image';
import { type Listing, formatPrice, getListingLocation, getListings, searchListings } from '../lib/api';
import { getListingImage } from '../lib/listingImages';

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// ─── Constants ────────────────────────────────────────────────────────────────
const PROPERTY_TYPES = [
  { value: '',           label: 'Любой тип' },
  { value: 'APARTMENT',  label: 'Апартаменты' },
  { value: 'VILLA',      label: 'Вилла' },
  { value: 'COMMERCIAL', label: 'Коммерческая' },
  { value: 'LAND',       label: 'Земля' },
];

const ROOMS_OPTIONS = [
  { value: '',    label: 'Любые комнаты' },
  { value: '1+0', label: 'Студия (1+0)' },
  { value: '1+1', label: '1+1' },
  { value: '2+1', label: '2+1' },
  { value: '3+1', label: '3+1' },
  { value: '4+1', label: '4+1' },
  { value: '5+1', label: '5+1 и более' },
];

// ─── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col">
      <div className="w-full h-52 skeleton" />
      <div className="p-5 flex flex-col gap-3">
        <div className="skeleton h-6 w-28 rounded-lg" />
        <div className="skeleton h-4 w-44 rounded" />
        <div className="skeleton h-3 w-36 rounded" />
        <div className="mt-2 pt-3 border-t border-slate-100 skeleton h-3 w-24 rounded" />
      </div>
    </div>
  );
}

// ─── Property card ────────────────────────────────────────────────────────────
function PropertyCard({ listing, t }: { listing: Listing; t: (k: string) => string }) {
  return (
    <motion.div variants={cardVariant}>
      <Link
        href={`/property/${listing.id}`}
        className="bg-white border border-slate-200 rounded-2xl overflow-hidden group cursor-pointer
                   flex flex-col card-hover block"
      >
        <div className="w-full h-52 bg-slate-100 relative overflow-hidden">
          {listing.vatandasligaUygun && (
            <div className="absolute top-3 left-3 bg-brand-blue text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md z-10 tracking-wide">
              CITIZENSHIP
            </div>
          )}
          <div className="absolute top-3 right-3 bg-white/85 backdrop-blur-sm text-brand-dark border border-white/60 text-[10px] font-bold px-2.5 py-1 rounded-full z-10 tracking-wide shadow-sm">
            {listing.propertyType}
          </div>
          <Image
            src={getListingImage(listing.id, listing.propertyType)}
            alt={listing.title}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <div className="text-brand-dark font-extrabold text-xl mb-1">
            {formatPrice(listing.price, listing.currency)}
          </div>
          <div className="text-slate-800 font-semibold mb-1 line-clamp-1">{listing.title}</div>
          <div className="text-slate-500 text-[13px] mb-3 line-clamp-1 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {getListingLocation(listing)}
          </div>

          <div className="flex gap-2 flex-wrap">
            {listing.rooms && listing.rooms !== '-' && (
              <span className="bg-slate-50 text-slate-600 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-slate-200">
                {listing.rooms}
              </span>
            )}
            <span className="bg-slate-50 text-slate-600 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-slate-200">
              {listing.grossSquareMeters} m²
            </span>
            {listing.iskan && (
              <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                İskan ✓
              </span>
            )}
          </div>

          <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
            <span className="text-[12px] text-slate-500">
              {t('home.listed_by')}{' '}
              <span className="font-bold text-brand-dark">{listing.agency?.name ?? 'TurkEstate'}</span>
            </span>
            {listing.agency?.status === 'VERIFIED' && (
              <span className="bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full border border-emerald-200 font-bold tracking-wide">
                TTYB ✓
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── FilterSelect ─────────────────────────────────────────────────────────────
function FilterSelect({
  label, value, onChange, options,
}: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 bg-white border border-slate-200 rounded-xl px-4 text-brand-dark font-semibold
                   cursor-pointer hover:border-brand-blue focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20
                   outline-none transition shadow-sm text-sm appearance-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px', paddingRight: '36px' }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeTab, setActiveTab]               = useState('buy');
  const [searchLoading, setSearchLoading]       = useState(false);
  const [listings, setListings]                 = useState<Listing[]>([]);
  const [initialLoading, setInitialLoading]     = useState(true);
  const [showAdvanced, setShowAdvanced]         = useState(false);

  // ── Filter state ────────────────────────────────────────────────────────────
  const [propertyType, setPropertyType]         = useState('');
  const [rooms, setRooms]                       = useState('');
  const [location, setLocation]                 = useState('');
  const [iskanFilter, setIskanFilter]           = useState(false);
  const [citizenshipFilter, setCitizenshipFilter] = useState(false);
  const [katFilter, setKatFilter]               = useState(false);
  const [minPrice, setMinPrice]                 = useState('');
  const [maxPrice, setMaxPrice]                 = useState('');

  // Track active filter count for badge
  const activeCount = [
    propertyType, rooms, location, minPrice, maxPrice,
    iskanFilter, citizenshipFilter, katFilter,
  ].filter(Boolean).length;

  const { t } = useTranslation();

  useEffect(() => {
    getListings(1)
      .then(setListings)
      .catch(() => {})
      .finally(() => setInitialLoading(false));
  }, []);

  const handleSearch = async () => {
    setSearchLoading(true);
    try {
      const results = await searchListings({
        propertyType: propertyType || undefined,
        iskan: iskanFilter || undefined,
        vatandasligaUygun: citizenshipFilter || undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        page: 1,
      });
      setListings(results);
    } catch {
      setListings(await getListings(1).catch(() => []));
    } finally {
      setSearchLoading(false);
    }
  };

  const handleReset = () => {
    setPropertyType(''); setRooms(''); setLocation('');
    setIskanFilter(false); setCitizenshipFilter(false); setKatFilter(false);
    setMinPrice(''); setMaxPrice('');
    getListings(1).then(setListings).catch(() => {});
  };

  const tabs = [
    { id: 'buy',  label: t('home.buy') },
    { id: 'rent', label: t('home.rent') },
    { id: 'inv',  label: t('home.investments') },
  ];

  return (
    <div className="min-h-screen bg-brand-light font-[family-name:var(--font-geist-sans)] selection:bg-brand-blue/20">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative w-full pt-20 pb-20 px-4 flex flex-col items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <div className="blob blob-delay-0 absolute -top-24 left-1/4 w-[520px] h-[520px] rounded-full bg-blue-100/60 blur-3xl" />
          <div className="blob blob-delay-2 absolute top-10 right-1/4 w-[380px] h-[380px] rounded-full bg-indigo-100/50 blur-3xl" />
          <div className="blob blob-delay-4 absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-sky-100/40 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-5xl">
          <motion.h2 variants={fadeUp} initial="hidden" animate="show"
            className="text-4xl md:text-[3.4rem] font-extrabold text-center text-brand-dark mb-3 tracking-tight leading-[1.1]">
            {t('home.hero_title')}
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.1 }}
            className="text-center text-slate-500 text-base md:text-lg mb-10 max-w-xl mx-auto">
            Verified agencies · Turkish citizenship · Best prices
          </motion.p>

          {/* ── Search glass panel ──────────────────────────────────────────── */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.18 }}
            className="glass-panel shadow-glow overflow-hidden">

            {/* Tabs */}
            <div className="flex px-4 pt-3 pb-1 gap-6 border-b border-slate-200 text-sm">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`font-semibold pb-2 shrink-0 border-b-2 transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'text-brand-dark border-brand-blue'
                      : 'text-slate-500 border-transparent hover:text-brand-dark'
                  }`}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Main filters row */}
            <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-3 items-end">
              <div className="lg:col-span-3">
                <FilterSelect label={t('home.prop_type')} value={propertyType} onChange={setPropertyType} options={PROPERTY_TYPES} />
              </div>
              <div className="lg:col-span-2">
                <FilterSelect label={t('home.rooms')} value={rooms} onChange={setRooms} options={ROOMS_OPTIONS} />
              </div>
              <div className="lg:col-span-4 flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">{t('home.location')}</label>
                <div className="h-12 bg-white border border-slate-200 rounded-xl flex items-center px-4 hover:border-brand-blue focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/20 transition shadow-sm">
                  <svg className="w-4 h-4 text-slate-300 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text" value={location} onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Antalya, Muratpaşa..."
                    className="bg-transparent outline-none text-brand-dark font-medium w-full placeholder-slate-400 text-sm" />
                </div>
              </div>
              <div className="lg:col-span-3 flex gap-2">
                <button onClick={handleSearch}
                  className="primary-button flex-1 h-12 flex items-center justify-center gap-2 text-[15px] shadow-md hover:shadow-glow">
                  {searchLoading
                    ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                  }
                  {searchLoading ? 'Поиск...' : t('home.search')}
                </button>
                {activeCount > 0 && (
                  <button onClick={handleReset} title="Сбросить фильтры"
                    className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-red-50 hover:border-red-300 hover:text-red-500 text-slate-400 transition shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Quick toggles + advanced */}
            <div className="px-4 pb-4 flex flex-wrap gap-4 items-center border-t border-slate-100 pt-3">
              {[
                { state: iskanFilter,      set: setIskanFilter,      label: t('home.iskan') },
                { state: citizenshipFilter,set: setCitizenshipFilter, label: t('home.citizenship') },
                { state: katFilter,        set: setKatFilter,         label: t('home.kat') },
              ].map(({ state, set, label }) => (
                <label key={label} className="flex items-center gap-2 cursor-pointer hover:text-brand-dark transition group select-none">
                  <div onClick={() => set(!state)}
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                      state ? 'bg-brand-blue border-brand-blue' : 'border-slate-300 group-hover:border-brand-blue'
                    }`}>
                    {state && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[13px] text-slate-600 font-medium">{label}</span>
                </label>
              ))}

              <button onClick={() => setShowAdvanced(!showAdvanced)}
                className="ml-auto text-brand-blue hover:text-blue-800 font-semibold text-[13px] transition-colors flex items-center gap-1.5">
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {showAdvanced ? 'Скрыть фильтры' : t('home.adv_filters')}
                {activeCount > 0 && (
                  <span className="bg-brand-blue text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {activeCount}
                  </span>
                )}
              </button>
            </div>

            {/* Advanced filters (expandable) */}
            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden border-t border-slate-100"
                >
                  <div className="px-4 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Min price */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">Цена от ($)</label>
                      <input
                        type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="85 000"
                        className="h-11 bg-white border border-slate-200 rounded-xl px-4 text-brand-dark font-semibold text-sm outline-none hover:border-brand-blue focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition shadow-sm" />
                    </div>
                    {/* Max price */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">Цена до ($)</label>
                      <input
                        type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="2 000 000"
                        className="h-11 bg-white border border-slate-200 rounded-xl px-4 text-brand-dark font-semibold text-sm outline-none hover:border-brand-blue focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition shadow-sm" />
                    </div>
                    {/* Popular ranges */}
                    <div className="md:col-span-2 flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">Быстрый выбор цены</label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: 'до $200k',   min: '',       max: '200000' },
                          { label: '$200–500k',  min: '200000', max: '500000' },
                          { label: '$500k–1M',   min: '500000', max: '1000000' },
                          { label: 'от $1M',     min: '1000000',max: '' },
                        ].map(({ label, min, max }) => (
                          <button key={label}
                            onClick={() => { setMinPrice(min); setMaxPrice(max); }}
                            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition ${
                              minPrice === min && maxPrice === max
                                ? 'bg-brand-blue text-white border-brand-blue'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-brand-blue hover:text-brand-blue'
                            }`}>
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Stats bar */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.28 }}
            className="mt-6 flex items-center justify-center gap-6 flex-wrap">
            {[
              { value: '3 400+', label: 'объектов' },
              { value: '120+',   label: 'агентств' },
              { value: '4',      label: 'города' },
              { value: 'от $85k', label: 'мин. цена' },
            ].map(({ value, label }, i) => (
              <React.Fragment key={label}>
                {i > 0 && <span className="w-px h-4 bg-slate-300" />}
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <span className="font-extrabold text-brand-dark text-base">{value}</span>
                  <span>{label}</span>
                </div>
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Listings grid ─────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl font-extrabold text-brand-dark tracking-tight">{t('home.premium_offers')}</h3>
            {listings.length > 0 && !initialLoading && (
              <p className="text-slate-400 text-sm mt-1">{listings.length} объектов найдено</p>
            )}
          </div>
          <button className="text-sm font-semibold text-brand-blue flex items-center gap-1 hover:text-blue-800 transition-colors">
            {t('home.view_all')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {initialLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {!initialLoading && listings.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-24 text-slate-400">
            <div className="text-5xl mb-4">🏠</div>
            <p className="text-lg font-semibold text-slate-600">Объекты не найдены</p>
            <p className="text-sm mt-1">Измените фильтры или запустите seed script</p>
          </motion.div>
        )}

        {!initialLoading && listings.length > 0 && (
          <motion.div variants={stagger} initial="hidden" animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {listings.map((listing) => (
                <PropertyCard key={listing.id} listing={listing} t={t} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* ── Trust footer strip ────────────────────────────────────────────────── */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="border-t border-slate-200 bg-white py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: '🛡️', title: 'TTYB Верификация',  desc: 'Все агентства проходят проверку турецкой лицензии' },
            { icon: '🇹🇷', title: 'Гражданство',       desc: 'Подбор объектов под программу гражданства от $400k' },
            { icon: '🔍', title: 'Умный поиск',       desc: 'Elasticsearch с турецким анализатором и геопоиском' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-3">
              <span className="text-4xl">{icon}</span>
              <h4 className="font-bold text-brand-dark">{title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
