import React, { useState } from 'react';
import axios from 'axios';

export default function Favorites(){
    const [favorites, setFavorites] = useState([]);
  
    const getFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:5000/favorites');
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
              {favorite.name} - {favorite.state} -{' '}
              <a href={favorite.website} target="_blank" rel="web">
                {favorite.website}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };