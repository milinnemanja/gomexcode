
import React from 'react';
import { ViewMode } from '../types';

interface NavbarProps {
  currentView: ViewMode;
  setView: (view: ViewMode) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 pb-safe z-40 max-w-2xl mx-auto shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around h-20 px-4">
        <button 
          onClick={() => setView('home')}
          className={`flex flex-col items-center gap-1.5 transition-all flex-1 py-3 rounded-2xl ${
            currentView === 'home' ? 'text-orange-500' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-all ${currentView === 'home' ? 'bg-orange-50' : 'bg-transparent'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={currentView === 'home' ? "3" : "2"} strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest">Početna</span>
        </button>

        <button 
          onClick={() => setView('search')}
          className={`flex flex-col items-center gap-1.5 transition-all flex-1 py-3 rounded-2xl ${
            currentView === 'search' ? 'text-orange-500' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-all ${currentView === 'search' ? 'bg-orange-50' : 'bg-transparent'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={currentView === 'search' ? "3" : "2"} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest">Šifre</span>
        </button>

        <button 
          onClick={() => setView('dates')}
          className={`flex flex-col items-center gap-1.5 transition-all flex-1 py-3 rounded-2xl ${
            currentView === 'dates' ? 'text-orange-500' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-all ${currentView === 'dates' ? 'bg-orange-50' : 'bg-transparent'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={currentView === 'dates' ? "3" : "2"} strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest">Rokovi</span>
        </button>

        <button 
          onClick={() => setView('admin')}
          className={`flex flex-col items-center gap-1.5 transition-all flex-1 py-3 rounded-2xl ${
            currentView === 'admin' ? 'text-orange-500' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
           <div className={`p-1.5 rounded-xl transition-all ${currentView === 'admin' ? 'bg-orange-50' : 'bg-transparent'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={currentView === 'admin' ? "3" : "2"} strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest">Admin</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
