
import React from 'react';
import { TICKET_TYPES, ADD_ONS, PARKS } from '../constants';
import { BookingState } from '../types';

interface Props {
  booking: BookingState;
  setBooking: React.Dispatch<React.SetStateAction<BookingState>>;
}

const TicketSelector: React.FC<Props> = ({ booking, setBooking }) => {
  const toggleAddOn = (id: string) => {
    setBooking(prev => ({
      ...prev,
      addOns: prev.addOns.includes(id) 
        ? prev.addOns.filter(a => a !== id) 
        : [...prev.addOns, id]
    }));
  };

  const toggleDate = (date: string) => {
    setBooking(prev => ({
      ...prev,
      selectedDates: prev.selectedDates.includes(date)
        ? prev.selectedDates.filter(d => d !== date)
        : [...prev.selectedDates, date]
    }));
  };

  const next14Days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d.toISOString().split('T')[0];
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T12:00:00');
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(date);
  };

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr + 'T12:00:00');
    return new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(date);
  };

  return (
    <div className="space-y-10 lg:space-y-14">
      {/* Step 1: Ticket Type */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-3">
          <span className="bg-yellow-500 text-black w-6 h-6 rounded flex items-center justify-center text-[9px] font-black">01</span>
          Tipo de Ingresso
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {TICKET_TYPES.map(ticket => (
            <div 
              key={ticket.id}
              onClick={() => setBooking(prev => ({ ...prev, ticketType: ticket.id }))}
              className={`cursor-pointer group relative overflow-hidden rounded-2xl border transition-all glass flex flex-col ${
                booking.ticketType === ticket.id ? 'border-yellow-400 bg-yellow-400/5 ring-2 ring-yellow-400/10' : 'border-white/5 hover:border-white/10'
              }`}
            >
              <div className="h-32 overflow-hidden relative">
                <img src={ticket.image} alt={ticket.name} className="w-full h-full object-cover brightness-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-3 left-4">
                   <h3 className="text-lg font-bold text-white">{ticket.name}</h3>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <p className="text-slate-400 text-xs leading-tight line-clamp-2">{ticket.description}</p>
                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <div className="space-y-0.5">
                    <span className="text-[8px] text-slate-500 uppercase font-black">Preço/Dia</span>
                    <p className="text-base font-black text-yellow-400">R$ {ticket.basePrice.toFixed(2)}</p>
                  </div>
                  <span className="text-[8px] bg-white/5 px-2 py-1 rounded text-slate-400 uppercase font-bold">Unitário</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Step 2: Date Picker (Multi-select) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-3">
            <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-[9px] font-black">02</span>
            Datas da Visita
          </h2>
          {booking.selectedDates.length > 0 && (
            <span className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full font-bold">
              {booking.selectedDates.length} dia(s) selecionado(s)
            </span>
          )}
        </div>
        <div className="glass rounded-2xl p-4 border border-white/5">
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {next14Days.map(date => {
              const isSelected = booking.selectedDates.includes(date);
              return (
                <button
                  key={date}
                  onClick={() => toggleDate(date)}
                  className={`w-full py-2 rounded-xl border transition-all flex flex-col items-center justify-center gap-0.5 ${
                    isSelected 
                    ? 'bg-yellow-400 border-yellow-400 text-black font-bold scale-[1.02] shadow-lg' 
                    : 'glass border-white/5 text-slate-400 text-xs hover:border-white/10'
                  }`}
                >
                  <span className="text-[8px] uppercase font-black tracking-tighter">{getDayName(date)}</span>
                  <span className="text-sm font-black tracking-tighter">{formatDate(date).split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Step 3: Park Selection */}
      {booking.ticketType === 'standard' && (
        <section className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <h2 className="text-lg font-bold text-white flex items-center gap-3">
            <span className="bg-emerald-500 text-white w-6 h-6 rounded flex items-center justify-center text-[9px] font-black">03</span>
            Escolha o Parque
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {PARKS.map(park => (
              <div
                key={park.id}
                onClick={() => setBooking(prev => ({ ...prev, selectedPark: park.id }))}
                className={`cursor-pointer group rounded-xl border p-2 transition-all glass text-center ${
                  booking.selectedPark === park.id ? 'border-emerald-400 bg-emerald-400/10' : 'border-white/5 hover:border-white/10'
                }`}
              >
                <div className="relative overflow-hidden rounded-lg h-16 mb-2">
                   <img src={park.image} className="w-full h-full object-cover brightness-50" />
                </div>
                <h4 className={`font-bold text-[10px] leading-tight transition-colors ${booking.selectedPark === park.id ? 'text-emerald-400' : 'text-slate-300'}`}>{park.name}</h4>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Step 4: Visitors */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-3">
          <span className="bg-indigo-500 text-white w-6 h-6 rounded flex items-center justify-center text-[9px] font-black">0{booking.ticketType === 'standard' ? '4' : '3'}</span>
          Visitantes
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 glass rounded-xl border border-white/5">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-white">Adultos</p>
              <p className="text-[8px] text-slate-500 uppercase font-black">10+ Anos</p>
            </div>
            <div className="flex items-center bg-black/40 rounded-lg border border-white/10">
              <button 
                className="w-8 h-8 flex items-center justify-center hover:bg-white/5 text-sm text-yellow-400 font-bold"
                onClick={() => setBooking(prev => ({ ...prev, numAdults: Math.max(1, prev.numAdults - 1) }))}
              >-</button>
              <span className="w-6 text-center text-xs font-black text-white">{booking.numAdults}</span>
              <button 
                className="w-8 h-8 flex items-center justify-center hover:bg-white/5 text-sm text-yellow-400 font-bold"
                onClick={() => setBooking(prev => ({ ...prev, numAdults: prev.numAdults + 1 }))}
              >+</button>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 glass rounded-xl border border-white/5">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-white">Crianças</p>
              <p className="text-[8px] text-slate-500 uppercase font-black">3-9 Anos</p>
            </div>
            <div className="flex items-center bg-black/40 rounded-lg border border-white/10">
              <button 
                className="w-8 h-8 flex items-center justify-center hover:bg-white/5 text-sm text-blue-400 font-bold"
                onClick={() => setBooking(prev => ({ ...prev, numChildren: Math.max(0, prev.numChildren - 1) }))}
              >-</button>
              <span className="w-6 text-center text-xs font-black text-white">{booking.numChildren}</span>
              <button 
                className="w-8 h-8 flex items-center justify-center hover:bg-white/5 text-sm text-blue-400 font-bold"
                onClick={() => setBooking(prev => ({ ...prev, numChildren: prev.numChildren + 1 }))}
              >+</button>
            </div>
          </div>
        </div>
      </section>

      {/* Step 5: Add-ons */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-3">
          <span className="bg-pink-500 text-white w-6 h-6 rounded flex items-center justify-center text-[9px] font-black">0{booking.ticketType === 'standard' ? '5' : '4'}</span>
          Benefícios
        </h2>
        <div className="space-y-2">
          {ADD_ONS.map(addon => (
            <div 
              key={addon.id}
              onClick={() => toggleAddOn(addon.id)}
              className={`p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                booking.addOns.includes(addon.id) ? 'border-yellow-400 bg-yellow-400/5' : 'border-white/5 glass'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border flex items-center justify-center text-[10px] ${
                  booking.addOns.includes(addon.id) ? 'bg-yellow-400 text-black font-bold' : 'bg-black/40 border-white/10'
                }`}>
                  {booking.addOns.includes(addon.id) && "✓"}
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${booking.addOns.includes(addon.id) ? 'text-yellow-400' : 'text-white'}`}>{addon.name}</h4>
                </div>
              </div>
              <span className={`text-sm font-black ${booking.addOns.includes(addon.id) ? 'text-yellow-400' : 'text-white'}`}>R$ {addon.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TicketSelector;
