'use strict'

const apoc = require('apoc');
const boundingBoxGenerator = require('./boundingBoxGenerator');


//get list of roams w/in a specified distance
//from the user
module.exports = (query) => {
  // const curDate = Date.now();

  const {
    latitude,
    longitude,
    email
  } = query;

  const coords = boundingBoxGenerator(latitude, longitude);

  console.log('currentTime: ', Date.now());

  return apoc.query('MATCH (m:Roam) \
    WHERE m.creatorRoamStart > %currentDate% \
      AND m.status = "Pending" \
      AND m.creatorLatitude < %maxLat% \
      AND m.creatorLatitude > %minLat% \
      AND m.creatorLongitude < %maxLong% \
      AND m.creatorLongitude > %minLong% \
      AND m.creatorEmail <> "%email%" \
      RETURN m',
    {
      currentDate: Date.now(),
      maxLat: coords.maxLat,
      minLat: coords.minLat,
      maxLong: coords.maxLong,
      minLong: coords.minLong,
      email: email
      // type: type
    }
  );
}

// AND m.type = "%type%" RETURN m
