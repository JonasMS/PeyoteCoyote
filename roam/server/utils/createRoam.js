'use strict'

const apoc = require('apoc');

const roamOffGenerator = require('./roamOffGenerator');

//creates a roam node
module.exports = (userInput, venue) => {

  const {
    userEmail,
    title,
    description,
    latitude,
    longitude,
    date, //start time
    time, //duration
    roamMode,
    capacity,
    price
  } = userInput;

  const { locName, address } = venue;

  console.log('userInput: ', userInput);

  const endTime =
  roamOffGenerator({ date, time });

  console.log('endTime: ', endTime);

  return apoc.query(
    'CREATE \
      (m:Roam { \
        creatorEmail: "%email%", \
        creatorLatitude: %latitude%, \
        creatorLongitude: %longitude%, \
        creatorRoamStart: %startTime%, \
        creatorRoamEnd: %endTime%,\
        status: "Pending", \
        venueName: "%venueName%", \
        venueAddress: "%venueAddress%", \
        roamMode: "%roamMode%", \
        title: "%title%", \
        description: "%description%", \
        capacity: %capacity%,\
        price: %price%\
      }) \
      RETURN m',
      {
        email: userEmail,
        latitude: latitude,
        longitude: longitude,
        startTime: date,
        endTime: endTime,
        venueName: locName,
        venueAddress: address,
        roamMode,
        title,
        description,
        capacity,
        price
    });
}
