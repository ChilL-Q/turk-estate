export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-[5px] border-slate-200 border-t-brand-blue rounded-full animate-spin"></div>
        <p className="text-brand-dark font-medium tracking-wide animate-pulse">
          Loading TurkEstate...
        </p>
      </div>
    </div>
  );
}
