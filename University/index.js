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
  const { universityName } = req.body;
  const query = `SELECT * FROM universities WHERE name LIKE '%${universityName}%'`;

  db.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});