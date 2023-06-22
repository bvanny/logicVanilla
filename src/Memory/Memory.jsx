import React, { useState, useEffect } from 'react';
import styles from './Memory.module.css';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [rounds, setRounds] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [areCardsAppearing, setAreCardsAppearing] = useState(false); 
  const [isHintActive, setIsHintActive] = useState(true);

  const symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

  const initializeCards = () => {
    const initialCards = symbols.concat(symbols).sort(() => 0.5 - Math.random());
    const cardsWithHints = initialCards.map((symbol) => ({ symbol, isHinted: false }));
    setCards(cardsWithHints);
  };

  useEffect(() => {
    initializeCards();
    setAreCardsAppearing(true);
  }, []);

  useEffect(() => {
    if (rounds === 18) {
      setShowModal(true);
      setIsVictory(false);
    }
  }, [rounds]);

  const handleCardClick = (index) => {
    if (isChecking) return;

    if (flippedCards.length === 0) {
      setFlippedCards([index]);
    } else {
      const flippedIndex = flippedCards[0];
      const card = cards[index];
      const flippedCard = cards[flippedIndex];

      if (index === flippedIndex) return;

      setFlippedCards([flippedIndex, index]);
      setIsChecking(true);

      if (card.symbol === flippedCard.symbol) {
        setMatchedCards([...matchedCards, flippedIndex, index]);
        setFlippedCards([]);
        setIsChecking(false);

        setRounds((prevRounds) => prevRounds + 1);
        if (matchedCards.length + 2 === cards.length) {
          setShowModal(true);
          setIsVictory(true);
        }
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setIsChecking(false);
        }, 800);

        setRounds((prevRounds) => prevRounds + 1);
      }
    }
  };

  const restartGame = () => {
    initializeCards();
    setFlippedCards([]);
    setMatchedCards([]);
    setIsChecking(false);
    setRounds(0);
    setShowModal(false);
    setIsHintActive(true);
  };


  const handleHintClick = () => {
    if (isHintActive) {
      const matchingCards = findMatchingCards();
      if (matchingCards) {
        const [firstCardIndex, secondCardIndex] = matchingCards;
        const updatedCards = cards.map((card, index) => {
          if (index === firstCardIndex || index === secondCardIndex) {
            return {
              ...card,
              isHinted: true,
            };
          }
          return card;
        });
        setCards(updatedCards);
      }
      setIsHintActive(false);
    }
  };
  
  const findMatchingCards = () => {
    for (let i = 0; i < cards.length; i++) {
      for (let j = i + 1; j < cards.length; j++) {
        if (cards[i].symbol === cards[j].symbol) {
          return [i, j];
        }
      }
    }
    return null;
  };

  return (
    <div className={styles.content}>
      <div className={styles.buttonsMemory}>
        <button onClick={restartGame}>Reiniciar o Jogo</button>
        <button 
          onClick={handleHintClick} 
          disabled={!isHintActive}
        >
          {isHintActive ? 'Dica (1)' : 'Dica (0)'}
        </button>
      </div>
      <div className={styles.memoryGame}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${styles.card} ${
              flippedCards.includes(index) || matchedCards.includes(index)
                ? styles.flipped
                : ''
            } ${areCardsAppearing ? styles.appear : ''} ${
              card.isHinted ? styles.hinted : ''
            }`}
            onClick={() => handleCardClick(index)}
          >
            {flippedCards.includes(index) || matchedCards.includes(index) ? card.symbol : '🎴'}
          </div>
        ))}
      </div>
      <p className={styles.rounds}>Rodadas: {rounds}</p>
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>{isVictory ? 'Você venceu!' : 'Você perdeu!'}</h3>
            <button onClick={restartGame}>Reiniciar o Jogo</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
