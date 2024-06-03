import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Scoreboard from './components/Scoreboard';
import CardGrid from './components/CardGrid';
import './styles/App.css'

function App() {
  const [cards, setCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://pokeapi.co/api/v2/pokemon?limit=20');
      const data = result.data.results.map((item, index) => ({
        id: index,
        name: item.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
      }));
      setCards(shuffleArray(data));
    };

    fetchData();
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleClick = (id) => {
    if (clickedCards.includes(id)) { // We've selected a card that we've already seen!
      setCurrentScore(0);
      setClickedCards([]);
    } else {
      setClickedCards([...clickedCards, id]);
      const newScore = currentScore + 1;
      setCurrentScore(newScore);
      if (newScore > bestScore)
        setBestScore(newScore);
      setCards(shuffleArray(cards));
    }

  };

  return (
    <div className="App">
      <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      <CardGrid cards={cards} handleClick={handleClick} />
    </div>
  );

}

export default App;
