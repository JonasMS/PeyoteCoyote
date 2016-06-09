//This file takes the user coordinates and generates a boundary within which
//we want to find another match and also find a meeting venue

module.exports = function(data) {

  const offsetToDegrees = 0.02;

  var dateMS = Date.now();
  var userLatitude = Number(data.coordinates.coords.latitude);
  var userLongitude = Number(data.coordinates.coords.longitude);

  var maxLat = userLatitude + offsetToDegrees;
  var minLat = userLatitude - offsetToDegrees;
  var maxLong = userLongitude + offsetToDegrees;
  var minLong = userLongitude - offsetToDegrees;

  return ({userLatitude, userLongitude, maxLat, minLat, maxLong, minLong});
}