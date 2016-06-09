'use strict'

var apoc = require('apoc');
var yelp = require('./api');
var formattedDateHtml = require('./dateFormatter');
var generateEmail = require('./emailGenerator');

var boundingBoxGenerator = require('./boundingBoxGenerator');
var roamOffGenerator = require('./roamOffGenerator');

const matchRoam = require('./matchRoam');

module.exports = (req, res) => {

  let dateMS = Date.now();
  let userEmail = req.body.userEmail;
  let type = req.body.type;
  // let {userEmail, type, hosted, host, description, price} = req.body;
  let coords = boundingBoxGenerator(req); //bounding box coordinates
  let times = roamOffGenerator(req); //time until roam ends

  matchRoam(coords, times, userEmail, res);

  // //Checks to make sure if there is an existing pending roam within similar location by a different user
  // apoc.query('MATCH \
  //   (n:Roam) \
  //     WHERE n.creatorRoamEnd > %currentDate% \
  //       AND n.status = "Pending" \
  //       AND n.creatorLatitude < %maxLat% \
  //       AND n.creatorLatitude > %minLat% \
  //       AND n.creatorLongitude < %maxLong% \
  //       AND n.creatorLongitude > %minLong% \
  //       AND n.creatorEmail <> "%userEmail%" \
  //       AND n.type = "%type%" RETURN n',
  //     {
  //       currentDate:dateMS,
  //       maxLat: coords.maxLat,
  //       minLat: coords.minLat,
  //       maxLong: coords.maxLong,
  //       minLong: coords.minLong,
  //       userEmail: userEmail,
  //       type: type}
  // )
  // .exec().then(function(matchResults) {

  //   //if no match found create a pending roam node
  //   if (matchResults[0].data.length === 0) {
  //     console.log('nomatch');

  //     var searchParams = {
  //       term: 'Bars',
  //       limit: 20,
  //       sort: 0,
  //       radius_filter: 3200, //2-mile radius
  //       bounds: coords.maxLat + ',' + coords.minLong + '|' +  coords.minLat  + ',' + coords.maxLong
  //     };

  //     //Creates the YELP object to make API request to yelp servers
  //     yelp.searchYelp(searchParams, function(venue) {
  //       console.log('venue: ', venue.name)
  //       var venueName = venue.name;
  //       var venueAddress = venue.location.display_address.join(' ');

  //       //Create a roam node if it doesn't exist
  //       apoc.query('CREATE \
  //         (m:Roam { \
  //           creatorEmail: "%userEmail%", \
  //           creatorLatitude: %userLatitude%, \
  //           creatorLongitude: %userLongitude%, \
  //           creatorRoamStart: %startRoam%, \
  //           creatorRoamEnd: %roamOffAfter%, \
  //           status: "Pending", \
  //           venueName: "%venueName%", \
  //           venueAddress: "%venueAddress%", \
  //           type: "%type%" \
  //         })',
  //         {
  //           email: userEmail,
  //           userEmail: userEmail,
  //           userLatitude: coords.userLatitude,
  //           userLongitude: coords.userLongitude,
  //           startRoam: times.startRoam,
  //           roamOffAfter: times.roamOffAfter,
  //           venueName: venueName,
  //           venueAddress: venueAddress,
  //           type: type
  //       })
  //       .exec().then(function(queryRes) {

  //         // creates the relationship between creator of roam node and the roam node
  //         apoc.query('MATCH \
  //           (n:User {email:"%email%"}), \
  //           (m:Roam { \
  //             creatorEmail: "%creatorEmail%", \
  //             creatorRoamStart: %roamStart% \
  //           }) \
  //           CREATE (n)-[r:ATTENDING {host: true}]->(m)',
  //           {
  //             email:userEmail,
  //             creatorEmail: userEmail,
  //             roamStart: times.startRoam
  //           }).exec().then(function(relationshipRes) {
  //            console.log('Relationship created', relationshipRes);
  //            res.send("Created a roam");
  //         });
  //       });
  //     });

  //   } else { //Roam node found within a similar geographic location
  //     console.log('Found a match', matchResults[0].data[0].meta[0].id);

  //     var id = matchResults[0].data[0].meta[0].id;

  //     //Grabs roam node between similar location, and creates the relationship between node and user
  //     apoc.query('MATCH \
  //       (n:User {email:"%email%"}), \
  //       (m:Roam) \
  //         WHERE id(m) = %id% \
  //         SET m.status="Active" \
  //         CREATE (n)-[r:ATTENDING {host: false}]->(m) \
  //         RETURN m',
  //         {email:userEmail, id:id}
  //       )
  //     .exec().then(function(roamRes) {
  //       console.log('Relationship created b/w Users created', roamRes[0].data[0].row[0]);
  //       var roamInfo = roamRes[0].data[0].row[0];

  //       var date = formattedDateHtml();

  //       //Generates an automatic email message
  //       var mailOptions = {
  //         from: '"Typos Roam" <typosroam@gmail.com>', // sender address
  //         bcc: roamInfo.creatorEmail + ',' + userEmail, // List of users who are matched
  //         subject: 'Your Roam is Ready!', // Subject line
  //         text: 'Your Roam is at:' + roamInfo.venueName + ' Roam Address: ' + roamInfo.venueAddress, // plaintext body
  //         html: generateEmail(roamInfo.venueName, roamInfo.venueAddress, date) // html body
  //       };

  //       // send mail with defined transport object
  //       transporter.sendMail(mailOptions, function(error, info) {
  //         if(error){
  //           return console.log(error);
  //         }
  //         console.log('Message sent: ' + info.response);
  //       });

  //       res.send("You have been matched");
  //     });
  //   }
  // });
}

