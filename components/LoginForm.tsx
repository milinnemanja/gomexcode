
import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (user: string, pass: string) => void;
  error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 animate-in fade-in zoom-in duration-300">
      <div className="w-full max-w-sm bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-50">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-orange-50 rounded-2xl text-orange-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Administracija</h2>
          <p className="text-slate-400 text-sm font-medium mt-1">Unesite podatke za pristup panelu</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Korisničko ime</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none font-bold text-slate-800 transition-all"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Lozinka</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none font-bold text-slate-800 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl text-center animate-shake">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl shadow-slate-200 active:scale-95 transition-all mt-4"
          >
            Prijavi se
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
