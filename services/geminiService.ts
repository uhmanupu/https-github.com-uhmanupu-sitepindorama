
import { GoogleGenAI } from "@google/genai";
import { ChatMessage, BookingState } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getMagicalGuideResponse = async (history: ChatMessage[], currentState?: BookingState) => {
  const model = 'gemini-3-flash-preview';
  
  const contextInfo = currentState ? `
    Contexto Atual da Reserva do Usuário:
    - Datas selecionadas: ${currentState.selectedDates.join(', ') || 'Nenhuma selecionada'}
    - Tipo de Ingresso: ${currentState.ticketType || 'Ainda não selecionado'}
    - Adultos: ${currentState.numAdults}, Crianças: ${currentState.numChildren}
    - Parque (se Standard): ${currentState.selectedPark || 'Ainda não selecionado'}
    - Upgrades: ${currentState.addOns.join(', ') || 'Nenhum'}
  ` : '';

  const systemInstruction = `
    Você é o "Guia Mágico do Pindorama Park". 
    Seu objetivo é ajudar os visitantes a planejarem sua viagem, escolherem os melhores ingressos e parques.
    O Pindorama Park é um parque temático brasileiro fictício inspirado na Disney.
    
    Os parques são:
    1. Terra das Palmeiras: Foco em natureza, castelos de madeira e jardins. Relaxante e épico.
    2. Reino das Águas: Parque aquático inspirado na Amazônia. Muita adrenalina.
    3. Trilha dos Mitos: Alta tecnologia e hologramas contando lendas como Curupira, Iara e Saci.

    Valores: Standard (R$189,90) e Pindorama Plus (R$289,90).
    Note que agora o usuário pode selecionar MÚLTIPLAS datas. Se ele selecionar 5 dias ou mais, um dos dias é gratuito.
    
    ${contextInfo}

    Seja cortês, entusiasta e use termos como "Bem-vindo à nossa terra", "Magia brasileira" e "Aventura épica".
    Sempre incentive o usuário a completar a reserva se ele estiver indeciso.
    Responda sempre em Português do Brasil de forma concisa e amigável.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        { role: 'user', parts: [{ text: systemInstruction }] },
        ...history.map(m => ({
          role: m.role === 'user' ? 'user' : 'model' as any,
          parts: [{ text: m.content }]
        }))
      ],
      config: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40
      }
    });

    return response.text;
  } catch (error) {
    console.error("Erro ao chamar Gemini:", error);
    return "Tive um pequeno contratempo mágico com minha conexão. Mas não se preocupe, o Pindorama continua lindo! Como posso ajudar?";
  }
};
