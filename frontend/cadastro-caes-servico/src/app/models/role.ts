import { User } from './user';

export interface Role {
    id?: number; 
    nome: string;
    users?: User[];
}