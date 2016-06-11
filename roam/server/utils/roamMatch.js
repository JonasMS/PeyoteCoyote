'use strict'

const apoc = require('apoc');
const yelp = require('./api');

const getRoams = require('./getRoams');
const startRoam = require('./startRoam');
const joinRoam = require('./joinRoam');

module.exports = (userInput, res) => {

  const { coords } = userInput;

  getRoams(userInput)
  .exec()
  .then( (roamsList) => {

    console.log('roamList: ', roamsList[0].data);
    //if there's a match, join the first match
    if (!!roamsList[0].data.length) {

      let { id } = roamsList[0].data[0].meta[0]
      userInput.isHost = false;

      joinRoam(userInput, id)
      .exec()
      .then( roam => {
        console.log('roam: ', roam);
        res.send("Joined the roam");
      });

    //else, create autoRoam
    } else {
      userInput.isHost = true;
      console.log('no roams');

      let searchParams = {
          term: 'Bars',
          limit: 20,
          sort: 0,
          radius_filter: 3200, //2-mile radius
          bounds:
            coords.maxLat + ',' +
            coords.minLong + '|' +
            coords.minLat  + ',' +
            coords.maxLong
        };

      yelp.searchYelp(searchParams, function(venue) {

        console.log('venue name: ', venue.name);

        startRoam(
          userInput,
          {
            locName: venue.name,
            address: venue.location.display_address.join(' ')
          },
          res
        );
      });
    }
  });

}
