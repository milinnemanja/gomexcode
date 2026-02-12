import React from 'react';

interface HomeProps {
  onStart: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-black text-slate-300 mb-8 tracking-tighter opacity-50">
          Gomex<span className="text-orange-500/50">Code</span>
        </h1>
        
        <div className="space-y-4">
          <p className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Da ne moraš <br/> 
            da pamtiš,
          </p>
          <p className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
            ili da se šetaš.
          </p>
          <p className="text-4xl md:text-5xl font-black text-orange-500 leading-[1.1] tracking-tight pt-4">
            Šešir nakrivi, <br/>
            i sedi na kasi.
          </p>
          <p className="text-[11px] font-bold tracking-wide mt-2" style={{ color: '#ff4d00' }}>
            Unesi rokove, aplikacija će te obavestiti 7 dana pred istek prijavljenog roka.
          </p>
        </div>
      </div>
      
      <div className="w-full pt-12 pb-8 border-t border-slate-50">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
          Created by: <span className="text-slate-400">Nemanja Milin</span>
        </p>
      </div>
    </div>
  );
};

export default Home;