
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[220px] md:h-[280px] overflow-hidden border-b border-white/5">
      <img 
        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80" 
        alt="Pindorama Park" 
        className="w-full h-full object-cover brightness-[0.3] contrast-[1.1]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020d02] via-transparent to-black/20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-3xl md:text-5xl font-magic mb-2 drop-shadow-lg">
          Magia sob as <span className="text-yellow-400">Estrelas</span>
        </h1>
        <p className="text-blue-100 text-sm md:text-lg max-w-xl font-light opacity-80">
          Descubra o brilho noturno do Pindorama Park. Reserve agora sua aventura.
        </p>
      </div>
    </div>
  );
};

export default Hero;
