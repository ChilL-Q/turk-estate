"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../context/LanguageContext';
import { type Agency, type AgencyType, getAgencies } from '../../lib/api';

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

// ─── Type config ──────────────────────────────────────────────────────────────
const TYPE_CONFIG: Record<AgencyType, {
  labelRu: string; icon: string; color: string; bg: string; border: string;
}> = {
  AGENCY:    { labelRu: 'Агентства недвижимости', icon: '🏢', color: 'text-brand-blue',   bg: 'bg-blue-50',    border: 'border-blue-200' },
  DEVELOPER: { labelRu: 'Компании-застройщики',   icon: '🏗️', color: 'text-amber-700',   bg: 'bg-amber-50',   border: 'border-amber-200' },
  REALTOR:   { labelRu: 'Частные риелторы',        icon: '🧑‍💼', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
};

const TYPE_ORDER: AgencyType[] = ['AGENCY', 'DEVELOPER', 'REALTOR'];

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function SkeletonAgency() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex gap-5">
      <div className="skeleton w-20 h-20 rounded-xl flex-shrink-0" />
      <div className="flex-1 flex flex-col gap-3 pt-1">
        <div className="skeleton h-5 w-48 rounded" />
        <div className="skeleton h-3 w-32 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-4/5 rounded" />
      </div>
    </div>
  );
}

// ─── Agency card ──────────────────────────────────────────────────────────────
function AgencyCard({ agency }: { agency: Agency }) {
  const initials = agency.name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  const cfg = TYPE_CONFIG[agency.agencyType];

  return (
    <motion.div variants={fadeUp}>
    <Link href={`/agencies/${agency.id}`}
      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm card-hover
                 flex flex-col sm:flex-row gap-5 group cursor-pointer block">
      <div className={`w-20 h-20 ${cfg.bg} border ${cfg.border} rounded-xl flex items-center justify-center
                       font-extrabold text-2xl shrink-0 group-hover:shadow-md transition-all duration-300`}>
        <span className={cfg.color}>{initials}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-3 mb-1 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-bold text-brand-dark">{agency.name}</h3>
            {agency.status === 'VERIFIED' && (
              <svg className="w-5 h-5 text-brand-blue flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          {agency.status === 'VERIFIED' ? (
            <span className="flex-shrink-0 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase border border-emerald-200">TTYB ✓</span>
          ) : (
            <span className="flex-shrink-0 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase border border-amber-200">PENDING</span>
          )}
        </div>

        <div className="flex items-center gap-2 text-[12px] text-slate-500 mb-2 flex-wrap">
          {agency.city && (
            <>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {agency.city}
              </span>
              <span className="text-slate-300">·</span>
            </>
          )}
          {agency.email && <span>{agency.email}</span>}
        </div>

        {agency.description && (
          <p className="text-[13px] text-slate-600 leading-relaxed line-clamp-2 mb-3">{agency.description}</p>
        )}

        <div className="flex flex-wrap gap-3 pt-3 border-t border-slate-100 text-[12px]">
          <span className="text-slate-400">TTYB: <span className="font-bold text-brand-dark">{agency.ttyb}</span></span>
          <span className="text-slate-400">VKN: <span className="font-bold text-brand-dark">{agency.vkn}</span></span>
          <span className="ml-auto text-brand-blue font-semibold group-hover:underline">Подробнее →</span>
        </div>
      </div>
    </Link>
    </motion.div>
  );
}

// ─── Type Section ─────────────────────────────────────────────────────────────
function TypeSection({ type, agencies }: { type: AgencyType; agencies: Agency[] }) {
  const cfg = TYPE_CONFIG[type];
  if (agencies.length === 0) return null;

  return (
    <section className="mb-12">
      <motion.div variants={fadeUp}
        className={`flex items-center gap-4 mb-5 pb-4 border-b-2 ${cfg.border}`}>
        <div className={`w-11 h-11 ${cfg.bg} border ${cfg.border} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
          {cfg.icon}
        </div>
        <div>
          <h2 className={`text-2xl font-extrabold ${cfg.color}`}>{cfg.labelRu}</h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            {agencies.length}&nbsp;{agencies.length === 1 ? 'организация' : agencies.length < 5 ? 'организации' : 'организаций'}
          </p>
        </div>
      </motion.div>

      <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-4">
        {agencies.map((agency) => <AgencyCard key={agency.id} agency={agency} />)}
      </motion.div>
    </section>
  );
}

// ─── Filter chip ──────────────────────────────────────────────────────────────
function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 whitespace-nowrap ${
        active
          ? 'bg-brand-blue text-white border-brand-blue shadow-md'
          : 'bg-white text-slate-600 border-slate-200 hover:border-brand-blue hover:text-brand-blue'
      }`}>
      {children}
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AgenciesPage() {
  const { t } = useTranslation();
  const [agencies, setAgencies]       = useState<Agency[]>([]);
  const [search, setSearch]           = useState('');
  const [activeType, setActiveType]   = useState<AgencyType | 'ALL'>('ALL');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [cityFilter, setCityFilter]   = useState('');
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    getAgencies().then(setAgencies).catch(() => {}).finally(() => setLoading(false));
  }, []);

  // Unique cities from loaded agencies
  const cities = Array.from(new Set(agencies.map(a => a.city).filter(Boolean) as string[])).sort();

  // Active filter count (for badge)
  const filterCount = [
    activeType !== 'ALL', verifiedOnly, !!cityFilter,
  ].filter(Boolean).length;

  const resetFilters = () => {
    setActiveType('ALL'); setVerifiedOnly(false); setCityFilter(''); setSearch('');
  };

  const filtered = agencies.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch = !search || a.name.toLowerCase().includes(q) || (a.city ?? '').toLowerCase().includes(q) || (a.description ?? '').toLowerCase().includes(q);
    const matchType   = activeType === 'ALL' || a.agencyType === activeType;
    const matchVerify = !verifiedOnly || a.status === 'VERIFIED';
    const matchCity   = !cityFilter   || a.city === cityFilter;
    return matchSearch && matchType && matchVerify && matchCity;
  });

  const grouped = TYPE_ORDER.reduce<Record<AgencyType, Agency[]>>((acc, type) => {
    acc[type] = filtered.filter((a) => a.agencyType === type);
    return acc;
  }, { AGENCY: [], DEVELOPER: [], REALTOR: [] });

  const totalCount = filtered.length;

  return (
    <div className="min-h-screen bg-brand-light font-[family-name:var(--font-geist-sans)] selection:bg-brand-blue/20">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative bg-brand-dark text-white py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob absolute -top-16 left-1/4 w-96 h-96 rounded-full bg-brand-blue/15 blur-3xl" />
          <div className="blob blob-delay-2 absolute top-8 right-1/3 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h1 variants={fadeUp} initial="hidden" animate="show"
            className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
            {t('agencies.hero_title')}
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.1 }}
            className="text-slate-400 mb-8 max-w-2xl leading-relaxed">
            {t('agencies.hero_desc')}
          </motion.p>

          {/* Search */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.18 }}
            className="flex flex-col md:flex-row gap-3 max-w-2xl">
            <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder={t('agencies.search_placeholder')}
                className="w-full pl-11 pr-5 py-3.5 rounded-xl text-brand-dark font-medium outline-none
                           focus:ring-4 focus:ring-brand-blue/40 shadow-lg text-sm" />
            </div>
            <button className="primary-button px-7 py-3.5 text-sm whitespace-nowrap shadow-lg">
              {t('agencies.search_btn')}
            </button>
          </motion.div>

          {/* Stats strip */}
          {!loading && (
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.28 }}
              className="flex flex-wrap gap-6 mt-8 text-sm">
              {TYPE_ORDER.map((type) => {
                const cfg = TYPE_CONFIG[type];
                const count = agencies.filter(a => a.agencyType === type).length;
                return (
                  <div key={type} className="flex items-center gap-2 text-slate-300">
                    <span>{cfg.icon}</span>
                    <span className="font-bold text-white">{count}</span>
                    <span>{cfg.labelRu}</span>
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Filter bar ────────────────────────────────────────────────────────── */}
      <div className="sticky top-[64px] z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-3 flex flex-wrap items-center gap-3">

          {/* Type chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <FilterChip active={activeType === 'ALL'} onClick={() => setActiveType('ALL')}>
              Все типы
            </FilterChip>
            {TYPE_ORDER.map((type) => {
              const cfg = TYPE_CONFIG[type];
              const count = agencies.filter(a => a.agencyType === type).length;
              return (
                <FilterChip key={type} active={activeType === type} onClick={() => setActiveType(activeType === type ? 'ALL' : type)}>
                  {cfg.icon} {cfg.labelRu}
                  <span className={`ml-1 text-[11px] font-bold px-1.5 py-0.5 rounded-full ${
                    activeType === type ? 'bg-white/20' : 'bg-slate-100 text-slate-500'
                  }`}>{count}</span>
                </FilterChip>
              );
            })}
          </div>

          <div className="h-5 w-px bg-slate-200 hidden lg:block" />

          {/* City select */}
          {cities.length > 0 && (
            <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}
              className={`px-3 py-2 rounded-xl text-sm font-semibold border outline-none cursor-pointer transition ${
                cityFilter
                  ? 'bg-brand-blue text-white border-brand-blue'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-brand-blue'
              }`}>
              <option value="">Все города</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          )}

          {/* Verified only toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none group ml-1">
            <div onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                verifiedOnly ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 group-hover:border-emerald-500'
              }`}>
              {verifiedOnly && (
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="text-sm font-semibold text-slate-600 group-hover:text-emerald-600 transition">TTYB ✓ Только верифицированные</span>
          </label>

          {/* Reset */}
          {filterCount > 0 && (
            <button onClick={resetFilters}
              className="ml-auto flex items-center gap-1.5 text-sm font-semibold text-red-500 hover:text-red-700 transition">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Сбросить
              <span className="bg-red-100 text-red-500 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {filterCount}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 py-10">

        {/* Result count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-slate-500 text-sm">
            {search
              ? <>По запросу <span className="font-bold text-brand-dark">«{search}»</span>: </>
              : null}
            <span className="font-bold text-brand-dark">{totalCount}</span>{' '}
            {totalCount === 1 ? 'организация' : totalCount < 5 ? 'организации' : 'организаций'}
          </p>
          <select className="bg-white border border-slate-200 text-sm font-semibold text-brand-dark
                             rounded-xl py-2 px-3 outline-none cursor-pointer shadow-sm hover:bg-slate-50 transition">
            <option>{t('agencies.sort_listings')}</option>
            <option>{t('agencies.sort_rating')}</option>
          </select>
        </div>

        {/* Skeleton */}
        {loading && (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, i) => <SkeletonAgency key={i} />)}
          </div>
        )}

        {/* Empty */}
        {!loading && totalCount === 0 && (
          <div className="text-center py-24 text-slate-400">
            <div className="text-5xl mb-4">{search ? '🔍' : '🏢'}</div>
            <p className="text-lg font-semibold text-slate-600">
              {search ? 'Ничего не найдено' : 'Организации ещё не добавлены'}
            </p>
            {(search || filterCount > 0) && (
              <button onClick={resetFilters} className="mt-3 text-sm text-brand-blue font-semibold hover:underline">
                Сбросить все фильтры
              </button>
            )}
          </div>
        )}

        {/* Grouped list */}
        {!loading && totalCount > 0 && (
          <motion.div variants={stagger} initial="hidden" animate="show">
            {TYPE_ORDER.map((type) => (
              <TypeSection key={type} type={type} agencies={grouped[type]} />
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}
