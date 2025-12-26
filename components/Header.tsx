
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="glass-dark border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="text-xl font-bold text-emerald-400 tracking-tighter flex items-center gap-2 cursor-pointer group">
            <span className="bg-emerald-600 text-white w-7 h-7 rounded flex items-center justify-center shadow-md group-hover:scale-105 transition-transform text-sm">P</span>
            <span className="font-magic text-white tracking-widest text-lg">PINDORAMA</span>
          </div>
          <nav className="hidden lg:flex items-center space-x-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-yellow-400 transition-colors">Parques</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Hospedagem</a>
            <a href="#" className="text-yellow-400 relative py-1">Ingressos</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Ofertas</a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors">Entrar</button>
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 cursor-pointer">
            <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
