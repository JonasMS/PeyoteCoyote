'use strict'

const apoc = require('apoc');
const boundingBoxGenerator = require('./boundingBoxGenerator');


//get list of roams w/in a specified distance
//from the user
module.exports = (query) => {
  // const curDate = Date.now();

  const {
    userEmail,
    roamMode,
    latitude,
    longitude,
  } = query;

  const coords = boundingBoxGenerator(latitude, longitude);


  const curTime = new Date();
  const startTime = curTime.setHours(
    curTime.getHours() - 0.5
    );

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
      currentDate: startTime,
      maxLat: coords.maxLat,
      minLat: coords.minLat,
      maxLong: coords.maxLong,
      minLong: coords.minLong,
      email: userEmail,
      roamMode
    }
  );
}
