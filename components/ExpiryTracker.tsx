import React from 'react';
import { ExpiryItem } from '../types';

interface ExpiryTrackerProps {
  items: ExpiryItem[];
}

const ExpiryTracker: React.FC<ExpiryTrackerProps> = ({ items }) => {
  const getDaysDiff = (dateStr: string) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    const parts = dateStr.split('-');
    if (parts.length !== 3) return 0;
    
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; 
    const day = parseInt(parts[2], 10);
    
    const expiryDate = new Date(year, month, day);
    expiryDate.setHours(0, 0, 0, 0);

    const diffTime = expiryDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatus = (diffDays: number) => {
    if (diffDays < 0) return { color: 'bg-red-500', text: 'ISTEKLO', border: 'border-red-100', textCol: 'text-red-600', bg: 'bg-red-50' };
    if (diffDays <= 7) return { color: 'bg-orange-500', text: 'USKORO ISTIČE', border: 'border-orange-100', textCol: 'text-orange-600', bg: 'bg-orange-50' };
    return { color: 'bg-green-500', text: 'U ROKU', border: 'border-green-100', textCol: 'text-green-600', bg: 'bg-green-50' };
  };

  const getDaysLabel = (diffDays: number) => {
    if (diffDays === 0) return "Ističe danas";
    if (diffDays < 0) {
      const absDays = Math.abs(diffDays);
      return `Isteklo pre ${absDays} ${absDays === 1 ? 'dan' : 'dana'}`;
    }
    return `Još ${diffDays} ${diffDays === 1 ? 'dan' : 'dana'}`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    // Ulazni format je YYYY-MM-DD
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    // Izlaz: Dan.Mesec.Godina
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="p-4 space-y-3">
      {/* Legend / Info Section */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6 animate-in fade-in duration-500">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Legenda statusa</h3>
        <div className="space-y-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm shadow-green-200"></div>
            <p className="text-xs font-bold text-slate-600">Proizvodi u roku <span className="text-slate-400 font-medium">(zeleno)</span></p>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-sm shadow-orange-200"></div>
            <p className="text-xs font-bold text-slate-600">Proizvodi za prijavu <span className="text-slate-400 font-medium">(narandžasto, 7 dana pred istek)</span></p>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-200"></div>
            <p className="text-xs font-bold text-slate-600">Istekli proizvodi <span className="text-slate-400 font-medium">(crveno)</span></p>
          </div>
        </div>
      </div>

      <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] px-2 mb-4">Pregled artikala</h2>
      
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
          <div className="bg-slate-100 p-8 rounded-full mb-6 text-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Nema rokova</h3>
          <p className="text-slate-500 max-w-xs">Niste dodali nijedan artikal za praćenje roka trajanja.</p>
        </div>
      ) : (
        items.map((item) => {
          const diffDays = getDaysDiff(item.expiryDate);
          const status = getStatus(diffDays);
          const daysLabel = getDaysLabel(diffDays);
          
          return (
            <div 
              key={item.id} 
              className={`bg-white rounded-2xl p-5 shadow-sm border ${status.border} flex justify-between items-center transition-all animate-in fade-in slide-in-from-right-4`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${status.bg} ${status.textCol} tracking-widest uppercase`}>
                    {status.text}
                  </span>
                  <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">
                    {item.category}
                  </span>
                  {item.code && (
                    <span className="text-[10px] uppercase font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-lg border border-orange-100">
                      #{item.code}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                  {item.name}
                </h3>
                <p className={`text-[11px] font-bold mt-1 ${status.textCol} opacity-80 uppercase tracking-wider`}>
                  {daysLabel}
                </p>
              </div>
              <div className={`ml-4 ${status.color} text-white px-4 py-3 rounded-xl text-center min-w-[100px] shadow-lg`}>
                <span className="text-[10px] block font-black uppercase opacity-80 tracking-widest mb-0.5">Ističe</span>
                <span className="text-base font-black tracking-tight leading-none">
                  {formatDate(item.expiryDate)}
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ExpiryTracker;