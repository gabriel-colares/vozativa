export type Frase = {
  id: number;
  texto: string;
  categoria: 'Necessidades' | 'Sentimentos' | 'Conversas';
  emoji: string;
};

// Dados locais deixam a demonstração independente de uma API ou banco de dados.
export const frases: Frase[] = [
  { id: 1, texto: 'Quero água', categoria: 'Necessidades', emoji: '💧' },
  { id: 2, texto: 'Estou com fome', categoria: 'Necessidades', emoji: '🍽️' },
  { id: 3, texto: 'Preciso de ajuda', categoria: 'Necessidades', emoji: '🙋' },
  { id: 4, texto: 'Quero ir ao banheiro', categoria: 'Necessidades', emoji: '🚻' },
  { id: 5, texto: 'Estou feliz', categoria: 'Sentimentos', emoji: '😊' },
  { id: 6, texto: 'Estou triste', categoria: 'Sentimentos', emoji: '😔' },
  { id: 7, texto: 'Estou cansado', categoria: 'Sentimentos', emoji: '😴' },
  { id: 8, texto: 'Estou com medo', categoria: 'Sentimentos', emoji: '😟' },
  { id: 9, texto: 'Olá!', categoria: 'Conversas', emoji: '👋' },
  { id: 10, texto: 'Obrigado!', categoria: 'Conversas', emoji: '🙏' },
  { id: 11, texto: 'Por favor', categoria: 'Conversas', emoji: '🤝' },
  { id: 12, texto: 'Até logo!', categoria: 'Conversas', emoji: '👋' },
];
