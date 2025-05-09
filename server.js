const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt'); 

const app = express();
const port = 5000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'registration_db',
  password: 'postgres',
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());


app.post('/register', async (req, res) => {
    const { name, email, rollNo, section, address, password } = req.body;
    try {
      // Check if email or roll number already exists
      const checkUser = await pool.query(
        'SELECT * FROM registrations WHERE email = $1 OR roll_no = $2',
        [email, rollNo]
      );
  
      if (checkUser.rows.length > 0) {
        return res.status(400).send('Email or Roll No already registered');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10); // hash password
  
      await pool.query(
        'INSERT INTO registrations (name, email, roll_no, section, address, password) VALUES ($1, $2, $3, $4, $5, $6)',
        [name, email, rollNo, section, address, hashedPassword]
      );
  
      res.status(200).send('Registration successful');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM registrations WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(400).send('Email not found');
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send('Invalid password');
    }

    res.status(200).send('Login successful');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.post('/primary-feedback', async (req, res) => {
  const { email, lessonNumber, rating, feedback } = req.body;

  try {
    // Optional: Validate input
    if (!email || !lessonNumber || !rating || !feedback) {
      return res.status(400).send('All fields are required');
    }

    await pool.query(
      'INSERT INTO video_feedback (email, lesson_number, rating, feedback) VALUES ($1, $2, $3, $4)',
      [email, lessonNumber, rating, feedback]
    );

    res.status(200).send('Feedback submitted successfully');
  } catch (err) {
    console.error('Error saving feedback:', err);
    res.status(500).send('Server error while saving feedback');
  }
});
