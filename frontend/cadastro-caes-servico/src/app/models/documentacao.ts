export interface Documentacao {
    id?: number; 
    cartaTreinamento: string | null;
    validadeCartaTreinamento: string;
    carteiraVacina: string | null;
    validadeCarteiraVacina: string;
    certificadoAdestramento: string | null;
    validadeCertificadoAdestramento: string;
    laudoMedico: string | null;
    validadeLaudoMedico: string;
    laudoVeterinario: string | null;
    validadeLaudoVeterinario: string;
    provaAdestramento: string | null;
}