
import React, { useState } from 'react';
import { Product } from '../types';

interface AdminPanelProps {
  products: Product[];
  onAdd: (name: string, code: string, category: string) => void;
  onDelete: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ products, onAdd, onDelete }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('Voće');
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code) return;
    onAdd(name, code, category);
    setName('');
    setCode('');
    setShowAddForm(false);
  };

  const confirmDelete = (id: string) => {
    if (deleteId === id) {
      onDelete(id);
      setDeleteId(null);
    } else {
      setDeleteId(id);
      // Automatically reset if they don't click again within 3 seconds
      setTimeout(() => setDeleteId(null), 3000);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Baza podataka</h2>
        <button 
          onClick={() => {
            setShowAddForm(!showAddForm);
            setDeleteId(null);
          }}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 ${
            showAddForm 
              ? 'bg-slate-200 text-slate-700' 
              : 'bg-orange-500 text-white shadow-xl shadow-orange-200 hover:bg-orange-600'
          }`}
        >
          {showAddForm ? 'Odustani' : '+ Novi artikal'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Naziv proizvoda</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="npr. Jabuka Zlatni Delišes"
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none font-bold text-slate-800"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">PLU Kod</label>
              <input
                type="number"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="4 cifre"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none font-bold text-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Kategorija</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none font-bold text-slate-800 appearance-none"
              >
                <option value="Voće">Voće</option>
                <option value="Povrće">Povrće</option>
                <option value="Mesara">Mesara</option>
                <option value="Piće">Piće</option>
                <option value="Pekara">Pekara</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-orange-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-200 active:scale-[0.97] transition-all hover:bg-orange-600 mt-2"
          >
            Sačuvaj u bazu
          </button>
        </form>
      )}

      <div className="space-y-3">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 mb-4">Inventar</h3>
        {products.length === 0 ? (
          <div className="text-center py-10 opacity-30 italic text-sm">Baza je prazna</div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center shadow-sm group hover:border-orange-100 transition-colors">
              <div className="flex-1">
                <h4 className="font-bold text-slate-900">{product.name}</h4>
                <p className="text-xs text-slate-400 font-medium">
                  Kod: <span className="font-bold text-orange-600">{product.code}</span> <span className="mx-1.5 opacity-30">•</span> {product.category}
                </p>
              </div>
              <div className="flex items-center">
                {deleteId === product.id && (
                  <span className="text-[10px] font-black uppercase text-red-500 mr-2 animate-pulse">Potvrdi?</span>
                )}
                <button 
                  onClick={() => confirmDelete(product.id)}
                  className={`p-2.5 rounded-xl transition-all flex items-center gap-2 ${
                    deleteId === product.id 
                      ? 'bg-red-500 text-white shadow-lg shadow-red-200' 
                      : 'text-slate-300 hover:text-red-500 hover:bg-red-50'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
