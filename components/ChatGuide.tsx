
import React, { useState, useRef, useEffect } from 'react';
import { getMagicalGuideResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Saudações, viajante! Sou o Guia Mágico do Pindorama. Como posso iluminar seu planejamento hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const response = await getMagicalGuideResponse([...messages, userMessage]);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response || 'Uma névoa mágica impediu minha conexão. Tente novamente em instantes.' }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen ? (
        <div className="glass-dark w-80 md:w-96 h-[550px] rounded-[32px] shadow-[0_25px_80px_-15px_rgba(0,0,0,1)] flex flex-col border border-white/10 overflow-hidden ring-1 ring-white/5 animate-in fade-in zoom-in duration-300">
          <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 p-6 text-white flex justify-between items-center border-b border-white/5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center text-xl shadow-[0_0_15px_rgba(255,255,255,0.1)]">✨</div>
              <div>
                <span className="block font-black text-sm uppercase tracking-widest">Guia Mágico</span>
                <span className="block text-[10px] text-emerald-400 font-bold uppercase tracking-tighter flex items-center gap-1">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full animate-ping"></span> Online agora
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 rounded-full p-2 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-blue-600/20 text-blue-100 border border-blue-500/30 rounded-tr-none' 
                    : 'bg-emerald-900/40 text-emerald-100 border border-emerald-500/20 rounded-tl-none'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-emerald-900/40 p-4 rounded-2xl flex gap-1 border border-emerald-500/20">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-white/5 bg-black/20">
            <div className="flex space-x-3 items-center bg-white/5 rounded-2xl border border-white/10 p-2 focus-within:ring-2 focus-within:ring-yellow-400/30 transition-all">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Qual o valor do ingresso?"
                className="flex-1 bg-transparent px-4 py-2 text-sm text-white focus:outline-none placeholder:text-slate-600 font-medium"
              />
              <button 
                onClick={handleSend}
                className="bg-yellow-500 text-black p-3 rounded-xl hover:bg-yellow-400 transition-all shadow-[0_5px_15px_rgba(234,179,8,0.2)]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-yellow-500 text-black w-16 h-16 rounded-[24px] shadow-[0_15px_40px_rgba(234,179,8,0.4)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          <span className="text-3xl relative z-10 group-hover:rotate-12 transition-transform">✨</span>
        </button>
      )}
    </div>
  );
};

export default ChatGuide;
