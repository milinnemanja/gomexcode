
import React, { useState } from 'react';
import { Product, ExpiryItem } from '../types';

interface AdminPanelProps {
  products: Product[];
  expiryItems: ExpiryItem[];
  onAdd: (name: string, code: string, category: string) => void;
  onDelete: (id: string) => void;
  onAddExpiry: (name: string, code: string, date: string, category: string) => void;
  onDeleteExpiry: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  products, expiryItems, onAdd, onDelete, onAddExpiry, onDeleteExpiry 
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'expiry'>('products');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [category, setCategory] = useState('Voće');
  const [showAddForm, setShowAddForm] = useState(false);
  
  // States for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{id: string, name: string} | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'products') {
      if (!name || !code) return;
      onAdd(name, code, category);
    } else {
      if (!name || !expiryDate) return;
      onAddExpiry(name, code, expiryDate, category);
    }
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setCode('');
    setExpiryDate('');
    setShowAddForm(false);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}.${month}.${year}`;
  };

  const initiateDelete = (id: string, name: string) => {
    setItemToDelete({ id, name });
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      if (activeTab === 'products') {
        onDelete(itemToDelete.id);
      } else {
        onDeleteExpiry(itemToDelete.id);
      }
      setShowDeleteModal(false);
      setItemToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  return (
    <div className="p-4 space-y-6 pb-32">
      {/* Tab Switcher */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl">
        <button 
          onClick={() => { setActiveTab('products'); setShowAddForm(false); }}
          className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'products' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
        >
          Šifre (PLU)
        </button>
        <button 
          onClick={() => { setActiveTab('expiry'); setShowAddForm(false); }}
          className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'expiry' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
        >
          Rokovi
        </button>
      </div>

      <div className="flex justify-between items-center px-1">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          {activeTab === 'products' ? 'Baza Šifara' : 'Baza Rokova'}
        </h2>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 ${
            showAddForm 
              ? 'bg-slate-200 text-slate-700' 
              : 'bg-orange-500 text-white shadow-xl shadow-orange-200 hover:bg-orange-600'
          }`}
        >
          {showAddForm ? 'Odustani' : '+ Dodaj'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Naziv artikla</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="npr. Jogurt Moja Kravica"
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none font-bold text-slate-800"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                {activeTab === 'products' ? 'PLU Kod' : 'Šifra artikla (opciono)'}
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={activeTab === 'products' ? "4 cifre" : "npr. 12345"}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none font-bold text-slate-800"
                required={activeTab === 'products'}
              />
            </div>
            {activeTab === 'expiry' && (
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Datum isteka</label>
                <div className="relative">
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none font-bold text-slate-800"
                    required
                  />
                </div>
                {expiryDate && (
                  <span className="text-[10px] text-orange-600 mt-2 block font-black uppercase tracking-widest">
                    Prikaz: {formatDate(expiryDate)}
                  </span>
                )}
              </div>
            )}
            <div className={activeTab === 'products' ? 'col-span-1' : 'col-span-2'}>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Kategorija</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none font-bold text-slate-800 appearance-none"
              >
                <option value="Voće">Voće</option>
                <option value="Povrće">Povrće</option>
                <option value="Mesara">Mesara</option>
                <option value="Riba">Riba</option>
                <option value="Pekara">Pekara</option>
                <option value="Mlečni">Mlečni</option>
                <option value="Delikatesi">Delikatesi</option>
                <option value="Piće">Piće</option>
                <option value="Kafe">Kafe</option>
                <option value="Slatkiši">Slatkiši</option>
                <option value="Grickalice">Grickalice</option>
                <option value="Zamrznuto">Zamrznuto</option>
                <option value="Hemija">Hemija</option>
                <option value="Pakeraj">Pakeraj</option>
                <option value="Začini">Začini</option>
                <option value="Zdrava hrana">Zdrava hrana</option>
                <option value="Istaknuto na kasi">Istaknuto na kasi</option>
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
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 mb-4">Pregled unosa</h3>
        
        {activeTab === 'products' ? (
          products.length === 0 ? <EmptyState /> : products.map(p => (
            <ItemRow 
              key={p.id} 
              name={p.name} 
              info={`Kod: ${p.code}`} 
              category={p.category} 
              onDelete={() => initiateDelete(p.id, p.name)} 
            />
          ))
        ) : (
          expiryItems.length === 0 ? <EmptyState /> : expiryItems.map(i => (
            <ItemRow 
              key={i.id} 
              name={i.name} 
              info={`Rok: ${formatDate(i.expiryDate)} ${i.code ? `• Šifra: ${i.code}` : ''}`} 
              category={i.category} 
              onDelete={() => initiateDelete(i.id, i.name)} 
            />
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="text-center mb-6">
              <div className="inline-flex p-4 bg-red-50 rounded-3xl text-red-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Potvrdi brisanje</h3>
              <p className="text-slate-500 mt-2 text-sm">
                Da li ste sigurni da želite da izbrišete <br/>
                <span className="font-bold text-slate-800">"{itemToDelete?.name}"</span>?
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={handleConfirmDelete}
                className="w-full py-4 bg-red-500 text-white rounded-2xl font-black text-lg shadow-lg shadow-red-200 active:scale-95 transition-all"
              >
                Izbriši trajno
              </button>
              <button
                onClick={handleCancelDelete}
                className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-lg active:scale-95 transition-all"
              >
                Odustani
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EmptyState = () => <div className="text-center py-10 opacity-30 italic text-sm">Lista je prazna</div>;

const ItemRow = ({ name, info, category, onDelete }: any) => (
  <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center shadow-sm hover:border-orange-100 transition-colors">
    <div className="flex-1">
      <h4 className="font-bold text-slate-900">{name}</h4>
      <p className="text-xs text-slate-400 font-medium">
        <span className="font-bold text-orange-600">{info}</span> <span className="mx-1.5 opacity-30">•</span> {category}
      </p>
    </div>
    <div className="flex items-center">
      <button onClick={onDelete} className="p-2.5 rounded-xl transition-all text-slate-300 hover:text-red-500 hover:bg-red-50 active:scale-90">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
      </button>
    </div>
  </div>
);

export default AdminPanel;
