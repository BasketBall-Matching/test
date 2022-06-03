import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function GameSearch() {

  const [gameData, setGameData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    axios.get('/games')
      .then((response) => {
        setGameData(response.data);
      });
  }, []);

  const searchItems = (searchValue) => {
    setFilteredResults(filteredResults);
    gameData.filter((game) => {
      return Object.values(game).join('').includes(searchInput);
    });
    setSearchInput(searchValue);
  };

  return (
    <div>
      <input
        placeholder='검색ㄱㄱ'
        onChange={(e) => searchItems(e.target.value)}
        style={{ width: 200 }}
      />
      <div>
        {searchInput.length > 1 ? (
          filteredResults.map((game) => {
            return (
              <div>
                <div style={{ color: 'green' }}>
                  <div>{game.date}</div>
                  <div>{game.time}</div>
                  <div>{game.location}</div>
                  <div>{game.member}</div>
                </div>
              </div>
            );
          })
        ) : (
          gameData.map((game) => {
            return (
              <div>
                <div style={{ color: 'indigo' }}>
                  <div>{game.date}</div>
                  <div>{game.time}</div>
                  <div>{game.location}</div>
                  <div>{game.member}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}