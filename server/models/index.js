var db = require('../db');

function roomKey(room, callback){
  console.log("getting roomkey...");
  // return room's foreign key
  db.query('SELECT id FROM rooms WHERE name = room', [], function(err, id){
    if ( err ) { console.log("ERROR GETTING ROOM ID"); }
    else { console.log("ROOM'S ID IS ",id); }
    callback(id);
  });
}

function userKey(username, callback){
  console.log("getting userkey...");
  // return username's key
  // select id from users where name = username
  db.query('SELECT id FROM users WHERE name = username', [], function(err, id){
    if ( err ) { console.log("ERROR GETTING USER ID"); }
    else { console.log("USERNAME'S ID IS ",id); }
    callback(id);
  });
}

module.exports = {
  messages: {
    get: function () {
    // a function which produces all the messages

    }, 
    post: function (msg) {
     // insert a message into the database
      console.log("MODELING\n",msg);

      var message = {
                      room: roomKey(msg.roomname, function(id){ return id; }),
                      user: userKey(msg.username, function(id){ return id; }),
                      content: msg.text
                      // createdAt: msg.createdAt
                    };


      console.log("Message Built:",message);

      db.query('INSERT INTO messages (room, user, content) VALUES ?', message, function(err, res){
        if (err){  console.log("ERROR INSERTING MESSAGE",err); } 
        else { console.log("MESSAGE INSERTED!"); }
      });

    }
  },

  users: {
    // Ditto as above.
    get: function (user, callback) {

      console.log("\n\nGETTING ",user)
      db.query(`SELECT id FROM users WHERE username="${user}"`,[], function(err, id){
        if (err) { 
          console.log("ERROR GETTING USER",err); 
          callback(false);
        } else {
          console.log("GOT USER ",id);
          if (id.length > 0 ){ callback(id); }
          else { callback(false); }
        }
      });

    },


    post: function (user, callback) {

      this.get(user.username, function(err, found){
        if ( !found ){
          db.query(`INSERT INTO users (username) VALUES ? ("${user.username}")`,[],function(err, res){

            console.log("after pushing a new user",res)
            
          });
        }
        // else dont do anything
      });
    }

  }
};

