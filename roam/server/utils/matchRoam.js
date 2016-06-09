'use strict'

var apoc = require('apoc');

const createRoam = require('./createRoam')

module.exports = (coords, times, userEmail, res) => {
  let dateMS = Date.now();

  apoc.query('MATCH (m:Roam) \
      WHERE m.creatorRoamEnd > %currentDate% \
        AND m.status = "Pending" \
        AND m.creatorLatitude < %maxLat% \
        AND m.creatorLatitude > %minLat% \
        AND m.creatorLongitude < %maxLong% \
        AND m.creatorLongitude > %minLong% \
        AND m.creatorEmail <> "%userEmail%" \
        AND m.type = "%type%" RETURN m',
      {
        currentDate: dateMS,
        maxLat: coords.maxLat,
        minLat: coords.minLat,
        maxLong: coords.maxLong,
        minLong: coords.minLong,
        userEmail: userEmail
        // type: type
  }).exec().then( (roamsList) => {
    //if matches, join nearest match
      console.log('roamsList: ', roamsList);
    if (!!roamsList[0].data.length) {
      console.log('join a roam');
      //join match w/ least distance

    //else, create autoRoam
    } else {
      console.log('create an auto roam');
      createRoam(userEmail, coords, times, res);
    }
  });

}