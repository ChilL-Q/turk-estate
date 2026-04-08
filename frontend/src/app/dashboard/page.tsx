"use client";

import React from 'react';

export default function DashboardPage() {
  return (
    <div className="flex-1 p-6 md:p-10 bg-slate-50 min-h-[calc(100vh)] font-[family-name:var(--font-geist-sans)] border-l border-slate-200">
      
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-brand-dark mb-1 tracking-tight">Agency Dashboard</h1>
          <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
            Welcome back, Elite Brokers 
            <span className="bg-emerald-100 text-emerald-700 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">TTYB Verified</span>
          </p>
        </div>
        <button onClick={() => alert("Connecting to Python FastAPI XML processor...")} className="primary-button text-sm py-2.5 px-5 shadow-sm whitespace-nowrap">+ Add Listing (XML)</button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
        {[
          { title: "Active Listings", value: "342", trend: "+12%" },
          { title: "Total Views", value: "14,592", trend: "+24%" },
          { title: "Saved to Favorites", value: "840", trend: "+5%" },
          { title: "WhatsApp Clicks", value: "156", trend: "+18%" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col hover:shadow-soft hover:border-slate-300 transition cursor-default">
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mb-3">{stat.title}</span>
            <div className="flex justify-between items-end gap-3 mt-auto">
              <span className="text-3xl font-extrabold text-brand-dark tracking-tight">{stat.value}</span>
              <span className="text-sm font-semibold text-emerald-600 mb-1 flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 rounded">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-end mb-4">
        <h2 className="text-lg font-bold text-brand-dark">Recent Listings</h2>
        <span onClick={() => alert("Loading full pagination table via Elasticsearch...")} className="text-sm text-brand-blue font-medium cursor-pointer hover:underline">View All</span>
      </div>

      {/* Feed Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
              <th className="p-4 font-semibold pl-6">Property Title</th>
              <th className="p-4 font-semibold">Location</th>
              <th className="p-4 font-semibold">Price</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right pr-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-brand-dark divide-y divide-slate-100">
            <tr className="hover:bg-slate-50/50 transition">
               <td className="p-4 pl-6 font-semibold text-brand-dark">3+1 Luxury Apartment</td>
               <td className="p-4 text-slate-500">Istanbul, Kadıköy</td>
               <td className="p-4 font-semibold">₺14,500,000</td>
               <td className="p-4"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-[10px] font-bold tracking-widest">ACTIVE</span></td>
               <td className="p-4 pr-6 text-right"><span className="text-brand-blue hover:text-blue-800 cursor-pointer font-medium text-xs uppercase tracking-wider">Edit</span></td>
            </tr>
            <tr className="hover:bg-slate-50/50 transition">
               <td className="p-4 pl-6 font-semibold text-brand-dark">Villa 5+2 with Pool</td>
               <td className="p-4 text-slate-500">Antalya, Alanya</td>
               <td className="p-4 font-semibold">€1,200,000</td>
               <td className="p-4"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-[10px] font-bold tracking-widest">ACTIVE</span></td>
               <td className="p-4 pr-6 text-right"><span className="text-brand-blue hover:text-blue-800 cursor-pointer font-medium text-xs uppercase tracking-wider">Edit</span></td>
            </tr>
            <tr className="hover:bg-slate-50/50 transition">
               <td className="p-4 pl-6 font-semibold text-brand-dark">Commercial Office Space</td>
               <td className="p-4 text-slate-500">Izmir, Muratpaşa</td>
               <td className="p-4 font-semibold">₺8,900,000</td>
               <td className="p-4"><span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-[10px] font-bold tracking-widest">UNDER REVIEW</span></td>
               <td className="p-4 pr-6 text-right"><span className="text-brand-blue hover:text-blue-800 cursor-pointer font-medium text-xs uppercase tracking-wider">Edit</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
