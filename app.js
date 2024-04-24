const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const jsonfile = require('jsonfile');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Serve the registration page
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

// Handle the registration form submission
app.post('/register', (req, res) => {
  const loginData = {
    username: req.body.username,
    password: req.body.password
  };

  const profileData = {
    name: req.body.name,
    rollNumber: req.body.rollNumber,
    year: req.body.year,
    age: req.body.age,
    interests: req.body.interests.split(','),
    gender: req.body.gender,
    hobbies: req.body.hobbies.split(','),
    email: req.body.email
  };

  // Write the login data to login.json
  jsonfile.writeFile('login.json', [loginData], { flag: 'a' }, err => {
    if (err) {
      console.error(err);
      res.status(500).send('Error writing login data');
    } else {
      console.log('Login data written to login.json');
    }
  });

  // Write the profile data to students.json
  jsonfile.writeFile('students.json', [profileData], { flag: 'a' }, err => {
    if (err) {
      console.error(err);
      res.status(500).send('Error writing profile data');
    } else {
      console.log('Profile data written to students.json');
      res.send('Registration successful');
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});