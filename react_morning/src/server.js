import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Pool } from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API routes
// CORS and body parser are middleware

const app = express();
const port = process.env.PORT || 3000;

// Add middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

// React routing fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// PostgreSQL connection using `pg`
const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
});


// Check the database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err.stack);
  } else {
    console.log('PostgreSQL Connected...');
    // Create table
    const sql = `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )`;
    client.query(sql, (err, result) => {
      release(); // Release the client back to the pool
      if (err) {
        console.error('Error creating table:', err);
      } else {
        console.log('Table created');
      }
    });
  }
});

// GET /users route
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  pool.query(sql, (err, result) => {
    if (err) {
      console.error('Error retrieving users:', err);
      res.status(500).send('Error retrieving users');
    } else {
      res.json(result.rows); // PostgreSQL uses `rows` for query results
    }
  });
});

// POST /addUser route
app.post('/addUser', (req, res) => {
  const { name, email, password } = req.body;
  const sql =
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
  pool.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error('Error creating user:', err);
      res.status(500).send('Error creating user');
    } else {
      res.json(result.rows[0]); // Return the inserted user
    }
  });
});

// Run server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});