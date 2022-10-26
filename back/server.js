const express = require('express');
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(cookieParser());

const jwtSecret = 'secret123';

// Set a cookie with the name and value of the token
app.get('/api/jwt', (req, res) => {
  // This is where you might want to check the credentials of the user
  const token = jsonwebtoken.sign({ user: 'johndoe' }, jwtSecret);
  // Set the cookie
  // httpOnly: true = cookie can't be read using JS,
  // but can be sent back in HTTP requests
  res.cookie('token', token, { httpOnly: true });
  // Send the cookie as response
  res.json({ token });
});

// Read cookie and display list of foods
app.use(
  jwt({
    secret: jwtSecret,
    algorithms: ['HS256'],
    // This function tells the express-jwt middleware to look for the token in an incoming cookie
    getToken: req => req.cookies.token
  })
);

const foods = [
  { id: 1, description: 'burritos' },
  { id: 2, description: 'quesadillas' },
  { id: 3, description: 'churros' }
];

app.get('/api/foods', (req, res) => {
  res.json(foods);
});

// Clear cookie
app.get('/api/clearCookie', function(req, res){
  res.clearCookie('token');
  res.send('cookie token cleared');
});

// Start server
app.listen(3001, () => console.log('App running on localhost:3001'));

