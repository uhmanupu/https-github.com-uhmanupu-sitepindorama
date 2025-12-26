
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TicketSelector from './components/TicketSelector';
import CartSummary from './components/CartSummary';
import ChatGuide from './components/ChatGuide';
import { BookingState } from './types';

const App: React.FC = () => {
  const [booking, setBooking] = useState<BookingState>({
    selectedDates: [],
    ticketType: null,
    numAdults: 2,
    numChildren: 0,
    addOns: [],
    selectedPark: null,
    status: 'planning'
  });

  const handleCheckout = () => {
    setBooking(prev => ({ ...prev, status: 'checkout' }));
    setTimeout(() => {
      setBooking(prev => ({ ...prev, status: 'success' }));
    }, 1500);
  };

  const resetBooking = () => {
    setBooking({
      selectedDates: [],
      ticketType: null,
      numAdults: 2,
      numChildren: 0,
      addOns: [],
      selectedPark: null,
      status: 'planning'
    });
  };

  if (booking.status === 'success') {
    return (
      <div className="min-h-screen bg-[#020d02] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="glass rounded-3xl p-8 max-w-md w-full space-y-6 animate-in zoom-in duration-300">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-3xl mx-auto shadow-lg">✓</div>
          <h1 className="text-2xl font-magic">Reserva Confirmada!</h1>
          <p className="text-slate-400 text-xs">
            Seus ingressos para {booking.selectedDates.length} dia(s) foram emitidos e enviados para o seu e-mail.
          </p>
          <div className="bg-black/20 p-4 rounded-xl text-left">
            <p className="text-[10px] text-slate-500 uppercase font-black mb-2">Datas Confirmadas</p>
            <div className="flex flex-wrap gap-2">
              {booking.selectedDates.map(date => (
                <span key={date} className="text-[10px] bg-white/5 px-2 py-1 rounded border border-white/10">
                  {new Date(date + 'T12:00:00').toLocaleDateString('pt-BR')}
                </span>
              ))}
            </div>
          </div>
          <button 
            onClick={resetBooking}
            className="w-full py-3 bg-yellow-500 text-black rounded-xl font-black text-sm hover:bg-yellow-400 transition-all"
          >
            Nova Reserva
          </button>
        </div>
      </div>
    );
  }

  if (booking.status === 'checkout') {
    return (
      <div className="min-h-screen bg-[#020d02] text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <h2 className="text-xl font-magic">Processando Magia...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020d02] text-slate-100 flex flex-col selection:bg-yellow-400 selection:text-black scrollbar-hide">
      <Header />
      
      <main className="flex-1 pb-10">
        <Hero />
        
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center space-x-6 mb-10 border-b border-white/5 pb-4 overflow-hidden">
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="w-4 h-4 rounded-full bg-yellow-400 text-black flex items-center justify-center text-[8px] font-black">1</span>
              <span className="text-[9px] font-black text-yellow-400 uppercase tracking-widest">Reserva</span>
            </div>
            <div className="flex items-center gap-2 opacity-30 flex-shrink-0">
              <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-[8px] font-black">2</span>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Pagamento</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 xl:col-span-8 space-y-12">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-magic text-white">Configure sua <span className="text-emerald-400">Jornada</span></h2>
                <p className="text-slate-400 text-xs max-w-xl font-light">
                  Combine parques e selecione as datas desejadas para sua visita perfeita.
                </p>
              </div>
              
              <TicketSelector booking={booking} setBooking={setBooking} />
              
              <div className="p-6 bg-emerald-900/40 rounded-3xl border border-emerald-500/10 text-white relative overflow-hidden backdrop-blur-md">
                <div className="relative z-10 space-y-3">
                  <h3 className="text-lg font-magic">Dica Mágica</h3>
                  <p className="text-xs text-emerald-100/80 font-light leading-relaxed">
                    Compre 4 dias e ganhe o 5º dia grátis! No <span className="font-bold text-yellow-400">Pindorama</span>, a diversão não tem limites.
                  </p>
                </div>
              </div>
            </div>
            
            <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-20 h-fit">
              <CartSummary booking={booking} onCheckout={handleCheckout} />
            </aside>
          </div>
        </div>
      </main>

      <footer className="bg-black/60 border-t border-white/5 text-slate-500 py-10 px-4 text-center">
        <div className="max-w-6xl mx-auto space-y-4">
           <div className="text-lg font-magic text-white tracking-widest uppercase">PINDORAMA</div>
           <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">© 2025 Pindorama Park Group</p>
        </div>
      </footer>

      <ChatGuide />
    </div>
  );
};

export default App;
