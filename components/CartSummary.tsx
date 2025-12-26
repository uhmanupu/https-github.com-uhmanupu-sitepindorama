
import React from 'react';
import { BookingState } from '../types';
import { TICKET_TYPES, ADD_ONS } from '../constants';

interface Props {
  booking: BookingState;
  onCheckout: () => void;
}

const CartSummary: React.FC<Props> = ({ booking, onCheckout }) => {
  const selectedTicket = TICKET_TYPES.find(t => t.id === booking.ticketType);
  const selectedAddOns = ADD_ONS.filter(a => booking.addOns.includes(a.id));
  const numDays = booking.selectedDates.length;
  
  // Calculate cost per day
  const dailyTicketCost = selectedTicket ? (selectedTicket.basePrice * booking.numAdults) + (selectedTicket.basePrice * 0.8 * booking.numChildren) : 0;
  // Apply "Buy 4 get 1 free" promo
  const effectiveDays = numDays >= 5 ? numDays - Math.floor(numDays / 5) : numDays;
  const ticketCost = dailyTicketCost * effectiveDays;
  
  // Add-ons are usually once per visit or per day? Let's assume per visitor for the whole trip.
  const addOnCost = selectedAddOns.reduce((acc, curr) => acc + curr.price, 0) * (booking.numAdults + booking.numChildren);
  const total = ticketCost + addOnCost;

  const isComplete = selectedTicket && booking.selectedDates.length > 0 && (booking.ticketType !== 'standard' || booking.selectedPark);

  return (
    <div className="glass-dark rounded-2xl shadow-2xl p-6 border border-white/10 space-y-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <h3 className="text-base font-bold text-white font-magic">Meu Pacote</h3>
        <span className="text-emerald-400 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-emerald-400/10 rounded-full">Ativo</span>
      </div>
      
      {!selectedTicket ? (
        <div className="py-8 text-center px-4 opacity-50">
          <p className="text-slate-500 text-xs italic">Escolha seus ingressos.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-3 glass rounded-xl border-white/5 space-y-3">
            <div className="flex justify-between items-start">
               <div className="space-y-0.5">
                  <h4 className="text-[9px] text-yellow-400 font-black uppercase">{selectedTicket.name}</h4>
                  <p className="text-white font-bold text-[10px]">{booking.numAdults} Ad. + {booking.numChildren} Cr.</p>
                  <p className="text-[10px] text-slate-400">{numDays} dia(s) selecionado(s)</p>
               </div>
               <div className="text-right">
                  <span className="font-bold text-xs text-white">R$ {ticketCost.toFixed(2)}</span>
                  {numDays >= 5 && <p className="text-[8px] text-emerald-400 font-bold uppercase">Promoção Aplicada! 🎁</p>}
               </div>
            </div>
            {booking.selectedDates.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2 border-t border-white/5 pt-2">
                {booking.selectedDates.sort().map(date => (
                  <span key={date} className="text-[8px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20 font-bold">
                    {new Date(date + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {selectedAddOns.length > 0 && (
            <div className="space-y-2">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest pl-1">Benefícios Extras</p>
              {selectedAddOns.map(addon => (
                <div key={addon.id} className="flex justify-between items-center text-[10px] p-2 glass rounded-lg border-white/5">
                  <span className="text-slate-400">{addon.name}</span>
                  <span className="text-white font-bold">R$ {(addon.price * (booking.numAdults + booking.numChildren)).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
        <div className="flex justify-between items-end">
          <span className="text-[9px] text-slate-500 uppercase font-black">Total</span>
          <span className="text-xl font-black text-yellow-400 tracking-tighter">
            R$ {total.toFixed(2)}
          </span>
        </div>
      </div>

      <button 
        disabled={!isComplete}
        onClick={onCheckout}
        className={`w-full py-3 rounded-xl font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
          !isComplete
            ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-40'
            : 'bg-yellow-500 text-black hover:bg-yellow-400 active:scale-95'
        }`}
      >
        <span>{isComplete ? 'Fechar Reserva' : 'Pendente'}</span>
        {isComplete && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
      </button>
    </div>
  );
};

export default CartSummary;
