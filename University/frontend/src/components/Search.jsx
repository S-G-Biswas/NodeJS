import React, { useState } from 'react';
import axios from 'axios';

export default function Search(){
  const [universityName, setUniversityName] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchUniversities = async () => {
    try {
      const response = await axios.post('http://localhost:5000/search', {
        universityName,
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching universities:', error);
    }
  };

  return (
    <div>
      <h2>University Search</h2>
      <input
        type="text"
        placeholder="Enter university name"
        value={universityName}
        onChange={(e) => setUniversityName(e.target.value)}
      />
      <button onClick={searchUniversities}>Search</button>

      <h3>Search Results:</h3>
      <ul>
        {searchResults.map((university) => (
          <li key={university.id}>
            {university.name} - {university.country}
          </li>
        ))}
      </ul>
    </div>
  );
};



