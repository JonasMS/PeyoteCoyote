const yelp = require('./api');

const createRoam = require('./createRoam');

module.exports = (userInput, res) => {

  const { coords } = userInput;

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


  yelp.searchYelp(
    searchParams,
    venue => {


      const venueInfo = {
      locName: venue.name,
      address: venue
               .location
               .display_address
               .join(' ')
      }

      userInput.title =
        'Drinks at ' + venueInfo.locName;

      createRoam(
        userInput,
        venueInfo,
        res
      )
      .exec()
      .then(queryRes => {
        res.send('Auto Created Pool Roam');
      })
  });

}