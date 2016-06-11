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
  console.log('data.roamMode: ', data.roamMode);

  data.coords = boundingBoxGenerator(data.latitude, data.longitude)

  if (data.roamMode === 'roam') {
    //match user w/ a roam or create an auto roam
    roamMatch(data, res);

  } else if (data.roamMode === 'pool') {
    //connect user to roam or create specified roam
    roamPool(data, res);

  } else {
    console.log('bad roamMode given');
  }
}
