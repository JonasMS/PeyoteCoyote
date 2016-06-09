var apoc = require('apoc');

const startRoam = require('./startRoam')

//connect user to roam or create specified roam
module.exports = (userInput, res) => {
  const { dateMS, email, coords, times, isHost } = userInput;

  if (isHost) {
    //startRoam
    startRoam(userInput, res);
  } else {
    //join specified roam

  }
}