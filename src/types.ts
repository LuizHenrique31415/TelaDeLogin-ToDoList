// src/types.ts
export interface Tarefa {
    id: number;
    titulo: string;
    prioridade: 'Alta' | 'Média' | 'Baixa';
    concluida: boolean;
  }