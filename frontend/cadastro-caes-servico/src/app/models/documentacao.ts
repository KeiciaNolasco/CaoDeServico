import { SafeResourceUrl } from '@angular/platform-browser';

export interface Documentacao {
    id?: number; 
    cartaTreinamento: string | Uint8Array | SafeResourceUrl | null;
    validadeCartaTreinamento: string;
    carteiraVacina: string | Uint8Array | SafeResourceUrl | null;
    validadeCarteiraVacina: string;
    certificadoAdestramento: string | Uint8Array | SafeResourceUrl | null;
    validadeCertificadoAdestramento: string;
    laudoMedico: string | Uint8Array | SafeResourceUrl | null;
    validadeLaudoMedico: string;
    laudoVeterinario: string | Uint8Array | SafeResourceUrl | null;
    validadeLaudoVeterinario: string;
    provaAdestramento: string | Uint8Array | SafeResourceUrl | null;
}