import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import pkg from 'pg'; // Import the entire `pg` package as a default export
import { fileURLToPath } from 'url';

const { Pool } = pkg; // Destructure `Pool` from the imported `pg`

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API routes
const app = express();
const port = process.env.PORT || 3002;

// Add CORS middleware
const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production'
      ? ['https://node-routing-n249.onrender.com']
      : ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

// PostgreSQL connection using `pg`
const pool = new Pool({
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
    client.query(sql, (err) => {
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
  console.log('GET /users called');
  const sql = 'SELECT * FROM users';
  pool.query(sql, (err, result) => {
    if (err) {
      console.error('Error retrieving users:', err);
      res.status(500).send('Error retrieving users');
    } else {
      console.log('Users retrieved:', result.rows);
      res.json(result.rows || []); // Ensure it always returns an array
    }
  });
});

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

// React app fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Run server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
