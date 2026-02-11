
import React from 'react';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="bg-slate-100 p-8 rounded-full mb-6 text-slate-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Nema rezultata</h3>
        <p className="text-slate-500 max-w-xs">Nismo pronašli artikle koji odgovaraju vašoj pretrazi.</p>
      </div>
    );
  }

  return (
    <div className="p-4 grid grid-cols-1 gap-3">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex justify-between items-center hover:border-orange-200 active:scale-[0.98] transition-all"
        >
          <div className="flex-1">
            <span className="text-[10px] uppercase font-black tracking-widest text-orange-600 mb-1.5 block">
              {product.category || 'OPŠTE'}
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h3>
          </div>
          <div className="ml-4 bg-slate-900 text-white px-5 py-4 rounded-2xl text-center min-w-[110px] shadow-lg shadow-slate-200">
            <span className="text-[10px] block font-black uppercase opacity-60 tracking-widest mb-1">PLU Kod</span>
            <span className="text-3xl font-black tracking-tighter leading-none">
              {product.code}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
