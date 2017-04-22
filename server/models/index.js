var db = require('../db');


function roomKey(room, callback){
  
  console.log("\ngetting roomkey...");
  // return room's foreign key
  db.query(`SELECT id FROM rooms WHERE name = "${room}";`, [], 
    
    function(err, data){

      // console.log("ERR",err,"DATA",data)

      if (err) { 
          console.log("ERROR GETTING ROOM KEY",err); 

      } else {

        console.log("GETTING FROM ROOMKEYS",data);

        if ( data.length === 0 ){
          // insert room to rooms table
          db.query(`INSERT INTO rooms (name) VALUES ("${room}");`, [], function(err, res) {
            if ( err ) { console.log("ERR CREATING ROOM",err); }
            else { console.log('ROOM CREATED!'); }
          });

        } else {
          callback(data[0].id);
        }

      }
  });
}

function userKey(user, callback){

  console.log("\ngetting userkey...");

  db.query(`SELECT id FROM users WHERE username = "${user}";`,[], 
    
    function(err, data){

        if (err) { 
          console.log("ERROR GETTING USER KEY",err); 

        } else {

          // var id = data[0].id;
          console.log("GOT USER ", data );
          if ( data.length > 0 ){ 
            callback( data[0].id ); 
          } else {
            callback(false);
          }

        }
      });
}


module.exports = {
  messages: {

    get: function (req, res, callback) {
    // a function which produces all the messages
    console.log("INSIDE THE GET FUNCTION")

      db.query(`SELECT * FROM messages;`, [], function(err, result) {

        if(err) {
          console.log("MESSAGE GET ERR:", err);
        } else {
          // console.log("THIS IS THE MESSAGES GET RESULT:", result);
            callback(result);

          res.end();
        }
      })
    }, 

    post: function (req,res) {

      console.log("\n\n\nRES AT TOP", Object.keys(res));

      roomKey(req.body.roomname, 
        function(roomId){ 

            userKey(req.body.username, 
              function(userId){ 

                console.log(`Building row`)

                  db.query(`INSERT INTO messages (room, user, content) VALUES ("${roomId}","${userId}","${req.body.message}");`, [], function(err, success){
                    
                    if (err){  
                      console.log("ERROR INSERTING MESSAGE",err); 

                    } else { 
                      console.log("MESSAGE INSERTED!", success); 
                    }

                    res.end();

                  });

                  
            });

      });

      

    }
  },

  users: {
    // Ditto as above.
    get: function (user, callback) {

      console.log("\n\nGETTING ",user, this)

      userKey(user, callback);

    },


    post: function (req, res) {

      console.log("REQBODY",req.body)
      this.get(req.body.username, function(found){

        console.log("GETTING THE USER RETURNED: ",found);

        if ( !found ){
          db.query(`INSERT INTO users (username) VALUES ("${req.body.username}");`, [] ,
            function(err, res){
            console.log("Created New User! ",req.body.username);

          });
        }
        res.end();
        // else dont do anything
      });
    }

  }
};

