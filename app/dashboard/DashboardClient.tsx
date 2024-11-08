'use client';

import { useEffect, useState } from 'react';
import { Carta, RespostaBaralho } from '../../types/types';
import axios from 'axios';

const DashboardClient = () => {
  const [cartas, setCartas] = useState<Carta[]>([]);
  const [naipeFiltro, setNaipeFiltro] = useState<string>('');

  useEffect(() => {
    const carregarBaralho = async () => {
      try {
        const resposta = await axios.get<RespostaBaralho>(
          'https://deckofcardsapi.com/api/deck/new/draw/?count=52'
        );
        setCartas(resposta.data.cartas);
      } catch (erro) {
        console.error('Erro ao carregar o baralho:', erro);
      }
    };

    carregarBaralho();
  }, []);

  const filtrarPorNaipe = (naipe: string) => {
    setNaipeFiltro(naipe);
  };

  const embaralharCartas = () => {
    const embaralhado = [...cartas].sort(() => Math.random() - 0.5);
    setCartas(embaralhado);
  };

  return (
    <div>
      <button onClick={() => filtrarPorNaipe('')}>Todos</button>
      <button onClick={() => filtrarPorNaipe('SPADES')}>Espadas</button>
      <button onClick={embaralharCartas}>Embaralhar</button>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
        {cartas
          .filter((carta) => naipeFiltro === '' || carta.naipe === naipeFiltro)
          .map((carta) => (
            <div key={carta.codigo} style={{ margin: '10px' }}>
              <img src={carta.imagem} alt={`${carta.valor} de ${carta.naipe}`} style={{ width: '100px', height: '140px' }} />
              <p>{carta.valor} de {carta.naipe}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DashboardClient;
