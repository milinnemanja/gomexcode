
import React, { useState, useEffect, useMemo } from 'react';
import { ViewMode, Product } from './types';
import { storageService } from './services/storageService';
import ProductList from './components/ProductList';
import AdminPanel from './components/AdminPanel';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LoginForm from './components/LoginForm';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Initial load
  useEffect(() => {
    setProducts(storageService.getProducts());
    // Provera da li je sesija aktivna (opciono, za sada samo state)
    const savedAuth = sessionStorage.getItem('admin_auth');
    if (savedAuth === 'true') {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const refreshProducts = () => {
    setProducts(storageService.getProducts());
  };

  const handleAddProduct = (name: string, code: string, category: string) => {
    storageService.addProduct(name, code, category);
    refreshProducts();
  };

  const handleDeleteProduct = (id: string) => {
    storageService.deleteProduct(id);
    refreshProducts();
  };

  const handleLogin = (user: string, pass: string) => {
    if (user === 'admin' && pass === 'nemanja023') {
      setIsAdminLoggedIn(true);
      setLoginError('');
      sessionStorage.setItem('admin_auth', 'true');
    } else {
      setLoginError('Pogrešno korisničko ime ili lozinka.');
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('admin_auth');
    setView('home');
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    const q = searchQuery.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.code.includes(q) ||
      (p.category && p.category.toLowerCase().includes(q))
    );
  }, [products, searchQuery]);

  const renderContent = () => {
    switch (view) {
      case 'home':
        return <Home onStart={() => setView('search')} />;
      case 'search':
        return <ProductList products={filteredProducts} />;
      case 'admin':
        if (!isAdminLoggedIn) {
          return <LoginForm onLogin={handleLogin} error={loginError} />;
        }
        return (
          <div className="relative">
            <div className="flex justify-end p-4 pb-0">
               <button 
                onClick={handleLogout}
                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 flex items-center gap-1.5 transition-colors"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                 Odjavi se
               </button>
            </div>
            <AdminPanel 
              products={products} 
              onAdd={handleAddProduct} 
              onDelete={handleDeleteProduct} 
            />
          </div>
        );
      default:
        return <Home onStart={() => setView('search')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-2xl mx-auto bg-white shadow-2xl overflow-hidden border-x border-slate-100">
      {/* Dynamic Header */}
      <header className="bg-white border-b border-slate-100 p-4 sticky top-0 z-30 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight cursor-pointer" onClick={() => setView('home')}>
            Gomex<span className="text-orange-500">Code</span>
          </h1>
          <div className="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">
            {products.length} {products.length === 1 ? 'Artikal' : products.length < 5 ? 'Artikla' : 'Artikala'}
          </div>
        </div>

        {view === 'search' && (
          <div className="relative group animate-in slide-in-from-top-2 duration-300">
            <input
              type="text"
              placeholder="Pretraži po nazivu ili kodu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-lg font-semibold outline-none text-slate-800 placeholder:text-slate-400"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors"
              xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-200 text-slate-600 hover:bg-orange-500 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            )}
          </div>
        )}
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto pb-28 bg-slate-50/30">
        {renderContent()}
      </main>

      {/* Bottom Navbar */}
      <Navbar currentView={view} setView={setView} />
    </div>
  );
};

export default App;
