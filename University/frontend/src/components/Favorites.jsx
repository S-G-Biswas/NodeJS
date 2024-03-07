import React, { useState } from 'react';
import axios from 'axios';

export default function Favorites(){
    const [favorites, setFavorites] = useState([]);
  
    const getFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/favorites');
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };
  
    return (
      <div>
        <h2>Favorites</h2>
        <button onClick={getFavorites}>Load Favorites</button>
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite.id}>
              {favorite.name} - {favorite.state_province} -{' '}
              <a href={favorite.web_pages} target="_blank" rel="noopener noreferrer">
                {favorite.web_pages}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };