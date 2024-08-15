export interface Condutor {
    id?: number; 
    nome: string;
    nascimento: string;
    cpf: string; 
    contato: string;
    cid: string;
    foto: string | Uint8Array | null;
}