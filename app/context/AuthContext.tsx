'use client';

import { createContext, useState, ReactNode, useEffect } from 'react';

interface ContextoAutenticacaoProps {
  autenticado: boolean;
  entrar: () => void;
  sair: () => void;
}

export const ContextoAutenticacao = createContext<ContextoAutenticacaoProps | null>(null);

export const ProvedorAutenticacao = ({ children }: { children: ReactNode }) => {
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const autenticadoLocal = localStorage.getItem('autenticado');
    if (autenticadoLocal === 'true') {
      setAutenticado(true);
    }
  }, []);

  const entrar = () => {
    setAutenticado(true);
    localStorage.setItem('autenticado', 'true');
  };

  const sair = () => {
    setAutenticado(false);
    localStorage.removeItem('autenticado');
    localStorage.removeItem('baralho');
  };

  return (
    <ContextoAutenticacao.Provider value={{ autenticado, entrar, sair }}>
      {children}
    </ContextoAutenticacao.Provider>
  );
};
