// roamOffGenerator.js
//

module.exports = function(data) {

  var startRoam = Number(data.coordinates.timestamp); //time when user clicks the roam button in milliseconds
  var roamOffAfter = Number(startRoam); //time when the user is not available after in milliseconds


  if(data.time === '1 hour') {
    roamOffAfter +=   3600000;
  }

  if(data.time === '2 hours') {
    roamOffAfter +=   7200000;
  }

  if(data.time === '4 hours') {
    roamOffAfter +=   14400000;
  }

  if(data.time === 'Anytime today') {
    var today = new Date();
    var millisecondsUntilMidnight = (24 - today.getHours()) * 3600000;
    roamOffAfter +=   millisecondsUntilMidnight;
  }

  return {startRoam: startRoam, roamOffAfter: roamOffAfter};
}

