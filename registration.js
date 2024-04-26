const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const jsonfile = require('jsonfile');
const http = require('http');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Serve the registration page
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

// Handle the registration form submission
app.post('/register', (req, res) => {
  const loginData = {
    username: req.body.username,
    password: req.body.password,
    secret_question: req.body.secret_question,
    secret_answer: req.body.secret_answer
  };

  const profileData = {
    "IITB Roll Number": req.body.rollNumber,
    Name: req.body.name,
    "Year of Study": req.body.year,
    Age: Number(req.body.age),
    Gender: req.body.gender,
    Interests: req.body.interests,
    Hobbies: req.body.hobbies,
    Email: req.body.email,
    Photo: "photos/"+req.body.filePath
  };

  // Write the login data to login.json
  jsonfile.readFile('login.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading login data');
    } else {
      // Append the new data to the existing array
      data.push(loginData);
  
      // Write the updated data to students.json
      jsonfile.writeFile('login.json', data, { spaces: 2 }, err => {
        if (err) {
          console.error(err);
          res.status(500).send('Error writing login data');
        } else {
          console.log('Profile data written to login.json');
          res.send('Registration successful');
        }
      });
    }
  });
  // Read the existing data from students.json
jsonfile.readFile('students.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading profile data');
    } else {
      // Append the new data to the existing array
      data.push(profileData);
  
      // Write the updated data to students.json
      jsonfile.writeFile('students.json', data, { spaces: 2 }, err => {
        if (err) {
          console.error(err);
          res.status(500).send('Error writing profile data');
        } else {
          console.log('Profile data written to students.json');
          res.send('Registration successful');
        }
      });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});