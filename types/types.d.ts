export interface Carta {
    codigo: string;
    imagem: string;
    valor: string;
    naipe: string;
    
  }
  
  export interface RespostaBaralho {
    sucesso: boolean;
    idBaralho: string;
    embaralhado: boolean;
    restante: number;
    cartas: Carta[];
  }
  