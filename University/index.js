const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'university',
});

db.connect();

app.post('/search', (req, res) => {
  const country = req.body.country || 'India';
  const query = `SELECT * FROM universities WHERE country = '${country}'`;

  db.query(query, (error, results) => {
    if (error){
      throw error;
    }
    else{
      res.json(results);
    }
    
  });
});

app.post('/favorites', (req, res) => {
  const { id, name, stateProvince, webPages } = req.body;

  const query = `INSERT INTO favorites (id, name, state_province, web_pages) VALUES ('${id}', '${name}', '${stateProvince}', '${webPages}')`;

  db.query(query, (error) => {
    if (error){
      throw error;
    }
    else{
      res.json({ success: true });
    } 
    
  });
});

app.get('/api/favorites', (req, res) => {
  const query = 'SELECT * FROM favorites';

  db.query(query, (error, results) => {
    if (error){
      throw error;
    }
    else{
      res.json(results);
    }
    
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
