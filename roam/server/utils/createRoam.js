var apoc = require('apoc');
var yelp = require('./api');


module.exports = (userInput, res) => {

  const { coords, userEmail, times } = userInput;

  console.log('line 7');

  var searchParams = {
    term: 'Bars',
    limit: 20,
    sort: 0,
    radius_filter: 3200, //2-mile radius
    bounds: coords.maxLat + ',' + coords.minLong + '|' +  coords.minLat  + ',' + coords.maxLong
  };

  //Creates the YELP object to make API request to yelp servers
  yelp.searchYelp(searchParams, function(venue) {

  console.log('line 20: ', venue.name);

    var venueName = venue.name;
    var venueAddress = venue.location.display_address.join(' ');

    //FILE: createRoam
    //Create a roam node if it doesn't exist
    apoc.query('CREATE \
      (m:Roam { \
        creatorEmail: "%userEmail%", \
        creatorLatitude: %userLatitude%, \
        creatorLongitude: %userLongitude%, \
        creatorRoamStart: %startRoam%, \
        creatorRoamEnd: %roamOffAfter%, \
        status: "Pending", \
        venueName: "%venueName%", \
        venueAddress: "%venueAddress%", \
        type: "%type%" \
      })',
      {
        email: userEmail,
        userEmail: userEmail,
        userLatitude: coords.userLatitude,
        userLongitude: coords.userLongitude,
        startRoam: times.startRoam,
        roamOffAfter: times.roamOffAfter,
        venueName: venueName,
        venueAddress: venueAddress,
        // type: type
    })
    .exec().then(function(queryRes) {

      // creates the relationship between creator of roam node and the roam node
      apoc.query('MATCH \
        (n:User {email:"%email%"}), \
        (m:Roam { \
          creatorEmail: "%creatorEmail%", \
          creatorRoamStart: %roamStart% \
        }) \
        CREATE (n)-[r:ATTENDING {host: true}]->(m)',
        {
          email:userEmail,
          creatorEmail: userEmail,
          roamStart: times.startRoam
        }).exec().then(function(relationshipRes) {
         console.log('Relationship created', relationshipRes);
         res.send("Created a roam");
      });
    });
  });
}