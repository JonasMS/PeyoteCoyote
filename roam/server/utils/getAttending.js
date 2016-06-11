'use strict'

var apoc = require('apoc');

module.exports = (eventId) => {
  return apoc.query(
    'MATCH \
      (n:User)-[r:ATTENDING]->(m:Roam)\
    Where id(m) = %eventId%\
    Return count(r)',
    {
      eventId
    }
  );
};