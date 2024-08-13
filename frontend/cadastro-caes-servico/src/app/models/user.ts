import { Role } from './role';

export interface User {
  id?: number; 
  email: string;
  senha: string;
  roles?: Role[]; 
}
