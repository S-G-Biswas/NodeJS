import React, { useState } from 'react';
import axios from 'axios';

export default function Search(){
  const [universities, setUniversities] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const searchUniversities = async () => {
    try {
      const response = await axios.post('http://localhost:5000/search', {
        country: 'India',
      });
      setUniversities(response.data);
    } catch (error) {
      console.error('Error searching universities:', error);
    }
  };

  const addToFavorites = async (university) => {
    try {
      await axios.post('http://localhost:5000/favorites', university);
      setFavorites([...favorites, university]);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  return (
    <div>
      <h2>Search Universities</h2>
      <button onClick={searchUniversities}>Search</button>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>State/Province</th>
            <th>Web Pages</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {universities.map((university) => (
            <tr key={university.id}>
              <td>{university.name}</td>
              <td>{university.state}</td>
              <td>
                <a href={university.website} target="_blank" rel="web">
                  {university.website}
                </a>
              </td>
              <td>
                <button onClick={() => addToFavorites(university)}>Add to Favorites</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



