'use client';
import { useEffect, useState } from 'react';
import { Carta, RespostaBaralho } from '../../types/types';
import axios from 'axios';

const Dashboard = () => {
  const [cartas, setCartas] = useState<Carta[]>([]);
  const [naipeFiltro, setNaipeFiltro] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const carregarBaralho = async () => {
        const baralhoSalvo = localStorage.getItem('baralho');

        console.log('Verificando baralho salvo no localStorage:', baralhoSalvo);
        
        if (baralhoSalvo) {
          console.log('Baralho encontrado no localStorage. Carregando...');
          try {
            setCartas(JSON.parse(baralhoSalvo));
          } catch (error) {
            console.error('Erro ao analisar o baralho do localStorage:', error);
            localStorage.removeItem('baralho');
          }
        } else {
          try {
            console.log('Nenhum baralho encontrado no localStorage. Carregando da API...');
            const resposta = await axios.get<RespostaBaralho>(
              'https://deckofcardsapi.com/api/deck/new/draw/?count=52'
            );

            setCartas(resposta.data.cartas);
            localStorage.setItem('baralho', JSON.stringify(resposta.data.cartas));
            console.log('Baralho salvo no localStorage após carregar da API.');
          } catch (erro) {
            console.error('Erro ao carregar o baralho:', erro);
          }
        }
      };

      carregarBaralho();
    }
  }, [isMounted]);

  const salvarBaralhoNoLocalStorage = (cartasAtualizadas: Carta[]) => {
    console.log('Salvando baralho atualizado no localStorage:', cartasAtualizadas);
    setCartas(cartasAtualizadas);
    localStorage.setItem('baralho', JSON.stringify(cartasAtualizadas));  
  };

  const filtrarPorNaipe = (naipe: string) => {
    setNaipeFiltro(naipe);
  };

  const embaralharCartas = () => {
    const embaralhado = [...cartas].sort(() => Math.random() - 0.5);
    salvarBaralhoNoLocalStorage(embaralhado);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <button onClick={() => filtrarPorNaipe('')}>Todos</button>
      <button onClick={() => filtrarPorNaipe('SPADES')}>Espadas</button>
      <button onClick={() => embaralharCartas()}>Embaralhar</button>
      <div>
        {cartas
          .filter((carta) => naipeFiltro === '' || carta.naipe === naipeFiltro)
          .map((carta) => (
            <div key={carta.codigo}>
              <img src={carta.imagem} alt={`${carta.valor} de ${carta.naipe}`} />
              <p>{carta.valor} de {carta.naipe}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
