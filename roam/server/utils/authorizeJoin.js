'use strict'

var apoc = require('apoc');

module.exports = (eventId) => {

  return apoc.query(
    'MATCH \
      (n:User)-[r:ATTENDING]->(m:Roam)\
    WHERE id(m) = %eventId%\
    Return count(r), m.capacity',
    {
      eventId
    }
  );
};