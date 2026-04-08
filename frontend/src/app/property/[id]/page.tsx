"use client";

import React from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';

export default function PropertyDetailsPage() {
  const handlePhone = () => alert("Agent Direct Verified Line: +90 (555) 000 00 00");
  const handleWhatsApp = () => alert("Triggering deep-link to WhatsApp: wa.me/905550000000...");

  return (
    <div className="min-h-screen bg-slate-50 font-[family-name:var(--font-geist-sans)] selection:bg-brand-blue/20">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-10">
          <Link href="/" className="text-2xl font-bold tracking-tight text-brand-dark flex gap-1 items-center cursor-pointer">
            Turk<span className="text-brand-blue">Estate</span>
          </Link>
          <div className="hidden md:flex gap-4 text-sm text-slate-500 font-medium">
            <span className="hover:text-brand-blue cursor-pointer transition">Istanbul</span>
            <span>&gt;</span>
            <span className="hover:text-brand-blue cursor-pointer transition">Kadıköy</span>
            <span>&gt;</span>
            <span className="text-brand-dark">Caddebostan</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
        
        {/* Left Column: Images & Details */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="w-full h-[400px] md:h-[500px] rounded-2xl bg-slate-200 relative overflow-hidden flex items-center justify-center border border-slate-200 hover:shadow-soft transition duration-500 cursor-pointer group">
             <span className="text-slate-400 font-bold tracking-widest uppercase group-hover:scale-105 transition duration-500">Property Image Gallery</span>
             <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-brand-dark font-semibold px-3 py-1.5 rounded-lg text-sm shadow-sm">
               1 / 14 Photos
             </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark mb-2 leading-tight">3+1 Luxury Apartment in Caddebostan</h2>
                <p className="text-base md:text-lg text-slate-500 flex items-center gap-2">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Istanbul, Kadıköy, Caddebostan Mah.
                </p>
              </div>
              <div className="md:text-right flex flex-col md:items-end w-full md:w-auto">
                <div className="text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight">₺ 14,500,000</div>
                <div className="text-[11px] font-bold text-brand-blue mt-2 border border-brand-blue/20 bg-brand-blue/5 rounded px-2 py-1 flex items-center gap-1 uppercase tracking-wider self-start md:self-end cursor-default">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Citizenship Eligible
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-slate-100 my-6">
              <div className="flex flex-col gap-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Gross Area</span>
                <span className="text-lg font-bold text-brand-dark">145 m²</span>
              </div>
              <div className="flex flex-col gap-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Net Area</span>
                <span className="text-lg font-bold text-brand-dark">120 m²</span>
              </div>
              <div className="flex flex-col gap-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Rooms</span>
                <span className="text-lg font-bold text-brand-dark">3+1</span>
              </div>
              <div className="flex flex-col gap-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Floor</span>
                <span className="text-lg font-bold text-brand-dark">4 / 12</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-brand-dark mb-4">Property Details</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-slate-600 mb-10 text-sm">
              <li className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Tapu Status</span>
                <span className="font-bold text-brand-dark">Kat Mülkiyeti</span>
              </li>
              <li className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Building Age</span>
                <span className="font-bold text-brand-dark">0 (New)</span>
              </li>
              <li className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Iskan (Occupancy)</span>
                <span className="font-bold text-emerald-600">Yes</span>
              </li>
              <li className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Monthly Aidat</span>
                <span className="font-bold text-brand-dark">₺ 2,500</span>
              </li>
              <li className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Eligible for Loan</span>
                <span className="font-bold text-emerald-600">Yes</span>
              </li>
            </ul>

            <h3 className="text-xl font-bold text-brand-dark mb-4">Description</h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              Incredible opportunity in the highly sought-after Caddebostan neighborhood. This newly built, luxurious 3+1 apartment features smart home systems, underfloor heating, and a spacious balcony with partial sea views. The building includes 24/7 security, an indoor parking garage, and a fitness center. Suitable for Turkish Citizenship by Investment programs. All documentation, including Iskan and Kat Mülkiyeti tapu, is completely ready for transfer.
            </p>
          </div>
        </div>

        {/* Right Column: Agency Sticky Panel */}
        <div className="lg:col-span-4 relative">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft sticky top-24">
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-200 font-extrabold text-slate-400 text-xl">
                RT
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-dark leading-tight">RealtyTR Agency</h3>
                <div className="flex items-center gap-1 mt-1.5">
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded tracking-widest uppercase">
                    TTYB Verified 
                  </span>
                  <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                </div>
              </div>
            </div>

            <div className="text-sm text-slate-600 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex justify-between border-b border-slate-200 pb-2 mb-2">
                <span>License No.</span>
                <span className="font-bold text-brand-dark">3400512</span>
              </div>
              <div className="flex justify-between pb-1">
                <span>Contact Agent</span>
                <span className="font-bold text-brand-dark">Elite Brokers</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button onClick={handlePhone} className="primary-button w-full py-4 shadow-md flex items-center justify-center gap-2 hover:-translate-y-0.5">
                <svg className="w-5 h-5 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Show Phone Number
              </button>
              <button onClick={handleWhatsApp} className="w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg font-semibold transition hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" clipRule="evenodd" /></svg>
                Message on WhatsApp
              </button>
            </div>
            
            <p className="text-[11px] text-slate-400 text-center mt-5 px-4 leading-relaxed">
              Never transfer money before viewing the property and verifying documents.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}
