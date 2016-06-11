'use strict'

var apoc = require('apoc');
var boundingBoxGenerator = require('./boundingBoxGenerator');
var roamOffGenerator = require('./roamOffGenerator');

const getRoams = require('./getRoams');

module.exports = (query, res) => {

  console.log('getting all the group roams');


  // apoc.query('MATCH (m:Roam) \
  //     WHERE m.creatorRoamEnd > %currentDate% \
  //       AND m.status = "Pending" \
  //       AND m.creatorLatitude < %maxLat% \
  //       AND m.creatorLatitude > %minLat% \
  //       AND m.creatorLongitude < %maxLong% \
  //       AND m.creatorLongitude > %minLong% \
  //       AND m.creatorEmail <> "%userEmail%" \
  //       AND m.type = "%type%" RETURN m',
  //     {
  //       currentDate: dateMS,
  //       maxLat: coords.maxLat,
  //       minLat: coords.minLat,
  //       maxLong: coords.maxLong,
  //       minLong: coords.minLong,
  //       userEmail: userEmail,
  //       type: type
  // })
  getRoams(query)
  .exec()
  .then(function(roamsList) {

    console.log('roamsList: ', roamsList[0].data);

    //if there are Pool/X roams, send them
    if (roamsList[0].data.length > 0) {
      res.send(JSON.stringify(roamsList[0].data));
    } else {
      var message = 'No Roams Available Nearby';
      res.send(message);
    }
  });
};
