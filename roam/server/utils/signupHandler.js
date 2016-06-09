'use strict'


var apoc = require('apoc');
var bcrypt = require('bcrypt');
var crypto = require('crypto'); //TODO: needed?

var saltRounds = 10;



module.exports = (data, res) => {
//Check database to see if incoming email on signup already exists
  apoc.query('MATCH (n:User {email: "%email%"}) RETURN n', { email: data.email }).exec().then(function(queryRes) {
    //If there is no matching email in the database
    if (queryRes[0].data.length === 0) {
      //Hash password upon creation of account
      bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) {
          console.log('Error generating salt', err);
        }
        bcrypt.hash(data.password, salt, function(err, hash) {
          if (err) {
            console.log('Error hashing password', err);
          }
          data.password = hash;
          //Creates new server in database
          apoc.query('CREATE \
            (newUser:User {\
              firstName: "%firstName%", \
              lastName: "%lastName%", \
              password: "%password%", \
              email: "%email%" \
            });',
            data
          )
          .exec().then(
            function(dbRes) {
              console.log('saved to database:', dbRes);
              res.send(JSON.stringify({message: 'User created'}));
            },
            function(fail) {
              console.log('issues saving to database:', fail);
            }
          );
        });
      }); //close genssalt
    } else {
      res.send(JSON.stringify({message: 'Email already exists!'}));
    }
  }); //closing 'then'
}