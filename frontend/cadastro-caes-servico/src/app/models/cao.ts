import { Categoria } from './categoria';

export interface Cao {
    id?: number; 
    nome: string;
    nascimento: string;
    raca: string; 
    microchip: string;
    categoria: Categoria | null;
    foto: string | Uint8Array | null;
}

