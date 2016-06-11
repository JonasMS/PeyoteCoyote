var apoc = require('apoc');

const startRoam = require('./startRoam');
const joinRoam = require('./joinRoam');
const autoCreate = require('./autoCreate');

//connect user to roam or create specified roam
module.exports = (userInput, res) => {

  // const {
  //   title,
  //   email,
  //   coords,
  //   times,
  //   isHost,
  //   roamId
  // } = userInput;\

  const { isHost, locName, address } = userInput;

  //TODO: necessary?
  //const venue = {} = userInput ?


  if (isHost) {

    //create poolRoam if a location
    //is not specified
    if (!!locName) {
      startRoam(
        userInput,
        { locName, address },
        res
      );
    } else {
      //auto create poolRoam
      autoCreate(
        userInput,
        res
      )
    }

  } else {
    //join specified roam

    //NOTE: need to serve joinRoam the id
    //of the specified roam node
    joinRoam(userInput, roamId)
    .exec()
    .then( (roam) => {
      console.log('roam: ', roam);
      res.send("Joined the roam");
    });
  }
}
