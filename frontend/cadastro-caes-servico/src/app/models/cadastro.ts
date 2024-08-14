import { Condutor } from './condutor';
import { Cao } from './cao';
import { Endereco } from './endereco';
import { Adestramento } from './adestramento';
import { Documentacao } from './documentacao';

export interface Cadastro {
    id?: number; 
    condutor: Condutor;
    cao: Cao;
    endereco: Endereco; 
    adestramento: Adestramento;
    documentacao: Documentacao;
    qrCode: string | null;
}
