var apoc = require('apoc');
var yelp = require('./api');

const createRoam = require('./createRoam');
const joinRoam = require('./joinRoam');


module.exports = (userInput, res) => {

  const { coords, email, times , type } = userInput;

  var searchParams = {
    term: 'Bars',
    limit: 20,
    sort: 0,
    radius_filter: 3200, //2-mile radius
    bounds: coords.maxLat + ',' + coords.minLong + '|' +  coords.minLat  + ',' + coords.maxLong
  };

  //TODO: yelp.searchYelp belongs outside of startRoam
  //e.g. in matchRoam.js
  //Creates the YELP object to make API request to yelp servers
  yelp.searchYelp(searchParams, function(venue) {

    const roamVenue = {
        venueName: venue.name,
        venueAddress: venue.location.display_address.join(' ')
      }

    createRoam(userInput, roamVenue, res)
    .exec()
    .then(function(queryRes) {

      //join user (host) to just created roam
      joinRoam(userInput, queryRes, res)
      .exec()
      .then( (roam) => {
        console.log('roam: ', roam);
        res.send("Joined the roam");
      });

    });
  });
}