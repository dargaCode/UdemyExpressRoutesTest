
'use strict'; // so let will work
/* jshint esversion: 6 */
/* jshint node: true */

// DEPENDENCIES

const express = require('express');
const app = express();
const path = require('path');

// PATHS

app.use(express.static('public/build')); //serve static files

// TEMPLATING

app.set('view engine', 'ejs');

// CONSTANTS

const PORT_NUM = 3000;
const SERVER_START_MSG = 'Serving Express Routes Test on port ' + PORT_NUM;
const INDEX_PATH = path.join(__dirname, '/public/build/index.min.html');

const ANIMALS = {
  Bear: 'Rawr!',
  Bird: 'Caw!',
  Cat: 'Meow!',
  Chicken: 'b\'GAWK!',
  Cow: 'Moooo!',
  Darga: 'Flomp!',
  Dog: 'Bark!',
  Elephant: 'pfhlaROOOOGH!',
  Egret: 'mmWAAhhh!',
  Fish: 'Bloop!',
  Giraffe: 'ooh-WAH! ooooh-WAHHHH!',
  Horse: 'eeEEEEEhehehehehe!',
  Loren: 'Burp!',
  Mouse: 'Squeak!',
  Pig: 'Oink!',
  Sheep: 'BaAaAaAa!'
};

// SERVER

app.listen(process.env.PORT || PORT_NUM, function() {
  console.log(SERVER_START_MSG);
});

// ROUTES

app.get('/', function(request, response) {
  response.sendFile(INDEX_PATH);
});

app.get('/speak/:animal', function(request, response) {
  const animal = request.params.animal.capitalize();
  const sound = ANIMALS[animal] || '???';

  response.render('speak', {
    animal: animal,
    sound: sound
  });
});

app.get('/repeat/:word/:num', function(request, response) {
  const params = request.params;
  const word = params.word;
  const repeatNum = Number(params.num);

  response.render('repeat', {
    word: word,
    repeatNum: repeatNum
  });
});

app.get('*', function(request, response) {
  response.sendFile(INDEX_PATH);
});

// FUNCTIONS

String.prototype.capitalize = function() {
  const first = this[0].toUpperCase();
  const remainder  = this.slice(1).toLowerCase();
  return first + remainder;
};
