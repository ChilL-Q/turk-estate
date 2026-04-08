import React from 'react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-white text-brand-dark selection:bg-brand-blue/20">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
           <Link href="/" className="text-xl font-bold tracking-tight text-brand-dark">
              Turk<span className="text-brand-blue">Estate</span>
              <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded border border-slate-200 uppercase tracking-widest">Pro</span>
           </Link>
        </div>
        <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
           <a href="#" className="px-4 py-2.5 bg-brand-blue/10 text-brand-blue rounded-lg font-semibold transition">Overview</a>
           <a href="#" className="px-4 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-brand-dark rounded-lg font-medium transition">My Listings</a>
           <a href="#" className="px-4 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-brand-dark rounded-lg font-medium transition">Agents Management</a>
           <a href="#" className="px-4 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-brand-dark rounded-lg font-medium transition">XML Feeds Import</a>
           <a href="#" className="px-4 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-brand-dark rounded-lg font-medium transition">Company Settings</a>
        </nav>
        <div className="p-5 border-t border-slate-200 bg-slate-50/50">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-white border border-slate-200 shadow-sm rounded-full flex items-center justify-center font-bold text-slate-500">EB</div>
             <div>
               <div className="text-sm font-bold text-brand-dark">Elite Brokers</div>
               <div className="text-xs text-slate-500 font-medium">Agency Admin</div>
             </div>
           </div>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Topbar Mock */}
        <div className="h-16 md:hidden border-b border-slate-200 flex items-center px-4">
           <div className="font-bold text-lg">Pro Panel</div>
        </div>
        {children}
      </main>
    </div>
  );
}
