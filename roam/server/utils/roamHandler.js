'use strict'

var apoc = require('apoc');
var yelp = require('./api');
var formattedDateHtml = require('./dateFormatter');
var generateEmail = require('./emailGenerator');

var boundingBoxGenerator = require('./boundingBoxGenerator');
var roamOffGenerator = require('./roamOffGenerator');

const roamMatch = require('./roamMatch');
const roamPool = require('./roamPool');

module.exports = (data, res) => {

  console.log('data: ', data);

  //TODO: use destructor
  let userInput = {
    dateMS: Date.now(),
    email: data.userEmail,
    coords: boundingBoxGenerator(data.coordinates),
    times: roamOffGenerator(data),
    type: 'pool', // data.type, //TODO: change 'type' to 'roamMode'
    isHost: true
  };

  if (userInput.type === 'roam') {
    //match user w/ a roam or create an auto roam
    roamMatch(userInput, res);
  } else {
    //connect user to roam or create specified roam
    roamPool(userInput, res);
  }
}

