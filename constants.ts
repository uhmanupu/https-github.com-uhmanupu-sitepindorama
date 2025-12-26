
import { TicketType, Park, AddOn } from './types';

export const PARKS: Park[] = [
  {
    id: 'terra-palmeiras',
    name: 'Terra das Palmeiras',
    description: 'Onde a magia da natureza brasileira ganha vida em castelos de madeira e jardins suspensos.',
    image: 'https://picsum.photos/seed/pindorama1/800/400'
  },
  {
    id: 'reino-aguas',
    name: 'Reino das Águas',
    description: 'Um paraíso aquático inspirado nos rios da Amazônia com toboáguas emocionantes.',
    image: 'https://picsum.photos/seed/pindorama2/800/400'
  },
  {
    id: 'trilha-mitos',
    name: 'Trilha dos Mitos',
    description: 'Encontre o Curupira e a Iara em atrações de alta tecnologia e folclore.',
    image: 'https://picsum.photos/seed/pindorama3/800/400'
  }
];

export const TICKET_TYPES: TicketType[] = [
  {
    id: 'standard',
    name: 'Ingresso Padrão',
    description: 'Acesso a um parque por dia. Perfeito para explorar cada detalhe.',
    basePrice: 189.90,
    image: 'https://picsum.photos/seed/ticket1/400/250'
  },
  {
    id: 'pindorama-plus',
    name: 'Pindorama Plus',
    description: 'Acesso a múltiplos parques no mesmo dia e entrada prioritária.',
    basePrice: 289.90,
    image: 'https://picsum.photos/seed/ticket2/400/250'
  }
];

export const ADD_ONS: AddOn[] = [
  {
    id: 'fast-pass',
    name: 'Pulo do Gato (Fura-Fila)',
    price: 85.00,
    description: 'Evite filas nas 10 atrações mais populares.'
  },
  {
    id: 'memory-maker',
    name: 'Memória Mágica',
    price: 120.00,
    description: 'Fotos profissionais ilimitadas em todo o parque.'
  },
  {
    id: 'buffet',
    name: 'Buffet Regional',
    price: 95.00,
    description: 'Refeições completas nos restaurantes temáticos.'
  }
];
