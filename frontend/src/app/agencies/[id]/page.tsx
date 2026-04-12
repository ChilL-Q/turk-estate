"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import {
  type Agency, type AgencyType, type Listing,
  getAgency, getListingsByAgency, formatPrice, getListingLocation,
} from '../../../lib/api';

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

// ─── Type config ──────────────────────────────────────────────────────────────
const TYPE_CONFIG: Record<AgencyType, {
  labelRu: string; icon: string; color: string; bg: string; border: string;
  heroFrom: string; heroTo: string;
}> = {
  AGENCY:    { labelRu: 'Агентство недвижимости', icon: '🏢', color: 'text-brand-blue',   bg: 'bg-blue-50',    border: 'border-blue-200',   heroFrom: 'from-blue-900',    heroTo: 'to-slate-900' },
  DEVELOPER: { labelRu: 'Компания-застройщик',    icon: '🏗️', color: 'text-amber-700',   bg: 'bg-amber-50',   border: 'border-amber-200',  heroFrom: 'from-amber-900',   heroTo: 'to-slate-900' },
  REALTOR:   { labelRu: 'Частный риелтор',         icon: '🧑‍💼', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', heroFrom: 'from-emerald-900', heroTo: 'to-slate-900' },
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function PageSkeleton() {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="h-64 skeleton w-full" />
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-6">
        <div className="skeleton h-8 w-64 rounded-xl" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[1,2,3].map(i => <div key={i} className="skeleton h-24 rounded-2xl" />)}
        </div>
      </div>
    </div>
  );
}

// ─── Listing mini-card ────────────────────────────────────────────────────────
function ListingCard({ listing }: { listing: Listing }) {
  const gradients: Record<string, string> = {
    APARTMENT:  'from-blue-100 to-blue-50',
    VILLA:      'from-emerald-100 to-emerald-50',
    COMMERCIAL: 'from-amber-100 to-amber-50',
    LAND:       'from-orange-100 to-orange-50',
  };

  return (
    <motion.div variants={fadeUp}>
      <Link href={`/property/${listing.id}`}
        className="bg-white border border-slate-200 rounded-2xl overflow-hidden card-hover block group">
        {/* Image placeholder */}
        <div className={`w-full h-44 bg-gradient-to-br ${gradients[listing.propertyType] ?? 'from-slate-100 to-slate-50'} relative`}>
          <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-brand-dark text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/60">
            {listing.propertyType}
          </div>
          {listing.vatandasligaUygun && (
            <div className="absolute top-3 right-3 bg-brand-blue text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              CITIZENSHIP
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="text-brand-dark font-extrabold text-lg mb-0.5">{formatPrice(listing.price, listing.currency)}</div>
          <div className="text-slate-700 font-semibold text-sm mb-1 line-clamp-1">{listing.title}</div>
          <div className="text-slate-400 text-[12px] flex items-center gap-1 mb-3">
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {getListingLocation(listing)}
          </div>
          <div className="flex gap-2 flex-wrap">
            {listing.rooms && listing.rooms !== '-' && (
              <span className="bg-slate-50 text-slate-600 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-slate-200">{listing.rooms}</span>
            )}
            <span className="bg-slate-50 text-slate-600 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-slate-200">{listing.grossSquareMeters} m²</span>
            {listing.iskan && (
              <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">İskan ✓</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Info row ─────────────────────────────────────────────────────────────────
function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
      <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-slate-500">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-brand-dark">{value}</p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AgencyPage() {
  const { id } = useParams<{ id: string }>();
  const [agency, setAgency]     = useState<Agency | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(false);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      getAgency(id),
      getListingsByAgency(id).catch(() => []),
    ])
      .then(([ag, ls]) => { setAgency(ag); setListings(ls); })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <><Header /><PageSkeleton /></>;

  if (error || !agency) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-brand-light flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4">🏢</div>
            <p className="text-xl font-bold text-brand-dark mb-2">Агентство не найдено</p>
            <Link href="/agencies" className="text-brand-blue font-semibold hover:underline">← Вернуться к каталогу</Link>
          </div>
        </div>
      </>
    );
  }

  const cfg = TYPE_CONFIG[agency.agencyType];
  const initials = agency.name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();

  return (
    <div className="min-h-screen bg-brand-light font-[family-name:var(--font-geist-sans)]">
      <Header />

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className={`relative bg-gradient-to-br ${cfg.heroFrom} ${cfg.heroTo} text-white overflow-hidden`}>
        {/* Blob */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob absolute -top-20 right-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="blob blob-delay-2 absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto px-6 py-14 relative z-10">
          <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col md:flex-row gap-8 items-start">

            {/* Logo */}
            <motion.div variants={fadeUp}
              className={`w-24 h-24 ${cfg.bg} border-2 ${cfg.border} rounded-2xl flex items-center justify-center
                           font-extrabold text-3xl flex-shrink-0 shadow-xl`}>
              <span className={cfg.color}>{initials}</span>
            </motion.div>

            <div className="flex-1">
              {/* Breadcrumb */}
              <motion.div variants={fadeUp} className="flex items-center gap-2 text-white/50 text-sm mb-3">
                <Link href="/agencies" className="hover:text-white transition">Агентства</Link>
                <span>/</span>
                <span className="text-white/80">{agency.name}</span>
              </motion.div>

              {/* Name + badges */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{agency.name}</h1>
                {agency.status === 'VERIFIED' && (
                  <svg className="w-7 h-7 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </motion.div>

              {/* Type + city */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`flex items-center gap-1.5 ${cfg.bg} ${cfg.color} border ${cfg.border} px-3 py-1 rounded-full text-sm font-bold`}>
                  {cfg.icon} {cfg.labelRu}
                </span>
                {agency.status === 'VERIFIED' && (
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-sm font-bold">
                    TTYB ✓ Верифицировано
                  </span>
                )}
                {agency.city && (
                  <span className="text-white/60 text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {agency.city}
                  </span>
                )}
              </motion.div>

              {/* Description */}
              {agency.description && (
                <motion.p variants={fadeUp} className="text-white/70 leading-relaxed max-w-2xl">
                  {agency.description}
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left — listings ──────────────────────────────────── */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-extrabold text-brand-dark mb-5">
            Объекты агентства
            {listings.length > 0 && (
              <span className="ml-2 text-sm font-semibold text-slate-400">({listings.length})</span>
            )}
          </h2>

          {listings.length === 0 ? (
            <div className="text-center py-16 text-slate-400 bg-white rounded-2xl border border-slate-200">
              <div className="text-4xl mb-3">🏠</div>
              <p className="font-semibold text-slate-500">Объекты пока не добавлены</p>
            </div>
          ) : (
            <motion.div variants={stagger} initial="hidden" animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {listings.map((l) => <ListingCard key={l.id} listing={l} />)}
            </motion.div>
          )}
        </div>

        {/* Right — details sidebar ──────────────────────────── */}
        <div className="flex flex-col gap-5">

          {/* Contact card */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-extrabold text-brand-dark mb-4 pb-3 border-b border-slate-100">Контакты</h3>

            {agency.email && (
              <InfoRow
                icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                label="Email"
                value={agency.email}
              />
            )}
            {agency.phone && (
              <InfoRow
                icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                label="Телефон"
                value={agency.phone}
              />
            )}
            {agency.city && (
              <InfoRow
                icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                label="Город"
                value={agency.city}
              />
            )}

            {agency.phone && (
              <a
                href={`https://wa.me/${agency.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Здравствуйте! Нашёл вас на TurkEstate и хочу узнать подробнее об объектах.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl
                           bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition shadow-md"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Написать в WhatsApp
              </a>
            )}
          </motion.div>

          {/* License card */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-extrabold text-brand-dark mb-4 pb-3 border-b border-slate-100">Лицензия</h3>
            <InfoRow
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
              label="TTYB (Лицензия риелтора)"
              value={agency.ttyb}
            />
            <InfoRow
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
              label="VKN (Налоговый номер)"
              value={agency.vkn}
            />
          </motion.div>

          {/* Back link */}
          <Link href="/agencies"
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-blue transition group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Вернуться к каталогу
          </Link>
        </div>
      </main>
    </div>
  );
}
