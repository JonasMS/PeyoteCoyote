'use strict'

var apoc = require('apoc');
var formattedDateHtml = require('./dateFormatter');
var generateEmail = require('./emailGenerator');

var boundingBoxGenerator = require('./boundingBoxGenerator');
var roamOffGenerator = require('./roamOffGenerator');

const roamMatch = require('./roamMatch');
const roamPool = require('./roamPool');

module.exports = (data, res) => {
  // console.log('data: ', data);

  data.coords = boundingBoxGenerator(data.latitude, data.longitude)

  // console.log('data.roamMode: ', data.roamMode);
  if (data.roamMode === 'roam') {

    //match user w/ a roam or create an auto roam
    roamMatch(data, res);

  } else {

    //connect user to roam or create specified roam
    roamPool(data, res);
  }
}
