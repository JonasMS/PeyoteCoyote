var apoc = require('apoc');
var yelp = require('./api');

// const getAttending = require('./getAttending')
const authorizeJoin = require('./authorizeJoin');
const createRoam = require('./createRoam');
const joinRoam = require('./joinRoam');


module.exports = (userInput, venue, res) => {

  console.log('startRoam');
  //create a roam (node)
  createRoam(userInput, venue)
  .exec()
  .then(function(queryRes) {

    let { id } = queryRes[0].data[0].meta[0];
    //join (relationship) user (node)
    // to just created roam (node)
    console.log('id: ', id);
    joinRoam(userInput, id)
    .exec()
    .then( (roam) => {
      console.log('roam: ', roam);
      res.send("Joined the roam");
    }, err => {
      console.log('error: ', err);
    });
    //update Attending?
  });
}

