import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mysql from 'mysql2';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// api routes
// cors and body parser is a middleware

const app = express();
const port = 3000;

// add middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

// React routing fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Walden0042$$',
  database: 'react_learning',
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('MySQL Connected...');
    // create table
    const sql = `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Table created');
      }
    });
  }
});


app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error retrieving users');
    } else {
      res.json(result);
    }
  });
});

app.post('/addUser', (req, res) => {
  const { name, email, password } = req.body;
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error creating user');
    } else {
      res.json(result);
    }
  });
});

// run server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
