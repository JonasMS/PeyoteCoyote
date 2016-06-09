var apoc = require('apoc');

module.exports = (userInput, venue, res) => {

  const { coords, email, times , type} = userInput;
  const { venueName, venueAddress } = venue;

  return apoc.query('CREATE \
      (m:Roam { \
        creatorEmail: "%email%", \
        creatorLatitude: %userLatitude%, \
        creatorLongitude: %userLongitude%, \
        creatorRoamStart: %startRoam%, \
        creatorRoamEnd: %roamOffAfter%, \
        status: "Pending", \
        venueName: "%venueName%", \
        venueAddress: "%venueAddress%", \
        type: "%type%" \
      }) \
      RETURN m',
      {
        email: email,
        userLatitude: coords.userLatitude,
        userLongitude: coords.userLongitude,
        startRoam: times.startRoam,
        roamOffAfter: times.roamOffAfter,
        venueName: venueName,
        venueAddress: venueAddress,
        type: type
    });
}
