'use strict'

var apoc = require('apoc');

module.exports = (userInput, queryRes, res) => {

  const { email, isHost } = userInput;
  const { id } = queryRes[0].data[0].meta[0];
  console.log('queryRes: ', queryRes[0].data[0].meta);

  //create a relationship between the selected roam and the user
  return apoc.query(
    'MATCH (n:User {email: "%email%"}), \
    (m:Roam) WHERE id(m) = %id% \
    CREATE (n)-[:ATTENDING {isHost: %isHost%}]->(m) \
    RETURN m',
    {
      id: id,
      email: email,
      isHost: isHost
    }
  );
};