"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Header from '../../../components/Header';
import { type Listing, formatPrice, getListingLocation, getListing } from '../../../lib/api';

const PropertyMap = dynamic(() => import('../../../components/PropertyMap'), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09 } },
};

// ─── Spec box ────────────────────────────────────────────────────────────────
function SpecBox({ label, value }: { label: string; value: string }) {
  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-1 bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition">
      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{label}</span>
      <span className="text-xl font-extrabold text-brand-dark">{value}</span>
    </motion.div>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function PropertySkeleton() {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="w-full h-[480px] skeleton rounded-2xl" />
          <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col gap-4">
            <div className="skeleton h-8 w-3/4 rounded-lg" />
            <div className="skeleton h-4 w-1/2 rounded" />
            <div className="grid grid-cols-4 gap-4 py-4">
              {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-16 rounded-xl" />)}
            </div>
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-5/6 rounded" />
            <div className="skeleton h-4 w-4/6 rounded" />
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-4">
          <div className="skeleton h-80 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PropertyDetailsPage() {
  const params = useParams();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const id = params?.id as string;
    if (!id) return;
    getListing(id)
      .then(setListing)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [params?.id]);

  const handlePhone = () => {
    const phone = listing?.agency?.phone ?? '905550000000';
    alert(`Phone: +${phone}`);
  };

  const handleWhatsApp = () => {
    const phone = listing?.agency?.phone ?? '905550000000';
    const msg = encodeURIComponent(`Здравствуйте! Меня интересует объект: ${listing?.title ?? ''} (ID: ${listing?.id})`);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  if (loading) return <PropertySkeleton />;

  if (notFound || !listing) {
    return (
      <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center gap-4">
        <div className="text-6xl">🏚️</div>
        <p className="text-2xl font-bold text-brand-dark">Объект не найден</p>
        <Link href="/" className="text-brand-blue hover:underline font-medium">← На главную</Link>
      </div>
    );
  }

  const location = getListingLocation(listing);
  const locationParts = location.split(', ');

  const propTypeGradients: Record<string, string> = {
    APARTMENT: 'from-blue-100 via-slate-100 to-indigo-50',
    VILLA:     'from-emerald-100 via-slate-100 to-teal-50',
    COMMERCIAL:'from-amber-100 via-slate-100 to-orange-50',
    LAND:      'from-lime-100 via-slate-100 to-green-50',
  };
  const gradient = propTypeGradients[listing.propertyType] ?? 'from-slate-200 via-slate-100 to-blue-50';

  return (
    <div className="min-h-screen bg-brand-light font-[family-name:var(--font-geist-sans)]">

      {/* ── Breadcrumb header ───────────────────────── */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-10">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-brand-dark">
            Turk<span className="text-brand-blue">Estate</span>
          </Link>
          <div className="hidden md:flex gap-3 text-sm text-slate-500 font-medium items-center">
            {locationParts.map((part, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="text-slate-300">/</span>}
                <span className={i === locationParts.length - 1 ? 'text-brand-dark font-semibold' : 'hover:text-brand-blue cursor-pointer transition'}>
                  {part}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* ── Left col ─────────────────────────────── */}
        <motion.div
          variants={stagger} initial="hidden" animate="show"
          className="lg:col-span-8 flex flex-col gap-6"
        >

          {/* Image gallery placeholder */}
          <motion.div
            variants={fadeUp}
            className={`w-full h-[420px] md:h-[500px] rounded-2xl bg-gradient-to-br ${gradient}
                        relative overflow-hidden border border-slate-200 cursor-pointer group shadow-sm`}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-40">
              <svg className="w-16 h-16 text-slate-400 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-slate-500 font-bold tracking-widest uppercase text-xs">Gallery</span>
            </div>

            {listing.vatandasligaUygun && (
              <div className="absolute top-4 left-4 bg-brand-blue text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md tracking-wide z-10">
                🇹🇷 Citizenship Eligible
              </div>
            )}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-brand-dark font-bold px-3 py-1.5 rounded-lg text-sm shadow-md z-10">
              {listing.propertyType}
            </div>
          </motion.div>

          {/* Detail card */}
          <motion.div variants={fadeUp} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">

            {/* Title & Price */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark mb-2 leading-tight">
                  {listing.title}
                </h2>
                <p className="text-base text-slate-500 flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {location}
                </p>
              </div>
              <div className="md:text-right flex flex-col md:items-end gap-2">
                <div className="text-3xl md:text-4xl font-extrabold text-brand-dark">
                  {formatPrice(listing.price, listing.currency)}
                </div>
                {listing.krediyeUygun && (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1 self-start md:self-end">
                    Ипотека ✓
                  </span>
                )}
              </div>
            </div>

            {/* Specs */}
            <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
              <SpecBox label="Общая площадь" value={`${listing.grossSquareMeters} m²`} />
              <SpecBox label="Жилая площадь"  value={`${listing.netSquareMeters} m²`} />
              <SpecBox label="Комнаты"         value={listing.rooms} />
              <SpecBox label="Этаж"            value={`${listing.floor} / ${listing.totalFloors}`} />
            </motion.div>

            {/* Details list */}
            <h3 className="text-lg font-extrabold text-brand-dark mb-4">Характеристики</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
              {[
                { label: 'Тапу', value: listing.tapuStatus.replace(/_/g, ' ') },
                { label: 'Возраст здания', value: listing.buildingAge === 0 ? 'Новостройка' : `${listing.buildingAge} лет` },
                { label: 'Искан (разрешение)',  value: listing.iskan ? '✓ Есть' : '✗ Нет', color: listing.iskan ? 'text-emerald-600' : 'text-slate-500' },
                { label: 'Ежемесячный айдат',  value: listing.aidat > 0 ? `₺ ${listing.aidat.toLocaleString('tr-TR')}` : 'Нет' },
                { label: 'Ипотека',             value: listing.krediyeUygun ? '✓ Доступна' : 'Нет', color: listing.krediyeUygun ? 'text-emerald-600' : 'text-slate-500' },
                { label: 'Санузлы',             value: String(listing.bathrooms) },
              ].map(({ label, value, color }) => (
                <li key={label} className="flex justify-between items-center py-2.5 border-b border-slate-100">
                  <span className="text-slate-500 text-sm">{label}</span>
                  <span className={`font-bold text-sm ${color ?? 'text-brand-dark'}`}>{value}</span>
                </li>
              ))}
            </ul>

            {/* Description */}
            <h3 className="text-lg font-extrabold text-brand-dark mb-3">Описание</h3>
            <p className="text-slate-600 leading-relaxed text-[15px]">{listing.description}</p>

            {/* Map */}
            {listing.latitude != null && listing.longitude != null && (
              <motion.div variants={fadeUp} className="mt-8">
                <h3 className="text-lg font-extrabold text-brand-dark mb-4">Расположение</h3>
                <PropertyMap lat={listing.latitude} lng={listing.longitude} title={listing.title} />
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* ── Right col (sticky panel) ──────────────── */}
        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card sticky top-24"
          >
            {/* Agency info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-100 to-blue-50 rounded-xl flex items-center justify-center font-extrabold text-brand-blue/50 text-lg border border-slate-100">
                {listing.agency?.name?.slice(0, 2).toUpperCase() ?? 'TR'}
              </div>
              <div>
                <h3 className="font-bold text-brand-dark leading-tight">
                  {listing.agency?.name ?? 'TurkEstate Agency'}
                </h3>
                {listing.agency?.status === 'VERIFIED' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full mt-1 tracking-wide">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    TTYB Verified
                  </span>
                )}
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 text-sm mb-6 border border-slate-100">
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-slate-500">Лицензия</span>
                <span className="font-bold text-brand-dark">{listing.agency?.ttyb ?? '—'}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-500">Агент</span>
                <span className="font-bold text-brand-dark">
                  {listing.agent ? `${listing.agent.firstName} ${listing.agent.lastName}` : listing.agency?.name ?? '—'}
                </span>
              </div>
            </div>

            {/* Price highlight */}
            <div className="bg-brand-blue/5 border border-brand-blue/15 rounded-xl p-4 mb-5 text-center">
              <div className="text-xs text-slate-500 font-medium mb-1">Стоимость объекта</div>
              <div className="text-2xl font-extrabold text-brand-dark">
                {formatPrice(listing.price, listing.currency)}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handlePhone}
                className="primary-button w-full py-3.5 flex items-center justify-center gap-2 text-[15px]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Показать телефон
              </button>

              <button
                onClick={handleWhatsApp}
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#128C7E] active:scale-[0.97] text-white rounded-xl
                           font-semibold transition-all duration-200 shadow-md hover:shadow-lg
                           flex items-center justify-center gap-2 text-[15px]"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center mt-4 leading-relaxed">
              Не переводите деньги до осмотра объекта и проверки документов
            </p>
          </motion.div>
        </div>

      </main>
    </div>
  );
}
