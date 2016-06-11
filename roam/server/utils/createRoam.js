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

<<<<<<< 56c315f383dc4e1bbc84fee0922cc9be75a63db0
  console.log(userInput);
=======
  const endTime =
  roamOffGenerator({ date, time });
>>>>>>> REFAC - Comment Out / Remove Logs to Console

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
        endTime: time,
        venueName: locName,
        venueAddress: address,
        roamMode,
        title,
        description,
        capacity,
        price
    });
}
